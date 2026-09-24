/* Noticias del sitio. Este archivo lo regenera el servidor (SERVIL) a partir del
   canal de carga que se decida (Telegram / formulario). Orden: la más nueva primero
   se resuelve por fecha en el cliente, así que acá el orden no importa.

   Campos: id (único, sin espacios) · fecha (AAAA-MM-DD) · etiqueta ("Noticia",
   "Comunicado", "Observatorio", "Capacitación"...) · titulo · resumen · cuerpo
   (opcional) · imagen (ruta relativa a la raíz, opcional) · fuente {nombre, url}
   (opcional). */

window.NOTICIAS = [
  {
    id: "2025-11-asamblea-nuevas-autoridades",
    fecha: "2025-11-26",
    etiqueta: "Institucional",
    titulo: "La Asamblea Ordinaria eligió la Comisión Directiva 2025-2027",
    resumen: "José Alberto Suárez fue elegido presidente. El mandato de la nueva Comisión Directiva y del órgano de fiscalización se extiende hasta el 26 de noviembre de 2027.",
    cuerpo: "La Asamblea Ordinaria del 26 de noviembre de 2025 designó a las nuevas autoridades de la Cámara, según constancia de la Inspección Provincial de Personas Jurídicas de Neuquén N° 06360/2025.",
    fuente: { nombre: "La Angostura Digital, 28/11/2025", url: "https://www.laangosturadigital.com.ar/2025/11/28/jose-suarez-es-el-nuevo-presidente-de-la-camara-de-comercio-de-villa-la-angostura/" }
  },
  {
    id: "2026-09-observatorio-economico",
    fecha: "2026-09-24",
    etiqueta: "Observatorio",
    titulo: "La Cámara pone en marcha el Observatorio Económico de Villa La Angostura",
    resumen: "Cuatro indicadores mensuales —flujo turístico, ocupación, precios y alquileres— con metodología pública, datos abiertos y revisión externa universitaria. Primer boletín: fecha a confirmar.",
    cuerpo: "El OE-VLA publicará el día 10 de cada mes, a fecha fija, a partir de fuentes administrativas verificables. La metodología se publica antes del primer dato."
  }
];
