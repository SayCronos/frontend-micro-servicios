import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Gauge,
  Sliders,
} from "lucide-react";
import { PORSCHE_COLORS } from "../utils/vehicleSpecs";

export const Home = () => {
  const [selectedColor, setSelectedColor] = useState(PORSCHE_COLORS[0]);
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
      {/* ================= HERO SHOWCASE SECTION (PORSCHE COLOMBIA STYLE) ================= */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        {/* Subtle Ambient Vignette */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial Headline */}
          <div className="text-center max-w-4xl mx-auto mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] text-[10px] font-bold uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)] mb-4">
              <Sparkles size={12} className="text-[#d5001c]" />
              <span>Gama Porsche Colombia • 2026</span>
            </span>

            <h1 className="font-porsche text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--pds-theme-contrast-high)] leading-[1.08]">
              EL FUTURO DEL <span className="text-[#d5001c]">RENDIMIENTO</span> DEPORTIVO
            </h1>

            <p className="mt-3 text-sm sm:text-base text-[var(--pds-theme-contrast-medium)] font-light max-w-2xl mx-auto">
              Diseño atemporal, ingeniería de precisión alemana y dinamismo de conducción sin concesiones.
            </p>
          </div>

          {/* High-Fidelity 2D Vehicle Presentation with Instant Finish Selector */}
          <div className="relative w-full rounded-xl overflow-hidden pds-card p-4 sm:p-8 mb-6">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <img
                key={selectedColor.id}
                src={selectedColor.imageUrl}
                alt={`Porsche en acabado ${selectedColor.name}`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
              />

              {/* 2D Color Customizer Float Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 p-3 rounded-lg bg-[var(--pds-nav-bg)] backdrop-blur-md border border-[var(--pds-theme-border)] shadow-md max-w-[220px]">
                <span className="text-[9px] uppercase font-bold tracking-pds-headline text-[var(--pds-theme-contrast-medium)]">
                  Acabado: <strong className="text-[var(--pds-theme-contrast-high)]">{selectedColor.name}</strong>
                </span>
                <span className="text-[9px] font-mono text-[#d5001c] font-semibold">
                  {selectedColor.category} ({selectedColor.type})
                </span>

                {/* Color Swatches */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {PORSCHE_COLORS.map((c) => {
                    const isSelected = c.id === selectedColor.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        aria-label={`Pintura ${c.name}`}
                        className={`w-6 h-6 rounded-full transition-all cursor-pointer flex items-center justify-center border border-white/20 ${
                          isSelected ? "ring-2 ring-[#d5001c] scale-110" : "hover:scale-105 opacity-85 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pill Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <Link to="/vehicles" className="pds-button-brand w-full sm:w-auto">
                <span>Descubrir Modelos</span>
                <ArrowUpRight size={14} />
              </Link>
              <Link to="/vehicles" className="pds-button-secondary w-full sm:w-auto">
                <span>Configurar en Línea</span>
              </Link>
            </div>
          </div>

          {/* Telemetry Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-lg pds-card flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)]">
                Potencia Máxima
              </span>
              <div className="mt-2">
                <span className="font-porsche text-2xl sm:text-3xl font-bold text-[var(--pds-theme-contrast-high)]">
                  650 CV
                </span>
                <span className="text-xs text-[var(--pds-theme-contrast-medium)] ml-1 font-mono">
                  (478 kW)
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-lg pds-card flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)]">
                Aceleración 0-100 km/h
              </span>
              <div className="mt-2">
                <span className="font-porsche text-2xl sm:text-3xl font-bold text-[#d5001c]">
                  2.7 s
                </span>
                <span className="text-xs text-[var(--pds-theme-contrast-medium)] ml-1">
                  Sport Chrono
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-lg pds-card flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)]">
                Velocidad Máxima
              </span>
              <div className="mt-2">
                <span className="font-porsche text-2xl sm:text-3xl font-bold text-[var(--pds-theme-contrast-high)]">
                  330 km/h
                </span>
                <span className="text-xs text-[var(--pds-theme-contrast-medium)] ml-1">
                  en circuito
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-lg pds-card flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)]">
                Transmisión & Tracción
              </span>
              <div className="mt-2">
                <span className="font-porsche text-lg sm:text-xl font-bold text-[var(--pds-theme-contrast-high)] block">
                  8 Vel. PDK
                </span>
                <span className="text-xs text-[#d5001c] font-semibold">
                  Tracción Total PTM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GAMA DE MODELOS SECTION ================= */}
      <section id="gama" className="py-20 bg-[var(--pds-theme-background-surface)] border-y border-[var(--pds-theme-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-pds-headline text-[#d5001c] block mb-2">
                Modelos Emblemáticos
              </span>
              <h2 className="font-porsche text-3xl sm:text-4xl font-bold text-[var(--pds-theme-contrast-high)]">
                GAMA PORSCHE COLOMBIA
              </h2>
            </div>

            {/* Model Selector Tabs */}
            <div className="flex flex-wrap gap-2 p-1 rounded-full bg-[var(--pds-theme-background-base)] border border-[var(--pds-theme-border)]">
              {modelShowcases.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => setActiveTabModel(model.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
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

          {/* Model Spotlight Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-xl pds-card">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-pds-headline font-bold text-[#d5001c]">
                  {currentModelData.tagline}
                </span>
                <h3 className="font-porsche text-3xl sm:text-4xl font-bold text-[var(--pds-theme-contrast-high)] mt-1 mb-3">
                  {currentModelData.name}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--pds-theme-contrast-medium)] font-light leading-relaxed mb-6">
                  {currentModelData.desc}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-[var(--pds-theme-border)] my-4 text-center">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)] block">Potencia</span>
                  <span className="font-porsche text-xl font-bold text-[var(--pds-theme-contrast-high)]">{currentModelData.cv}</span>
                </div>
                <div className="border-x border-[var(--pds-theme-border)]">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)] block">0-100 km/h</span>
                  <span className="font-porsche text-xl font-bold text-[#d5001c]">{currentModelData.accel}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)] block">Vel. Máx</span>
                  <span className="font-porsche text-xl font-bold text-[var(--pds-theme-contrast-high)]">{currentModelData.top}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)] block">Desde</span>
                  <span className="font-porsche text-2xl font-bold text-[var(--pds-theme-contrast-high)]">{currentModelData.price}</span>
                </div>
                <Link to="/vehicles" className="pds-button-primary text-xs">
                  <span>Ver en Catálogo</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-[16/10] flex items-center justify-center">
              <img
                src={currentModelData.image}
                alt={currentModelData.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= PORSCHE APPROVED TRUST SECTION ================= */}
      <section id="certificacion" className="py-20 bg-[var(--pds-theme-background-base)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-pds-headline text-[#d5001c] block mb-2">
              Confianza & Certificación Oficial
            </span>
            <h2 className="font-porsche text-3xl sm:text-4xl font-bold text-[var(--pds-theme-contrast-high)]">
              PROGRAMA PORSCHE APPROVED
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[var(--pds-theme-contrast-medium)] font-light">
              Garantía de tranquilidad absoluta mediante una inspección técnica de 111 puntos clave con repuestos 100% genuinos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-lg pds-card">
              <div className="w-12 h-12 rounded-lg bg-[#d5001c]/10 text-[#d5001c] flex items-center justify-center mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-porsche text-base font-bold text-[var(--pds-theme-contrast-high)] mb-2">
                Inspección de 111 Puntos
              </h3>
              <p className="text-xs text-[var(--pds-theme-contrast-medium)] font-light leading-relaxed">
                Diagnóstico exhaustivo de tren motriz, sistema eléctrico, suspensión y carrocería bajo estándares de fábrica.
              </p>
            </div>

            <div className="p-8 rounded-lg pds-card">
              <div className="w-12 h-12 rounded-lg bg-[#d5001c]/10 text-[#d5001c] flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-porsche text-base font-bold text-[var(--pds-theme-contrast-high)] mb-2">
                Garantía Porsche de 24 Meses
              </h3>
              <p className="text-xs text-[var(--pds-theme-contrast-medium)] font-light leading-relaxed">
                Cobertura completa similar a la de un vehículo nuevo, sin límite de kilometraje durante el período de vigencia.
              </p>
            </div>

            <div className="p-8 rounded-lg pds-card">
              <div className="w-12 h-12 rounded-lg bg-[#d5001c]/10 text-[#d5001c] flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 className="font-porsche text-base font-bold text-[var(--pds-theme-contrast-high)] mb-2">
                Porsche Assistance 24/7
              </h3>
              <p className="text-xs text-[var(--pds-theme-contrast-medium)] font-light leading-relaxed">
                Asistencia en carretera en todo el territorio nacional los 365 días del año con vehículo de sustitución.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
