/**
 * Textos de página. Los títulos aceptan *asteriscos* para marcar la palabra que va
 * en cursiva (se renderiza con <Emphasis>). Ningún componente lleva textos de marca:
 * todos llegan desde aquí o desde `src/config/site.ts`.
 */
import type { IconPoint } from "./types";

export type SectionCopy = {
  title: string;
  intro?: string;
  link?: { href: string; label: string };
};

export const home = {
  meta: {
    title: "Savia Spa · Masajes y faciales en Mazatlán",
    description:
      "Spa boutique en la Zona Costera de Mazatlán. Masajes desde $800, faciales, rituales corporales y experiencias para regalar. Reserva por WhatsApp.",
  },
  hero: {
    title: "Regálate un momento para *volver a ti*",
    subtitle:
      "Masajes, faciales y rituales corporales en un spa pequeño de la Zona Costera. Sesiones de 60 a 120 minutos, con tiempo para llegar y para irte sin prisa.",
    primaryCta: "Reservar cita",
    secondaryCta: { href: "/servicios", label: "Ver servicios" },
    chips: ["Zona Costera, Mazatlán", "Cita por WhatsApp", "Abierto los 7 días"],
  },
  services: {
    title: "Para *empezar*",
    intro:
      "Los cuatro tratamientos que más se reservan. Cada uno incluye entrevista previa y té en la zona de descanso.",
    link: { href: "/servicios", label: "Ver los 6 servicios" },
  } satisfies SectionCopy,
  why: {
    title: "Por qué *Savia*",
    intro:
      "Somos un spa chico a propósito: cuatro cabinas, un equipo fijo y agenda con espacio entre citas.",
    points: [
      {
        icon: "clock",
        title: "Tiempo real de tratamiento",
        text: "Si reservas 60 minutos, son 60 minutos en camilla. La llegada y el té corren por nuestra cuenta.",
      },
      {
        icon: "hand",
        title: "Un equipo que te conoce",
        text: "Tres terapeutas de planta, con certificación. Si vuelves, puedes pedir a la misma persona.",
      },
      {
        icon: "leaf",
        title: "Productos que nombramos",
        text: "Aceites vegetales, sal de mar y cosmética mexicana. Te decimos qué usamos y por qué.",
      },
      {
        icon: "sun",
        title: "Pensado para el clima costero",
        text: "Protocolos para piel con sol, salitre y humedad, no recetas importadas.",
      },
    ] satisfies IconPoint[],
  },
  experiences: {
    title: "Experiencias para *quedarse más*",
    intro:
      "Combinamos tratamientos y tiempo libre en una sola visita. Ideales para regalar o para celebrar.",
    link: { href: "/experiencias", label: "Ver experiencias" },
  } satisfies SectionCopy,
  gallery: {
    title: "Un vistazo *adentro*",
    intro: "Luz natural, madera, plantas y el sonido del mar a dos cuadras.",
    link: { href: "/galeria", label: "Ver galería" },
  } satisfies SectionCopy,
  testimonials: {
    title: "Lo que *nos cuentan*",
    intro: "Reseñas de personas que ya vinieron, con el tratamiento que tomaron.",
  } satisfies SectionCopy,
  faq: {
    title: "Antes de *venir*",
    intro: "Lo que más nos preguntan. Si tu duda no está aquí, escríbenos.",
    link: { href: "/contacto", label: "Ir a contacto" },
  } satisfies SectionCopy,
  finalCta: {
    title: "Tu próxima pausa empieza con *un mensaje*",
    text: "Escríbenos qué te gustaría y te respondemos con horarios disponibles. Sin formularios ni registros.",
    cta: "Reservar por WhatsApp",
  },
};

export const servicesPage = {
  meta: {
    title: "Servicios",
    description:
      "Masajes relajante y descontracturante, faciales, aromaterapia y ritual corporal en Mazatlán. Duraciones de 60 a 120 minutos y precios desde $800.",
  },
  title: "Servicios",
  intro:
    "Elige por tipo de tratamiento. Todos incluyen entrevista previa, ropa desechable, bata y té al terminar. Los precios son por persona, en pesos mexicanos.",
  filterLabel: "Filtrar por categoría",
  allLabel: "Todos",
  emptyLabel: "No hay servicios en esta categoría por ahora.",
};

export const serviceDetail = {
  includesTitle: "Qué incluye",
  benefitsTitle: "Beneficios",
  idealForTitle: "Ideal para",
  stepsTitle: "Cómo es tu sesión",
  precautionsTitle: "Antes de reservar",
  faqTitle: "Preguntas sobre este servicio",
  relatedTitle: "Te puede *interesar*",
  durationLabel: "Duración",
  bookingNote: "Confirmamos horario por WhatsApp. Pagas al terminar tu sesión.",
};

export const experiencesPage = {
  meta: {
    title: "Experiencias",
    description:
      "Paquetes de spa en Mazatlán: Día de spa de 4 horas, experiencia Para dos con masaje de 90 minutos y Ritual de novia. Ideales para regalar.",
  },
  title: "Experiencias",
  intro:
    "Paquetes que combinan varios tratamientos, pausas y algo rico de comer. Para celebrar, regalar o tomarte el día.",
  difference: {
    title: "¿Servicio o *experiencia*?",
    items: [
      {
        label: "Servicio individual",
        text: "Un tratamiento con hora de inicio y fin: un masaje, un facial o un ritual. Ideal si tienes una o dos horas libres.",
        link: { href: "/servicios", label: "Ver servicios" },
      },
      {
        label: "Experiencia",
        text: "Varios tratamientos encadenados, con tiempo libre en la zona de descanso entre uno y otro. Se reserva como una sola visita y tiene precio cerrado.",
      },
    ],
  },
  includesLabel: "Incluye",
  idealForLabel: "Ideal para",
  durationLabel: "Duración",
};

