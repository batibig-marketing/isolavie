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
