// Pasa los enlaces internos a direcciones sin .html (el Worker sirve /institucional
// sin redirección) y quita el onerror en línea de las imágenes para que la CSP
// pueda prohibir código en línea. Se corrió una vez el 30/10/2026; queda como
// referencia por si se agrega una página con enlaces viejos.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const leer = (f) => readFileSync(join(RAIZ, f), 'utf8');
const escribir = (f, t) => writeFileSync(join(RAIZ, f), t, 'utf8');

// 1. Páginas fijas.
for (const f of ['index.html', 'institucional.html', 'contacto.html', 'capacitaciones.html', 'legal.html', 'mapa.html', 'noticias.html', '404.html', 'observatorio/index.html']) {
  let t = leer(f);
  t = t.replace(/href="(\.\.\/|\/)?index\.html"/g, (m, p) => `href="${p || './'}"`);
  t = t.replace(/href="((?:\.\.\/|\/)?[a-z0-9/-]+)\.html(#[a-z-]*)?"/g, (m, p, h) => `href="${p}${h || ''}"`);
  escribir(f, t);
}

// 2. sitio.js: menú, pie, enlaces a noticias y sin onerror en línea.
let s = leer('assets/js/sitio.js');
s = s
  .replace('["inicio", "Inicio", "index.html"]', '["inicio", "Inicio", ""]')
  .replace('["institucional", "Institucional", "institucional.html"]', '["institucional", "Institucional", "institucional"]')
  .replace('["capacitaciones", "Capacitaciones", "capacitaciones.html"]', '["capacitaciones", "Capacitaciones", "capacitaciones"]')
  .replace('["noticias", "Noticias", "noticias.html"]', '["noticias", "Noticias", "noticias"]')
  .replace('["contacto", "Contacto", "contacto.html"]', '["contacto", "Contacto", "contacto"]')
  .split('href="${raiz}index.html"').join('href="${raiz}"')
  .split('contacto.html#asociarse').join('contacto#asociarse')
  .split('${raiz}legal.html').join('${raiz}legal')
  .split('${raiz}noticias.html').join('${raiz}noticias')
  .split('noticias/${escapar(n.id)}.html').join('noticias/${escapar(n.id)}');
s = s.replace(
  'return `<img src="${raiz}${escapar(src)}" alt="${escapar(alt || "")}" loading="lazy" onerror="this.onerror=null;this.src=\'${raiz}assets/img/og/camara.png\'">`;',
  'return `<img src="${raiz}${escapar(src)}" alt="${escapar(alt || "")}" loading="lazy" decoding="async" data-respaldo="${raiz}assets/img/og/camara.png">`;',
);
if (!s.includes('respaldoImagenes')) {
  s = s.replace('    rotativa();\n    listadoNoticias();\n    franjaDolar();', '    rotativa();\n    listadoNoticias();\n    franjaDolar();\n    respaldoImagenes();');
  s = s.replace(
    '  /* ---------- franja del dólar',
    `  /* ---------- si una imagen de noticia falta, se muestra la tarjeta de la Cámara ---------- */
  function respaldoImagenes() {
    document.querySelectorAll("img[data-respaldo]").forEach((img) => {
      img.addEventListener("error", () => { if (img.src !== img.dataset.respaldo) img.src = img.dataset.respaldo; }, { once: true });
    });
  }

  /* ---------- franja del dólar`,
  );
}
escribir('assets/js/sitio.js', s);
new Function(s);

// 3. Generador de noticias: enlace limpio y decodificación asíncrona.
let g = leer('scripts/generar-noticias.mjs');
g = g.replace('<a href="../noticias.html">← Noticias</a>', '<a href="../noticias">← Noticias</a>').replace('<img src="../${escapar(imagen)}" alt=""', '<img src="../${escapar(imagen)}" alt="" decoding="async"');
escribir('scripts/generar-noticias.mjs', g);
console.log('enlaces y código en línea: listo');
