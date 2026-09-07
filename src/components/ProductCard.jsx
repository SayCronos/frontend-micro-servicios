import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
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

  const imageSrc =
    banner ||
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative flex flex-col pds-card rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-black/20 dark:hover:border-white/20 bg-[var(--pds-theme-background-card)]"
    >
      {/* Vehicle Media Box */}
      <Link
        to={"/details/" + _id}
        className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900 block cursor-pointer"
      >
        <img
          src={imageSrc}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80";
          }}
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-[0.16em] bg-black/80 backdrop-blur-md text-white border border-white/10 flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d5001c]" />
            {type ? type.toUpperCase() : "PORSCHE SPORT"}
          </span>

          <button
            type="button"
            onClick={toggleWishlist}
            aria-label={isWishlisted ? "Quitar de favoritos" : "Guardar en favoritos"}
            className="pointer-events-auto p-2 rounded-full bg-black/60 hover:bg-black/85 dark:bg-black/70 dark:hover:bg-black/90 backdrop-blur-md text-white hover:text-[#d5001c] transition-all shadow-md cursor-pointer border border-white/10 active:scale-90"
          >
            <Heart
              size={14}
              className={isWishlisted ? "fill-[#d5001c] text-[#d5001c]" : "transition-colors"}
            />
          </button>
        </div>

        {/* Special Availability Overlay */}
        {!available && (
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
            <span className="bg-black/90 text-white border border-white/20 text-xs px-4 py-1.5 rounded-full uppercase tracking-wider font-semibold shadow-lg">
              Bajo Pedido Especial
            </span>
          </div>
        )}
      </Link>

      {/* Vehicle Info & Telemetry */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between gap-5 bg-[var(--pds-theme-background-card)]">
        <div>
          <h3 className="font-porsche text-lg sm:text-xl font-bold text-[var(--pds-theme-contrast-high)] group-hover:text-[#d5001c] transition-colors truncate tracking-tight">
            {name}
          </h3>
          <p className="text-xs text-[var(--pds-theme-contrast-medium)] line-clamp-2 mt-1.5 font-light leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Telemetry Metrics Panel */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3.5 rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border-subtle)] text-center text-xs">
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)] font-medium">
              Potencia
            </span>
            <span className="font-bold text-[var(--pds-theme-contrast-high)] font-porsche">
              {specs.powerCV} CV
            </span>
          </div>

          <div className="border-x border-[var(--pds-theme-border)]">
            <span className="block text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)] font-medium">
              0-100 km/h
            </span>
            <span className="font-bold text-[#d5001c] font-porsche">
              {specs.accel0100}
            </span>
          </div>

          <div>
            <span className="block text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)] font-medium">
              Vel. Máx
            </span>
            <span className="font-bold text-[var(--pds-theme-contrast-high)] font-porsche">
              {specs.topSpeed}
            </span>
          </div>
        </div>

        {/* Footer Pricing & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--pds-theme-border-subtle)]">
          <div>
            <span className="text-[9px] uppercase tracking-[0.16em] text-[var(--pds-theme-contrast-medium)] block font-semibold">
              Precio Base
            </span>
            <span className="font-porsche text-lg sm:text-xl font-bold text-[var(--pds-theme-contrast-high)] tracking-tight">
              ${price?.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                inCart
                  ? "bg-[#d5001c] text-white border-[#d5001c] shadow-md"
                  : "border-[var(--pds-theme-border)] text-[var(--pds-theme-contrast-high)] hover:border-[#d5001c] hover:text-[#d5001c] hover:bg-[#d5001c]/5"
              }`}
              title={inCart ? "En el carrito" : "Añadir al carrito rápido"}
            >
              <ShoppingBag size={14} />
            </button>

            <Link
              to={"/details/" + _id}
              className="pds-button-primary text-xs !py-2.5 !px-4.5 group/btn"
            >
              <span>Configurar</span>
              <ArrowUpRight
                size={13}
                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
