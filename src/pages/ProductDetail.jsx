import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Gauge,
  CreditCard,
  Building2,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  onGetProductDetails,
  onAddToWishlist,
  onAddToCart,
  onRemoveFromWishlist,
  onRemoveFromCart,
  onPlaceOrder,
} from "../store/actions";
import {
  getVehicleSpecs,
  PORSCHE_COLORS,
  PORSCHE_WHEELS,
  PORSCHE_INTERIORS,
} from "../utils/vehicleSpecs";

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { currentProduct } = useAppSelector((state) => state.shoppingReducer);
  const { wishlist, cart } = useAppSelector((state) => state.userReducer);

  const [currentUnit, setCurrentUnit] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PORSCHE_COLORS[0]);
  const [selectedWheel, setSelectedWheel] = useState(PORSCHE_WHEELS[0]);
  const [selectedInterior, setSelectedInterior] = useState(PORSCHE_INTERIORS[0]);
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);
  const [activeSpecsTab, setActiveSpecsTab] = useState("motor");
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState("form");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);

  const { _id, banner, price = 0, name, desc, type } = currentProduct || {};
  const specs = getVehicleSpecs(currentProduct);

  const angles = [
    { label: "Acabado Seleccionado", url: selectedColor.imageUrl },
    { label: "Fotografía de Estudio", url: banner },
    { label: "Vista Frontal 3/4", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=85" },
    { label: "Interior Cockpit", url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1000&auto=format&fit=crop&q=85" },
  ];

  useEffect(() => {
    if (id) {
      dispatch(onGetProductDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (Array.isArray(cart) && cart.length && _id) {
      const exist = cart.find(({ product }) => product && (product._id === _id || product.id === _id));
      if (exist) {
        setCurrentUnit(exist.unit);
      } else {
        setCurrentUnit(0);
      }
    } else {
      setCurrentUnit(0);
    }
  }, [currentProduct, cart, _id]);

  const addCart = () => {
    const newUnit = currentUnit + 1;
    setCurrentUnit(newUnit);
    dispatch(onAddToCart({ product: currentProduct, _id, qty: newUnit }));
  };

  const removeCart = () => {
    if (currentUnit > 0) {
      const newUnit = currentUnit - 1;
      setCurrentUnit(newUnit);
      if (newUnit > 0) {
        dispatch(onAddToCart({ product: currentProduct, _id, qty: newUnit }));
      } else {
        dispatch(onRemoveFromCart(_id));
      }
    }
  };

  const openReservationModal = () => {
    if (currentUnit === 0) {
      addCart();
    }
    setPaymentStep("form");
    setReservationModalOpen(true);
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setPaymentStep("processing");

    setTimeout(async () => {
      const order = await dispatch(
        onPlaceOrder({
          amount: totalConfiguredPrice,
          paymentMethod: paymentMethod === "card" ? "Tarjeta de Crédito/Débito" : "Transferencia Bancaria PSE",
          items: [{ product: currentProduct, unit: 1 }],
        })
      );
      setCompletedOrder(order);
      setPaymentStep("success");
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#d5001c", "#fcd116", "#ffffff"],
      });
    }, 1200);
  };

  const isWishlisted =
    Array.isArray(wishlist) && wishlist.some((item) => item._id === _id || item.id === _id);
  const cartEntry =
    Array.isArray(cart) && cart.find(({ product }) => product && (product._id === _id || product.id === _id));

  const totalConfiguredPrice =
    (price || 0) + (selectedWheel.price || 0) + (selectedInterior.price || 0);

  if (!currentProduct || !_id) {
    return (
      <div className="min-h-screen bg-[var(--pds-theme-background-base)] flex items-center justify-center pt-28 text-[var(--pds-theme-contrast-high)]">
        <div className="text-center p-8">
          <div className="w-8 h-8 border-2 border-[#d5001c] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-porsche text-xs uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)]">
            Cargando Ficha Técnica Porsche...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--pds-theme-background-base)] text-[var(--pds-theme-contrast-high)] pt-28 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)] hover:text-[#d5001c] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Volver a Vehículos</span>
          </Link>

          <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#d5001c]/10 text-[#d5001c]">
            Gama {type || "Sport"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: 2D Gallery & Specs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="pds-card rounded-xl overflow-hidden p-4 sm:p-6 bg-[var(--pds-theme-background-card)]">
              <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                <img
                  src={angles[selectedAngleIndex]?.url || selectedColor.imageUrl}
                  alt={name}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />

                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">
                  {selectedColor.name} • {selectedColor.type}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-3">
                {angles.map((angle, idx) => (
                  <button
                    key={angle.label}
                    type="button"
                    onClick={() => setSelectedAngleIndex(idx)}
                    className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                      selectedAngleIndex === idx
                        ? "border-[#d5001c] bg-[var(--pds-theme-background-surface)]"
                        : "border-[var(--pds-theme-border)] hover:border-[var(--pds-theme-contrast-medium)]"
                    }`}
                  >
                    <span className="block text-[9px] uppercase font-bold text-[var(--pds-theme-contrast-medium)] truncate">
                      {angle.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Paint Finish Swatches */}
            <div className="p-5 rounded-xl pds-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-pds-headline font-bold text-[var(--pds-theme-contrast-medium)]">
                  Pintura Exterior: <strong className="text-[var(--pds-theme-contrast-high)]">{selectedColor.name}</strong>
                </span>
                <span className="text-[10px] font-mono text-[#d5001c] font-semibold">
                  {selectedColor.category}
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                {PORSCHE_COLORS.map((c) => {
                  const isSelected = c.id === selectedColor.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedColor(c);
                        setSelectedAngleIndex(0);
                      }}
                      className={`group flex flex-col items-center gap-1 p-1 rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[var(--pds-theme-background-surface)] ring-2 ring-[#d5001c]"
                          : "hover:bg-[var(--pds-theme-background-surface)]"
                      }`}
                    >
                      <span
                        className="w-6.5 h-6.5 rounded-full border border-white/20 block"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[8px] text-center font-medium text-[var(--pds-theme-contrast-medium)] truncate w-full">
                        {c.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Technical Accordion/Tabs */}
            <div className="p-6 rounded-xl pds-card">
              <h3 className="font-porsche text-base font-bold text-[var(--pds-theme-contrast-high)] mb-4 flex items-center gap-2">
                <Gauge size={16} className="text-[#d5001c]" />
                <span>Ficha Técnica Oficial Porsche</span>
              </h3>

              <div className="flex border-b border-[var(--pds-theme-border)] mb-4 gap-4 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { key: "motor", label: "Motorización" },
                  { key: "performance", label: "Prestaciones" },
                  { key: "chassis", label: "Chasis & Tracción" },
                  { key: "consumption", label: "Consumo WLTP" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSpecsTab(key)}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                      activeSpecsTab === key
                        ? "border-[#d5001c] text-[#d5001c]"
                        : "border-transparent text-[var(--pds-theme-contrast-medium)] hover:text-[var(--pds-theme-contrast-high)]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-2 text-xs">
                {activeSpecsTab === "motor" && (
                  <>
                    <div className="flex justify-between py-2 border-b border-[var(--pds-theme-border-subtle)]">
                      <span className="text-[var(--pds-theme-contrast-medium)]">Tipo de Motor</span>
                      <span className="font-bold text-[var(--pds-theme-contrast-high)]">{specs.engine}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[var(--pds-theme-border-subtle)]">
                      <span className="text-[var(--pds-theme-contrast-medium)]">Potencia Máxima</span>
                      <span className="font-bold text-[var(--pds-theme-contrast-high)]">{specs.powerCV} CV ({specs.powerKW} kW)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[var(--pds-theme-border-subtle)]">
                      <span className="text-[var(--pds-theme-contrast-medium)]">Par Motor Máximo</span>
                      <span className="font-bold text-[var(--pds-theme-contrast-high)]">{specs.maxTorque}</span>
                    </div>
                  </>
                )}

                {activeSpecsTab === "performance" && (
                  <>
                    <div className="flex justify-between py-2 border-b border-[var(--pds-theme-border-subtle)]">
                      <span className="text-[var(--pds-theme-contrast-medium)]">Aceleración 0-100 km/h</span>
                      <span className="font-bold text-[#d5001c]">{specs.accel0100}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[var(--pds-theme-border-subtle)]">
                      <span className="text-[var(--pds-theme-contrast-medium)]">Velocidad Máxima en Pista</span>
                      <span className="font-bold text-[var(--pds-theme-contrast-high)]">{specs.topSpeed}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[var(--pds-theme-border-subtle)]">
                      <span className="text-[var(--pds-theme-contrast-medium)]">Paquete Sport Chrono</span>
                      <span className="font-bold text-[var(--pds-theme-contrast-high)]">Incluido de serie</span>
                    </div>
                  </>
                )}

                {activeSpecsTab === "chassis" && (
                  <>
                    <div className="flex justify-between py-2 border-b border-[var(--pds-theme-border-subtle)]">
                      <span className="text-[var(--pds-theme-contrast-medium)]">Transmisión</span>
                      <span className="font-bold text-[var(--pds-theme-contrast-high)]">{specs.transmission}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[var(--pds-theme-border-subtle)]">
                      <span className="text-[var(--pds-theme-contrast-medium)]">Tracción</span>
                      <span className="font-bold text-[var(--pds-theme-contrast-high)]">{specs.drivetrain}</span>
                    </div>
                  </>
                )}

                {activeSpecsTab === "consumption" && (
                  <>
                    <div className="flex justify-between py-2 border-b border-[var(--pds-theme-border-subtle)]">
                      <span className="text-[var(--pds-theme-contrast-medium)]">Consumo Combinado (WLTP)</span>
                      <span className="font-bold text-[var(--pds-theme-contrast-high)]">{specs.consumption}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[var(--pds-theme-border-subtle)]">
                      <span className="text-[var(--pds-theme-contrast-medium)]">Emisiones CO2 Combinadas</span>
                      <span className="font-bold text-[var(--pds-theme-contrast-high)]">{specs.co2}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Configurator & Actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 sm:p-8 rounded-xl pds-card">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={11} /> Porsche Approved
                </span>
                <span className="text-xs text-[var(--pds-theme-contrast-medium)] font-mono">
                  VIN: WP0AA2A9{_id?.slice(-4).toUpperCase()}
                </span>
              </div>

              <h1 className="font-porsche text-2xl sm:text-3xl font-bold text-[var(--pds-theme-contrast-high)] leading-tight">
                {name}
              </h1>

              <p className="text-xs text-[var(--pds-theme-contrast-medium)] font-light mt-2 leading-relaxed">
                {desc}
              </p>

              <div className="mt-6 pt-6 border-t border-[var(--pds-theme-border)] flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)] block">
                    Precio Total Configurado
                  </span>
                  <span className="font-porsche text-3xl font-bold text-[var(--pds-theme-contrast-high)]">
                    ${totalConfiguredPrice.toLocaleString()}
                  </span>
                </div>
                <span className="text-xs text-[var(--pds-theme-contrast-medium)] font-mono">
                  IVA & Tasas incl.
                </span>
              </div>
            </div>

            {/* Wheels Configurator */}
            <div className="p-6 rounded-xl pds-card">
              <h3 className="font-porsche text-xs uppercase tracking-pds-headline font-bold text-[var(--pds-theme-contrast-medium)] mb-3">
                Llantas & Rines Exclusivos
              </h3>
              <div className="space-y-2">
                {PORSCHE_WHEELS.map((wheel) => {
                  const isSelected = selectedWheel.id === wheel.id;
                  return (
                    <button
                      key={wheel.id}
                      type="button"
                      onClick={() => setSelectedWheel(wheel)}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "border-[#d5001c] bg-[#d5001c]/5 dark:bg-[#d5001c]/10"
                          : "border-[var(--pds-theme-border)] hover:border-[var(--pds-theme-contrast-medium)]"
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-[var(--pds-theme-contrast-high)]">
                          {wheel.name}
                        </p>
                        <p className="text-[10px] text-[var(--pds-theme-contrast-medium)] font-light">
                          {wheel.desc}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[var(--pds-theme-contrast-high)] shrink-0 ml-2">
                        {wheel.price === 0 ? "Incluido" : `+$${wheel.price.toLocaleString()}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interior Configurator */}
            <div className="p-6 rounded-xl pds-card">
              <h3 className="font-porsche text-xs uppercase tracking-pds-headline font-bold text-[var(--pds-theme-contrast-medium)] mb-3">
                Tapicería & Acabados Interiores
              </h3>
              <div className="space-y-2">
                {PORSCHE_INTERIORS.map((int) => {
                  const isSelected = selectedInterior.id === int.id;
                  return (
                    <button
                      key={int.id}
                      type="button"
                      onClick={() => setSelectedInterior(int)}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "border-[#d5001c] bg-[#d5001c]/5 dark:bg-[#d5001c]/10"
                          : "border-[var(--pds-theme-border)] hover:border-[var(--pds-theme-contrast-medium)]"
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-[var(--pds-theme-contrast-high)]">
                          {int.name}
                        </p>
                        <p className="text-[10px] text-[var(--pds-theme-contrast-medium)] font-light">
                          {int.desc}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[var(--pds-theme-contrast-high)] shrink-0 ml-2">
                        {int.price === 0 ? "Incluido" : `+$${int.price.toLocaleString()}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-6 rounded-xl pds-card space-y-3">
              <div className="flex items-center gap-3">
                {cartEntry ? (
                  <div className="flex-1 flex items-center justify-between p-2 rounded-full border border-[var(--pds-theme-border)] bg-[var(--pds-theme-background-surface)]">
                    <button
                      type="button"
                      onClick={removeCart}
                      className="w-9 h-9 rounded-full bg-[var(--pds-theme-background-card)] hover:bg-[#d5001c] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <div className="text-center">
                      <span className="font-porsche text-sm font-bold text-[var(--pds-theme-contrast-high)]">
                        {currentUnit} un. en carrito
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={addCart}
                      className="w-9 h-9 rounded-full bg-[var(--pds-theme-background-card)] hover:bg-[#d5001c] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={addCart}
                    className="pds-button-primary flex-1 !py-3.5"
                  >
                    <ShoppingBag size={15} />
                    <span>Añadir al Carrito</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    dispatch(
                      isWishlisted ? onRemoveFromWishlist(_id) : onAddToWishlist(currentProduct)
                    )
                  }
                  className={`p-3.5 rounded-full border transition-colors cursor-pointer ${
                    isWishlisted
                      ? "bg-[#d5001c]/10 border-[#d5001c] text-[#d5001c]"
                      : "border-[var(--pds-theme-border)] text-[var(--pds-theme-contrast-high)] hover:bg-[var(--pds-theme-background-surface)]"
                  }`}
                  title={isWishlisted ? "Quitar de Favoritos" : "Guardar en Favoritos"}
                >
                  <Heart size={18} className={isWishlisted ? "fill-[#d5001c]" : ""} />
                </button>
              </div>

              <button
                type="button"
                onClick={openReservationModal}
                className="pds-button-brand w-full !py-3.5"
              >
                <Sparkles size={15} />
                <span>Pagar y Reservar Vehículo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {reservationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-[var(--pds-theme-background-card)] rounded-xl border border-[var(--pds-theme-border)] p-6 sm:p-8 shadow-2xl text-[var(--pds-theme-contrast-high)] my-8">
            {paymentStep === "form" && (
              <form onSubmit={handleProcessPayment}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-sm bg-[#d5001c] text-white flex items-center justify-center font-bold text-xs">
                      P
                    </div>
                    <span className="font-porsche text-sm font-bold tracking-pds-headline">
                      PORSCHE SECURE CHECKOUT
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <Lock size={10} /> 256-bit SSL
                  </span>
                </div>

                <p className="text-xs text-[var(--pds-theme-contrast-medium)] font-light mb-5">
                  Completa tu pago oficial para formalizar la reserva del vehículo en el inventario de Porsche Colombia.
                </p>

                <div className="p-4 rounded-lg bg-[var(--pds-theme-background-surface)] space-y-1.5 text-xs mb-5 border border-[var(--pds-theme-border-subtle)]">
                  <div className="flex justify-between">
                    <span className="text-[var(--pds-theme-contrast-medium)]">Vehículo:</span>
                    <span className="font-bold">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--pds-theme-contrast-medium)]">Color:</span>
                    <span>{selectedColor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--pds-theme-contrast-medium)]">Rines:</span>
                    <span>{selectedWheel.name}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[var(--pds-theme-border)] font-bold text-sm">
                    <span>Total a Pagar:</span>
                    <span className="font-porsche text-[#d5001c]">${totalConfiguredPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[10px] uppercase tracking-pds-headline font-bold text-[var(--pds-theme-contrast-medium)] mb-2">
                    Método de Pago Oficial
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        paymentMethod === "card"
                          ? "border-[#d5001c] bg-[#d5001c]/5 dark:bg-[#d5001c]/10"
                          : "border-[var(--pds-theme-border)]"
                      }`}
                    >
                      <CreditCard size={16} className={paymentMethod === "card" ? "text-[#d5001c]" : ""} />
                      <span className="text-xs font-bold">Tarjeta de Crédito</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("pse")}
                      className={`p-3 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        paymentMethod === "pse"
                          ? "border-[#d5001c] bg-[#d5001c]/5 dark:bg-[#d5001c]/10"
                          : "border-[var(--pds-theme-border)]"
                      }`}
                    >
                      <Building2 size={16} className={paymentMethod === "pse" ? "text-[#d5001c]" : ""} />
                      <span className="text-xs font-bold">PSE / Bancos</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === "card" ? (
                  <div className="space-y-3 mb-6">
                    <div>
                      <label className="block text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] font-bold mb-1">
                        Nombre del Titular
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nombre completo como aparece en la tarjeta"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] focus:outline-none focus:border-[#d5001c]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] font-bold mb-1">
                        Número de Tarjeta
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="4500 0000 0000 0000"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 "))}
                        className="w-full p-2.5 text-xs font-mono rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] focus:outline-none focus:border-[#d5001c]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] font-bold mb-1">
                          Vencimiento (MM/AA)
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="12/28"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 text-xs font-mono rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] focus:outline-none focus:border-[#d5001c]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] font-bold mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          placeholder="•••"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full p-2.5 text-xs font-mono rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] focus:outline-none focus:border-[#d5001c]"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 mb-6">
                    <div>
                      <label className="block text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] font-bold mb-1">
                        Banco Emisor
                      </label>
                      <select className="w-full p-2.5 text-xs rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] focus:outline-none focus:border-[#d5001c]">
                        <option>Bancolombia</option>
                        <option>Banco de Bogotá</option>
                        <option>Davivienda</option>
                        <option>BBVA Colombia</option>
                        <option>Scotiabank Colpatria</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] font-bold mb-1">
                        Tipo de Documento & Cédula
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="CC 1.000.000.000"
                        className="w-full p-2.5 text-xs rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] focus:outline-none focus:border-[#d5001c]"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="pds-button-brand flex-1 text-center"
                  >
                    Confirmar y Pagar ${totalConfiguredPrice.toLocaleString()}
                  </button>
                  <button
                    type="button"
                    onClick={() => setReservationModalOpen(false)}
                    className="pds-button-secondary flex-1 text-center"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {paymentStep === "processing" && (
              <div className="text-center py-10">
                <div className="w-12 h-12 border-3 border-[#d5001c] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h3 className="font-porsche text-lg font-bold">Procesando Pago Seguro...</h3>
                <p className="text-xs text-[var(--pds-theme-contrast-medium)] mt-1">
                  Conectando con la pasarela de pagos de Porsche Financial Services.
                </p>
              </div>
            )}

            {paymentStep === "success" && (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-porsche text-xl font-bold">¡Pago y Reserva Confirmada!</h3>
                <p className="text-xs text-[var(--pds-theme-contrast-medium)] mt-1 mb-6">
                  Se ha generado la orden de reserva oficial con ID:{" "}
                  <strong className="font-mono text-[var(--pds-theme-contrast-high)]">{completedOrder?.orderId || "PORSCHE-RES"}</strong>
                </p>

                <div className="p-4 rounded-lg bg-[var(--pds-theme-background-surface)] text-left text-xs space-y-1.5 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[var(--pds-theme-contrast-medium)]">Transacción:</span>
                    <span className="font-mono font-bold">{completedOrder?.txnId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--pds-theme-contrast-medium)]">Monto Pagado:</span>
                    <span className="font-porsche font-bold text-[#d5001c]">${totalConfiguredPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--pds-theme-contrast-medium)]">Estado:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Confirmado</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/login"
                    onClick={() => setReservationModalOpen(false)}
                    className="pds-button-brand flex-1 text-center"
                  >
                    Ver en Mi Garaje
                  </Link>
                  <button
                    type="button"
                    onClick={() => setReservationModalOpen(false)}
                    className="pds-button-secondary flex-1 text-center"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
