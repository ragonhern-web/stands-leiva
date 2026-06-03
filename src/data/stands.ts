import type { Stand, Product } from "../types";

const base = import.meta.env.BASE_URL;

/** SVG de placeholder mientras no hay imágenes reales.
 *  Sustituir stand.image por "/assets/stands/expositor-{id}.png" cuando estén disponibles. */
export const STAND_DEMO =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 520">
      <defs>
        <linearGradient id="side" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#8fd3ee"/>
          <stop offset="1" stop-color="#2f8fb5"/>
        </linearGradient>
        <linearGradient id="front" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset="1" stop-color="#e8eef2"/>
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" flood-color="#000000" flood-opacity="0.28"/>
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <path d="M32 96 L102 70 L102 490 L32 458 Z" fill="url(#side)"/>
        <path d="M102 70 L226 92 L226 470 L102 490 Z" fill="url(#front)" stroke="#d8dde2" stroke-width="2"/>
        <path d="M72 20 L196 42 L196 108 L72 86 Z" fill="#d9b27c"/>
        <rect x="103" y="114" width="122" height="30" fill="#d7aa6a"/>
        <rect x="103" y="205" width="122" height="30" fill="#d7aa6a"/>
        <rect x="103" y="300" width="122" height="30" fill="#d7aa6a"/>
        <rect x="103" y="405" width="122" height="30" fill="#d7aa6a"/>
        <rect x="122" y="44" width="62" height="30" rx="8" fill="#ffffff"/>
        <text x="153" y="64" text-anchor="middle" font-family="Arial" font-size="12" font-weight="900" fill="#169b22">TOYS</text>
        <circle cx="126" cy="166" r="18" fill="#f97316"/>
        <circle cx="162" cy="164" r="20" fill="#22c55e"/>
        <circle cx="198" cy="168" r="18" fill="#38bdf8"/>
        <rect x="116" y="248" width="38" height="42" rx="8" fill="#22c55e"/>
        <rect x="166" y="245" width="42" height="45" rx="8" fill="#facc15"/>
        <circle cx="130" cy="356" r="22" fill="#0ea5e9"/>
        <circle cx="180" cy="356" r="22" fill="#f97316"/>
        <rect x="117" y="440" width="85" height="28" rx="5" fill="#facc15"/>
      </g>
    </svg>
  `);

export const brand = {
  green: "#169b22",
  darkGreen: "#087a18",
  yellow: "#ffe100",
  orange: "#f5a623",
  red: "#e21b23",
  black: "#202020",
} as const;

const colorMap = {
  green: brand.green,
  darkGreen: brand.darkGreen,
  orange: brand.orange,
  red: brand.red,
  black: brand.black,
  slate: "#6b7280",
} as const;

function createProducts(prefix: string, baseProducts: string[]): Product[] {
  return Array.from({ length: 20 }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    name: `${baseProducts[index % baseProducts.length]} · Ref.${1000 + index}`,
    // Ruta futura: `/assets/products/${prefix}-${index + 1}.png`
    image: STAND_DEMO,
    units: "",
    price: "",
  }));
}

type StandDef = Omit<Stand, "image" | "products">;

const seasonalDefs: StandDef[] = [
  { id: "ene", label: "ENE", color: "#1f6fb5", title: "Expositor Enero",         desc: "Ideal para reactivar ventas tras las fiestas con productos esenciales.",        productsBase: ["Juegos de mesa", "Puzzles", "Manualidades", "Figuras"] },
  { id: "feb", label: "FEB", color: "#2d87c8", title: "Expositor Febrero",        desc: "Regalos rápidos, detalles impulsivos y productos de alta rotación.",           productsBase: ["Peluches", "Cartas", "Detalles regalo", "Llaveros"] },
  { id: "mar", label: "MAR", color: "#5f9f4b", title: "Expositor Marzo",          desc: "Juegos de exterior para aprovechar el inicio del buen tiempo.",                productsBase: ["Cometas", "Pelotas", "Cuerdas", "Tizas"] },
  { id: "abr", label: "ABR", color: "#6ca85b", title: "Expositor Abril",          desc: "Productos de primavera, Pascua y campañas familiares.",                        productsBase: ["Huevos sorpresa", "Peluches", "Cestas", "Pascua"] },
  { id: "may", label: "MAY", color: "#77b35c", title: "Expositor Mayo",           desc: "Preparación de temporada de calor con juguetes dinámicos.",                   productsBase: ["Pistolas pequeñas", "Burbujeros", "Raquetas", "Discos"] },
  { id: "jun", label: "JUN", color: "#e5a2a2", title: "Expositor Junio",          desc: "Campaña de fin de clases y primeras compras de verano.",                      productsBase: ["Juegos viaje", "Explorador", "Cámaras agua", "Diarios"] },
  { id: "jul", label: "JUL", color: "#df8b8b", title: "Expositor Set de Playa",  desc: "Los productos estrella para playa, piscina y verano.",                        productsBase: ["Cubos y palas", "Pistolas de agua", "Flotadores", "Gafas buceo"] },
  { id: "ago", label: "AGO", color: "#d66a6a", title: "Expositor Agosto",         desc: "Entretenimiento para viajes, vacaciones y tardes de verano.",                 productsBase: ["Juegos magnéticos", "Pasatiempos", "Cartas", "Mini juegos"] },
  { id: "sep", label: "SEP", color: "#d9a14c", title: "Expositor Septiembre",     desc: "Vuelta al cole con productos prácticos e infantiles.",                        productsBase: ["Estuches", "Mochilas", "Papelería", "Fiambreras"] },
  { id: "oct", label: "OCT", color: "#d89a54", title: "Expositor Halloween",      desc: "Disfraces, decoración y accesorios para campañas de impacto visual.",         productsBase: ["Maquillaje", "Disfraces", "Calabazas", "Decoración"] },
  { id: "nov", label: "NOV", color: "#d8a35f", title: "Expositor Noviembre",      desc: "Inicio de campaña navideña y productos de alta demanda.",                     productsBase: ["Juguetes estrella", "Adviento", "Catálogos", "Decoración"] },
  { id: "dic", label: "DIC", color: "#2b6ea7", title: "Expositor Navidad",        desc: "Regalos de última hora y top ventas para diciembre.",                         productsBase: ["Interactivos", "Muñecas", "Pistas", "Construcción"] },
];

const allYearDefs: StandDef[] = [
  { id: "balones",    label: "BALONES",    color: colorMap.orange,    title: "Expositor Balones",      desc: "Surtido completo de balones deportivos para todas las edades.",        productsBase: ["Balón fútbol", "Balón basket", "Voleibol", "Minipelota"] },
  { id: "mascotas",   label: "MASCOTAS",   color: colorMap.green,     title: "Expositor Mascotas",     desc: "Juguetes, accesorios y productos de cuidado para mascotas.",           productsBase: ["Mordedores", "Correas", "Cepillos", "Platos"] },
  { id: "eco",        label: "ECO",        color: colorMap.darkGreen, title: "Expositor Eco",          desc: "Productos reciclables y alternativas respetuosas con el entorno.",     productsBase: ["Madera", "Reutilizables", "Ecológicos", "Manualidades"] },
  { id: "belleza",    label: "BELLEZA",    color: colorMap.orange,    title: "Expositor Belleza",      desc: "Sets de maquillaje, peinados y accesorios infantiles.",                productsBase: ["Manicura", "Bálsamos", "Diademas", "Cepillos"] },
  { id: "cocina",     label: "COCINA",     color: colorMap.red,       title: "Expositor Cocina",       desc: "Accesorios de cocina con colores y licencias familiares.",             productsBase: ["Vasos", "Moldes", "Fiambreras", "Cubiertos"] },
  { id: "desechables",label: "DESECHABLES",color: colorMap.slate,     title: "Expositor Desechables",  desc: "Artículos para cumpleaños, fiestas y celebraciones.",                  productsBase: ["Vasos", "Platos", "Servilletas", "Velas"] },
  { id: "auto",       label: "AUTO",       color: colorMap.black,     title: "Expositor Automóviles",  desc: "Productos funcionales para coche y viaje familiar.",                   productsBase: ["Organizadores", "Parasoles", "Ambientadores", "Protectores"] },
  { id: "juguetes",   label: "JUGUETES",   color: colorMap.green,     title: "Expositor Juguetes",     desc: "Juguetes genéricos de venta constante durante todo el año.",           productsBase: ["Coches", "Muñecos", "Peonzas", "Yoyós"] },
  { id: "toys",       label: "TOYS",       color: colorMap.red,       title: "Expositor Toys",         desc: "Novedades y juguetes de importación exclusivos.",                      productsBase: ["Robots", "Drones", "Slime", "Ciencia"] },
];

const junData: Record<number, { units: string; color: string; alto: number; largo: number; ancho: number }> = {
  60387: { units: "7",  color: "Varios colores surtidos", alto: 20,  largo: 11,   ancho: 20 },
  60390: { units: "12", color: "Varios colores surtidos", alto: 22,  largo: 3,    ancho: 13 },
  60391: { units: "28", color: "Varios colores surtidos", alto: 46,  largo: 5,    ancho: 9  },
  60392: { units: "20", color: "Varios colores surtidos", alto: 20,  largo: 2,    ancho: 20 },
  60393: { units: "8",  color: "Varios colores surtidos", alto: 29,  largo: 4,    ancho: 19 },
  60395: { units: "18", color: "Varios colores surtidos", alto: 20,  largo: 6,    ancho: 9  },
  60396: { units: "9",  color: "Varios colores surtidos", alto: 28,  largo: 15,   ancho: 15 },
  60397: { units: "8",  color: "Varios colores surtidos", alto: 14,  largo: 4,    ancho: 21 },
  60398: { units: "12", color: "Varios colores surtidos", alto: 12,  largo: 12,   ancho: 25 },
  60399: { units: "18", color: "Varios colores surtidos", alto: 11,  largo: 8,    ancho: 19 },
  60400: { units: "8",  color: "Varios colores surtidos", alto: 25,  largo: 4,    ancho: 15 },
  60401: { units: "7",  color: "Varios colores surtidos", alto: 30,  largo: 4,    ancho: 20 },
  60402: { units: "9",  color: "Solo color",              alto: 21,  largo: 4,    ancho: 10 },
  60403: { units: "24", color: "Varios colores surtidos", alto: 38,  largo: 1.5,  ancho: 20 },
  60404: { units: "7",  color: "Varios colores surtidos", alto: 30,  largo: 4,    ancho: 20 },
  60405: { units: "18", color: "Varios colores surtidos", alto: 16,  largo: 12,   ancho: 12 },
  60410: { units: "15", color: "Varios colores surtidos", alto: 27,  largo: 6,    ancho: 6  },
  60411: { units: "20", color: "Varios colores surtidos", alto: 25,  largo: 13,   ancho: 13 },
  60412: { units: "12", color: "Varios colores surtidos", alto: 41,  largo: 8,    ancho: 11 },
  60413: { units: "10", color: "Varios colores surtidos", alto: 20,  largo: 15,   ancho: 25 },
};

const junProductRefs = [60387,60390,60391,60392,60393,60395,60396,60397,60398,60399,60400,60401,60402,60403,60404,60405,60410,60411,60412,60413];

const junProducts: Product[] = junProductRefs.map((ref, i) => {
  const d = junData[ref];
  return {
    id: `jun-${String(i + 1).padStart(2, "0")}`,
    name: `Ref.${ref}`,
    image: `${base}assets/products/jun-${String(i + 1).padStart(2, "0")}.jpg`,
    units: d?.units ?? "",
    price: "",
    color: d?.color,
    alto:  d?.alto,
    largo: d?.largo,
    ancho: d?.ancho,
  };
});

function buildStands(defs: StandDef[]): Stand[] {
  return defs.map((def) => ({
    ...def,
    image: def.id === "jun"
      ? `${base}assets/stands/expositor-jun.png`
      : STAND_DEMO,
    products: def.id === "jun"
      ? junProducts
      : createProducts(def.id, def.productsBase),
  }));
}

export const seasonalStands: Stand[] = buildStands(seasonalDefs);
export const allYearStands: Stand[] = buildStands(allYearDefs);
