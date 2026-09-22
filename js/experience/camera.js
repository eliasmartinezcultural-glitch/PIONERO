export function createExperienceCamera(){
  const defaults={zoom:1,focusX:50,focusY:50,angle:0};
  let current={...defaults};
  function set(next={}){current={...current,...next};return {...current};}
  function reset(){current={...defaults};return {...current};}
  function read(){return {...current};}
  function preserve(){return read();}
  return {set,reset,read,preserve};
}
