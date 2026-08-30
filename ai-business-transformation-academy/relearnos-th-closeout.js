(()=>{
const d=document;
function apply(){
  // 1) Ensure the 2-minute quiz is rendered before removing duplicate display sections.
  const q=d.querySelector('#questions');
  if(q && !q.children.length && typeof window.render==='function'){
    try{ window.render(d.body.dataset.lang||localStorage.getItem('abta-lang')||'th'); }catch(e){}
  }
  // 2) Hide the duplicated Starting Point cards but keep DOM nodes because render() depends on #services.
  const start=d.querySelector('#start');
  if(start) start.style.setProperty('display','none','important');
  // 3) Remove only the standalone Outcomes section identified by its bound heading.
  const outHeading=d.querySelector("[data-text='outcomesTitle']");
  const outSection=outHeading?.closest('section');
  if(outSection) outSection.remove();
  // 4) Accounting Workflow uses the same approved people-at-work image family as the other case studies.
  const accounting=[...d.querySelectorAll('#clients .exp-card')].find(c=>/Accounting Workflow/i.test(c.textContent||''));
  const img=accounting?.querySelector('img');
  if(img){
    img.src='assets/insights/hq/knowledge.avif?v=case-family-1';
    img.alt='Accounting workflow collaboration case study';
    img.style.objectFit='cover';
    img.style.objectPosition='center 48%';
  }
  // 5) Force quiz layout visible in case an older style layer suppressed it.
  const quiz=d.querySelector('#diagnostic .quiz');
  if(quiz) quiz.style.removeProperty('display');
  if(q){q.style.setProperty('display','grid','important');q.style.setProperty('visibility','visible','important');q.style.setProperty('opacity','1','important');}
}
if(d.readyState==='loading') d.addEventListener('DOMContentLoaded',()=>setTimeout(apply,160)); else setTimeout(apply,160);
setTimeout(apply,700);
})();