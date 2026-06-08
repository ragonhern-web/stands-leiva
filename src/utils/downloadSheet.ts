import * as XLSX from "xlsx";
import type { Stand } from "../types";

function standInfoRows(stand: Stand): (string | number)[][] {
  const rows: (string | number)[][] = [["Campo", "Valor"]];
  if (stand.standRef)    rows.push(["Ref. stand",       stand.standRef]);
  if (stand.tipo)        rows.push(["Tipo",              stand.tipo]);
  if (stand.numRefs)     rows.push(["Nº referencias",    stand.numRefs]);
  if (stand.totalUnits)  rows.push(["Nº unidades",       stand.totalUnits]);
  if (stand.sides)       rows.push(["Lados",             stand.sides]);
  if (stand.priceStand)  rows.push(["Precio expositor",  stand.priceStand]);
  if (stand.pricePerUnit)rows.push(["Precio unidad",     stand.pricePerUnit]);
  if (stand.standAlto != null)
    rows.push(["Medidas expositor", `${stand.standAlto} × ${stand.standLargo} × ${stand.standAncho} cm`]);
  return rows;
}

export function downloadExcel(stand: Stand, _title: string): void {
  const wb = XLSX.utils.book_new();
  const origin = window.location.origin;

  const infoSheet = XLSX.utils.aoa_to_sheet(standInfoRows(stand));
  infoSheet["!cols"] = [{ wch: 22 }, { wch: 30 }];
  XLSX.utils.book_append_sheet(wb, infoSheet, "Ficha expositor");

  const productHeaders = ["Nº Ref", "Referencia", "Foto", "Color", "Alto (cm)", "Largo (cm)", "Ancho (cm)", "Unidades", "Precio/u"];
  const productRows = stand.products.map(p => [
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
  const productsSheet = XLSX.utils.aoa_to_sheet([productHeaders, ...productRows]);

  // Añadir hipervínculo en la columna "Foto" (columna C = índice 2)
  stand.products.forEach((p, i) => {
    const cellRef = XLSX.utils.encode_cell({ r: i + 1, c: 2 });
    if (productsSheet[cellRef]) {
      productsSheet[cellRef].l = { Target: `${origin}${p.image}`, Tooltip: p.name };
    }
  });

  productsSheet["!cols"] = [{ wch: 14 }, { wch: 28 }, { wch: 10 }, { wch: 22 }, { wch: 10 }, { wch: 11 }, { wch: 11 }, { wch: 10 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(wb, productsSheet, "Productos");

  XLSX.writeFile(wb, `ficha-tecnica-${stand.id}.xlsx`);
}

export function downloadPDF(stand: Stand, title: string): void {
  const origin = window.location.origin;
  const infoRows = standInfoRows(stand).slice(1);

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Ficha técnica – ${title}</title>
<style>
  body { font-family: Arial, sans-serif; padding: 32px; color: #202020; }
  h1 { color: #169b22; font-size: 22px; margin-bottom: 4px; }
  h2 { font-size: 14px; color: #555; margin: 24px 0 8px; }
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
<table>${infoRows.map(([k, v]) => `<tr><td><b>${k}</b></td><td class="${String(k).includes("Precio") ? "price" : ""}">${v}</td></tr>`).join("")}</table>
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
