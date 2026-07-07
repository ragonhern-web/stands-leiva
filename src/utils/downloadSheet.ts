import { copy, getStandCopy } from "../data/translations";
import type { Stand, Language, TranslationCopy } from "../types";

function realRef(name: string): string {
  return name.match(/Ref\.(\d+)/)?.[1] ?? name;
}

function cleanName(name: string): string {
  return name.replace(/\s*·\s*Ref\.\d+$/, "");
}

const COLOR_MAP: Record<string, Partial<Record<Language, string>>> = {
  "Varios colores surtidos": { en: "Various assorted colours", fr: "Plusieurs couleurs assorties", it: "Vari colori assortiti", pt: "Várias cores sortidas", de: "Verschiedene Farben", nl: "Diverse kleuren", pl: "Różne kolory", ro: "Culori asortate" },
  "Varios colores":          { en: "Various colours",          fr: "Plusieurs couleurs",            it: "Vari colori",          pt: "Várias cores",         de: "Verschiedene Farben", nl: "Diverse kleuren", pl: "Różne kolory", ro: "Culori diverse" },
  "Blanco":       { en: "White",       fr: "Blanc",      it: "Bianco",      pt: "Branco",     de: "Weiß",     nl: "Wit",      pl: "Biały",   ro: "Alb" },
  "Negro":        { en: "Black",       fr: "Noir",       it: "Nero",        pt: "Preto",      de: "Schwarz",  nl: "Zwart",    pl: "Czarny",  ro: "Negru" },
  "Verde":        { en: "Green",       fr: "Vert",       it: "Verde",       pt: "Verde",      de: "Grün",     nl: "Groen",    pl: "Zielony", ro: "Verde" },
  "Rojo":         { en: "Red",         fr: "Rouge",      it: "Rosso",       pt: "Vermelho",   de: "Rot",      nl: "Rood",     pl: "Czerwony",ro: "Roșu" },
  "Azul":         { en: "Blue",        fr: "Bleu",       it: "Blu",         pt: "Azul",       de: "Blau",     nl: "Blauw",    pl: "Niebieski",ro: "Albastru" },
  "Naranja":      { en: "Orange",      fr: "Orange",     it: "Arancione",   pt: "Laranja",    de: "Orange",   nl: "Oranje",   pl: "Pomarańczowy", ro: "Portocaliu" },
  "Amarillo":     { en: "Yellow",      fr: "Jaune",      it: "Giallo",      pt: "Amarelo",    de: "Gelb",     nl: "Geel",     pl: "Żółty",   ro: "Galben" },
  "Rosa":         { en: "Pink",        fr: "Rose",       it: "Rosa",        pt: "Rosa",       de: "Rosa",     nl: "Roze",     pl: "Różowy",  ro: "Roz" },
  "Gris":         { en: "Grey",        fr: "Gris",       it: "Grigio",      pt: "Cinzento",   de: "Grau",     nl: "Grijs",    pl: "Szary",   ro: "Gri" },
  "Marrón":       { en: "Brown",       fr: "Marron",     it: "Marrone",     pt: "Castanho",   de: "Braun",    nl: "Bruin",    pl: "Brązowy", ro: "Maro" },
  "Beige":        { en: "Beige",       fr: "Beige",      it: "Beige",       pt: "Bege",       de: "Beige",    nl: "Beige",    pl: "Beżowy",  ro: "Bej" },
  "Transparente": { en: "Transparent", fr: "Transparent",it: "Trasparente", pt: "Transparente",de: "Transparent",nl: "Transparant",pl: "Przezroczysty",ro: "Transparent" },
  "Luz cálida":   { en: "Warm light",  fr: "Lumière chaude", it: "Luce calda", pt: "Luz quente", de: "Warmweißes Licht", nl: "Warm licht", pl: "Ciepłe światło", ro: "Lumină caldă" },
};

function translateColor(color: string | undefined, lang: Language): string {
  if (!color) return "";
  if (lang === "es") return color;
  return COLOR_MAP[color]?.[lang] ?? color;
}

function resolveImgSrc(src: string, origin: string): string {
  return src.startsWith("data:") || src.startsWith("http") ? src : `${origin}${src}`;
}

function buildInfoRows(stand: Stand, t: TranslationCopy): [string, string | number][] {
  const rows: [string, string | number][] = [];
  if (stand.standRef)     rows.push([t.standRef,       stand.standRef]);
  if (stand.tipo)         rows.push([t.standTipo,       stand.tipo]);
  if (stand.numRefs)      rows.push([t.standNumRefs,    stand.numRefs]);
  if (stand.totalUnits)   rows.push([t.standTotalUnits, stand.totalUnits]);
  if (stand.sides)        rows.push([t.standSides,      stand.sides]);
  if (stand.priceStand)   rows.push([t.standPrice,      stand.priceStand]);
  if (stand.pricePerUnit) rows.push([t.standPriceUnit,  stand.pricePerUnit]);
  if (stand.standAlto != null)
    rows.push([t.standDims, `${stand.standAlto} × ${stand.standLargo} × ${stand.standAncho} cm`]);
  return rows;
}

