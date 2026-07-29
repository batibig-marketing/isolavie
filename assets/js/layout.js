(function(){var d=document,PAGE=d.body.getAttribute('data-page');
var NAV=[["Accueil", "index.html"], ["Techniques", "techniques.html"], ["Particuliers", "particuliers.html"], ["Professionnels", "professionnels.html"], ["Recrutement", "recrutement.html"], ["Contact", "contact.html"]];
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
var mark='<span class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></svg></span>';
var phSvg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
var cur=NAV.filter(function(n){return n[1].indexOf(PAGE)>-1;});
var links=NAV.map(function(n){var key=n[1].replace('.html','').replace('index','accueil');var on=(key===PAGE)?' class="active"':'';return '<li><a href="'+n[1]+'"'+on+'>'+esc(n[0])+'</a></li>';}).join('');
d.getElementById('hdr').innerHTML='<header class="site-header"><div class="container nav">'+
'<a class="brand" href="index.html"><img class="brand-logo" src="assets/img/logo.png" alt="IsolaVie — isolation extérieure et ravalement"></a>'+
'<nav><ul class="nav-links">'+links+'</ul></nav>'+
'<div class="nav-cta"><a class="nav-phone" href="tel:+33240890035">'+phSvg+'<span>02 40 89 00 35</span></a>'+
'<a class="btn btn--accent" href="contact.html">Devis gratuit</a>'+
'<button class="burger" aria-label="Menu"><span></span><span></span><span></span></button></div></div></header>';
var bl=d.querySelector('.brand-logo');if(bl)bl.onerror=function(){this.parentNode.innerHTML=mark+'<span>Isola<span class="vie">Vie</span></span>';};
var svc=["Isolation par l'extérieur (ITE)", "Ravalement de façade", "ITE sur ossature bois", "Étanchéité de balcons"];
var navls=NAV.map(function(n){return '<li><a href="'+n[1]+'">'+esc(n[0])+'</a></li>';}).join('');
var svls=svc.map(function(s){return '<li><a href="techniques.html">'+esc(s)+'</a></li>';}).join('');
var f=d.getElementById('ftr');if(f){f.innerHTML='<footer class="site-footer"><div class="container"><div class="footer-grid">'+
'<div><a class="brand" href="index.html">'+mark+'<span style="color:#fff">Isola<span class="vie">Vie</span></span></a>'+
'<p>Spécialiste de l\'isolation par l\'extérieur et du ravalement de façade en Loire-Atlantique et Vendée. Une société familiale créée en 2009.</p></div>'+
'<div><h5>Navigation</h5><ul>'+navls+'</ul></div>'+
'<div><h5>Nos services</h5><ul>'+svls+'</ul></div>'+
'<div><h5>Contact</h5><ul class="footer-contact">'+
'<li>'+iconpin()+'<span>13 rue Jean Mermoz, 44980 Sainte-Luce-sur-Loire</span></li>'+
'<li>'+phSvg+'<a href="tel:+33240890035">02 40 89 00 35</a></li>'+
'<li>'+iconmail()+'<a href="mailto:contact@isolavie.fr">contact@isolavie.fr</a></li>'+
'<li>'+iconclock()+'<span>Lun. – Ven. : 8h30 – 17h00</span></li></ul></div>'+
'</div><div class="footer-bottom"><span>© '+new Date().getFullYear()+' IsolaVie — Tous droits réservés.</span>'+
'<span><a href="mentions-legales.html">Mentions légales</a> · <a href="contact.html">Contact</a></span></div></div></footer>';}
function iconpin(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';}
function iconmail(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>';}
function iconclock(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';}
// append lightbox
var lbx=d.createElement('div');lbx.className='lb';lbx.id='lightbox';lbx.innerHTML='<button class="lb-close" aria-label="Fermer">&times;</button><button class="lb-nav prev">&#8249;</button><button class="lb-nav next">&#8250;</button><img src="" alt=""><div class="lb-cap"></div>';d.body.appendChild(lbx);
// mobile nav
var burger=d.querySelector('.burger'),nl=d.querySelector('.nav-links');
if(burger){burger.addEventListener('click',function(){burger.classList.toggle('open');nl.classList.toggle('open');});
nl.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){burger.classList.remove('open');nl.classList.remove('open');});});}
// render galleries
d.querySelectorAll('[data-gallery]').forEach(function(box){var g=(window.GALLERIES||{})[box.getAttribute('data-gallery')]||[];
box.innerHTML=g.map(function(x){var cap=x[0]+(x[1]?' — '+x[1]:'');return '<figure class="g-item" data-cat="'+esc(x[3])+'" data-full="'+esc(x[2])+'" data-caption="'+esc(cap)+'"><img src="'+esc(x[2])+'" alt="'+esc(cap)+'" loading="lazy"><figcaption class="g-cap"><span class="g-type">'+esc(x[0])+'</span>'+(x[1]?'<span class="g-loc">'+esc(x[1])+'</span>':'')+'</figcaption></figure>';}).join('');});
// reveal
var rv=d.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1});rv.forEach(function(el){io.observe(el);});}else{rv.forEach(function(el){el.classList.add('in');});}
// gallery filters + lightbox
var items=[].slice.call(d.querySelectorAll('.g-item'));
d.querySelectorAll('.g-item img').forEach(function(im){if(im.complete&&im.naturalWidth)im.classList.add('loaded');else im.addEventListener('load',function(){im.classList.add('loaded');});});
var filters=d.querySelectorAll('.filter');
filters.forEach(function(fl){fl.addEventListener('click',function(){filters.forEach(function(x){x.classList.remove('active');});fl.classList.add('active');var c=fl.getAttribute('data-filter');items.forEach(function(it){it.style.display=(c==='all'||(it.getAttribute('data-cat')||'').indexOf(c)>-1)?'':'none';});});});
var lb=d.getElementById('lightbox');
if(lb){var im=lb.querySelector('img'),cp=lb.querySelector('.lb-cap'),cl=[],ci=0;
function lbR(){var it=cl[ci];if(!it)return;im.src=it.full;im.alt=it.cap||'';cp.textContent=it.cap||'';}
function lbO(l,i){cl=l;ci=i;lbR();lb.classList.add('open');d.body.style.overflow='hidden';}
function lbC(){lb.classList.remove('open');d.body.style.overflow='';}
function lbS(n){if(!cl.length)return;ci=(ci+n+cl.length)%cl.length;lbR();}
lb.querySelector('.lb-close').addEventListener('click',lbC);
lb.querySelector('.lb-nav.prev').addEventListener('click',function(e){e.stopPropagation();lbS(-1);});
lb.querySelector('.lb-nav.next').addEventListener('click',function(e){e.stopPropagation();lbS(1);});
lb.addEventListener('click',function(e){if(e.target===lb)lbC();});
d.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')lbC();if(e.key==='ArrowLeft')lbS(-1);if(e.key==='ArrowRight')lbS(1);});
// galleries -> lightbox (filter-aware)
items.forEach(function(it){it.addEventListener('click',function(){var vs=items.filter(function(x){return x.style.display!=='none';});var l=vs.map(function(x){return {full:x.getAttribute('data-full'),cap:x.getAttribute('data-caption')};});lbO(l,vs.indexOf(it));});});
// team portraits -> lightbox
var mem=[].slice.call(d.querySelectorAll('.member .avatar')).filter(function(a){return a.querySelector('img');});
var tl=mem.map(function(a){var g=a.querySelector('img'),p=a.parentNode,nm=p.querySelector('.m-name'),rl=p.querySelector('.m-role');return {full:g.getAttribute('src'),cap:(nm?nm.textContent:'')+(rl?' — '+rl.textContent:'')};});
mem.forEach(function(a,i){a.addEventListener('click',function(){lbO(tl,i);});});}
// image download deterrents
d.addEventListener('contextmenu',function(e){if(e.target&&e.target.tagName==='IMG')e.preventDefault();});
d.addEventListener('dragstart',function(e){if(e.target&&e.target.tagName==='IMG')e.preventDefault();});
// hero slideshow
var hs=d.querySelector('.hero-slider');
if(hs){var sl=hs.querySelectorAll('.hero-bg');if(sl.length>1){var si=0;setInterval(function(){sl[si].classList.remove('active');si=(si+1)%sl.length;sl[si].classList.add('active');},5000);}}
// contact form
var form=d.getElementById('contact-form');
if(form){form.addEventListener('submit',function(e){e.preventDefault();var fd=new FormData(form),NL=String.fromCharCode(10);
var b=encodeURIComponent('Nom : '+(fd.get('nom')||'')+NL+'Email : '+(fd.get('email')||'')+NL+'Téléphone : '+(fd.get('telephone')||'')+NL+NL+(fd.get('message')||''));
window.location.href='mailto:contact@isolavie.fr?subject='+encodeURIComponent('Demande de contact')+'&body='+b;
var n=form.querySelector('.form-status');if(n)n.textContent='Votre logiciel de messagerie va s\'ouvrir pour envoyer le message.';});}
})();