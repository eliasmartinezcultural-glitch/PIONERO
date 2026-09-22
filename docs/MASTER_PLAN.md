# PIONERO — PLAN MAESTRO CENTRAL

> **V0.4.1 — NÚCLEO DE EXPERIENCIA CONSOLIDADO**
>
> Regla: **COMPLEJO PARA CONSTRUIR → SIMPLE PARA USAR.**

## VISIÓN

PIONERO es un viaje interactivo por la historia de San Patricio del Chañar.

Pregunta central:

**¿Cómo llegamos desde aquel Chañar hasta el Chañar de hoy?**

Flujo:

**abrir → entender → viajar → llegar → explorar → descubrir → ubicar → comparar → volver**

## ARQUITECTURA CENTRAL

PIONERO se organiza en motores separados, pero coordinados:

**EXPERIENCE → TIME → HISTORY → TERRITORY → MEDIA → SOURCES → EDUCATION → CORE**

La regla de integración es:

**una fuente de verdad por responsabilidad.**

### CORE

`js/core/state.js` es ahora el contrato central de estado de la experiencia:

- vista;
- momento histórico;
- panel activo;
- descubrimientos;
- persistencia;
- suscripción a cambios.

La interfaz no debe crear estados paralelos que compitan con este núcleo.

### HISTORY

La historia permanece en `js/history/model.js`.

La presentación permanece en `js/content.js`.

La validación permanece en `js/history/validate.js`.

### TERRITORY

El territorio permanece separado de la interfaz:

`TERRITORY MODEL → TERRITORY QUERIES → TERRITORY VIEW`

La representación sigue siendo esquemática hasta disponer de geometría documental suficiente.

## V0.4.1 — CONSOLIDACIÓN

Objetivo cumplido:

1. centralizar estado de experiencia;
2. eliminar fuentes paralelas de estado para navegación y progreso;
3. hacer mutuamente excluyentes descubrimiento, territorio y comparación;
4. endurecer validación de referencias de media y fuentes;
5. profundizar auditoría del contrato de interfaz;
6. alinear versiones internas;
7. mantener la experiencia externa simple;
8. conservar la arquitectura preparada para crecimiento.

## SIGUIENTE SALTO: V0.5 — FUENTES + MEMORIA

No consiste en llenar la interfaz de documentos.

Consiste en construir un sistema de procedencia:

- fuente;
- documento;
- fotografía;
- testimonio;
- autoría;
- institución;
- fecha;
- derechos de uso;
- registro histórico relacionado;
- estado de investigación.

La fuente debe poder explicar **por qué PIONERO afirma algo**.

## V0.6 — ANTES / AHORA

- pares espaciales;
- mismo lugar;
- misma orientación cuando sea posible;
- fotografía histórica + fotografía actual;
- diferencias verificables;
- relación directa con territorio.

## V0.7 — AUDIO + NARRATIVA

- narración;
- testimonios;
- ambiente;
- silencios;
- lectura documental.

## V0.8 — RECONSTRUCCIONES VISUALES

Reconstrucciones claramente etiquetadas y separadas de evidencia documental.

## V0.9 — EDUCACIÓN

- preguntas;
- descubrimientos;
- comparaciones;
- recorridos de aprendizaje;
- comprensión histórica sin convertir la experiencia en un examen.

## V1.0 — EXPERIENCIA HISTÓRICA COMPLETA

Tiempo + territorio + fuentes + memoria + comparación + narrativa + educación.

## V1.5 — EXPLORACIÓN AVANZADA

Profundización del mundo histórico sin aumentar innecesariamente la complejidad de uso.

## V2.0 — INMERSIÓN

360° / WebXR / experiencias inmersivas, sólo cuando el contenido documental y la arquitectura lo justifiquen.

## ORDEN OPERATIVO OBLIGATORIO

1. **AUDIT**
2. **DESIGN**
3. **BUILD**
4. **INTEGRATE**
5. **CURATE**
6. **VALIDATE**
7. **CONSOLIDATE**
8. **ADVANCE**

No se avanza por cantidad de funciones.

Se avanza cuando la capa anterior está estructuralmente cerrada.

## DEFINICIÓN DE TERMINADO

**integrado · funcional · validado · curado · documentado · preparado para la siguiente**

La próxima validación profesional debe ser de ejecución real en navegador: carga, recorrido completo de las 7 eras, descubrimientos, territorio, comparación, fuentes, teclado, Escape, persistencia y pantalla pequeña.

No se declara superada esa prueba hasta ejecutarla realmente.
## CONSTITUCIÓN MUNDIAL DE LA EXPERIENCIA

**BLOQUEADA — VIGENTE**

El documento rector es `docs/PROJECT_CONSTITUTION.md`.

PIONERO queda definido como una **máquina del tiempo territorial interactiva sobre San Patricio del Chañar**.

### Núcleo innegociable

**TIEMPO + TERRITORIO + CÁMARA + TRANSFORMACIÓN + COMPARACIÓN**

El usuario no debe simplemente seleccionar un año para leer una ficha. Al cambiar de época, el estado visual del territorio debe poder transformarse coordinadamente: relieve representado, agua, producción, caminos, asentamiento, edificios, hitos, medios y puntos de vista, siempre según evidencia disponible.

### Mecánicas visuales objetivo

- mismo lugar en distintas épocas;
- comparación fade;
- comparación swipe;
- spyglass;
- side-by-side;
- morphing cuando la evidencia lo permita;
- puntos de vista históricos;
- capas temporales;
- transiciones de territorio;
- reconstrucciones visuales diferenciadas de la evidencia;
- evolución futura hacia terreno, 3D, 360° y WebXR.

### Regla de dirección

**La interfaz acompaña al territorio. No compite con él.**

La experiencia debe sentirse como documental + viaje temporal + atlas vivo + memoria local + exploración.

### Investigación de referencia

El diseño se inspira conceptualmente en sistemas profesionales que demuestran navegación temporal, comparación espacial, capas sensibles al tiempo, reconstrucción de patrimonio y experiencias inmersivas. Las referencias sirven para aprender patrones, no para copiar productos.

### Nueva prioridad de desarrollo

Antes de ampliar contenido o agregar funciones secundarias, la evolución visual debe concentrarse en construir el **núcleo temporal-territorial**: estado temporal, transformación visual, cámara, comparación y continuidad espacial.