/* Noticias del sitio. Hoy se edita a mano desde el repo (la pantalla de carga en
   el panel de gestión está pendiente). Orden: la más nueva primero se resuelve por
   fecha en el cliente, así que acá el orden no importa.

   Campos: id (único, sin espacios) · fecha (AAAA-MM-DD) · etiqueta ("Institucional",
   "Gestiones", "Comunicado", "Encuentros"...) · titulo · resumen · cuerpo (opcional)
   · imagen (ruta relativa a la raíz, opcional; fotos propias de la Cámara, por
   ejemplo las de su Instagram @camaravla) · fuente {nombre, url} o fuentes
   [{nombre, url}, ...] (opcional).

   Nota larga (17/11/2026): en vez de `cuerpo`, `bloques`: una lista de { h: "subtítulo" }
   · { p: "párrafo" } · { lista: [...] } · { pasos: [...] } (numerada) ·
   { tabla: { columnas: [...], filas: [[...], ...] } } · { aviso: "recuadro" } ·
   { chico: "letra chica" }. Dentro del texto solo vale **negrita**. El listado
   muestra el resumen y un enlace a la nota completa. Sin `imagen`, la vista previa
   usa assets/img/og/noticia-<id>.png (tarjeta de texto, scripts/og).

   29/10/2026 (Pity): se retiraron las ocho notas de prensa con fotos genéricas
   (quedaron en docs/noticias-prensa-2026-retiradas.js por si vuelven) y el
   sitio publica, por ahora, solo las novedades propias de la Cámara.
   Después de tocar este archivo: node scripts/generar-noticias.mjs */

