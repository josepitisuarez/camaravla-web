# CLAUDE.md — camaravla-web

> Memoria para Claude Code. El PORQUÉ y el CÓMO, no listados de archivos.

## Qué es
Sitio institucional de la Cámara de Comercio, Turismo, Industria y Producción de
Villa La Angostura (`camaravla.org.ar`), y la casa del Observatorio Económico
OE-VLA (`/observatorio`). Lo opera Pity con una secretaria: **todo lo que
requiera mantenimiento humano periódico está fuera de alcance** por diseño.

## Arquitectura
- **Estático puro.** HTML + una hoja CSS + un JS. Sin framework ni build: no hay
  Node en la PC de Pity y no hace falta. Cabecera y pie se inyectan desde
  `assets/js/sitio.js` para no repetirlos en cinco páginas.
- **Datos como scripts, no como JSON.** `data/noticias.js` y
  `data/observatorio.js` definen variables globales (`window.NOTICIAS`,
  `window.OBSERVATORIO`). Motivo: `fetch()` de JSON falla desde `file://`, y
  queremos que el sitio se pueda revisar abriendo el archivo. Para el servidor
  regenerar un `.js` es tan trivial como un `.json`.
- **Rutas relativas** con `data-raiz` en `<html>` (`./` en la raíz, `../` en
  `observatorio/`). Si se agrega un nivel de carpeta, ese atributo cambia.
- **Quién escribe qué:** SERVIL regenera `data/*.js` (noticias desde el canal de
  carga, indicadores el día 10) y publica; las páginas fijas las edita Pity.
- **Hosting previsto:** Cloudflare Pages (gratis) con cuenta **propia de la
  Cámara**, no la de Grupo Caldas que administra Joaquín (doctrina 5 de
  independencia técnica). Correo `info@camaravla.org.ar` por Email Routing de
  Cloudflare, reenviado a casilla(s) existentes.

## Comandos reales
```bash
# ver: abrir index.html en el navegador (file://)
# no hay instalación, tests ni build
```

