/* Noticias del sitio. Hoy se edita a mano desde el repo (la pantalla de carga en
   el panel de gestión está pendiente). Orden: la más nueva primero se resuelve por
   fecha en el cliente, así que acá el orden no importa.

   Campos: id (único, sin espacios) · fecha (AAAA-MM-DD) · etiqueta ("Institucional",
   "Gestiones", "Comunicado", "Entrevista"...) · titulo · resumen · cuerpo (opcional)
   · imagen (ruta relativa a la raíz, opcional; nunca una imagen de un medio sin
   autorización) · fuente {nombre, url} o fuentes [{nombre, url}, ...] (opcional).

   Las notas de prensa se resumen con palabras propias y enlazan al medio: el texto
   original es de cada portal. Cargadas el 29/10/2026 a pedido de Pity.
   Las imágenes son fotos genéricas de Pexels (licencia Pexels: uso comercial y
   modificación permitidos, sin atribución obligatoria), elegidas por tema y
   recortadas a 1200×630; el número de foto de Pexels está en CLAUDE.md. */

window.NOTICIAS = [
  {
    id: "2026-10-ingresos-brutos-turismo",
    imagen: "assets/img/noticias/2026-10-ingresos-brutos-turismo.jpg",
    fecha: "2026-10-15",
    etiqueta: "Gestiones",
    titulo: "La Cámara pidió a la Provincia eliminar Ingresos Brutos para la actividad turística",
    resumen: "En una nota al gobernador Rolando Figueroa, la Cámara pidió que la eliminación anunciada del impuesto alcance también a las empresas que ya sostienen empleo, y una alícuota cero para el turismo de Villa La Angostura y la Región de los Lagos del Sur.",
    cuerpo: "La Provincia anunció el 7 de octubre que eliminará Ingresos Brutos desde 2028 para quienes incorporen trabajadores neuquinos. La Cámara respaldó la medida y planteó dos ampliaciones: que no se castigue a quienes ya mantienen sus nóminas, y que la alícuota del 0% que hoy rige para alojamiento y gastronomía en Alto Neuquén y Limay se extienda a los destinos turísticos del sur. Como fundamento citó la ocupación promedio del 33% en el invierno de 2024 y del 27% en septiembre, frente a salarios y costos fijos que se pagan los doce meses. La Comisión Directiva pidió una audiencia con el gobernador y con las áreas de Economía y Rentas.",
    fuentes: [
      { nombre: "La Angostura Digital, 15/10/2026", url: "https://www.laangosturadigital.com.ar/2026/10/15/la-camara-de-comercio-pidio-a-figueroa-eliminar-ingresos-brutos-para-el-turismo-de-villa-la-angostura-y-la-region/" },
      { nombre: "Diario Andino, 15/10/2026", url: "https://www.diarioandino.com.ar/noticias/2026/10/15/238484-la-camara-de-comercio-de-villa-la-angostura-pidio-eliminar-ingresos-brutos-para-las-actividades-turisticas" }
    ]
  },
  {
    id: "2026-10-congreso-iva-turismo",
    imagen: "assets/img/noticias/2026-10-congreso-iva-turismo.jpg",
    fecha: "2026-10-14",
    etiqueta: "Gestiones",
    titulo: "La Cámara llevó al Congreso el pedido de un IVA diferencial para el turismo",
    resumen: "El presidente José Alberto Suárez expuso ante la Comisión de Turismo de la Cámara de Diputados de la Nación tres propuestas para la competitividad de los destinos turísticos.",
    cuerpo: "Invitado por los diputados Pablo Todero y Mirna Gómez, Suárez planteó una alícuota diferencial de IVA para la actividad turística, un plan sostenido de infraestructura turística dentro de los futuros acuerdos fiscales entre Nación y provincias, y una revisión de la coparticipación que reconozca a las ciudades turísticas el costo de prestar servicios a una población temporal muy superior a la permanente. En la misma línea, la Cámara ya había pedido al Gobierno neuquino reducir Ingresos Brutos para el turismo.",
    fuente: { nombre: "La Angostura Digital, 14/10/2026", url: "https://www.laangosturadigital.com.ar/2026/10/14/jose-suarez-llevo-al-congreso-el-reclamo-de-villa-la-angostura-por-una-reduccion-del-iva-al-turistico/" }
  },
  {
    id: "2026-10-ordenanza-ruido-observaciones",
    imagen: "assets/img/noticias/2026-10-ordenanza-ruido-observaciones.jpg",
    fecha: "2026-10-13",
    etiqueta: "Concejo Deliberante",
    titulo: "Ocho observaciones al proyecto de ordenanza sobre ruido urbano",
    resumen: "La Cámara presentó al Concejo Deliberante una nota con ocho observaciones al proyecto que limita horarios y regula la música en bares y restaurantes. No cuestiona la necesidad de regular los ruidos molestos, sino cómo lo hace el texto.",
    cuerpo: "Entre los puntos planteados: el cierre máximo a las 2 de la madrugada para restaurantes, parrillas, confiterías y cafeterías no contempla la lógica de un destino turístico de temporada; los estudios de impacto acústico completos deberían exigirse solo a los establecimientos de alto impacto o cercanos a zonas sensibles, con declaración jurada y memoria técnica para el resto; las autorizaciones de música amplificada al aire libre deberían renovarse automáticamente para quienes cumplen; y hacen falta plazos máximos de resolución. La Cámara pidió ser convocada a una mesa de trabajo.",
    fuente: { nombre: "La Angostura Digital, 13/10/2026", url: "https://www.laangosturadigital.com.ar/2026/10/13/fuerte-controversia-por-un-proyecto-que-busca-limitar-horarios-y-regular-la-musica-en-bares-y-restaurantes-en-villa-la-angostura/" }
  },
  {
    id: "2026-09-estacionalidad-entrevista",
    imagen: "assets/img/noticias/2026-09-estacionalidad-entrevista.jpg",
    fecha: "2026-09-25",
    etiqueta: "Entrevista",
    titulo: "Estacionalidad: meses difíciles para el comercio antes del verano",
    resumen: "José Alberto Suárez anticipó un período complejo para comercios y servicios tras una temporada invernal que arrancó tarde, y describió el problema como estructural.",
    cuerpo: "Entre las causas mencionó la retracción del consumo, el aumento de costos de las pymes, la desaceleración de la construcción, el peso de los alquileres comerciales, la presión impositiva y los costos logísticos. Sostuvo que el pueblo no está preparado para un turismo masivo y volvió sobre la necesidad de actualizar la Carta Orgánica municipal, con un ente con autonomía presupuestaria, política y técnica.",
    fuente: { nombre: "La Angostura Digital, 25/09/2026", url: "https://www.laangosturadigital.com.ar/2026/09/25/jose-suarez-advirtio-por-la-estacionalidad-van-a-ser-meses-muy-complejos-para-el-comercio/" }
  },
  {
    id: "2026-07-reforma-carta-organica",
    imagen: "assets/img/noticias/2026-07-reforma-carta-organica.jpg",
    fecha: "2026-07-31",
    etiqueta: "Concejo Deliberante",
    titulo: "La Cámara propone una reforma parcial de la Carta Orgánica Municipal",
    resumen: "Presentó en el Concejo Deliberante un proyecto de ordenanza que declara la necesidad de reformar parcialmente la Carta Orgánica de 2009, con cuatro ejes y una Convención Municipal Constituyente de 14 convencionales.",
    cuerpo: "Los cuatro ejes: modernizar el régimen de compras y contrataciones y la transparencia, reemplazando la publicidad en papel por herramientas digitales; dar consecuencias efectivas al incumplimiento de las obligaciones de publicar información y rendir cuentas; definir quién garantiza el cumplimiento de la propia Carta; y revisar el régimen electoral, incluida la fecha de los comicios municipales respecto de los provinciales, con neutralidad para los mandatos en curso. El análisis identificó más de treinta artículos a revisar. La ordenanza declarativa requiere dos tercios del Concejo y prevé elegir los convencionales dentro de los 120 días de promulgada.",
    fuentes: [
      { nombre: "La Angostura Digital, 31/07/2026", url: "https://www.laangosturadigital.com.ar/2026/07/31/la-camara-de-comercio-promueve-reformar-en-forma-parcial-la-carta-organica-de-villa-la-angostura-los-detalles/" },
      { nombre: "Diario Andino, 31/07/2026", url: "https://www.diarioandino.com.ar/noticias/2026/07/31/236633-la-camara-de-comercio-propone-modificar-la-carta-organica-y-plantea-cuatro-ejes-para-actualizar-las-reglas-del-municipio" },
      { nombre: "Entrevista en La Angostura Digital, 06/08/2026", url: "https://www.laangosturadigital.com.ar/2026/08/06/modificacion-de-la-carta-organica-de-villa-la-angostura-tenemos-el-peor-de-los-dos-mundos-mucha-burocracia-y-poco-control/" }
    ]
  },
  {
    id: "2026-01-reforma-laboral-pymes-came",
    imagen: "assets/img/noticias/2026-01-reforma-laboral-pymes-came.jpg",
    fecha: "2026-01-30",
    etiqueta: "Gestiones",
    titulo: "Cámaras del interior piden a CAME una reforma laboral acorde a las pymes",
    resumen: "Junto con las cámaras de San Martín de los Andes, Villa Pehuenia, Aluminé y Centenario, la Cámara firmó una carta abierta al presidente de CAME, Ricardo Diab, con una posición propia sobre la reforma laboral.",
    cuerpo: "La carta, fechada en Villa La Angostura el 28 de enero, sostiene que los convenios colectivos por actividad no contemplan las diferencias regionales ni el tamaño de las empresas del interior, y que esa rigidez empuja a la informalidad. Pide habilitar la negociación por empresa sobre pisos legales, revisar la ultraactividad indefinida de los convenios, eliminar los aportes patronales obligatorios a las cámaras y un federalismo real dentro de CAME, con consulta previa a las cámaras regionales.",
    fuentes: [
      { nombre: "La Angostura Digital, 30/01/2026", url: "https://www.laangosturadigital.com.ar/2026/01/30/la-camara-de-comercio-de-villa-la-angostura-impulsa-una-reforma-laboral-acorde-a-la-realidad-de-las-pymes/" },
      { nombre: "Diario Andino, 30/01/2026", url: "https://www.diarioandino.com.ar/noticias/2026/01/30/233822-camaras-del-interior-se-distancian-de-came-y-reclaman-una-reforma-laboral-pyme" }
    ]
  },
  {
    id: "2026-01-falta-de-agua-temporada",
    imagen: "assets/img/noticias/2026-01-falta-de-agua-temporada.jpg",
    fecha: "2026-01-21",
    etiqueta: "Comunicado",
    titulo: "Reclamo por la falta de agua potable en plena temporada",
    resumen: "La Comisión Directiva reclamó al municipio y a la Provincia una solución urgente y definitiva ante varios días sin agua en distintos barrios del ejido, en plena temporada alta.",
    cuerpo: "El comunicado describe el problema como estructural y repetido año tras año, con impacto sobre los vecinos, los servicios esenciales, los comercios, alojamientos y gastronomía, y sobre la imagen del destino. Cuestiona la falta de planificación y previsión, que el municipio actúe solo ante la emergencia declarada, y que la urgencia se use para saltear procedimientos administrativos y criterios de transparencia. Pide planificación sostenida y un equipo técnico capaz de resolver los déficits de infraestructura.",
    fuentes: [
      { nombre: "La Angostura Digital, 21/01/2026", url: "https://www.laangosturadigital.com.ar/2026/01/21/fuerte-critica-de-la-camara-de-comercio-ante-la-crisis-por-la-falta-de-agua-en-plena-temporada/" },
      { nombre: "Diario Andino, 22/01/2026", url: "https://www.diarioandino.com.ar/noticias/2026/01/22/233724-sin-agua-y-sin-prevision-el-reclamo-de-la-camara-de-comercio-al-municipio-de-villa-la-angostura" }
    ]
  },
  {
    id: "2025-11-asamblea-nuevas-autoridades",
    imagen: "assets/img/noticias/2025-11-asamblea-nuevas-autoridades.jpg",
    fecha: "2025-11-26",
    etiqueta: "Institucional",
    titulo: "La Asamblea Ordinaria eligió la Comisión Directiva 2025-2027",
    resumen: "José Alberto Suárez fue elegido presidente. El mandato de la nueva Comisión Directiva y del órgano de fiscalización se extiende hasta el 26 de noviembre de 2027.",
    cuerpo: "La Asamblea Ordinaria del 26 de noviembre de 2025 designó a las nuevas autoridades de la Cámara, según constancia de la Inspección Provincial de Personas Jurídicas de Neuquén N° 06360/2025.",
    fuente: { nombre: "La Angostura Digital, 28/11/2025", url: "https://www.laangosturadigital.com.ar/2025/11/28/jose-suarez-es-el-nuevo-presidente-de-la-camara-de-comercio-de-villa-la-angostura/" }
  }
];
