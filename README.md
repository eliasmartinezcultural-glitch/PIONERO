# PIONERO

## Viaje por la historia de San Patricio del Chañar

Experiencia interactiva de Ocarina Producciones.

### LEY MUNDIAL

**COMPLEJO PARA CONSTRUIR → SIMPLE PARA USAR.**

No se trabaja con parches aislados, remiendos, duplicaciones ni regresiones. Cada avance debe quedar integrado, funcional, validado y preparado para el siguiente.

### ESTADO

**V0.4.1 — NÚCLEO DE EXPERIENCIA + MOTOR HISTÓRICO + MOTOR TERRITORIAL · CONSOLIDACIÓN X5**

Esta versión no agrega una colección de funciones sueltas. Consolida el comportamiento de PIONERO alrededor de un único estado de experiencia:

**VISTA → MOMENTO → PANEL → PROGRESO**

El estado de navegación y descubrimiento vive en `js/core/state.js`. El controlador de interfaz lo consume y deja de mantener estados paralelos para viaje, paneles y progreso.

### EXPERIENCIA

Flujo principal:

**abrir → entender → elegir momento → viajar → descubrir → ubicar → comparar → volver**

La interfaz mantiene pocos controles visibles. La complejidad queda detrás del motor.

La navegación temporal funciona con:
- tarjetas;
- línea temporal;
- anterior / siguiente;
- teclado;
- Escape jerárquico.

Las huellas se descubren una por una y el progreso se conserva en el dispositivo.

Los paneles de descubrimiento, territorio y comparación son mutuamente excluyentes. Esto evita superposiciones y estados visuales contradictorios.

### MOTOR HISTÓRICO

Archivos principales:

- `js/history/schema.js`
- `js/history/model.js`
- `js/history/registry.js`
- `js/history/queries.js`
- `js/history/validate.js`

La historia vive separada de la presentación.

Cada registro utiliza:
- evidencia: DOCUMENTADO, TESTIMONIO, RECONSTRUCCIÓN o INTERPRETACIÓN;
- investigación: VERIFICADO, PARCIAL o PENDIENTE;
- identidad estable;
- relaciones;
- fuentes;
- referencias de media cuando existan.

La validación comprueba además referencias de media y URLs de fuentes.

### MOTOR TERRITORIAL

Archivos:

- `js/territory/model.js`
- `js/territory/queries.js`

La representación actual es deliberadamente **esquemática y no está a escala**. No es cartografía catastral ni reproduce coordenadas geográficas.

La capa actual relaciona:
- Río Neuquén;
- área esquemática de la localidad;
- área productiva en transformación;
- conexiones conceptuales entre agua, producción y asentamiento.

No se agregan geometrías precisas sin evidencia documental suficiente.

### AUDITORÍA

`js/core/audit.js` verifica automáticamente:

- versiones internas alineadas;
- eras con escena y huellas;
- huellas con entidades válidas;
- coordenadas válidas;
- tipos de evidencia válidos;
- escenas y colecciones sin eras inexistentes;
- nodos territoriales válidos;
- conexiones territoriales válidas;
- modo territorial esquemático;
- IDs HTML duplicados;
- contrato mínimo de interfaz.

El resultado queda expuesto en `window.PIONERO.audit`.

### ESTADO Y PERSISTENCIA

`js/core/state.js` centraliza:
- vista actual;
- era actual;
- panel abierto;
- huellas descubiertas;
- persistencia;
- limpieza de progreso obsoleto;
- suscripción a cambios.

Esto evita que la interfaz tenga varias fuentes de verdad.

### HOJA DE RUTA

V0.1 Motor del viaje — cerrado  
V0.2 Experiencia + contenido desacoplado — cerrado  
V0.3 Motor histórico — consolidado  
V0.3.1 Experiencia histórica conectada — cerrado  
V0.4 Motor territorial — cerrado  
**V0.4.1 Núcleo de experiencia + consolidación — actual**  
V0.5 Fuentes + memoria  
V0.6 Antes / Ahora  
V0.7 Audio + narrativa  
V0.8 Reconstrucciones visuales  
V0.9 Educación  
V1.0 Experiencia histórica completa  
V1.5 Exploración avanzada  
V2.0 360° / WebXR / experiencias inmersivas

### DEFINICIÓN DE TERMINADO

**integrado · funcional · validado · curado · documentado · preparado para la siguiente**

No se declara cerrado por cantidad de código.