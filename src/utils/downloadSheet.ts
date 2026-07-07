import { copy } from "../data/translations";
import type { Stand, TranslationCopy } from "../types";

function realRef(name: string): string {
  return name.match(/Ref\.(\d+)/)?.[1] ?? name;
}

function cleanName(name: string): string {
  return name.replace(/\s*·\s*Ref\.\d+$/, "");
}

function resolveImgSrc(src: string, origin: string): string {
  return src.startsWith("data:") || src.startsWith("http") ? src : `${origin}${src}`;
}

function buildInfoRows(stand: Stand, t: TranslationCopy): [string, string | number][] {
  const rows: [string, string | number][] = [];
  if (stand.standRef)     rows.push([t.standRef,        stand.standRef]);
  if (stand.tipo)         rows.push([t.standTipo,        stand.tipo]);
  if (stand.numRefs)      rows.push([t.standNumRefs,     stand.numRefs]);
  if (stand.totalUnits)   rows.push([t.standTotalUnits,  stand.totalUnits]);
  if (stand.sides)        rows.push([t.standSides,       stand.sides]);
  if (stand.priceStand)   rows.push([t.standPrice,       stand.priceStand]);
  if (stand.pricePerUnit) rows.push([t.standPriceUnit,   stand.pricePerUnit]);
  if (stand.standAlto != null)
    rows.push([t.standDims, `${stand.standAlto} × ${stand.standLargo} × ${stand.standAncho} cm`]);
  return rows;
}

async function fetchImageBuffer(url: string): Promise<ArrayBuffer | null> {
  if (url.startsWith("data:")) {
    // Decode base64 data URI to ArrayBuffer
    try {
      const base64 = url.split(",")[1];
      if (!base64) return null;
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      return bytes.buffer;
    } catch {
      return null;
    }
  }
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

async function addStandSheet(
  wb: import("exceljs").Workbook,
  stand: Stand,
  t: TranslationCopy,
  sheetName: string,
  standImgBuf: ArrayBuffer | null,
  productImgBufs: (ArrayBuffer | null)[],
): Promise<void> {
  const green = "FF169b22";
  const infoRows = buildInfoRows(stand, t);

  // ── Hoja Ficha expositor ─────────────────────────────────────────────────
  const infoSheet = wb.addWorksheet(sheetName);

  infoSheet.getColumn(1).width = 24;
  infoSheet.getColumn(2).width = 32;
  infoSheet.getColumn(3).width = 4;
  infoSheet.getColumn(4).width = 30;

  const headerRow = infoSheet.addRow(["Campo / Field", "Valor / Value"]);
  headerRow.eachCell((cell, col) => {
    if (col > 2) return;
    cell.fill   = { type: "pattern", pattern: "solid", fgColor: { argb: green } };
    cell.font   = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
    cell.border = { bottom: { style: "thin", color: { argb: "FFe2e8f0" } } };
  });

  infoRows.forEach(([label, value]) => {
    const row = infoSheet.addRow([label, String(value)]);
    row.getCell(1).font = { bold: true, color: { argb: "FF475569" }, size: 10 };
    const isPrice = label === t.standPrice || label === t.standPriceUnit;
    row.getCell(2).font = { bold: isPrice, color: { argb: isPrice ? green : "FF202020" }, size: 10 };
    row.eachCell((cell, col) => {
      if (col > 2) return;
      cell.border = { bottom: { style: "thin", color: { argb: "FFe2e8f0" } } };
    });
  });

  if (standImgBuf) {
    const imgId = wb.addImage({ buffer: standImgBuf, extension: "png" });
    infoSheet.addImage(imgId, { tl: { col: 3, row: 0 }, ext: { width: 200, height: 280 } });
    for (let r = 1; r <= 10; r++) infoSheet.getRow(r).height = 28;
  }

  // ── Hoja Productos ───────────────────────────────────────────────────────
  const prodSheetName = sheetName === "Español" ? "Productos ES"
    : sheetName === "English" ? "Products EN"
    : "Produits FR";

  const prodSheet = wb.addWorksheet(prodSheetName);

  prodSheet.columns = [
    { header: "Ref.",              width: 14 },
    { header: "Producto / Product", width: 30 },
    { header: "Foto / Photo",      width: 12 },
    { header: t.color,             width: 24 },
    { header: `${t.alto} (cm)`,    width: 11 },
    { header: `${t.largo} (cm)`,   width: 12 },
    { header: `${t.ancho} (cm)`,   width: 12 },
    { header: t.units,             width: 11 },
    { header: t.price,             width: 11 },
  ];

  prodSheet.getRow(1).eachCell(cell => {
    cell.fill   = { type: "pattern", pattern: "solid", fgColor: { argb: green } };
    cell.font   = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    cell.border = { bottom: { style: "thin", color: { argb: "FFe2e8f0" } } };
  });

  const origin = window.location.origin;

  stand.products.forEach((p, i) => {
    const row = prodSheet.addRow([
      realRef(p.name),
      cleanName(p.name),
      "→ foto",
      p.color  ?? "",
      p.alto   ?? "",
      p.largo  ?? "",
      p.ancho  ?? "",
      p.units  ?? "",
      p.price  ?? "",
    ]);

    const fotoCell = row.getCell(3);
    fotoCell.value = { text: "→ foto", hyperlink: resolveImgSrc(p.image, origin) };
    fotoCell.font  = { color: { argb: "FF2563eb" }, underline: true, size: 10 };

    if (i % 2 === 1) {
      row.eachCell(cell => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFf8fafc" } };
      });
    }

    row.getCell(9).font = { bold: true, color: { argb: green }, size: 10 };

    // Insertar imagen del producto si está disponible
    const buf = productImgBufs[i];
    if (buf) {
      const imgId = wb.addImage({ buffer: buf, extension: "png" });
      prodSheet.addImage(imgId, {
        tl: { col: 2, row: i + 1 },
        ext: { width: 50, height: 50 },
        editAs: "oneCell",
      });
      row.height = 40;
    }
  });
}

