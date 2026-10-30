// Recibe las tarjetas PNG que dibuja scripts/og/tarjeta.html en el navegador y
// las guarda en assets/img/og/. Solo para uso local: node scripts/og/recibir.mjs
import { createServer } from 'node:http';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DESTINO = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'assets', 'img', 'og');
mkdirSync(DESTINO, { recursive: true });

createServer((req, res) => {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-methods', 'POST, OPTIONS');
  res.setHeader('access-control-allow-headers', 'content-type');
  if (req.method === 'OPTIONS') return res.end();
  const url = new URL(req.url, 'http://localhost');
  if (req.method !== 'POST' || url.pathname !== '/guardar') { res.statusCode = 404; return res.end('no'); }
  const archivo = String(url.searchParams.get('archivo') ?? '').replace(/[^a-z0-9-]/g, '');
  if (!archivo) { res.statusCode = 400; return res.end('falta archivo'); }
  const partes = [];
  req.on('data', (p) => partes.push(p));
  req.on('end', () => {
    const bytes = Buffer.concat(partes);
    writeFileSync(join(DESTINO, `${archivo}.png`), bytes);
    console.log(`guardada ${archivo}.png (${bytes.length} bytes)`);
    res.end(`ok ${archivo}.png ${bytes.length}`);
  });
}).listen(3999, '127.0.0.1', () => console.log('recibiendo tarjetas en http://localhost:3999/guardar'));
