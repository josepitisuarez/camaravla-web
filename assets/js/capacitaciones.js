/* Capacitaciones: los datos prácticos (fechas, lugar, costo, cupo, si la
   inscripción está abierta) se leen del sistema de gestión de la Cámara, así la
   secretaría los completa desde el panel sin tocar el sitio. El formulario se
   envía al mismo sistema; acá no se guarda nada. */
(function () {
  const esLocal = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  const API = esLocal ? "http://localhost:3000" : "https://gestion.camaravla.org.ar";

  const form = document.getElementById("form-inscripcion");
  if (!form) return;
  const clave = form.getAttribute("data-capacitacion");
  const mensaje = document.getElementById("mensaje-inscripcion");
  const cerrada = document.getElementById("inscripcion-cerrada");
  const boton = form.querySelector("button[type=submit]");

  function escapar(s) {
    return String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  }
  function mostrar(tipo, texto) {
    mensaje.hidden = false;
    mensaje.className = "mensaje mensaje--" + tipo;
    mensaje.innerHTML = texto;
  }
  function cerrar(texto) {
    form.hidden = true;
    cerrada.hidden = false;
    cerrada.textContent = texto;
  }

  /* Datos prácticos desde el sistema. Si no responde, la página queda como está. */
  fetch(API + "/capacitaciones/publicas.json")
    .then((r) => (r.ok ? r.json() : null))
    .then((datos) => {
      if (!datos) return;
      const c = (datos.capacitaciones || []).find((x) => x.clave === clave);
      if (!c) { cerrar("La inscripción a esta capacitación no está disponible en este momento."); return; }
      const poner = (campo, valor) => {
        const dd = document.querySelector('[data-campo="' + campo + '"]');
        if (dd && valor) dd.textContent = valor;
      };
      poner("docente", c.docente);
      poner("fechas", c.fechas);
      poner("lugar", c.lugar);
      poner("costo", c.costo);
      poner("cupo", c.cupo ? c.cupo + " lugares" : "sin límite");
      if (!c.inscripcion_abierta) {
        cerrar(c.cupo_lleno ? "El cupo está completo. Si querés quedar en lista de espera, escribinos a info@camaravla.org.ar." : "La inscripción está cerrada.");
      }
    })
    .catch(() => {});

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    mensaje.hidden = true;
    const datos = new FormData(form);
    const faltan = ["nombre", "apellido", "rubro", "whatsapp"].filter((k) => !String(datos.get(k) || "").trim());
    if (faltan.length) { mostrar("error", "Completá todos los campos: " + faltan.join(", ") + "."); return; }
    boton.disabled = true;
    try {
      const r = await fetch(API + "/capacitaciones/" + encodeURIComponent(clave) + "/inscribirse", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(datos).toString(),
      });
      const cuerpo = await r.json().catch(() => ({}));
      if (r.ok && cuerpo.ok) {
        form.reset();
        mostrar("ok", "<strong>Inscripción recibida.</strong> Te vamos a confirmar por WhatsApp. Si tenés dudas, escribinos a info@camaravla.org.ar.");
      } else {
        const errores = Array.isArray(cuerpo.errores) && cuerpo.errores.length ? cuerpo.errores : ["No pudimos registrar la inscripción. Probá de nuevo en unos minutos o escribinos a info@camaravla.org.ar."];
        mostrar("error", errores.map(escapar).join(" "));
      }
    } catch (e) {
      mostrar("error", "No hay conexión con el sistema de inscripciones. Probá de nuevo en unos minutos o escribinos a info@camaravla.org.ar.");
    } finally {
      boton.disabled = false;
    }
  });
})();
