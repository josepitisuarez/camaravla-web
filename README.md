# camaravla-web

Sitio institucional de la Cámara de Comercio, Turismo, Industria y Producción de
Villa La Angostura, con el Observatorio Económico (OE-VLA) como sección.
Dominio: `camaravla.org.ar`.

## Requisitos
- Ninguno para verlo: es HTML + CSS + JS puro, sin paso de build.
- Para publicar: cuenta de Cloudflare Pages de la Cámara (ver `CLAUDE.md`).

## Cómo correrlo
Abrí `index.html` en el navegador. Funciona desde `file://` porque los datos
(`data/*.js`) se cargan como scripts, no con `fetch`.

## Cómo se actualiza el contenido
- **Noticias:** `data/noticias.js` (una entrada por noticia). Lo regenera SERVIL.
- **Números del Observatorio:** `data/observatorio.js`. Lo regenera SERVIL el día 10.
- **Páginas fijas:** los `.html` de la raíz y `observatorio/`.

## Variables de entorno
No hay. El sitio no tiene secretos.
