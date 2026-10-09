/* Mapa de la Cámara (cocina y, con el mismo JSON, el sitio público): dibuja los
   establecimientos que trae data-fuente, con filtro por rubro y buscador. */
(function () {
  function iniciar() {
  var cont = document.getElementById('mapa');
  if (!cont || typeof L === 'undefined') return;
  var fuente = cont.getAttribute('data-fuente');
  var filtroRubro = document.getElementById('filtro-rubro');
  var buscador = document.getElementById('buscador');
  var filtroUbicado = document.getElementById('filtro-ubicado');
  var contador = document.getElementById('contador');
  var lista = document.getElementById('lista-sin-ubicar');

  var mapa = L.map(cont).setView([-40.7617, -71.6462], 14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapa);
  setTimeout(function () { mapa.invalidateSize(); }, 250);
  var capa = L.layerGroup().addTo(mapa);
  var todos = [];

  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function ficha(e) {
    var h = '<strong>' + esc(e.nombre) + '</strong><br><span style="color:#6b7280">' + esc(e.rubro) + '</span>';
    if (e.domicilio) h += '<br>' + esc(e.domicilio);
    if (e.horario) h += '<br>' + esc(e.horario);
    if (e.temporada) h += '<br>' + esc(e.temporada);
    if (e.telefono) h += '<br>Tel. ' + esc(e.telefono);
    if (e.web) h += '<br><a href="' + esc(e.web) + '" target="_blank" rel="noopener">' + esc(e.web.replace(/^https?:\/\//, '')) + '</a>';
    if (e.como_llegar) h += '<br><a href="' + esc(e.como_llegar) + '" target="_blank" rel="noopener">Cómo llegar</a>';
    if (e.socio_nombre) h += '<br><span style="color:#6b7280">Socio: ' + esc(e.socio_nombre) + ' · N° ' + esc(e.numero_socio) + (e.socio_estado !== 'activo' ? ' · ' + esc(e.socio_estado) : '') + '</span>';
    return h;
  }
  function dibujar() {
    capa.clearLayers();
    var rubro = filtroRubro ? filtroRubro.value : '';
    var q = buscador ? buscador.value.trim().toLowerCase() : '';
    var soloSin = filtroUbicado && filtroUbicado.value === 'sin';
    var visibles = 0;
    var sinUbicar = [];
    var puntos = [];
    todos.forEach(function (e) {
      if (rubro && e.rubro_clave !== rubro) return;
      if (q && (e.nombre + ' ' + (e.domicilio || '') + ' ' + (e.socio_nombre || '')).toLowerCase().indexOf(q) < 0) return;
      if (e.lat == null || e.lng == null) {
        sinUbicar.push(e);
        return;
      }
      if (soloSin) return;
      visibles++;
      var m = L.marker([e.lat, e.lng]).bindPopup(ficha(e));
      capa.addLayer(m);
      puntos.push([e.lat, e.lng]);
    });
    if (contador) contador.textContent = visibles + ' en el mapa' + (sinUbicar.length ? ' · ' + sinUbicar.length + ' sin ubicar' : '');
    if (lista) {
      lista.innerHTML = sinUbicar
        .map(function (e) {
          return '<li>' + (e.socio_id ? '<a href="/padron/' + e.socio_id + '">' : '') + esc(e.nombre) + (e.socio_id ? '</a>' : '') + ' <span style="color:#6b7280">· ' + esc(e.rubro) + (e.socio_nombre ? ' · ' + esc(e.socio_nombre) : '') + '</span></li>';
        })
        .join('');
    }
    if (puntos.length > 1) mapa.fitBounds(puntos, { padding: [30, 30], maxZoom: 16 });
  }

  fetch(fuente, { credentials: 'same-origin' })
    .then(function (r) {
      return r.json();
    })
    .then(function (datos) {
      todos = datos.establecimientos || [];
      if (filtroRubro && filtroRubro.options.length <= 1) {
        var rubros = {};
        todos.forEach(function (e) {
          rubros[e.rubro_clave] = e.rubro;
        });
        Object.keys(rubros)
          .sort(function (a, b) {
            return rubros[a].localeCompare(rubros[b]);
          })
          .forEach(function (k) {
            var o = document.createElement('option');
            o.value = k;
            o.textContent = rubros[k];
            filtroRubro.appendChild(o);
          });
      }
      dibujar();
    })
    .catch(function () {
      if (contador) contador.textContent = 'No se pudo cargar el mapa.';
    });
  [filtroRubro, buscador, filtroUbicado].forEach(function (el) {
    if (el) el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', dibujar);
  });
  }
  // Leaflet necesita su hoja de estilos aplicada y el contenedor con tamaño real: se arranca al terminar la carga.
  if (document.readyState === "complete") iniciar();
  else window.addEventListener("load", iniciar);
})();
