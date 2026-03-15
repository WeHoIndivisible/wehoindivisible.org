/* =====================================================
   WEST HOLLYWOOD INDIVISIBLE — Brevo Form Handler
   js/brevo-form.js
   =====================================================

   SETUP — do this before going live:

   1. In Brevo: go to Settings → API Keys
   2. Click "Create a new API key"
   3. Name it "WeHo Website Form" and restrict permissions
      to Contacts only (read/write). Do NOT use your master key.
   4. Copy the key and paste it as BREVO_API_KEY below.

   5. In Brevo: go to Contacts → Lists
   6. Find or create your "WeHo Indivisible Signups" list
   7. Note the numeric list ID (visible in the URL when you click the list)
   8. Set that number as BREVO_LIST_ID below.

   ===================================================== */

const BREVO_API_KEY = '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';
const BREVO_LIST_ID = 3;

async function handleBrevoSubmit(e) {
  e.preventDefault();

  const form    = e.target;
  const btn     = form.querySelector('[type="submit"]');
  const msgEl   = form.querySelector('.brevo-msg');
  const original = btn.textContent;

  // Basic consent check
  const consent = form.querySelector('input[name="consent"]');
  if (consent && !consent.checked) {
    showMsg(msgEl, 'error', 'Please confirm your consent to continue.');
    return;
  }

  btn.textContent = 'Submitting…';
  btn.disabled = true;

  const payload = {
    email:         form.querySelector('input[name="email"]').value.trim(),
    attributes: {
      FIRSTNAME:   form.querySelector('input[name="firstname"]').value.trim(),
      LASTNAME:    form.querySelector('input[name="lastname"]').value.trim(),
      ZIP:         (form.querySelector('input[name="zip"]') || {}).value?.trim() || ''
    },
    listIds:       [BREVO_LIST_ID],
    updateEnabled: true          // if contact already exists, just update
  };

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key':       BREVO_API_KEY
      },
      body: JSON.stringify(payload)
    });

    // 201 = created, 204 = already exists and updated — both are success
    if (res.status === 201 || res.status === 204) {
      form.innerHTML = '<p class="form-success">✓ You\'re on the list. We\'ll be in touch.</p>';
      return;
    }

    const data = await res.json().catch(() => ({}));
    // Brevo error code 16 = contact already exists (harmless — updateEnabled handles it,
    // but some API versions return it anyway)
    if (data.code === 'duplicate_parameter' || res.status === 400 && data.message?.includes('already')) {
      form.innerHTML = '<p class="form-success">✓ You\'re already on the list — thank you.</p>';
      return;
    }

    throw new Error(data.message || `Status ${res.status}`);

  } catch (err) {
    console.error('Brevo submit error:', err);
    btn.textContent = original;
    btn.disabled    = false;
    showMsg(msgEl, 'error', 'Something went wrong. Email us at hello@wehoindivisible.org to sign up.');
  }
}

function showMsg(el, type, text) {
  if (!el) return;
  el.textContent = text;
  el.className   = type === 'error' ? 'brevo-msg form-error' : 'brevo-msg form-success';
  el.style.display = 'block';
}

// Attach to all forms marked with data-brevo
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-brevo]').forEach(form => {
    form.addEventListener('submit', handleBrevoSubmit);
  });
});
