/* =====================================================
   WEST HOLLYWOOD INDIVISIBLE — Signup Form Handler
   js/signup-form.js

   Handles form submissions from index.html, contact.html,
   and get-involved.html. Posts to our own Worker at
   https://wehoindivisible.org/signup, which writes to the
   Google Sheet.
   ===================================================== */

const SIGNUP_URL = 'https://wehoindivisible.org/signup';

async function handleSignupSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('[type="submit"]');
  const msgEl = form.querySelector('.signup-msg');
  const originalBtnText = btn.textContent;

  // Consent check
  const consent = form.querySelector('input[name="consent"]');
  if (consent && !consent.checked) {
    showMsg(msgEl, 'error', 'Please confirm your consent to continue.');
    return;
  }

  btn.textContent = 'Submitting…';
  btn.disabled = true;

  const payload = {
    email: (form.querySelector('input[name="email"]') || {}).value?.trim() || '',
    first_name: (form.querySelector('input[name="firstname"]') || {}).value?.trim() || '',
    last_name: (form.querySelector('input[name="lastname"]') || {}).value?.trim() || '',
    zip_code: (form.querySelector('input[name="zip"]') || {}).value?.trim() || '',
    source: form.dataset.source || 'website',
    website: (form.querySelector('input[name="website"]') || {}).value?.trim() || ''
  };

  try {
    const res = await fetch(SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      form.innerHTML = '<p class="form-success">✓ ' + (data.message || "You're on the list.") + '</p>';
      return;
    }

    showMsg(msgEl, 'error', data.error || 'Something went wrong. Please try again.');
  } catch (err) {
    console.error('Signup submit error:', err);
    showMsg(msgEl, 'error', 'Something went wrong. Email us at hello@wehoindivisible.org to sign up.');
  } finally {
    btn.textContent = originalBtnText;
    btn.disabled = false;
  }
}

function showMsg(el, type, text) {
  if (!el) return;
  el.textContent = text;
  el.className = type === 'error' ? 'signup-msg form-error' : 'signup-msg form-success';
  el.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-signup]').forEach(form => {
    form.addEventListener('submit', handleSignupSubmit);
  });
});
