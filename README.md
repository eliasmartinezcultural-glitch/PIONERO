# PIONERO

## Viaje por la historia de San Patricio del Chañar

Experiencia interactiva de Ocarina Producciones.

### LEY MUNDIAL

**COMPLEJO PARA CONSTRUIR → SIMPLE PARA USAR.**

No se trabaja con parches aislados, remiendos, duplicaciones ni regresiones. Cada avance debe quedar integrado, funcional, validado y preparado para el siguiente.

### ESTADO

**V0.4.0 — MOTOR HISTÓRICO + MOTOR TERRITORIAL**

PIONERO ahora conecta dos dimensiones de la historia:

**CUÁNDO → DÓNDE**

La experiencia incorpora una capa territorial esquemática derivada de un modelo independiente. Permite explorar, según la época, relaciones entre localidad, río y área productiva.

### MOTOR TERRITORIAL

Archivos:

- `js/territory/model.js`
- `js/territory/queries.js`

La representación actual es deliberadamente **esquemática y no está a escala**. No debe interpretarse como cartografía catastral ni como coordenadas geográficas exactas.

La capa territorial puede crecer hacia:
- lugares históricos;
- caminos documentados;
- edificios;
- instituciones;
- cambios de paisaje;
- crecimiento urbano;
- mapas históricos;
- comparación espacial antes/ahora.

### REGLA HISTÓRICA

Todo contenido debe distinguirse entre DOCUMENTADO, TESTIMONIO, RECONSTRUCCIÓN e INTERPRETACIÓN. El estado de investigación es VERIFICADO, PARCIAL o PENDIENTE.

Nunca se inventan hechos para completar una escena.

### ARQUITECTURA

EXPERIENCE · TIME ENGINE · HISTORY ENGINE · TERRITORY ENGINE · MEDIA ENGINE · SOURCES ENGINE · EDUCATION ENGINE · CORE

La historia vive en `js/history/model.js`. La presentación vive en `js/content.js`. La capa territorial vive en su propio motor.

### HOJA DE RUTA

V0.1 Motor del viaje — cerrado  
V0.2 Experiencia + contenido desacoplado — cerrado  
V0.3 Motor histórico — consolidado  
V0.4 Motor territorial — activo  
V0.5 Fuentes + memoria  
V0.6 Antes / Ahora  
V0.7 Audio + narrativa  
V0.8 Reconstrucciones visuales  
V0.9 Educación  
V1.0 Experiencia histórica completa  
V1.5 Exploración avanzada  
V2.0 360° / WebXR / experiencias inmersivas

**Definición de terminado:** integrado · funcional · validado · curado · documentado · preparado para la siguiente etapa.