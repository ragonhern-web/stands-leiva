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

  jul: {
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
      43115: { units: "12", color: "Varios colores surtidos", alto: 26, largo: 1,  ancho: 9,  name: "Cinta elástica textil",          desc: "Cinta o diadema elástica de tejido con acabado arrugado/brillante, disponible en varios colores y estampados." },
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

  ene: {
    imagePath: `${base}assets/stands/expositor-ene.png`,
    info: { standRef: "99935", numRefs: 23, totalUnits: 174, sides: 2, priceStand: "201,84 €", pricePerUnit: "1,16 €", tipo: "Cuarto palé", standAlto: 125, standLargo: 40, standAncho: 60 },
    refs: [32298,32299,32300,32301,32302,32303,32304,32305,32306,32307,32308,32309,32310,32311,32312,32313,32314,32315,32316,32317,32318,32319,32320],
    data: {
      32298: { units: "6",  color: "Varios colores surtidos", alto: 18, largo: 4,  ancho: 6,  name: "Cuerda trenzada 10m/4mm",            desc: "Cuerda trenzada resistente de 10 metros y 4 mm de grosor. Ideal para atar o múltiples usos en jardín." },
      32299: { units: "6",  color: "Verde y madera",          alto: 30, largo: 7,  ancho: 15, name: "Azadilla y rastrillo de mano",        desc: "Herramienta de doble función: azadilla y rastrillo de 3 púas con cabezal de metal y mango de madera." },
      32300: { units: "5",  color: "Varios colores surtidos", alto: 28, largo: 14, ancho: 46, name: "Regadera 2L cuello largo",            desc: "Regadera de plástico resistente con asa ergonómica y cuello largo para riego preciso. 2 litros." },
      32301: { units: "8",  color: "Varios modelos surtidos", alto: 17, largo: 6,  ancho: 7,  name: "Gnomo de barro poroso autorriego",    desc: "Figura de barro poroso en forma de gnomo, diseñada para clavarse en la tierra y funcionar como sistema de autorriego." },
      32302: { units: "13", color: "Verde",                   alto: 21, largo: 3,  ancho: 11, name: "9 pinzas de guía para plantas",       desc: "Blíster con 9 pinzas redondas y articuladas de plástico para sujetar y guiar tallos sin dañarlos." },
      32303: { units: "6",  color: "Varios colores surtidos", alto: 12, largo: 15, ancho: 15, name: "Maceta estrella de plástico",         desc: "Maceta redonda de plástico con diseño de pliegues pronunciados en forma de estrella. Varios colores." },
      32304: { units: "4",  color: "Varios colores surtidos", alto: 15, largo: 17, ancho: 17, name: "Maceta con estrías + plato base",     desc: "Maceta de plástico con textura de estrías verticales gruesas. Incluye plato base para el drenaje." },
      32305: { units: "6",  color: "Varios colores surtidos", alto: 13, largo: 14, ancho: 14, name: "Maceta minimalista líneas finas",     desc: "Maceta redonda de plástico de estilo moderno y minimalista con finas líneas verticales. Varios colores." },
      32306: { units: "6",  color: "Varios colores surtidos", alto: 14, largo: 13, ancho: 13, name: "Maceta geométrica facetada + plato",  desc: "Maceta de plástico con diseño geométrico facetado (superficie poligonal). Incluye plato base." },
      32307: { units: "12", color: "Verde y negro",           alto: 25, largo: 2,  ancho: 8,  name: "Tijeras de podar con seguro",         desc: "Tijeras de podar de mano para flores y ramas pequeñas. Con cierre de seguridad y mango antideslizante." },
      32308: { units: "10", color: "Negro y transparente",    alto: 34, largo: 6,  ancho: 6,  name: "Lámpara solar LED para clavar",       desc: "Lámpara solar LED de plástico para clavar en suelo o macetas. Funciona con energía solar." },
      32309: { units: "7",  color: "Varios colores surtidos", alto: 20, largo: 10, ancho: 11, name: "Pulverizador 500ml con tulipanes",    desc: "Pulverizador de plástico con gatillo ergonómico y boquilla ajustable. Diseño con siluetas de tulipanes. 500 ml." },
      32310: { units: "12", color: "Varios colores surtidos", alto: 25, largo: 1,  ancho: 12, name: "Guantes de jardinería talla L",       desc: "Guantes de tela elástica y transpirable con recubrimiento protector en palma y dedos. Talla L." },
      32311: { units: "5",  color: "Acero y madera",          alto: 8,  largo: 2,  ancho: 40, name: "Sierra podar hoja curva + madera",   desc: "Sierra de podar manual con hoja curva de acero dentado y mango de madera. Para ramas y troncos pequeños." },
      32312: { units: "5",  color: "Azul, verde y madera",    alto: 28, largo: 4,  ancho: 16, name: "Set 2 herramientas: pala + rastrillo",desc: "Set básico de jardinería: pala trasplantadora y rastrillo de mano con cabezal de metal y mango de madera." },
      32313: { units: "7",  color: "Blanco",                  alto: 30, largo: 1,  ancho: 18, name: "2 sacos plástico jardín 85×55cm",    desc: "Pack de dos sacos de plástico resistente para recogida de residuos del jardín. 85 × 55 cm." },
      32314: { units: "9",  color: "Verde",                   alto: 17, largo: 2,  ancho: 10, name: "2 bridas lagartija para tutores",     desc: "Blíster con 2 bridas decorativas de plástico con forma de lagartija para sujetar tallos a tutores. 15 cm." },
      32315: { units: "10", color: "Verde",                   alto: 19, largo: 1,  ancho: 10, name: "50 bridas ajustables verdes 13cm",   desc: "Pack de 50 bridas de plástico ajustables y desmontables para atar y guiar plantas. 13 cm." },
      32316: { units: "11", color: "Verde",                   alto: 21, largo: 2,  ancho: 12, name: "2 rollos alambre con dispensador",   desc: "Pack de 2 rollos de alambre plastificado flexible con dispensador y cortador metálico integrado. 2×15m / 0,5mm." },
      32317: { units: "10", color: "Madera y metal",          alto: 17, largo: 2,  ancho: 15, name: "2 ratoneras de madera y metal",       desc: "Pack de 2 trampas clásicas para ratones con base de madera y mecanismo de resorte de metal." },
      32318: { units: "6",  color: "Verde",                   alto: 48, largo: 2,  ancho: 19, name: "Tutor 3 aros + 3 postes para plantas",desc: "Tutor de soporte con 3 aros ajustables sobre 3 postes verticales para plantas trepadoras o en maceta." },
      32319: { units: "6",  color: "Verde y acero",           alto: 10, largo: 2,  ancho: 40, name: "Sierra podar hoja recta + plástico",  desc: "Sierra de podar manual con hoja recta de acero dentado y mango de plástico texturizado." },
      32320: { units: "4",  color: "Naranja y verde",         alto: 19, largo: 4,  ancho: 35, name: "Escoba exterior base ancha",           desc: "Cepillo tipo escoba con cerdas rígidas y base ancha. Soporte central para enroscar mango. Para barrer exteriores." },
    },
  },

  mar: {
    imagePath: `${base}assets/stands/expositor-feb.png`,
    info: { standRef: "99938", numRefs: 14, totalUnits: 468, sides: 2, priceStand: "290,16 €", pricePerUnit: "0,62 €", tipo: "Cuarto palé", standAlto: 125, standLargo: 42, standAncho: 60 },
    refs: [32348,32349,32350,32351,32352,32353,32354,32355,32356,32357,32358,32359,32360,32361],
    data: {
      32348: { units: "22", color: "Negro y rojo",                    alto: 20, largo: 3,   ancho: 8,  name: "Trampa adhesiva cucarachas (2u)",  desc: "Trampa adhesiva para cucarachas. Pack de 2 unidades." },
      32349: { units: "22", color: "Negro y rojo",                    alto: 20, largo: 3,   ancho: 8,  name: "Trampa adhesiva hormigas (2u)",    desc: "Trampa adhesiva para hormigas. Pack de 2 unidades." },
      32350: { units: "30", color: "Maceta terracota / Cera amarilla",alto: 5,  largo: 6,   ancho: 6,  name: "Vela citronela en maceta terracota",desc: "Vela de jardín de citronela presentada en maceta de terracota. 1 unidad." },
      32351: { units: "36", color: "Cera amarilla / Aluminio",        alto: 12, largo: 2,   ancho: 8,  name: "Velas citronela tipo té (6u)",     desc: "Velas de jardín de citronela tipo té. Pack de 6 unidades." },
      32352: { units: "36", color: "Varios colores surtidos",         alto: 14, largo: 1,   ancho: 9,  name: "Pulsera repelente espiral 5-7 días",desc: "Pulsera repelente de citronela en espiral. 5-7 días de protección. Varios colores." },
      32353: { units: "32", color: "Varios colores surtidos",         alto: 14, largo: 1,   ancho: 9,  name: "Pulsera repelente silicona plana",  desc: "Pulsera repelente de citronela de silicona plana. 5-7 días de protección. Varios colores." },
      32354: { units: "40", color: "Varios colores surtidos",         alto: 14, largo: 1,   ancho: 9,  name: "Pulsera repelente trenzada plana",  desc: "Pulsera repelente de citronela trenzada plana. 5-7 días de protección. Varios colores." },
      32355: { units: "40", color: "Varios colores surtidos",         alto: 14, largo: 1,   ancho: 9,  name: "Pulsera repelente cuerda trenzada", desc: "Pulsera repelente de citronela de cuerda trenzada. 5-7 días de protección. Varios colores." },
      32356: { units: "30", color: "Varios colores surtidos",         alto: 55, largo: 1,   ancho: 10, name: "Matamoscas mango metálico",         desc: "Matamoscas de plástico con mango metálico. Varios colores surtidos." },
      32357: { units: "31", color: "Caja verde y amarilla",           alto: 14, largo: 2.5, ancho: 14, name: "Espiral antimosquitos (10u)",       desc: "Espiral antimosquitos en caja. Pack de 10 unidades." },
      32358: { units: "45", color: "Marrón",                          alto: 36, largo: 1,   ancho: 8,  name: "Incienso de citronela (20u)",       desc: "Incienso de citronela. Pack de 20 unidades." },
      32359: { units: "36", color: "Blanco con flores moradas",       alto: 18, largo: 2,   ancho: 11, name: "Repele-polillas en bolsitas 50g",   desc: "Repelente de polillas en bolsitas. 50 g." },
      32360: { units: "33", color: "Amarillo y rojo",                 alto: 11, largo: 2,   ancho: 12, name: "Papel atrapa moscas en rollos (4u)", desc: "Papel atrapa moscas en rollos. Pack de 4 unidades." },
      32361: { units: "35", color: "Frasco blanco",                   alto: 13, largo: 3,   ancho: 3,  name: "Pulverizador repelente citronela 60ml", desc: "Pulverizador repelente de citronela en spray. 60 ml." },
    },
  },

  abr: {
    imagePath: `${base}assets/stands/expositor-mar.png`,
    info: { standRef: "98685", numRefs: 1, totalUnits: 54, tipo: "Cuarto palé", pricePerUnit: "0,99 €", priceStand: "53,46 €", standAlto: 6, standLargo: 6, standAncho: 150 },
    refs: [98685],
    data: {
      98685: { units: "54", color: "Varios colores surtidos", name: "Churros de flotación de espuma", desc: "Churros de flotación de espuma de polietileno. 150 × 6 cm. 54 unidades por caja expositora. Varios colores surtidos." },
    },
  },

  jun: {
    imagePath: `${base}assets/stands/expositor-may.png`,
    info: { standRef: "99919", numRefs: 11, totalUnits: 97, sides: 2, priceStand: "349,20 €", pricePerUnit: "3,60 €", tipo: "Medio palé", standAlto: 150, standLargo: 80, standAncho: 60 },
    refs: [60372,60373,60374,60375,60376,60377,60378,60379,60380,60381,60382],
    data: {
      60372: { units: "10", color: "Solo color",              alto: 42, largo: 3,  ancho: 25, name: "Juego de pesca infantil",            desc: "Juego de pesca infantil con cañas, peces de colores y accesorios sobre blíster. Incluye varias piezas para jugar a pescar." },
      60373: { units: "8",  color: "Varios colores surtidos", alto: 45, largo: 7,  ancho: 19, name: "Set gafas y tubo buceo infantil",    desc: "Set de gafas y tubo de buceo infantil en bolsa transparente. Producto de playa/piscina en colores surtidos." },
      60374: { units: "9",  color: "Varios colores surtidos", alto: 25, largo: 4,  ancho: 26, name: "Pack 2 pistolas agua grandes",       desc: "Pack de 2 pistolas de agua grandes en caja abierta, con diseño tipo lanzador para juego exterior." },
      60375: { units: "8",  color: "Varios colores surtidos", alto: 35, largo: 5,  ancho: 24, name: "Juego buceo aros/peces (4u)",        desc: "Juego de buceo con aros/figuras de peces de colores para piscina. Incluye 4 unidades en el envase." },
      60376: { units: "12", color: "Varios colores surtidos", alto: 26, largo: 17, ancho: 17, name: "Set playa cubo, pala y molinos",     desc: "Set de playa con cubo, pala, rastrillo, moldes y pieza tipo molino/colador. Presentado en bolsa de red." },
      60377: { units: "6",  color: "Varios colores surtidos", alto: 18, largo: 14, ancho: 24, name: "Camión volquete playa accesorios",   desc: "Camión volquete de playa con pala, rastrillo y molde. Juguete de arena con piezas de colores." },
      60378: { units: "15", color: "Varios colores surtidos", alto: 36, largo: 12, ancho: 12, name: "Camión grande con set de playa",     desc: "Camión grande con set de playa incluido: pala, rastrillo, moldes y accesorios. Presentado en bolsa de red." },
      60379: { units: "6",  color: "Varios colores surtidos", alto: 34, largo: 15, ancho: 13, name: "Carretilla playa con accesorios",    desc: "Carretilla de playa con pala, rastrillo, moldes y accesorios de arena. Presentación en bolsa de red." },
      60380: { units: "13", color: "Varios colores surtidos", alto: 19, largo: 5,  ancho: 30, name: "Pistola agua grande tipo rifle",     desc: "Pistola de agua grande tipo rifle en caja abierta. Diseño alargado con depósito superior." },
      60381: { units: "3",  color: "Varios colores surtidos", alto: 30, largo: 18, ancho: 23, name: "Set agua y arena base cangrejo",     desc: "Set de juego de agua y arena con base grande tipo cangrejo, molino, cubo, pala, rastrillo y figuras." },
      60382: { units: "7",  color: "Varios colores surtidos", alto: 14, largo: 13, ancho: 14, name: "Set playa compacto con barco",       desc: "Set de playa compacto con barco, pala, rastrillo, colador y moldes de animales marinos." },
    },
  },

  ago: {
    imagePath: `${base}assets/stands/expositor-sep.png`,
    info: { standRef: "99932", numRefs: 38, totalUnits: 399, sides: 2, priceStand: "231,42 €", pricePerUnit: "0,58 €", tipo: "Cuarto palé", standAlto: 125, standLargo: 42, standAncho: 60 },
    refs: [32243,32244,32245,32246,32247,32248,32249,32250,32251,32252,32253,32254,32255,32256,32257,32258,32259,32260,32261,32262,32263,32264,32265,32266,32267,32268,32269,32270,32271,32272,32273,32274,32275,32276,32277,32278,32279,32280],
    data: {
      32243: { units: "11", color: "Azul",                    alto: 21, largo: 1,  ancho: 7.5,name: "Bolígrafos azules (3u)",              desc: "Bolígrafos azules. Pack de 3 unidades. En caja expositora." },
      32244: { units: "11", color: "Varios tamaños",          alto: 21, largo: 3,  ancho: 11, name: "Pinzas sujetapapeles metálicas (8u)", desc: "Pinzas sujetapapeles metálicas en varios tamaños. Pack de 8 unidades." },
      32245: { units: "8",  color: "Varios colores",          alto: 18, largo: 1,  ancho: 8,  name: "Pinzas de madera de colores (13u)",  desc: "Pinzas de madera de colores. Pack de 13 unidades." },
      32246: { units: "12", color: "Varios colores surtidos", alto: 24, largo: 2,  ancho: 8,  name: "Set lápiz, goma y sacapuntas",       desc: "Set de lápiz, goma de borrar y sacapuntas. Varios colores surtidos." },
      32247: { units: "12", color: "3 colores",               alto: 18, largo: 2,  ancho: 11, name: "Marcadores fluorescentes (3 col.)",  desc: "Marcadores fluorescentes en 3 colores. En caja expositora." },
      32248: { units: "11", color: "Varios colores surtidos", alto: 21, largo: 2,  ancho: 9,  name: "Portaminas con minas de repuesto",   desc: "Portaminas con accesorios y minas de repuesto incluidas. Varios colores surtidos." },
      32249: { units: "6",  color: "Varios colores surtidos", alto: 32, largo: 1,  ancho: 24, name: "Carpetas A4 con gomas (2u)",         desc: "Carpetas A4 con gomas de cierre. Pack de 2 unidades. Varios colores." },
      32250: { units: "8",  color: "Varios colores surtidos", alto: 31, largo: 2,  ancho: 22, name: "Carpetas transparentes (2u)",        desc: "Carpetas transparentes. Pack de 2 unidades. Varios colores surtidos." },
      32251: { units: "8",  color: "Varios colores surtidos", alto: 23, largo: 1,  ancho: 32, name: "Fundas transparentes A4 (2u)",       desc: "Fundas/carpeta transparente A4. Pack de 2 unidades. Varios colores surtidos." },
      32252: { units: "10", color: "Varios colores surtidos", alto: 6,  largo: 4,  ancho: 20, name: "Estuche escolar",                    desc: "Estuche escolar de plástico. Varios colores surtidos." },
      32253: { units: "11", color: "Varios colores",          alto: 21, largo: 1,  ancho: 10, name: "Bolígrafos de colores (6u)",         desc: "Bolígrafos de colores. Pack de 6 unidades." },
      32254: { units: "11", color: "Blanco",                  alto: 21, largo: 2,  ancho: 6,  name: "Corrector líquido tipo bolígrafo",   desc: "Corrector líquido tipo bolígrafo para correcciones precisas." },
      32255: { units: "10", color: "Varios colores surtidos", alto: 15, largo: 2,  ancho: 9,  name: "Cinta correctora 12m",               desc: "Cinta correctora. 12 metros. Varios colores surtidos." },
      32256: { units: "14", color: "Azul",                    alto: 21, largo: 2,  ancho: 5,  name: "Bolígrafos azules (2u)",             desc: "Bolígrafos azules. Pack de 2 unidades." },
      32257: { units: "11", color: "Rojo y negro",            alto: 21, largo: 2,  ancho: 5,  name: "Bolígrafos rojo y negro (2u)",       desc: "Bolígrafos de 2 colores (rojo y negro). Pack de 2 unidades." },
      32258: { units: "11", color: "3 colores",               alto: 21, largo: 2,  ancho: 9,  name: "Rotuladores pizarra blanca (3 col.)",desc: "Rotuladores para pizarra blanca. Pack de 3 colores." },
      32259: { units: "11", color: "3 colores",               alto: 21, largo: 1,  ancho: 8,  name: "Rotuladores pizarra + borrador",     desc: "Rotuladores para pizarra blanca con borrador incluido. 3 colores." },
      32260: { units: "12", color: "Varios colores",          alto: 26, largo: 1,  ancho: 10, name: "Notas adhesivas + marcadores (11 bl.)",desc: "Notas adhesivas y marcadores de página. 11 bloques de diferentes tamaños. 20 × 20 unidades cada uno." },
      32261: { units: "9",  color: "Varios colores surtidos", alto: 13, largo: 3,  ancho: 10, name: "Sacapuntas con depósito",            desc: "Sacapuntas de plástico con depósito recogedor. Varios colores surtidos." },
      32262: { units: "16", color: "Varios colores surtidos", alto: 22, largo: 1,  ancho: 9,  name: "Tijeras escolares",                  desc: "Tijeras escolares de plástico con hoja de acero. Varios colores surtidos." },
      32263: { units: "7",  color: "Varios colores",          alto: 16, largo: 1,  ancho: 8,  name: "Libreta con notas adhesivas",        desc: "Libreta con notas adhesivas y marcadores de página incluidos." },
      32264: { units: "12", color: "Marrón",                  alto: 6,  largo: 7,  ancho: 7,  name: "Gomas elásticas 50g",                desc: "Gomas elásticas de goma. 50 g." },
      32265: { units: "11", color: "Metálico y colores",      alto: 23, largo: 2,  ancho: 11, name: "Clips metálicos y colores (200u)",   desc: "Clips metálicos y de colores. Pack de 200 unidades." },
      32266: { units: "8",  color: "Varios colores surtidos", alto: 15, largo: 3,  ancho: 10, name: "Mini grapadora de plástico",         desc: "Mini grapadora de plástico. Varios colores surtidos." },
      32267: { units: "12", color: "Blanco",                  alto: 23, largo: 1,  ancho: 17, name: "Etiquetas adhesivas 160u 28×45mm",  desc: "Etiquetas adhesivas. 160 unidades. Medidas: 28 × 45 mm." },
      32268: { units: "11", color: "Varios colores",          alto: 27, largo: 2,  ancho: 10, name: "Set 3 lápices con goma de formas",  desc: "Set de 3 lápices con goma de borrar con formas decorativas. Pack de 3 unidades." },
      32269: { units: "8",  color: "Varios colores",          alto: 24, largo: 1,  ancho: 19, name: "Set 12 ceras + 12 acuarelas (24u)", desc: "Set de pintura escolar con 12 ceras de colores y 12 acuarelas. 24 unidades en total." },
      32270: { units: "7",  color: "Varios colores",          alto: 16, largo: 3,  ancho: 17, name: "Borrador pizarra + 2 rotuladores",  desc: "Set con borrador de pizarra blanca y 2 rotuladores. Pack de 3 piezas." },
      32271: { units: "12", color: "Gris",                    alto: 12, largo: 2,  ancho: 7,  name: "Calculadora básica",                desc: "Calculadora básica de plástico. Formato compacto." },
      32272: { units: "9",  color: "Varios colores",          alto: 17, largo: 3,  ancho: 9,  name: "Pegamento en barra (21g + 9g)",     desc: "Pegamento en barra. Pack de 2 barras: 21 g y 9 g." },
      32273: { units: "13", color: "Transparente",            alto: 15, largo: 2,  ancho: 6,  name: "Adhesivo cianocrilato 1,5g",        desc: "Adhesivo cianocrilato (super-pegamento) de 1,5 g." },
      32274: { units: "11", color: "Varios colores surtidos", alto: 21, largo: 2,  ancho: 6,  name: "Bolígrafo con 6 colores de tinta",  desc: "Bolígrafo con 6 colores de tinta diferentes. Varios colores de cuerpo." },
      32275: { units: "11", color: "Varios colores",          alto: 22, largo: 2,  ancho: 9,  name: "Set tizas 12 col. + 12 blancas",   desc: "Set de tizas: 12 de colores y 12 blancas. 24 tizas en total." },
      32276: { units: "4",  color: "Metálico",                alto: 10, largo: 9,  ancho: 9,  name: "Bote portalápices de metal",        desc: "Bote portalápices de metal. Diseño cilíndrico clásico." },
      32277: { units: "12", color: "12 colores",              alto: 24, largo: 1,  ancho: 11, name: "Lápices de colores de madera (12)", desc: "Lápices de colores de madera. Caja de 12 colores." },
      32278: { units: "18", color: "12 colores",              alto: 17, largo: 1,  ancho: 13, name: "Rotuladores de colores (12u)",      desc: "Rotuladores de colores de plástico. Caja de 12 colores." },
      32279: { units: "9",  color: "Transparente",            alto: 12, largo: 3,  ancho: 10, name: "Cinta adhesiva transparente 25m",   desc: "Cinta adhesiva transparente. 25 metros." },
      32280: { units: "11", color: "Varios colores surtidos", alto: 21, largo: 2,  ancho: 11, name: "Lupa de plástico",                  desc: "Lupa de plástico con mango. Varios colores surtidos." },
    },
  },

  sep: {
    imagePath: `${base}assets/stands/expositor-oct.png`,
    info: { standRef: "2062", numRefs: 1, totalUnits: 18, tipo: "Cuarto palé", pricePerUnit: "1,10 €", priceStand: "19,80 €", standAlto: 34, standLargo: 48, standAncho: 40 },
    refs: [2062],
    data: {
      2062: { units: "18", color: "Naranja y negro", alto: 14, largo: 16, ancho: 16, name: "Cubo calabaza Halloween", desc: "Cubo de plástico con forma de calabaza para Halloween. Naranja y negro. 18 unidades por caja expositora." },
    },
  },

  oct: {
    imagePath: `${base}assets/stands/expositor-nov.png`,
    info: { standRef: "99930", numRefs: 39, totalUnits: 294, sides: 4, priceStand: "323,40 €", pricePerUnit: "1,10 €", tipo: "Expositor giratorio", standAlto: 130, standLargo: 48, standAncho: 67 },
    refs: [60277,60306,60309,60305,60312,60310,60311,60297,60296,60308,60315,60313,60282,60283,60314,60307,60279,60278,60284,60289,60290,60287,60288,60293,60298,60299,60285,60280,60281,60292,60291,60286,60302,60294,60295,60300,60301,60303,60304],
    data: {
      60277: { units: "12", color: "Motivos navideños",        name: "Cinta decorativa envolver regalos",  desc: "Rollo de cinta decorativa para envolver regalos con motivos navideños." },
      60306: { units: "12", color: "Surtido navideño",         name: "Adorno colgante árbol Navidad",      desc: "Adorno colgante clásico para árbol de Navidad. Surtido navideño." },
      60309: { units: "6",  color: "Diseño Búho",              name: "Adorno colgante búho",               desc: "Adorno colgante decorativo en forma de búho para Navidad." },
      60305: { units: "12", color: "Surtido brillante",        name: "Adorno colgante brillante Navidad",  desc: "Adorno colgante brillante para decoración navideña. Surtido de colores." },
      60312: { units: "6",  color: "Personajes navideños",     name: "Figura colgante Navidad",            desc: "Figura decorativa colgante para Navidad. Personajes navideños surtidos." },
      60310: { units: "6",  color: "Surtido navideño",         name: "Ornamento festivo árbol",            desc: "Ornamento festivo para árbol de Navidad. Surtido navideño." },
      60311: { units: "6",  color: "Surtido",                  name: "Colgante decorativo campanas",       desc: "Colgante decorativo con campanas y figuras navideñas surtidas." },
      60297: { units: "6",  color: "Rojo y blanco",            name: "Adorno bastón de caramelo",          desc: "Adorno colgante en forma de bastón de caramelo. Rojo y blanco." },
      60296: { units: "6",  color: "Rojo y blanco",            name: "Adorno caramelo envuelto",           desc: "Adorno colgante en forma de caramelo envuelto. Rojo y blanco." },
      60308: { units: "12", color: "Bola luminosa",            name: "Bola Navidad con LED interior",      desc: "Bola de Navidad transparente con iluminación LED interior." },
      60315: { units: "6",  color: "Luz cálida",               name: "Esfera luminosa LED colgante",       desc: "Esfera luminosa LED decorativa para colgar. Luz cálida." },
      60313: { units: "6",  color: "Blanco y rojo",            name: "Figura muñeco de nieve",             desc: "Figura decorativa de muñeco de nieve. Blanco y rojo." },
      60282: { units: "6",  color: "Estampado festivo",        name: "Bolsa papel motivos navideños",      desc: "Bolsa de papel con motivos navideños para regalos. Estampado festivo." },
      60283: { units: "6",  color: "Estampado festivo",        name: "Bolsa regalo festiva grande",        desc: "Bolsa de regalo festiva grande. Estampado festivo." },
      60314: { units: "12", color: "Estrella dorada",          name: "Adorno estrella para árbol",         desc: "Adorno en forma de estrella para árbol de Navidad." },
      60307: { units: "12", color: "Papá Noel/Reno",          name: "Colgador fieltro pomo de puerta",    desc: "Colgador decorativo de fieltro/tela para pomo de puerta. Diseño Papá Noel o Reno." },
      60279: { units: "6",  color: "Estampado navideño",       name: "Felpudo navideño de entrada",        desc: "Felpudo de entrada con mensaje y diseño navideño." },
      60278: { units: "12", color: "Rojo con pompón blanco",   name: "Gorro de Papá Noel clásico",         desc: "Gorro clásico de Papá Noel de tela. Rojo con pompón blanco." },
      60284: { units: "6",  color: "Verde/Nevado",             name: "Figura decorativa árbol/abeto",      desc: "Adorno o figura decorativa en forma de árbol de Navidad/Abeto. Verde o nevado." },
      60289: { units: "6",  color: "Madera natural/pintada",   name: "Adorno rústico madera para colgar",  desc: "Adorno rústico de madera tallada para colgar. Madera natural o pintada." },
      60290: { units: "6",  color: "Madera natural/pintada",   name: "Colgante madera figuras navideñas",  desc: "Colgante de madera con figuras navideñas. Madera natural o pintada." },
      60287: { units: "6",  color: "Figuras surtidas",         name: "Adorno pincho centro de mesa",       desc: "Adorno navideño con palo/pincho para centros de mesa o macetas. Figuras surtidas." },
      60288: { units: "6",  color: "Figuras surtidas",         name: "Pincho decorativo navideño macetas", desc: "Pincho decorativo con personaje navideño para macetas o jardín. Figuras surtidas." },
      60293: { units: "6",  color: "Rojo/Dorado/Plata",        name: "Pack lazos brillantes decorativos",  desc: "Pack de lazos decorativos brillantes para árbol o guirnaldas. Rojo, dorado y plata." },
      60298: { units: "6",  color: "Diseño clásico",           name: "Calcetín navideño para rellenar",    desc: "Calcetín navideño tradicional para colgar y rellenar con regalos." },
      60299: { units: "6",  color: "Diseño bordado",           name: "Bota/calcetín fieltro festivo",      desc: "Bota / calcetín festivo decorativo de fieltro con diseño bordado." },
      60285: { units: "6",  color: "Cartel festivo",           name: "Letrero colgante Feliz Navidad",     desc: "Letrero o cartel colgante con el texto 'Feliz Navidad'." },
      60280: { units: "6",  color: "Luces de colores/cálidas", name: "Guirnalda LED bolas de colores",     desc: "Guirnalda de luces LED con bombillas en forma de bola. Colores surtidos o cálidos." },
      60281: { units: "6",  color: "Luces de colores/cálidas", name: "Tira LED forma de estrella",         desc: "Tira de luces LED con cubiertas en forma de estrella. Luces de colores o cálidas." },
      60292: { units: "6",  color: "Surtido",                  name: "Stickers gel/vinilo para ventanas",  desc: "Stickers / pegatinas de gel o vinilo para decorar ventanas navideñas. Surtido." },
      60291: { units: "6",  color: "Surtido",                  name: "Calcomanías navideñas cristales",    desc: "Calcomanías decorativas navideñas para cristales. Surtido." },
      60286: { units: "6",  color: "Reno/Papá Noel",          name: "Gafas de fiesta navideñas",          desc: "Gafas de fiesta divertidas con temática navideña. Diseño de reno o Papá Noel." },
      60302: { units: "12", color: "Colores festivos",         name: "Adorno festivo surtido árbol",       desc: "Adorno festivo surtido para ramas de árbol. Colores festivos." },
      60294: { units: "6",  color: "Madera/Tela",              name: "Ornamento cuerda rústica",           desc: "Ornamento colgante con cuerda rústica. Madera y tela." },
      60295: { units: "6",  color: "Surtido",                  name: "Figura colgante navideña clásica",   desc: "Figura colgante navideña tradicional. Surtido." },
      60300: { units: "6",  color: "Surtido",                  name: "Diadema festiva cuernos de reno",    desc: "Diadema festiva divertida tipo cuernos de reno. Surtido." },
      60301: { units: "6",  color: "Surtido",                  name: "Diadema decorativa navideña",        desc: "Diadema decorativa para fiestas navideñas. Surtido." },
      60303: { units: "12", color: "Surtido",                  name: "Cinta pelo motivos navideños",       desc: "Cinta para el pelo con motivos navideños. Surtido." },
      60304: { units: "12", color: "Surtido",                  name: "Gafas disfraz navideño photocall",   desc: "Gafas decorativas de disfraz navideño para photocall. Surtido." },
    },
  },

  dic: {
    imagePath: `${base}assets/stands/expositor-dic.png`,
    info: { numRefs: 1, totalUnits: 50, tipo: "Caja expositora", standAlto: 38, standLargo: 28, standAncho: 23 },
    refs: [3940],
    data: {
      3940: { units: "50", color: "Varios colores surtidos", name: "Bolsa de cotillón set de fiesta", desc: "Bolsa de cotillón con set de artículos de fiesta. 50 unidades por caja expositora. Varios colores." },
    },
  },

  feb: {
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
    info: { standRef: "60388", numRefs: 1, totalUnits: 40, sides: 2, tipo: "Cuarto palé", pricePerUnit: "2,50 €", priceStand: "100,00 €", standAlto: 145, standLargo: 42, standAncho: 60 },
    refs: [60388],
    data: {
      60388: { units: "40", color: "Varios colores surtidos", name: "Balón de cuero sintético", desc: "Balón de cuero sintético en caja dispensadora. 40 unidades surtidas. Incluye expositor dispensador de cartón." },
    },
  },

  nov: {
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

  may: {
    imagePath: `${base}assets/stands/expositor-abr.png`,
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
  { id: "ene", label: "ENE", color: "#1f6fb5",       title: "Expositor Jardín",           desc: "Herramientas de jardín, regaderas, macetas y accesorios para empezar la temporada.", productsBase: ["Regaderas", "Macetas", "Herramientas", "Tutores"] },
  { id: "feb", label: "FEB", color: "#2d87c8",       title: "Expositor Picnic",           desc: "Vajilla, vasos y accesorios desechables para picnic, celebraciones y hostelería.", productsBase: ["Platos", "Vasos", "Cubiertos", "Servilletas"] },
  { id: "mar", label: "MAR", color: "#5f9f4b",       title: "Expositor Repelentes",       desc: "Repelentes, trampas y productos anti-insectos para el inicio del calor.",       productsBase: ["Pulseras repelentes", "Velas citronela", "Espirales", "Trampas"] },
  { id: "abr", label: "ABR", color: colorMap.darkGreen, title: "Expositor Churros Flotación", desc: "Churros de flotación de espuma de polietileno para piscina y playa.",       productsBase: ["Churros flotación", "Colores surtidos"] },
  { id: "may", label: "MAY", color: "#77b35c",       title: "Expositor Colección Natural", desc: "Juguetes de playa y exterior de la colección natural con materiales sostenibles.", productsBase: ["Palas madera", "Sets playa", "Regaderas", "Juegos buceo"] },
  { id: "jun", label: "JUN", color: "#e5a2a2",       title: "Expositor Playa",            desc: "Todo para la playa y piscina: pistolas de agua, sets de arena y juegos acuáticos.", productsBase: ["Pistolas agua", "Sets playa", "Juego buceo", "Carretillas"] },
  { id: "jul", label: "JUL", color: "#df8b8b",       title: "Expositor Set de Playa",     desc: "Los productos estrella para playa, piscina y verano.",                         productsBase: ["Cubos y palas", "Pistolas de agua", "Flotadores", "Gafas buceo"] },
  { id: "ago", label: "AGO", color: "#d66a6a",       title: "Expositor Papelería",        desc: "Vuelta al cole con material escolar, papelería y accesorios de escritorio.",    productsBase: ["Bolígrafos", "Carpetas", "Estuches", "Tijeras"] },
  { id: "sep", label: "SEP", color: "#d9a14c",       title: "Expositor Halloween",        desc: "Disfraces, decoración y accesorios para campañas de impacto visual.",           productsBase: ["Maquillaje", "Disfraces", "Calabazas", "Decoración"] },
  { id: "oct", label: "OCT", color: "#d89a54",       title: "Expositor Navidad",          desc: "Adornos, luces y decoración navideña para la campaña de temporada.",            productsBase: ["Adornos árbol", "Guirnaldas", "Figuras", "Gorros"] },
  { id: "nov", label: "NOV", color: "#d8a35f",       title: "Expositor Desechables Navidad", desc: "Vajilla y accesorios desechables con motivos navideños.",                   productsBase: ["Vasos", "Platos", "Servilletas", "Manteles"] },
  { id: "dic", label: "DIC", color: "#2b6ea7",       title: "Expositor Cotillón",         desc: "Sets de cotillón y artículos de fiesta para fin de año.",                       productsBase: ["Bolsas cotillón", "Gorros", "Matasuegras", "Confeti"] },
];

const allYearDefs: StandDef[] = [
  { id: "balones",  label: "BALONES",  color: colorMap.orange, title: "Expositor Balones",     desc: "Surtido completo de balones deportivos para todas las edades.",  productsBase: ["Balón fútbol", "Balón basket", "Voleibol", "Minipelota"] },
  { id: "mascotas", label: "MASCOTAS", color: colorMap.green,  title: "Expositor Mascotas",    desc: "Juguetes, accesorios y productos de cuidado para mascotas.",     productsBase: ["Mordedores", "Correas", "Cepillos", "Platos"] },
  { id: "belleza",  label: "BELLEZA",  color: colorMap.orange, title: "Expositor Belleza",     desc: "Sets de maquillaje, peinados y accesorios infantiles.",           productsBase: ["Manicura", "Bálsamos", "Diademas", "Cepillos"] },
  { id: "cocina",   label: "COCINA",   color: colorMap.red,    title: "Expositor Cocina",      desc: "Accesorios de cocina con colores y licencias familiares.",        productsBase: ["Vasos", "Moldes", "Fiambreras", "Cubiertos"] },
  { id: "auto",     label: "AUTO",     color: colorMap.black,  title: "Expositor Automóviles", desc: "Productos funcionales para coche y viaje familiar.",              productsBase: ["Organizadores", "Parasoles", "Ambientadores", "Protectores"] },
  { id: "juguetes", label: "JUGUETES", color: colorMap.green,  title: "Expositor Juguetes",    desc: "Juguetes de madera didácticos de venta constante durante todo el año.", productsBase: ["Puzzles", "Ábaco", "Xilófono", "Tres en raya"] },
];

const comingSoonDefs: StandDef[] = [
  { id: "jug3",        label: "JUG 3€",      color: colorMap.green,  title: "Juguetes (3€)",    desc: "Stand de juguetes a precio unitario de 3€, perfectos para regalo e impulso de compra.", productsBase: [] },
  { id: "jug5",        label: "JUG 5€",      color: colorMap.green,  title: "Juguetes (5€)",    desc: "Stand de juguetes a precio unitario de 5€. Mayor calidad y presentación, ideales como regalo.", productsBase: [] },
  { id: "cocinamadera",label: "COC. MADERA",  color: colorMap.orange, title: "Cocina Madera",    desc: "Utensilios de cocina en madera natural: espátulas, cucharas, tablas y accesorios sostenibles.", productsBase: [] },
  { id: "piscina",     label: "PISCINA",      color: "#3b82f6",       title: "Piscina",          desc: "Todo para la piscina y el verano. Flotadores, churros, gafas acuáticas y juguetes de agua.", productsBase: [] },
  { id: "bricolaje",   label: "BRICOLAJE",    color: colorMap.black,  title: "Bricolaje",        desc: "Herramientas básicas y accesorios de bricolaje para el hogar. Soluciones prácticas para mantenimiento y pequeñas reparaciones.", productsBase: [] },
];

const comingSoonImages: Partial<Record<string, string>> = {
  jug3:        `${base}assets/stands/expositor-jug3.png`,
  jug5:        `${base}assets/stands/expositor-jug5.png`,
  cocinamadera:`${base}assets/stands/expositor-cocinamadera.png`,
  piscina:     `${base}assets/stands/expositor-piscina.png`,
  bricolaje:   `${base}assets/stands/expositor-bricolaje.png`,
};

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

function buildComingSoonStands(defs: StandDef[]): Stand[] {
  return defs.map((def) => ({
    ...def,
    comingSoon: true,
    image: comingSoonImages[def.id] ?? STAND_DEMO,
    products: [],
  }));
}

export const seasonalStands: Stand[] = buildStands(seasonalDefs);
export const allYearStands: Stand[] = buildStands(allYearDefs);
export const comingSoonStands: Stand[] = buildComingSoonStands(comingSoonDefs);
