# 1 CRORE is a SIMPLE MATH — Premium Sales Landing Page

A luxury, conversion-focused landing page for the digital ebook
**“1 CRORE is a SIMPLE MATH — The Complete Indian Clothing Business Blueprint”** by **Sujit Singh**.

Built with **HTML5 + CSS3 + vanilla JavaScript**. No frameworks, no build step, no external
CDNs — fonts and images are self-hosted, so it works offline and deploys anywhere.

All page content was written from the actual 63-page ebook PDF. The 3D book mockup uses the
**real cover**, and the “Inside the Ebook” carousel shows **real interior pages** rendered
from the PDF. No fake testimonials, timers, scarcity or income claims.

---

## Language: Hinglish (Roman-script Hindi)

All customer-facing copy — headings, subheadings, paragraphs, features, benefits, FAQs,
CTAs, footer, accessibility labels, carousel captions and the three policy pages — is
written in natural, professional **Hinglish**, matching the tone of the ebook itself.
`<html lang="hi-Latn">` and `og:locale = hi_IN` are set accordingly.

**Deliberately kept in English** (please don’t “translate” these):

| Kept in English | Why |
|---|---|
| `1 CRORE is a SIMPLE MATH` | Actual product name, printed on the cover |
| `The Complete Indian Clothing Business Blueprint` | Actual book subtitle, printed on the cover |
| The 19 chapter names + `Appendix A — All-India Manufacturing Cluster Directory` | Real chapter titles from the ebook’s table of contents — renaming them would misrepresent the product |
| `BUY NOW` | Standard Indian e-commerce CTA; also keeps the four purchase buttons exactly as briefed |
| Business terms: Business, Marketing, Sales, Profit, Strategy, Ebook, Revenue, Inventory, SKU, MOQ, GST, RTO, CPM/CTR/CPC/CPA/ROAS, Meesho, Meta Ads, Google Sheets | Standard industry vocabulary |
| `VERIFIED / ESTIMATE / EXAMPLE / ASSUMPTION` | The book’s own tag names (their explanations are in Hinglish) |
| Inside-the-ebook page screenshots | Real PDF pages — already Hinglish, never altered |

### Hero headline highlight

The hero’s second line reads **`1 CRORE is a SIMPLE MATH`** and is wrapped in a hand-drawn
red ellipse (`.hero-scribble`, colour `#E23B2E`). It is an inline SVG overlay:
`position: absolute`, `pointer-events: none`, `aria-hidden="true"` — so it adds **zero**
layout shift and is skipped by screen readers. It scales with the headline via `em` units
and `vector-effect: non-scaling-stroke`, and a `max-width: 360px` rule keeps the full stroke
inside narrow viewports. To remove the circle, delete the `<svg class="hero-scribble">…</svg>`
from the `<h1>` in `index.html`; to recolour it, change the `stroke` value in `css/style.css`.

The Hinglish conversion changed **text only**: `css/style.css`, all fonts, all images and
every HTML class/id/structure are byte-for-byte identical to the previous version, so the
design, layout, animations and responsiveness are unchanged. Price (₹249), the GetVik
checkout URL and all payment behaviour are untouched.

---

## 1. Folder structure

```
landing-page/
├── index.html              ← the complete landing page (all 10 sections)
├── privacy.html            ← Privacy Policy (editable template)
├── terms.html              ← Terms & Conditions (editable template)
├── refund.html             ← Refund Policy (editable template — add your real terms)
├── README.md               ← this file
├── css/
│   └── style.css           ← complete stylesheet (design system + responsive + animations)
├── js/
│   └── main.js             ← nav, scroll reveal, carousel, FAQ, sticky buy bar
└── assets/
    ├── favicon.svg
    ├── fonts/
    │   ├── fraunces-normal.woff2   (self-hosted variable serif)
    │   ├── fraunces-italic.woff2
    │   └── inter-normal.woff2      (self-hosted variable sans)
    └── img/
        ├── cover.webp              (real ebook cover, from the PDF)
        ├── og-image.jpg            (1200×630 social share image)
        ├── page-toc.webp           (real page 3  — contents)
        ├── page-scripts.webp       (real page 16 — manufacturer scripts)
        ├── page-pnl.webp           (real page 47 — per-order P&L)
        ├── page-crore.webp         (real page 50 — ₹1 crore math)
        ├── page-plan.webp          (real page 57 — 90-day plan)
        ├── page-directory.webp     (real page 62 — cluster directory)
        ├── page-budget.webp        (spare real page — stock budgets)
        └── page-readfirst.webp     (spare real page — “read this first”)
```

