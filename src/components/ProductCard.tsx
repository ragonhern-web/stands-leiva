import { Package } from "lucide-react";
import { getProductDesc } from "../data/productI18n";
import type { Product, TranslationCopy, Language } from "../types";

interface Props {
  product: Product;
  t: TranslationCopy;
  language: Language;
  onClick?: () => void;
}

export default function ProductCard({ product, t, language, onClick }: Props) {
  const desc = getProductDesc(product.id, language) ?? product.color;
  return (
    <article
      className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-[#169b22]/40 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-3">
        {product.image && !product.image.startsWith("data:") ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain transition group-hover:scale-105"
          />
        ) : (
          <Package className="h-8 w-8 text-slate-300 transition group-hover:scale-110 group-hover:text-slate-400" />
        )}
      </div>

      <p className="mt-3 text-center text-[11px] font-black leading-tight text-slate-700">
        {product.name.match(/Ref\.\d+/)?.[0] ?? product.name}
      </p>

      {(product.units || product.price) && (
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-[10px]">
          {product.units && (
            <div>
              <p className="font-black uppercase tracking-wider text-slate-400">{t.units}</p>
              <div className="mt-1 flex h-7 items-center justify-center rounded-lg bg-[#ffe100] font-black text-black">
                {product.units}
              </div>
            </div>
          )}
          {product.price && (
            <div>
              <p className="font-black uppercase tracking-wider text-slate-400">{t.price}</p>
              <div className="mt-1 flex h-7 items-center justify-center rounded-lg bg-[#169b22] font-black text-white">
                {product.price}
              </div>
            </div>
          )}
        </div>
      )}

      {product.alto != null && (
        <div className="mt-2 grid grid-cols-3 gap-2 text-[10px]">
          {(["alto", "largo", "ancho"] as const).map((dim) =>
            product[dim] != null ? (
              <div key={dim}>
                <p className="font-black uppercase tracking-wider text-slate-400">{t[dim]}</p>
                <div className="mt-1 flex h-7 items-center justify-center rounded-lg bg-slate-50 font-black text-slate-700">
                  {product[dim]} cm
                </div>
              </div>
            ) : null
          )}
        </div>
      )}

      {desc && (
        <div className="mt-2 text-[10px]">
          <div className="mt-1 flex min-h-7 items-center justify-center rounded-lg bg-slate-50 px-1 py-1 text-center leading-tight text-slate-600">
            {desc}
          </div>
        </div>
      )}
    </article>
  );
}
