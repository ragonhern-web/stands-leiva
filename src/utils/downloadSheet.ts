import type { Stand } from "../types";

function standInfoRows(stand: Stand): [string, string | number][] {
  const rows: [string, string | number][] = [];
  if (stand.standRef)     rows.push(["Ref. stand",        stand.standRef]);
  if (stand.tipo)         rows.push(["Tipo",               stand.tipo]);
  if (stand.numRefs)      rows.push(["Nº referencias",     stand.numRefs]);
  if (stand.totalUnits)   rows.push(["Nº unidades",        stand.totalUnits]);
  if (stand.sides)        rows.push(["Lados",              stand.sides]);
  if (stand.priceStand)   rows.push(["Precio expositor",   stand.priceStand]);
  if (stand.pricePerUnit) rows.push(["Precio unidad",      stand.pricePerUnit]);
  if (stand.standAlto != null)
    rows.push(["Medidas expositor", `${stand.standAlto} × ${stand.standLargo} × ${stand.standAncho} cm`]);
  return rows;
}

async function fetchImageBuffer(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export async function downloadExcel(stand: Stand, _title: string): Promise<void> {
  const origin = window.location.origin;
  const ExcelJS = (await import("exceljs")).default;
  const wb = new ExcelJS.Workbook();

  // ── Hoja 1: Ficha expositor ──────────────────────────────────────────────
  const infoSheet = wb.addWorksheet("Ficha expositor");

  infoSheet.getColumn(1).width = 24;
  infoSheet.getColumn(2).width = 32;
  infoSheet.getColumn(3).width = 4;  // separador
  infoSheet.getColumn(4).width = 30; // columna imagen

  const green = "FF169b22";

  // Cabecera
  const headerRow = infoSheet.addRow(["Campo", "Valor"]);
  headerRow.eachCell((cell, col) => {
    if (col > 2) return;
    cell.fill   = { type: "pattern", pattern: "solid", fgColor: { argb: green } };
    cell.font   = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
    cell.border = { bottom: { style: "thin", color: { argb: "FFe2e8f0" } } };
  });

  // Filas de datos
  standInfoRows(stand).forEach(([label, value]) => {
    const row = infoSheet.addRow([label, String(value)]);
    row.getCell(1).font = { bold: true, color: { argb: "FF475569" }, size: 10 };
    row.getCell(2).font = { size: 10 };
    if (label.includes("Precio")) {
      row.getCell(2).font = { bold: true, color: { argb: green }, size: 10 };
    }
    row.eachCell((cell, col) => {
      if (col > 2) return;
      cell.border = { bottom: { style: "thin", color: { argb: "FFe2e8f0" } } };
    });
  });

  // Imagen del stand (columna D, fila 1)
  const standImgUrl = `${origin}${stand.image}`;
  const standImgBuf = await fetchImageBuffer(standImgUrl);
  if (standImgBuf) {
    const imgId = wb.addImage({ buffer: standImgBuf, extension: "png" });
    infoSheet.addImage(imgId, {
      tl: { col: 3, row: 0 },
      ext: { width: 200, height: 280 },
    });
    // Altura de filas para que quede bien
    for (let r = 1; r <= 10; r++) infoSheet.getRow(r).height = 28;
  }

  // ── Hoja 2: Productos ────────────────────────────────────────────────────
  const prodSheet = wb.addWorksheet("Productos");

  const prodCols = [
    { header: "Nº Ref",      width: 16 },
    { header: "Referencia",  width: 30 },
    { header: "Foto",        width: 12 },
    { header: "Color",       width: 24 },
    { header: "Alto (cm)",   width: 11 },
    { header: "Largo (cm)",  width: 12 },
    { header: "Ancho (cm)",  width: 12 },
    { header: "Unidades",    width: 11 },
    { header: "Precio/u",    width: 11 },
  ];
  prodSheet.columns = prodCols.map(c => ({ header: c.header, width: c.width }));

  const prodHeader = prodSheet.getRow(1);
  prodHeader.eachCell(cell => {
    cell.fill  = { type: "pattern", pattern: "solid", fgColor: { argb: green } };
    cell.font  = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    cell.border = { bottom: { style: "thin", color: { argb: "FFe2e8f0" } } };
  });

  stand.products.forEach((p, i) => {
    const row = prodSheet.addRow([
      p.id,
      p.name,
      "Ver foto",
      p.color  ?? "",
      p.alto   ?? "",
      p.largo  ?? "",
      p.ancho  ?? "",
      p.units  ?? "",
      p.price  ?? "",
    ]);
    // Hipervínculo en "Ver foto"
    const fotoCell = row.getCell(3);
    fotoCell.value = { text: "Ver foto", hyperlink: `${origin}${p.image}` };
    fotoCell.font  = { color: { argb: "FF2563eb" }, underline: true, size: 10 };
    // Color alternante
    if (i % 2 === 1) {
      row.eachCell(cell => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFf8fafc" } };
      });
    }
    // Precio en verde
    const priceCell = row.getCell(9);
    priceCell.font = { bold: true, color: { argb: green }, size: 10 };
  });

  // ── Descarga ─────────────────────────────────────────────────────────────
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ficha-tecnica-${stand.id}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadPDF(stand: Stand, title: string): void {
  const origin = window.location.origin;
  const infoRows = standInfoRows(stand);
  const standImgUrl = `${origin}${stand.image}`;

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Ficha técnica – ${title}</title>
<style>
  body { font-family: Arial, sans-serif; padding: 32px; color: #202020; }
  h1 { color: #169b22; font-size: 22px; margin-bottom: 16px; }
  h2 { font-size: 13px; color: #555; margin: 24px 0 8px; text-transform: uppercase; letter-spacing: 0.08em; }
  .info-section { display: flex; gap: 28px; align-items: flex-start; }
  .info-table { flex: 1; min-width: 0; }
  .stand-img { width: 180px; flex-shrink: 0; object-fit: contain; border-radius: 8px; background: #f8fafc; padding: 8px; }
  table { border-collapse: collapse; width: 100%; font-size: 11px; }
  th { background: #169b22; color: white; padding: 6px 10px; text-align: left; white-space: nowrap; }
  td { border-bottom: 1px solid #e2e8f0; padding: 6px 8px; vertical-align: middle; }
  tr:nth-child(even) td { background: #f8fafc; }
  .price { color: #169b22; font-weight: bold; }
  .ref  { font-size: 10px; color: #888; font-family: monospace; }
  .photo { width: 58px; height: 58px; object-fit: contain; display: block; }
  @media print { body { padding: 16px; } }
</style></head><body>
<h1>${title}</h1>
<h2>Ficha del expositor</h2>
<div class="info-section">
  <div class="info-table">
    <table>${infoRows.map(([k, v]) => `<tr><td><b>${k}</b></td><td class="${String(k).includes("Precio") ? "price" : ""}">${v}</td></tr>`).join("")}</table>
  </div>
  <img src="${standImgUrl}" class="stand-img" alt="${title}" />
</div>
<h2>Productos incluidos</h2>
<table>
  <thead><tr>${["Foto","Nº Ref","Referencia","Color","Alto","Largo","Ancho","Uds.","Precio/u"].map(h => `<th>${h}</th>`).join("")}</tr></thead>
  <tbody>${stand.products.map(p => `<tr>
    <td><img src="${origin}${p.image}" class="photo" alt="${p.name}" /></td>
    <td class="ref">${p.id}</td>
    <td>${p.name}</td>
    <td>${p.color ?? "—"}</td>
    <td>${p.alto ? p.alto + " cm" : "—"}</td>
    <td>${p.largo ? p.largo + " cm" : "—"}</td>
    <td>${p.ancho ? p.ancho + " cm" : "—"}</td>
    <td>${p.units ?? "—"}</td>
    <td class="price">${p.price ?? "—"}</td>
  </tr>`).join("")}</tbody>
</table>
</body></html>`;

  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;width:0;height:0;border:0;opacity:0;";
  iframe.srcdoc = html;
  document.body.appendChild(iframe);
  iframe.addEventListener("load", () => {
    iframe.contentWindow!.focus();
    iframe.contentWindow!.print();
    setTimeout(() => document.body.removeChild(iframe), 1500);
  });
}
