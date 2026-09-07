import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Sliders,
  Car,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "../components";

export const Home = () => {
  const [activeTabModel, setActiveTabModel] = useState("911");

  const modelShowcases = [
    {
      id: "911",
      name: "911 GT3 RS",
      tagline: "El Icono Indomable del Automovilismo",
      cv: "525 CV",
      accel: "3.2 s",
      top: "296 km/h",
      desc: "Nacido en el circuito. Diseñado para dominar la aerodinámica con radiador central y sistema DRS activo derivado de la competición.",
      price: "$223,800",
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1000&auto=format&fit=crop&q=85",
    },
    {
      id: "taycan",
      name: "Taycan Turbo S",
      tagline: "Alma Deportiva 100% Eléctrica",
      cv: "952 CV",
      accel: "2.4 s",
      top: "260 km/h",
      desc: "Arquitectura de 800 voltios. Carga ultrarrápida del 10% al 80% en 18 minutos y vectorización de par instantánea en ambos ejes.",
      price: "$185,000",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=85",
    },
    {
      id: "panamera",
      name: "Panamera Turbo E-Hybrid",
      tagline: "Lujo Ejecutivo & Rendimiento Híbrido",
      cv: "680 CV",
      accel: "3.2 s",
      top: "315 km/h",
      desc: "Suspensión Porsche Active Ride. El equilibrio definitivo entre confort de limusina de lujo y dinamismo de superdeportivo.",
      price: "$191,000",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1000&auto=format&fit=crop&q=85",
    },
    {
      id: "cayenne",
      name: "Cayenne Turbo GT",
      tagline: "La SUV de Máximo Desempeño en Circuito",
      cv: "659 CV",
      accel: "3.3 s",
      top: "305 km/h",
      desc: "Chasis rebajado con frenos cerámicos PCCB de serie y escape de titanio centralizado ultraligero.",
      price: "$196,300",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1000&auto=format&fit=crop&q=85",
    },
  ];

  const currentModelData =
    modelShowcases.find((m) => m.id === activeTabModel) || modelShowcases[0];

  return (
    <div className="min-h-screen bg-[var(--pds-theme-background-base)] text-[var(--pds-theme-contrast-high)] transition-colors duration-250">
      {/* ================= HERO CINEMÁTICO PRINCIPAL ================= */}
      <Hero />

      {/* ================= GAMA DE MODELOS SECTION ================= */}
      <section id="gama" className="py-24 bg-[var(--pds-theme-background-surface)] border-y border-[var(--pds-theme-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d5001c] block mb-2">
                Modelos Emblemáticos
              </span>
              <h2 className="font-porsche text-3xl sm:text-5xl font-bold text-[var(--pds-theme-contrast-high)] tracking-tight">
                GAMA PORSCHE COLOMBIA
              </h2>
            </div>

            {/* Model Selector Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-[var(--pds-theme-background-base)] border border-[var(--pds-theme-border)] shadow-sm">
              {modelShowcases.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => setActiveTabModel(model.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-all cursor-pointer ${
                    activeTabModel === model.id
                      ? "bg-[var(--pds-theme-primary)] text-[var(--pds-theme-background-base)] shadow-sm"
                      : "text-[var(--pds-theme-contrast-medium)] hover:text-[var(--pds-theme-contrast-high)]"
                  }`}
                >
                  {model.name}
                </button>
              ))}
            </div>
          </div>

          {/* Model Spotlight Card with Motion */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-2xl pds-card border border-[var(--pds-theme-border)] shadow-xl overflow-hidden">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.18em] font-bold text-[#d5001c]">
                  {currentModelData.tagline}
                </span>
                <h3 className="font-porsche text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--pds-theme-contrast-high)] mt-1.5 mb-3 tracking-tight">
                  {currentModelData.name}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--pds-theme-contrast-medium)] font-light leading-relaxed mb-6">
                  {currentModelData.desc}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-[var(--pds-theme-border)] my-4 text-center">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)] block font-medium">Potencia</span>
                  <span className="font-porsche text-xl sm:text-2xl font-bold text-[var(--pds-theme-contrast-high)]">{currentModelData.cv}</span>
                </div>
                <div className="border-x border-[var(--pds-theme-border)]">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)] block font-medium">0-100 km/h</span>
                  <span className="font-porsche text-xl sm:text-2xl font-bold text-[#d5001c]">{currentModelData.accel}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)] block font-medium">Vel. Máx</span>
                  <span className="font-porsche text-xl sm:text-2xl font-bold text-[var(--pds-theme-contrast-high)]">{currentModelData.top}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)] block font-medium">Desde</span>
                  <span className="font-porsche text-2xl font-bold text-[var(--pds-theme-contrast-high)]">{currentModelData.price}</span>
                </div>
                <Link to="/vehicles" className="pds-button-primary text-xs !py-3 !px-6 flex items-center gap-2">
                  <span>Ver en Catálogo</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-[16/10] flex items-center justify-center relative shadow-inner">
              <img
                key={currentModelData.id}
                src={currentModelData.image}
                alt={currentModelData.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= PORSCHE APPROVED TRUST SECTION ================= */}
      <section id="certificacion" className="py-24 bg-[var(--pds-theme-background-base)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d5001c] block mb-2">
              Confianza & Certificación Oficial
            </span>
            <h2 className="font-porsche text-3xl sm:text-5xl font-bold text-[var(--pds-theme-contrast-high)] tracking-tight">
              PROGRAMA PORSCHE APPROVED
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[var(--pds-theme-contrast-medium)] font-light leading-relaxed">
              Garantía de tranquilidad absoluta mediante una inspección técnica de 111 puntos clave con repuestos 100% genuinos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl pds-card border border-[var(--pds-theme-border)] shadow-md hover:border-black/20 dark:hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#d5001c]/10 text-[#d5001c] flex items-center justify-center mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-porsche text-lg font-bold text-[var(--pds-theme-contrast-high)] mb-2">
                Inspección de 111 Puntos
              </h3>
              <p className="text-xs text-[var(--pds-theme-contrast-medium)] font-light leading-relaxed">
                Diagnóstico exhaustivo de tren motriz, sistema eléctrico, suspensión y carrocería bajo estrictos estándares de fábrica.
              </p>
            </div>

            <div className="p-8 rounded-2xl pds-card border border-[var(--pds-theme-border)] shadow-md hover:border-black/20 dark:hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#d5001c]/10 text-[#d5001c] flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-porsche text-lg font-bold text-[var(--pds-theme-contrast-high)] mb-2">
                Garantía Porsche de 24 Meses
              </h3>
              <p className="text-xs text-[var(--pds-theme-contrast-medium)] font-light leading-relaxed">
                Cobertura completa similar a la de un vehículo nuevo, sin límite de kilometraje durante el período de vigencia oficial.
              </p>
            </div>

            <div className="p-8 rounded-2xl pds-card border border-[var(--pds-theme-border)] shadow-md hover:border-black/20 dark:hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#d5001c]/10 text-[#d5001c] flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 className="font-porsche text-lg font-bold text-[var(--pds-theme-contrast-high)] mb-2">
                Porsche Assistance 24/7
              </h3>
              <p className="text-xs text-[var(--pds-theme-contrast-medium)] font-light leading-relaxed">
                Asistencia en carretera en todo el territorio nacional los 365 días del año con vehículo de sustitución inmediato.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
