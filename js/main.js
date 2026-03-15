/* =========================================
   WEST HOLLYWOOD INDIVISIBLE — main.js
   ========================================= */

/* ---- Cookiebot consent ---- */
function injectCookiebot() {
  const script = document.createElement('script');
  script.id = 'Cookiebot';
  script.src = 'https://consent.cookiebot.com/uc.js';
  script.setAttribute('data-cbid', '2a545b6d-f995-40a4-95b7-5629ee6457a7');
  script.setAttribute('data-blockingmode', 'auto');
  script.type = 'text/javascript';
  document.head.prepend(script);
}

/* ---- Nav & Footer HTML ---- */
const NAV_HTML = `
  <div id="rainbow-bar" style="position:fixed;top:0;left:0;right:0;height:6px;z-index:1001;background:linear-gradient(to right,#E40303 0%,#E40303 16.666%,#FF8C00 16.666%,#FF8C00 33.333%,#FFED00 33.333%,#FFED00 50%,#008026 50%,#008026 66.666%,#004DFF 66.666%,#004DFF 83.333%,#750787 83.333%,#750787 100%);"></div>
  <nav id="site-nav" role="navigation" aria-label="Main navigation" style="position:fixed;top:6px;left:0;right:0;height:90px;background:#07131C;z-index:1000;display:flex;align-items:center;">
    <div style="width:100%;max-width:1100px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between;">

      <a href="index.html" id="nav-logo" aria-label="West Hollywood Indivisible home" style="display:flex;align-items:center;gap:12px;text-decoration:none;flex-shrink:0;">
        <img src="https://indivisible.org/wp-content/uploads/2025/11/logo-indivisible-lg.svg" alt="Indivisible" id="nav-logo-img" style="height:38px;width:auto;" onerror="this.style.display='none'">
        <div style="width:1px;height:32px;background:rgba(255,255,255,0.2);" id="nav-divider"></div>
        <div>
          <div id="nav-title" style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:1.05rem;color:#fff;text-transform:uppercase;letter-spacing:0.02em;">West Hollywood</div>
          <div id="nav-sub" style="font-family:'Montserrat',sans-serif;font-weight:500;font-size:0.7rem;color:#8AABBF;text-transform:uppercase;letter-spacing:0.12em;">West Hollywood, California</div>
        </div>
      </a>

      <ul id="navLinks" role="list" style="display:flex;align-items:center;gap:2px;list-style:none;margin:0;padding:0;">
        <li><a href="actions.html" class="nav-link">Actions</a></li>
        <li><a href="events.html" class="nav-link">Events</a></li>
        <li><a href="get-involved.html" class="nav-link">Get Involved</a></li>
        <li><a href="representatives.html" class="nav-link">Your Reps</a></li>
        <li><a href="about.html" class="nav-link">About</a></li>
        <li><a href="contact.html" class="nav-link nav-cta">Sign Up</a></li>
      </ul>

      <button id="navHamburger" aria-label="Open menu" aria-expanded="false" style="display:none;flex-direction:column;justify-content:center;gap:5px;background:none;border:none;cursor:pointer;padding:8px;flex-shrink:0;">
        <span class="bar" style="display:block;width:24px;height:2px;background:#fff;transition:all 0.2s ease;"></span>
        <span class="bar" style="display:block;width:24px;height:2px;background:#fff;transition:all 0.2s ease;"></span>
        <span class="bar" style="display:block;width:24px;height:2px;background:#fff;transition:all 0.2s ease;"></span>
      </button>

    </div>
  </nav>

  <div id="mobile-menu" style="display:none;position:fixed;top:96px;left:0;right:0;background:#07131C;z-index:999;border-top:1px solid rgba(255,255,255,0.1);">
    <ul style="list-style:none;margin:0;padding:8px 0;">
      <li><a href="actions.html" style="display:block;padding:14px 24px;font-family:'Montserrat',sans-serif;font-weight:600;font-size:0.9rem;color:rgba(255,255,255,0.8);text-decoration:none;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid rgba(255,255,255,0.06);">Actions</a></li>
      <li><a href="events.html" style="display:block;padding:14px 24px;font-family:'Montserrat',sans-serif;font-weight:600;font-size:0.9rem;color:rgba(255,255,255,0.8);text-decoration:none;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid rgba(255,255,255,0.06);">Events</a></li>
      <li><a href="get-involved.html" style="display:block;padding:14px 24px;font-family:'Montserrat',sans-serif;font-weight:600;font-size:0.9rem;color:rgba(255,255,255,0.8);text-decoration:none;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid rgba(255,255,255,0.06);">Get Involved</a></li>
      <li><a href="representatives.html" style="display:block;padding:14px 24px;font-family:'Montserrat',sans-serif;font-weight:600;font-size:0.9rem;color:rgba(255,255,255,0.8);text-decoration:none;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid rgba(255,255,255,0.06);">Your Reps</a></li>
      <li><a href="about.html" style="display:block;padding:14px 24px;font-family:'Montserrat',sans-serif;font-weight:600;font-size:0.9rem;color:rgba(255,255,255,0.8);text-decoration:none;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid rgba(255,255,255,0.06);">About</a></li>
      <li><a href="contact.html" style="display:block;padding:14px 24px;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.9rem;color:#fff;text-decoration:none;text-transform:uppercase;letter-spacing:0.06em;background:#CA4948;">Sign Up</a></li>
    </ul>
  </div>
`;

