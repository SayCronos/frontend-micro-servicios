import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, Shield, User, Lock, Mail, Phone } from "lucide-react";
import { Profile } from "./Profile";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { onLogin, onSignup, onClearAuthError } from "../store/actions";

export const Login = () => {
  const { user, authPending, authError } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { token } = user || {};

  const [isSignup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");

  const switchMode = (signup) => {
    setSignup(signup);
    if (authError) dispatch(onClearAuthError());
  };

  const clearErrorOnEdit = () => {
    if (authError) dispatch(onClearAuthError());
  };

  const userSignup = (e) => {
    e.preventDefault();
    dispatch(
      onSignup({
        email: signupEmail,
        password: signupPassword,
        phone: signupPhone,
      })
    );
  };

  const userLogin = (e) => {
    e.preventDefault();
    dispatch(onLogin({ email, password }));
  };

  if (token) {
    return <Profile />;
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] text-xs text-[var(--pds-theme-contrast-high)] placeholder-[var(--pds-theme-contrast-medium)] focus:outline-none focus:border-[#d5001c] focus:ring-1 focus:ring-[#d5001c] transition-all";

  return (
    <div className="min-h-screen bg-[var(--pds-theme-background-base)] text-[var(--pds-theme-contrast-high)] flex flex-col items-center justify-center p-4 sm:p-6 pt-28 pb-16 transition-colors">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)] hover:text-[#d5001c] transition-colors mb-6"
        >
          <ArrowLeft size={13} />
          <span>Volver al Inicio</span>
        </Link>

        {/* PDS Auth Card */}
        <div className="pds-card rounded-xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-8 h-8 rounded-sm bg-[#d5001c] flex items-center justify-center text-white font-bold text-xs mx-auto mb-3 shadow-sm">
              P
            </div>
            <h1 className="font-porsche text-lg font-bold tracking-pds-headline text-[var(--pds-theme-contrast-high)]">
              MI GARAJE PORSCHE
            </h1>
            <p className="text-xs text-[var(--pds-theme-contrast-medium)] mt-1 font-light">
              {isSignup
                ? "Crea tu cuenta para guardar configuraciones y gestionar pedidos."
                : "Inicia sesión para consultar tus vehículos configurados y reservas."}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex p-1 rounded-full bg-[var(--pds-theme-background-surface)] border border-[var(--pds-theme-border)] mb-6">
            <button
              type="button"
              onClick={() => switchMode(false)}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                !isSignup
                  ? "bg-[var(--pds-theme-primary)] text-[var(--pds-theme-background-base)] shadow-sm"
                  : "text-[var(--pds-theme-contrast-medium)] hover:text-[var(--pds-theme-contrast-high)]"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => switchMode(true)}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                isSignup
                  ? "bg-[var(--pds-theme-primary)] text-[var(--pds-theme-background-base)] shadow-sm"
                  : "text-[var(--pds-theme-contrast-medium)] hover:text-[var(--pds-theme-contrast-high)]"
              }`}
            >
              Crear Cuenta
            </button>
          </div>

          {/* Error Banner */}
          {authError && (
            <div className="flex items-start gap-2.5 mb-5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {!isSignup ? (
            <form onSubmit={userLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)] font-bold mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="cliente@porsche.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearErrorOnEdit();
                  }}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)] font-bold mb-1.5">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearErrorOnEdit();
                  }}
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={authPending}
                className="pds-button-primary w-full !py-3.5 mt-2"
              >
                {authPending ? "Verificando..." : "Acceder a Mi Garaje"}
              </button>
            </form>
          ) : (
            <form onSubmit={userSignup} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)] font-bold mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="nuevo.propietario@porsche.com"
                  value={signupEmail}
                  onChange={(e) => {
                    setSignupEmail(e.target.value);
                    clearErrorOnEdit();
                  }}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)] font-bold mb-1.5">
                  Contraseña (mínimo 6 caracteres)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => {
                    setSignupPassword(e.target.value);
                    clearErrorOnEdit();
                  }}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-pds-headline text-[var(--pds-theme-contrast-medium)] font-bold mb-1.5">
                  Teléfono de Contacto
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+57 300 123 4567"
                  value={signupPhone}
                  onChange={(e) => {
                    setSignupPhone(e.target.value);
                    clearErrorOnEdit();
                  }}
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={authPending}
                className="pds-button-brand w-full !py-3.5 mt-2"
              >
                {authPending ? "Registrando..." : "Completar Registro Porsche"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
