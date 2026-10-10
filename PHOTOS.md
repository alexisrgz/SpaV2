# Fotografías de Savia Spa

Lista para el equipo de foto y para quien prepare los archivos. El sitio ya se ve completo
sin fotos (cada hueco muestra un placeholder de marca con la proporción correcta), así que
se pueden ir entregando poco a poco.

## Cómo entregarlas

1. Exporta en **.jpg**, mínimo **2000 px en el lado largo**, perfil sRGB, calidad 80–85.
2. Usa **exactamente** el nombre de archivo de la tabla y respeta la proporción.
3. Copia el archivo a `public/images/` y vuelve a compilar (`npm run build`) o reinicia `npm run dev`.
   El sitio detecta el archivo y lo sirve optimizado (AVIF/WebP) en el tamaño justo para cada pantalla.
4. Si cambias el contenido de una foto, actualiza su texto alternativo en `src/data/images.ts`.

## Estilo (igual para todas)

Luz natural cálida (mañana o última hora de la tarde), verdes de plantas, tonos arena y madera clara,
poca profundidad de campo. Sin texto, sin logotipos, sin marcas de producto visibles. Personas de
espaldas o de perfil, relajadas; nada de sonrisas a cámara.

## Lista

★ = prioritaria (aparece en el inicio o en el primer pantallazo de una página).

| ★ | Archivo | Proporción | Qué debe mostrar | Dónde se usa |
|---|---|---|---|---|
| ★ | `hero.jpg` | 4:5 vertical | Sala de tratamiento con pared verde, plantas y luz cálida | Hero del inicio (vertical en desktop; en móvil se recorta a 4:3 horizontal) |
|   | `about.jpg` | 4:5 vertical | Recepción o entrada del spa | Nosotros, historia |
| ★ | `space-1.jpg` | 4:5 vertical | Recepción: mostrador de madera, cerámica, planta grande | Galería, Nosotros |
| ★ | `space-2.jpg` | 3:2 horizontal | Sala de tratamiento con camilla preparada | Inicio («Por qué Savia»), Galería, Nosotros |
| ★ | `space-3.jpg` | 3:2 horizontal | Zona de descanso o alberca con vegetación | Galería, Nosotros |
|   | `space-4.jpg` | 1:1 cuadrada | Detalle de velas encendidas sobre toallas | Galería |
| ★ | `svc-masaje-relajante.jpg` | 4:5 vertical | Masaje de espalda con aceite tibio | Tarjeta y detalle del servicio |
| ★ | `svc-masaje-descontracturante.jpg` | 4:5 vertical | Manos trabajando hombros y cuello | Tarjeta y detalle del servicio |
| ★ | `svc-facial-hidratante.jpg` | 4:5 vertical | Aplicación de mascarilla con brocha | Tarjeta y detalle del servicio |
| ★ | `svc-facial-luminosidad.jpg` | 4:5 vertical | Rostro relajado, piel luminosa, luz natural | Tarjeta y detalle del servicio |
| ★ | `svc-aromaterapia.jpg` | 4:5 vertical | Frascos de aceites esenciales con eucalipto y lavanda | Tarjeta y detalle del servicio |
| ★ | `svc-ritual-corporal.jpg` | 4:5 vertical | Exfoliante de sal en cuencos de cerámica y toalla | Tarjeta y detalle del servicio |
|   | `pkg-dia-de-spa.jpg` | 4:3 horizontal | Bata, sandalias y té en la zona de descanso | Experiencias (cuadrada en desktop, 4:3 en móvil) |
|   | `pkg-para-dos.jpg` | 4:3 horizontal | Cabina doble con dos camillas y velas | Experiencias |
|   | `pkg-novias.jpg` | 4:3 horizontal | Flores blancas, toalla y cuenco para ritual de novia | Experiencias |
|   | `team-1.jpg` | 4:5 vertical | Retrato de Lucía Beltrán (masoterapeuta) | Nosotros |
|   | `team-2.jpg` | 4:5 vertical | Retrato de Renata Osuna (cosmetóloga) | Nosotros |
|   | `team-3.jpg` | 4:5 vertical | Retrato de Iván Lizárraga (terapeuta corporal) | Nosotros |
|   | `gallery-01.jpg` | 3:4 vertical | Sombras de hojas de monstera sobre estuco | Galería |
|   | `gallery-02.jpg` | 1:1 cuadrada | Cuenco con sal de mar y pétalos secos | Galería |
|   | `gallery-03.jpg` | 4:5 vertical | Piedras calientes sobre toalla de lino | Galería |
|   | `gallery-04.jpg` | 3:2 horizontal | Pasillo de madera con luz entre celosías | Galería |
|   | `gallery-05.jpg` | 2:3 vertical | Rama de eucalipto en la regadera del vestidor | Galería |

Las fotos grandes (hero, «Por qué Savia», detalle de servicio, historia y experiencias) usan
la forma HOJA: dos esquinas opuestas muy redondeadas. Deja aire alrededor del sujeto y no lo
pegues a las esquinas. El hero también se recorta en horizontal en móvil: mantén el sujeto
al centro de la toma.
