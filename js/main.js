// Anti-download protection on images (delegated, no per-img mutation for perf)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
}, { passive: false });
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
}, { passive: false });

// Carte zones interactives
const deptInfo = {
    '44': {name:'Loire-Atlantique', text:"Nantes, Saint-Nazaire, Sainte-Luce-sur-Loire (siège), La Chapelle-sur-Erdre, Orvault, Rezé, Saint-Herblain — département historique de nos interventions."},
    '49': {name:'Maine-et-Loire', text:"Angers, Cholet, Saumur — interventions particuliers et chantiers professionnels (copropriétés, tertiaire)."},
    '85': {name:'Vendée', text:"La Roche-sur-Yon, Les Sables-d'Olonne, Fontenay-le-Comte — isolation ITE et ravalement sur le littoral vendéen et l'intérieur."}
};
document.querySelectorAll('.dept').forEach(p => {
    p.addEventListener('click', e => {
        document.querySelectorAll('.dept.active').forEach(x => x.classList.remove('active'));
        p.classList.add('active');
        const code = p.getAttribute('data-code');
        const info = deptInfo[code];
        const box = document.querySelector('.carte-info');
        if (info && box) {
            box.innerHTML = `<h4>${code} · ${info.name}</h4><p>${info.text}</p>`;
        }
    });
});

// Hero slideshow crossfade (delayed to not block LCP)
window.addEventListener('load', () => {
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 1) {
        let heroIdx = 0;
        setInterval(() => {
            heroSlides[heroIdx].classList.remove('active');
            heroIdx = (heroIdx + 1) % heroSlides.length;
            heroSlides[heroIdx].classList.add('active');
        }, 5000);
    }
});

// Sticky header scroll shadow
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Burger menu
const burger = document.querySelector('.burger');
const mobileNav = document.getElementById('mobile-nav');
if (burger && mobileNav) {
    burger.addEventListener('click', () => {
        const open = burger.classList.toggle('open');
        mobileNav.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
    });
    mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            burger.classList.remove('open');
            mobileNav.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
        });
    });
}

// Reveal on scroll (add auto-reveal to team-cards with stagger + wrap img in photo container + color cycling)
document.querySelectorAll('.team-grid .team-card').forEach((card, i) => {
    card.classList.add('reveal', 'reveal-team');
    card.style.setProperty('--reveal-delay', `${(i % 12) * 60}ms`);
    const img = card.querySelector('img');
    if (img && !card.querySelector('.team-card-photo')) {
        const wrap = document.createElement('div');
        wrap.className = 'team-card-photo';
        img.parentNode.insertBefore(wrap, img);
        wrap.appendChild(img);
    }
});
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealItems.length) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' });
    revealItems.forEach(el => io.observe(el));
}

// Counter animation
const counters = document.querySelectorAll('[data-count]');
if ('IntersectionObserver' in window && counters.length) {
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const animate = (el) => {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1600;
        const start = performance.now();
        const step = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const val = Math.floor(easeOut(p) * target);
            el.textContent = val.toLocaleString('fr-FR');
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString('fr-FR');
        };
        requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animate(e.target);
                cio.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
}

// Year in footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Smooth anchor scrolling with header offset
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    });
});

