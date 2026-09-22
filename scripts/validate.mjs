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
const smoke=createSmokeSuite({history:registry,territory,validation,audit,createState:createExperienceState,content:CONTENT}).run();

assert.equal(validation.valid,true,"La validación histórica falló: "+JSON.stringify(validation.issues));
assert.equal(audit.valid,true,"La auditoría estructural falló: "+JSON.stringify(audit.issues));
assert.equal(smoke.valid,true,"El smoke test falló: "+JSON.stringify(smoke.issues));
assert.equal(HISTORY.eras.length,7);
assert.equal(queries.eventsByEra("1973").length,1);
assert.equal(territory.summaryForEra("1973").nodes.length,3);
assert.equal(CONTENT.project.version,HISTORY.version);
assert.equal(HISTORY.version,TERRITORY.version);

console.log("PIONERO CI OK",JSON.stringify({version:HISTORY.version,eras:HISTORY.eras.length,points:smoke.summary.points}));
