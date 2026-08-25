import React from "react";
import { CheckCircle2, Eye, PackageCheck } from "lucide-react";

export const OrderItem = ({ item, onTapViewMore }) => {
  const { _id, orderId, amount, status = "Confirmado", createdAt } = item || {};

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Reserva Porsche Oficial";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 mb-4 rounded-lg pds-card">
      <div className="flex items-start sm:items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-1 sm:mt-0">
          <PackageCheck size={18} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[var(--pds-theme-contrast-medium)]">
              ID: {orderId || _id?.slice(-8).toUpperCase()}
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={10} />
              {status}
            </span>
          </div>
          <p className="font-porsche text-lg font-bold text-[var(--pds-theme-contrast-high)] mt-0.5">
            ${amount?.toLocaleString()}
          </p>
          <span className="text-xs text-[var(--pds-theme-contrast-medium)]">{formattedDate}</span>
        </div>
      </div>

      <button
        type="button"
        className="pds-button-secondary text-xs !py-2 !px-4 self-end sm:self-center"
        onClick={() => onTapViewMore(_id)}
      >
        <Eye size={13} />
        <span>Ficha de Pedido</span>
      </button>
    </div>
  );
};
