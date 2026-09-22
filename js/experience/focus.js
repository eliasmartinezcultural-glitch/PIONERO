export function createFocusController({camera}){
  let saved=null;
  function remember(){saved=camera.read();return saved?{...saved}:null;}
  function restore(){if(!saved)return camera.read();camera.set(saved);return camera.read();}
  function focus(x,y,zoom=1){camera.set({focusX:x,focusY:y,zoom});return camera.read();}
  return {remember,restore,focus};
}
