import React, { useEffect, useState, useMemo } from "react";
import { Search, Sparkles, X, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { onGetProducts } from "../store/actions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getVehicleSpecs } from "../utils/vehicleSpecs";

export const Vehicles = () => {
  const { categories, products } = useAppSelector((state) => state.shoppingReducer);
  const dispatch = useAppDispatch();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    dispatch(onGetProducts());
  }, [dispatch]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = Array.isArray(products) ? [...products] : [];

    if (activeCategory !== "all") {
      result = result.filter(
        (item) => item.type?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) => item.name?.toLowerCase().includes(q) || item.desc?.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "power-desc") {
      result.sort((a, b) => {
        const pA = getVehicleSpecs(a).powerCV;
        const pB = getVehicleSpecs(b).powerCV;
        return pB - pA;
      });
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[var(--pds-theme-background-base)] text-[var(--pds-theme-contrast-high)] pt-28 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="border-b border-[var(--pds-theme-border)] pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-pds-headline text-[#d5001c] font-bold block mb-1">
                Catálogo Oficial • Porsche Colombia
              </span>
              <h1 className="font-porsche text-3xl sm:text-5xl font-bold text-[var(--pds-theme-contrast-high)] tracking-tight">
                INVENTARIO DE MODELOS
              </h1>
              <p className="text-xs sm:text-sm text-[var(--pds-theme-contrast-medium)] font-light mt-2 max-w-xl">
                Superdeportivos, berlinas de lujo y SUVs certificados bajo los estándares del programa Porsche Approved.
              </p>
            </div>

            <div className="text-xs font-mono text-[var(--pds-theme-contrast-medium)]">
              Disponibles: <strong className="text-[var(--pds-theme-contrast-high)]">{filteredAndSortedProducts.length}</strong> unidades
            </div>
          </div>
        </div>

        {/* Toolbar (Filters, Search, Sort) */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Category Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                activeCategory === "all"
                  ? "bg-[var(--pds-theme-primary)] text-[var(--pds-theme-background-base)] shadow-sm"
                  : "bg-[var(--pds-theme-background-surface)] text-[var(--pds-theme-contrast-medium)] border border-[var(--pds-theme-border)] hover:border-[var(--pds-theme-contrast-medium)]"
              }`}
            >
              Todos los Modelos
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[var(--pds-theme-primary)] text-[var(--pds-theme-background-base)] shadow-sm"
                    : "bg-[var(--pds-theme-background-surface)] text-[var(--pds-theme-contrast-medium)] border border-[var(--pds-theme-border)] hover:border-[var(--pds-theme-contrast-medium)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--pds-theme-contrast-medium)] pointer-events-none"
              />
              <input
                type="text"
                placeholder="Buscar modelo o motor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-full bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] text-xs text-[var(--pds-theme-contrast-high)] placeholder-[var(--pds-theme-contrast-medium)] focus:outline-none focus:border-[#d5001c] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--pds-theme-contrast-medium)] hover:text-[var(--pds-theme-contrast-high)] cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3.5 rounded-full bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] text-xs text-[var(--pds-theme-contrast-high)] font-medium focus:outline-none focus:border-[#d5001c] cursor-pointer"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="power-desc">Mayor Potencia (CV)</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="py-20 text-center rounded-xl pds-card p-8">
            <Sparkles size={32} className="mx-auto text-[#d5001c] mb-3" />
            <h3 className="font-porsche text-xl font-bold text-[var(--pds-theme-contrast-high)]">
              No se encontraron vehículos coincidentes
            </h3>
            <p className="text-xs text-[var(--pds-theme-contrast-medium)] mt-1 max-w-sm mx-auto">
              Intenta ajustar los filtros de búsqueda para explorar otros modelos de la gama.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 pds-button-secondary text-xs"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
