(()=>{
const d=document;
if(d.getElementById('relearnos-order-fix'))return;
const m=d.createElement('meta');m.id='relearnos-order-fix';d.head.appendChild(m);
function findExperience(){
  return d.querySelector('.experience-final') || d.querySelector('#clients') || [...d.querySelectorAll('section')].find(s=>/SELECTED LEARNING & COLLABORATION EXPERIENCE/i.test(s.textContent||''));
}
function apply(){
  const fw=d.querySelector('#framework');
  const exp=findExperience();
  const programs=d.querySelector('#programs');
  if(!fw||!exp) return;
  if(!exp.id) exp.id='clients';
  else if(exp.id!=='clients') exp.dataset.originalId=exp.id;
  exp.id='clients';
  fw.after(exp);
  if(programs && programs.previousElementSibling!==exp) exp.after(programs);
  d.querySelectorAll('a[href="#clients"]').forEach(a=>a.onclick=null);
}
apply();
setTimeout(apply,120);
setTimeout(apply,500);
})();
