(()=>{
const d=document;
if(d.getElementById('relearnos-th-visual-fix'))return;
const s=d.createElement('style');
s.id='relearnos-th-visual-fix';
s.textContent=`
/* TH visual corrections only — preserve locked structure */
.hero .heroin{isolation:isolate!important}
.hero .heroin:before{content:'';position:absolute;z-index:2;inset:0;pointer-events:none;background:linear-gradient(90deg,#104886 0%,rgba(16,72,134,.98) 28%,rgba(16,72,134,.90) 42%,rgba(16,72,134,.64) 54%,rgba(16,72,134,.28) 65%,rgba(16,72,134,0) 76%)!important}
.hero .heroin>div:first-child{background:transparent!important;border-radius:0!important}
.hero .herovisual:after{background:linear-gradient(90deg,rgba(16,72,134,.22) 0%,rgba(16,72,134,.08) 48%,rgba(16,72,134,0) 76%)!important}

/* Outcome imagery: give the image enough room, then focus each asset on its human subject */
.solution-card{grid-template-columns:minmax(0,1fr) 42%!important}
.solution-thumb{background-size:cover!important;background-repeat:no-repeat!important}
.solution-card:nth-child(1) .solution-thumb{background-position:62% 52%!important}
.solution-card:nth-child(2) .solution-thumb{background-position:28% 52%!important}
.solution-card:nth-child(3) .solution-thumb{background-position:34% 52%!important}
.solution-card:nth-child(4) .solution-thumb{background-position:32% 50%!important}

/* Detail hero crops: keep faces and upper bodies inside the hero rather than cutting at the head */
.solution-detail[data-detail='smarter-work'] .detail-hero-img{background-position:64% 68%!important}
.solution-detail[data-detail='better-decisions'] .detail-hero-img{background-position:42% 60%!important}
.solution-detail[data-detail='better-service'] .detail-hero-img{background-position:46% 60%!important}
.solution-detail[data-detail='future-ready-people'] .detail-hero-img{background-position:46% 58%!important}

/* Red Team: this is not a RELEARNOS principle and must not appear as a separate block */
#programs .mp-principle{display:none!important}

@media(max-width:1000px){
 .hero .heroin:before{background:linear-gradient(180deg,rgba(16,72,134,.94) 0%,rgba(16,72,134,.84) 52%,rgba(16,72,134,.36) 78%,rgba(16,72,134,.08) 100%)!important}
 .solution-card{grid-template-columns:minmax(0,1fr) 38%!important}
}
@media(max-width:620px){
 .solution-card{grid-template-columns:minmax(0,1fr) 34%!important}
}
`;
d.head.appendChild(s);
})();
