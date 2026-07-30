// Anti-download protection on images
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.setAttribute('oncontextmenu', 'return false;');
});

// Hero slideshow crossfade
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 1) {
    let heroIdx = 0;
    setInterval(() => {
        heroSlides[heroIdx].classList.remove('active');
        heroIdx = (heroIdx + 1) % heroSlides.length;
        heroSlides[heroIdx].classList.add('active');
    }, 5000);
}

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
const teamColors = [
    'rgba(42,178,231,0.25)',   // blue
    'rgba(245,216,42,0.25)',   // yellow
    'rgba(231,30,118,0.25)',   // pink
    'rgba(140,196,50,0.25)',   // green
    'rgba(245,166,35,0.25)',   // orange
    'rgba(179,32,32,0.25)'     // bordeaux
];
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
    const photoWrap = card.querySelector('.team-card-photo');
    if (photoWrap) photoWrap.style.background = teamColors[i % teamColors.length];
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