window.NOTICIAS = [
  {
    id: "2026-11-fondo-asistencia-laboral",
    fecha: "2026-11-17",
    etiqueta: "Laboral",
    titulo: "Fondo de Asistencia Laboral (FAL): qué deben hacer los empleadores antes del 1 de diciembre",
    resumen: "El 1 de diciembre de 2026 entra en vigencia el Fondo de Asistencia Laboral (FAL) y todo empleador privado debe tener elegido el fondo que administrará sus aportes. La Cámara de Comercio, Turismo, Industria y Producción de Villa La Angostura resume en esta nota qué es el régimen, cuánto se aporta y qué pasos conviene dar antes de esa fecha.",
    bloques: [
      { p: "Quien no elija a tiempo no queda fuera del sistema: se le asigna un fondo de oficio, sin posibilidad de comparar condiciones." },

      { h: "Qué es el FAL" },
      { p: "El FAL es una cuenta de inversión a nombre de cada empleador, creada por la Ley de Modernización Laboral 27.802, que acumula aportes mensuales para afrontar el costo de las desvinculaciones laborales. No reemplaza ni elimina la indemnización: es una herramienta para financiarla." },
      { lista: [
        "**Quiénes están alcanzados:** los empleadores del sector privado, incluidas las mipymes y las entidades sin fines de lucro que tengan personal en relación de dependencia.",
        "**Quiénes quedan fuera:** el sector público, la industria de la construcción (que tiene su propio fondo de cese) y el personal de casas particulares.",
        "**Qué cubre:** conceptos de la Ley de Contrato de Trabajo como preaviso, integración del mes de despido e indemnización por antigüedad, entre otros.",
        "**Qué trabajadores:** solo los registrados con al menos 12 meses de antelación al fin de la relación laboral. El trabajo no registrado no tiene cobertura.",
        "**Si el saldo no alcanza:** la diferencia sigue a cargo del empleador, que además decide si usa todo, una parte o nada de lo acumulado."
      ] },

      { h: "Fechas clave" },
      { p: "El régimen debía empezar el 1 de junio de 2026 y fue postergado dos veces; la fecha vigente es el 1 de diciembre de 2026." },
      { tabla: {
        columnas: ["Fecha", "Qué ocurre", "Norma"],
        filas: [
          ["1 de diciembre de 2026", "Entra en vigencia el FAL; fecha de referencia para tener elegido el fondo", "Decreto 1228/2026"],
          ["Período diciembre de 2026", "Primer mes por el que se aporta", "RG ARCA 5907/2026, adaptada por la RG 5915/2026"],
          ["Enero de 2027", "Vence el primer aporte, junto con las cargas sociales", "RG ARCA 5907/2026"],
          ["Junio y diciembre de cada año", "Únicas ventanas para cambiar de entidad, con seis meses como mínimo entre cambios", "RG CNV 1167/2026"]
        ]
      } },
      { p: "La reglamentación pide que el fondo esté informado a ARCA antes de presentar la declaración jurada de cargas sociales de diciembre. La Cámara recomienda no usar ese margen y llegar al 1 de diciembre con el trámite hecho." },

      { h: "Cuánto se aporta" },
      { p: "El aporte no es un costo adicional: se descuenta de las contribuciones patronales que la empresa ya paga." },
      { tabla: {
        columnas: ["Empleador", "Alícuota sobre las remuneraciones"],
        filas: [
          ["Mipyme con certificado MiPyME vigente", "2,5 %"],
          ["Resto del sector privado", "1 %"]
        ]
      } },
      { lista: [
        "**Certificado MiPyME:** sin certificado vigente, ARCA aplica el 1 % aunque la empresa sea pyme. Conviene revisar su vencimiento antes de diciembre.",
        "**Entidades sin fines de lucro:** pueden acceder a la alícuota de mipyme si obtienen la calificación correspondiente ante ARCA.",
        "**Excepción:** las relaciones incluidas en el Régimen de Incentivo a la Formalización Laboral no tienen la reducción de contribuciones."
      ] },

      { h: "Cómo adherir, paso a paso" },
      { p: "La adhesión se hace en dos lugares: ante la entidad financiera elegida y en el sitio de ARCA." },
      { pasos: [
        "**Declarar la condición de empleador privado** en Simplificación Registral de ARCA.",
        "**Elegir una entidad habilitada por la Comisión Nacional de Valores (CNV)** y uno de sus fondos. La entidad abre la cuenta del empleador y le asigna un número de identificación, el ID FAL.",
        "**Cargar el ID FAL en Simplificación Registral** antes del primer aporte. ARCA lo valida con los datos de la CNV.",
        "**Declarar y pagar con el formulario F.931**, en el mismo vencimiento que las cargas sociales. El sistema calcula el aporte y lo resta de las contribuciones patronales.",
        "**Adecuar la liquidación de sueldos** con el contador o estudio que la tenga a cargo."
      ] },
      { p: "Para comparar opciones, cada fondo publica todos los meses una Ficha FAL con su política de inversión, la composición de la cartera, el rendimiento neto de honorarios y la calificación de riesgo. Como solo se puede cambiar de entidad en junio y diciembre, la primera elección importa." },

      { h: "Qué pasa si no se elige y cuándo se puede usar el dinero" },
      { p: "El empleador que no informe un fondo recibe uno asignado de oficio y, hasta que eso ocurra, ARCA retiene el aporte sin derivarlo a ninguna cuenta. La omisión también puede dar lugar a sanciones por incumplimiento de deberes formales." },
      { p: "Lo acumulado no está disponible de inmediato. El Decreto 1228/2026 elevó la carencia de seis a doce períodos mensuales completos y consecutivos, contados desde el primer aporte. Para quien empiece con el período diciembre de 2026, el fondo recién podrá usarse hacia comienzos de 2028; hasta entonces, las indemnizaciones se pagan como hasta ahora." },

      { h: "Recomendaciones de la Cámara" },
      { lista: [
        "Hablar esta semana con el contador o estudio que liquida los sueldos para definir quién hace cada paso.",
        "Verificar que el certificado MiPyME esté vigente, porque define la alícuota.",
        "Pedir la Ficha FAL de al menos dos o tres entidades y comparar comisiones y política de inversión antes de firmar.",
        "Incluir el aporte en la planificación financiera de 2027, teniendo en cuenta que el fondo no podrá usarse durante el primer año."
      ] },
      { aviso: "Esta nota es informativa y no reemplaza el asesoramiento profesional ni constituye una recomendación de inversión. Los socios pueden acercar sus consultas a la Cámara." },

      { h: "Fuentes" },
      { p: "Normas: Ley 27.802 (Título II), Decreto 408/2026, Decreto 1228/2026, RG ARCA 5907/2026 y 5915/2026, RG CNV 1167/2026." }
    ],
    fuentes: [
      { nombre: "iProfesional: Prorrogan el FAL, más tiempo para adherir", url: "https://www.iprofesional.com/impuestos/466986-prorrogan-fal-hasta-cuando-podran-adherir-empresas" },
      { nombre: "La Nación: el Gobierno postergó a diciembre el debut del FAL", url: "https://www.lanacion.com.ar/sociedad/el-gobierno-postergo-hasta-diciembre-la-puesta-en-marcha-de-los-fondos-de-asistencia-laboral-nid20102026/" },
      { nombre: "Fortress Consulting: cómo adherir al FAL, paso a paso", url: "https://fortressconsulting.com.ar/fal/como-adherir" },
      { nombre: "WS y Asociados: FAL, qué es y desde cuándo rige", url: "https://wsyasociados.com.ar/fondo-asistencia-laboral-fal-empresas/" }
    ]
  },
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
