(function(){
  function esc(value){
    return String(value ?? "Error desconocido").replace(/[&<>"]/g, function(char){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char];
    });
  }

  var recoveryShown=false;

  function showRecovery(detail){
    if(recoveryShown || !document.body)return;
    recoveryShown=true;

    var box=document.getElementById("runtimeGuard") || document.createElement("div");
    box.id="runtimeGuard";
    box.setAttribute("role","alert");
    box.style.cssText="position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:24px;background:#171510;color:#f1eadb;font-family:Arial,sans-serif";

    var wrap=document.createElement("div");
    wrap.style.cssText="max-width:620px";

    var label=document.createElement("div");
    label.style.cssText="font-size:11px;letter-spacing:.16em;opacity:.7;margin-bottom:14px";
    label.textContent="PIONERO · SISTEMA DE RECUPERACIÓN";

    var title=document.createElement("h1");
    title.style.cssText="font:500 42px Georgia,serif;margin:0 0 14px";
    title.textContent="El viaje necesita reiniciarse.";

    var message=document.createElement("p");
    message.style.cssText="line-height:1.6;opacity:.8";
    message.textContent="PIONERO detectó un problema durante la carga. Primero podés intentar nuevamente. Si el problema persiste, reiniciá los datos locales del viaje.";

    var details=document.createElement("details");
    details.style.cssText="margin-top:18px;opacity:.55";
    var summary=document.createElement("summary");
    summary.textContent="Diagnóstico técnico";
    var pre=document.createElement("pre");
    pre.style.cssText="white-space:pre-wrap;line-height:1.4";
    pre.textContent=esc(detail);
    details.append(summary,pre);

    var actions=document.createElement("div");
    actions.style.cssText="display:flex;gap:10px;flex-wrap:wrap;margin-top:22px";

    var retry=document.createElement("button");
    retry.type="button";
    retry.textContent="Reintentar";
    retry.style.cssText="padding:13px 18px;border:1px solid #f1eadb;background:#f1eadb;color:#171510;border-radius:999px;cursor:pointer";
    retry.onclick=function(){location.reload()};

    var reset=document.createElement("button");
    reset.type="button";
    reset.textContent="Reiniciar datos del viaje";
    reset.style.cssText="padding:13px 18px;border:1px solid rgba(241,234,219,.5);background:transparent;color:#f1eadb;border-radius:999px;cursor:pointer";
    reset.onclick=function(){
      try{
        Object.keys(localStorage).filter(function(key){return key.indexOf("pionero.")===0;}).forEach(function(key){localStorage.removeItem(key);});
      }catch(error){}
      location.reload();
    };

    actions.append(retry,reset);
    wrap.append(label,title,message,details,actions);
    box.replaceChildren(wrap);
    if(!box.parentNode)document.body.appendChild(box);
    retry.focus();
  }

  window.addEventListener("error",function(event){
    if(event && event.message)showRecovery(event.message);
  });

  window.addEventListener("unhandledrejection",function(event){
    var reason=event && event.reason;
    showRecovery(reason && reason.message ? reason.message : reason || "Promesa rechazada");
  });

  window.setTimeout(function(){
    if(window.PIONERO && window.PIONERO.ready)return;
    showRecovery("La interfaz no informó que terminó de inicializarse dentro del tiempo esperado.");
  },12000);
})();