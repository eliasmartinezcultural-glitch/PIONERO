# PIONERO — PLAN MAESTRO CENTRAL DE DESARROLLO

> **Estado: BLOQUEADO COMO HOJA DE RUTA OPERATIVA**
>
> Regla rectora: **COMPLEJO PARA CONSTRUIR → SIMPLE PARA USAR.**

Este documento es la referencia central de trabajo de PIONERO. Su función es evitar improvisaciones, parches, retrocesos y decisiones aisladas. Antes de modificar el proyecto, el trabajo debe ubicarse dentro de esta hoja de ruta.

---

## 1. VISIÓN

**PIONERO — Viaje por la historia de San Patricio del Chañar**

No será una línea de tiempo convencional. Será una experiencia interactiva de viaje temporal que permita:

**abrir → entender → viajar → llegar → explorar → descubrir → comparar → volver**

La complejidad estará en los motores internos. La experiencia pública debe ser simple, clara, bella y emocional.

Pregunta central:

> **¿Cómo llegamos desde aquel Chañar hasta este Chañar?**

Objetivo emocional:

> **“Nunca había visto la historia de mi pueblo de esta manera.”**

---

## 2. LEY MUNDIAL DE DESARROLLO

### Prohibido
- Parchar una función aislada.
- Remendar conflictos sin revisar la arquitectura.
- Retroceder de una versión estable.
- Agregar funciones porque “quedan lindas”.
- Inventar hechos históricos para llenar escenas.
- Duplicar lógica o crear sistemas paralelos.
- Sacrificar estabilidad por velocidad aparente.
- Convertir la interfaz en un tablero técnico.

### Obligatorio
- Diseñar primero la estructura.
- Integrar cada cambio con el sistema existente.
- Mantener una única fuente de verdad para cada dato.
- Validar dependencias antes de modificar archivos.
- Probar el flujo completo después de cambios importantes.
- Dejar cada hito funcional y preparado para el siguiente.
- Documentar decisiones estructurales.
- Priorizar curaduría, coherencia y calidad sobre cantidad.

**Regla práctica: si una solución requiere un parche, primero revisar si el problema pertenece a la arquitectura.**

---

## 3. PRINCIPIOS DE PRODUCTO

1. **Una historia local, no una enciclopedia.**
2. **Descubrir antes que leer.**
3. **Territorio antes que interfaz.**
4. **Evidencia antes que espectacularidad.**
5. **Emoción sin perder rigor.**
6. **Simple para el visitante; profundo para el sistema.**
7. **Mobile-first y accesible.**
8. **La tecnología debe desaparecer detrás de la experiencia.**
9. **Cada elemento debe tener una función narrativa.**
10. **PIONERO debe poder crecer sin reconstruirse.**

---

## 4. ARQUITECTURA OBJETIVO

### EXPERIENCE
Controla la experiencia visible:
- bienvenida
- viaje
- llegada
- exploración
- descubrimiento
- comparación
- regreso

### TIME ENGINE
Controla:
- eras
- fechas
- secuencia
- navegación temporal
- transiciones
- posición temporal del visitante

### HISTORY ENGINE
Controla entidades históricas:
- eventos
- personas
- lugares
- instituciones
- objetos
- relaciones

### TERRITORY ENGINE
Controla:
- territorio
- paisaje
- caminos
- río
- edificios
- producción
- crecimiento urbano
- transformaciones espaciales

### MEDIA ENGINE
Controla:
- fotografías
- mapas
- audio
- video
- documentos
- reconstrucciones
- 360°

### SOURCES ENGINE
Controla:
- fuentes
- procedencia
- evidencia
- estado de investigación
- confianza
- atribución

### EDUCATION ENGINE
Controla:
- preguntas
- descubrimientos
- comparaciones
- recorridos educativos
- modo escuela

### CORE
Controla:
- estado de la aplicación
- navegación
- persistencia
- accesibilidad
- validaciones
- configuración

---

# 5. MODELO DE DATOS CENTRAL

La experiencia nunca debe depender de textos o escenas codificadas directamente en la interfaz.

La estructura objetivo es:

**ERA → EVENTO → PERSONA / LUGAR / INSTITUCIÓN / OBJETO → MEDIA → FUENTE**

Entidades mínimas:

- eras
- events
- people
- places
- institutions
- objects
- relations
- media
- sources

Cada entidad deberá tener identidad estable mediante IDs.

Las relaciones también serán datos. No se resolverán manualmente dentro de la interfaz.

---

# 6. REGLA HISTÓRICA

Cada pieza de contenido debe declarar su naturaleza:

