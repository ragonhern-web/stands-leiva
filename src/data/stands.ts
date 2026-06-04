import type { Stand, Product } from "../types";

const base = import.meta.env.BASE_URL;

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

// ─── Tipos auxiliares ────────────────────────────────────────────────────────

type ProductRow = {
  units: string;
  color?: string;
  alto?: number;
  largo?: number;
  ancho?: number;
  name?: string;
  desc?: string;
};

type StandInfo = {
  standRef?: string;
  numRefs?: number;
  totalUnits?: number;
  sides?: number;
  priceStand?: string;
  pricePerUnit?: string;
  tipo?: string;
  standAlto?: number;
  standLargo?: number;
  standAncho?: number;
};

type StandExtra = {
  imagePath: string;
  info: StandInfo;
  refs: number[];
  data: Record<number, ProductRow>;
};

// ─── Datos de stands con imágenes reales ─────────────────────────────────────

const standExtras: Record<string, StandExtra> = {

  jun: {
    imagePath: `${base}assets/stands/expositor-jun.png`,
    info: {
      standRef: "99917", numRefs: 20, totalUnits: 338, sides: 2,
      priceStand: "385,32 €", pricePerUnit: "1,14 €",
      tipo: "Medio palé", standAlto: 150, standLargo: 80, standAncho: 60,
    },
    refs: [60387,60390,60391,60392,60393,60395,60396,60397,60398,60399,
           60400,60401,60402,60403,60404,60405,60410,60411,60412,60413],
    data: {
      60387: { units: "7",  color: "Varios colores surtidos", alto: 20,  largo: 11,  ancho: 20 },
      60390: { units: "12", color: "Varios colores surtidos", alto: 22,  largo: 3,   ancho: 13, desc: "Juego de burbujas en blíster con 3 botes y varitas de diferentes formas. Producto de playa/exterior en colores surtidos." },
      60391: { units: "28", color: "Varios colores surtidos", alto: 46,  largo: 5,   ancho: 9,  desc: "Pistola de agua alargada tipo tubo/lanza, presentada en expositor. Mango superior y cuerpo largo en colores surtidos." },
      60392: { units: "20", color: "Varios colores surtidos", alto: 20,  largo: 2,   ancho: 20, desc: "Frisbee/disco volador de plástico con diana central. Producto de juego exterior en varios colores." },
      60393: { units: "8",  color: "Varios colores surtidos", alto: 29,  largo: 4,   ancho: 19, desc: "Juego de buceo con aros de colores para piscina. Incluye 3 aros con forma de pez para lanzar y recoger bajo el agua." },
      60395: { units: "18", color: "Varios colores surtidos", alto: 20,  largo: 6,   ancho: 9,  desc: "Set de playa con barquito, pala, rastrillo y molde con forma de concha. Presentado en bolsa de red." },
      60396: { units: "9",  color: "Varios colores surtidos", alto: 28,  largo: 15,  ancho: 15, desc: "Set de playa con cubo, pala, rastrillo y moldes de animales marinos. Presentado en bolsa de red." },
      60397: { units: "8",  color: "Varios colores surtidos", alto: 14,  largo: 4,   ancho: 21, desc: "Gafas de natación infantiles en blíster, con montura de colores y lente oscura. Producto para piscina/playa." },
      60398: { units: "12", color: "Varios colores surtidos", alto: 12,  largo: 12,  ancho: 25, desc: "Set de playa compacto con barquitos, pala, rastrillo, cuchara y moldes de animales marinos en colores vivos." },
      60399: { units: "18", color: "Varios colores surtidos", alto: 11,  largo: 8,   ancho: 19, desc: "Camión volquete pequeño con accesorios de playa: pala, rastrillo, moldes y cucharón. Colores surtidos." },
      60400: { units: "8",  color: "Varios colores surtidos", alto: 25,  largo: 4,   ancho: 15, desc: "Pistola de agua tipo lanzador espacial en blíster. Depósito integrado y diseño infantil de colores vivos." },
      60401: { units: "7",  color: "Varios colores surtidos", alto: 30,  largo: 4,   ancho: 20, desc: "Pistolas de agua con forma de delfín, presentadas en blíster con varias unidades y colores surtidos." },
      60402: { units: "9",  color: "Solo color",              alto: 21,  largo: 4,   ancho: 10, desc: "Lanza cohetes de juguete con diseño de cohete amarillo y rojo. Producto individual para juego exterior." },
      60403: { units: "24", color: "Varios colores surtidos", alto: 38,  largo: 1.5, ancho: 20, desc: "Salabre telescópico plegable para piscina/playa, con red y mango extensible. Disponible en colores surtidos." },
      60404: { units: "7",  color: "Varios colores surtidos", alto: 30,  largo: 4,   ancho: 20, desc: "Pistolas de agua pequeñas tipo nave, en blíster con tres unidades de diferentes colores." },
      60405: { units: "18", color: "Varios colores surtidos", alto: 16,  largo: 12,  ancho: 12, desc: "Set de playa con molinillo/rueda de agua, pala, rastrillo y accesorios de arena. Colores surtidos." },
      60410: { units: "15", color: "Varios colores surtidos", alto: 27,  largo: 6,   ancho: 6,  desc: "Pack de 4 pelotas pequeñas de plástico con diseño marmoleado/ondas. Presentadas en bolsa de red." },
      60411: { units: "20", color: "Varios colores surtidos", alto: 25,  largo: 13,  ancho: 13, desc: "Juego de palas cesta con agujeros y pelotas pequeñas. Pensado para lanzar y recoger pelotas al aire libre." },
      60412: { units: "12", color: "Varios colores surtidos", alto: 41,  largo: 8,   ancho: 11, desc: "Set de palas largas de playa con mangos y moldes de animales marinos. Presentado en bolsa de red." },
      60413: { units: "10", color: "Varios colores surtidos", alto: 20,  largo: 15,  ancho: 25, desc: "Set de playa con bandeja/cangrejo grande, pala, rastrillo y accesorios de arena. Presentado en bolsa de red." },
    },
  },

  belleza: {
    imagePath: `${base}assets/stands/expositor-belleza.png`,
    info: {
      standRef: "99928", numRefs: 51, totalUnits: 346, sides: 2,
      priceStand: "238,74 €", pricePerUnit: "0,69 €",
      tipo: "Cuarto palé", standAlto: 152, standLargo: 42, standAncho: 60,
    },
    refs: [43084,43085,43086,43087,43088,43089,43090,43091,43093,43094,
           43095,43096,43097,43098,43099,43100,43101,43102,43103,43104,
           43105,43106,43107,43108,43109,43110,43111,43112,43113,43114,
           43115,43116,43117,43118,43119,43120,43121,43122,43123,43124,
           43125,43126,43127,43128,43129,43130,43131,43132,43133,43134,43135],
    data: {
      43084: { units: "14", color: "Varios colores surtidos", alto: 28, largo: 2,  ancho: 6,  name: "Abanico plegable",              desc: "Abanico plegable de plástico y tela en colores vivos, pensado como accesorio de mano para uso diario o eventos." },
      43085: { units: "3",  color: "Varios colores surtidos", alto: 18, largo: 4,  ancho: 13, name: "Pinza de flor grande",           desc: "Pinza decorativa para el pelo con forma de flor tropical de cinco pétalos, acabado brillante y colores degradados." },
      43086: { units: "3",  color: "Varios colores surtidos", alto: 16, largo: 4,  ancho: 13, name: "Pinza de flor grande",           desc: "Pinza para el pelo con flor translúcida de cinco pétalos, disponible en tonos azul, verde, rojo y rosa." },
      43087: { units: "3",  color: "Varios colores surtidos", alto: 18, largo: 4,  ancho: 13, name: "Set de flores decorativas",      desc: "Set de clips o adornos de pelo con flores plásticas pequeñas, en colores vivos y acabado brillante." },
      43088: { units: "3",  color: "Varios colores surtidos", alto: 18, largo: 3,  ancho: 13, name: "Pinza de flor translúcida",      desc: "Pinza decorativa con flor translúcida de pétalos finos y centro de color, disponible en varios tonos suaves." },
      43089: { units: "8",  color: "Varios colores surtidos", alto: 15, largo: 2,  ancho: 10, name: "Gomas de pelo básicas",          desc: "Pack de gomas elásticas de pelo en tejido suave, con acabado ondulado y colores pastel o neutros." },
      43090: { units: "9",  color: "Varios colores surtidos", alto: 15, largo: 1,  ancho: 10, name: "Gomas con adornos infantiles",   desc: "Pack de gomas de pelo con figuras decorativas infantiles tipo helado, planeta, dinosaurio y seta." },
      43091: { units: "7",  color: "Varios colores surtidos", alto: 21, largo: 1,  ancho: 14, name: "Diadema y coleteros",            desc: "Set de diadema fina y coleteros de colores, con piezas textiles y acabado infantil para peinados sencillos." },
      43093: { units: "4",  color: "Varios colores surtidos", alto: 15, largo: 3,  ancho: 7,  name: "Gomas con flores",               desc: "Set de gomas de pelo en tonos neutros con flores decorativas de plástico, pensado para peinados infantiles o casuales." },
      43094: { units: "6",  color: "Varios colores surtidos", alto: 15, largo: 3,  ancho: 10, name: "Gomas y pinzas pequeñas",        desc: "Set de accesorios para el pelo con gomas textiles, trenza decorativa y mini pinzas de plástico en tonos neutros." },
      43095: { units: "5",  color: "Varios colores surtidos", alto: 15, largo: 3,  ancho: 7,  name: "Set de gomas y pinzas",          desc: "Pack combinado de coleteros y pinzas pequeñas con formas de corazón y mariposa, en colores suaves." },
      43096: { units: "6",  color: "Varios colores surtidos", alto: 15, largo: 3,  ancho: 7,  name: "Gomas con flor y lazo",          desc: "Set de gomas de pelo beige con flor textil, lazo decorativo y detalle tipo perla central." },
      43097: { units: "7",  color: "Varios colores surtidos", alto: 15, largo: 2,  ancho: 10, name: "Set de clips infantiles",        desc: "Set de clips para el pelo con lazo, conejo y pinzas alargadas en tonos marrón, crema y beige." },
      43098: { units: "7",  color: "Varios colores surtidos", alto: 15, largo: 2,  ancho: 10, name: "Clips con corazones",            desc: "Set de pinzas para el pelo con corazones decorativos y clip tipo pico de pato en tonos crema, beige y blanco." },
      43099: { units: "5",  color: "Varios colores surtidos", alto: 10, largo: 3,  ancho: 14, name: "Coleteros de espiral",           desc: "Pack de coleteros de espiral tipo cable telefónico en colores pastel y vivos, pensados para sujetar el pelo sin marcarlo tanto." },
      43100: { units: "5",  color: "Varios colores surtidos", alto: 15, largo: 2,  ancho: 10, name: "Coleteros de espiral bicolor",   desc: "Pack de coleteros de espiral bicolor con combinaciones llamativas como rojo, lima, amarillo, azul y morado." },
      43101: { units: "7",  color: "Varios colores surtidos", alto: 15, largo: 2,  ancho: 10, name: "Clips de tela con cuadros",      desc: "Set de clips para el pelo con flor y lazo de tejido estampado a cuadros, en tonos rojo, blanco y negro." },
      43102: { units: "15", color: "Varios colores surtidos", alto: 11, largo: 1,  ancho: 7,  name: "Clip de estrella estampado",     desc: "Set de clips grandes para el pelo con forma de estrella y pasador alargado, acabado estampado tipo animal print." },
      43103: { units: "16", color: "Varios colores surtidos", alto: 11, largo: 1,  ancho: 7,  name: "Clips alargados pastel",         desc: "Set de clips alargados tipo snap en colores pastel, con borde pespunteado decorativo." },
      43104: { units: "8",  color: "Varios colores surtidos", alto: 11, largo: 1,  ancho: 7,  name: "Clips de perro",                 desc: "Set de clips decorativos para el pelo con forma de perrito salchicha, en varios colores y estampados." },
      43105: { units: "10", color: "Varios colores surtidos", alto: 11, largo: 1,  ancho: 7,  name: "Clips de perrito estampado",     desc: "Set de clips para el pelo con figuras de perrito en tela/plástico, con estampados infantiles tipo cuadros, cerezas y lazos." },
      43106: { units: "7",  color: "Varios colores surtidos", alto: 11, largo: 1,  ancho: 7,  name: "Clips de lazo",                  desc: "Set de tres clips para el pelo con forma de lazo, en estampados de cuadros y motivos dulces." },
      43107: { units: "9",  color: "Varios colores surtidos", alto: 11, largo: 2,  ancho: 7,  name: "Clips de mariposa y lazo",       desc: "Set de pinzas decorativas con mariposas y lazo negro, en colores neutros y combinaciones blanco/negro." },
      43108: { units: "8",  color: "Varios colores surtidos", alto: 11, largo: 1,  ancho: 7,  name: "Clips de flores sonrientes",     desc: "Set de clips infantiles para el pelo con flores sonrientes, lazos y estrella, en tonos marrón, blanco y beige." },
      43109: { units: "7",  color: "Varios colores surtidos", alto: 12, largo: 2,  ancho: 7,  name: "Set mixto de clips infantiles",  desc: "Set de accesorios para el pelo con mini pinzas, clips alargados y figuras infantiles como planeta, estrella y flor." },
      43110: { units: "6",  color: "Varios colores surtidos", alto: 10, largo: 2,  ancho: 8,  name: "Set de accesorios infantiles",   desc: "Set de accesorios infantiles para el pelo con flor, cerezas y clips. Incluye goma trenzada y pinzas en tonos crema y marrón." },
      43111: { units: "8",  color: "Varios colores surtidos", alto: 11, largo: 2,  ancho: 7,  name: "Set de clips decorativos negros",desc: "Set de clips decorativos para el pelo con flor, lazo y figura infantil. Diseño en tonos negros con detalles blancos." },
      43112: { units: "10", color: "Varios colores surtidos", alto: 11, largo: 2,  ancho: 7,  name: "Set de pinzas marrones",         desc: "Set de pinzas decorativas para el pelo con flor, lazo y estrellas. Diseño en tonos marrón, beige y crema." },
      43113: { units: "7",  color: "Varios colores surtidos", alto: 10, largo: 2,  ancho: 8,  name: "Pinzas estrella de mar",         desc: "Set de pinzas para el pelo con estrellas de mar decorativas. Diseño veraniego en colores azul y amarillo." },
      43114: { units: "5",  color: "Varios colores surtidos", alto: 28, largo: 3,  ancho: 12, name: "Cepillo desenredante",           desc: "Cepillo desenredante de plástico con doble zona de púas, diseñado para peinar y desenredar el cabello." },
      43115: { units: "15", color: "Varios colores surtidos", alto: 26, largo: 1,  ancho: 9,  name: "Cinta elástica textil",          desc: "Cinta o diadema elástica de tejido con acabado arrugado/brillante, disponible en varios colores y estampados." },
      43116: { units: "4",  color: "Varios colores surtidos", alto: 22, largo: 3,  ancho: 18, name: "Diadema con perlas",             desc: "Diadema ancha forrada de tejido con perlas decorativas, disponible en varios colores surtidos." },
      43117: { units: "5",  color: "Varios colores surtidos", alto: 22, largo: 2,  ancho: 18, name: "Diadema básica forrada",         desc: "Diadema básica forrada de tela lisa. Diseño sencillo para uso diario, disponible en varios colores." },
      43118: { units: "5",  color: "Varios colores surtidos", alto: 22, largo: 2,  ancho: 18, name: "Diadema ancha cruzada",          desc: "Diadema ancha cruzada forrada de tejido, con diseño acolchado tipo nudo superior." },
      43119: { units: "8",  color: "Varios colores surtidos", alto: 22, largo: 2,  ancho: 18, name: "Diadema infantil con flor",      desc: "Diadema infantil forrada de tela con flor decorativa lateral. Diseño suave en tonos pastel." },
      43120: { units: "4",  color: "Varios colores surtidos", alto: 16, largo: 3,  ancho: 11, name: "Masajeador con espejo",          desc: "Cepillo limpiador o masajeador con espejo incorporado. Diseño plegable de plástico con púas y espejo interior." },
      43121: { units: "7",  color: "Varios colores surtidos", alto: 10, largo: 2,  ancho: 18, name: "Diadema de tejido con nudo",     desc: "Diadema de tejido ancho con nudo central. Diseño elástico y cómodo, disponible en varios colores." },
      43122: { units: "4",  color: "Varios colores surtidos", alto: 13, largo: 3,  ancho: 10, name: "Coleteros combinados",           desc: "Set de coleteros de espiral combinado con coletero textil fruncido. Diseño juvenil en tonos rosa y colores pastel." },
      43123: { units: "4",  color: "Varios colores surtidos", alto: 13, largo: 3,  ancho: 10, name: "Coleteros de espiral pastel",    desc: "Set de coleteros de espiral gruesos en colores pastel como rosa, azul y lila." },
      43124: { units: "4",  color: "Varios colores surtidos", alto: 12, largo: 3,  ancho: 10, name: "Coleteros de espiral estampados",desc: "Set de coleteros de espiral con estampados rojos y blancos tipo rayas, cuadros y lunares." },
      43125: { units: "14", color: "Varios colores surtidos", alto: 21, largo: 1,  ancho: 8,  name: "Limas de uñas de colores",      desc: "Set de limas de uñas de colores. Incluye tres limas en tonos rosa, azul y amarillo." },
      43126: { units: "2",  color: "Varios colores surtidos", alto: 17, largo: 7,  ancho: 15, name: "Masajeador capilar",             desc: "Masajeador capilar de plástico con púas de silicona, pensado para masajear el cuero cabelludo o aplicar productos capilares." },
      43127: { units: "8",  color: "Varios colores surtidos", alto: 24, largo: 2,  ancho: 10, name: "Limas de uñas vivas",           desc: "Set de limas de uñas de colores vivos. Incluye tres limas en tonos morado, naranja y rosa degradado." },
      43128: { units: "10", color: "Varios colores surtidos", alto: 22, largo: 1,  ancho: 9,  name: "Kit de pedicura",               desc: "Kit de pedicura con lima, cepillo, separador de dedos y accesorio para cuidado de pies." },
      43129: { units: "4",  color: "Varios colores surtidos", alto: 18, largo: 4,  ancho: 12, name: "Esponjas de maquillaje",        desc: "Set de esponjas de maquillaje en espuma. Incluye esponjas de distintas formas y colores para aplicar o difuminar producto." },
      43130: { units: "5",  color: "Varios colores surtidos", alto: 15, largo: 3,  ancho: 15, name: "Esponjas de maquillaje corazón",desc: "Set de esponjas de maquillaje de espuma con forma de corazón/semicírculo, en tonos pastel y colores surtidos." },
      43131: { units: "3",  color: "Varios colores surtidos", alto: 13, largo: 4,  ancho: 14, name: "Set de esponjas tipo huevo",    desc: "Set de esponjas de maquillaje tipo huevo en distintos tamaños, presentadas en caja transparente con forma decorativa." },
      43132: { units: "4",  color: "Varios colores surtidos", alto: 18, largo: 4,  ancho: 12, name: "Esponjas de maquillaje variadas",desc:"Set de esponjas de maquillaje de espuma en formas mixtas: gota, ovalada y triangular, con colores vivos surtidos." },
      43133: { units: "7",  color: "Varios colores surtidos", alto: 15, largo: 2,  ancho: 10, name: "Esponjas redondas de limpieza", desc: "Set de esponjas redondas de espuma porosa para limpieza facial o corporal, presentadas en varios colores." },
      43134: { units: "7",  color: "Varios colores surtidos", alto: 15, largo: 2,  ancho: 10, name: "Esponja exfoliante ovalada",    desc: "Esponja ovalada de espuma porosa con tira de sujeción, pensada para limpieza facial o corporal." },
      43135: { units: "7",  color: "Varios colores surtidos", alto: 18, largo: 2,  ancho: 12, name: "Disco limpiador suave",         desc: "Disco limpiador facial de textura suave tipo felpa, con cinta de sujeción y acabado esponjoso." },
    },
  },

};

