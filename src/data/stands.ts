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

  picnic: {
    imagePath: `${base}assets/stands/expositor-picnic.png`,
    info: { standRef: "99937", numRefs: 18, totalUnits: 321, sides: 2, priceStand: "195,81 €", pricePerUnit: "0,61 €", tipo: "Cuarto palé", standAlto: 125, standLargo: 42, standAncho: 60 },
    refs: [43136,43137,43138,43139,43140,43141,43142,43143,43144,43145,43146,43147,43148,43150,43151,43152,43153,43154],
    data: {
      43136: { units: "20", color: "Estampado frutas y hielo",          alto: 29, largo: 1,  ancho: 21, name: "Bandeja rectangular",               desc: "Bandeja rectangular de cartón con estampado de frutas y hielo. 290 × 205 mm. Formato de 5 unidades." },
      43137: { units: "14", color: "Estampado frutas y hielo",          alto: 23, largo: 2,  ancho: 23, name: "Platos de cartón cuadrados",         desc: "Platos de cartón cuadrados con estampado de frutas y hielo. 23 × 23 cm. Formato de 6 unidades." },
      43138: { units: "18", color: "Estampado frutas y hielo",          alto: 19, largo: 2,  ancho: 19, name: "Platos de cartón cuadrados pequeños", desc: "Platos de cartón cuadrados pequeños con estampado de frutas y hielo. 19 × 19 cm. Formato de 9 unidades." },
      43139: { units: "8",  color: "Estampado frutas / Kraft interior", alto: 9,  largo: 15, ancho: 15, name: "Cuencos de cartón redondos",          desc: "Cuencos de cartón redondos, exterior con estampado de frutas e interior kraft. 15 × 6 cm. Pack de 5 unidades." },
      43140: { units: "10", color: "Estampado frutas / Kraft interior", alto: 12, largo: 5,  ancho: 17, name: "Bandejas de cartón pequeñas",         desc: "Bandejas de cartón pequeñas, exterior frutas e interior kraft. 17 × 12 cm. Pack de 5 unidades." },
      43141: { units: "17", color: "Madera natural",                    alto: 22, largo: 2,  ancho: 10, name: "Cubiertos de madera",                 desc: "Juego de cubiertos de madera (cuchara y tenedor). 16 cm. Pack de 6 juegos." },
      43142: { units: "13", color: "Madera / Rosa y fucsia",            alto: 20, largo: 2,  ancho: 10, name: "Pinchos de madera flamenco",          desc: "Pinchos de madera con figura de flamenco decorativa. 12 cm. Formato de 20 unidades." },
      43143: { units: "15", color: "Madera natural",                    alto: 29, largo: 2,  ancho: 6,  name: "Palillos removedores de café",        desc: "Palillos removedores de café de madera. 140 × 5 mm. Formato de 100 unidades." },
      43144: { units: "12", color: "Estampado frutas y hielo",          alto: 16, largo: 9,  ancho: 9,  name: "Vasos de cartón medianos",            desc: "Vasos de cartón medianos con estampado de frutas y hielo. 354 ml. Pack de 6 unidades." },
      43145: { units: "12", color: "Estampado frutas y hielo",          alto: 18, largo: 9,  ancho: 9,  name: "Vasos de cartón grandes",             desc: "Vasos de cartón grandes con estampado de frutas y hielo. 473 ml. Pack de 6 unidades." },
      43146: { units: "18", color: "Diseño cerveza",                    alto: 16, largo: 9,  ancho: 9,  name: "Vasos de cartón diseño cerveza",      desc: "Vasos de cartón con diseño de cerveza. 354 ml. Pack de 6 unidades." },
      43147: { units: "18", color: "Diseño refresco con hielo",         alto: 16, largo: 9,  ancho: 9,  name: "Vasos de cartón diseño refresco",     desc: "Vasos de cartón con diseño de refresco con hielo. 354 ml. Pack de 6 unidades." },
      43148: { units: "34", color: "Estampado frutas y hielo",          alto: 17, largo: 1,  ancho: 17, name: "Servilletas de papel",                desc: "Servilletas de papel con estampado de frutas y hielo. 33 × 33 cm. Formato de 20 unidades." },
      43150: { units: "12", color: "Diseño granos de café",             alto: 13, largo: 8,  ancho: 8,  name: "Vasos de cartón café grandes",        desc: "Vasos de cartón con diseño de granos de café. 240 ml. Pack de 8 unidades." },
      43151: { units: "18", color: "Diseño granos de café",             alto: 13, largo: 8,  ancho: 8,  name: "Vasos de cartón café medianos",       desc: "Vasos de cartón con diseño de granos de café. 210 ml. Pack de 10 unidades." },
      43152: { units: "24", color: "Diseño granos de café",             alto: 12, largo: 6,  ancho: 6,  name: "Vasos de cartón café pequeños",       desc: "Vasos de cartón con diseño de granos de café. 120 ml. Pack de 12 unidades." },
      43153: { units: "28", color: "Negro con logo blanco",             alto: 26, largo: 1,  ancho: 14, name: "Pajitas de cartón",                   desc: "Pajitas de cartón negras con logo blanco. 20 cm. Formato de 20 unidades." },
      43154: { units: "30", color: "Estampado frutas y hielo",          alto: 31, largo: 1,  ancho: 8,  name: "Mantel de mesa de plástico",          desc: "Mantel de mesa de plástico con estampado de frutas y hielo. 180 × 108 cm." },
    },
  },

  auto: {
    imagePath: `${base}assets/stands/expositor-auto.png`,
    info: { standRef: "99939", numRefs: 27, totalUnits: 244, sides: 2, priceStand: "283,04 €", pricePerUnit: "1,16 €", tipo: "Cuarto palé", standAlto: 125, standLargo: 40, standAncho: 60 },
    refs: [32321,32322,32323,32324,32325,32326,32327,32328,32329,32330,32331,32332,32333,32334,32335,32336,32337,32338,32339,32340,32341,32342,32343,32344,32345,32346,32347],
    data: {
      32321: { units: "30", color: "Varios aromas surtidos",        alto: 19, largo: 3, ancho: 9,  name: "Ambientador colgante para coche",    desc: "Ambientador líquido para coche colgante. Varios aromas surtidos." },
      32322: { units: "8",  color: "Varios colores surtidos",       alto: 21, largo: 4, ancho: 11, name: "Estuche rígido para gafas",          desc: "Estuche rígido para gafas de plástico con textura de tela. Varios colores surtidos." },
      32323: { units: "12", color: "Varios colores surtidos",       alto: 12, largo: 1, ancho: 8,  name: "Tapones para válvulas (4 uds)",      desc: "Tapones metálicos para válvulas de neumáticos. Pack de 4 unidades." },
      32324: { units: "7",  color: "Espejo con borde negro",        alto: 17, largo: 2, ancho: 8,  name: "Espejo retrovisor punto ciego (2u)", desc: "Espejo retrovisor de punto ciego de plástico. Pack de 2 unidades." },
      32325: { units: "4",  color: "Varios colores surtidos",       alto: 15, largo: 4, ancho: 9,  name: "Cargador USB para coche 2 entradas", desc: "Cargador USB de coche con 2 entradas (2,1A / 5V). 1 unidad." },
      32326: { units: "9",  color: "Negro/Plata",                   alto: 17, largo: 2, ancho: 11, name: "Cable cargador USB trenzado (3 sal)",desc: "Cable cargador USB trenzado con 3 salidas. 1 unidad." },
      32327: { units: "4",  color: "Varios colores surtidos",       alto: 25, largo: 1, ancho: 18, name: "Cenicero de plástico para coche",    desc: "Cenicero de plástico para coche. 8 cm. 1 unidad." },
      32328: { units: "4",  color: "Negro y verde",                 alto: 17, largo: 4, ancho: 10, name: "Esponja doble acción lavado coche",  desc: "Esponja doble acción para lavado de coches. Pack de 2 unidades." },
      32329: { units: "5",  color: "Varios colores surtidos",       alto: 19, largo: 2, ancho: 11, name: "Set de viaje almohada + antifaz",    desc: "Set de viaje: almohada hinchable, antifaz y tapones para los oídos." },
      32330: { units: "4",  color: "Azul y negro",                  alto: 20, largo: 5, ancho: 12, name: "Lápiz reparador de arañazos",        desc: "Lápiz reparador de arañazos con barniz transparente. Incluye puntas de recambio." },
      32331: { units: "10", color: "Gris / Plata",                  alto: 32, largo: 2, ancho: 23, name: "Funda para motos de plástico",       desc: "Funda para motos de plástico. 205 × 125 cm." },
      32332: { units: "12", color: "Rojo, Verde, Azul surtidos",    alto: 25, largo: 1, ancho: 18, name: "Poncho impermeable con capucha",     desc: "Poncho impermeable reutilizable con capucha. 100 × 130 cm. Varios colores." },
      32333: { units: "10", color: "Varios colores surtidos",       alto: 15, largo: 3, ancho: 9,  name: "Soporte móvil para coche 360°",     desc: "Soporte de móvil para coche con rotación 360°. 1 unidad." },
      32334: { units: "6",  color: "Varios colores surtidos",       alto: 18, largo: 5, ancho: 12, name: "Red elástica para equipaje",         desc: "Red elástica para equipaje. 30 × 30 cm. 1 unidad." },
      32335: { units: "7",  color: "Varios colores surtidos",       alto: 17, largo: 4, ancho: 10, name: "Pulpo elástico con ganchos 160 cm",  desc: "Pulpo elástico con ganchos para sujeción. 160 cm." },
      32336: { units: "10", color: "Varios colores surtidos",       alto: 28, largo: 1, ancho: 14, name: "Guantes con puntos antideslizantes", desc: "Guantes de tejido con puntos antideslizantes. 1 par." },
      32337: { units: "4",  color: "Naranja y negro",               alto: 25, largo: 4, ancho: 12, name: "Martillo de seguridad",              desc: "Martillo de seguridad con funda de plástico. Naranja y negro." },
      32338: { units: "15", color: "Varios colores surtidos",       alto: 17, largo: 6, ancho: 7,  name: "Gamuza sintética húmeda en bote",   desc: "Gamuza sintética húmeda en bote. Para limpieza de superficies." },
      32339: { units: "16", color: "Varios aromas surtidos",        alto: 17, largo: 4, ancho: 4,  name: "Ambientador spray pulverizador",    desc: "Ambientador pulverizador en spray. Varios aromas surtidos." },
      32340: { units: "8",  color: "Blanco y verde",                alto: 24, largo: 3, ancho: 7,  name: "Cepillo ventilación auto doble función", desc: "Cepillo de ventilación para coche de doble función. Blanco y verde." },
      32341: { units: "8",  color: "Negro (malla semitransparente)", alto: 22, largo: 1, ancho: 16, name: "Parasol de ventanilla (2 uds)",     desc: "Parasol de ventanilla de malla semitransparente. 38 × 43 cm. Pack de 2 unidades." },
      32342: { units: "8",  color: "Varios colores surtidos",       alto: 22, largo: 1, ancho: 16, name: "Bayeta de microfibra 30×40 cm",     desc: "Bayeta de microfibra. 30 × 40 cm. 1 unidad." },
      32343: { units: "10", color: "Varios colores surtidos",       alto: 23, largo: 1, ancho: 16, name: "Bayeta microfibra especial cristales", desc: "Bayeta de microfibra especial para cristales. 40 × 40 cm." },
      32344: { units: "15", color: "Metalizado plata",              alto: 65, largo: 3, ancho: 15, name: "Parasol frontal metalizado 130×60",  desc: "Parasol frontal metalizado para parabrisas. 130 × 60 cm." },
      32345: { units: "8",  color: "Varios colores surtidos",       alto: 36, largo: 5, ancho: 12, name: "Mopa de rizo para coche",           desc: "Mopa de rizo para limpieza de coche. 1 unidad." },
      32346: { units: "2",  color: "Naranja y amarillo",            alto: 24, largo: 6, ancho: 11, name: "Esponja doble acción lisa/ondulada", desc: "Esponja de doble acción (cara lisa y cara ondulada). Pack de 2 unidades." },
      32347: { units: "8",  color: "Varios colores surtidos",       alto: 25, largo: 2, ancho: 21, name: "Manopla de microfibra de rizo",     desc: "Manopla de microfibra de rizo para lavado de coche. 1 unidad." },
    },
  },

  balones: {
    imagePath: `${base}assets/stands/expositor-balones.png`,
    info: { numRefs: 1, totalUnits: 40, sides: 2, tipo: "Box palé dispensador", standAlto: 145, standLargo: 42, standAncho: 60 },
    refs: [60388],
    data: {
      60388: { units: "40", color: "Varios colores surtidos", name: "Balón de cuero sintético", desc: "Balón de cuero sintético en caja dispensadora. 40 unidades surtidas. Incluye expositor dispensador de cartón." },
    },
  },

  desechables: {
    imagePath: `${base}assets/stands/expositor-desechables.png`,
    info: { standRef: "99920", numRefs: 10, totalUnits: 231, sides: 2, priceStand: "263,34 €", pricePerUnit: "1,14 €", tipo: "Cuarto palé", standAlto: 125, standLargo: 42, standAncho: 60 },
    refs: [43214,43215,43216,43217,43218,43219,43220,43221,43222,43223],
    data: {
      43214: { units: "30", color: "Diseño navideño",                                             name: "Bandeja rectangular navideña",        desc: "Bandeja rectangular con diseño navideño de corona, lazo rojo, ramas y cascabeles. Formato de 8 unidades." },
      43215: { units: "12", color: "Diseño navideño", alto: 18, largo: 3,  ancho: 18,             name: "Plato redondo pequeño navideño",      desc: "Plato redondo pequeño de plástico con decoración navideña. Formato de 18 unidades." },
      43216: { units: "19", color: "Diseño navideño", alto: 23, largo: 3,  ancho: 23,             name: "Plato redondo grande navideño",       desc: "Plato redondo grande de plástico con decoración navideña. Formato de 12 unidades." },
      43217: { units: "11", color: "Diseño navideño",                                             name: "Plato redondo navideño lazo",         desc: "Plato redondo de plástico con decoración navideña de corona, lazo rojo y cascabeles. Formato de 12 unidades." },
      43218: { units: "12", color: "Transparente con detalle plateado",                           name: "Copas transparentes picnic (4 uds)", desc: "Copas transparentes de plástico con borde y base plateados. Pack de 4 unidades." },
      43219: { units: "15", color: "Transparente",                                                name: "Cubiertos de plástico (4 juegos)",   desc: "Juego de cubiertos de plástico transparente: tenedor, cuchara y cuchillo. Formato de 4 juegos." },
      43220: { units: "24", color: "Diseño navideño", alto: 16, largo: 9,  ancho: 9,              name: "Vaso de cartón navideño 354ml",       desc: "Vaso de cartón con diseño navideño. 354 ml. Formato de 14 unidades." },
      43221: { units: "24", color: "Diseño navideño",                                             name: "Vaso de cartón navideño 473ml",       desc: "Vaso grande de cartón con diseño navideño. 473 ml. Formato de 12 unidades." },
      43222: { units: "72", color: "Diseño navideño", alto: 33, largo: 5,  ancho: 33,             name: "Servilletas de papel navideñas",      desc: "Servilletas de papel blancas con decoración navideña. Formato de 24 unidades." },
      43223: { units: "12", color: "Diseño navideño", alto: 31, largo: 1,  ancho: 8,              name: "Mantel navideño Merry Christmas",     desc: "Mantel navideño de plástico con diseño Merry Christmas. 180 × 108 cm." },
    },
  },

  eco: {
    imagePath: `${base}assets/stands/expositor-eco.png`,
    info: { standRef: "99918", numRefs: 8, totalUnits: 78, sides: 2, priceStand: "138,84 €", pricePerUnit: "1,78 €", tipo: "Cuarto palé", standAlto: 150, standLargo: 40, standAncho: 60 },
    refs: [60383,60384,60385,60386,60406,60407,60408,60409],
    data: {
      60383: { units: "12", color: "Varios colores surtidos", alto: 38, largo: 8,  ancho: 12, name: "Palas playa mango de madera",      desc: "Set de palas largas de playa con mango de madera y piezas de plástico/madera, acompañado de moldes marinos." },
      60384: { units: "12", color: "Varios colores surtidos", alto: 19, largo: 15, ancho: 15, name: "Set de playa colección natural",   desc: "Set de playa de colección natural con cubo, pala, rastrillo, molino y moldes marinos. Presentado en bolsa de red." },
      60385: { units: "8",  color: "Varios colores surtidos", alto: 20, largo: 18, ancho: 15, name: "Camión volquete natural de playa", desc: "Camión volquete de colección natural con accesorios de playa: pala, rastrillo y moldes marinos." },
      60386: { units: "4",  color: "Varios colores surtidos", alto: 13, largo: 15, ancho: 35, name: "Carretilla de playa natural",      desc: "Carretilla de playa con accesorios de arena de colección natural: pala, rastrillo y moldes marinos." },
      60406: { units: "12", color: "Varios colores surtidos", alto: 18, largo: 14, ancho: 15, name: "Regadera infantil dinosaurio",     desc: "Regadera infantil con forma de dinosaurio y accesorios de playa de colección natural." },
      60407: { units: "10", color: "Varios colores surtidos", alto: 20, largo: 14, ancho: 16, name: "Set de playa con cubo natural",    desc: "Set de playa con cubo, pala, rastrillo y moldes de animales marinos de colección natural." },
      60408: { units: "12", color: "Varios colores surtidos", alto: 22, largo: 9,  ancho: 16, name: "Juego de bolos natural infantil",  desc: "Juego de bolos infantil de colección natural, con bolos y bola en colores suaves surtidos." },
      60409: { units: "8",  color: "Solo color",              alto: 34, largo: 5,  ancho: 19, name: "Palas de madera con pelota",       desc: "Set de palas de playa de madera con pelota. Diseño clásico tipo beach ball para juego exterior." },
    },
  },

  juguetes: {
    imagePath: `${base}assets/stands/expositor-juguetes.png`,
    info: { standRef: "99922", numRefs: 21, totalUnits: 105, sides: 2, priceStand: "309,75 €", pricePerUnit: "2,95 €", tipo: "Cuarto palé", standAlto: 125, standLargo: 42, standAncho: 60 },
    refs: [60414,60415,60416,60417,60418,60419,60420,60421,60422,60423,60424,60425,60426,60427,60428,60429,60430,60431,60432,60433,60434],
    data: {
      60414: { units: "5", color: "Varios modelos surtidos", alto: 22, largo: 1,  ancho: 30, name: "Juego didáctico madera números",    desc: "Juego didáctico de madera con números y signos matemáticos de colores. Sirve para aprender números y operaciones básicas." },
      60415: { units: "5", color: "Varios modelos surtidos", alto: 22, largo: 1,  ancho: 30, name: "Juego didáctico madera abecedario", desc: "Juego didáctico de madera con letras del abecedario en minúscula. Piezas de colores sobre tablero para aprendizaje inicial." },
      60416: { units: "5", color: "Varios colores",          alto: 21, largo: 2,  ancho: 21, name: "Bloques geométricos / tangram madera", desc: "Juego didáctico de madera tipo bloques geométricos/tangram en caja. Piezas de diferentes formas y colores para crear figuras." },
      60417: { units: "5", color: "Varios colores surtidos", alto: 24, largo: 5,  ancho: 20, name: "Ábaco de madera con cuentas",       desc: "Ábaco de madera con cuentas de colores. Juego didáctico para aprender a contar y hacer operaciones básicas." },
      60418: { units: "5", color: "Varios colores surtidos", alto: 30, largo: 1,  ancho: 30, name: "Puzzle madera animales",            desc: "Puzzle infantil de madera con ilustraciones de animales en distintas escenas. Varios diseños surtidos." },
      60419: { units: "5", color: "Varios colores surtidos", alto: 30, largo: 1,  ancho: 13, name: "Puzzle madera encajable numerado",  desc: "Puzzle de madera encajable con personajes y animales. Cada pieza numerada ayuda al montaje y aprendizaje." },
      60420: { units: "5", color: "Varios colores",          alto: 24, largo: 2,  ancho: 12, name: "Xilófono de madera infantil",       desc: "Xilófono de madera infantil con láminas de colores. Instrumento musical didáctico para niños." },
      60421: { units: "5", color: "Varios colores surtidos", alto: 15, largo: 1,  ancho: 29, name: "Puzzle madera animales marinos",    desc: "Puzzle didáctico de madera con animales marinos y nombres en inglés. Piezas encajables de colores." },
      60422: { units: "5", color: "Varios colores",          alto: 29, largo: 6,  ancho: 6,  name: "Clasificador formas geométricas",   desc: "Juego didáctico de madera para clasificar y apilar formas geométricas de colores. Base con figuras y pivotes." },
      60423: { units: "5", color: "Varios colores surtidos", alto: 26, largo: 2,  ancho: 13, name: "Puzzle madera con letras animal",   desc: "Puzzle de madera con forma de animal y letras. Juego encajable para aprender letras y secuencias." },
      60424: { units: "5", color: "Varios modelos surtidos", alto: 30, largo: 1,  ancho: 15, name: "Puzzle didáctico figuras surtidas", desc: "Puzzle didáctico de madera con figuras y personajes surtidos. Incluye piezas encajables para formar dibujos." },
      60425: { units: "5", color: "Varios modelos surtidos", alto: 18, largo: 1,  ancho: 30, name: "Puzzle madera cohete y modelos",    desc: "Puzzle didáctico de madera con forma de cohete y otros modelos surtidos. Piezas numeradas y de colores." },
      60426: { units: "5", color: "Varios modelos surtidos", alto: 15, largo: 1,  ancho: 22, name: "Puzzle bloques animales encajables",desc: "Puzzle de madera con bloques tipo animales encajables. Piezas grandes de colores para composición y aprendizaje." },
      60427: { units: "5", color: "Varios colores surtidos", alto: 30, largo: 1,  ancho: 30, name: "Juego tres en raya de madera",      desc: "Juego clásico tres en raya de madera con piezas X y O. Presentado en tablero cuadrado." },
      60428: { units: "5", color: "Varios colores",          alto: 13, largo: 7,  ancho: 16, name: "Ábaco y tabla de restas madera",    desc: "Juego didáctico de madera con ábaco y tabla de restas. Incluye cuentas de colores para aprender operaciones." },
      60429: { units: "5", color: "Varios colores",          alto: 22, largo: 8,  ancho: 8,  name: "Torre de madera bloques apilables", desc: "Juego de torre de madera tipo bloques apilables. Incluye 48 piezas de colores y 1 dado." },
      60430: { units: "5", color: "Varios modelos surtidos", alto: 34, largo: 2,  ancho: 22, name: "Marco de madera para pintar",       desc: "Marco / cuadro de madera para pintar con pincel, pinturas y rotuladores. Varios modelos infantiles surtidos." },
      60431: { units: "5", color: "Varios modelos surtidos", alto: 34, largo: 2,  ancho: 22, name: "Pizarra de madera para dibujar",    desc: "Pizarra de madera tipo tablero negro para escribir o dibujar. Disponible en varios modelos surtidos." },
      60432: { units: "5", color: "Varios modelos surtidos",                                  name: "Puzzle 3D edificios y vehículos",   desc: "Puzzle 3D de cartón/madera para montar edificios o vehículos. Varios modelos: castillo, barco, moto o tren." },
      60433: { units: "5", color: "Varios modelos surtidos", alto: 23, largo: 2,  ancho: 30, name: "Puzzle 3D madera vehículo obra",    desc: "Puzzle 3D de madera para montar maquinaria de obra. Modelo Bulldozer y otros vehículos de construcción surtidos." },
      60434: { units: "5", color: "Varios modelos surtidos", alto: 25, largo: 2,  ancho: 30, name: "Lámina de madera para colorear",    desc: "Lámina / cuadro de madera para colorear con caballete, pinceles o pinturas. Varios modelos infantiles surtidos." },
    },
  },

  mascotas: {
    imagePath: `${base}assets/stands/expositor-mascotas.png`,
    info: { standRef: "99936", numRefs: 25, totalUnits: 225, sides: 2, priceStand: "261,00 €", pricePerUnit: "1,16 €", tipo: "Cuarto palé", standAlto: 125, standLargo: 42, standAncho: 60 },
    refs: [51584,51585,51586,51587,51588,51589,51590,51591,51592,51593,51594,51595,51596,51597,51598,51599,51600,51601,51602,51603,51604,51605,51606,51607,51608],
    data: {
      51584: { units: "7",  color: "Varios colores surtidos",         alto: 17, largo: 4,  ancho: 10, name: "Juguete hueso de goma con cuerda",  desc: "Juguete hueso de goma con cuerda y pitido. Varios colores surtidos." },
      51585: { units: "7",  color: "Gris",                            alto: 14, largo: 3,  ancho: 9,  name: "Juguete ratón de peluche",          desc: "Juguete ratón de peluche con cuerda. Color gris." },
      51586: { units: "6",  color: "Varios colores surtidos",         alto: 14, largo: 4,  ancho: 14, name: "Juguete donut de goma con pitido",   desc: "Juguete donut de goma con pitido. Varios colores surtidos." },
      51587: { units: "5",  color: "Azul / Negro",                    alto: 20, largo: 4,  ancho: 9,  name: "Rodillo quitapelusas (3 rollos)",   desc: "Rodillo quitapelusas. Incluye 3 rollos de 10 capas cada uno." },
      51588: { units: "10", color: "Madera / Rojo / Negro",           alto: 27, largo: 5,  ancho: 8,  name: "Cepillo madera doble cara",          desc: "Cepillo de madera doble cara para mascotas. Mango de madera, rojo y negro." },
      51589: { units: "9",  color: "Varios colores surtidos",         alto: 26, largo: 3,  ancho: 8,  name: "Collar de nylon 60 cm",              desc: "Collar de nylon. 60 cm de largo. Varios colores surtidos." },
      51590: { units: "11", color: "Varios colores surtidos",         alto: 19, largo: 2,  ancho: 13, name: "Comedero silicona plegable",         desc: "Comedero de silicona plegable con mosquetón. Varios colores surtidos." },
      51591: { units: "15", color: "Varios colores surtidos",         alto: 27, largo: 2,  ancho: 17, name: "Guante de goma quitapelos",          desc: "Guante de goma para quitar pelos de mascotas. Varios colores surtidos." },
      51592: { units: "10", color: "Varios colores surtidos",         alto: 24, largo: 4,  ancho: 13, name: "Correa de cuerda asa acolchada",     desc: "Correa de cuerda con asa acolchada. 120 cm de largo, 1 cm de ancho. Varios colores." },
      51593: { units: "9",  color: "Blanco",                          alto: 19, largo: 4,  ancho: 9,  name: "Rastrillo de púas de hierro",        desc: "Rastrillo de púas de hierro para cuidado de mascotas. Color blanco." },
      51594: { units: "8",  color: "Azul / Blanco",                   alto: 34, largo: 1,  ancho: 15, name: "Empapadores para perros (10 uds)",  desc: "Empapadores para perros. 45 × 33 cm. Pack de 10 unidades. Azul y blanco." },
      51595: { units: "5",  color: "Varios colores surtidos",         alto: 21, largo: 5,  ancho: 11, name: "Juguete hueso de tejido",            desc: "Juguete hueso de tejido para mascotas. Varios colores surtidos." },
      51596: { units: "7",  color: "Rojo",                            alto: 19, largo: 4,  ancho: 15, name: "Juguete salchichas con cuerda",      desc: "Juguete de plástico tipo salchichas con cuerda. Color rojo." },
      51597: { units: "12", color: "Varios colores surtidos",         alto: 11, largo: 4,  ancho: 10, name: "Hierba gatera en soporte plástico",  desc: "Hierba gatera en soporte de plástico. Varios colores surtidos." },
      51598: { units: "15", color: "Varios colores surtidos",         alto: 25, largo: 2,  ancho: 7,  name: "Collar reflectante",                 desc: "Collar reflectante para mascotas. Varios colores surtidos." },
      51599: { units: "8",  color: "Envase transparente",             alto: 6,  largo: 9,  ancho: 13, name: "Hierba gatera en tarrina",           desc: "Hierba gatera en tarrina. Envase transparente." },
      51600: { units: "11", color: "Varios colores surtidos",         alto: 25, largo: 2,  ancho: 10, name: "Arnés de nylon 1 cm ancho",          desc: "Arnés de nylon para mascotas. 1 cm de ancho. Varios colores surtidos." },
      51601: { units: "10", color: "Varios colores surtidos",         alto: 17, largo: 2,  ancho: 11, name: "Juguete hueso de goma pequeño",      desc: "Juguete hueso de goma pequeño para mascotas. Varios colores surtidos." },
      51602: { units: "7",  color: "Varios colores surtidos",         alto: 21, largo: 3,  ancho: 9,  name: "Juguete hueso de goma grande",       desc: "Juguete hueso de goma grande para mascotas. Varios colores surtidos." },
      51603: { units: "12", color: "Varios colores surtidos",         alto: 22, largo: 7,  ancho: 39, name: "Comedero doble de plástico",         desc: "Comedero doble de plástico para mascotas. Varios colores surtidos." },
      51604: { units: "12", color: "Dispensador rojo, rollos surtidos",alto: 18, largo: 4, ancho: 17, name: "Dispensador bolsas hueso + 4 rollos",desc: "Dispensador de bolsas en forma de hueso con 4 rollos (90 bolsas). Dispensador rojo, bolsas en colores surtidos." },
      51605: { units: "6",  color: "Rojo, verde y blanco",            alto: 19, largo: 4,  ancho: 6,  name: "Juguete cuerda trenzada con nudos",  desc: "Juguete de cuerda trenzada con nudos. Rojo, verde y blanco." },
      51606: { units: "6",  color: "Varios colores surtidos",         alto: 4,  largo: 16, ancho: 28, name: "Comedero doble forma de gato",       desc: "Comedero doble de plástico con forma de gato. Varios colores surtidos." },
      51607: { units: "10", color: "Gris",                            alto: 14, largo: 3,  ancho: 13, name: "Collar repelente de goma",           desc: "Collar repelente de goma. Ajustable y resistente al agua. Color gris." },
      51608: { units: "7",  color: "Envase azul",                     alto: 11, largo: 5,  ancho: 20, name: "Toallitas húmedas perros y gatos",   desc: "Toallitas húmedas para perros y gatos. 20 unidades por envase." },
    },
  },

  cocina: {
    imagePath: `${base}assets/stands/expositor-cocina.png`,
    info: {
      standRef: "99929", numRefs: 30, totalUnits: 296, sides: 2,
      priceStand: "337,44 €", pricePerUnit: "1,14 €",
      tipo: "Cuarto palé", standAlto: 125, standLargo: 42, standAncho: 60,
    },
    refs: [43156,43157,43158,43159,43160,43161,43163,43165,43166,43167,
           43168,43169,43170,43171,43172,43173,43174,43175,43176,43178,
           43179,43180,43181,43182,43183,43184,43185,43186,43187,43188],
    data: {
      43156: { units: "10", color: "Negro, mango madera",       alto: 29,                      name: "Sartén con mango de madera",          desc: "Mini sartén con mango de madera. Color negro." },
      43157: { units: "9",  color: "Cabezal negro",             alto: 35, largo: 3,  ancho: 7,  name: "Espátula con mango de madera",        desc: "Espátula / utensilio de cocina con mango de madera y cabezal negro." },
      43158: { units: "9",  color: "Cabezal negro",             alto: 37, largo: 6,  ancho: 7,  name: "Cuchara con mango de madera",         desc: "Cuchara / cucharón con mango de madera y cabezal negro." },
      43159: { units: "6",  color: "Varillas negras",           alto: 28, largo: 7,  ancho: 7,  name: "Batidor con mango de madera",         desc: "Batidor de varillas con mango de madera y varillas negras." },
      43160: { units: "9",  color: "Brocha negra",              alto: 28, largo: 2,  ancho: 7,  name: "Pincel de cocina con mango de madera",desc: "Pincel / brocha de cocina con mango de madera y cerdas negras." },
      43161: { units: "9",  color: "Cabezal negro",             alto: 36, largo: 4,  ancho: 8,  name: "Espátula ranurada con mango de madera",desc: "Espátula ranurada con mango de madera y cabezal negro." },
      43163: { units: "9",  color: "Mango negro",               alto: 25, largo: 2,  ancho: 15, name: "Set pelador y cuchillo",              desc: "Set con pelador y cuchillo. Mango negro y hoja de acero inoxidable." },
      43165: { units: "8",  color: "Mango negro",               alto: 25, largo: 2,  ancho: 10, name: "Cortador de pizza",                   desc: "Cortador de pizza con rueda metálica y mango negro." },
      43166: { units: "9",  color: "Mango negro",               alto: 27, largo: 2,  ancho: 7,  name: "Rallador manual",                     desc: "Rallador manual con mango negro y cuerpo metálico." },
      43167: { units: "10", color: "Mango negro",               alto: 34, largo: 2,  ancho: 7,  name: "Espátula metálica",                   desc: "Espátula metálica con mango negro." },
      43168: { units: "14", color: "Puntas negras",             alto: 38, largo: 6,  ancho: 7,  name: "Pinzas de cocina",                    desc: "Pinzas de cocina de acero inoxidable con puntas negras de silicona." },
      43169: { units: "10", color: "Mango negro",               alto: 16, largo: 2,  ancho: 7,  name: "Abrelatas manual",                    desc: "Abrelatas manual de acero inoxidable con mango negro." },
      43170: { units: "11", color: "Negro",                     alto: 22, largo: 2,  ancho: 19, name: "Salvamanteles metálico rectangular",  desc: "Salvamanteles / soporte metálico rectangular. Color negro." },
      43171: { units: "13", color: "Cristal transparente",      alto: 19, largo: 5,  ancho: 5,  name: "Aceitera spray 100 ml",               desc: "Aceitera spray de 100 ml con envase de cristal. Para aceite o vinagre." },
      43172: { units: "6",  color: "Cristal transparente",      alto: 29, largo: 6,  ancho: 6,  name: "Aceitera 500 ml con vertedor",        desc: "Botella de cristal de 500 ml con vertedor / dosificador. Para aceite o vinagre." },
      43173: { units: "11", color: "Acero inoxidable",          alto: 7,  largo: 21, ancho: 28, name: "Cesta colador metálico rectangular",  desc: "Cesta / colador metálico rectangular de acero inoxidable. 28 × 21 cm." },
      43174: { units: "10", color: "Mango negro",               alto: 20, largo: 4,  ancho: 7,  name: "Sacacorchos",                         desc: "Sacacorchos de acero inoxidable con mango negro." },
      43175: { units: "12", color: "Mango negro y rojo",        alto: 23, largo: 1,  ancho: 9,  name: "Tijeras de cocina",                   desc: "Tijeras de cocina con mango negro y rojo y hoja de acero inoxidable." },
      43176: { units: "9",  color: "Mango negro y azul",        alto: 24, largo: 1,  ancho: 10, name: "Tijeras multiusos de cocina",          desc: "Tijeras multiusos de cocina con mango negro y azul y hoja de acero inoxidable." },
      43178: { units: "12", color: "Mango negro",               alto: 23, largo: 8,  ancho: 8,  name: "Prensador / machacador manual",       desc: "Prensador / machacador manual con mango negro y base metálica perforada." },
      43179: { units: "10", color: "Estampado girasoles",       alto: 32, largo: 2,  ancho: 19, name: "Set de manoplas de cocina",           desc: "Set de manoplas / agarradores de cocina con estampado de girasoles." },
      43180: { units: "6",  color: "Mango negro",               alto: 37, largo: 4,  ancho: 13, name: "Colador araña / espumadera",          desc: "Colador araña / espumadera de alambre con mango negro." },
      43181: { units: "9",  color: "Mango negro",               alto: 36, largo: 3,  ancho: 10, name: "Rascador limpiador con cuchilla",     desc: "Rascador / limpiador con cuchilla. Mango negro y hoja metálica." },
      43182: { units: "13", color: "Mango negro",               alto: 23, largo: 1,  ancho: 12, name: "Set de 4 cuchillos de cocina",        desc: "Set de 4 cuchillos de cocina con mango negro y hoja de acero inoxidable." },
      43183: { units: "12", color: "Mango negro",               alto: 35, largo: 4,  ancho: 16, name: "Colador / tamiz circular",            desc: "Colador / tamiz circular de acero inoxidable con mango negro." },
      43184: { units: "16", color: "Mango negro",               alto: 34, largo: 2,  ancho: 11, name: "Set cuchillo y afilador",             desc: "Set de cuchillo y afilador / chaira con mango negro y hoja de acero inoxidable." },
      43185: { units: "6",  color: "Acero inoxidable",                                           name: "Cuchillo de pan 32 cm",               desc: "Cuchillo de pan de acero inoxidable. Longitud total: 32 cm." },
      43186: { units: "6",  color: "Acero inoxidable",                                           name: "Cuchillo de cocina 40 cm",            desc: "Cuchillo de cocina de acero inoxidable. Longitud total: 40 cm." },
      43187: { units: "9",  color: "Cristal transparente",      alto: 21, largo: 5,  ancho: 10, name: "Set de 2 aceiteras de cristal",       desc: "Set de 2 aceiteras / vinagreras de cristal. Pack de 2 unidades." },
      43188: { units: "13", color: "Negro",                     alto: 30, largo: 1,  ancho: 20, name: "Tabla de corte",                      desc: "Tabla de corte de plástico. Color negro." },
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
  { id: "picnic",     label: "PICNIC",     color: colorMap.orange,    title: "Expositor Picnic",       desc: "Vajilla, vasos y accesorios desechables para picnic, celebraciones y hostelería.", productsBase: ["Platos", "Vasos", "Cubiertos", "Servilletas"] },
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
