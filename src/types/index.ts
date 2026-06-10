export type Language = "es" | "en" | "fr" | "it" | "pt" | "de" | "nl" | "pl" | "ro";

export interface Product {
  id: string;
  name: string;
  /** Ruta relativa a /assets/products/ o URL de imagen */
  image: string;
  units: string;
  price: string;
  color?: string;
  alto?: number;
  largo?: number;
  ancho?: number;
  desc?: string;
}

export interface Stand {
  id: string;
  label: string;
  color: string;
  title: string;
  desc: string;
  /** Ruta relativa a /assets/stands/ o URL de imagen */
  image: string;
  productsBase: string[];
  products: Product[];
  // Ficha del expositor (opcional hasta que se rellene cada stand)
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
  comingSoon?: boolean;
}

export interface TranslationCopy {
  eyebrow: string;
  heroTitle: string;
  heroText: string;
  monthlyEyebrow: string;
  monthlyTitle: string;
  permanentEyebrow: string;
  permanentTitle: string;
  references: string;
  included: string;
  columns: string;
  rows: string;
  units: string;
  price: string;
  request: string;
  downloadSheet: string;
  downloadPDF: string;
  downloadExcel: string;
  color: string;
  alto: string;
  largo: string;
  ancho: string;
  standRef: string;
  standNumRefs: string;
  standTotalUnits: string;
  standSides: string;
  standPrice: string;
  standPriceUnit: string;
  standTipo: string;
  standDims: string;
  newDisplaysEyebrow: string;
  newDisplaysTitle: string;
}
