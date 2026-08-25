export const PORSCHE_COLORS = [
  {
    id: "guards-red",
    name: "Guards Red",
    hex: "#d5001c",
    type: "Solid",
    category: "Standard",
    imageUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&auto=format&fit=crop&q=85",
  },
  {
    id: "jet-black",
    name: "Jet Black Metallic",
    hex: "#0a0a0d",
    type: "Metallic",
    category: "Metallic",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=85",
  },
  {
    id: "carrara-white",
    name: "Carrara White Metallic",
    hex: "#f4f4f7",
    type: "Metallic",
    category: "Metallic",
    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&auto=format&fit=crop&q=85",
  },
  {
    id: "gentian-blue",
    name: "Gentian Blue Metallic",
    hex: "#1b3260",
    type: "Metallic",
    category: "Metallic",
    imageUrl: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1200&auto=format&fit=crop&q=85",
  },
  {
    id: "racing-yellow",
    name: "Racing Yellow",
    hex: "#f5bc18",
    type: "Solid",
    category: "Special",
    imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&auto=format&fit=crop&q=85",
  },
  {
    id: "gt-silver",
    name: "GT Silver Metallic",
    hex: "#8c929a",
    type: "Metallic",
    category: "Metallic",
    imageUrl: "https://images.unsplash.com/photo-1547038577-da80abbc4f19?w=1200&auto=format&fit=crop&q=85",
  },
  {
    id: "python-green",
    name: "Python Green",
    hex: "#127334",
    type: "Special",
    category: "Special",
    imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&auto=format&fit=crop&q=85",
  },
  {
    id: "crayon",
    name: "Crayon / Chalk",
    hex: "#c6c7c5",
    type: "Special",
    category: "Special",
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&auto=format&fit=crop&q=85",
  },
];

export const PORSCHE_WHEELS = [
  { id: "rs-spyder", name: '20/21" RS Spyder Design Wheels', price: 0, desc: "Aleación ultraligera con acabado titanio pulido" },
  { id: "carrera-classic", name: '20/21" Carrera Exclusive Design Wheels', price: 1850, desc: "Diseño aerodinámico de 5 radios dobles con detalles diamantados" },
  { id: "turbo-carbon", name: '20/21" Turbo S Carbon Aeroblade Wheels', price: 3400, desc: "Rines forjados con inserciones en fibra de carbono vista" },
];

export const PORSCHE_INTERIORS = [
  { id: "black-leather", name: "Interior de Cuero Negro Estándar", price: 0, desc: "Costuras de contraste en gris titanio y asientos deportivos" },
  { id: "bordeaux-black", name: "Cuero Bicolor Negro / Rojo Burdeos", price: 2950, desc: "Acabado artesanal en piel napa con escudo Porsche grabado" },
  { id: "race-tex-carbon", name: "Paquete GTS Race-Tex & Fibra de Carbono", price: 4200, desc: "Alcantara de alta adherencia con molduras interiores en carbono mate" },
];

// Helper to provide realistic technical performance specifications for any vehicle item
export const getVehicleSpecs = (product = {}) => {
  const name = product?.name?.toLowerCase() || "";
  const type = product?.type?.toLowerCase() || "";

  if (name.includes("sport") || name.includes("coupé") || type === "sport") {
    return {
      powerCV: 650,
      powerKW: 478,
      accel0100: "2.7 s",
      topSpeed: "330 km/h",
      maxTorque: "800 Nm",
      engine: "3.8L Boxer 6 Biturbo",
      transmission: "PDK de 8 velocidades",
      drivetrain: "Tracción Total Inteligente (PTM)",
      consumption: "12.0 l/100 km",
      co2: "272 g/km",
    };
  }

  if (name.includes("suv") || type === "suv") {
    return {
      powerCV: 550,
      powerKW: 404,
      accel0100: "3.9 s",
      topSpeed: "286 km/h",
      maxTorque: "770 Nm",
      engine: "4.0L V8 Twin-Turbo",
      transmission: "Tiptronic S de 8 velocidades",
      drivetrain: "Tracción en las 4 ruedas con PTM",
      consumption: "11.6 l/100 km",
      co2: "264 g/km",
    };
  }

  if (name.includes("sedan") || type === "sedan") {
    return {
      powerCV: 500,
      powerKW: 368,
      accel0100: "3.1 s",
      topSpeed: "315 km/h",
      maxTorque: "750 Nm",
      engine: "V8 Biturbo Híbrido Enchufable",
      transmission: "PDK de 8 velocidades",
      drivetrain: "Tracción Total Activa",
      consumption: "2.8 l/100 km (Híbrido)",
      co2: "64 g/km",
    };
  }

  if (name.includes("truck") || type === "truck") {
    return {
      powerCV: 480,
      powerKW: 353,
      accel0100: "4.5 s",
      topSpeed: "250 km/h",
      maxTorque: "850 Nm",
      engine: "V6 High-Output Turbo Diésel / Gas",
      transmission: "Automática Heavy-Duty 10 velocidades",
      drivetrain: "4x4 con bloqueo de diferencial",
      consumption: "10.5 l/100 km",
      co2: "240 g/km",
    };
  }

  return {
    powerCV: 450,
    powerKW: 331,
    accel0100: "3.4 s",
    topSpeed: "305 km/h",
    maxTorque: "530 Nm",
    engine: "3.0L Boxer 6 Turbo",
    transmission: "PDK de 8 velocidades",
    drivetrain: "Propulsión Trasera con PTV Plus",
    consumption: "10.2 l/100 km",
    co2: "233 g/km",
  };
};
