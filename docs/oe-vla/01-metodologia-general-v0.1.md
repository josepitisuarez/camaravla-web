# Observatorio Económico de Villa La Angostura (OE-VLA)
## Metodología general — versión 0.1 (borrador para revisión)

**Cámara de Comercio, Turismo, Industria y Producción de Villa La Angostura**
Villa La Angostura, 24 de septiembre de 2026

---

### 1. Objeto y alcance

El OE-VLA es un programa interno de la Cámara destinado a producir y publicar, con periodicidad mensual y a fecha fija, un conjunto acotado de indicadores sobre la economía de Villa La Angostura. No tiene personería propia ni depende de acto administrativo alguno. Su primer ciclo abarca doce (12) boletines mensuales; cumplido ese ciclo, la Cámara evaluará su continuidad, su ampliación y la eventual institucionalización mixta con el sector público, que queda expresamente fuera de esta fase.

Este documento fija las reglas del programa. Cada indicador tiene además una ficha técnica propia (Anexos I a IV) que describe su fuente, su cálculo y sus limitaciones. Ninguna cifra se publica antes de que este documento y la ficha correspondiente estén publicados.

### 2. Principios

1. **Fuentes verificables primero.** Se prioriza el registro administrativo público y reproducible por terceros (nivel 1) por sobre la estimación sectorial o el relevamiento propio (nivel 2). Cuando un indicador combina ambos, la serie de nivel 1 es la de referencia y la de nivel 2 se declara como tal.
2. **Metodología antes que dato.** La metodología y cada ficha se publican antes del primer boletín y se versionan. Un cambio de método se publica con fecha y se explica; la serie anterior no se reescribe.
3. **Publicación a fecha fija.** El boletín mensual sale el día 10 de cada mes, o el día hábil siguiente, con independencia del resultado. No se adelanta, no se demora y no se omite un mes porque el número sea desfavorable.
4. **Datos abiertos.** Cada boletín se publica con sus datos crudos en formato abierto (CSV), bajo licencia Creative Commons Atribución 4.0, con diccionario de campos.
5. **Nada se borra.** Cada boletín conserva su dirección permanente. Una corrección se publica como errata, con fecha, junto al boletín corregido; la versión original permanece accesible.
6. **Anonimato de los informantes.** Ningún dato se publica de forma que permita identificar a un establecimiento o comercio informante. El mínimo de publicación por estrato es de tres (3) informantes.

### 3. Indicadores del primer ciclo

| Indicador | Qué mide | Fuente principal | Nivel | Frecuencia | Rezago de la fuente |
|---|---|---|---|---|---|
| **I. Flujo turístico** | Movimiento de personas hacia la región | Cruces por el Paso Cardenal Samoré (registros de la Policía de Investigaciones de Chile, publicados por SERNATUR e INE Chile) · pasajeros en los aeropuertos de Bariloche y Chapelco (ANAC) · visitas a parques nacionales de la región Patagonia (APN) | 1 | Mensual | 1,5 a 3 meses |
| **II. Ocupación de alojamiento** | Uso efectivo de la oferta local | Panel fijo de establecimientos de Villa La Angostura, estratificado por tipo de alojamiento (nivel 2), calibrado contra la Encuesta de Ocupación Hotelera del INDEC, que releva la localidad (nivel 1) | 2 / 1 | Mensual | Panel: 10 días · EOH: 3-4 meses |
| **III. Precios** | Costo de vida de un hogar residente | Canasta Básica VLA de 44 productos (Anexo II), relevada en comercios locales (nivel 2) · precios diarios declarados por las grandes cadenas al SEPA para la sucursal de Villa La Angostura (nivel 1) · combustible (Secretaría de Energía, nivel 1) · comparación con el IPC de Neuquén | 2 / 1 | Mensual | Relevamiento: 10 días · SEPA: 1 día · IPC-NQN: ~14 días |
| **IV. Alquileres** | Relación entre alquiler turístico y permanente | Consulta a las inmobiliarias locales y conteo de oferta en plataformas | 2 | Trimestral | 10 días |

El índice de gasto por turista (IGT-VLA) queda fuera del primer ciclo por falta de capacidad de relevamiento en campo.

### 4. Jerarquía de fuentes

**Nivel 1:** registro administrativo de acceso público, producido por un organismo sin interés en el resultado local y reproducible por cualquier persona a partir de la dirección publicada en la ficha del indicador. **Nivel 2:** relevamiento propio de la Cámara o fuente privada; se publica con su protocolo, su cobertura y sus sesgos conocidos.

