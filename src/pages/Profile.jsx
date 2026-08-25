import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  Package,
  LogOut,
  Car,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  Plus,
  CreditCard,
  Building2,
  Lock,
  CheckCircle2,
  ArrowRight,
  Receipt,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  onViewProfile,
  onLogout,
  onAddToCart,
  onRemoveFromCart,
  onRemoveFromWishlist,
  onCreateAddress,
  onPlaceOrder,
} from "../store/actions";
import { CartItem } from "../components/Cart-comp";
import { WishItem } from "../components/Wishlist-comp";
import { OrderItem } from "../components/Order-comp";
import { AddressComponent } from "../components/Address-comp";

export const Profile = () => {
  const { profile, user, cart, wishlist, orders, address } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState("cart");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Colombia");

  // Payment Modal State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState("form"); // 'form' | 'processing' | 'success'
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [installments, setInstallments] = useState("1");
  const [completedOrder, setCompletedOrder] = useState(null);

  useEffect(() => {
    dispatch(onViewProfile());
  }, [dispatch]);

  const onAdd = (item) => {
    dispatch(onAddToCart({ _id: item._id, qty: item.qty }));
  };

  const onRemove = (item) => {
    dispatch(onRemoveFromCart(item._id));
  };

  const removeFromWishlist = (id) => {
    dispatch(onRemoveFromWishlist(id));
  };

  const saveNewAddress = (e) => {
    e.preventDefault();
    if (!street || !city) return;
    dispatch(onCreateAddress({ street, postalCode, city, country }));
    setShowAddressModal(false);
    setStreet("");
    setCity("");
    setPostalCode("");
  };

  const cartList = Array.isArray(cart) ? cart : [];
  const totalAmount = cartList.reduce((sum, item) => {
    const p = item.product?.price || 0;
    const u = item.unit || 1;
    return sum + p * u;
  }, 0);

  const ivaTax = Math.round(totalAmount * 0.19);
  const grandTotal = totalAmount; // In Colombia luxury car prices already include IVA

  const openCheckout = () => {
    setPaymentStep("form");
    setCheckoutModalOpen(true);
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setPaymentStep("processing");

    setTimeout(async () => {
      const order = await dispatch(
        onPlaceOrder({
          amount: grandTotal,
          paymentMethod:
            paymentMethod === "card"
              ? `Tarjeta de Crédito (${installments} cuotas)`
              : "Transferencia Bancaria PSE",
          items: cartList,
        })
      );
      setCompletedOrder(order);
      setPaymentStep("success");
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.5 },
        colors: ["#d5001c", "#fcd116", "#ffffff"],
      });
    }, 1500);
  };

  const displayName = profile?.email ? profile.email.split("@")[0] : "Propietario Porsche";
  const initial = displayName.charAt(0).toUpperCase();

  const tabs = [
    { key: "cart", label: "Carrito & Reservas", icon: ShoppingBag, count: cartList.length },
    { key: "wishlist", label: "Favoritos en Garaje", icon: Heart, count: Array.isArray(wishlist) ? wishlist.length : 0 },
    { key: "orders", label: "Historial de Pedidos", icon: Package, count: Array.isArray(orders) ? orders.length : 0 },
  ];

  return (
    <div className="min-h-screen bg-[var(--pds-theme-background-base)] text-[var(--pds-theme-contrast-high)] pt-28 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="rounded-xl pds-card p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-[#d5001c] text-white flex items-center justify-center text-xl font-bold font-porsche shadow-md">
                {initial}
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold tracking-pds-headline text-[#d5001c] bg-[#d5001c]/10 px-2.5 py-0.5 rounded-full">
                  Porsche Member
                </span>
                <h1 className="font-porsche text-2xl font-bold text-[var(--pds-theme-contrast-high)] capitalize mt-1">
                  {displayName}
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-[var(--pds-theme-contrast-medium)]">
                  {profile?.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail size={12} /> {profile.email}
                    </span>
                  )}
                  {profile?.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone size={12} /> {profile.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/vehicles" className="pds-button-primary text-xs !py-2.5 !px-5">
                <Car size={14} />
                <span>Explorar Gama</span>
              </Link>

              <button
                type="button"
                onClick={() => dispatch(onLogout())}
                className="pds-button-secondary text-xs !py-2.5 !px-4"
              >
                <LogOut size={13} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        {/* Address Management */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-porsche text-xs uppercase tracking-pds-headline font-bold text-[var(--pds-theme-contrast-medium)]">
              Dirección de Entrega
            </h2>
            <button
              type="button"
              onClick={() => setShowAddressModal(!showAddressModal)}
              className="text-xs font-bold text-[#d5001c] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus size={13} />
              <span>{showAddressModal ? "Cerrar" : "Nueva Dirección"}</span>
            </button>
          </div>

          {showAddressModal && (
            <form onSubmit={saveNewAddress} className="p-6 rounded-xl pds-card mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] mb-1 font-bold">Calle</label>
                <input
                  type="text"
                  required
                  placeholder="Calle 85 # 11-53"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] focus:outline-none focus:border-[#d5001c]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] mb-1 font-bold">Ciudad</label>
                <input
                  type="text"
                  required
                  placeholder="Bogotá"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] focus:outline-none focus:border-[#d5001c]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] mb-1 font-bold">Código Postal</label>
                <input
                  type="text"
                  placeholder="110111"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] focus:outline-none focus:border-[#d5001c]"
                />
              </div>
              <div className="sm:col-span-3 flex justify-end">
                <button type="submit" className="pds-button-brand text-xs">
                  Guardar Dirección
                </button>
              </div>
            </form>
          )}

          <AddressComponent address={address} />
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[var(--pds-theme-border)] mb-6 gap-6">
          {tabs.map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === key
                  ? "border-[#d5001c] text-[#d5001c]"
                  : "border-transparent text-[var(--pds-theme-contrast-medium)] hover:text-[var(--pds-theme-contrast-high)]"
              }`}
            >
              <Icon size={15} />
              <span>{label}</span>
              {count > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#d5001c] text-white text-[9px] font-bold">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="min-h-[280px]">
          {activeTab === "cart" && (
            <div>
              {cartList.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Cart Items List */}
                  <div className="lg:col-span-8 space-y-4">
                    {cartList.map((item, idx) => (
                      <CartItem
                        key={item.product?._id || item.product?.id || idx}
                        item={item}
                        cart={cartList}
                        onAdd={onAdd}
                        onRemove={onRemove}
                      />
                    ))}
                  </div>

                  {/* Order Financial Breakdown & Checkout Button */}
                  <div className="lg:col-span-4">
                    <div className="p-6 rounded-xl pds-card sticky top-28 space-y-5">
                      <div className="flex items-center justify-between border-b border-[var(--pds-theme-border)] pb-3">
                        <h3 className="font-porsche text-xs uppercase tracking-pds-headline font-bold">
                          Resumen de Inversión
                        </h3>
                        <span className="text-[10px] text-[var(--pds-theme-contrast-medium)]">
                          {cartList.length} {cartList.length === 1 ? "vehículo" : "vehículos"}
                        </span>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between text-[var(--pds-theme-contrast-medium)]">
                          <span>Subtotal Vehículos:</span>
                          <span className="font-bold text-[var(--pds-theme-contrast-high)]">
                            ${(grandTotal - ivaTax).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between text-[var(--pds-theme-contrast-medium)]">
                          <span>IVA e Impuestos (19%):</span>
                          <span className="font-bold text-[var(--pds-theme-contrast-high)]">
                            ${ivaTax.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between text-[var(--pds-theme-contrast-medium)]">
                          <span>Alistamiento & Entrega Concierge:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                            Bonificado ($0)
                          </span>
                        </div>

                        <div className="pt-3 border-t border-[var(--pds-theme-border)] flex justify-between items-baseline">
                          <span className="font-bold text-sm text-[var(--pds-theme-contrast-high)]">
                            Total a Pagar:
                          </span>
                          <span className="font-porsche text-2xl font-bold text-[#d5001c]">
                            ${grandTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-2">
                        <button
                          type="button"
                          onClick={openCheckout}
                          className="pds-button-brand w-full !py-3.5 flex items-center justify-center gap-2"
                        >
                          <CreditCard size={15} />
                          <span>Proceder al Pago Oficial</span>
                        </button>

                        <Link
                          to="/vehicles"
                          className="pds-button-secondary w-full !py-3 text-center block text-xs"
                        >
                          Añadir Otro Modelo
                        </Link>
                      </div>

                      <div className="pt-3 border-t border-[var(--pds-theme-border-subtle)] flex items-center justify-center gap-2 text-[10px] text-[var(--pds-theme-contrast-medium)]">
                        <Lock size={12} className="text-emerald-500" />
                        <span>Transacción segura y encriptada por Porsche</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center rounded-xl pds-card p-8">
                  <ShoppingBag size={36} className="mx-auto text-[var(--pds-theme-contrast-medium)] mb-3 opacity-60" />
                  <h3 className="font-porsche text-lg font-bold text-[var(--pds-theme-contrast-high)]">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-xs text-[var(--pds-theme-contrast-medium)] mt-1 mb-5 max-w-sm mx-auto">
                    Explora el inventario oficial de superdeportivos y añade tu configuración al carrito.
                  </p>
                  <Link to="/vehicles" className="pds-button-primary text-xs">
                    Ver Catálogo
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              {Array.isArray(wishlist) && wishlist.length > 0 ? (
                <div>
                  {wishlist.map((item, idx) => (
                    <WishItem
                      key={item._id || item.id || idx}
                      item={item}
                      onTapRemove={removeFromWishlist}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center rounded-xl pds-card p-8">
                  <Heart size={36} className="mx-auto text-[var(--pds-theme-contrast-medium)] mb-3 opacity-60" />
                  <h3 className="font-porsche text-lg font-bold text-[var(--pds-theme-contrast-high)]">
                    Sin vehículos guardados en favoritos
                  </h3>
                  <p className="text-xs text-[var(--pds-theme-contrast-medium)] mt-1 mb-5 max-w-sm mx-auto">
                    Guarda modelos para acceder rápidamente a sus especificaciones técnicas y cotización.
                  </p>
                  <Link to="/vehicles" className="pds-button-primary text-xs">
                    Explorar Modelos
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              {Array.isArray(orders) && orders.length > 0 ? (
                <div>
                  {orders.map((item, idx) => (
                    <OrderItem
                      key={item._id || item.orderId || idx}
                      item={item}
                      onTapViewMore={() => {}}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center rounded-xl pds-card p-8">
                  <Package size={36} className="mx-auto text-[var(--pds-theme-contrast-medium)] mb-3 opacity-60" />
                  <h3 className="font-porsche text-lg font-bold text-[var(--pds-theme-contrast-high)]">
                    No tienes pedidos registrados todavía
                  </h3>
                  <p className="text-xs text-[var(--pds-theme-contrast-medium)] mt-1 mb-5 max-w-sm mx-auto">
                    Realiza tu primera reserva oficial desde el carrito o en la vista detallada de cualquier modelo.
                  </p>
                  <Link to="/vehicles" className="pds-button-primary text-xs">
                    Ver Catálogo
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ================= PORSCHE CHECKOUT & PAYMENT MODAL ================= */}
      {checkoutModalOpen && (
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
                      PORSCHE SECURE PAYMENT
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <Lock size={10} /> 256-bit SSL
                  </span>
                </div>

                <p className="text-xs text-[var(--pds-theme-contrast-medium)] font-light mb-5">
                  Selecciona tu método de pago para formalizar la reserva oficial de tu vehículo en Porsche Colombia.
                </p>

                {/* Financial Summary */}
                <div className="p-4 rounded-lg bg-[var(--pds-theme-background-surface)] space-y-1.5 text-xs mb-5 border border-[var(--pds-theme-border-subtle)]">
                  <div className="flex justify-between">
                    <span className="text-[var(--pds-theme-contrast-medium)]">Artículos en Reserva:</span>
                    <span className="font-bold">{cartList.length} vehículo(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--pds-theme-contrast-medium)]">Impuestos Incluidos:</span>
                    <span>IVA (19%)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[var(--pds-theme-border)] font-bold text-sm">
                    <span>Total a Pagar:</span>
                    <span className="font-porsche text-[#d5001c]">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="mb-4">
                  <label className="block text-[10px] uppercase tracking-pds-headline font-bold text-[var(--pds-theme-contrast-medium)] mb-2">
                    Método de Pago
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

                {/* Payment Fields */}
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
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] font-bold mb-1">
                          Vencimiento
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="MM/AA"
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
                      <div>
                        <label className="block text-[10px] uppercase text-[var(--pds-theme-contrast-medium)] font-bold mb-1">
                          Cuotas
                        </label>
                        <select
                          value={installments}
                          onChange={(e) => setInstallments(e.target.value)}
                          className="w-full p-2.5 text-xs rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] focus:outline-none focus:border-[#d5001c]"
                        >
                          <option value="1">1 Cuota</option>
                          <option value="6">6 Cuotas</option>
                          <option value="12">12 Cuotas</option>
                          <option value="24">24 Cuotas</option>
                          <option value="36">36 Cuotas</option>
                        </select>
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
                    Confirmar Pago de ${grandTotal.toLocaleString()}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutModalOpen(false)}
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
                  Validando fondos con la entidad bancaria y emitiendo certificado Porsche.
                </p>
              </div>
            )}

            {paymentStep === "success" && (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-porsche text-xl font-bold">¡Pago y Reserva Formalizada!</h3>
                <p className="text-xs text-[var(--pds-theme-contrast-medium)] mt-1 mb-6">
                  Se ha generado tu orden oficial con ID:{" "}
                  <strong className="font-mono text-[var(--pds-theme-contrast-high)]">{completedOrder?.orderId || "PORSCHE-RES"}</strong>
                </p>

                <div className="p-4 rounded-lg bg-[var(--pds-theme-background-surface)] text-left text-xs space-y-1.5 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[var(--pds-theme-contrast-medium)]">Código de Transacción:</span>
                    <span className="font-mono font-bold">{completedOrder?.txnId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--pds-theme-contrast-medium)]">Monto Total Pagado:</span>
                    <span className="font-porsche font-bold text-[#d5001c]">${grandTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--pds-theme-contrast-medium)]">Método de Pago:</span>
                    <span>{completedOrder?.paymentMethod || "Tarjeta de Crédito"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--pds-theme-contrast-medium)]">Estado de Orden:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Confirmado</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      setActiveTab("orders");
                    }}
                    className="pds-button-brand flex-1 text-center"
                  >
                    Ver en Historial de Pedidos
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutModalOpen(false)}
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