// Canvas fallback: converts any image to JPEG ArrayBuffer (used for webp-only assets and data URIs)
async function imgToJpegBuffer(src: string): Promise<ArrayBuffer | null> {
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const MAX = 300;
        const nw = img.naturalWidth  || MAX;
        const nh = img.naturalHeight || MAX;
        const scale = Math.min(1, MAX / Math.max(nw, nh));
        const canvas = document.createElement("canvas");
        canvas.width  = Math.round(nw * scale);
        canvas.height = Math.round(nh * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) { resolve(null); return; }
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          if (!blob) { resolve(null); return; }
          blob.arrayBuffer().then(resolve).catch(() => resolve(null));
        }, "image/jpeg", 0.85);
      } catch { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function fetchBuf(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    return res.ok ? res.arrayBuffer() : null;
  } catch { return null; }
}

// Fast path: fetch .jpg/.png directly; Canvas fallback only for webp-only assets (jug3) and data URIs
async function getImgForExcel(src: string, origin: string): Promise<{ buf: ArrayBuffer; ext: "jpeg" | "png" } | null> {
  const resolved = resolveImgSrc(src, origin);

  if (resolved.endsWith(".webp")) {
    const buf = await fetchBuf(resolved.replace(/\.webp$/, ".jpg"));
    if (buf) return { buf, ext: "jpeg" };
    const canvasBuf = await imgToJpegBuffer(resolved);
    return canvasBuf ? { buf: canvasBuf, ext: "jpeg" } : null;
  }

  if (resolved.endsWith(".png")) {
    const buf = await fetchBuf(resolved);
    return buf ? { buf, ext: "png" } : null;
  }

  if (resolved.startsWith("data:")) {
    const canvasBuf = await imgToJpegBuffer(resolved);
    return canvasBuf ? { buf: canvasBuf, ext: "jpeg" } : null;
  }

  const buf = await fetchBuf(resolved);
  return buf ? { buf, ext: "jpeg" } : null;
}

function cell(
  ws: import("exceljs").Worksheet,
  row: number,
  col: number,
  value: import("exceljs").CellValue,
  opts: {
    bg?: string;
    fg?: string;
    bold?: boolean;
    size?: number;
    italic?: boolean;
    hAlign?: import("exceljs").Alignment["horizontal"];
    vAlign?: import("exceljs").Alignment["vertical"];
    indent?: number;
    border?: boolean;
    wrapText?: boolean;
  } = {}
) {
  const c = ws.getCell(row, col);
  c.value = value;
  if (opts.bg) c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: opts.bg } };
  c.font = {
    name: "Arial",
    size: opts.size ?? 9,
    bold: opts.bold ?? false,
    italic: opts.italic ?? false,
    color: { argb: opts.fg ?? "FF202020" },
  };
  c.alignment = {
    vertical: opts.vAlign ?? "middle",
    horizontal: opts.hAlign ?? "left",
    indent: opts.indent ?? 0,
    wrapText: opts.wrapText ?? false,
  };
  if (opts.border !== false) {
    c.border = { bottom: { style: "thin", color: { argb: "FFe2e8f0" } } };
  }
  return c;
}

