// Le pone una versión (?v=AAAAMMDD) a estilos.css y sitio.js en todas las páginas.
// Motivo: el CSS y el JS quedan un día en la caché del navegador (ver _headers),
// así que quien ya visitó el sitio seguiría viendo el menú y los estilos viejos.
// Al cambiar la dirección del archivo, el navegador baja el nuevo en el acto.
// Uso: node scripts/version-recursos.mjs [versión]   (sin versión usa la fecha de hoy)
// Correrlo cada vez que cambien assets/css/estilos.css o assets/js/sitio.js.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const version = process.argv[2] || new Date().toISOString().slice(0, 10).replaceAll('-', '');
if (!/^[\w.-]{1,20}$/.test(version)) throw new Error('La versión solo puede llevar letras, números, puntos y guiones.');

const paginas = [];
for (const carpeta of ['', 'capacitaciones', 'noticias']) {
  for (const archivo of readdirSync(join(RAIZ, carpeta))) if (archivo.endsWith('.html')) paginas.push(join(carpeta, archivo));
}
// El generador de noticias lleva las mismas dos direcciones en su plantilla.
paginas.push(join('scripts', 'generar-noticias.mjs'));

let cambiadas = 0;
for (const ruta of paginas) {
  const antes = readFileSync(join(RAIZ, ruta), 'utf8');
  const despues = antes.replace(/(assets\/css\/estilos\.css|assets\/js\/sitio\.js)(\?v=[\w.-]+)?(?=")/g, `$1?v=${version}`);
  if (despues !== antes) {
    writeFileSync(join(RAIZ, ruta), despues, 'utf8');
    cambiadas++;
  }
}
console.log(`versión ${version} puesta en ${cambiadas} de ${paginas.length} archivos`);