// ─── Stand defs (sin imágenes ni productos — lo gestiona buildStands) ─────────

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

// ─── Construcción genérica ────────────────────────────────────────────────────

function buildRealProducts(id: string, extra: StandExtra): Product[] {
  return extra.refs.map((ref, i) => {
    const d = extra.data[ref];
    const num = String(i + 1).padStart(2, "0");
    return {
      id: `${id}-${num}`,
      name: d?.name ? `${d.name} · Ref.${ref}` : `Ref.${ref}`,
      image: `${extra.imagePath.replace(/[^/]+\.png$/, "")}../products/${id}-${num}.jpg`
        .replace("stands/../", ""),
      units: d?.units ?? "",
      price: extra.info.pricePerUnit ?? "",
      color: d?.color,
      alto:  d?.alto,
      largo: d?.largo,
      ancho: d?.ancho,
      desc:  d?.desc,
    };
  });
}

function buildPlaceholderProducts(prefix: string, baseProducts: string[]): Product[] {
  return Array.from({ length: 5 }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    name: `${baseProducts[index % baseProducts.length]} · Ref.${1000 + index}`,
    image: STAND_DEMO,
    units: "",
    price: "",
  }));
}

function buildStands(defs: StandDef[]): Stand[] {
  return defs.map((def) => {
    const extra = standExtras[def.id];
    if (!extra) {
      return {
        ...def,
        image: STAND_DEMO,
        products: buildPlaceholderProducts(def.id, def.productsBase),
      };
    }
    const products = buildRealProducts(def.id, extra);
    return {
      ...def,
      image: extra.imagePath,
      products,
      ...extra.info,
    };
  });
}

export const seasonalStands: Stand[] = buildStands(seasonalDefs);
export const allYearStands: Stand[] = buildStands(allYearDefs);
