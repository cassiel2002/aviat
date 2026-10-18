export interface ServicioItem {
  titulo: string;
  descripcion: string;
}

export interface MiembroEquipo {
  nombre: string;
  especialidad: string;
  foto?: string;
}

export interface GaleriaItem {
  src: string;
  alt: string;
  titulo: string;
  texto: string;
}

export interface AreaServicio {
  titulo: string;
  descripcion: string;
  items: string[];
}

export interface AviatConfig {
  nombre: string;
  razonSocial: string;
  subtitulo: string;
  lema: string;
  direccion: string;
  ciudad: string;
  cuit: string;
  whatsapp: string;
  telefonos: string[];
  horario: string;
  email: string;
  webAsociada: string;
  img: {
    fachada: string;
    consultorio: string;
    ascensor: string;
    pasillo: string;
  };
  galeria: GaleriaItem[];
  equipo: MiembroEquipo[];
  servicios: ServicioItem[];
  especialidades: string[];
  areas: AreaServicio[];
}

/** Imágenes reales de la clínica alojadas en Cloudinary. */
const CLOUDINARY = {
  fachada:
    "https://res.cloudinary.com/dupkltqnw/image/upload/v1790829446/WhatsApp_Image_2026-09-30_at_11.41.01_PM_5_ck5wvp.jpg",
  pasillo:
    "https://res.cloudinary.com/dupkltqnw/image/upload/v1790829446/WhatsApp_Image_2026-09-30_at_11.41.01_PM_y3wsxs.jpg",
  ascensor:
    "https://res.cloudinary.com/dupkltqnw/image/upload/v1790829445/WhatsApp_Image_2026-09-30_at_11.40.50_PM_nrsu0i.jpg",
  dormitorio:
    "https://res.cloudinary.com/dupkltqnw/image/upload/v1790829447/WhatsApp_Image_2026-09-30_at_11.41.01_PM_4_ubx5wx.jpg",
  piezaAfuera:
    "https://res.cloudinary.com/dupkltqnw/image/upload/v1790829446/WhatsApp_Image_2026-09-30_at_11.41.01_PM_2_ooznkq.jpg",
  dosCamas:
    "https://res.cloudinary.com/dupkltqnw/image/upload/v1790829445/WhatsApp_Image_2026-09-30_at_11.41.01_PM_1_rs0d3g.jpg",
  teleePieza:
    "https://res.cloudinary.com/dupkltqnw/image/upload/v1790829445/WhatsApp_Image_2026-09-30_at_11.40.55_PM_m7nd4n.jpg",
  piezaLarga:
    "https://res.cloudinary.com/dupkltqnw/image/upload/v1790829445/WhatsApp_Image_2026-09-30_at_11.41.00_PM_ygcqgf.jpg",
} as const;

