/* IsolaVie — team portrait enlarge + image download deterrents */
(function () {
  'use strict';
  var d = document;
  // Deter casual download: block right-click save and drag on images
  d.addEventListener('contextmenu', function (e) { if (e.target && e.target.tagName === 'IMG') e.preventDefault(); });
  d.addEventListener('dragstart', function (e) { if (e.target && e.target.tagName === 'IMG') e.preventDefault(); });

  // Click a team portrait to enlarge it (reuses existing .lb lightbox styles)
  var mem = [].slice.call(d.querySelectorAll('.member .avatar')).filter(function (a) { return a.querySelector('img'); });
  if (!mem.length) return;
  var tl = mem.map(function (a) {
    var g = a.querySelector('img'), p = a.parentNode,
        nm = p.querySelector('.m-name'), rl = p.querySelector('.m-role');
    return { full: g.getAttribute('src'), cap: (nm ? nm.textContent : '') + (rl ? ' — ' + rl.textContent : '') };
  });
  var ov = d.createElement('div');
  ov.className = 'lb';
  ov.id = 'team-lightbox';
  ov.innerHTML = '<button class="lb-close" aria-label="Fermer">&times;</button>' +
    '<button class="lb-nav prev" aria-label="Précédent">&#8249;</button>' +
    '<button class="lb-nav next" aria-label="Suivant">&#8250;</button>' +
    '<img src="" alt=""><div class="lb-cap"></div>';
  d.body.appendChild(ov);
  var im = ov.querySelector('img'), cp = ov.querySelector('.lb-cap'), ci = 0;
  function render() { var it = tl[ci]; if (!it) return; im.src = it.full; im.alt = it.cap; cp.textContent = it.cap; }
  function open(i) { ci = i; render(); ov.classList.add('open'); d.body.style.overflow = 'hidden'; }
  function close() { ov.classList.remove('open'); d.body.style.overflow = ''; }
  function step(n) { ci = (ci + n + tl.length) % tl.length; render(); }
  mem.forEach(function (a, i) { a.addEventListener('click', function () { open(i); }); });
  ov.querySelector('.lb-close').addEventListener('click', close);
  ov.querySelector('.lb-nav.prev').addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
  ov.querySelector('.lb-nav.next').addEventListener('click', function (e) { e.stopPropagation(); step(1); });
  ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
  d.addEventListener('keydown', function (e) {
    if (!ov.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();