const FOOTER_HTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <img class="footer-brand-logo" src="https://indivisible.org/wp-content/uploads/2025/11/logo-indivisible-lg.svg" alt="Indivisible" onerror="this.style.display='none'">
          <span class="footer-brand-name">West Hollywood</span>
          <span class="footer-brand-sub">West Hollywood, California</span>
          <p class="footer-tagline">A small group of neighbors working to protect democracy in our city and beyond. Whatever time you have, it counts.</p>
          <a href="mailto:hello@wehoindivisible.org" class="footer-email">hello@wehoindivisible.org</a>
        </div>
        <div>
          <p class="footer-col-title">Navigate</p>
          <ul class="footer-links" role="list">
            <li><a href="actions.html">Actions</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="get-involved.html">Get Involved</a></li>
            <li><a href="representatives.html">Your Reps</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact &amp; Sign Up</a></li>
          </ul>
        </div>
        <div>
          <p class="footer-col-title">Resources</p>
          <ul class="footer-links" role="list">
            <li><a href="https://indivisible.org" target="_blank" rel="noopener">Indivisible National</a></li>
            <li><a href="https://indivisible.org/resource/guide/" target="_blank" rel="noopener">The Indivisible Guide</a></li>
            <li><a href="https://www.weho.org" target="_blank" rel="noopener">City of West Hollywood</a></li>
            <li><a href="https://www.mobilize.us" target="_blank" rel="noopener">Find More Events</a></li>
            <li><a href="https://www.aclusocal.org" target="_blank" rel="noopener">ACLU of SoCal</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-legal">&copy; 2026 West Hollywood Indivisible. All rights reserved.</p>
        <p class="footer-affil">A local chapter of <a href="https://indivisible.org" target="_blank" rel="noopener">Indivisible</a>. Not affiliated with any political party or candidate.</p>
      </div>
    </div>
  </footer>
