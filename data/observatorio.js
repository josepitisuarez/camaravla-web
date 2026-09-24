/* Los cuatro números del último boletín del OE-VLA. Lo regenera SERVIL el día 10.
   valor: null = todavía no hay dato publicado (el sitio muestra "en preparación").
   variacion: número (porcentaje interanual) o null. */

window.OBSERVATORIO = {
  periodo: "",                 // ej. "Agosto 2026"
  proximoBoletin: "",          // ej. "10 de noviembre de 2026"
  indicadores: [
    { clave: "flujo",      nombre: "Flujo turístico",       valor: null, variacion: null, unidad: "personas",  fuente: "Samoré (PDI Chile) · ANAC · APN" },
    { clave: "ocupacion",  nombre: "Ocupación",             valor: null, variacion: null, unidad: "%",         fuente: "Panel OE-VLA · INDEC EOH" },
    { clave: "precios",    nombre: "Canasta Básica VLA",    valor: null, variacion: null, unidad: "$ / mes",   fuente: "Relevamiento propio · SEPA · IPC Neuquén" },
    { clave: "alquileres", nombre: "Alquiler permanente",   valor: null, variacion: null, unidad: "$ / mes",   fuente: "Inmobiliarias locales (trimestral)" }
  ]
};