export async function downloadExcel(stand: Stand, _title: string): Promise<void> {
  const origin = window.location.origin;
  const ExcelJS = (await import("exceljs")).default;
  const wb = new ExcelJS.Workbook();

  // Prefetch de imágenes (una sola vez, reutilizadas en las 3 hojas)
  const standImgBuf = await fetchImageBuffer(resolveImgSrc(stand.image, origin));
  const productImgBufs = await Promise.all(
    stand.products.map(p => fetchImageBuffer(resolveImgSrc(p.image, origin)))
  );

  await addStandSheet(wb, stand, copy.es, "Español", standImgBuf, productImgBufs);
  await addStandSheet(wb, stand, copy.en, "English", standImgBuf, productImgBufs);
  await addStandSheet(wb, stand, copy.fr, "Français", standImgBuf, productImgBufs);

  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ficha-tecnica-${stand.id}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadPDF(stand: Stand, title: string): void {
  const origin = window.location.origin;
  const infoRows = buildInfoRows(stand, copy.es);
  const standImgUrl = resolveImgSrc(stand.image, origin);

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
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
</style>
<script>window.addEventListener('load', function() { window.print(); });<\/script>
</head><body>
<h1>${title}</h1>
<h2>Ficha del expositor</h2>
<div class="info-section">
  <div class="info-table">
    <table>${infoRows.map(([k, v]) => {
      const isPrice = k === copy.es.standPrice || k === copy.es.standPriceUnit;
      return `<tr><td><b>${k}</b></td><td class="${isPrice ? "price" : ""}">${v}</td></tr>`;
    }).join("")}</table>
  </div>
  <img src="${standImgUrl}" class="stand-img" alt="${title}" />
</div>
<h2>Productos incluidos</h2>
<table>
  <thead><tr>${["Foto","Nº Ref","Producto","Color","Alto","Largo","Ancho","Uds.","Precio/u"].map(h => `<th>${h}</th>`).join("")}</tr></thead>
  <tbody>${stand.products.map(p => `<tr>
    <td><img src="${resolveImgSrc(p.image, origin)}" class="photo" alt="${p.name}" /></td>
    <td class="ref">${realRef(p.name)}</td>
    <td>${cleanName(p.name)}</td>
    <td>${p.color ?? "—"}</td>
    <td>${p.alto ? p.alto + " cm" : "—"}</td>
    <td>${p.largo ? p.largo + " cm" : "—"}</td>
    <td>${p.ancho ? p.ancho + " cm" : "—"}</td>
    <td>${p.units ?? "—"}</td>
    <td class="price">${p.price ?? "—"}</td>
  </tr>`).join("")}</tbody>
</table>
</body></html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (!win) {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
