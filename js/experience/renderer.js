import {getTemporalState,interpolateTemporalState} from "./temporal.js";

export function createTemporalRenderer(scene){
  function render(eraId,progress=null,camera=null){
    const visual=progress||getTemporalState(eraId);
    const view=camera||{zoom:1,focusX:50,focusY:50,angle:0};
    scene.dataset.phase=visual.phase;
    scene.dataset.theme=visual.atmosphere;
    scene.style.setProperty("--terrain-depth",String(visual.terrain));
    scene.style.setProperty("--water-strength",String(visual.water));
    scene.style.setProperty("--production-strength",String(visual.production));
    scene.style.setProperty("--settlement-strength",String(visual.settlement));
    scene.style.setProperty("--road-strength",String(visual.roads));
    const layers=visual.reconstruction?.layers||[];
    const layerMap=Object.fromEntries(layers.map(layer=>[layer.id,layer.strength]));
    scene.style.setProperty("--meseta-strength",String(layerMap.meseta??0));
    scene.style.setProperty("--barda-strength",String(layerMap.barda??0));
    scene.style.setProperty("--monte-strength",String(layerMap.monte??0));
    scene.style.setProperty("--irrigation-strength",String(layerMap.irrigation??0));
    scene.style.setProperty("--institutions-strength",String(layerMap.institutions??0));
    scene.style.setProperty("--camera-x",String(view.focusX));
    scene.style.setProperty("--camera-y",String(view.focusY));
    scene.style.setProperty("--camera-zoom",String(view.zoom));
    scene.style.setProperty("--camera-angle",String(view.angle));
    return visual;
  }
  function transition(fromId,toId,t,camera=null){
    return render(toId,interpolateTemporalState(fromId,toId,t),camera);
  }
  return {render,transition};
}