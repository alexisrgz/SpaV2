/**
 * Mapa clave → archivo en `public/images`.
 * Si el archivo no existe, <Photo> dibuja un placeholder con la proporción correcta,
 * así que el sitio se ve completo antes de tener fotografía. La lista para el equipo
 * de foto está en PHOTOS.md.
 */

export type ImageTone = "salvia" | "bosque" | "crema" | "arena";

export type ImageSpec = {
  file: string;
  /** Proporción ancho / alto, como en CSS `aspect-ratio` ("4/5"). */
  ratio: `${number}/${number}`;
  alt: string;
  /** Tono del placeholder mientras no haya foto. */
  tone: ImageTone;
};

export const images = {
  hero: {
    file: "hero.jpg",
    ratio: "4/5",
    alt: "Sala de tratamiento con pared verde, plantas y luz cálida de la tarde",
    tone: "bosque",
  },
  about: {
    file: "about.jpg",
    ratio: "4/5",
    alt: "Entrada de Savia Spa con recepción de madera clara y plantas",
    tone: "crema",
  },
  "space-1": {
    file: "space-1.jpg",
    ratio: "4/5",
    alt: "Recepción con mostrador de madera, cerámica y una planta grande junto a la ventana",
    tone: "crema",
  },
  "space-2": {
    file: "space-2.jpg",
    ratio: "3/2",
    alt: "Sala de tratamiento con camilla preparada, toallas dobladas y luz tenue",
    tone: "salvia",
  },
  "space-3": {
    file: "space-3.jpg",
    ratio: "3/2",
    alt: "Zona de descanso con camastros junto a la alberca y vegetación alrededor",
    tone: "bosque",
  },
  "space-4": {
    file: "space-4.jpg",
    ratio: "1/1",
    alt: "Detalle de velas encendidas sobre toallas de algodón color arena",
    tone: "arena",
  },
  "svc-masaje-relajante": {
    file: "svc-masaje-relajante.jpg",
    ratio: "4/5",
    alt: "Terapeuta realizando un masaje relajante de espalda con aceite tibio",
    tone: "salvia",
  },
  "svc-masaje-descontracturante": {
    file: "svc-masaje-descontracturante.jpg",
    ratio: "4/5",
    alt: "Manos de terapeuta trabajando la zona de hombros y cuello",
    tone: "bosque",
  },
  "svc-facial-hidratante": {
    file: "svc-facial-hidratante.jpg",
    ratio: "4/5",
    alt: "Aplicación de mascarilla hidratante con brocha durante un facial",
    tone: "crema",
  },
  "svc-facial-luminosidad": {
    file: "svc-facial-luminosidad.jpg",
    ratio: "4/5",
    alt: "Rostro relajado con piel luminosa después de un facial, bajo luz natural",
    tone: "arena",
  },
  "svc-aromaterapia": {
    file: "svc-aromaterapia.jpg",
    ratio: "4/5",
    alt: "Frascos de aceites esenciales con ramas de eucalipto y lavanda",
    tone: "salvia",
  },
  "svc-ritual-corporal": {
    file: "svc-ritual-corporal.jpg",
    ratio: "4/5",
    alt: "Exfoliante de sal y aceites en cuencos de cerámica junto a una toalla enrollada",
    tone: "crema",
  },
  "pkg-dia-de-spa": {
    file: "pkg-dia-de-spa.jpg",
    ratio: "4/3",
    alt: "Bata, sandalias y té servido en la zona de descanso del spa",
    tone: "salvia",
  },
  "pkg-para-dos": {
    file: "pkg-para-dos.jpg",
    ratio: "4/3",
    alt: "Cabina doble con dos camillas preparadas y velas encendidas",
    tone: "arena",
  },
  "pkg-novias": {
    file: "pkg-novias.jpg",
    ratio: "4/3",
    alt: "Detalle de flores blancas, toalla y cuenco de cerámica para el ritual de novia",
    tone: "crema",
  },
  "team-1": {
    file: "team-1.jpg",
    ratio: "4/5",
    alt: "Retrato de Lucía Beltrán, masoterapeuta de Savia Spa",
    tone: "crema",
  },
  "team-2": {
    file: "team-2.jpg",
    ratio: "4/5",
    alt: "Retrato de Renata Osuna, cosmetóloga de Savia Spa",
    tone: "salvia",
  },
  "team-3": {
    file: "team-3.jpg",
    ratio: "4/5",
    alt: "Retrato de Iván Lizárraga, terapeuta corporal de Savia Spa",
    tone: "arena",
  },
  "gallery-01": {
    file: "gallery-01.jpg",
    ratio: "3/4",
    alt: "Hojas de monstera proyectando sombra sobre una pared de estuco",
    tone: "bosque",
  },
  "gallery-02": {
    file: "gallery-02.jpg",
    ratio: "1/1",
    alt: "Cuenco de cerámica con sal de mar y pétalos secos",
    tone: "arena",
  },
  "gallery-03": {
    file: "gallery-03.jpg",
    ratio: "4/5",
    alt: "Piedras calientes alineadas sobre una toalla de lino",
    tone: "salvia",
  },
  "gallery-04": {
    file: "gallery-04.jpg",
    ratio: "3/2",
    alt: "Pasillo con piso de madera y luz natural que entra por celosías",
    tone: "crema",
  },
  "gallery-05": {
    file: "gallery-05.jpg",
    ratio: "2/3",
    alt: "Rama de eucalipto colgada en la regadera del vestidor",
    tone: "salvia",
  },
} as const satisfies Record<string, ImageSpec>;

export type ImageKey = keyof typeof images;
