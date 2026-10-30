import { BUSINESS, PHONE_HREF, SMS_HREF } from '../data/business';
import { SERVICES, type FAQ } from '../data/services';
import { esc } from '../lib/html';
import { SERVICE_AREA_PATH } from '../data/routes';

export function topbar(): string {
  return `<div class="topbar">
  <span>Serving ${esc(BUSINESS.serviceAreaSummary)}</span>
  <a class="topbar-phone" href="${PHONE_HREF}">Call ${BUSINESS.phoneDisplay}</a>
</div>`;
}

export function header(): string {
  return `<header class="site-header">
  <a class="brand" href="/" aria-label="${esc(BUSINESS.name)} home">
    <img src="/images/logo.png" alt="${esc(BUSINESS.name)}" width="64" height="64">
  </a>
  <nav class="primary-nav" aria-label="Primary">
    <a href="/#services">Services</a>
    <a href="/#process">Process</a>
    <a href="${SERVICE_AREA_PATH}">Service Area</a>
    <a href="/#quote">Contact</a>
  </nav>
  <a class="btn btn-header" href="/#quote">Free Estimate</a>
</header>`;
}

export function footer(): string {
  const serviceLinks = SERVICES.map(
    (s) => `<li><a href="/${s.slug}">${esc(s.name)}</a></li>`,
  ).join('');

  return `<footer class="site-footer">
  <div class="footer-brand">
    <img src="/images/logo.png" alt="${esc(BUSINESS.name)}" width="56" height="56">
    <p>${esc(BUSINESS.name)}<br>${esc(BUSINESS.slogan)}</p>
  </div>
  <nav aria-label="Services in footer">
    <h2 class="footer-heading">Services</h2>
    <ul>${serviceLinks}</ul>
  </nav>
  <nav aria-label="Areas in footer">
    <h2 class="footer-heading">Areas</h2>
    <ul><li><a href="${SERVICE_AREA_PATH}">Roofing service area, Ontario</a></li></ul>
  </nav>
  <p class="footer-contact">
    Serving ${esc(BUSINESS.serviceAreaSummary)}<br>
    <a href="${PHONE_HREF}">${BUSINESS.phoneDisplay}</a> · <a href="${SMS_HREF}">Text us</a>
  </p>
  <p class="footer-copy">© ${BUSINESS.copyrightYear} ${esc(BUSINESS.name)}</p>
</footer>`;
}

export function breadcrumb(items: Array<{ name: string; path: string }>): string {
  const list = items
    .map((item, i) => {
      const isLast = i === items.length - 1;
      return isLast
        ? `<li aria-current="page">${esc(item.name)}</li>`
        : `<li><a href="${esc(item.path)}">${esc(item.name)}</a></li>`;
    })
    .join('');
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${list}</ol></nav>`;
}

export function faqList(faqs: FAQ[]): string {
  const items = faqs
    .map((f) => `<details class="faq-item"><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`)
    .join('\n    ');
  return `<div class="faq-list">\n    ${items}\n  </div>`;
}

/** Closing call-to-action, repeated at the end of every page. */
export function quoteSection(): string {
  return `<section class="section section-blue" id="quote" aria-labelledby="quote-title">
  <div class="split">
    <div>
      <h2 id="quote-title">Get your free estimate</h2>
      <p class="lead">Call or text us about your roof. Tell us what is going on and we will take it from there.</p>
    </div>
    <div class="quote-panel">
      <a class="btn-block btn-solid" href="${PHONE_HREF}">Call ${BUSINESS.phoneDisplay}</a>
      <a class="btn-block btn-ghost" href="${SMS_HREF}">Text Us</a>
    </div>
  </div>
</section>`;
}
