import { Package } from "lucide-react";
import type { Product, TranslationCopy } from "../types";

interface Props {
  product: Product;
  t: TranslationCopy;
}

export default function ProductCard({ product, t }: Props) {
  return (
    <article className="group rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-3">
        <Package className="h-8 w-8 text-slate-300 transition group-hover:scale-110 group-hover:text-slate-400" />
      </div>

      <p className="mt-3 line-clamp-2 h-8 text-center text-[11px] font-black leading-tight text-slate-700">
        {product.name}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-[10px]">
        <div>
          <p className="font-black uppercase tracking-wider text-slate-400">{t.units}</p>
          <div className="mt-1 flex h-7 items-center justify-center rounded-lg bg-slate-50 font-black text-slate-700">
            {product.units}
          </div>
        </div>
        <div>
          <p className="font-black uppercase tracking-wider text-slate-400">{t.price}</p>
          <div className="mt-1 flex h-7 items-center justify-center rounded-lg bg-slate-50 font-black text-slate-700">
            {product.price}
          </div>
        </div>
      </div>
    </article>
  );
}
