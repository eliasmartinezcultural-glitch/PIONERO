export function createTemporalTransition({duration=720}={}){
  let timer=null;
  function play({onProgress=()=>{},onComplete=()=>{}}={}){
    if(timer)cancelAnimationFrame(timer);
    const start=performance.now();
    const frame=now=>{
      const t=Math.min(1,(now-start)/duration);
      const eased=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
      onProgress(eased);
      if(t<1)timer=requestAnimationFrame(frame);
      else{timer=null;onComplete();}
    };
    timer=requestAnimationFrame(frame);
  }
  function cancel(){if(timer)cancelAnimationFrame(timer);timer=null;}
  return {play,cancel};
}