`;

/* ---- Inject shared elements ---- */
function injectSharedElements() {
  const navContainer = document.getElementById('site-nav-container');
  if (navContainer) navContainer.innerHTML = NAV_HTML;

  const footerContainer = document.getElementById('site-footer-container');
  if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;

  // Style desktop nav links
  document.querySelectorAll('.nav-link').forEach(a => {
    a.style.cssText = "font-family:'Montserrat',sans-serif;font-weight:600;font-size:0.82rem;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.75);padding:8px 13px;border-radius:4px;text-decoration:none;white-space:nowrap;transition:all 0.2s;";
    a.addEventListener('mouseenter', () => { a.style.color='#fff'; a.style.background='rgba(255,255,255,0.08)'; });
    a.addEventListener('mouseleave', () => { a.style.color='rgba(255,255,255,0.75)'; a.style.background=''; });
  });
  const cta = document.querySelector('.nav-cta');
  if (cta) {
    cta.style.cssText = "font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.82rem;letter-spacing:0.06em;text-transform:uppercase;color:#fff;padding:8px 18px;border-radius:4px;text-decoration:none;background:#CA4948;white-space:nowrap;";
    cta.addEventListener('mouseenter', () => { cta.style.background='#A83736'; });
    cta.addEventListener('mouseleave', () => { cta.style.background='#CA4948'; });
  }

  // Mark active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop().split('#')[0];
    if (linkPage === currentPage) { link.style.color = '#fff'; link.style.background = 'rgba(255,255,255,0.08)'; }
  });

  // Mobile nav — pure JS
  const hamburger   = document.getElementById('navHamburger');
  const desktopLinks = document.getElementById('navLinks');
  const mobileMenu  = document.getElementById('mobile-menu');
  const navDivider  = document.getElementById('nav-divider');
  const navSub      = document.getElementById('nav-sub');
  const navLogoImg  = document.getElementById('nav-logo-img');
  let menuOpen = false;

  function applyLayout() {
    const mobile = window.innerWidth <= 900;
    hamburger.style.display      = mobile ? 'flex' : 'none';
    desktopLinks.style.display   = mobile ? 'none' : 'flex';
    if (navDivider) navDivider.style.display = mobile ? 'none' : 'block';
    if (navSub)     navSub.style.display     = mobile ? 'none' : 'block';
    if (navLogoImg) navLogoImg.style.height  = mobile ? '28px' : '38px';
    if (!mobile && menuOpen) {
      mobileMenu.style.display = 'none';
      menuOpen = false;
    }
  }

  applyLayout();
  window.addEventListener('resize', applyLayout);

  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    menuOpen = !menuOpen;
    mobileMenu.style.display = menuOpen ? 'block' : 'none';
    hamburger.setAttribute('aria-expanded', String(menuOpen));
    const bars = hamburger.querySelectorAll('.bar');
    if (menuOpen) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    }
  });

  document.addEventListener('click', e => {
    if (menuOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      menuOpen = false;
      mobileMenu.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelectorAll('.bar').forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });
}

/* ---- Brevo form submission ---- */
function initForms() {
  document.querySelectorAll('form[data-brevo]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Submitting...';
      btn.disabled = true;
      const msgEl = form.querySelector('.brevo-msg');

      const payload = {
        email:      form.querySelector('input[name="email"]').value.trim(),
        attributes: {
          FIRSTNAME: (form.querySelector('input[name="firstname"]') || {}).value?.trim() || '',
          LASTNAME:  (form.querySelector('input[name="lastname"]')  || {}).value?.trim() || '',
          ZIP:       (form.querySelector('input[name="zip"]')       || {}).value?.trim() || ''
        },
        listIds:      [3],
        updateEnabled: true
      };

      try {
        const res = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'api-key': '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' },
          body: JSON.stringify(payload)
        });
        if (res.status === 201 || res.status === 204) {
          form.innerHTML = '<p class="form-success">You\'re on the list. We\'ll be in touch.</p>';
        } else {
          throw new Error('status ' + res.status);
        }
      } catch (err) {
        btn.textContent = original;
        btn.disabled = false;
        if (msgEl) { msgEl.textContent = 'Something went wrong. Email us at hello@wehoindivisible.org.'; msgEl.style.display = 'block'; }
      }
    });
  });
}

/* ---- Rep lookup ---- */
function initRepLookup() {
  const form = document.getElementById('repLookupForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const zip = document.getElementById('repZip').value.trim();
    if (zip) window.open(`https://www.commoncause.org/find-your-representative/?zip=${encodeURIComponent(zip)}`, '_blank', 'noopener');
  });
}

/* ---- Pull first 3 actions from actions.html ---- */
async function loadActions() {
  const list = document.getElementById('actions-list');
  if (!list) return;
  try {
    const doc = new DOMParser().parseFromString(await (await fetch('actions.html')).text(), 'text/html');
    const cards = Array.from(doc.querySelectorAll('.action-card')).slice(0, 3);
    if (!cards.length) throw new Error('none');
    list.innerHTML = cards.map(card => {
      const id    = card.id || '';
      const title = card.querySelector('.action-card-title')?.textContent?.trim() || '';
      const urg   = card.querySelector('.urgency')?.outerHTML || '';
      const body  = card.querySelector('.action-card-body')?.textContent?.trim() || '';
      const color = card.style.borderLeftColor || 'var(--invis-dark-blue)';
      return `<article class="action-card" style="border-left-color:${color};">
        <div class="action-card-header"><h3 class="action-card-title">${title}</h3>${urg}</div>
        <p class="action-card-body">${body}</p>
        <div class="action-links"><a href="actions.html${id ? '#'+id : ''}" class="btn btn-outline">Read More &amp; Take Action</a></div>
      </article>`;
    }).join('');
  } catch {
    const s = document.getElementById('actions-section');
    if (s) s.style.display = 'none';
  }
}

/* ---- Pull events from events.html ---- */
async function loadEvents() {
  const grid = document.getElementById('events-grid');
  if (!grid) return;
  try {
    const doc = new DOMParser().parseFromString(await (await fetch('events.html')).text(), 'text/html');
    const cards = Array.from(doc.querySelectorAll('.event-card'));
    if (!cards.length) throw new Error('none');
    grid.innerHTML = cards.map(card => {
      const id = card.id || '';
      card.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (!href.startsWith('mailto:') && !href.startsWith('http'))
          a.setAttribute('href', `events.html${id ? '#'+id : ''}`);
      });
      card.querySelectorAll('h2.event-card-title').forEach(h => {
        const h3 = doc.createElement('h3');
        h3.className = h.className; h3.innerHTML = h.innerHTML; h.replaceWith(h3);
      });
      return card.outerHTML;
    }).join('');
  } catch {
    const s = document.getElementById('events-section');
    if (s) s.style.display = 'none';
  }
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  injectCookiebot();
  injectSharedElements();
  initForms();
  initRepLookup();
  loadActions();
  loadEvents();
});
