import React, { useState, useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export const CartItem = ({ item, cart, onAdd, onRemove }) => {
  const product = item?.product || {};
  const _id = product._id || product.id || item?._id;
  const [currentUnit, setCurrentUnit] = useState(item?.unit || 1);

  useEffect(() => {
    if (item?.unit) {
      setCurrentUnit(item.unit);
    }
  }, [item]);

  const addCart = () => {
    const newUnit = currentUnit + 1;
    setCurrentUnit(newUnit);
    onAdd({ _id, qty: newUnit, product });
  };

  const removeCart = () => {
    const newUnit = currentUnit - 1;
    setCurrentUnit(newUnit);
    if (newUnit > 0) {
      onAdd({ _id, qty: newUnit, product });
    } else {
      onRemove({ _id });
    }
  };

  const deleteItem = () => {
    onRemove({ _id });
  };

  if (!item || !product) {
    return null;
  }

  const { name = "Vehículo Porsche", desc = "", price = 0, banner = "" } = product;
  const itemTotal = price * (currentUnit || 1);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg pds-card">
      <div className="flex items-center gap-4 flex-1">
        <Link to={`/details/${_id}`} className="shrink-0 w-24 h-16 rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-900 block">
          <img
            src={banner}
            alt={name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="min-w-0">
          <span className="text-[9px] uppercase tracking-widest text-[#d5001c] font-bold">
            Porsche Approved
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
          <span className="text-sm font-semibold text-[var(--pds-theme-contrast-high)] sm:hidden block mt-1">
            ${price?.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="hidden sm:block text-right px-4">
        <span className="text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] block">Precio Unitario</span>
        <span className="font-porsche text-base font-bold text-[var(--pds-theme-contrast-high)]">
          ${price?.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--pds-theme-border-subtle)]">
        <div className="flex items-center rounded-full border border-[var(--pds-theme-border)] overflow-hidden bg-[var(--pds-theme-background-surface)]">
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center text-[var(--pds-theme-contrast-high)] hover:bg-[#d5001c] hover:text-white transition-colors cursor-pointer"
            onClick={removeCart}
            aria-label="Disminuir cantidad"
          >
            <Minus size={13} />
          </button>
          <span className="w-8 text-center text-xs font-bold text-[var(--pds-theme-contrast-high)]">
            {currentUnit}
          </span>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center text-[var(--pds-theme-contrast-high)] hover:bg-[#d5001c] hover:text-white transition-colors cursor-pointer"
            onClick={addCart}
            aria-label="Aumentar cantidad"
          >
            <Plus size={13} />
          </button>
        </div>

        <div className="text-right min-w-[90px]">
          <span className="text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] block sm:hidden">Total</span>
          <span className="font-porsche text-base font-bold text-[var(--pds-theme-contrast-high)]">
            ${itemTotal.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          onClick={deleteItem}
          className="p-1.5 rounded text-[var(--pds-theme-contrast-medium)] hover:text-[#d5001c] transition-colors cursor-pointer"
          title="Eliminar del carrito"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};
