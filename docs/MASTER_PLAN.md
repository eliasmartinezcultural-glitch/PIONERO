# PIONERO — PLAN MAESTRO CENTRAL

> **V0.4.0 — MOTOR TERRITORIAL ACTIVO · X5 AUDITADO**
>
> Regla: **COMPLEJO PARA CONSTRUIR → SIMPLE PARA USAR.**

## VISIÓN
PIONERO es un viaje interactivo por la historia de San Patricio del Chañar. La experiencia busca responder:

**¿Cómo llegamos desde aquel Chañar hasta este Chañar?**

Flujo:

**abrir → entender → viajar → llegar → explorar → descubrir → ubicar → comparar → volver**

## V0.4 — TIEMPO → TERRITORIO

El motor territorial introduce una segunda coordenada conceptual de la historia: el **dónde**.

### Arquitectura
`TERRITORY MODEL → TERRITORY QUERIES → TERRITORY VIEW`

El motor no depende de la interfaz y puede crecer independientemente.

### Principios
- esquema, no falsa precisión;
- sólo relaciones territoriales sustentadas o claramente marcadas como parciales;
- cada nodo puede apuntar a una entidad histórica;
- cada época puede tener su propia lectura territorial;
- las capas visuales no son una segunda base histórica.

### Capa actual
- Río Neuquén;
- área esquemática de la localidad;
- área productiva en transformación;
- conexiones conceptuales entre agua, producción y asentamiento.

### Próximo desarrollo de V0.4
1. incorporar lugares históricos documentados;
2. modelar edificios e instituciones cuando exista evidencia;
3. introducir caminos documentados;
4. preparar geometrías históricas separadas de la presentación;
5. incorporar mapas/documentos como medios con procedencia.

## V0.5
Fuentes + memoria:
- ficha profunda de fuente;
- documentos;
- fotografías;
- testimonios;
- procedencia;
- créditos;
- derechos de uso.

## V0.6
Antes / Ahora:
- pares espaciales;
- comparación verificable;
- mismo lugar;
- misma orientación cuando sea posible.

## V0.7
Audio + narrativa.

## V0.8
Reconstrucciones visuales.

## V0.9
Educación.

## V1.0
Experiencia histórica completa.

### AUDITORÍA X5\nAntes de avanzar a V0.5, el sistema debe poder detectar automáticamente:\n- versiones internas desalineadas;\n- eras sin escena o huellas;\n- huellas con entidades inexistentes o coordenadas inválidas;\n- nodos territoriales con capas, lugares o eras inexistentes;\n- conexiones territoriales rotas;\n- IDs HTML duplicados o elementos estructurales ausentes.\n\nLa auditoría vive en `js/core/audit.js` y queda expuesta en `window.PIONERO.audit`.\n\n### DEFINICIÓN DE TERMINADO
**integrado · funcional · validado · curado · documentado · preparado para la siguiente**.

No se declara cerrado por cantidad de código.