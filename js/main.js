/* =========================================
   WEST HOLLYWOOD INDIVISIBLE — main.js
   ========================================= */

/*
  LOGO NOTE:
  The nav uses the national Indivisible SVG logo hosted on indivisible.org.
  Once you have your own chapter logo, replace the <img> src below.
  The national logo URL is:
    https://indivisible.org/wp-content/uploads/2025/11/logo-indivisible-lg.svg

  To download and self-host (recommended for reliability):
    curl -o img/logo-indivisible.svg \
      https://indivisible.org/wp-content/uploads/2025/11/logo-indivisible-lg.svg
  Then update the src to: img/logo-indivisible.svg
*/

const NAV_HTML = `
  <div class="rainbow-bar" aria-hidden="true"></div>
  <nav class="site-nav" aria-label="Main navigation">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo" aria-label="West Hollywood Indivisible — Home">
        <img
          class="nav-logo-img"
          src="https://indivisible.org/wp-content/uploads/2025/11/logo-indivisible-lg.svg"
          alt="Indivisible"
          onerror="this.style.display='none'"
        >
        <div class="nav-logo-divider" aria-hidden="true"></div>
        <div class="nav-logo-text">
          <span class="nav-logo-main">West Hollywood</span>
          <span class="nav-logo-sub">West Hollywood, California</span>
        </div>
      </a>
      <ul class="nav-links" id="navLinks" role="list">
        <li><a href="actions.html">Actions</a></li>
        <li><a href="events.html">Events</a></li>
        <li><a href="get-involved.html">Get Involved</a></li>
        <li><a href="representatives.html">Your Reps</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html" class="nav-cta">Sign Up</a></li>
      </ul>
      <button class="nav-hamburger" id="navHamburger" aria-label="Toggle navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
`;

const FOOTER_HTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <img
            class="footer-brand-logo"
            src="https://indivisible.org/wp-content/uploads/2025/11/logo-indivisible-lg.svg"
            alt="Indivisible"
            onerror="this.style.display='none'"
          >
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
        <p class="footer-legal">&copy; 2025 West Hollywood Indivisible. All rights reserved.</p>
        <p class="footer-affil">A local chapter of <a href="https://indivisible.org" target="_blank" rel="noopener">Indivisible</a>. Not affiliated with any political party or candidate.</p>
      </div>
    </div>
  </footer>
`;

function injectSharedElements() {
  const navContainer = document.getElementById('site-nav-container');
  if (navContainer) navContainer.innerHTML = NAV_HTML;

  const footerContainer = document.getElementById('site-footer-container');
  if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;

  // Mark active nav link — works for both local files and served paths
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    const linkPage = href.split('/').pop().split('#')[0] || 'index.html';
    if (linkPage === currentPage) link.classList.add('active');
  });

  // Mobile hamburger
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ---- Formspree async submission ---- */
function initForms() {
  document.querySelectorAll('form[data-formspree]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.innerHTML = '<p class="form-success">✓ Got it — we\'ll be in touch soon.</p>';
        } else {
          throw new Error('Non-OK response');
        }
      } catch {
        btn.textContent = original;
        btn.disabled = false;
        let err = form.querySelector('.form-error');
        if (!err) {
          err = document.createElement('p');
          err.className = 'form-error';
          form.appendChild(err);
        }
        err.textContent = 'Something went wrong. Email us directly at hello@wehoindivisible.org.';
      }
    });
  });
}

/* ---- Rep ZIP lookup ---- */
function initRepLookup() {
  const form = document.getElementById('repLookupForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const zip = document.getElementById('repZip').value.trim();
    if (zip) {
      window.open(`https://www.commoncause.org/find-your-representative/?zip=${encodeURIComponent(zip)}`, '_blank', 'noopener noreferrer');
    }
  });
}

/* ---- Actions: pull first 3 cards from actions.html ---- */
async function loadActions() {
  const list = document.getElementById('actions-list');
  if (!list) return;

  try {
    const res  = await fetch('actions.html');
    const text = await res.text();
    const doc  = new DOMParser().parseFromString(text, 'text/html');

    const cards = Array.from(doc.querySelectorAll('.action-card')).slice(0, 3);
    if (!cards.length) throw new Error('No action cards found');

    list.innerHTML = cards.map(card => {
      const id = card.id || '';
      // Trim to just title, urgency, first body paragraph, and a single link to the full page
      const title   = card.querySelector('.action-card-title')?.textContent?.trim() || '';
      const urgency = card.querySelector('.urgency')?.outerHTML || '';
      const body    = card.querySelector('.action-card-body')?.textContent?.trim() || '';
      const borderColor = card.style.borderLeftColor || 'var(--invis-dark-blue)';

      return `
        <article class="action-card" style="border-left-color:${borderColor};">
          <div class="action-card-header">
            <h3 class="action-card-title">${title}</h3>
            ${urgency}
          </div>
          <p class="action-card-body">${body}</p>
          <div class="action-links">
            <a href="actions.html${id ? '#' + id : ''}" class="btn btn-outline">Read More &amp; Take Action</a>
          </div>
        </article>`;
    }).join('');

  } catch (err) {
    console.warn('Actions load failed:', err);
    const section = document.getElementById('actions-section');
    if (section) section.style.display = 'none';
  }
}

/* ---- Events: pull cards from events.html ---- */
async function loadEvents() {
  const grid = document.getElementById('events-grid');
  if (!grid) return;

  try {
    const res  = await fetch('events.html');
    const text = await res.text();
    const doc  = new DOMParser().parseFromString(text, 'text/html');

    const cards = Array.from(doc.querySelectorAll('.event-card'));
    if (!cards.length) throw new Error('No event cards found');

    grid.innerHTML = cards.map(card => {
      // Fix any relative links to point to events.html#id
      const id = card.id || '';
      card.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        // If it's a mailto or external link, leave it alone
        if (!href.startsWith('mailto:') && !href.startsWith('http')) {
          a.setAttribute('href', `events.html${id ? '#' + id : ''}`);
        }
      });
      // Replace h2 with h3 for correct heading hierarchy on homepage
      card.querySelectorAll('h2.event-card-title').forEach(h => {
        const h3 = doc.createElement('h3');
        h3.className = h.className;
        h3.innerHTML = h.innerHTML;
        h.replaceWith(h3);
      });
      return card.outerHTML;
    }).join('');

  } catch (err) {
    console.warn('Events load failed:', err);
    // Hide section cleanly if fetch fails
    const section = document.getElementById('events-section');
    if (section) section.style.display = 'none';
  }
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  injectSharedElements();
  initForms();
  initRepLookup();
  loadActions();
  loadEvents();
});
