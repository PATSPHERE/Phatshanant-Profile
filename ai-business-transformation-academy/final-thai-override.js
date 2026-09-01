(()=>{
  const d=document;
  if(d.getElementById('relearnos-final-mobile')) return;

  const style=d.createElement('style');
  style.id='relearnos-final-mobile';
  style.textContent=`
  /* Final cleanup */
  #start,#diagnostic{display:none!important}
  [data-text]{visibility:visible!important;opacity:1!important}

  /* Mobile client-facing closeout */
  @media(max-width:760px){
    html,body{overflow-x:hidden!important}
    body{font-size:15px!important;line-height:1.65!important}
    .wrap{width:calc(100% - 32px)!important;max-width:none!important}
    section{padding:44px 0!important}

    .nav{position:sticky!important;top:0!important;background:#fff!important;backdrop-filter:none!important}
    .navin{min-height:58px!important;gap:10px!important}
    .brand{width:112px!important;height:38px!important}
    .brand-logo{width:108px!important;height:108px!important}
    .links{display:none!important}
    .actions{gap:7px!important}
    .lang button{padding:6px 8px!important;font-size:11px!important}
    .actions>.btn{display:none!important}

    .hero{padding:0!important;background:#104886!important}
    .hero .heroin{width:100%!important;display:flex!important;flex-direction:column!important;min-height:0!important;padding:0!important;gap:0!important}
    .hero .herovisual{position:relative!important;inset:auto!important;order:0!important;width:100%!important;height:235px!important;min-height:235px!important;background-position:center 34%!important}
    .hero .herovisual:after{background:linear-gradient(180deg,rgba(16,72,134,.02),rgba(16,72,134,.16))!important}
    .hero .heroin>div:first-child{order:1!important;min-height:0!important;padding:30px 20px 34px!important;border-radius:0!important;background:#104886!important}
    .hero .ey{margin-bottom:10px!important;font-size:10px!important;letter-spacing:.08em!important;color:#b9f4c8!important}
    .hero h1{font-size:36px!important;line-height:1.16!important;margin:0 0 15px!important;max-width:none!important;color:#fff!important}
    .hero .lead{font-size:16px!important;line-height:1.65!important;margin:0 0 16px!important;color:rgba(255,255,255,.92)!important}
    .heroanswer{margin-bottom:16px!important;font-size:13px!important;line-height:1.5!important;color:#fff!important}
    .heroanswer:before{flex:0 0 32px!important;width:32px!important;height:32px!important}
    .herochips{gap:7px!important;margin:0 0 20px!important}
    .herochip{padding:7px 9px!important;font-size:11px!important;line-height:1.35!important;background:rgba(255,255,255,.10)!important;color:#fff!important;border-color:rgba(255,255,255,.32)!important}
    .heroactions{display:grid!important;grid-template-columns:1fr!important;gap:9px!important}
    .heroactions .btn{width:100%!important;min-height:46px!important;color:#fff!important;border-color:rgba(255,255,255,.55)!important}
    .heroactions .primary{background:#fff!important;color:#104886!important;border-color:#fff!important}

    .display{font-size:32px!important;line-height:1.2!important}
    .head,.split,.quotecontent,.foundergrid,.contactgrid,.aboutgrid{grid-template-columns:1fr!important;gap:22px!important}
    .head{margin-bottom:24px!important}
    .head p,.client-copy p:last-child,.bizintro p:last-child{font-size:15px!important}

    #solutions-review{padding:46px 0!important}
    .solutions-head{margin-bottom:22px!important}
    .solutions-head h2{font-size:34px!important;line-height:1.14!important}
    .solution-grid{grid-template-columns:1fr!important;gap:12px!important}
    .solution-card{grid-template-columns:minmax(0,1fr) 112px!important;min-height:176px!important}
    .solution-copy{padding:20px 14px 18px 20px!important}
    .solution-card h3{font-size:21px!important}
    .solution-card p{font-size:13px!important;line-height:1.55!important}

    #programs{padding:48px 0!important}
    .master-head{margin-bottom:22px!important}
    .master-head h2{font-size:34px!important;line-height:1.14!important}
    .learning-paths{grid-template-columns:1fr!important;gap:13px!important}
    .learning-path .lp-visual{height:145px!important}
    .learning-path .lp-copy{padding:19px!important}
    .learning-path h3{font-size:21px!important}
    .programme-outline.active{grid-template-columns:1fr!important}
    .outline-list{grid-template-columns:1fr!important}

    #framework{padding:0!important;background:#fff!important}
    #framework img{display:block!important;width:100%!important;max-width:100%!important;height:auto!important;margin:0 auto!important}

    .client-copy{margin-bottom:22px!important}
    .client-logos{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}
    .client-logo{min-height:92px!important;padding:10px!important}
    .client-logo img{height:58px!important;max-width:100%!important}

    .experience-final .exp-grid,.grid4,.outcomes,.related-programmes,.programme-mini-grid,.contactoptions{grid-template-columns:1fr!important}

    .founder{padding:44px 0!important}
    .foundergrid{display:flex!important;flex-direction:column!important}
    .founderphoto{order:-1!important;width:100%!important;max-width:420px!important;margin:0 auto!important}
    .founderphoto img{display:block!important;width:100%!important;height:auto!important;max-height:440px!important;object-fit:cover!important;object-position:center top!important}
    .founder h2{font-size:30px!important;line-height:1.2!important}
    .founder p{font-size:15px!important;line-height:1.7!important}

    .aboutcard,.contactcard,.contactoption{padding:20px!important}
    .quotecontent h2{font-size:30px!important;line-height:1.22!important}
    .contactlead{font-size:15px!important}
    .contactoptions{gap:10px!important}

    .detail-hero{min-height:330px!important}
    .detail-hero-copy{width:calc(100% - 32px)!important;padding:34px 0!important}
    .detail-hero-copy h2{font-size:36px!important}
    .detail-section{padding:42px 0!important}
    .detail-split,.ba-grid,.approach-band .wrap,.related-programmes,.case-proof{grid-template-columns:1fr!important}
    .detail-photo,.case-proof-img{min-height:220px!important}
    .ba-arrow{transform:rotate(90deg)!important}
  }
  `;
  d.head.appendChild(style);

  const replaceText=(root,from,to)=>{
    if(!root) return;
    const w=d.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[]; while(w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(n=>{
      if(n.nodeValue&&n.nodeValue.includes(from)){
        const next=n.nodeValue.replaceAll(from,to);
        if(next!==n.nodeValue)n.nodeValue=next;
      }
    });
  };

  const manualFallback={
    th:{
      heroTitle:'พัฒนาคนและองค์กรให้พร้อมสำหรับการเปลี่ยนแปลงที่เกิดขึ้นจริง',
      heroLead:'RELEARNOS ออกแบบการเรียนรู้จากโจทย์จริงของคน งาน บริการ และเทคโนโลยี เพื่อให้การพัฒนานำกลับไปใช้กับงานได้จริง',
      heroAnswer:'เริ่มจากสิ่งที่องค์กรต้องการให้เกิดขึ้น แล้วค่อยออกแบบเส้นทางการเรียนรู้ที่เหมาะสม',
      chip1:'People & Capability',chip2:'Work & Service',chip3:'Technology & AI',
      visualTitle:'Learning that moves into real work',visualBody:'People · Work · Service · Technology',
      programsTitle:'หนึ่งโปรแกรมหลัก สี่เส้นทางการเรียนรู้',
      clientsTitle:'ประสบการณ์จากงานจริงและความร่วมมือ',
      clientsLead:'ตัวอย่างประสบการณ์ที่นำแนวคิดด้านคน งาน บริการ เทคโนโลยี และการเปลี่ยนแปลงไปใช้ในบริบทจริง',
      aboutTitle:'RELEARNOS',
      founderTitle:'ผู้ก่อตั้ง RELEARNOS',
      contactTitle:'เริ่มจากโจทย์ที่มี แล้วค่อยออกแบบขั้นตอนถัดไปที่เหมาะสม'
    },
    en:{
      heroTitle:'Develop people and organisations for change that works in practice.',
      heroLead:'RELEARNOS designs learning around real challenges across people, work, service and technology so development can move into day-to-day work.',
      heroAnswer:'Start with the outcome you want to create, then design the right learning path.',
      chip1:'People & Capability',chip2:'Work & Service',chip3:'Technology & AI',
      visualTitle:'Learning that moves into real work',visualBody:'People · Work · Service · Technology'
    }
  };

  function repairText(){
    const lang=d.body?.dataset.lang||'th';
    const table=(typeof content!=='undefined'&&content&&content[lang])?content[lang]:null;
    const en=(typeof content!=='undefined'&&content&&content.en)?content.en:null;
    d.querySelectorAll('[data-text]').forEach(el=>{
      const key=el.dataset.text;
      const current=(el.textContent||'').trim();
      if(current && current!=='undefined' && current!=='null') return;
      const value=(table&&table[key])||(en&&en[key])||(manualFallback[lang]&&manualFallback[lang][key])||(manualFallback.en&&manualFallback.en[key]);
      if(typeof value==='string'&&value.trim()) el.textContent=value;
    });

    if(lang==='th'){
      const replacements=[
        ['One Master Programme. Four Learning Paths.','หนึ่งโปรแกรมหลัก สี่เส้นทางการเรียนรู้'],
        ['FOUNDER SPOTLIGHT','มุมมองจากผู้ก่อตั้ง'],
        ['People grow when learning feels relevant, human and possible.','ผู้คนเติบโตได้ เมื่อการเรียนรู้เชื่อมโยงกับชีวิตจริง มีความเป็นมนุษย์ และรู้สึกว่าเป็นไปได้'],
        ['Phatshanant Thanakitpunsakul','พัฌณ์นันณ์ ธนกิจพันธ์สกุล'],
        ['FOUNDER · LEARNING & TRANSFORMATION LEAD','ผู้ก่อตั้ง · ผู้นำด้านการเรียนรู้และการเปลี่ยนแปลง']
      ];
      replacements.forEach(([a,b])=>replaceText(d.body,a,b));
      const programs=d.querySelector('#programs');
      if(programs){
        const ey=programs.querySelector('.ey'); if(ey)ey.textContent='โปรแกรมหลัก';
        const h=programs.querySelector('.display'); if(h)h.textContent='หนึ่งโปรแกรมหลัก สี่เส้นทางการเรียนรู้';
      }
    }
  }

  function run(){
    repairText();
    [80,250,700,1500].forEach(ms=>setTimeout(repairText,ms));
    d.querySelectorAll('[data-lang-btn]').forEach(btn=>btn.addEventListener('click',()=>{
      setTimeout(repairText,30);setTimeout(repairText,250);
    }));
  }

  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
})();