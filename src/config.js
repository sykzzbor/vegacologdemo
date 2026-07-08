// ============================================================
// Configuración general del sitio — editar acá los datos reales
// ============================================================

// Número de WhatsApp del negocio (formato internacional, sin "+")
export const WHATSAPP_NUMBER = "5493525530216"

export const BUSINESS_NAME = "Vegacolor Pinturerías";

export const INSTAGRAM_URL = "https://www.instagram.com/vegacolorpinturerias/";

export const BRANCHES = [
  {
    id: "jesus-maria",
    name: "Jesús María",
    image: "/sucursales/jesus-maria",
    address: "Pedro J. Frías esq. Bv. Agüero",
    city: "Jesús María, Córdoba",
    hours: [
      { days: "Lunes a viernes", time: "8:00 a 19:00" },
      { days: "Sábados", time: "8:00 a 12:30" },
    ],
    mapsQuery: "Pedro J. Frías esq. Bv. Agüero, Jesús María, Córdoba",
  },
  {
    id: "colonia-caroya",
    name: "Colonia Caroya",
    image: "/sucursales/colonia-caroya",
    address: "Don Bosco 3182",
    city: "Colonia Caroya, Córdoba",
    hours: [
      { days: "Lunes a viernes", time: "8:00 a 12:30 y 15:30 a 19:30" },
      { days: "Sábados", time: "8:00 a 12:30" },
    ],
    mapsQuery: "Don Bosco 3182, Colonia Caroya, Córdoba",
  },
  {
    id: "colonia-tirolesa",
    name: "Colonia Tirolesa",
    image: "/sucursales/colonia-tirolesa",
    address: "Pte. Arturo Illia Sur 2060, Ruta A74",
    city: "Colonia Tirolesa, Córdoba",
    hours: [
      { days: "Lunes a viernes", time: "8:00 a 12:30 y 15:00 a 19:00" },
      { days: "Sábados", time: "8:00 a 12:30" },
    ],
    mapsQuery: "Pte. Arturo Illia Sur 2060, Colonia Tirolesa, Córdoba",
  },
];

export function mapsUrl(branch) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapsQuery)}`;
}

export const formatPrice = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
