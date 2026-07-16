const base = import.meta.env.BASE_URL;

export const STRIP_DEMO = (color: string, label: string) =>
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 500">
      <defs>
        <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#f8fafc"/>
          <stop offset="1" stop-color="#e8eef4"/>
        </linearGradient>
        <filter id="sh" x="-20%" y="-5%" width="140%" height="110%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.18"/>
        </filter>
      </defs>
      <!-- Cuerpo tira -->
      <rect x="14" y="0" width="92" height="500" rx="10" fill="url(#bg)" stroke="#dde3ed" stroke-width="1.5" filter="url(#sh)"/>
      <!-- Cabecera precio -->
      <rect x="14" y="0" width="92" height="62" rx="10" fill="${color}"/>
      <rect x="14" y="48" width="92" height="14" fill="${color}"/>
      <text x="60" y="42" text-anchor="middle" font-family="Arial" font-size="30" font-weight="900" fill="white">${label}</text>
      <!-- Separadores de estante -->
      <rect x="14" y="62"  width="92" height="3" rx="1" fill="#dde3ed"/>
      <rect x="14" y="128" width="92" height="3" rx="1" fill="#dde3ed"/>
      <rect x="14" y="194" width="92" height="3" rx="1" fill="#dde3ed"/>
      <rect x="14" y="260" width="92" height="3" rx="1" fill="#dde3ed"/>
      <rect x="14" y="326" width="92" height="3" rx="1" fill="#dde3ed"/>
      <rect x="14" y="392" width="92" height="3" rx="1" fill="#dde3ed"/>
      <rect x="14" y="458" width="92" height="3" rx="1" fill="#dde3ed"/>
      <!-- Slot producto 1 -->
      <rect x="26" y="72"  width="68" height="48" rx="7" fill="#e8eef4"/>
      <circle cx="60" cy="96"  r="14" fill="#cbd5e1"/>
      <!-- Slot producto 2 -->
      <rect x="26" y="138" width="68" height="48" rx="7" fill="#e8eef4"/>
      <circle cx="60" cy="162" r="14" fill="#cbd5e1"/>
      <!-- Slot producto 3 -->
      <rect x="26" y="204" width="68" height="48" rx="7" fill="#e8eef4"/>
      <circle cx="60" cy="228" r="14" fill="#cbd5e1"/>
      <!-- Slot producto 4 -->
      <rect x="26" y="270" width="68" height="48" rx="7" fill="#e8eef4"/>
      <circle cx="60" cy="294" r="14" fill="#cbd5e1"/>
      <!-- Slot producto 5 -->
      <rect x="26" y="336" width="68" height="48" rx="7" fill="#e8eef4"/>
      <circle cx="60" cy="360" r="14" fill="#cbd5e1"/>
      <!-- Slot producto 6 -->
      <rect x="26" y="402" width="68" height="48" rx="7" fill="#e8eef4"/>
      <circle cx="60" cy="426" r="14" fill="#cbd5e1"/>
      <!-- Slot producto 7 -->
      <rect x="26" y="468" width="68" height="24" rx="7" fill="#e8eef4"/>
      <circle cx="60" cy="480" r="10" fill="#cbd5e1"/>
    </svg>
  `);

export const STRIP_PRODUCT_DEMO = (color: string, label: string) =>
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect x="0" y="0" width="120" height="120" rx="12" fill="#f1f5f9"/>
      <rect x="30" y="28" width="60" height="52" rx="8" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5"/>
      <rect x="42" y="22" width="36" height="12" rx="4" fill="#cbd5e1"/>
      <rect x="38" y="80" width="44" height="8" rx="3" fill="${color}" opacity="0.7"/>
      <text x="60" y="88" text-anchor="middle" font-family="Arial" font-size="8" font-weight="900" fill="white">${label}</text>
      <circle cx="60" cy="56" r="14" fill="#cbd5e1"/>
      <rect x="46" y="52" width="28" height="4" rx="2" fill="#94a3b8"/>
      <rect x="50" y="60" width="20" height="4" rx="2" fill="#94a3b8"/>
    </svg>
  `);

