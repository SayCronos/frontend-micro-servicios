import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Car,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  DollarSign,
  Tag,
  FileText,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Sliders,
  ShieldAlert
} from "lucide-react";
import confetti from "canvas-confetti";
import { PostData } from "../utils/apicall";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { onGetProducts } from "../store/actions";

const PORSCHE_PRESETS = [
  {
    name: "Porsche 911 Carrera GTS",
    desc: "Motor bóxer 6 cilindros con tecnología T-Hybrid de 541 CV y tracción trasera optimizada.",
    type: "sport",
    banner: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&fit=crop",
    price: 185000,
    available: true,
  },
  {
    name: "Porsche Taycan Turbo GT",
    desc: "Superberlina 100% eléctrica con 1.108 CV en Attack Mode y aceleración 0-100 km/h en 2.2s.",
    type: "sedan",
    banner: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&fit=crop",
    price: 230000,
    available: true,
  },
  {
    name: "Porsche Cayenne Turbo GT",
    desc: "SUV de máximo rendimiento con motor V8 biturbo de 659 CV y suspensión neumática activa.",
    type: "suv",
    banner: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&fit=crop",
    price: 215000,
    available: true,
  },
  {
    name: "Porsche 718 Cayman GT4 RS",
    desc: "Motor central atmosférico de 4.0L con 500 CV derivado del 911 GT3 de competición.",
    type: "coupe",
    banner: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&fit=crop",
    price: 165000,
    available: true,
  },
];

const BODY_TYPES = [
  { value: "sport", label: "Deportivo / Sport" },
  { value: "coupe", label: "Coupé" },
  { value: "sedan", label: "Sedán" },
  { value: "suv", label: "SUV" },
  { value: "hatchback", label: "Hatchback" },
  { value: "truck", label: "Camioneta / Truck" },
];

