import type { Faq } from "./types";

export const faqs: readonly Faq[] = [
  {
    question: "¿Cómo reservo mi cita?",
    answer:
      "Toca cualquier botón «Reservar» y se abrirá WhatsApp con un mensaje listo. Te respondemos con los horarios disponibles y confirmamos tu cita en el mismo chat.",
  },
  {
    question: "¿Puedo cambiar o cancelar?",
    answer:
      "Sí, sin costo, avisando con al menos 24 horas de anticipación. Si cancelas con menos tiempo o no llegas, te pediremos un anticipo para tu siguiente reserva.",
  },
  {
    question: "¿Con cuánta anticipación llego?",
    answer:
      "Llega de 10 a 15 minutos antes para llenar tu ficha, cambiarte con calma y tomar algo. Si llegas tarde, la sesión termina a la hora programada para no retrasar a la siguiente persona.",
  },
  {
    question: "¿Qué tengo que llevar?",
    answer:
      "Nada. Tenemos bata, sandalias, toallas, ropa interior desechable y artículos de baño. Si tu experiencia incluye alberca, trae traje de baño.",
  },
  {
    question: "¿Qué formas de pago aceptan?",
    answer:
      "Efectivo, tarjeta de débito o crédito y transferencia. El pago se hace al terminar tu sesión.",
  },
  {
    question: "¿Puedo ir si estoy embarazada o tengo una condición de salud?",
    answer:
      "Escríbenos por WhatsApp antes de reservar. Según tu caso adaptamos el tratamiento, te sugerimos otro o te pedimos el visto bueno de tu médico.",
  },
];
