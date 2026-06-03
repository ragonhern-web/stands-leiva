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

export function downloadExcel(stand: Stand, title: string): void {
  const wb = XLSX.utils.book_new();

  const infoSheet = XLSX.utils.aoa_to_sheet(standInfoRows(stand));
  infoSheet["!cols"] = [{ wch: 22 }, { wch: 30 }];
  XLSX.utils.book_append_sheet(wb, infoSheet, "Ficha expositor");

  const productHeaders = ["Referencia", "Color", "Alto (cm)", "Largo (cm)", "Ancho (cm)", "Unidades", "Precio/u"];
  const productRows = stand.products.map(p => [
    p.name,
    p.color  ?? "",
    p.alto   ?? "",
    p.largo  ?? "",
    p.ancho  ?? "",
    p.units  ?? "",
    p.price  ?? "",
  ]);
  const productsSheet = XLSX.utils.aoa_to_sheet([productHeaders, ...productRows]);
  productsSheet["!cols"] = [{ wch: 16 }, { wch: 26 }, { wch: 10 }, { wch: 11 }, { wch: 11 }, { wch: 10 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(wb, productsSheet, "Productos");

  XLSX.writeFile(wb, `ficha-tecnica-${stand.id}.xlsx`);
}

export function downloadPDF(stand: Stand, title: string): void {
  const infoRows = standInfoRows(stand).slice(1);
  const productRows = stand.products.map(p => [
    p.name, p.color ?? "—", `${p.alto ?? "—"} cm`, `${p.largo ?? "—"} cm`,
    `${p.ancho ?? "—"} cm`, p.units ?? "—", p.price ?? "—",
  ]);

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Ficha técnica – ${title}</title>
<style>
  body { font-family: Arial, sans-serif; padding: 32px; color: #202020; }
  h1 { color: #169b22; font-size: 22px; margin-bottom: 4px; }
  h2 { font-size: 14px; color: #555; margin: 24px 0 8px; }
  table { border-collapse: collapse; width: 100%; font-size: 12px; }
  th { background: #169b22; color: white; padding: 6px 10px; text-align: left; }
  td { border-bottom: 1px solid #e2e8f0; padding: 5px 10px; }
  tr:nth-child(even) td { background: #f8fafc; }
  .price { color: #169b22; font-weight: bold; }
  @media print { body { padding: 16px; } }
</style></head><body>
<h1>${title}</h1>
<h2>Ficha del expositor</h2>
<table>${infoRows.map(([k, v]) => `<tr><td><b>${k}</b></td><td class="${String(k).includes("Precio") ? "price" : ""}">${v}</td></tr>`).join("")}</table>
<h2>Productos incluidos</h2>
<table><thead><tr>${["Referencia","Color","Alto","Largo","Ancho","Unidades","Precio/u"].map(h => `<th>${h}</th>`).join("")}</tr></thead>
<tbody>${productRows.map(r => `<tr>${r.map((c, i) => `<td${i === 6 ? ' class="price"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>
</body></html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); }, 400);
}
