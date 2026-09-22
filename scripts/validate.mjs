import assert from "node:assert/strict";
import {CONTENT} from "../js/content.js";
import {HISTORY} from "../js/history/model.js";
import {createHistoryRegistry} from "../js/history/registry.js";
import {createHistoryQueries} from "../js/history/queries.js";
import {validateHistory} from "../js/history/validate.js";
import {TERRITORY} from "../js/territory/model.js";
import {createTerritoryQueries} from "../js/territory/queries.js";
import {auditPionero} from "../js/core/audit.js";
import {createExperienceState} from "../js/core/state.js";
import {createSmokeSuite} from "../js/core/smoke.js";
import {createExperienceCamera} from "../js/experience/camera.js";
import {createTemporalRenderer} from "../js/experience/renderer.js";
import {createExperienceWorld} from "../js/experience/world.js";
import {createSamePlaceEngine} from "../js/experience/samePlace.js";
import {createComparisonEngine} from "../js/experience/comparison.js";
import {reconstructionFor,reconstructionLayers} from "../js/media/reconstruction.js";
import {mediaFor} from "../js/media/catalog.js";
import {routesForEra} from "../js/experience/routes.js";

const store=new Map();
globalThis.localStorage={
  getItem:key=>store.has(key)?store.get(key):null,
  setItem:(key,value)=>store.set(key,String(value)),
  removeItem:key=>store.delete(key)
};

const registry=createHistoryRegistry(HISTORY);
const queries=createHistoryQueries(registry);
const territory=createTerritoryQueries(TERRITORY);
const validation=validateHistory(HISTORY);
const audit=auditPionero({content:CONTENT,history:HISTORY,territory:TERRITORY});
const smoke=createSmokeSuite({history:registry,territory,territoryData:TERRITORY,validation,audit,createState:createExperienceState,content:CONTENT}).run();

assert.equal(validation.valid,true,"La validación histórica falló: "+JSON.stringify(validation.issues));
assert.equal(audit.valid,true,"La auditoría estructural falló: "+JSON.stringify(audit.issues));
assert.equal(smoke.valid,true,"El smoke test falló: "+JSON.stringify(smoke.issues));
assert.equal(HISTORY.eras.length,7);
assert.equal(queries.eventsByEra("1973").length,1);
assert.equal(territory.summaryForEra("1973").nodes.length,3);
assert.equal(CONTENT.project.version,HISTORY.version);
assert.equal(HISTORY.version,TERRITORY.version);

const camera=createExperienceCamera();
assert.deepEqual(camera.read(),{zoom:1,focusX:50,focusY:50,angle:0});
camera.focus(42,58,1.2);
assert.deepEqual(camera.read(),{zoom:1.2,focusX:42,focusY:58,angle:0});

const scene={
  dataset:{},
  style:{setProperty:(key,value)=>{scene.styles[key]=value;}},
  styles:{}
};
const renderer=createTemporalRenderer(scene);
const world=createExperienceWorld({history:registry,content:CONTENT,territory,temporalRenderer:renderer,camera});
assert.equal(world.eraIndex("1973"),3);
assert.equal(world.adjacent("1973",1),"1974");
assert.equal(world.snapshot("1973").era.id,"1973");

const samePlace=createSamePlaceEngine({history:registry,territory,camera});
assert.equal(samePlace.register("chanar",{title:"San Patricio del Chañar",nodeIds:["territory-chanar"]}),true);
assert.equal(samePlace.findForEra("1973").length,1);
assert.equal(samePlace.focus("chanar","1973").node.id,"territory-chanar");

const comparison=createComparisonEngine({samePlace});
assert.equal(comparison.prepare({anchorId:"chanar",fromEraId:"1973",toEraId:"present",mode:"fade"}).status,"ready");
assert.equal(comparison.prepare({anchorId:"chanar",fromEraId:"1973",toEraId:"present",mode:"invalid"}),null);

for(const era of HISTORY.eras){
  const reconstruction=reconstructionFor(era.id);
  assert.ok(reconstruction.layers.length>=3,"Reconstrucción incompleta: "+era.id);
  assert.ok(reconstructionLayers(era.id).every(layer=>layer.evidence&&layer.status),"Capa sin procedencia: "+era.id);
  assert.ok(routesForEra(era.id).length>=1,"Ruta ausente: "+era.id);
}
assert.ok(mediaFor("visualReferences").length>=4);
console.log("PIONERO EXPERIENCE CORE OK");

console.log("PIONERO CI OK",JSON.stringify({version:HISTORY.version,eras:HISTORY.eras.length,points:smoke.summary.points}));
