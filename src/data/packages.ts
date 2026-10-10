import type { Package } from "./types";

export const packages: readonly Package[] = [
  {
    slug: "dia-de-spa",
    name: "Día de spa",
    image: "pkg-dia-de-spa",
    duration: "4 h",
    price: 2400,
    summary: "Masaje, facial y tiempo libre en la zona de descanso, con comida ligera incluida.",
    description:
      "Una mañana o tarde completa para ti. Encadenamos un masaje relajante y un facial hidratante, con pausas entre tratamientos para que no se sienta como una agenda. A media visita, una comida ligera y tiempo libre junto a la alberca.",
    includes: [
      "Masaje relajante de 60 min",
      "Facial hidratante de 60 min",
      "Ritual de pies con sales y bálsamo",
      "Comida ligera de temporada y aguas frescas",
      "Acceso a zona de descanso y alberca",
    ],
    idealFor: "Cumpleaños, un día libre o un regalo para alguien que nunca se da tiempo.",
  },
  {
    slug: "para-dos",
    name: "Para dos",
    image: "pkg-para-dos",
    duration: "90 min c/u",
    price: 2900,
    summary: "Masaje de 90 minutos para cada quien en cabina doble, con té y fruta al terminar.",
    description:
      "Dos masajes al mismo tiempo, en la misma cabina, con dos terapeutas. Cada quien elige su presión: relajante o descontracturante. Al terminar se quedan juntos en la zona de descanso con té de la casa y fruta de temporada.",
    includes: [
      "Masaje de 90 min por persona en cabina doble",
      "Presión a elección de cada quien",
      "Té de la casa y fruta de temporada",
      "Tiempo en la zona de descanso",
    ],
    idealFor: "Aniversarios, parejas, mamá e hija o mejores amigas.",
  },
  {
    slug: "ritual-de-novia",
    name: "Ritual de novia",
    image: "pkg-novias",
    duration: "3 h 30 min",
    price: 3800,
    summary: "Ritual corporal y facial luminosidad para llegar a tu boda con la piel en su mejor momento.",
    description:
      "Pensado para agendarse entre tres y siete días antes de la boda. Combina nuestro ritual corporal completo con el facial luminosidad y un masaje de cuero cabelludo, para que llegues al gran día con la piel suave, descansada y sin prisas.",
    includes: [
      "Ritual corporal de 120 min (exfoliación, envoltura y masaje)",
      "Facial luminosidad de 75 min",
      "Masaje de cuero cabelludo con aceite de romero",
      "Bebida sin alcohol y bocadillos para ti y una acompañante",
    ],
    idealFor: "Novias y novios, o cualquier evento importante que merezca preparación.",
  },
];
