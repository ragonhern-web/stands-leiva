export type Language = "es" | "en" | "fr" | "it" | "pt";

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
  units: string;
  price: string;
  request: string;
  color: string;
  alto: string;
  largo: string;
  ancho: string;
}
