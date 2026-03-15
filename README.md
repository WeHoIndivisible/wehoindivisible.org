# West Hollywood Indivisible — Site

Website for **West Hollywood Indivisible** at [wehoindivisible.org](https://wehoindivisible.org).

Built in plain HTML5/CSS/JS. No build system required. Hosted on GitHub Pages.

---

## File Structure

```
/
├── index.html              Homepage
├── actions.html            Calls to action
├── events.html             Upcoming events
├── get-involved.html       How to get involved + volunteer form
├── representatives.html    Find your reps
├── about.html              About the group
├── contact.html            Contact + sign-up form
├── css/
│   └── style.css           All styles
├── js/
│   └── main.js             Nav injection, forms, rep lookup
├── CNAME                   Custom domain (wehoindivisible.org)
└── README.md               This file
```

---

## Setup: GitHub Pages

1. Create a new GitHub repository (e.g. `wehoindivisible.org`)
2. Push all files to the `main` branch
3. Go to **Settings → Pages**
4. Set Source to: `Deploy from a branch` → `main` → `/ (root)`
5. Under **Custom domain**, enter: `wehoindivisible.org`
6. At your domain registrar, set DNS records:
   - `A` records pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - `CNAME` record: `www` → `YOUR-GITHUB-USERNAME.github.io`
7. Wait up to 24 hours for DNS propagation
8. Enable "Enforce HTTPS" once available

Full instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

---

## Setup: Formspree (Contact Forms)

The site uses [Formspree](https://formspree.io) for all forms. It's free for low-volume use.

**Steps:**
1. Go to [formspree.io/register](https://formspree.io/register) and create a free account
2. Create a new form — you'll get a form ID that looks like: `xpwzgkrb`
3. In each HTML file, replace `YOUR_FORM_ID` with your actual ID:
   ```html
   action="https://formspree.io/f/xpwzgkrb"
   ```
4. Files that contain this placeholder:
   - `index.html` (homepage signup)
   - `get-involved.html` (volunteer form)
   - `contact.html` (contact/signup form)

You can use the same form ID for all three, or create separate forms and give them distinct names in Formspree. Separate forms make it easier to tell where submissions came from.

**Formspree free tier:** 50 submissions/month. Upgrade available if needed.

---

## Setup: Cookie Consent (CookieYes)

The site has a placeholder comment for cookie consent in each HTML file. Before going live, especially given GDPR/CCPA considerations:

1. Go to [cookieyes.com/get-started](https://www.cookieyes.com/get-started/) — free plan available
2. Register your domain (`wehoindivisible.org`)
3. CookieYes will give you a script tag like:
   ```html
   <script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/YOURKEY/script.js"></script>
   ```
4. In each HTML file, find the commented-out `<script id="cookieyes"...>` line and replace `YOUR_SITE_ID` with your actual key, then uncomment it

CookieYes free tier covers basic consent banners. Handles CCPA (California) requirements.

---

## Updating Content

**To add a new event:**
- Open `events.html`
- Copy an existing `<article class="event-card">` block
- Update the date, title, location, and description
- Also add a card to `index.html` (the homepage shows the 3 most recent)

**To add a new call to action:**
- Open `actions.html`
- Copy an existing `<article class="action-card">` block
- Update the content, urgency level, and links
- Feature one action on the homepage by updating `index.html` → the `.action-card-featured` section

**To update representative information:**
- Open `representatives.html`
- Find the relevant rep card and update name, phone, and links
- Verify information against official government websites before publishing:
  - Federal: congress.gov
  - State Senate: senate.ca.gov
  - State Assembly: assembly.ca.gov
  - City: weho.org

---

## Indivisible Group Registration

To list WeHo Indivisible on the national Indivisible map and receive group leader updates:
- Register at: https://indivisible.org/group-registration/
- Add events to the Indivisible map via the Group Support Hub:
  https://indivisible.org/indivisible-group-support-hub

---

## Contact

**hello@wehoindivisible.org**