## Datos / integraciones
- Sin secretos, sin `.env`.
- Contenido con fuente y fecha:
  - Historia, propósito/misión/visión y mapa institucional: *Entregable Cámara
    03.11.2020* (Drive `15. CÁMARA\00. Varios\`). Gestión anterior; Pity lo
    validó "chequeo mediante".
  - Comisión Directiva y órgano de fiscalización 2025-2027, nombre registral,
    legajo y decreto: *Constancia IPJ Neuquén N° 06360/2025* (11/12/2025).
    Tildes agregadas por convención; **Pity debe confirmarlas**.
  - CUIT 30-67296347-4: dicho por Pity el 24/09/2026.
  - Sede Cerro Inacayal 586: ficha de Google del sitio anterior. **Verificar.**
  - Fuentes del Observatorio: verificadas una por una el 24/09/2026 (ver memoria
    de sesión / brújula).

## Rama-deploy
Repo: `github.com/josepitisuarez/camaravla-web` (público, creado 24/09/2026).
Rama única `main`. **⚠️ `main` ES la rama-deploy desde el 24/09/2026:** el
Worker `camaravla-web` de Cloudflare (cuenta de Pity, id `8708…`) está conectado
al repo por Git y **cada push a `main` publica el sitio** (build automático con
`wrangler deploy`, que lee `wrangler.jsonc` y sirve el repo como assets
estáticos; `.assetsignore` deja afuera docs, scripts y archivos de proyecto).
Commitear es seguro; **pushear es publicar**. No es un proyecto "Pages": es un
Worker con Static Assets, que es el camino actual de Cloudflare.

## Gotchas
- **El nombre registral no es el de uso.** IPJ: "Cámara de Industria, Producción
  y Comercio de Villa La Angostura". Uso y costumbre: "Cámara de Comercio,
  Turismo, Industria y Producción". El sitio usa el de uso y pone el registral
  en el pie. No "corregir" uno por el otro.
- **Nada del Observatorio se publica con dato inventado.** `valor: null` muestra
  "en preparación". Los `<span class="pendiente">` son datos que Pity no dio
  todavía (horario, teléfono, cuota social): se completan, no se adivinan.
- La noticia de ejemplo se borró el 24/09/2026 antes del primer push.
- **El estatuto queda fuera del sitio** por decisión de Pity (24/09/2026).
- **Los documentos internos del OE-VLA NO se publican** (Pity, 08/10/2026):
  el guion y la exposición de la reunión con CIETES (`docs/oe-vla/02-*`,
  `03-*` y sus PDF) quedaron en la rama local **`docs-cietes-privado`**, fuera
  de `main`. Como el Worker sirve el repo entero como archivos públicos, **todo
  lo que entra a `main` queda accesible por URL aunque no esté enlazado**. Lo
  interno va a `brujula` o a Drive, nunca a este repo. En `main` solo queda
  `01-metodologia-general-v0.1`, que sí es pública.
- **Volvió a pasar el 08/10 (nota al Decano FaTu, exposición, Word): cuatro
  commits más apartados a la rama local `docs-fatu-privado`.** Desde el
  09/10/2026 el `.gitignore` bloquea `docs/oe-vla/*` salvo la metodología
  pública: lo interno ya no puede entrar por accidente. ⬜ Mover el contenido
  de `docs-cietes-privado` y `docs-fatu-privado` a Drive y borrar las ramas.
- **Mapa de socios** (`mapa.html`, 09/10/2026): lee
  `https://socios.camaravla.org.ar/mapa/establecimientos.json` (CORS abierto,
  solo lo comercial de socios activos que no se ocultaron) y lo dibuja con
  Leaflet + OpenStreetMap alojados en `assets/vendor/leaflet` (copiados del
  sistema). `assets/js/mapa.js` es el mismo script que usa la cocina.
- **El Observatorio no se muestra en el sitio** (Pity, 29/10/2026: "que no sea
  visible nada del observatorio"). Se quitó del menú, la portada, el pie,
  Contacto, Noticias y el Aviso legal; `observatorio/` y `data/observatorio.js`
  siguen en el repo pero `.assetsignore` los deja fuera del deploy, así
  `/observatorio` da 404. Para volver a mostrarlo: sacar esas dos líneas del
  `.assetsignore`, reponer la entrada del menú en `sitio.js` y los bloques de
  portada (están en el historial, commit de este cambio).
- **Noticias de prensa** (29/10/2026): `data/noticias.js` se carga a mano con
  las notas de La Angostura Digital y Diario Andino sobre la Cámara, resumidas
  con palabras propias y enlazadas al medio (nunca el texto ni las fotos del
  portal). Una nota admite `fuente` o `fuentes` (varias). Para sumar una: una
  entrada más en el archivo y push. La pantalla de carga desde el panel de
  gestión sigue pendiente.
- **Vistas previas para WhatsApp y redes (Open Graph, 29/10/2026).** Cada
  página fija lleva `og:title`, `og:description`, `og:url` e `og:image`
  absolutos, y **cada noticia tiene su propia página `noticias/<id>.html`**,
  generada por `node scripts/generar-noticias.mjs` desde `data/noticias.js`
  (WhatsApp lee las etiquetas sin ejecutar JavaScript, por eso no alcanza con
  `noticias.html#id`). **Correr el generador cada vez que cambie
  `noticias.js`** y commitear las páginas generadas. Las imágenes de vista
  previa viven en `assets/img/og/` (1200×630 PNG): `camara.png` por defecto,
  `capacitacion-liderar-mejor.png`, y `noticia-<id>.png` por noticia. La capacitación usa en cambio una foto genérica de Pexels
  (`assets/img/capacitaciones/liderar-mejor.jpg`, autor fauxels, foto 3183186,
  licencia Pexels: uso comercial y modificación permitidos, sin atribución
  obligatoria; Pity autorizó la foto genérica el 29/10/2026). Se
  dibujan con `scripts/og/tarjeta.html` (canvas en el navegador, marca de la
  Cámara + título) y las recibe `node scripts/og/recibir.mjs` en el puerto
  3999: abrir `http://localhost:8090/scripts/og/tarjeta.html?auto=1&archivo=...&t=...&s=...`
  con el servidor local andando. Una noticia con `imagen` propia (foto de la
  Cámara, nunca de un medio) la usa en vez de la tarjeta. WhatsApp cachea la
  vista previa: si se cambia la imagen, cambiar también el nombre del archivo.
  **Desde el 29/10 (tarde) las noticias llevan foto genérica de Pexels** en
  `assets/img/noticias/<id>.jpg` (1200×630), elegida por tema; la tarjeta de
  texto queda solo como respaldo (`camara.png`). Fotos usadas (número de foto
  en Pexels): ingresos brutos 6256066 (pizarrón con fórmulas; Pity, 29/10: "fórmulas matemáticas genéricas", archivo `-v2` para renovar la caché de WhatsApp) · Congreso 31192612 ·
  ruido 18331431 · estacionalidad 4427225 · Carta Orgánica 261621 · reforma
  laboral 31353701 · agua 31724660 · asamblea 8761524 · capacitación 3183186.
  Para una noticia nueva: bajar de Pexels con
  `?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop`, guardar con el id de la
  noticia, poner `imagen` en `noticias.js`, correr el generador.
  **29/10 (noche): Pity retiró las ocho notas de prensa** ("sacá todas las
  noticias, subí solo esa"): el sitio publica solo novedades propias de la
  Cámara, hoy una, con la foto de su Instagram (``, publicación
  DfCiYSnpIKJ, bajada a mano porque Instagram pide sesión para ver más de
  quince publicaciones). Las retiradas quedaron en
  `docs/noticias-prensa-2026-retiradas.js` por si vuelven.
- **Contacto público = los Gmail de secretaría y asistente** (Pity, 30/10/2026,
  "avancemos con los gmails"): `secretariaccvla@gmail.com` y
  `asistenteccvla@gmail.com` en Contacto, pie, aviso legal, capacitaciones y
  noticias; `info@camaravla.org.ar` no se muestra en el sitio. **Deuda
  anotada:** son cuentas fuera del dominio de la Cámara; si cambia la
  secretaría hay que actualizar el sitio y el parámetro `correo_responder_a`
  del sistema. El remitente de los mails automáticos sigue siendo `info@`
  (único dominio verificado en Resend) con "responder a" hacia esos Gmail.
- **Franja del dólar** (29/10/2026): `sitio.js` la inyecta debajo de la cabecera
  y la llena con `https://gestion.camaravla.org.ar/datos/cotizaciones.json`
  (en local, `localhost:3000`); si no hay datos, queda oculta. Se desplaza con
  CSS (pausa al pasar el mouse; sin animación si el usuario pidió menos
  movimiento). El sitio no habla con DolarApi: eso lo hace el sistema de la
  Cámara cada hora y la fuente viaja en el JSON.
- **Capacitaciones** (`capacitaciones.html` + `assets/js/capacitaciones.js`,
  29/10/2026): el programa es texto fijo de la página; los datos prácticos
  (fechas, lugar, costo, cupo, si la inscripción sigue abierta) se leen de
  `https://gestion.camaravla.org.ar/capacitaciones/publicas.json`, y el
  formulario se envía por `fetch` al sistema (`/capacitaciones/<clave>/inscribirse`).
  En local apunta a `http://localhost:3000`. **El sitio no guarda inscripciones**:
  se ven en Gestión CCVLA → Socios → Capacitaciones. La clave de la
  capacitación está en `data-capacitacion` del formulario. Para la próxima
  capacitación: alta en el panel y una página o bloque nuevo acá con su clave.
- **El mapa de socios no se muestra todavía** (Pity, 29/10/2026): `mapa.html`
  sigue servida pero sin enlace en el menú ni en la portada. Para mostrarlo,
  reponer `["mapa", "Mapa", "mapa.html"]` en `enlaces` de `sitio.js`.
- **Botón "Soy socio"** (08/10/2026) en el menú, la portada y Asociarse →
  `https://socios.camaravla.org.ar/` (portal del socio, servido por Gestión
  CCVLA). Es un enlace externo: el sitio no sabe nada de socios.
- Google Fonts (Inter) se carga desde internet; sin conexión cae a la fuente del
  sistema. Es aceptable.
- **URLs limpias** (30/10/2026): todos los enlaces internos van sin `.html`
  (`/institucional`, `/noticias/<id>`); `servidor-dev.ps1` también las sirve.
  `/x.html` sigue redirigiendo (307) a `/x` por `auto-trailing-slash`.
- **Seguridad y caché en `_headers`** (30/10/2026, Workers Static Assets lo
  lee): HSTS, CSP estricta (scripts solo propios, estilos propios + Google
  Fonts, imágenes propias + OpenStreetMap, datos solo del sistema de la Cámara,
  sin iframes), nosniff, Referrer-Policy, Permissions-Policy; caché de un año
  para `assets/vendor`, una semana imágenes, un día CSS/JS con renovación en
  segundo plano, cinco minutos `data/`. **Por la CSP no puede haber `<script>`
  ni `onclick=`/`onerror=` en línea**: todo JavaScript va en archivos. Si se
  suma un servicio externo (otro dominio de datos o de imágenes), hay que
  agregarlo a la CSP o el navegador lo bloquea en silencio. `robots.txt` propio
  y `sitemap.xml` generado por `generar-noticias.mjs` (mapa y legal fuera).
  ⬜ En el panel de Cloudflare (cuenta de Pity): "Always Use HTTPS" (hoy
  `http://` responde sin redirigir), TLS mínimo 1.2, y DNS + dominio del
  Worker para `www`.
- URL técnica del Worker: `camaravla-web.jose-suarez-870.workers.dev`.
- **El dominio anterior `camaradecomerciovla.org.ar`** existió (2020) y está
  caído. Si sigue registrado a nombre de la Cámara, redirigirlo acá.

## Estado actual / pendientes
- **24/09/2026:** scaffolding + cinco páginas (inicio, institucional,
  observatorio, noticias, contacto) revisables en local. Sin publicar.
- Pendientes de Pity: requisitos y cuota de
  socio · texto de presentación (dijo "más adelante") · casilla destino de
  `info@` · confirmar tildes de nombres · registro de `camaravla.org.ar` en
  NIC.ar (en proceso) · canal de carga de noticias (Telegram, en standby).
- Pendientes técnicos: cuenta Cloudflare de la Cámara · noticias y "asociarse"
  alimentados desde el panel de gestión (hoy noticias a mano y contacto por
  `mailto:`) · URLs sin `.html` · `www` · dominio viejo.
- **29/10/2026 (después):** vistas previas Open Graph en todas las páginas,
  una página por noticia con su tarjeta, tarjeta de la capacitación.
  Sin publicar hasta el OK de Pity. ⬜ Fotos propias de la Cámara para
  reemplazar las tarjetas donde haya (Pity las manda o autoriza una foto de
  banco con licencia libre).
- **29/10/2026:** Observatorio oculto del sitio y noticias de prensa
  2025-2026 cargadas (ver Gotchas); después, a pedido de Pity: fuera la nota
  de la agenda navideña, mapa sin enlace por ahora, horario de atención
  08:00 a 14:00, solapa Capacitaciones con formulario de inscripción al
  sistema. **Sin publicar hasta el OK de Pity** (necesita el deploy del
  sistema primero, si no el formulario no tiene dónde caer).
