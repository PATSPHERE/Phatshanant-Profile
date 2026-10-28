(()=>{
const d=document;
if(d.getElementById('relearnos-order-fix-v2'))return;
const m=d.createElement('meta');m.id='relearnos-order-fix-v2';d.head.appendChild(m);
function findExperience(){
  return d.querySelector('.experience-final') || d.querySelector('#clients') || [...d.querySelectorAll('section')].find(s=>/SELECTED LEARNING & COLLABORATION EXPERIENCE/i.test(s.textContent||''));
}
function findSolutions(){
  return d.querySelector('#solutions-review') || [...d.querySelectorAll('section')].find(s=>/OUTCOMES THAT MATTER|Smarter Work|Better Decisions/i.test(s.textContent||''));
}
function apply(){
  const solutions=findSolutions();
  const programs=d.querySelector('#programs');
  const fw=d.querySelector('#framework');
  const exp=findExperience();
  if(!programs||!fw)return;
  if(solutions){
    solutions.after(programs);
    programs.after(fw);
  }else{
    fw.before(programs);
  }
  if(exp){
    if(!exp.id)exp.id='clients';
    else if(exp.id!=='clients')exp.dataset.originalId=exp.id;
    exp.id='clients';
    fw.after(exp);
  }
  d.querySelectorAll('a[href="#clients"]').forEach(a=>a.onclick=null);
}
apply();
setTimeout(apply,120);
setTimeout(apply,500);
})();
