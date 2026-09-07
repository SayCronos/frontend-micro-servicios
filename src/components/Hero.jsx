import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Sliders, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0b0d] text-white">
      {/* Background Image with Cinematic Luxury Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&auto=format&fit=crop&q=90"
          alt="Porsche 911 Carrera en carretera"
          className="w-full h-full object-cover object-center scale-105 animate-fade-in"
          loading="eager"
        />
        {/* Multilayered Gradients for Editorial Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/50 to-[#0a0b0d]/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0a0b0d]/40 to-[#0a0b0d]/90" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
        {/* Subtle Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-[0.2em] uppercase text-neutral-200 mb-6 shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#d5001c] animate-pulse" />
          <span>Gama 2026 • Porsche Colombia</span>
        </motion.div>

        {/* Hero Impact Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-porsche text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase max-w-5xl leading-[1.05]"
        >
          LA FORMA SIGUE A LA <span className="text-[#d5001c]">EMOCIÓN</span>
        </motion.h1>

        {/* Refined Descriptive Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light leading-relaxed tracking-wide"
        >
          Ingeniería de precisión nacida en Weissach y configurada para el asfalto colombiano. Superdeportivos, berlinas de alto lujo y movilidad eléctrica con ADN de competición.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            to="/vehicles"
            className="w-full sm:w-auto pds-button-brand text-xs !py-3.5 !px-8 flex items-center justify-center gap-2.5 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Explorar Modelos</span>
            <ArrowRight size={15} />
          </Link>

          <Link
            to="/vehicles#gama"
            className="w-full sm:w-auto pds-button-secondary text-xs !py-3.5 !px-8 flex items-center justify-center gap-2 border-white/20 text-white hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
          >
            <Sliders size={14} />
            <span>Configurar a Medida</span>
          </Link>
        </motion.div>

        {/* Telemetry Indicator Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 sm:mt-24 grid grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-white/15 w-full max-w-3xl text-center"
        >
          <div>
            <span className="block text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-1">
              Potencia T-Hybrid
            </span>
            <span className="font-porsche text-xl sm:text-3xl font-bold text-white tracking-tight">
              Hasta 541 CV
            </span>
          </div>

          <div className="border-x border-white/15 px-2">
            <span className="block text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-1">
              0 a 100 km/h
            </span>
            <span className="font-porsche text-xl sm:text-3xl font-bold text-[#d5001c] tracking-tight">
              3.0 s
            </span>
          </div>

          <div>
            <span className="block text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-1">
              Certificación
            </span>
            <span className="font-porsche text-xl sm:text-3xl font-bold text-white tracking-tight">
              111 Puntos
            </span>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Arrow */}
      <a
        href="#gama"
        aria-label="Desplazarse a la gama de modelos"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-neutral-400 hover:text-white transition-colors p-2 animate-bounce cursor-pointer"
      >
        <ChevronDown size={22} />
      </a>
    </section>
  );
};

export default Hero;
