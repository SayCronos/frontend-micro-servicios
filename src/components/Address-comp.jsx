import React from "react";
import { MapPin, Trash2, Check } from "lucide-react";

export const AddressComponent = ({ address }) => {
  const addressCard = ({ street, postalCode, city, country }, key) => (
    <div
      key={key}
      className="min-w-[260px] pds-card p-5 rounded-lg flex flex-col justify-between gap-4"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-[#d5001c]/10 text-[#d5001c] rounded-full px-2.5 py-0.5">
            <Check size={10} /> Principal
          </span>
          <MapPin size={15} className="text-[var(--pds-theme-contrast-medium)]" />
        </div>
        <p className="font-bold text-sm text-[var(--pds-theme-contrast-high)]">
          {street}
        </p>
        <p className="text-xs text-[var(--pds-theme-contrast-medium)] mt-1 font-light">
          {postalCode}, {city}, {country}
        </p>
      </div>

      <div className="flex justify-end pt-2 border-t border-[var(--pds-theme-border-subtle)]">
        <button
          type="button"
          className="p-1.5 rounded text-[var(--pds-theme-contrast-medium)] hover:text-[#d5001c] transition-colors cursor-pointer"
          title="Eliminar dirección"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );

  const listOfAddress = () => {
    if (Array.isArray(address) && address.length > 0) {
      return address.map((item, i) => addressCard(item, i));
    }
    return (
      <p className="text-xs text-[var(--pds-theme-contrast-medium)] py-2 font-light">
        No hay direcciones registradas. Agrega una dirección para la entrega de vehículos y servicios.
      </p>
    );
  };

  return (
    <div className="flex flex-row flex-nowrap gap-4 overflow-x-auto pb-2 scrollbar-none">
      {listOfAddress()}
    </div>
  );
};
