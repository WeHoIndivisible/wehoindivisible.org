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

/* ---- Footer HTML ---- */
const FOOTER_HTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
            <div>
              <span class="footer-brand-name">West Hollywood</span>
              <span class="footer-brand-sub">California</span>
            </div>
            <div style="width:1px;height:32px;background:rgba(255,255,255,0.2);flex-shrink:0;"></div>
            <img class="footer-brand-logo" src="logo-indivisible.svg" alt="Indivisible" onerror="this.style.display='none'" style="height:28px;width:auto;display:block;">
          </div>
          <p class="footer-tagline">West Hollywood Indivisible is a member-led group. We have a small coordinating team to help with meetings, communications, and logistics, but that team does not have greater decision-making authority than any other member. Its role is to support the work of the group, not to set political direction on its own, and major decisions will be made through an open process that gives all members a meaningful voice.</p>
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

/* ---- Inject footer + mark active nav link ---- */
function initPage() {
  // Footer
  const footerEl = document.getElementById('site-footer-container');
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  // Mark active desktop nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#whi-desktop-links a, #whi-mobile-menu a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop().split('#')[0];
    if (linkPage === currentPage) {
      link.style.color = '#fff';
      link.style.background = 'rgba(255,255,255,0.12)';
    }
  });
}

/* ---- Pull first 3 actions from actions.html ---- */
async function loadActions() {
  const list = document.getElementById('actions-list');
  if (!list) return;
  try {
    const doc = new DOMParser().parseFromString(
      await (await fetch('actions.html')).text(), 'text/html'
    );
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
    const doc = new DOMParser().parseFromString(
      await (await fetch('events.html')).text(), 'text/html'
    );
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
  initPage();
  loadActions();
  loadEvents();
});
