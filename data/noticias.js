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
    cuerpo: "Los disparadores fueron las propuestas y actividades turísticas, la infraestructura, los beneficios impositivos, los alquileres y la sostenibilidad de la actividad comercial, y el contexto general de baja del consumo. El encuentro se realizó el lunes 26 de octubre y se va a repetir próximamente, sumando más actores con ganas de involucrarse. Agradecemos la participación, el respeto y la predisposición para empujar juntos la actividad. Si te interesa participar de la próxima reunión, escribinos a secretariaccvla@gmail.com o por nuestras redes.",
    imagen: "assets/img/noticias/2026-10-encuentro-comerciantes.jpg",
    fuente: { nombre: "Instagram @camaravla, 28/10/2026", url: "https://www.instagram.com/p/DfCiYSnpIKJ/" }
  },
  {
    id: "2026-10-sorteo-dia-de-la-madre",
    fecha: "2026-10-27",
    etiqueta: "Comunidad",
    titulo: "Entregamos los premios del sorteo por el Día de la Madre",
    resumen: "Terminamos de entregar las órdenes de compra a las ganadoras del sorteo por el Día de la Madre. Pueden elegir entre los comercios adheridos para un nuevo regalo.",
    cuerpo: "Felicitaciones a las ganadoras, que ya tienen sus órdenes de compra para usar en cualquiera de los comercios adheridos al sorteo. Gracias nuevamente a quienes participaron y a los comercios que se sumaron a esta iniciativa. ¡Hasta la próxima!",
    imagen: "assets/img/noticias/2026-10-sorteo-dia-de-la-madre.jpg",
    fuente: { nombre: "Instagram @camaravla, 27/10/2026", url: "https://www.instagram.com/p/DfAIQZ-pSAW/" }
  },
  {
    id: "2025-12-el-privado-levante-su-voz",
    fecha: "2025-12-07",
    etiqueta: "Entrevista",
    titulo: "Es hora que el privado levante su voz para ser escuchado en la agenda del municipio y la provincia",
    resumen: "Al asumir la presidencia de la Cámara para el período 2025-2027, José Alberto Suárez planteó como objetivo central que el sector privado tenga más peso donde se toman las decisiones, ante el municipio y la provincia.",
    cuerpo: "En diálogo con La Angostura Digital, Suárez describió un contexto exigente para la economía local y nacional: la rápida implementación del nuevo esquema macroeconómico, los problemas históricos de logística y la incertidumbre de la revolución tecnológica. En lo local, señaló la falta de obras de agua, energía y saneamiento y la necesidad de equipos técnicos a la altura de un pueblo que creció mucho desde los tiempos de 3.000 habitantes. Como ejemplo de lo que se puede lograr, destacó el camino del Enviatur, que pasó de los conflictos de 2017 a reuniones periódicas, presupuesto claro y diálogo entre lo público y lo privado. Para los dos años de mandato, la Cámara se propone impulsar la participación privada, poner la infraestructura en agenda, consolidar la planificación estratégica con municipio y provincia y fortalecer la institucionalidad del Enviatur. La entrevista completa está en La Angostura Digital.",
    imagen: "assets/img/noticias/2025-12-sede-camara.jpg",
    fuente: { nombre: "La Angostura Digital, 07/12/2025", url: "https://www.laangosturadigital.com.ar/2025/12/07/es-hora-que-el-privado-levante-su-voz-para-ser-escuchado-por-la-agenda-de-los-gobiernos-municipal-y-provincial/" }
  },
  {
    id: "2026-09-estacionalidad-entrevista",
    fecha: "2026-09-25",
    etiqueta: "Entrevista",
    titulo: "José Suárez advirtió por la estacionalidad: van a ser meses muy complejos para el comercio",
    imagen: "assets/img/noticias/2026-09-villa-la-angostura-otono.jpg",
    resumen: "José Alberto Suárez anticipó un período complejo para comercios y servicios tras una temporada invernal que arrancó tarde, y describió el problema como estructural.",
    cuerpo: "Entre las causas mencionó la retracción del consumo, el aumento de costos de las pymes, la desaceleración de la construcción, el peso de los alquileres comerciales, la presión impositiva y los costos logísticos. Sostuvo que el pueblo no está preparado para un turismo masivo y volvió sobre la necesidad de actualizar la Carta Orgánica municipal, con un ente con autonomía presupuestaria, política y técnica. La entrevista completa está en La Angostura Digital.",
    fuente: {"nombre":"La Angostura Digital, 25/09/2026","url":"https://www.laangosturadigital.com.ar/2026/09/25/jose-suarez-advirtio-por-la-estacionalidad-van-a-ser-meses-muy-complejos-para-el-comercio/"}
  }
];