export const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);

  const token = user?.token || (typeof localStorage !== "undefined" ? localStorage.getItem("token") : null);

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    type: "sport",
    banner: "",
    price: "",
    available: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [createdProduct, setCreatedProduct] = useState(null);
  const [activePresetIndex, setActivePresetIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setActivePresetIndex(null);
    if (error) setError(null);
  };

  const handlePresetSelect = (preset, idx) => {
    setFormData({
      name: preset.name,
      desc: preset.desc,
      type: preset.type,
      banner: preset.banner,
      price: preset.price.toString(),
      available: preset.available,
    });
    setActivePresetIndex(idx);
    setError(null);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      desc: "",
      type: "sport",
      banner: "",
      price: "",
      available: true,
    });
    setCreatedProduct(null);
    setError(null);
    setActivePresetIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Debes iniciar sesión con una cuenta autorizada para registrar nuevos vehículos.");
      return;
    }

    if (!formData.name.trim()) {
      setError("El nombre del modelo es obligatorio.");
      return;
    }
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      setError("El precio debe ser un número válido mayor a 0.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload = {
      name: formData.name.trim(),
      desc: formData.desc.trim(),
      type: formData.type.trim().toLowerCase(),
      banner: formData.banner.trim() || "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&fit=crop",
      price: Number(formData.price),
      available: Boolean(formData.available),
    };

    try {
      const response = await PostData("/product/create", payload);
      const data = response?.data;

      setCreatedProduct(data || payload);
      dispatch(onGetProducts());

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#d5001c", "#c5a059", "#ffffff"],
      });
    } catch (err) {
      console.error("Error al crear producto:", err);
      const serverMsg = err.response?.data?.message || err.message || "Error al registrar el vehículo en el catálogo.";
      setError(serverMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewPrice = Number(formData.price) || 0;
  const previewImage =
    formData.banner.trim() ||
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&fit=crop";

  return (
    <div className="min-h-screen bg-[var(--pds-theme-background-base)] text-[var(--pds-theme-contrast-high)] pt-28 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 border-b border-[var(--pds-theme-border)] mb-8">
          <div className="flex items-center gap-2 text-xs text-[var(--pds-theme-contrast-medium)]">
            <Link to="/profile" className="hover:text-[#d5001c] transition-colors flex items-center gap-1">
              <ArrowLeft size={13} />
              <span>Mi Garaje</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--pds-theme-contrast-high)] font-semibold">Administración de Catálogo</span>
          </div>

          <Link to="/vehicles" className="pds-button-secondary text-xs !py-2 !px-4">
            <Car size={13} />
            <span>Ver Catálogo</span>
          </Link>
        </div>

        {/* Header Title */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-pds-headline text-[#d5001c] font-bold block mb-1">
            Porsche Center Colombia • Portal Administrativo
          </span>
          <h1 className="font-porsche text-3xl sm:text-4xl font-bold tracking-tight text-[var(--pds-theme-contrast-high)]">
            ALTA DE NUEVO VEHÍCULO
          </h1>
          <p className="text-xs sm:text-sm text-[var(--pds-theme-contrast-medium)] mt-1.5 max-w-2xl font-light leading-relaxed">
            Ingresa los datos técnicos, precio y disponibilidad del nuevo vehículo. Los cambios se sincronizarán directamente en la base de datos oficial y en el catálogo en tiempo real.
          </p>
        </div>

        {/* Unauthenticated Alert */}
        {!token && (
          <div className="p-4 rounded-xl mb-6 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-start gap-3">
            <ShieldAlert size={20} className="shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block font-bold">Autenticación Requerida</strong>
              Para publicar vehículos en el inventario debes haber iniciado sesión con credenciales administrativas.
              <Link to="/login" className="underline font-bold ml-1 hover:text-amber-500">
                Iniciar Sesión aquí
              </Link>
            </div>
          </div>
        )}

        {/* Quick Presets Bar */}
        <div className="mb-8 p-4 rounded-xl pds-card">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-[#d5001c]" />
            <span className="text-[11px] uppercase tracking-pds-headline font-bold text-[var(--pds-theme-contrast-high)]">
              Plantillas Rápidas Porsche (Autocompletado)
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PORSCHE_PRESETS.map((preset, idx) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handlePresetSelect(preset, idx)}
                className={`text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                  activePresetIndex === idx
                    ? "border-[#d5001c] bg-[#d5001c]/10 text-[var(--pds-theme-contrast-high)] font-semibold shadow-sm"
                    : "border-[var(--pds-theme-border)] bg-[var(--pds-theme-background-surface)] text-[var(--pds-theme-contrast-medium)] hover:border-[var(--pds-theme-contrast-high)] hover:text-[var(--pds-theme-contrast-high)]"
                }`}
              >
                <span className="block font-bold truncate">{preset.name}</span>
                <span className="text-[10px] opacity-75 font-mono">${preset.price.toLocaleString()} USD</span>
              </button>
            ))}
          </div>
        </div>

        {/* Success Modal / State */}
        {createdProduct && (
          <div className="mb-8 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[var(--pds-theme-contrast-high)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3 className="font-porsche text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    ¡Vehículo Creado Exitosamente!
                  </h3>
                  <p className="text-xs text-[var(--pds-theme-contrast-medium)] mt-0.5">
                    <strong>{createdProduct.name}</strong> ha sido persistido en <em>products_db</em> y ya se encuentra visible en el catálogo.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Link to="/vehicles" className="pds-button-brand text-xs flex-1 sm:flex-initial text-center">
                  <span>Ir al Catálogo</span>
                  <ArrowRight size={13} />
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  className="pds-button-secondary text-xs flex-1 sm:flex-initial"
                >
                  <RotateCcw size={13} />
                  <span>Crear Otro</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-[#d5001c]/10 border border-[#d5001c]/30 text-[#d5001c] flex items-center gap-3 text-xs">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Main 2-Column Grid: Form + Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="pds-card rounded-xl p-6 sm:p-8 space-y-6">
              {/* Section 1: Modelo & Carrocería */}
              <div>
                <h2 className="font-porsche text-xs uppercase tracking-pds-headline font-bold text-[var(--pds-theme-contrast-high)] border-b border-[var(--pds-theme-border)] pb-2 mb-4 flex items-center gap-2">
                  <Car size={14} className="text-[#d5001c]" />
                  <span>1. Especificaciones del Modelo</span>
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[var(--pds-theme-contrast-medium)] mb-1">
                      Nombre Oficial del Modelo <span className="text-[#d5001c]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Ej. Porsche 911 GT3 RS"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 text-xs rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] text-[var(--pds-theme-contrast-high)] placeholder-[var(--pds-theme-contrast-medium)]/50 focus:outline-none focus:border-[#d5001c] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-[var(--pds-theme-contrast-medium)] mb-1">
                        Tipo de Carrocería <span className="text-[#d5001c]">*</span>
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-3 text-xs rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] text-[var(--pds-theme-contrast-high)] focus:outline-none focus:border-[#d5001c] transition-colors cursor-pointer"
                      >
                        {BODY_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-[var(--pds-theme-contrast-medium)] mb-1">
                        Precio Base (USD) <span className="text-[#d5001c]">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[var(--pds-theme-contrast-medium)] font-bold">
                          $
                        </span>
                        <input
                          type="number"
                          name="price"
                          required
                          min="1"
                          step="100"
                          placeholder="223800"
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full pl-8 pr-3 py-3 text-xs font-mono rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] text-[var(--pds-theme-contrast-high)] placeholder-[var(--pds-theme-contrast-medium)]/50 focus:outline-none focus:border-[#d5001c] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[var(--pds-theme-contrast-medium)] mb-1">
                      Descripción Editorial del Vehículo
                    </label>
                    <textarea
                      name="desc"
                      rows={3}
                      placeholder="Detalles sobre motorización, prestaciones dinámicas, equipamiento interior y garantía Porsche Approved..."
                      value={formData.desc}
                      onChange={handleChange}
                      className="w-full p-3 text-xs rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] text-[var(--pds-theme-contrast-high)] placeholder-[var(--pds-theme-contrast-medium)]/50 focus:outline-none focus:border-[#d5001c] transition-colors resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Banner & Disponibilidad */}
              <div>
                <h2 className="font-porsche text-xs uppercase tracking-pds-headline font-bold text-[var(--pds-theme-contrast-high)] border-b border-[var(--pds-theme-border)] pb-2 mb-4 flex items-center gap-2">
                  <ImageIcon size={14} className="text-[#d5001c]" />
                  <span>2. Multimedia & Estado de Venta</span>
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[var(--pds-theme-contrast-medium)] mb-1">
                      URL de la Imagen / Banner (Alta Resolución)
                    </label>
                    <input
                      type="url"
                      name="banner"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={formData.banner}
                      onChange={handleChange}
                      className="w-full p-3 text-xs rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] text-[var(--pds-theme-contrast-high)] placeholder-[var(--pds-theme-contrast-medium)]/50 focus:outline-none focus:border-[#d5001c] transition-colors font-mono"
                    />
                    <span className="block text-[10px] text-[var(--pds-theme-contrast-medium)] mt-1">
                      Sugerencia: Utiliza imágenes en proporción 16:9 o 16:10 para óptima visualización en el catálogo.
                    </span>
                  </div>

                  {/* Availability Toggle Switch */}
                  <div className="p-4 rounded-xl bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-xs font-bold text-[var(--pds-theme-contrast-high)]">
                        Disponibilidad Inmediata
                      </span>
                      <span className="block text-[10px] text-[var(--pds-theme-contrast-medium)] mt-0.5">
                        {formData.available
                          ? "El vehículo se mostrará listo para entrega inmediata y reserva en línea."
                          : "El vehículo se marcará como 'Bajo Pedido Especial' con tiempo de espera."}
                      </span>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6.5 bg-neutral-300 dark:bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d5001c]" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[var(--pds-theme-border)] flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting || !token}
                  className="pds-button-brand flex-1 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Registrando en Base de Datos...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle size={15} />
                      <span>Publicar Vehículo en Inventario</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="pds-button-secondary text-xs sm:w-36"
                >
                  <RotateCcw size={13} />
                  <span>Limpiar</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Preview Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-1 mb-2 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-pds-headline text-[var(--pds-theme-contrast-medium)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#d5001c] animate-pulse" />
                Vista Previa Oficial en Catálogo
              </span>
              <span className="text-[10px] font-mono text-[var(--pds-theme-contrast-medium)]">
                PDS Card UI
              </span>
            </div>

            {/* Simulated Porsche Card */}
            <div className="group relative flex flex-col pds-card rounded-lg overflow-hidden border border-[var(--pds-theme-border)] shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200 dark:bg-neutral-900 block">
                <img
                  src={previewImage}
                  alt={formData.name || "Preview"}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&fit=crop";
                  }}
                />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-black/80 text-white border border-white/10 flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d5001c]" />
                    {formData.type ? formData.type.toUpperCase() : "SPORT"}
                  </span>

                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-black/60 text-white border border-white/10">
                    Porsche Approved
                  </span>
                </div>

                {!formData.available && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-black text-white border border-white/20 text-xs px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                      Bajo Pedido Especial
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 p-5 justify-between gap-4 bg-[var(--pds-theme-background-card)]">
                <div>
                  <h3 className="font-porsche text-lg font-bold text-[var(--pds-theme-contrast-high)] truncate">
                    {formData.name || "Nombre del Vehículo Porsche"}
                  </h3>
                  <p className="text-xs text-[var(--pds-theme-contrast-medium)] line-clamp-2 mt-1 font-light leading-relaxed">
                    {formData.desc || "Descripción técnica y equipamiento dinámico del modelo registrado..."}
                  </p>
                </div>

                {/* Simulated Specs */}
                <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-md bg-[var(--pds-theme-background-surface)] text-center text-xs">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)]">
                      Potencia
                    </span>
                    <span className="font-bold text-[var(--pds-theme-contrast-high)]">
                      520 CV
                    </span>
                  </div>
                  <div className="border-x border-[var(--pds-theme-border)]">
                    <span className="block text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)]">
                      0-100 km/h
                    </span>
                    <span className="font-bold text-[#d5001c]">
                      3.2 s
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[var(--pds-theme-contrast-medium)]">
                      Tracción
                    </span>
                    <span className="font-bold text-[var(--pds-theme-contrast-high)]">
                      AWD / RWD
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--pds-theme-border-subtle)]">
                  <div>
                    <span className="text-[9px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)] block">
                      Precio Base
                    </span>
                    <span className="font-porsche text-lg font-bold text-[var(--pds-theme-contrast-high)]">
                      ${previewPrice > 0 ? previewPrice.toLocaleString() : "0"} USD
                    </span>
                  </div>

                  <span className="text-[10px] text-[#d5001c] font-bold uppercase tracking-wider">
                    {formData.available ? "Disponible" : "Bajo Pedido"}
                  </span>
                </div>
              </div>
            </div>

            {/* Helper Guidance Card */}
            <div className="mt-4 p-4 rounded-xl bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] text-xs text-[var(--pds-theme-contrast-medium)] space-y-1.5">
              <span className="font-bold text-[var(--pds-theme-contrast-high)] block">
                Directrices del Catálogo Porsche
              </span>
              <p className="text-[11px] leading-relaxed">
                Cada nuevo registro pasa a formar parte de la colección oficial alojada en la base de datos distribuida. Se recomienda asociar imágenes oficiales de prensa y especificaciones exactas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
