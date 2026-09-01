(()=>{
  const d=document;
  if(d.getElementById('relearnos-final-cleanup')) return;

  const style=d.createElement('style');
  style.id='relearnos-final-cleanup';
  style.textContent=`#start,#diagnostic{display:none!important}`;
  d.head.appendChild(style);

  const replaceText=(root, from, to)=>{
    if(!root) return;
    const w=d.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(n=>{
      if(n.nodeValue && n.nodeValue.includes(from)){
        const next=n.nodeValue.replaceAll(from,to);
        if(next!==n.nodeValue) n.nodeValue=next;
      }
    });
  };

  function applyFinalThai(){
    const body=d.body;
    if(!body || body.dataset.lang!=='th') return;
    const replacements=[
      ['One Master Programme. Four Learning Paths.','หนึ่งโปรแกรมหลัก สี่เส้นทางการเรียนรู้'],
      ['แกนการเรียนรู้ร่วมกันที่ปรับตามงานจริง ระดับผู้เรียน และบริบทของแต่ละธุรกิจบริการ โดยแต่ละ Learning Path มี Programme Outline ชัดเจน','แกนการเรียนรู้ร่วมกันที่ปรับตามงานจริง ระดับผู้เรียน และบริบทของแต่ละธุรกิจบริการ โดยแต่ละเส้นทางการเรียนรู้มีโครงหลักสูตรที่ชัดเจน'],
      ['FOUNDER SPOTLIGHT','มุมมองจากผู้ก่อตั้ง'],
      ['People grow when learning feels relevant, human and possible.','ผู้คนเติบโตได้ เมื่อการเรียนรู้เชื่อมโยงกับชีวิตจริง มีความเป็นมนุษย์ และรู้สึกว่าเป็นไปได้'],
      ['Phatshanant brings together service experience, capability development and practical transformation to create learning journeys that people can carry into their work.','พัฌณ์นันณ์นำประสบการณ์ด้านงานบริการ การพัฒนาศักยภาพ และการเปลี่ยนแปลงที่นำไปใช้ได้จริง มาร้อยเรียงเป็นเส้นทางการเรียนรู้ที่ผู้เรียนสามารถนำกลับไปใช้กับงานได้'],
      ['Phatshanant Thanakitpunsakul','พัฌณ์นันณ์ ธนกิจพันธ์สกุล'],
      ['FOUNDER · LEARNING & TRANSFORMATION LEAD','ผู้ก่อตั้ง · ผู้นำด้านการเรียนรู้และการเปลี่ยนแปลง']
    ];
    replacements.forEach(([a,b])=>replaceText(body,a,b));
    const programs=d.querySelector('#programs');
    if(programs){
      const ey=programs.querySelector('.ey');
      if(ey && ey.textContent!=='โปรแกรมหลัก') ey.textContent='โปรแกรมหลัก';
      const h=programs.querySelector('.display');
      if(h && h.textContent!=='หนึ่งโปรแกรมหลัก สี่เส้นทางการเรียนรู้') h.textContent='หนึ่งโปรแกรมหลัก สี่เส้นทางการเรียนรู้';
    }
  }

  const run=()=>{
    applyFinalThai();
    [150,500,1200].forEach(ms=>setTimeout(applyFinalThai,ms));
    d.querySelectorAll('[data-lang-btn]').forEach(btn=>{
      btn.addEventListener('click',()=>setTimeout(applyFinalThai,0));
    });
  };

  if(d.readyState==='loading') d.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
})();