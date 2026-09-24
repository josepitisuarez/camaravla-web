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
- Google Fonts (Inter) se carga desde internet; sin conexión cae a la fuente del
  sistema. Es aceptable.
- **URLs limpias en producción.** `html_handling: auto-trailing-slash` hace que
  `/institucional.html` redirija (307) a `/institucional`. Funciona, pero los
  links internos siguen apuntando a `.html` → un salto extra por clic. ⬜ Pasar
  los enlaces de `sitio.js` y las páginas a rutas sin extensión cuando se toque
  la navegación (en local con `servidor-dev.ps1` las rutas sin extensión NO
  funcionan; habría que enseñárselas al script).
- URL técnica del Worker: `camaravla-web.jose-suarez-870.workers.dev`.
- **El dominio anterior `camaradecomerciovla.org.ar`** existió (2020) y está
  caído. Si sigue registrado a nombre de la Cámara, redirigirlo acá.

## Estado actual / pendientes
- **24/09/2026:** scaffolding + cinco páginas (inicio, institucional,
  observatorio, noticias, contacto) revisables en local. Sin publicar.
- Pendientes de Pity: horario y teléfono de contacto · requisitos y cuota de
  socio · texto de presentación (dijo "más adelante") · casilla destino de
  `info@` · confirmar tildes de nombres · registro de `camaravla.org.ar` en
  NIC.ar (en proceso) · canal de carga de noticias (Telegram, en standby).
- Pendientes técnicos: cuenta Cloudflare de la Cámara · Pages + Email Routing ·
  generador de `data/*.js` en SERVIL · sección de boletines cuando exista el
  primero · formulario de contacto (hoy es `mailto:`).
