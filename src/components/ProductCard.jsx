import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import { getVehicleSpecs } from "../utils/vehicleSpecs";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { onAddToWishlist, onRemoveFromWishlist, onAddToCart } from "../store/actions";

export const ProductCard = ({ item }) => {
  const { _id, banner, price, name, desc, available, type } = item || {};
  const dispatch = useAppDispatch();
  const { wishlist, cart } = useAppSelector((state) => state.userReducer);

  const specs = getVehicleSpecs(item);
  const isWishlisted =
    Array.isArray(wishlist) && wishlist.some((w) => (w._id || w.id) === _id);
  const inCart =
    Array.isArray(cart) && cart.some((c) => c.product && (c.product._id === _id || c.product.id === _id));

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(onRemoveFromWishlist(_id));
    } else {
      dispatch(onAddToWishlist(item));
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(onAddToCart({ product: item, _id, qty: 1 }));
  };

  return (
    <div className="group relative flex flex-col pds-card rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1">
      <Link to={"/details/" + _id} className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900 block">
        <img
          src={banner}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-black/75 dark:bg-black/85 backdrop-blur-sm text-white border border-white/10 flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d5001c]" />
            {type || "Porsche Sport"}
          </span>

          <button
            type="button"
            onClick={toggleWishlist}
            aria-label={isWishlisted ? "Quitar de favoritos" : "Guardar en favoritos"}
            className="pointer-events-auto p-2 rounded-full bg-white/85 dark:bg-black/75 backdrop-blur-sm text-[var(--pds-theme-contrast-high)] hover:text-[#d5001c] transition-colors shadow-sm cursor-pointer"
          >
            <Heart
              size={14}
              className={isWishlisted ? "fill-[#d5001c] text-[#d5001c]" : ""}
            />
          </button>
        </div>

        {!available && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
            <span className="bg-black text-white border border-white/20 text-xs px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold">
              Bajo Pedido Especial
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-5 justify-between gap-4 bg-[var(--pds-theme-background-card)]">
        <div>
          <h3 className="font-porsche text-lg font-bold text-[var(--pds-theme-contrast-high)] group-hover:text-[#d5001c] transition-colors truncate">
            {name}
          </h3>
          <p className="text-xs text-[var(--pds-theme-contrast-medium)] line-clamp-2 mt-1 font-light leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-md bg-[var(--pds-theme-background-surface)] text-center text-xs">
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)]">
              Potencia
            </span>
            <span className="font-bold text-[var(--pds-theme-contrast-high)]">
              {specs.powerCV} CV
            </span>
          </div>
          <div className="border-x border-[var(--pds-theme-border)]">
            <span className="block text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)]">
              0-100 km/h
            </span>
            <span className="font-bold text-[#d5001c]">
              {specs.accel0100}
            </span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)]">
              Vel. Máx
            </span>
            <span className="font-bold text-[var(--pds-theme-contrast-high)]">
              {specs.topSpeed}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[var(--pds-theme-border-subtle)]">
          <div>
            <span className="text-[9px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)] block">
              Precio Base
            </span>
            <span className="font-porsche text-lg font-bold text-[var(--pds-theme-contrast-high)]">
              ${price?.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                inCart
                  ? "bg-[#d5001c] text-white border-[#d5001c]"
                  : "border-[var(--pds-theme-border)] text-[var(--pds-theme-contrast-high)] hover:border-[#d5001c] hover:text-[#d5001c]"
              }`}
              title={inCart ? "En el carrito" : "Añadir al carrito rápido"}
            >
              <ShoppingBag size={14} />
            </button>

            <Link
              to={"/details/" + _id}
              className="pds-button-primary text-xs !py-2 !px-4 group/btn"
            >
              <span>Configurar</span>
              <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
