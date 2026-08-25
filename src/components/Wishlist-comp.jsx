import React from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { onAddToCart } from "../store/actions";

export const WishItem = ({ item, onTapRemove }) => {
  const { _id, name, desc, price, banner } = item || {};
  const dispatch = useAppDispatch();

  const moveToCart = () => {
    dispatch(onAddToCart({ _id, qty: 1 }));
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 mb-4 rounded-lg pds-card">
      <div className="flex items-center gap-4 flex-1">
        <Link to={`/details/${_id}`} className="shrink-0 w-24 h-16 rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-900 block">
          <img src={banner} alt={name} loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform" />
        </Link>
        <div className="min-w-0">
          <span className="text-[9px] uppercase tracking-widest text-[#d5001c] font-bold">
            Favorito en Garaje
          </span>
          <Link
            to={`/details/${_id}`}
            className="font-porsche text-base font-bold text-[var(--pds-theme-contrast-high)] hover:text-[#d5001c] transition-colors truncate block"
          >
            {name}
          </Link>
          <p className="text-xs text-[var(--pds-theme-contrast-medium)] truncate max-w-sm font-light">
            {desc}
          </p>
          <span className="font-porsche text-sm font-bold text-[var(--pds-theme-contrast-high)] block mt-1">
            ${price?.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <button
          type="button"
          onClick={moveToCart}
          className="pds-button-brand text-xs !py-2 !px-3.5"
        >
          <ShoppingBag size={13} />
          <span>Añadir al Carrito</span>
        </button>

        <button
          type="button"
          className="p-2 rounded-full hover:bg-red-500/10 hover:text-[#d5001c] text-[var(--pds-theme-contrast-medium)] transition-colors cursor-pointer"
          onClick={() => onTapRemove(_id)}
          aria-label="Eliminar de favoritos"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};
