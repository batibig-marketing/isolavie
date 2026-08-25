(function(){
  var CK='isolavie_cookie_prefs', OVERLAY_ID='ck-overlay';
  function get(){ try{ return JSON.parse(localStorage.getItem(CK)||'null'); }catch(e){ return null; } }
  function set(v){ try{ localStorage.setItem(CK, JSON.stringify(v)); }catch(e){} }

  function tmpl(){
    return '<div class="ck-modal" role="dialog" aria-modal="true" aria-labelledby="ck-title">'
      + '<div class="ck-tabs"><button class="ck-tab active" data-tab="main">Consentement</button><button class="ck-tab" data-tab="custom">Personnaliser</button></div>'
      + '<div class="ck-body">'
        + '<div class="ck-view ck-main">'
          + '<h2 id="ck-title">🍪 Vos préférences cookies</h2>'
          + '<p>Ce site utilise des cookies pour fonctionner. Nous n\'utilisons <strong>aucun cookie publicitaire</strong> ni traceur commercial. Vous pouvez accepter tous les cookies, les refuser ou personnaliser vos préférences.</p>'
          + '<p class="ck-mini">Voir notre <a href="/cookies.html">politique cookies</a> pour le détail.</p>'
          + '<div class="ck-actions">'
            + '<button class="ck-btn ck-accept" data-action="accept">Tout accepter</button>'
            + '<button class="ck-btn ck-refuse" data-action="refuse">Tout refuser</button>'
            + '<button class="ck-btn ck-custom" data-tab-jump="custom">Personnaliser</button>'
          + '</div>'
        + '</div>'
        + '<div class="ck-view ck-cust" hidden>'
          + '<h2>Personnaliser vos cookies</h2>'
          + '<div class="ck-row"><div><strong>Cookies essentiels</strong><p>Indispensables au fonctionnement du site (mémorisation de vos préférences cookies).</p></div><span class="ck-toggle ck-locked">Toujours actifs</span></div>'
          + '<div class="ck-row"><div><strong>Cookies de mesure d\'audience</strong><p>Nous aident à comprendre l\'utilisation du site (aucun outil actif à ce jour).</p></div><label class="ck-sw"><input type="checkbox" data-cat="analytics"><span></span></label></div>'
          + '<div class="ck-row"><div><strong>Cookies marketing</strong><p>Publicité ciblée et réseaux sociaux (aucun outil actif à ce jour).</p></div><label class="ck-sw"><input type="checkbox" data-cat="marketing"><span></span></label></div>'
          + '<div class="ck-actions">'
            + '<button class="ck-btn ck-accept" data-action="save">Enregistrer mes choix</button>'
            + '<button class="ck-btn ck-refuse" data-action="refuse">Refuser tout</button>'
          + '</div>'
        + '</div>'
      + '</div></div>';
  }

  function show(){
    if(document.getElementById(OVERLAY_ID)) return;
    var o = document.createElement('div');
    o.id = OVERLAY_ID;
    o.className = 'ck-overlay';
    o.innerHTML = tmpl();
    document.body.appendChild(o);
    setTimeout(function(){ o.classList.add('open'); }, 20);
    bind(o);
  }
  function hide(){
    var o = document.getElementById(OVERLAY_ID);
    if(!o) return;
    o.classList.remove('open');
    setTimeout(function(){ if(o.parentNode) o.parentNode.removeChild(o); }, 300);
  }

  function bind(o){
    o.querySelectorAll('.ck-tab').forEach(function(t){
      t.addEventListener('click', function(){
        var name = t.dataset.tab;
        o.querySelectorAll('.ck-tab').forEach(function(x){ x.classList.remove('active'); });
        t.classList.add('active');
        o.querySelector('.ck-main').hidden = (name!=='main');
        o.querySelector('.ck-cust').hidden = (name!=='custom');
      });
    });
    o.querySelectorAll('[data-tab-jump]').forEach(function(b){
      b.addEventListener('click', function(){
        o.querySelector('[data-tab="'+b.dataset.tabJump+'"]').click();
      });
    });
    o.querySelectorAll('[data-action]').forEach(function(b){
      b.addEventListener('click', function(){
        var a = b.dataset.action;
        var prefs = { essential:true, analytics:false, marketing:false, ts: Date.now() };
        if(a==='accept'){ prefs.analytics=true; prefs.marketing=true; }
        else if(a==='refuse'){ prefs.analytics=false; prefs.marketing=false; }
        else if(a==='save'){
          o.querySelectorAll('.ck-cust input[data-cat]').forEach(function(i){
            prefs[i.dataset.cat] = i.checked;
          });
        }
        set(prefs);
        hide();
      });
    });
  }

  window.openCookieSettings = show;

  document.addEventListener('DOMContentLoaded', function(){
    if(!get()) show();
    // Attach to any footer link with data-cookie-settings
    document.querySelectorAll('[data-cookie-settings]').forEach(function(el){
      el.addEventListener('click', function(e){ e.preventDefault(); show(); });
    });
  });
})();
