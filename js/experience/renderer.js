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