- **DOCUMENTADO** — respaldado por una fuente identificable.
- **TESTIMONIO** — memoria oral identificada como testimonio.
- **RECONSTRUCCIÓN** — representación visual construida a partir de evidencia.
- **INTERPRETACIÓN** — recurso didáctico que no pretende ser una reproducción literal.

Nunca presentar una reconstrucción como fotografía histórica.

Nunca completar huecos con invención.

Cuando algo todavía no esté investigado, el sistema debe poder decir **PENDIENTE DE INVESTIGACIÓN**.

---

# 7. HOJA DE RUTA BLOQUEADA

## V0.1 — MOTOR DEL VIAJE
**Objetivo:** establecer el flujo base.

Estado: **CERRADO**

Debe permitir:
- abrir
- entender
- elegir época
- viajar
- llegar
- explorar
- descubrir
- volver

---

## V0.2 — EXPERIENCIA + CONTENIDO DESACOPLADO
**Objetivo:** separar contenido de lógica y establecer persistencia.

Estado: **BASE IMPLEMENTADA**

Debe contener:
- contenido separado
- estados de evidencia
- puntos de descubrimiento
- progreso local
- escenas visuales
- estructura responsive
- criterio de fuentes

---

## V0.3 — MOTOR HISTÓRICO
**EN CONSTRUCCIÓN ACTIVA**

No consiste en agregar más años.

Consiste en convertir PIONERO en una máquina capaz de relacionar información histórica.

### Construir
1. Registro central de entidades.
2. IDs estables.
3. Eras.
4. Eventos.
5. Personas.
6. Lugares.
7. Instituciones.
8. Objetos.
9. Relaciones.
10. Fuentes.
11. Estados de investigación.
12. Validador de datos.
13. Normalizador de registros.
14. Motor de consultas internas.
15. Renderizado genérico de descubrimientos.

### Resultado esperado

Agregar un nuevo acontecimiento histórico no debe exigir reescribir la interfaz.

### Núcleo construido

- `js/history/model.js` — modelo histórico central.
- `js/history/schema.js` — tipos, campos obligatorios y relaciones permitidas.
- `js/history/registry.js` — registro, indexación y resolución genérica de entidades.
- `js/history/queries.js` — consultas de eventos, fuentes, relaciones, búsqueda y línea temporal.
- `js/history/validate.js` — validación estructural de IDs, evidencia, estados, fuentes, eras y relaciones.
- `js/content.js` — capa visual desacoplada que referencia entidades históricas.
- `js/app.js` — integración del motor con la experiencia.

### Contenido histórico inicial integrado

El modelo ya incorpora hitos investigados para 1968, 1969, 1973, 1974 y 1975, con estados de investigación y fuentes asociadas. Los elementos con documentación incompleta permanecen como `partial` y no se presentan como hechos cerrados.

El siguiente trabajo de V0.3 es llevar estas relaciones al diseño de experiencia: navegación temporal más rica, fichas de entidades, fuentes navegables y primeras comparaciones reales, sin duplicar la fuente de verdad.

---

## V0.4 — MOTOR TERRITORIAL

El tiempo deberá poder transformar el espacio.

Construir:
- capas territoriales
- lugares históricos
- caminos
- paisaje
- edificios
- crecimiento
- relaciones espaciales
- representación antes/después

Resultado:

**el visitante no solamente viaja por años; viaja por un territorio que cambia.**

---

## V0.5 — FUENTES + MEMORIA

Construir una capa seria de investigación:

- documentos
- fotografías
- archivos
- fuentes institucionales
- testimonios
- procedencia
- estado de verificación
- ficha de fuente
- atribución

Estados internos recomendados:

**VERIFICADO → PARCIAL → PENDIENTE**

La interfaz pública seguirá siendo simple.

---

## V0.6 — ANTES / AHORA

Construir comparación histórica real:

- fotografía histórica ↔ fotografía actual
- mapa histórico ↔ mapa actual
- lugar pasado ↔ lugar presente
- edificio pasado ↔ estado actual
- paisaje pasado ↔ paisaje actual

No activar comparaciones falsas: cada comparación deberá tener material válido asociado.

---

## V0.7 — AUDIO + NARRATIVA

Construir:

- narración
- ambientes
- testimonios
- pausas
- diseño sonoro
- lectura opcional

El audio no será decoración. Será parte del relato.

---

## V0.8 — RECONSTRUCCIÓN VISUAL

Cuando exista suficiente evidencia:

- reconstrucciones de escenas
- objetos
- edificios
- paisajes
- vestimenta
- actividades
- transiciones temporales

