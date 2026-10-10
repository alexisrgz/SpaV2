import type { Service, ServiceCategory } from "./types";

export const serviceCategories: ReadonlyArray<{ id: ServiceCategory; label: string }> = [
  { id: "masajes", label: "Masajes" },
  { id: "faciales", label: "Faciales" },
  { id: "corporales", label: "Corporales" },
  { id: "bienestar", label: "Bienestar" },
];

export const services: readonly Service[] = [
  {
    slug: "masaje-relajante",
    name: "Masaje relajante",
    category: "masajes",
    image: "svc-masaje-relajante",
    featured: true,
    summary: "Presión suave a media con aceite tibio para bajar el ritmo de todo el cuerpo.",
    description:
      "Un masaje de cuerpo completo con movimientos largos y envolventes, aceite tibio y presión suave a media. Es la mejor puerta de entrada si es tu primera vez en un spa o si lo que buscas es desconectarte, dormir mejor esa noche y salir sin prisa.",
    variants: [
      { id: "60", minutes: 60, price: 850 },
      { id: "90", minutes: 90, price: 1150 },
    ],
    includes: [
      "Breve entrevista para ajustar presión y zonas de enfoque",
      "Masaje de cuerpo completo con aceite vegetal tibio",
      "Compresas calientes en espalda y pies",
      "Té de la casa en la zona de descanso al terminar",
    ],
    benefits: [
      "Ayuda a liberar la tensión acumulada del día",
      "Favorece una sensación de calma y un mejor descanso",
      "Te da un espacio sin pantallas ni pendientes",
    ],
    idealFor: [
      "Tu primera visita a un spa",
      "Semanas de estrés o poco descanso",
      "Regalar a alguien que no sabe qué elegir",
    ],
    steps: [
      { title: "Llegada", text: "Te recibimos con agua o té y llenas una ficha breve de salud." },
      { title: "Ajuste", text: "Tu terapeuta te pregunta cómo te sientes y qué presión prefieres." },
      { title: "Masaje", text: "Trabajamos espalda, piernas, brazos, cuello y cuero cabelludo." },
      { title: "Pausa", text: "Te quedas unos minutos en la zona de descanso antes de salir." },
    ],
    precautions:
      "Si tienes fiebre, una lesión reciente, várices marcadas o estás embarazada, avísanos al reservar para adaptar la sesión o sugerirte otra opción.",
    faqs: [
      {
        question: "¿Qué diferencia hay entre 60 y 90 minutos?",
        answer:
          "En 60 minutos cubrimos todo el cuerpo con un ritmo tranquilo. Con 90 minutos hay tiempo extra para cuello, hombros y pies, y el cierre es más pausado.",
      },
      {
        question: "¿Tengo que quitarme toda la ropa?",
        answer:
          "Solo lo que te haga sentir cómodo. Te damos ropa interior desechable y siempre estás cubierto con sábana, salvo la zona que se trabaja.",
      },
    ],
    related: ["masaje-descontracturante", "aromaterapia", "ritual-corporal"],
  },
  {
    slug: "masaje-descontracturante",
    name: "Masaje descontracturante",
    category: "masajes",
    image: "svc-masaje-descontracturante",
    featured: true,
    summary: "Presión firme en espalda, cuello y hombros para soltar nudos y rigidez.",
    description:
      "Un masaje de presión firme y ritmo más lento, enfocado en las zonas donde se acumula la tensión: espalda alta, cuello, hombros y zona lumbar. Combinamos amasamiento profundo, presión sostenida y estiramientos suaves. Es intenso, pero nunca debe doler: tú marcas el límite.",
    variants: [
      { id: "60", minutes: 60, price: 950 },
      { id: "90", minutes: 90, price: 1300 },
    ],
    includes: [
      "Evaluación rápida de zonas con tensión",
      "Trabajo profundo en espalda, cuello y hombros",
      "Estiramientos asistidos de cuello y brazos",
      "Compresa caliente para cerrar la sesión",
    ],
    benefits: [
      "Ayuda a soltar la rigidez por postura o trabajo frente a pantalla",
      "Mejora la sensación de movilidad en cuello y hombros",
      "Complementa tu rutina de ejercicio o entrenamiento",
    ],
    idealFor: [
      "Horas de escritorio o de manejo",
      "Después de entrenar o de un viaje largo",
      "Quien prefiere presión firme",
    ],
    steps: [
      { title: "Llegada", text: "Llenas una ficha breve y nos cuentas dónde sientes más tensión." },
      { title: "Calentamiento", text: "Preparamos el músculo con calor y movimientos amplios." },
      { title: "Trabajo profundo", text: "Presión firme y sostenida en las zonas acordadas." },
      { title: "Estiramiento y pausa", text: "Estiramientos suaves y unos minutos de descanso con té." },
    ],
    precautions:
      "No trabajamos sobre lesiones recientes, inflamación o dolor agudo. Si estás en tratamiento médico o fisioterapia, consúltalo antes con tu especialista.",
    faqs: [
      {
        question: "¿Me va a doler?",
        answer:
          "Sentirás presión intensa en algunos puntos, pero no debe doler. Durante la sesión te preguntamos cómo vas y ajustamos al momento.",
      },
      {
        question: "¿Puedo sentirme adolorido al día siguiente?",
        answer:
          "Es normal sentir los músculos trabajados uno o dos días. Toma agua, muévete suave y evita entrenar fuerte ese mismo día.",
      },
    ],
    related: ["masaje-relajante", "ritual-corporal", "aromaterapia"],
  },
  {
    slug: "facial-hidratante",
    name: "Facial hidratante",
    category: "faciales",
    image: "svc-facial-hidratante",
    featured: true,
    summary: "Limpieza profunda y mascarilla hidratante para piel expuesta a sol y salitre.",
    description:
      "Un facial pensado para el clima de Mazatlán: sol, humedad y salitre. Limpiamos a profundidad, exfoliamos con suavidad y aplicamos una mascarilla hidratante mientras recibes un masaje de manos y cuero cabelludo. Sales con la piel cómoda, fresca y sin sensación grasosa.",
    variants: [{ id: "60", minutes: 60, price: 950 }],
    includes: [
      "Diagnóstico de piel con lupa",
      "Doble limpieza y exfoliación enzimática suave",
      "Extracciones solo si tu piel lo necesita",
      "Mascarilla hidratante y masaje facial",
      "Protector solar al terminar",
    ],
    benefits: [
      "Deja la piel más suave y con sensación de hidratación",
      "Ayuda a recuperar el confort después de días de playa",
      "Te llevas recomendaciones para tu rutina en casa",
    ],
    idealFor: [
      "Piel seca, tirante o deshidratada",
      "Después de vacaciones o días de sol",
      "Tu primer facial",
    ],
    steps: [
      { title: "Diagnóstico", text: "Revisamos tu piel y platicamos sobre tu rutina actual." },
      { title: "Limpieza", text: "Doble limpieza, vapor tibio y exfoliación suave." },
      { title: "Hidratación", text: "Mascarilla y masaje facial; mientras actúa, masaje de manos." },
      { title: "Cierre", text: "Sérum, crema y protector solar, más tus recomendaciones." },
    ],
    precautions:
      "Si usas retinoides, ácidos o tienes algún tratamiento dermatológico activo, cuéntanos al reservar. No realizamos faciales sobre piel quemada por el sol o con heridas abiertas.",
    faqs: [
      {
        question: "¿Puedo maquillarme después?",
        answer:
          "Te recomendamos esperar unas horas para que la piel aproveche la hidratación. Si tienes un evento, mejor agenda el facial uno o dos días antes.",
      },
      {
        question: "¿Sirve si tengo piel grasa?",
        answer:
          "Sí. La piel grasa también se deshidrata; ajustamos productos y texturas para que no quede pesada.",
      },
    ],
    related: ["facial-luminosidad", "aromaterapia", "masaje-relajante"],
  },
  {
    slug: "facial-luminosidad",
    name: "Facial luminosidad",
    category: "faciales",
    image: "svc-facial-luminosidad",
    summary: "Exfoliación y activos antioxidantes para una piel de aspecto uniforme y luminoso.",
    description:
      "Un facial más completo para cuando quieres ver tu piel con más luz: combinamos exfoliación, un tratamiento con vitamina C y un masaje facial de drenaje que ayuda a desinflamar. Dura 75 minutos porque cada paso necesita su tiempo.",
    variants: [{ id: "75", minutes: 75, price: 1250 }],
    includes: [
      "Diagnóstico de piel y doble limpieza",
      "Exfoliación con ácidos suaves según tu tipo de piel",
      "Tratamiento con vitamina C y antioxidantes",
      "Masaje facial de drenaje",
      "Mascarilla calmante y protector solar",
    ],
    benefits: [
      "Aporta un aspecto más uniforme y luminoso",
      "Ayuda a que la piel se vea descansada",
      "Prepara la piel antes de un evento",
    ],
    idealFor: [
      "Piel opaca o con tono disparejo",
      "Antes de una boda, sesión de fotos o viaje",
      "Quien ya tiene rutina y quiere un extra",
    ],
    steps: [
      { title: "Diagnóstico", text: "Elegimos la concentración de activos según tu piel." },
      { title: "Renovación", text: "Limpieza, exfoliación y aplicación de ácidos suaves." },
      { title: "Tratamiento", text: "Vitamina C, masaje de drenaje y mascarilla calmante." },
      { title: "Cierre", text: "Protector solar y cuidados para los próximos tres días." },
    ],
    precautions:
      "Evita exponerte al sol directo 48 horas después. No es recomendable si tienes la piel sensibilizada, irritada o en tratamiento con isotretinoína; en ese caso te sugerimos el facial hidratante.",
    faqs: [
      {
        question: "¿Con cuánta anticipación lo agendo antes de un evento?",
        answer:
          "Lo ideal es entre tres y siete días antes, para que la piel esté tranquila y luminosa el gran día.",
      },
      {
        question: "¿Voy a quedar roja?",
        answer:
          "Puede haber un rubor leve que baja en pocas horas. Ajustamos la intensidad a tu piel para evitar irritación.",
      },
    ],
    related: ["facial-hidratante", "ritual-corporal", "aromaterapia"],
  },
  {
    slug: "aromaterapia",
    name: "Masaje con aromaterapia",
    category: "bienestar",
    image: "svc-aromaterapia",
    summary: "Masaje suave con aceites esenciales que eliges según cómo quieres sentirte.",
    description:
      "Antes de empezar hueles tres mezclas de aceites esenciales y eliges la que más te guste: una para relajarte, una para despejarte y una para equilibrar. Con esa mezcla hacemos un masaje suave y rítmico, con respiraciones guiadas al inicio y al final.",
    variants: [
      { id: "60", minutes: 60, price: 800 },
      { id: "90", minutes: 90, price: 1100 },
    ],
    includes: [
      "Elección de mezcla: lavanda, eucalipto-menta o cítricos",
      "Respiración guiada de inicio y cierre",
      "Masaje suave de cuerpo completo",
      "Mini frasco de tu mezcla para llevar a casa",
    ],
    benefits: [
      "Te ayuda a bajar revoluciones y respirar más lento",
      "Crea un momento sensorial completo: aroma, tacto y silencio",
      "Te llevas el aroma para repetir la calma en casa",
    ],
    idealFor: [
      "Mente acelerada o días de mucha carga",
      "Quien prefiere presión suave",
      "Un regalo con detalle para llevar",
    ],
    steps: [
      { title: "Elección", text: "Hueles tres mezclas y eliges la que te haga sentir mejor." },
      { title: "Respiración", text: "Tres minutos de respiración guiada para llegar al momento." },
      { title: "Masaje", text: "Movimientos suaves y rítmicos con tu mezcla de aceites." },
      { title: "Cierre", text: "Respiración final, té y tu frasco para llevar." },
    ],
    precautions:
      "Algunos aceites esenciales no se recomiendan durante el embarazo, la lactancia o con asma. Avísanos al reservar y usamos una mezcla neutra.",
    faqs: [
      {
        question: "¿El aroma es muy intenso?",
        answer:
          "No. Diluimos los aceites para que el aroma sea agradable y no invada. Si prefieres algo más tenue, lo ajustamos.",
      },
      {
        question: "¿Puedo elegir otro aceite?",
        answer:
          "Trabajamos con tres mezclas de la casa. Si tienes una preferencia o alergia, escríbenos y vemos qué opción te queda mejor.",
      },
    ],
    related: ["masaje-relajante", "facial-hidratante", "ritual-corporal"],
  },
  {
    slug: "ritual-corporal",
    name: "Ritual corporal",
    category: "corporales",
    image: "svc-ritual-corporal",
    featured: true,
    summary: "Exfoliación de sal, envoltura nutritiva y masaje: dos horas de cuidado completo.",
    description:
      "Nuestro tratamiento más completo para el cuerpo. Empezamos con una exfoliación de sal de mar y aceites, seguimos con una envoltura nutritiva mientras recibes masaje de cuero cabelludo, y cerramos con un masaje relajante de 45 minutos. Sales con la piel muy suave y la sensación de haber tenido un día libre.",
    variants: [{ id: "120", minutes: 120, price: 1700 }],
    includes: [
      "Exfoliación corporal con sal de mar y aceites",
      "Ducha tibia en cabina",
      "Envoltura nutritiva con manteca de karité",
      "Masaje de cuero cabelludo durante la envoltura",
      "Masaje relajante de 45 minutos",
      "Té y fruta en la zona de descanso",
    ],
    benefits: [
      "Deja la piel suave, renovada y con sensación de nutrición",
      "Combina en una sola visita exfoliación, envoltura y masaje",
      "Es un buen cierre después de días de sol y playa",
    ],
    idealFor: [
      "Antes de un viaje, boda o vacaciones",
      "Piel reseca por sol o aire acondicionado",
      "Darte un día completo sin salir de la ciudad",
    ],
    steps: [
      { title: "Exfoliación", text: "Sal de mar y aceites en movimientos circulares por todo el cuerpo." },
      { title: "Ducha", text: "Retiras el exfoliante en la regadera de la cabina." },
      { title: "Envoltura", text: "Manteca nutritiva y masaje de cuero cabelludo mientras actúa." },
      { title: "Masaje", text: "Cuarenta y cinco minutos de masaje relajante para cerrar." },
    ],
    precautions:
      "No es recomendable con piel quemada por el sol, depilación o rasurado de menos de 24 horas, heridas abiertas o embarazo. Si tienes dudas, escríbenos antes de reservar.",
    faqs: [
      {
        question: "¿Necesito llevar traje de baño?",
        answer:
          "No es necesario. Te damos ropa interior desechable, bata y sandalias.",
      },
      {
        question: "¿Me puedo depilar antes?",
        answer:
          "Mejor depílate o rasúrate al menos 48 horas antes para que la exfoliación no irrite la piel.",
      },
    ],
    related: ["masaje-relajante", "facial-luminosidad", "masaje-descontracturante"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.related
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));
}

export function startingPrice(service: Service): number {
  return Math.min(...service.variants.map((v) => v.price));
}

export function categoryLabel(id: ServiceCategory): string {
  return serviceCategories.find((c) => c.id === id)?.label ?? id;
}

export const featuredServices = services.filter((s) => s.featured);