export interface StripProduct {
  id: string;
  name: string;
  ref: string;
  image: string;
  preview: string;
}

export interface StripType {
  id: string;
  label: string;
  color: string;
  gradient: string;
  template: string;
  logo?: string;
  products: StripProduct[];
}

const MISTERZOO_REFS = [
  "50631", "51018", "51199", "51334", "51378", "51409", "51427", "51436",
  "51550", "51562", "51563", "51566", "92066", "92067", "92068", "92070",
  "92071", "92073", "92075", "92121", "92125", "92128",
];

const DEMILIA_REFS = [
  "32345", "41786", "41815", "41954", "41980", "42081", "42123", "42126",
  "42488", "42653", "42818", "43072", "92058", "92061", "92062", "92063",
  "92084", "92087", "92093", "92095",
];

function makeDemoProducts(stripId: string, color: string, label: string, count = 6): StripProduct[] {
  return Array.from({ length: count }, (_, i) => {
    const ref = String(i + 1).padStart(2, "0");
    const svg = STRIP_PRODUCT_DEMO(color, label);
    return { id: `${stripId}-demo-${ref}`, name: ref, ref, image: svg, preview: svg };
  });
}

export const strips: StripType[] = [
  {
    id: "misterzoo",
    label: "1,15€",
    color: "#1A8FB5",
    gradient: "linear-gradient(135deg, #8DC5D7 0%, #1A8FB5 48%, #0d5470 100%)",
    template: `${base}assets/tiras/misterzoo/tira-preview.png`,
    logo: `${base}assets/tiras/misterzoo/logo.jpg`,
    products: MISTERZOO_REFS.map((ref) => ({
      id: `misterzoo-${ref}`,
      name: ref,
      ref,
      image:   `${base}assets/tiras/misterzoo/productos/${ref}.png`,
      preview: `${base}assets/tiras/misterzoo/preview/${ref}.png`,
    })),
  },
  {
    id: "bariloche",
    label: "—",
    color: "#D42B70",
    gradient: "linear-gradient(135deg, #f08db8 0%, #D42B70 48%, #8a0d43 100%)",
    template: STRIP_DEMO("#8B4513", "—"),
    logo: `${base}assets/tiras/bariloche/logo.jpg`,
    products: makeDemoProducts("bariloche", "#8B4513", "—", 20),
  },
  {
    id: "demilia",
    label: "1,15€",
    color: "#A92833",
    gradient: "linear-gradient(135deg, #e06070 0%, #A92833 48%, #5c0d15 100%)",
    template: STRIP_DEMO("#c0930a", "1,15€"),
    logo: `${base}assets/tiras/demilia/logo.jpg`,
    products: DEMILIA_REFS.map((ref) => ({
      id: `demilia-${ref}`,
      name: ref,
      ref,
      image:   `${base}assets/tiras/demilia/productos/${ref}.png`,
      preview: `${base}assets/tiras/demilia/preview/${ref}.png`,
    })),
  },
  {
    id: "leiva",
    label: "—",
    color: "#BD4B08",
    gradient: "linear-gradient(135deg, #f0a060 0%, #BD4B08 48%, #6b2200 100%)",
    template: STRIP_DEMO("#169b22", "—"),
    logo: `${base}assets/tiras/leiva/logo.jpg`,
    products: makeDemoProducts("leiva", "#169b22", "—"),
  },
  {
    id: "marcos-toys",
    label: "—",
    color: "#7C5C4E",
    gradient: "linear-gradient(135deg, #c09080 0%, #7C5C4E 48%, #3d2a22 100%)",
    template: STRIP_DEMO("#2962FF", "—"),
    logo: `${base}assets/tiras/marcos-toys/logo.jpg`,
    products: makeDemoProducts("marcos-toys", "#2962FF", "—"),
  },
];
