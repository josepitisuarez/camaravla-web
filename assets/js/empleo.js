/* Bolsa de trabajo: las ofertas vigentes se leen del sistema de gestión de la
   Cámara (las publican los socios desde el portal). Acá solo se muestran; la
   postulación y el currículum viven en socios.camaravla.org.ar/empleo. */
(function () {
  const esLocal = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  const BOLSA = esLocal ? "http://localhost:3000" : "https://socios.camaravla.org.ar";
  const lista = document.getElementById("ofertas-lista");
  const estado = document.getElementById("ofertas-estado");
  if (!lista || !estado) return;

  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  function escapar(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  }
  function fecha(iso) {
    const p = String(iso || "").split("-").map(Number);
    return p.length === 3 ? p[2] + " de " + MESES[p[1] - 1] : "";
  }
  function recortar(texto, largo) {
    const t = String(texto || "").replace(/\s+/g, " ").trim();
    return t.length > largo ? t.slice(0, largo - 1).trimEnd() + "…" : t;
  }
  function tarjeta(o) {
    const datos = [o.tipo, o.jornada, o.vacantes > 1 ? o.vacantes + " vacantes" : "", o.ofrece_vivienda ? "ofrece vivienda" : ""].filter(Boolean).join(" · ");
    return (
      '<a class="tarjeta tarjeta--enlace fuente" href="' + BOLSA + "/empleo/ofertas/" + encodeURIComponent(o.id) + '">' +
      '<span class="antetitulo">' + escapar(o.rubro) + "</span>" +
      "<h3>" + escapar(o.puesto) + "</h3>" +
      '<p class="suave" style="margin:0 0 8px"><strong>' + escapar(o.empleador) + "</strong></p>" +
      '<p class="chico" style="margin:0 0 8px">' + escapar(datos) + "</p>" +
      '<p class="suave chico">' + escapar(recortar(o.descripcion, 150)) + "</p>" +
      '<p class="fuente__ir">Ver y postularme →</p>' +
      '<p class="chico suave" style="margin:8px 0 0">Vence el ' + escapar(fecha(o.vence)) + "</p>" +
      "</a>"
    );
  }

  fetch(BOLSA + "/empleo/ofertas.json")
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("sin respuesta"))))
    .then((datos) => {
      const ofertas = datos.ofertas || [];
      if (!ofertas.length) {
        estado.textContent = "Por el momento no hay ofertas publicadas. Podés crear tu perfil y pedir que te avisemos por mail cuando aparezca una de tu rubro.";
        return;
      }
      estado.textContent = ofertas.length === 1 ? "Hay una oferta publicada." : "Hay " + ofertas.length + " ofertas publicadas.";
      lista.innerHTML = ofertas.map(tarjeta).join("");
    })
    .catch(() => {
      estado.innerHTML = 'No pudimos cargar las ofertas en este momento. Podés verlas en la <a href="' + BOLSA + '/empleo/ofertas">Bolsa de trabajo</a>.';
    });
})();
