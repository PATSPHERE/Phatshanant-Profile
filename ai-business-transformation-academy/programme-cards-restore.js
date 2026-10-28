(()=>{
function applyProgrammeCards(){
  const root=document.querySelector('#programs');
  if(!root)return;
  const cards=[...root.querySelectorAll('.learning-path')];
  if(!cards.length)return;
  const data=[
    {
      title:'การบริการลูกค้าและประสบการณ์ลูกค้า',
      fit:'เหมาะกับ: ทีมบริการ หน้างาน และผู้ดูแล customer journey',
      outcomes:['ผลลัพธ์: บริการสม่ำเสมอขึ้นในทุก customer moment','สื่อสาร ฟื้นความเชื่อมั่น และสร้างความไว้วางใจได้ดีขึ้น']
    },
    {
      title:'การขาย การตลาด และกลยุทธ์แบรนด์',
      fit:'เหมาะกับ: ทีมขาย การตลาด และผู้ที่ดูแลการเติบโตของแบรนด์',
      outcomes:['ผลลัพธ์: สื่อสารคุณค่าแบรนด์จากความเข้าใจลูกค้า','เชื่อมบทสนทนาการขาย การตลาด และบริการเข้าด้วยกัน']
    },
    {
      title:'ภาวะผู้นำและความพร้อมของทีม',
      fit:'เหมาะกับ: หัวหน้าทีม ผู้บริหาร และผู้ที่เตรียมพร้อมสู่บทบาทผู้นำ',
      outcomes:['ผลลัพธ์: นำทีมผ่านการเปลี่ยนแปลงได้อย่างชัดเจนและมีความรับผิดชอบ','สร้างความมั่นใจ การร่วมมือ และการลงมือทำในทีม']
    },
    {
      title:'การใช้ AI เพื่อยกระดับงานบริการ',
      fit:'เหมาะกับ: ทีมบริการและองค์กรที่ต้องการใช้ AI ยกระดับวิธีทำงาน',
      outcomes:['ผลลัพธ์: มองเห็น use case ที่ใช้ได้กับงานบริการจริง','ออกแบบ workflow ที่มีคน คุณภาพ และความรับผิดชอบอยู่ตรงกลาง']
    }
  ];
  const ey=root.querySelector('.ey'); if(ey)ey.textContent='โปรแกรมหลัก';
  const title=root.querySelector('.display'); if(title)title.textContent='หนึ่งโปรแกรมหลัก สี่เส้นทางการเรียนรู้';
  cards.forEach((card,i)=>{
    const x=data[i]; if(!x)return;
    card.querySelector('.lp-visual')?.remove();
    const copy=card.querySelector('.lp-copy'); if(!copy)return;
    const h=copy.querySelector('h3'); if(h)h.textContent=x.title;
    let p=copy.querySelector('p');
    if(!p){p=document.createElement('p');h?.after(p)}
    p.className='programme-fit';
    p.textContent=x.fit;
    let out=copy.querySelector('.programme-outcome');
    if(!out){out=document.createElement('div');out.className='programme-outcome';p.after(out)}
    out.innerHTML=`<strong>ผลลัพธ์ / สิ่งที่จะได้</strong><ul>${x.outcomes.map(v=>`<li>${v}</li>`).join('')}</ul>`;
    const link=copy.querySelector('.outline-link');
    if(link){link.textContent='ดูโครงหลักสูตร →';copy.appendChild(link)}
  });
  if(!document.getElementById('programme-cards-restore-style')){
    const s=document.createElement('style');s.id='programme-cards-restore-style';s.textContent=`
      #programs .learning-paths{align-items:stretch}
      #programs .learning-path{border-top:4px solid #20a653!important;box-shadow:0 8px 24px rgba(16,72,134,.055)!important;min-height:360px!important}
      #programs .learning-path .lp-visual{display:none!important}
      #programs .learning-path .lp-copy{padding:26px 24px 24px!important}
      #programs .learning-path h3{margin:0 0 16px!important;font-size:22px!important;line-height:1.22!important;color:#104886!important}
      #programs .programme-fit{margin:0 0 18px!important;padding-bottom:17px!important;border-bottom:1px solid #d7e6da!important;color:#607083!important;font-size:14px!important;line-height:1.55!important}
      #programs .programme-outcome{margin:0 0 18px!important;background:#fcfaf2!important;border:1px solid #e4eadf!important;padding:16px 17px!important}
      #programs .programme-outcome strong{display:block!important;margin-bottom:9px!important;color:#104886!important;font-size:12px!important;text-transform:uppercase!important;letter-spacing:.04em!important}
      #programs .programme-outcome ul{margin:0!important;padding-left:18px!important;color:#607083!important;font-size:13px!important;line-height:1.55!important}
      #programs .programme-outcome li+li{margin-top:6px!important}
      #programs .outline-link{margin-top:auto!important;padding-top:4px!important}
    `;document.head.appendChild(s);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(applyProgrammeCards,120));else setTimeout(applyProgrammeCards,120);
})();
