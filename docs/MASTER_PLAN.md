# PIONERO — PLAN MAESTRO CENTRAL

> **Estado operativo: V0.3.1**
>
> Regla: **COMPLEJO PARA CONSTRUIR → SIMPLE PARA USAR.**

## VISIÓN

PIONERO es un viaje interactivo por la historia de San Patricio del Chañar. No busca ser una enciclopedia ni una línea de tiempo convencional.

Flujo objetivo:

**abrir → entender → viajar → llegar → explorar → descubrir → comparar → volver**

Pregunta central:

**¿Cómo llegamos desde aquel Chañar hasta este Chañar?**

## LEY MUNDIAL DE DESARROLLO

### Prohibido
- parches aislados;
- sistemas duplicados;
- regresiones;
- inventar historia;
- interfaz técnica innecesaria;
- avanzar de versión por cambios cosméticos.

### Obligatorio
- auditar;
- diseñar;
- construir;
- integrar;
- curar;
- validar;
- consolidar;
- recién después avanzar.

## V0.3 — MOTOR HISTÓRICO

### Capas cerradas o implementadas
**REGISTRY → ENTIDADES → RELACIONES → FUENTES → VALIDACIÓN → CONSULTAS**

### V0.3.1 — EXPERIENCIA HISTÓRICA CONECTADA

Se incorporó:

- rail temporal único derivado de `HISTORY.eras`;
- navegación anterior/siguiente;
- fichas genéricas de entidades;
- relaciones derivadas del registry;
- fuentes dinámicas;
- resumen de estado de investigación;
- cola interna `researchQueue()`;
- estructura de medios con `mediaIds`;
- escape HTML en contenido dinámico;
- progreso basado en el número real de huellas.

### Arquitectura de medios

El modelo ya reserva `media` como entidad independiente. Cada entidad histórica puede referenciar `mediaIds`; las relaciones `depicts` permitirán conectar material sin meter URLs o lógica multimedia dentro de las escenas.

Campos recomendados para el siguiente ciclo:
- id
- title
- kind
- status
- url
- alt
- credit
- sourceIds
- entityIds

No cargar medios históricos no verificados sólo para hacer más espectacular la interfaz.

### Cola de investigación

Los registros `partial` y `pending` son deuda de investigación visible para el sistema pero no deben presentarse al visitante como hechos cerrados.

## V0.4 — MOTOR TERRITORIAL

Siguiente gran salto:

**TIEMPO → TERRITORIO**

Construir una capa espacial capaz de relacionar:
- lugares;
- caminos;
- río;
- edificios;
- paisaje;
- producción;
- crecimiento urbano;
- transformaciones.

El visitante deberá poder comprender no sólo cuándo ocurrió algo, sino dónde y cómo cambió ese lugar.

## V0.5 — FUENTES + MEMORIA

Construir ficha profunda de fuente, documentos, fotografías, testimonios, procedencia y atribución.

## V0.6 — ANTES / AHORA

Comparaciones sólo cuando exista material histórico y actual verificable para el mismo lugar.

## V0.7 — AUDIO + NARRATIVA

Narración, ambientes, testimonios y diseño sonoro como parte del relato.

## V0.8 — RECONSTRUCCIONES

Reconstrucciones visuales claramente etiquetadas.

## V0.9 — EDUCACIÓN

Aprender mediante exploración, no mediante una interfaz escolar pesada.

## V1.0 — EXPERIENCIA HISTÓRICA COMPLETA

Historia + territorio + fuentes + memoria + experiencia + comparación + narrativa.

## V1.5

Exploración avanzada y recorridos temáticos.

## V2.0

360°, WebXR, AR y recorridos físicos mediante QR, sólo después de consolidar la base.

## DEFINICIÓN DE TERMINADO

Un hito sólo queda cerrado cuando:

**integrado · funcional · validado · curado · documentado · preparado para la siguiente**

Antes de declarar V0.3 cerrado corresponde realizar una auditoría funcional completa y, si el entorno lo permite, una verificación de navegador.