Toda reconstrucción conservará su etiqueta de naturaleza histórica.

---

## V0.9 — EDUCACIÓN

Construir un modo educativo sin convertir la experiencia principal en una aplicación escolar.

Elementos:
- preguntas
- descubrimientos
- recorridos
- pistas
- comparación
- aprendizaje por exploración
- cierre/reflexión

---

## V1.0 — PIONERO COMPLETO

Criterio de cierre:

**historia + territorio + fuentes + memoria + experiencia + comparación + narrativa**

Todo integrado.

No se considera V1.0 por cantidad de pantallas, sino por coherencia del sistema.

---

## V1.5 — EXPLORACIÓN AVANZADA

Después de consolidar V1.0:

- exploración más libre
- mapas interactivos
- navegación espacial
- capas profundas
- recorridos temáticos
- mayor interacción

---

## V2.0 — EXPERIENCIA INMERSIVA

Sólo después de tener una base histórica sólida:

- 360°
- WebXR
- realidad aumentada
- reconstrucciones inmersivas
- recorridos físicos mediante QR
- posibles experiencias de museo/turismo

**La inmersión nunca reemplaza la investigación.**

---

# 8. ORDEN DE TRABAJO EN CADA VERSIÓN

Cada hito se ejecutará siempre en este orden:

### 1. AUDITORÍA
Revisar:
- arquitectura actual
- archivos
- dependencias
- estado funcional
- inconsistencias
- deuda técnica

### 2. DISEÑO
Definir:
- objetivo
- modelo
- flujo
- interfaces entre sistemas
- criterios de aceptación

### 3. CONSTRUCCIÓN
Implementar el sistema completo necesario para el hito.

### 4. INTEGRACIÓN
Conectar lo nuevo con lo existente.

### 5. CURADURÍA
Eliminar:
- duplicaciones
- elementos innecesarios
- contenido débil
- decisiones contradictorias

### 6. VALIDACIÓN
Comprobar:
- datos
- navegación
- estados
- responsive
- accesibilidad básica
- ausencia de errores

### 7. CONSOLIDACIÓN
Dejar:
- una arquitectura coherente
- documentación actualizada
- siguiente etapa claramente definida

**Sólo entonces se avanza de versión.**

---

# 9. CRITERIOS DE CALIDAD

PIONERO debe evaluarse en cinco capas:

### A. HISTORIA
¿Es verdadero, atribuido o claramente reconstruido?

### B. SISTEMA
¿La arquitectura permite crecer sin rehacerse?

### C. EXPERIENCIA
¿El visitante entiende qué hacer sin explicación técnica?

### D. ESTÉTICA
¿Se siente como una experiencia cultural cuidada y no como un prototipo?

### E. FUNCIONALIDAD
¿El recorrido completo funciona sin conflictos?

Una versión no queda cerrada si falla una de estas capas de manera estructural.

---

# 10. CONTROL DE CONTENIDO

Antes de publicar una pieza histórica:

**IDENTIFICAR → FUENTE → CLASIFICAR → RELACIONAR → CURAR → PUBLICAR**

No:

**INVENTAR → DECORAR → PUBLICAR**

El sistema debe admitir contenido incompleto sin fingir que está completo.

---

# 11. CONTROL DE CAMBIOS

Cada modificación debe responder:

1. ¿Qué problema estructural resuelve?
2. ¿En qué parte del plan pertenece?
3. ¿Qué sistemas toca?
4. ¿Qué puede romper?
5. ¿Cómo se valida?
6. ¿Qué deja preparado?

Si no puede responderse, no se implementa todavía.

---

# 12. DEFINICIÓN DE “TERMINADO”

Un hito está terminado cuando:

- el objetivo está implementado;
- la arquitectura está integrada;
- no existen dos sistemas haciendo lo mismo;
- el contenido está separado de la lógica;
- los datos tienen identidad y procedencia;
- el flujo principal funciona;
- la experiencia sigue siendo simple;
- el diseño mantiene coherencia;
- los errores conocidos están resueltos de raíz;
- la documentación refleja el estado real;
- el siguiente hito puede comenzar sin rehacer el anterior.

---

# 13. PRÓXIMO MOVIMIENTO OFICIAL

**V0.3 — MOTOR HISTÓRICO**

No agregar simplemente más años.

Primero construir:

**REGISTRY → ENTIDADES → RELACIONES → FUENTES → VALIDACIÓN → MOTOR DE CONSULTA → EXPERIENCIA**

Después cargar contenido histórico real dentro de esa estructura.

Ese es el siguiente tramo oficial de PIONERO.