export const galleryPage = {
  meta: {
    title: "Galería",
    description:
      "Fotos de Savia Spa en Mazatlán: el espacio, las cabinas, la zona de descanso y los detalles de cada tratamiento.",
  },
  title: "Galería",
  intro: "El espacio, los tratamientos y los pequeños detalles. Toca cualquier foto para verla completa.",
  allLabel: "Todo",
  filterLabel: "Filtrar fotos",
  lightbox: {
    close: "Cerrar galería",
    previous: "Foto anterior",
    next: "Foto siguiente",
  },
};

export const aboutPage = {
  meta: {
    title: "Nosotros",
    description:
      "La historia de Savia Spa, un spa boutique en la Zona Costera de Mazatlán: nuestros valores, el equipo de terapeutas y el espacio.",
  },
  title: "Un refugio *a dos cuadras* del mar",
  intro:
    "Savia nació de una idea sencilla: que un buen masaje no debería sentirse como una línea de producción.",
  story: [
    "Lucía trabajó años en spas de hotel, donde cada tratamiento duraba lo que marcaba el reloj y la siguiente persona ya esperaba en la puerta. En 2019 abrió Savia en una casa de los años setenta en la Zona Costera, con solo dos cabinas.",
    "Hoy tenemos cuatro cabinas, una zona de descanso con alberca y un equipo de tres terapeutas. Seguimos dejando quince minutos entre cita y cita para que nadie te apresure, y seguimos usando productos que podemos nombrar y explicar.",
  ],
  valuesTitle: "Lo que *cuidamos*",
  values: [
    {
      icon: "clock",
      title: "Tiempo sin prisa",
      text: "Agendamos con margen entre citas. Llegas, te cambias con calma y te vas cuando estés lista o listo.",
    },
    {
      icon: "heart",
      title: "Trato cercano",
      text: "Te preguntamos antes de empezar y durante la sesión. Tú decides la presión, la música y el silencio.",
    },
    {
      icon: "sprout",
      title: "Ingredientes honestos",
      text: "Aceites vegetales, sal de mar y cosmética mexicana. Sin promesas milagro ni paquetes de productos.",
    },
  ] satisfies IconPoint[],
  teamTitle: "El *equipo*",
  teamIntro: "Tres terapeutas de planta. Si te gustó tu sesión, puedes pedir a la misma persona la próxima vez.",
  spaceTitle: "El *espacio*",
  spaceIntro: "Una casa costera adaptada con madera, luz natural y muchas plantas.",
};

export const contactPage = {
  meta: {
    title: "Contacto",
    description:
      "Dirección, horarios, teléfono y WhatsApp de Savia Spa en Av. del Mar 120, Zona Costera, Mazatlán. Abierto los 7 días.",
  },
  title: "Ven a *visitarnos*",
  intro: "Estamos en Av. del Mar, a dos cuadras de la playa. Reserva por WhatsApp y te confirmamos el horario en minutos.",
  hoursTitle: "Horarios",
  addressTitle: "Dirección",
  channelsTitle: "Escríbenos o llama",
  directionsCta: "Cómo llegar",
  mapTitle: "Mapa de ubicación de Savia Spa en Mazatlán",
  parking: "Estacionamiento gratuito para clientes sobre la lateral.",
  policyTitle: "Política de cancelación",
  policy: [
    "Puedes cambiar o cancelar tu cita sin costo hasta 24 horas antes.",
    "Con menos de 24 horas, o si no llegas, te pediremos un anticipo del 50% para tu siguiente reserva.",
    "Si llegas tarde, la sesión termina a la hora programada para respetar a la siguiente persona.",
  ],
  bookingTitle: "¿Lista o listo para *reservar*?",
  bookingText: "Cuéntanos qué servicio te interesa y en qué horario te queda mejor.",
};

export const notFoundPage = {
  title: "Esta página *se tomó el día*",
  text: "No encontramos lo que buscabas. Puede que el enlace haya cambiado.",
  cta: { href: "/", label: "Volver al inicio" },
};

export const ui = {
  skipLink: "Saltar al contenido",
  menuOpen: "Abrir menú",
  menuClose: "Cerrar menú",
  mainNav: "Navegación principal",
  footerNav: "Mapa del sitio",
  book: "Reservar",
  call: "Llamar",
  callAria: "Llamar a Savia Spa",
  viewDetail: "Ver detalle",
  from: "desde",
  carouselPrev: "Anterior",
  carouselNext: "Siguiente",
  goToSlide: "Ir a la tarjeta",
  breadcrumbLabel: "Ruta de navegación",
  breadcrumbHome: "Inicio",
  footerHours: "Horarios",
  footerContact: "Contacto",
  footerExplore: "Explora",
  newTab: "(se abre en una pestaña nueva)",
  rating: (n: number) => `${n} de 5 estrellas`,
};
