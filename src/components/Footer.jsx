import React from "react";
import { Link } from "react-router-dom";
import { Shield, Award, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[var(--pds-theme-background-surface)] text-[var(--pds-theme-contrast-high)] border-t border-[var(--pds-theme-border)] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[var(--pds-theme-border)] gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-sm bg-[#d5001c] flex items-center justify-center text-white font-bold text-xs">
                P
              </div>
              <span className="font-porsche text-2xl font-bold tracking-[0.22em]">
                PORSCHE
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--pds-theme-contrast-medium)] font-medium">
                Colombia
              </span>
            </div>
            <p className="text-[var(--pds-theme-contrast-medium)] text-xs max-w-md font-light">
              La máxima expresión del automovilismo deportivo y precisión de ingeniería alemana. Representante oficial para Colombia.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs tracking-wider uppercase text-[var(--pds-theme-contrast-medium)]">
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-[#d5001c]" /> Garantía 2 Años
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Award size={14} className="text-[#d5001c]" /> 111 Puntos Porsche Approved
            </span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-[var(--pds-theme-border)] text-xs">
          <div>
            <h4 className="font-porsche text-[10px] tracking-pds-headline text-[var(--pds-theme-contrast-medium)] mb-4 font-bold">
              Gama de Modelos
            </h4>
            <ul className="space-y-2.5 text-[var(--pds-theme-contrast-medium)]">
              <li>
                <Link to="/vehicles" className="hover:text-[#d5001c] transition-colors flex items-center justify-between group">
                  <span>911 GT3 RS & Carrera</span>
                  <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="hover:text-[#d5001c] transition-colors flex items-center justify-between group">
                  <span>Taycan 100% Eléctrico</span>
                  <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="hover:text-[#d5001c] transition-colors flex items-center justify-between group">
                  <span>Panamera Turbo E-Hybrid</span>
                  <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="hover:text-[#d5001c] transition-colors flex items-center justify-between group">
                  <span>Macan & Cayenne SUV</span>
                  <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-porsche text-[10px] tracking-pds-headline text-[var(--pds-theme-contrast-medium)] mb-4 font-bold">
              Experiencia & Servicios
            </h4>
            <ul className="space-y-2.5 text-[var(--pds-theme-contrast-medium)]">
              <li>
                <Link to="/#certificacion" className="hover:text-[#d5001c] transition-colors">
                  Programa Porsche Approved
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="hover:text-[#d5001c] transition-colors">
                  Inventario de Vehículos
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#d5001c] transition-colors">
                  Mi Garaje Porsche
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-porsche text-[10px] tracking-pds-headline text-[var(--pds-theme-contrast-medium)] mb-4 font-bold">
              Porsche Center Bogotá
            </h4>
            <div className="space-y-2.5 text-[var(--pds-theme-contrast-medium)] text-xs">
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-[#d5001c] shrink-0 mt-0.5" />
                <span>Showroom Principal: Av. Circunvalar No. 85-20, Zona Financiera, Bogotá D.C.</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-[#d5001c] shrink-0" />
                <span>+57 (601) 800-PORSCHE</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-[#d5001c] shrink-0" />
                <span>concierge@porsche-colombia.com</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-porsche text-[10px] tracking-pds-headline text-[var(--pds-theme-contrast-medium)] mb-4 font-bold">
              Boletín Exclusivo
            </h4>
            <p className="text-xs text-[var(--pds-theme-contrast-medium)] mb-3 font-light">
              Recibe invitaciones a track days y lanzamientos en primicia.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="bg-[var(--pds-theme-background-base)] border border-[var(--pds-theme-border)] rounded-full px-3.5 py-2 text-xs text-[var(--pds-theme-contrast-high)] placeholder-[var(--pds-theme-contrast-medium)] focus:outline-none focus:border-[#d5001c] flex-1"
              />
              <button type="submit" className="pds-button-brand text-xs !py-2 !px-4">
                Unirse
              </button>
            </form>
          </div>
        </div>

        {/* Legal and WLTP disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-[var(--pds-theme-contrast-medium)] gap-4">
          <p>
            © {new Date().getFullYear()} Porsche Colombia. Todos los derechos reservados.
            Valores oficiales de emisiones y consumo de combustible medidos bajo el ciclo WLTP.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[var(--pds-theme-contrast-high)] transition-colors cursor-pointer">Aviso de Privacidad</span>
            <span className="hover:text-[var(--pds-theme-contrast-high)] transition-colors cursor-pointer">Términos de Servicio</span>
            <span className="hover:text-[var(--pds-theme-contrast-high)] transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
