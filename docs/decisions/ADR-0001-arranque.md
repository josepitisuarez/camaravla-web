# ADR-0001: Sitio estático sin CMS, con el Observatorio como sección

- **Fecha:** 2026-09-24
- **Estado:** aceptada

## Contexto
La Cámara no tenía sitio activo (el de 2020, `camaradecomerciovla.org.ar`, está
caído). El Observatorio Económico OE-VLA necesita una URL institucional fija
para cumplir sus propias reglas: metodología publicada antes del primer dato y
datos crudos junto con cada boletín. La restricción que manda es de personas,
no de dinero: lo opera Pity con una secretaria (2,5 jornadas/mes para todo el
Observatorio). Cualquier pieza que exija mantenimiento humano periódico muere.

## Decisión
- Un sitio de la Cámara en `camaravla.org.ar` (coincide con el Instagram
  @camaravla), con el Observatorio como sección `/observatorio`, no como sitio
  aparte. Dominio a nombre de la Cámara (CUIT 30-67296347-4), registrado por
  Pity en NIC.ar.
- Sitio **estático puro**, sin CMS ni framework. Los contenidos que cambian
  (noticias, números del Observatorio) viven en `data/*.js` y los regenera
  SERVIL; las páginas fijas las edita Pity.
- Hosting en Cloudflare Pages (gratis) con **cuenta propia de la Cámara**.
  Correo `info@camaravla.org.ar` por reenvío gratuito, no casilla paga, hasta
  que haga falta.
- Rotativa de noticias en el inicio alimentada desde un canal que la secretaria
  ya use (Telegram propuesto; decisión en standby). Nada de "sección de
  novedades" que envejezca.
- Estatuto fuera del sitio; nombre registral solo en el pie.

## Alternativas consideradas
- **WordPress / Wix:** descartado. Una interfaz más que mantener, actualizar y
  asegurar, y un lugar más donde la secretaria puede equivocarse.
- **Sitio propio del Observatorio (`observatoriovla.org.ar`):** descartado para
  esta fase. Sin la marca Cámara no tiene peso; se reconsidera si nace la
  figura mixta con el municipio (fase dos, tras 12 meses de series).
- **Espejo de Instagram como fuente de noticias:** descartado. Token de Meta que
  vence cada 60 días y texto que no es de sitio institucional.
- **Datos en JSON con `fetch`:** descartado porque no se puede revisar desde
  `file://` sin servidor local, y en la PC de Pity no hay Node ni Python.
- **Usar la cuenta de Cloudflare existente (grupocaldas.com.ar):** descartado.
  La administra Joaquín; doctrina 5 de independencia técnica.

## Consecuencias
- Costo mensual ≈ solo el dominio (~$8.500/año). Cero por hosting.
- Toda edición de página fija pasa por git; no hay panel. Es deliberado.
- Hay que construir el generador de `data/*.js` en SERVIL y documentarlo el
  mismo día (doctrina 4).
- Riesgo a vigilar: pedidos futuros de "portal de socios con login". Implican
  base de datos y mantenimiento; se aceptan solo con alguien que los sostenga.
