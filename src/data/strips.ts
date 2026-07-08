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

const MISTERZOO_REFS = ["51199", "51378", "51427", "51436", "92068", "92073"];

export const strips: StripType[] = [
  {
    id: "misterzoo",
    label: "MZ",
    color: "#e07b1a",
    gradient: "linear-gradient(135deg, #f5a843 0%, #e07b1a 48%, #8a4400 100%)",
    template: `${base}assets/tiras/misterzoo/logo.jpg`,
    logo: `${base}assets/tiras/misterzoo/logo.jpg`,
    products: MISTERZOO_REFS.map((ref) => ({
      id: `misterzoo-${ref}`,
      name: ref,
      ref,
      image:   `${base}assets/tiras/misterzoo/productos/${ref}.png`,
      preview: `${base}assets/tiras/misterzoo/preview/${ref}.png`,
    })),
  },
];