export const CONFIG: AviatConfig = {
  nombre: "Aviat",
  razonSocial: "AVIAT S.R.L.",
  subtitulo: "Centro Quirúrgico y de Medicina Ambulatoria",
  lema: "Cuidamos lo que más importa: Vos.",
  direccion: "Benjamín de la Vega 21",
  ciudad: "La Rioja, Argentina",
  cuit: "30-71098454-5",
  whatsapp: "5493804462892", // 0380 446-2892 en formato internacional
  telefonos: ["0380 446-2892", "0380 442-6868"],
  horario: "Lunes a viernes, 07:00 a 21:00",
  email: "contacto@clinicaaviat.com.ar",
  webAsociada: "clinicaaviat.com.ar",
  img: {
    fachada: CLOUDINARY.fachada,
    consultorio: CLOUDINARY.dormitorio,
    ascensor: CLOUDINARY.ascensor,
    pasillo: CLOUDINARY.pasillo,
  },
  // Galería de instalaciones (menú desplegable estilo acordeón).
  galeria: [
    {
      src: CLOUDINARY.piezaAfuera,
      alt: "Habitación de internación de Aviat vista desde el acceso",
      titulo: "Habitaciones de internación",
      texto:
        "Espacios individuales, luminosos y preparados para una recuperación tranquila.",
    },
    {
      src: CLOUDINARY.dosCamas,
      alt: "Habitación doble con dos camas",
      titulo: "Habitaciones compartidas",
      texto:
        "Confort y privacidad también en las habitaciones de más de una cama.",
    },
    {
      src: CLOUDINARY.teleePieza,
      alt: "Habitación equipada con televisor",
      titulo: "Comodidades para el paciente",
      texto:
        "Cada habitación cuenta con el equipamiento necesario para una estadía cómoda.",
    },
    {
      src: CLOUDINARY.piezaLarga,
      alt: "Vista amplia de una habitación de Aviat",
      titulo: "Ambientes amplios",
      texto: "Diseñamos cada ambiente pensando en el descanso y la calma.",
    },
    {
      src: CLOUDINARY.pasillo,
      alt: "Pasillo de circulación de la clínica",
      titulo: "Circulaciones",
      texto: "Pasillos amplios y señalizados, fáciles de recorrer.",
    },
    {
      src: CLOUDINARY.ascensor,
      alt: "Ascensor de la clínica",
      titulo: "Accesibilidad",
      texto: "Acceso por ascensor a todos los niveles del centro.",
    },
  ],
  // Equipo médico: si queda vacío, la sección se oculta.
  equipo: [],
  // Pilares principales de la clínica (cards destacadas).
  servicios: [
    {
      titulo: "Centro quirúrgico",
      descripcion:
        "Quirófanos equipados para cirugía general, traumatológica, cardiovascular, plástica, oftalmológica y más.",
    },
    {
      titulo: "Medicina ambulatoria",
      descripcion:
        "Consultas, controles y procedimientos con ingreso y alta en el mismo día.",
    },
    {
      titulo: "Internación",
      descripcion:
        "Habitaciones preparadas para una recuperación tranquila, con cobertura de las principales obras sociales.",
    },
    {
      titulo: "Traumatología y Ortopedia",
      descripcion:
        "Artroscopías, prótesis de cadera y rodilla, lesiones de miembro superior y mano, punciones y PRP.",
    },
    {
      titulo: "Atención de pacientes quemados",
      descripcion:
        "Evaluación inicial, tratamiento y seguimiento personalizado por un equipo especializado.",
    },
    {
      titulo: "Diagnóstico por imágenes",
      descripcion:
        "Ecografía, ecodoppler, laboratorio y anatomía patológica para un diagnóstico completo.",
    },
  ],
  // Especialidades médicas asociadas (nómina pública; verificar vigencia).
  especialidades: [
    "Traumatología y Ortopedia",
    "Cirugía General",
    "Cirugía Cardiovascular",
    "Cirugía de Cabeza, Cara y Cuello",
    "Cirugía Maxilofacial",
    "Cirugía Plástica",
    "Oftalmología",
    "Otorrinolaringología",
    "Urología",
    "Cardiología",
    "Clínica Médica",
    "Dermatología",
    "Diabetología",
    "Nutrición",
    "Hematología",
    "Neurología",
    "Psicología",
    "Fisiatría",
    "Medicina Laboral",
  ],
  // Áreas con detalle (para la página de servicios).
  areas: [
    {
      titulo: "Cirugía",
      descripcion:
        "Centro quirúrgico de medicina ambulatoria con múltiples especialidades.",
      items: [
        "Cirugía General",
        "Cirugía Cardiovascular",
        "Cirugía de Cabeza y Cuello",
        "Cirugía Maxilofacial",
        "Cirugía Plástica",
        "Cirugía Traumatológica",
        "Cirugía Oftalmológica",
        "Urología",
      ],
    },
    {
      titulo: "Traumatología y Ortopedia",
      descripcion:
        "Atención integral de patologías del aparato locomotor.",
      items: [
        "Artroscopías",
        "Prótesis de cadera y rodilla",
        "Patologías de rodilla y cadera",
        "Lesiones de miembro superior y mano",
        "Punciones articulares",
        "Plasma Rico en Plaquetas (PRP)",
      ],
    },
    {
      titulo: "Diagnóstico y estudios",
      descripcion:
        "Estudios complementarios para acompañar cada tratamiento.",
      items: [
        "Diagnóstico por imágenes",
        "Ecografía y ecodoppler",
        "Laboratorio",
        "Anatomía patológica",
      ],
    },
  ],
};

/** Obras sociales y prepagas con las que la clínica trabaja (según cartillas públicas). */
export const obrasSociales = [
  "OSDE",
  "OSPIP",
  "OSPL",
  "Nobis",
  "Boreal",
];

export const mapsQuery = encodeURIComponent(
  `${CONFIG.direccion}, ${CONFIG.ciudad}`
);

export const whatsappBaseUrl = `https://wa.me/${CONFIG.whatsapp}`;

export interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

/** Estructura de navegación por rutas. Los items con `children` se muestran como dropdown. */
export const navItems: NavItem[] = [
  { href: "/", label: "Inicio" },
  {
    href: "/la-clinica",
    label: "La clínica",
    children: [
      { href: "/la-clinica", label: "Sobre nosotros" },
      { href: "/la-clinica#instalaciones", label: "Instalaciones" },
      { href: "/ubicacion", label: "Ubicación" },
    ],
  },
  { href: "/servicios", label: "Servicios" },
  { href: "/ubicacion", label: "Ubicación" },
];
