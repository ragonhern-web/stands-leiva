const base = import.meta.env.BASE_URL;

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
  template: string;
  products: StripProduct[];
}

function makeProducts(stripId: string, count: number, refBase: number): StripProduct[] {
  return Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return {
      id: `${stripId}-${num}`,
      name: `Ref. ${refBase + i}`,
      ref: String(refBase + i),
      image:   `${base}assets/strips/products/${stripId}-${num}.webp`,
      preview: `${base}assets/strips/previews/${stripId}-${num}.webp`,
    };
  });
}

export const strips: StripType[] = [
  {
    id: "1e",
    label: "1€",
    color: "#e21b23",
    template: `${base}assets/strips/tira-1e.webp`,
    products: makeProducts("1e", 20, 10001),
  },
  {
    id: "2e",
    label: "2€",
    color: "#f5a623",
    template: `${base}assets/strips/tira-2e.webp`,
    products: makeProducts("2e", 20, 20001),
  },
  {
    id: "3e",
    label: "3€",
    color: "#169b22",
    template: `${base}assets/strips/tira-3e.webp`,
    products: makeProducts("3e", 20, 30001),
  },
];
