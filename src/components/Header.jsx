import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingBag, User, Sun, Moon, Menu, X, ChevronRight, Plus } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export const Header = () => {
  const { user, cart } = useSelector((state) => state.userReducer);
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { token } = user || {};
  const cartCount = Array.isArray(cart)
    ? cart.reduce((total, item) => total + (item.unit || 1), 0)
    : 0;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Modelos", path: "/vehicles" },
    { name: "Gama 2026", path: "/#gama" },
    { name: "Porsche Approved", path: "/#certificacion" },
    { name: "Mi Garaje", path: token ? "/profile" : "/login" },
    ...(token ? [{ name: "+ Crear Vehículo", path: "/admin/create-product" }] : []),
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3.5 pds-frosted-nav shadow-sm" : "py-5 pds-frosted-nav bg-opacity-70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Porsche Brand Wordmark */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="Porsche Colombia - Inicio"
          >
            <div className="w-6.5 h-6.5 rounded-sm bg-[#d5001c] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-porsche text-lg sm:text-xl font-bold tracking-[0.22em] text-[var(--pds-theme-contrast-high)] transition-colors">
                PORSCHE
              </span>
              <span className="text-[8px] tracking-[0.32em] uppercase text-[var(--pds-theme-contrast-medium)] font-medium -mt-1">
                Colombia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (PDS Editorial Style) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs uppercase tracking-pds-headline font-semibold transition-colors duration-150 relative py-1 hover:text-[#d5001c] ${
                    isActive ? "text-[#d5001c]" : "text-[var(--pds-theme-contrast-medium)]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d5001c]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-3">
            {/* Dark / Light Mode Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[var(--pds-theme-contrast-high)] transition-colors cursor-pointer focus:outline-none"
              aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              title={theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
            >
              {theme === "dark" ? (
                <Sun size={17} className="text-amber-400" />
              ) : (
                <Moon size={17} className="text-neutral-800" />
              )}
            </button>

            {/* Shopping Bag Counter */}
            <Link
              to="/login"
              className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[var(--pds-theme-contrast-high)] transition-colors group focus:outline-none"
              aria-label={`Carrito de compras con ${cartCount} items`}
            >
              <ShoppingBag size={18} className="group-hover:text-[#d5001c] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#d5001c] text-white font-bold text-[9px] rounded-full min-w-4.5 h-4.5 px-1 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Quick Button */}
            {token && (
              <Link
                to="/admin/create-product"
                className="hidden sm:inline-flex items-center gap-1.5 pds-button-brand text-xs !py-2.5 !px-4"
              >
                <Plus size={13} />
                <span>Crear Vehículo</span>
              </Link>
            )}

            {/* Garaje / User Access Pill Button */}
            <Link
              to={token ? "/profile" : "/login"}
              className="hidden sm:inline-flex items-center gap-1.5 pds-button-primary text-xs"
            >
              <User size={13} />
              <span>{token ? "Mi Garaje" : "Acceso"}</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full md:hidden text-[var(--pds-theme-contrast-high)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--pds-theme-background-base)] text-[var(--pds-theme-contrast-high)] pt-24 px-6 pb-8 flex flex-col justify-between md:hidden border-t border-[var(--pds-theme-border)]">
          <div className="flex flex-col gap-5">
            <span className="text-[10px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)] font-bold border-b border-[var(--pds-theme-border)] pb-2">
              Explorar Porsche Colombia
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-lg font-light tracking-wide hover:text-[#d5001c] transition-colors py-2 border-b border-[var(--pds-theme-border-subtle)]"
              >
                <span>{link.name}</span>
                <ChevronRight size={16} className="text-[var(--pds-theme-contrast-medium)]" />
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-[var(--pds-theme-border)]">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full pds-button-brand text-xs flex items-center justify-center gap-2"
            >
              <User size={15} />
              <span>{token ? "Ir a Mi Garaje" : "Iniciar Sesión / Registro"}</span>
            </Link>
            <p className="text-center text-[10px] text-[var(--pds-theme-contrast-medium)] uppercase tracking-wider mt-4">
              Porsche Colombia • Experiencia Oficial
            </p>
          </div>
        </div>
      )}
    </>
  );
};
