// Genera una página por noticia en noticias/<id>.html a partir de data/noticias.js.
// Motivo: WhatsApp, Facebook y compañía arman la vista previa de un enlace leyendo
// las etiquetas Open Graph de la página sin ejecutar JavaScript, así que cada
// noticia necesita una página propia con su título, resumen e imagen.
// Uso: node scripts/generar-noticias.mjs   (correrlo cada vez que cambie noticias.js)
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITIO = 'https://camaravla.org.ar';
const IMAGEN_POR_DEFECTO = 'assets/img/og/camara.png';

const window = {};
new Function('window', readFileSync(join(RAIZ, 'data', 'noticias.js'), 'utf8'))(window);
const noticias = window.NOTICIAS ?? [];

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fechaLarga = (iso) => { const [a, m, d] = iso.split('-').map(Number); return `${d} de ${MESES[m - 1]} de ${a}`; };
const escapar = (s) => String(s ?? '').replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

// Notas largas: `bloques` es una lista de { h } subtítulo · { p } párrafo · { lista } viñetas ·
// { pasos } lista numerada · { tabla: { columnas, filas } } · { aviso } recuadro · { chico } letra chica.
// El texto se escapa entero y lo único que se convierte es **negrita**.
const enLinea = (s) => escapar(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
function bloquesHTML(bloques) {
  return bloques.map((b) => {
    if (b.h) return `<h2>${enLinea(b.h)}</h2>`;
    if (b.p) return `<p>${enLinea(b.p)}</p>`;
    if (b.chico) return `<p class="chico suave">${enLinea(b.chico)}</p>`;
    if (b.aviso) return `<div class="aviso"><p style="margin:0">${enLinea(b.aviso)}</p></div>`;
    if (b.lista) return `<ul>${b.lista.map((i) => `<li>${enLinea(i)}</li>`).join('')}</ul>`;
    if (b.pasos) return `<ol>${b.pasos.map((i) => `<li>${enLinea(i)}</li>`).join('')}</ol>`;
    if (b.tabla) return `<table><thead><tr>${b.tabla.columnas.map((c) => `<th>${enLinea(c)}</th>`).join('')}</tr></thead><tbody>${b.tabla.filas.map((f) => `<tr>${f.map((c) => `<td>${enLinea(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    return '';
  }).join('\n        ');
}

// La imagen de la noticia: la que declara, o la tarjeta generada para ella, o la de la Cámara.
function imagenDe(n) {
  if (n.imagen) return n.imagen;
  const tarjeta = `assets/img/og/noticia-${n.id}.png`;
  return existsSync(join(RAIZ, tarjeta)) ? tarjeta : IMAGEN_POR_DEFECTO;
}

function pagina(n) {
  const imagen = imagenDe(n);
  const fuentes = Array.isArray(n.fuentes) ? n.fuentes : n.fuente ? [n.fuente] : [];
  const url = `${SITIO}/noticias/${n.id}`;
  return `<!DOCTYPE html>
<html lang="es" data-raiz="../" data-pagina="noticias">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapar(n.titulo)} — Cámara de Comercio, Turismo, Industria y Producción de Villa La Angostura</title>
  <meta name="description" content="${escapar(n.resumen)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Cámara de Comercio, Turismo, Industria y Producción de Villa La Angostura">
  <meta property="og:title" content="${escapar(n.titulo)}">
  <meta property="og:description" content="${escapar(n.resumen)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITIO}/${imagen}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="es_AR">
  <meta property="article:published_time" content="${n.fecha}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="../assets/img/logo.png">
  <link rel="preload" href="../assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="../assets/css/estilos.css?v=20261119">
</head>
<body>
<div data-cabecera></div>

<main>
  <article class="seccion">
    <div class="contenedor" style="max-width:820px">
      <p class="chico suave" style="margin-bottom:6px"><a href="../noticias">← Noticias</a></p>
      <span class="antetitulo">${escapar(n.etiqueta || 'Noticia')} · ${fechaLarga(n.fecha)}</span>
      <h1>${escapar(n.titulo)}</h1>
      <p class="grande">${escapar(n.resumen)}</p>
      ${n.imagen ? `<img src="../${escapar(imagen)}" alt="" decoding="async" style="width:100%;height:auto;border-radius:10px;margin:18px 0 22px;border:1px solid var(--linea)">` : ''}
      ${n.bloques ? `<div class="nota">
        ${bloquesHTML(n.bloques)}
        ${fuentes.length ? `<ul>${fuentes.map((f) => `<li><a href="${escapar(f.url)}" rel="noopener" target="_blank">${escapar(f.nombre)}</a></li>`).join('')}</ul>` : ''}
      </div>` : n.cuerpo ? `<p>${escapar(n.cuerpo)}</p>` : ''}
      ${n.bloques ? '' : fuentes.length ? `<p class="chico suave">${fuentes.length > 1 ? 'Fuentes' : 'Fuente'}: ${fuentes.map((f) => `<a href="${escapar(f.url)}" rel="noopener" target="_blank">${escapar(f.nombre)}</a>`).join(' · ')}</p>` : ''}
      <p class="chico suave" style="margin-top:28px">Compartí esta nota: <span class="mono">${url}</span></p>
    </div>
  </article>
</main>

<div data-pie></div>
<script src="../assets/js/sitio.js?v=20261119"></script>
</body>
</html>
`;
}

const carpeta = join(RAIZ, 'noticias');
mkdirSync(carpeta, { recursive: true });
// Se borran las páginas de noticias que ya no existen en el archivo de datos.
for (const archivo of readdirSync(carpeta)) if (archivo.endsWith('.html') && !noticias.some((n) => `${n.id}.html` === archivo)) unlinkSync(join(carpeta, archivo));
for (const n of noticias) writeFileSync(join(carpeta, `${n.id}.html`), pagina(n), 'utf8');
// Mapa del sitio: páginas fijas públicas más una entrada por noticia (mapa y legal quedan fuera a propósito).
const FIJAS = ['', 'institucional', 'capacitaciones', 'capacitaciones/equipos-que-funcionan', 'capacitaciones/webinar-pymes-familiares', 'empleo', 'financiacion', 'noticias', 'contacto'];
const hoy = new Date().toISOString().slice(0, 10);
const urls = [...FIJAS.map((p) => ({ loc: `${SITIO}/${p}`, lastmod: hoy })), ...noticias.map((n) => ({ loc: `${SITIO}/noticias/${n.id}`, lastmod: n.fecha }))];
writeFileSync(join(RAIZ, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>
`, 'utf8');
console.log(`${noticias.length} páginas de noticias generadas en noticias/ · sitemap.xml con ${urls.length} direcciones`);
for (const n of noticias) if (imagenDe(n) === IMAGEN_POR_DEFECTO) console.log(`  sin imagen propia: ${n.id} (usa la de la Cámara)`);
