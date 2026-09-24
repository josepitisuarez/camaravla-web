/* camaravla.org.ar — un solo archivo de comportamiento.
   Cabecera y pie se inyectan desde acá para no repetirlos en cada página.
   Los datos vienen de /data/*.js (variables globales), regenerados por el servidor. */

(function () {
  const raiz = document.documentElement.getAttribute("data-raiz") || "./";
  const pagina = document.documentElement.getAttribute("data-pagina") || "";

  const enlaces = [
    ["inicio", "Inicio", "index.html"],
    ["institucional", "Institucional", "institucional.html"],
    ["observatorio", "Observatorio", "observatorio/index.html"],
    ["noticias", "Noticias", "noticias.html"],
    ["contacto", "Contacto", "contacto.html"],
  ];

  function cabecera() {
    const nav = enlaces
      .map(([id, txt, href]) => `<a href="${raiz}${href}"${id === pagina ? ' aria-current="page"' : ""}>${txt}</a>`)
      .join("");
    return `
<header class="cabecera">
  <div class="contenedor cabecera__fila">
    <a class="cabecera__logo" href="${raiz}index.html" aria-label="Cámara de Comercio, Turismo, Industria y Producción de Villa La Angostura — inicio">
      <img src="${raiz}assets/img/logo.png" alt="Cámara de Comercio, Turismo, Industria y Producción — Villa La Angostura">
    </a>
    <button class="nav__toggle" aria-expanded="false" aria-controls="nav-principal">Menú</button>
    <nav class="nav" id="nav-principal" aria-label="Principal">
      ${nav}
      <a class="boton" href="${raiz}contacto.html#asociarse">Asociarse</a>
    </nav>
  </div>
</header>`;
  }

  function pie() {
    const anio = new Date().getFullYear();
    return `
<footer class="pie">
  <div class="contenedor">
    <div class="pie__grilla">
      <div>
        <div class="pie__logo"><img src="${raiz}assets/img/logo.png" alt=""></div>
        <p>La casa del sector privado de Villa La Angostura, Neuquén. Fundada en 1979.</p>
        <p><a href="mailto:info@camaravla.org.ar">info@camaravla.org.ar</a></p>
      </div>
      <div>
        <h4>Secciones</h4>
        <ul>
          ${enlaces.map(([, txt, href]) => `<li><a href="${raiz}${href}">${txt}</a></li>`).join("")}
          <li><a href="${raiz}contacto.html#asociarse">Asociarse</a></li>
        </ul>
      </div>
      <div>
        <h4>Redes</h4>
        <ul>
          <li><a href="https://www.instagram.com/camaravla/" rel="noopener" target="_blank">Instagram @camaravla</a></li>
          <li><a href="https://www.facebook.com/comerciovla/" rel="noopener" target="_blank">Facebook</a></li>
          <li><a href="https://ar.linkedin.com/company/cctipvla" rel="noopener" target="_blank">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div class="pie__legal">
      Cámara de Comercio, Turismo, Industria y Producción de Villa La Angostura · Asociación civil inscripta como
      “Cámara de Industria, Producción y Comercio de Villa La Angostura”, Personería Jurídica Decreto N° 1652/1980,
      Legajo IPJ Neuquén N° 349 · CUIT 30-67296347-4 · © ${anio}
    </div>
  </div>
</footer>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const c = document.querySelector("[data-cabecera]");
    const p = document.querySelector("[data-pie]");
    if (c) c.outerHTML = cabecera();
    if (p) p.outerHTML = pie();

    const toggle = document.querySelector(".nav__toggle");
    const nav = document.getElementById("nav-principal");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const abierto = nav.classList.toggle("abierto");
        toggle.setAttribute("aria-expanded", String(abierto));
      });
    }

    rotativa();
    listadoNoticias();
    indicadores();
  });

  /* ---------- utilidades ---------- */
  const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  function fechaLarga(iso) {
    const [a, m, d] = iso.split("-").map(Number);
    return `${d} de ${MESES[m - 1]} de ${a}`;
  }
  function escapar(s) {
    return String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  }
  function noticiasOrdenadas() {
    const lista = Array.isArray(window.NOTICIAS) ? window.NOTICIAS.slice() : [];
    return lista.sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  }
  function imagenHTML(n, claseImg, alt) {
    return n.imagen
      ? `<img src="${raiz}${escapar(n.imagen)}" alt="${escapar(alt || "")}" loading="lazy">`
      : `<span>Cámara VLA</span>`;
  }

  /* ---------- rotativa del inicio: últimas 5, avanza sola cada 6 s ---------- */
  function rotativa() {
    const cont = document.querySelector("[data-rotativa]");
    if (!cont) return;
    const lista = noticiasOrdenadas().slice(0, 5);
    if (!lista.length) { cont.remove(); return; }

    cont.innerHTML = `
      <div class="rotativa__pista">
        ${lista.map((n) => `
          <article class="rotativa__item">
            <div class="rotativa__imagen">${imagenHTML(n, "", n.titulo)}</div>
            <div class="rotativa__texto">
              <div class="rotativa__meta"><span class="etiqueta">${escapar(n.etiqueta || "Noticia")}</span> · ${fechaLarga(n.fecha)}</div>
              <h3>${escapar(n.titulo)}</h3>
              <p>${escapar(n.resumen)}</p>
              <p><a href="${raiz}noticias.html#${escapar(n.id)}">Leer más</a></p>
            </div>
          </article>`).join("")}
      </div>
      <div class="rotativa__puntos" aria-hidden="true">${lista.map((_, i) => `<span${i === 0 ? ' class="activo"' : ""}></span>`).join("")}</div>
      <div class="rotativa__controles">
        <button type="button" data-ant aria-label="Noticia anterior">‹</button>
        <button type="button" data-sig aria-label="Noticia siguiente">›</button>
      </div>`;

    const pista = cont.querySelector(".rotativa__pista");
    const puntos = cont.querySelectorAll(".rotativa__puntos span");
    let i = 0, timer;
    function ir(n) {
      i = (n + lista.length) % lista.length;
      pista.style.transform = `translateX(-${i * 100}%)`;
      puntos.forEach((p, k) => p.classList.toggle("activo", k === i));
    }
    function arrancar() { parar(); timer = setInterval(() => ir(i + 1), 6000); }
    function parar() { if (timer) clearInterval(timer); }
    cont.querySelector("[data-ant]").addEventListener("click", () => { ir(i - 1); arrancar(); });
    cont.querySelector("[data-sig]").addEventListener("click", () => { ir(i + 1); arrancar(); });
    cont.addEventListener("mouseenter", parar);
    cont.addEventListener("mouseleave", arrancar);
    if (lista.length > 1) arrancar();
  }

  /* ---------- listado completo en noticias.html ---------- */
  function listadoNoticias() {
    const cont = document.querySelector("[data-noticias]");
    if (!cont) return;
    const lista = noticiasOrdenadas();
    if (!lista.length) { cont.innerHTML = `<p class="suave">Todavía no hay noticias publicadas.</p>`; return; }
    cont.innerHTML = lista.map((n) => `
      <article class="noticia" id="${escapar(n.id)}">
        <div class="noticia__img">${imagenHTML(n, "", n.titulo)}</div>
        <div class="noticia__cuerpo">
          <div class="noticia__meta">${escapar(n.etiqueta || "Noticia")} · ${fechaLarga(n.fecha)}</div>
          <h3>${escapar(n.titulo)}</h3>
          <p>${escapar(n.resumen)}</p>
          ${n.cuerpo ? `<p>${escapar(n.cuerpo)}</p>` : ""}
          ${n.fuente ? `<p class="chico suave">Fuente: <a href="${escapar(n.fuente.url)}" rel="noopener" target="_blank">${escapar(n.fuente.nombre)}</a></p>` : ""}
        </div>
      </article>`).join("");
  }

  /* ---------- los cuatro números del Observatorio ---------- */
  function indicadores() {
    const cont = document.querySelector("[data-indicadores]");
    if (!cont || !window.OBSERVATORIO) return;
    const o = window.OBSERVATORIO;
    cont.innerHTML = o.indicadores.map((ind) => {
      const sinDato = ind.valor === null || ind.valor === undefined;
      const clase = ind.variacion > 0 ? "sube" : ind.variacion < 0 ? "baja" : "";
      const signo = ind.variacion > 0 ? "▲ +" : ind.variacion < 0 ? "▼ " : "";
      return `
      <div class="indicador">
        <div class="indicador__nombre">${escapar(ind.nombre)}</div>
        <div class="indicador__valor">${sinDato ? "—" : escapar(ind.valor)}</div>
        <div class="indicador__var ${clase}">${sinDato ? `<span class="pendiente">en preparación</span>` : `${signo}${ind.variacion}% interanual`}</div>
        <div class="indicador__fuente">${escapar(ind.fuente)}</div>
      </div>`;
    }).join("");
    const periodo = document.querySelector("[data-periodo]");
    if (periodo) periodo.textContent = o.periodo || "";
  }
})();
