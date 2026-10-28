(()=>{
const d=document;
function esc(s){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
const questions=[
['ตอนนี้ผลลัพธ์ด้านใดสำคัญกับคุณหรือทีมมากที่สุด?',['ยกระดับประสบการณ์และความเชื่อมั่นของลูกค้า','สื่อสารคุณค่าแบรนด์และสร้างการเติบโต','พัฒนาผู้นำและความพร้อมของทีม','ทำให้งานบริการลื่นขึ้นด้วย AI หรือเครื่องมือดิจิทัล']],
['ใครคือกลุ่มที่ควรเริ่มพัฒนาก่อน?',['ทีมบริการหรือทีมหน้างานที่เจอลูกค้า','ทีมขาย การตลาด หรือผู้ดูแลแบรนด์','หัวหน้าทีม ผู้บริหาร หรือผู้เตรียมขึ้นบทบาทผู้นำ','ทีมที่อยากประยุกต์ AI กับ workflow จริง']],
['สถานการณ์ใดใกล้กับงานของคุณที่สุด?',['บริการยังไม่สม่ำเสมอ หรือรับมือ customer moment สำคัญได้ไม่ดีพอ','การขาย การตลาด และบริการยังสื่อสารคุณค่าต่อกันไม่ชัด','ทีมกำลังเปลี่ยนแปลง แต่ผู้นำและคนยังไม่มั่นใจว่าจะขยับอย่างไร','มีงานซ้ำ ข้อมูลกระจัดกระจาย หรือยังไม่เห็น AI use case ที่ใช้ได้จริง']],
['เมื่อจบการเรียน คุณอยากเห็นการเปลี่ยนแปลงใดก่อน?',['ลูกค้าได้รับประสบการณ์ที่ชัดเจน อบอุ่น และน่าเชื่อถือขึ้น','ทีมสื่อสารคุณค่าได้ตรงลูกค้าและต่อยอดโอกาสทางธุรกิจ','ทีมทำงานร่วมกัน รับผิดชอบ และพร้อมเปลี่ยนแปลงมากขึ้น','มี use case หรือวิธีทำงานใหม่ที่ใช้ AI อย่างรับผิดชอบ']],
['ข้อใดอธิบายบทบาทของคุณได้ใกล้ที่สุด?',['ดูแลลูกค้า บริการ หรือ quality of experience','ดูแลยอดขาย การตลาด การเติบโต หรือแบรนด์','นำคน ตัดสินใจ หรือเตรียมทีมสำหรับอนาคต','พัฒนางาน ระบบ หรือการนำ AI/digital มาใช้']]
];
function apply(){
  const q=d.getElementById('questions');
  if(q && !q.querySelector('.question')){
    q.innerHTML=questions.map((x,qi)=>`<article class='question'><div class='qtop'><div class='qnum'>0${qi+1}</div><h3>${esc(x[0])}</h3></div><div class='options'>${x[1].map((o,oi)=>`<div class='option'><input type='radio' id='q${qi}_${oi}' name='q${qi}' value='${oi}'><label for='q${qi}_${oi}'>${esc(o)}</label></div>`).join('')}</div></article>`).join('');
  }
  // Remove only the duplicate Outcomes section immediately following Programme.
  const programs=d.getElementById('programs');
  if(programs){
    let n=programs.nextElementSibling;
    if(n && /Outcomes That Matter/i.test(n.textContent||'')) n.style.display='none';
  }
}
if(d.readyState==='loading') d.addEventListener('DOMContentLoaded',()=>{setTimeout(apply,60);setTimeout(apply,300)}); else {setTimeout(apply,60);setTimeout(apply,300)}
})();