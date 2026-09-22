export function createExperienceCamera({state}={}){
  const defaults={zoom:1,focusX:50,focusY:50,angle:0};
  let local={...defaults};

  function read(){return state?.read?.().camera?{...state.read().camera}:{...local};}
  function set(next={}){
    if(state?.setCamera)return state.setCamera(next);
    local={...local,...next};
    return {...local};
  }
  function reset(){return state?.resetCamera?state.resetCamera():(local={...defaults}, {...local});}
  function preserve(){return read();}
  function focus(x,y,zoom=1){return set({focusX:x,focusY:y,zoom});}

  return {set,reset,read,preserve,focus};
}