// Recrutement — modal contact par email (fallback quand mailto ne fait rien)
(function(){
  var EMAIL='contact@isolavie.fr', SUBJ="Candidature - Rejoindre l'équipe IsolaVie";
  var BODY="Bonjour,\n\nJe souhaite candidater chez IsolaVie.\n\nMon nom :\nMon téléphone :\nLe poste qui m'intéresse :\n\nPièces jointes : CV et lettre de motivation.";
  function esc(s){ return encodeURIComponent(s); }
  function openModal(e){
    if(e) e.preventDefault();
    if(document.getElementById('rec-modal')) return;
    var mail='mailto:'+EMAIL+'?subject='+esc(SUBJ)+'&body='+esc(BODY);
    var gmail='https://mail.google.com/mail/?view=cm&fs=1&to='+EMAIL+'&su='+esc(SUBJ)+'&body='+esc(BODY);
    var out='https://outlook.live.com/mail/0/deeplink/compose?to='+EMAIL+'&subject='+esc(SUBJ)+'&body='+esc(BODY);
    var h='<div class="rec-overlay" id="rec-modal"><div class="rec-modal" role="dialog"><button class="rec-close" aria-label="Fermer">×</button><h2>Nous contacter — Recrutement</h2><p>Envoyez votre candidature à :</p><div class="rec-email" id="rec-email">'+EMAIL+'</div><div class="rec-copy-wrap"><button class="rec-copy" id="rec-copy">📋 Copier l\'adresse</button><span class="rec-copied" id="rec-copied" hidden>✓ Copié !</span></div><p class="rec-or">Ou composez votre message directement :</p><div class="rec-btns"><a href="'+gmail+'" target="_blank" rel="noopener" class="rec-btn">✉ Gmail (web)</a><a href="'+out+'" target="_blank" rel="noopener" class="rec-btn">✉ Outlook (web)</a><a href="'+mail+'" class="rec-btn rec-btn-primary">Mon client mail</a></div></div></div>';
    var d=document.createElement('div'); d.innerHTML=h;
    var overlay=d.firstChild; document.body.appendChild(overlay);
    setTimeout(function(){ overlay.classList.add('open'); }, 10);
    overlay.addEventListener('click', function(ev){ if(ev.target===overlay || ev.target.classList.contains('rec-close')) close(); });
    document.getElementById('rec-copy').addEventListener('click', function(){
      try { navigator.clipboard.writeText(EMAIL).then(function(){ var c=document.getElementById('rec-copied'); c.hidden=false; setTimeout(function(){c.hidden=true;},2000); }); } catch(e){}
    });
    function close(){ overlay.classList.remove('open'); setTimeout(function(){ if(overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 300); }
  }
  document.addEventListener('click', function(e){
    var t=e.target.closest('[data-rec-email]');
    if(t) openModal(e);
  });
})();


// Lightbox pour galeries chantiers
(function(){
  var items=[], cur=0, overlay=null;

  function collect(){
    items=[].slice.call(document.querySelectorAll('.gallery-grid .gallery-item')).map(function(fig){
      var img=fig.querySelector('img'), cap=fig.querySelector('figcaption');
      return {
        src: img?img.src:'',
        alt: img?img.alt:'',
        title: cap?(cap.querySelector('strong')||{}).textContent||'':'',
        loc: cap?(cap.querySelector('span')||{}).textContent||'':''
      };
    });
  }

  function open(i){
    cur=i;
    if(!overlay){
      overlay=document.createElement('div');
      overlay.className='lb-overlay';
      overlay.innerHTML='<button class="lb-close" aria-label="Fermer">×</button><button class="lb-nav lb-prev" aria-label="Précédent">‹</button><button class="lb-nav lb-next" aria-label="Suivant">›</button><div class="lb-stage"><img class="lb-img" alt=""><div class="lb-caption"><strong></strong><span></span><em class="lb-counter"></em></div></div>';
      document.body.appendChild(overlay);
      overlay.querySelector('.lb-close').addEventListener('click', close);
      overlay.querySelector('.lb-prev').addEventListener('click', prev);
      overlay.querySelector('.lb-next').addEventListener('click', next);
      overlay.addEventListener('click', function(e){ if(e.target===overlay) close(); });
      document.addEventListener('keydown', onKey);
    }
    render();
    document.body.style.overflow='hidden';
    setTimeout(function(){ overlay.classList.add('open'); },10);
  }

  function render(){
    var it=items[cur];
    overlay.querySelector('.lb-img').src=it.src;
    overlay.querySelector('.lb-img').alt=it.alt;
    overlay.querySelector('.lb-caption strong').textContent=it.title;
    overlay.querySelector('.lb-caption span').textContent=it.loc;
    overlay.querySelector('.lb-counter').textContent=(cur+1)+' / '+items.length;
  }

  function close(){
    if(!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow='';
    setTimeout(function(){ if(overlay&&overlay.parentNode){ overlay.parentNode.removeChild(overlay); overlay=null; } },250);
  }

  function prev(){ cur=(cur-1+items.length)%items.length; render(); }
  function next(){ cur=(cur+1)%items.length; render(); }

  function onKey(e){
    if(!overlay||!overlay.classList.contains('open')) return;
    if(e.key==='Escape') close();
    else if(e.key==='ArrowLeft') prev();
    else if(e.key==='ArrowRight') next();
  }

  document.addEventListener('DOMContentLoaded', function(){
    var figs=document.querySelectorAll('.gallery-grid .gallery-item');
    if(!figs.length) return;
    collect();
    figs.forEach(function(fig,i){
      fig.style.cursor='zoom-in';
      fig.addEventListener('click', function(e){ e.preventDefault(); open(i); });
    });

    // Swipe mobile
    var sx=0;
    document.addEventListener('touchstart', function(e){ if(overlay&&overlay.classList.contains('open')) sx=e.touches[0].clientX; }, {passive:true});
    document.addEventListener('touchend', function(e){
      if(!overlay||!overlay.classList.contains('open')) return;
      var dx=e.changedTouches[0].clientX-sx;
      if(Math.abs(dx)>50){ if(dx>0) prev(); else next(); }
    }, {passive:true});
  });
})();