## 2. Run locally

No installation or build needed. Any static file server works.

**Option A — Python (pre-installed on most machines):**
```bash
cd landing-page
python3 -m http.server 8000
# open http://localhost:8000
```

**Option B — Node:**
```bash
cd landing-page
npx serve .
```

**Option C — VS Code:** install the “Live Server” extension and click *Go Live*.

> Opening `index.html` by double-clicking also works — everything is self-contained.

## 3. Edit the price, contact details and policies

Search `index.html` for the ✏️ markers:

| What | Where | Notes |
|---|---|---|
| **Price** | `index.html` → `✏️ EDIT PRICE HERE` (purchase section, `<span class="price">₹249</span>`) | ₹249 matched the live GetVik checkout on 04 Nov 2026. Also update the sticky-bar price (`✏️ Keep in sync`). |
| **Contact email / WhatsApp / hours** | `index.html` → footer, `✏️ EDIT CONTACT DETAILS HERE` | Replace `your-email@example.com` and `+91 00000 00000` everywhere (also in the 3 policy pages). |
| **Legal pages** | `privacy.html`, `terms.html`, `refund.html` | Editable templates. Replace every `[bracketed placeholder]`. The refund page deliberately promises nothing until you add your real terms. |
| **Canonical URL / OG image URL** | `index.html` `<head>` | Uncomment the canonical tag and set absolute URLs (e.g. `https://your-domain.com/assets/img/og-image.jpg`) for best social sharing. |

## 4. Checkout links (do not change)

Every BUY NOW button — navigation, hero, math section, final purchase panel, mobile sticky
bar, and the buttons on the three policy pages — points to exactly:

```
https://getvik.com/checkout?productId=6aeb3442b8b6e679919b977d&productSlug=1-crore-clothing-business&theme=light
```

If you ever need to change it, search for `getvik.com/checkout` and update **all** occurrences.

## 5. Deploy

### GitHub Pages (free)
1. Create a new GitHub repository, e.g. `clore-landing` (any name).
2. Upload the **contents** of `landing-page/` to the repository root
   (so `index.html` sits at the top level), or push via git:
   ```bash
   cd landing-page
   git init && git add . && git commit -m "Landing page"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
4. Your site goes live at `https://<you>.github.io/<repo>/` within a minute or two.
   All asset paths are relative, so it works under a subpath automatically.

### Render (free static site)
1. Push the same repository to GitHub (steps above).
2. Render Dashboard → **New → Static Site** → connect the repo.
3. Settings: **Build command:** *(leave empty)* · **Publish directory:** `.`
   (If you keep the files inside a `landing-page/` folder in the repo, set publish directory to `landing-page`.)
4. Deploy. Render gives you a `https://<name>.onrender.com` URL; add your custom domain under *Settings → Custom Domains*.

### Any other host
Netlify, Vercel, Cloudflare Pages, Hostinger, cPanel — upload the folder as-is. It's 100% static.

## 6. What was tested

Automated Chromium tests (Playwright) at 1440px, 768px, 390px and 320px:

- ✅ All 8 BUY NOW buttons across 4 pages resolve to the exact checkout URL
- ✅ All 10 sections present; 19 chapter cards, 4 audience cards, 6 FAQs
- ✅ No horizontal overflow at any viewport; mobile menu open/close/anchor scroll
- ✅ Carousel (buttons, dots, keyboard, swipe), FAQ accordion, sticky bar show/hide logic
- ✅ All images load; zero console errors; zero failed requests
- ✅ One `<h1>`, semantic sections, ARIA labels, keyboard focus styles, reduced-motion support

## 7. Performance & SEO notes

- Initial payload ≈ 270 KB (HTML + CSS + JS + 2 fonts + cover). Interior page images lazy-load.
- Self-hosted variable fonts (`font-display: swap`), preloaded cover + fonts.
- Meta description, Open Graph/Twitter cards, honest `Book` JSON-LD (no fake ratings).
- To enable analytics later, add your snippet before `</body>` and update `privacy.html`.

## 8. Honesty guardrails (please keep)

The page deliberately contains **no** testimonials, countdown timers, stock-scarcity claims,
or income guarantees — matching the ebook’s own disclosure that ₹1 crore is a mathematical
target, not a promised result. Keep the disclaimer in the math section, FAQ #5 and the footer.
