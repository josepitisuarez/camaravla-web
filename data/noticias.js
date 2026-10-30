/* Noticias del sitio. Hoy se edita a mano desde el repo (la pantalla de carga en
   el panel de gestión está pendiente). Orden: la más nueva primero se resuelve por
   fecha en el cliente, así que acá el orden no importa.

   Campos: id (único, sin espacios) · fecha (AAAA-MM-DD) · etiqueta ("Institucional",
   "Gestiones", "Comunicado", "Encuentros"...) · titulo · resumen · cuerpo (opcional)
   · imagen (ruta relativa a la raíz, opcional; fotos propias de la Cámara, por
   ejemplo las de su Instagram @camaravla) · fuente {nombre, url} o fuentes
   [{nombre, url}, ...] (opcional).

   29/10/2026 (Pity): se retiraron las ocho notas de prensa con fotos genéricas
   (quedaron en docs/noticias-prensa-2026-retiradas.js por si vuelven) y el
   sitio publica, por ahora, solo las novedades propias de la Cámara.
   Después de tocar este archivo: node scripts/generar-noticias.mjs */

window.NOTICIAS = [
  {
    id: "2026-10-encuentro-comerciantes",
    fecha: "2026-10-28",
    etiqueta: "Encuentros",
    titulo: "Primer encuentro con comerciantes y prestadores para pensar propuestas en conjunto",
    resumen: "En un contexto difícil y de mucha incertidumbre, la Cámara convocó a comerciantes, productores y prestadores de servicios a un mediodía de charla y diagnóstico, para sumar esfuerzos en propuestas que beneficien al turismo y al comercio del pueblo.",
    cuerpo: "Los disparadores fueron las propuestas y actividades turísticas, la infraestructura, los beneficios impositivos, los alquileres y la sostenibilidad de la actividad comercial, y el contexto general de baja del consumo. El encuentro se realizó el lunes 26 de octubre y se va a repetir próximamente, sumando más actores con ganas de involucrarse. Agradecemos la participación, el respeto y la predisposición para empujar juntos la actividad. Si te interesa participar de la próxima reunión, escribinos a info@camaravla.org.ar o por nuestras redes.",
    imagen: "assets/img/noticias/2026-10-encuentro-comerciantes.jpg",
    fuente: { nombre: "Instagram @camaravla, 28/10/2026", url: "https://www.instagram.com/p/DfCiYSnpIKJ/" }
  },
  {
    id: "2026-09-estacionalidad-entrevista",
    fecha: "2026-09-25",
    etiqueta: "Entrevista",
    titulo: "Estacionalidad: meses difíciles para el comercio antes del verano",
    resumen: "José Alberto Suárez anticipó un período complejo para comercios y servicios tras una temporada invernal que arrancó tarde, y describió el problema como estructural.",
    cuerpo: "Entre las causas mencionó la retracción del consumo, el aumento de costos de las pymes, la desaceleración de la construcción, el peso de los alquileres comerciales, la presión impositiva y los costos logísticos. Sostuvo que el pueblo no está preparado para un turismo masivo y volvió sobre la necesidad de actualizar la Carta Orgánica municipal, con un ente con autonomía presupuestaria, política y técnica. La nota completa, con las declaraciones textuales, está en La Angostura Digital.",
    imagen: "assets/img/noticias/2026-09-estacionalidad-entrevista.jpg",
    fuente: {"nombre":"La Angostura Digital, 25/09/2026","url":"https://www.laangosturadigital.com.ar/2026/09/25/jose-suarez-advirtio-por-la-estacionalidad-van-a-ser-meses-muy-complejos-para-el-comercio/"}
  }
];