function buildSheet(
  ws: import("exceljs").Worksheet,
  stand: Stand,
  t: TranslationCopy,
  language: Language,
  standTitle: string,
  standImgId: number | null,
  productImgIds: (number | null)[],
): void {
  const infoRows = buildInfoRows(stand, t);

  const G        = "FF169b22";
  const W        = "FFFFFFFF";
  const Y        = "FFffe100";
  const SLATE    = "FF475569";
  const GR1      = "FFf1f5f9";
  const GR2      = "FFf8fafc";
  const PRICE_BG = "FFe8f5e9";

  ws.columns = [
    { width: 12  },
    { width: 13  },
    { width: 34  },
    { width: 24  },
    { width: 9   },
    { width: 9   },
    { width: 9   },
    { width: 10  },
    { width: 11  },
  ];

  ws.mergeCells("A1:I1");
  cell(ws, 1, 1, standTitle, { bg: G, fg: W, bold: true, size: 16, hAlign: "left", indent: 1, border: false });
  ws.getRow(1).height = 36;

  const INFO_START = 2;

  infoRows.forEach(([label, value], i) => {
    const r = INFO_START + i;
    ws.getRow(r).height = 20;
    cell(ws, r, 1, label,         { bg: GR1, fg: SLATE, bold: true, indent: 1 });
    const isPrice = label === t.standPrice || label === t.standPriceUnit;
    cell(ws, r, 2, String(value), { bg: isPrice ? PRICE_BG : W, fg: isPrice ? G : "FF202020", bold: isPrice, indent: 1 });
    ws.getCell(r, 1).border = { bottom: { style: "thin", color: { argb: "FFe2e8f0" } }, right: { style: "thin", color: { argb: "FFcbd5e1" } } };
  });

  const IMG_ROWS = Math.max(infoRows.length + 1, 15);
  if (standImgId !== null) {
    ws.addImage(standImgId, {
      tl: { col: 3, row: INFO_START - 1 },
      ext: { width: 210, height: 300 },
    });
  }
  for (let r = INFO_START; r < INFO_START + IMG_ROWS; r++) {
    if (!ws.getRow(r).height) ws.getRow(r).height = 20;
  }

  const SEP_ROW = INFO_START + IMG_ROWS + 1;
  ws.mergeCells(`A${SEP_ROW}:I${SEP_ROW}`);
  cell(ws, SEP_ROW, 1, t.included, { bg: G, fg: W, bold: true, size: 11, indent: 1, border: false });
  ws.getRow(SEP_ROW).height = 28;

  const HDR_ROW   = SEP_ROW + 1;
  const photoLabel = language === "es" ? "Foto" : "Photo";
  const prodLabel  = language === "en" ? "Product" : language === "fr" ? "Produit" : "Producto";
  const headers = [photoLabel, "Ref.", prodLabel, t.color, `${t.alto} cm`, `${t.largo} cm`, `${t.ancho} cm`, t.units, t.price];
  headers.forEach((h, i) => {
    cell(ws, HDR_ROW, i + 1, h, { bg: SLATE, fg: W, bold: true, size: 9, hAlign: "center", border: false });
  });
  ws.getRow(HDR_ROW).height = 22;
  for (let c2 = 1; c2 <= 9; c2++) {
    ws.getCell(HDR_ROW, c2).border = { bottom: { style: "medium", color: { argb: G } } };
  }

  const DATA_START = HDR_ROW + 1;

  stand.products.forEach((p, i) => {
    const r     = DATA_START + i;
    const bg    = i % 2 === 0 ? W : GR2;
    const imgId = productImgIds[i];
    ws.getRow(r).height = imgId !== null ? 44 : 18;

    cell(ws, r, 1, "",                { bg, border: true });
    cell(ws, r, 2, realRef(p.name),   { bg, fg: "FF64748b", hAlign: "center", bold: true });
    cell(ws, r, 3, cleanName(p.name), { bg, indent: 1 });
    cell(ws, r, 4, translateColor(p.color, language), { bg, indent: 1 });
    cell(ws, r, 5, p.alto  ? `${p.alto} cm`  : "", { bg, hAlign: "center" });
    cell(ws, r, 6, p.largo ? `${p.largo} cm` : "", { bg, hAlign: "center" });
    cell(ws, r, 7, p.ancho ? `${p.ancho} cm` : "", { bg, hAlign: "center" });
    cell(ws, r, 8, p.units ?? "", { bg: Y, fg: "FF202020", bold: true, hAlign: "center" });
    cell(ws, r, 9, p.price ?? "", { bg: G, fg: W,          bold: true, hAlign: "center" });

    if (imgId !== null) {
      ws.addImage(imgId, {
        tl: { col: 0, row: r - 1 },
        ext: { width: 55, height: 40 },
        editAs: "oneCell",
      });
    }
  });
}

export async function downloadExcel(stand: Stand, _title: string, _language: Language = "es"): Promise<void> {
  const origin = window.location.origin;

  // Fetch all images once — shared across all language sheets
  const [standImg, ...productImgs] = await Promise.all([
    getImgForExcel(resolveImgSrc(stand.image, origin).replace(/\.webp$/, ".png"), origin),
    ...stand.products.map(p => getImgForExcel(p.image, origin)),
  ]);

  const ExcelJS = (await import("exceljs")).default;
  const wb = new ExcelJS.Workbook();

  // Register images in workbook once — IDs reused across all sheets
  const standImgId    = standImg ? wb.addImage({ buffer: standImg.buf, extension: standImg.ext }) : null;
  const productImgIds = productImgs.map(img =>
    img ? wb.addImage({ buffer: img.buf, extension: img.ext }) : null
  );

  // Build one sheet per language
  const tabs: { lang: Language; name: string }[] = [
    { lang: "es", name: "Español" },
    { lang: "en", name: "English" },
    { lang: "fr", name: "Français" },
  ];

  for (const { lang, name } of tabs) {
    const t          = copy[lang] ?? copy.es;
    const standTitle = getStandCopy(stand, lang).title;
    const ws         = wb.addWorksheet(name);
    buildSheet(ws, stand, t, lang, standTitle, standImgId, productImgIds);
  }

  // ── Download ─────────────────────────────────────────────────────────────
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a   = document.createElement("a");
  a.href     = url;
  a.download = `ficha-tecnica-${stand.id}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadPDF(stand: Stand, title: string): void {
  const origin    = window.location.origin;
  const infoRows  = buildInfoRows(stand, copy.es);
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
  .ref   { font-size: 10px; color: #888; font-family: monospace; }
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
    <td>${p.alto  ? p.alto  + " cm" : "—"}</td>
    <td>${p.largo ? p.largo + " cm" : "—"}</td>
    <td>${p.ancho ? p.ancho + " cm" : "—"}</td>
    <td>${p.units ?? "—"}</td>
    <td class="price">${p.price ?? "—"}</td>
  </tr>`).join("")}</tbody>
</table>
</body></html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, "_blank");
  if (!win) {
    const a = document.createElement("a");
    a.href = url; a.target = "_blank";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