Toda fuente utilizada figura en el sitio del Observatorio con su dirección, organismo, frecuencia, rezago y nivel. Si una fuente de nivel 1 deja de publicarse, el indicador se marca como interrumpido; no se reemplaza por una estimación sin declararlo.

### 5. Calendario mensual

| Días | Actividad | Responsable |
|---|---|---|
| 1 a 5 | Envío del formulario al panel de ocupación (día 1, seguimiento días 3 y 5) · relevamiento presencial de precios · carga en la planilla maestra | Secretaría |
| Continuo | Captura automática de fuentes públicas (SEPA diario, combustible, series mensuales) | Servidor de la Cámara |
| 6 a 8 | Cálculo de indicadores, tablero y borrador del boletín | Servidor + Secretaría |
| 9 | Revisión del borrador | Presidencia |
| **10** | **Publicación** del boletín, los datos crudos y la actualización del sitio | Presidencia |
| Trimestral | Boletín trimestral con revisión externa; indicador IV | Presidencia + revisor externo |

La comparación con el IPC de Neuquén se hace contra el último mes publicado por la Dirección Provincial de Estadística y Censos, que sale después del día 10; el boletín lo indica en cada caso.

### 6. Gobernanza

- **Responsable del programa:** la Presidencia de la Cámara. Decide qué se publica, firma el boletín y responde por él.
- **Operación:** la Secretaría de la Cámara, según el Manual de rutina mensual (Anexo V). Dedicación prevista: dos jornadas y media por mes.
- **Revisor externo:** un investigador universitario, designado por convenio o carta de intención, recibe el boletín trimestral con sus datos crudos y planillas, verifica que los cálculos y comparaciones respeten esta metodología y emite un dictamen breve. **El dictamen se publica completo junto al boletín, incluidas las observaciones que la Cámara no comparta. El revisor no tiene veto.** Revisor designado: `____`.
- **Conflictos de interés declarados.** La Cámara representa a parte de los sectores que mide; por eso los indicadores de referencia son de nivel 1 y la publicación es a fecha fija. El Presidente de la Cámara es armador de embarcaciones de excursión en el Parque Nacional Nahuel Huapi: ningún dato originado en su actividad se usa como cifra principal de ningún indicador, y si se usa como serie complementaria, se declara.

### 7. Publicación y datos abiertos

El Observatorio publica en `camaravla.org.ar/observatorio`: el boletín mensual (HTML y PDF, dirección permanente), la metodología vigente y sus versiones anteriores, las fichas por indicador, los datos crudos en CSV con diccionario de campos, la lista de fuentes, la composición del panel por estrato (sin nombres) y los dictámenes del revisor externo. Licencia de los datos: CC BY 4.0. Cita sugerida: *OE-VLA, Cámara de Comercio, Turismo, Industria y Producción de Villa La Angostura, boletín N° __, mes/año.*

### 8. Limitaciones declaradas

- El flujo por el Paso Cardenal Samoré mide movimiento binacional por la región, no visitantes a Villa La Angostura; una parte no cuantificada sigue viaje.
- La Administración de Parques Nacionales no publica series por parque; el Observatorio usa la serie regional Patagonia como contexto y gestiona el dato del Parque Nacional Nahuel Huapi por vía institucional.
- El panel de ocupación cubre establecimientos formales; el alojamiento informal se aproxima por el indicador IV.
- En Villa La Angostura una sola cadena declara precios al SEPA. La serie automática mide esa cadena, no el conjunto del comercio local; el relevamiento presencial cubre el resto.
- La ponderación del índice de ocupación por plazas requiere el padrón municipal de alojamientos habilitados, `____`; hasta obtenerlo, la ponderación es provisoria y se declara.

### 9. Vigencia y revisión

Esta versión rige desde su publicación. Se revisa al cierre del duodécimo boletín, o antes si el revisor externo lo recomienda por escrito. Toda modificación produce una nueva versión numerada con fecha y nota de cambios.

---

**José Alberto Suárez**
Presidente
Cámara de Comercio, Turismo, Industria y Producción de Villa La Angostura

*Anexos: I. Ficha del indicador Flujo turístico · II. Ficha del indicador Precios (Canasta Básica VLA, abril 2026, a actualizar) · III. Ficha del indicador Ocupación · IV. Ficha del indicador Alquileres · V. Manual de rutina mensual · VI. Diccionario de datos.*

---

*Datos a completar antes de la versión 1.0:* revisor externo designado (§6) · padrón de plazas por categoría (§8) · fecha del primer boletín.
