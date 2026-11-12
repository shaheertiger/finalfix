import {
  BUSINESS,
  PHONE_HREF,
  QUOTE_FORM_ACTION,
  SITE_URL,
  SMS_HREF,
  THANK_YOU_PATH,
} from '../data/business';
import { SERVICES, type FAQ } from '../data/services';
import { esc } from '../lib/html';
import { SERVICE_AREA_PATH } from '../data/routes';

export function topbar(): string {
  return `<div class="topbar">
  <span>Serving ${esc(BUSINESS.serviceAreaSummary)}</span>
  <a class="topbar-phone" href="${PHONE_HREF}">Call ${BUSINESS.phoneDisplay}</a>
</div>`;
}

export function header(estimateHref: string): string {
  return `<header class="site-header">
  <a class="brand" href="/" aria-label="${esc(BUSINESS.name)} home">
    <img src="/images/logo.png" alt="${esc(BUSINESS.name)}" width="64" height="64">
  </a>
  <nav class="primary-nav" aria-label="Primary">
    <a href="/#services">Services</a>
    <a href="/#process">Process</a>
    <a href="${SERVICE_AREA_PATH}">Service Area</a>
    <a href="${estimateHref}">Contact</a>
  </nav>
  <a class="btn btn-header" href="${estimateHref}">Free Estimate</a>
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

/** In-page anchor of the first-fold quote form. */
export const ESTIMATE_ANCHOR = 'estimate';

/**
 * The FormSubmit quote form. Plain HTML POST, no JavaScript needed.
 * `prefix` keeps element ids unique when a page shows the form twice.
 * `messageRows` sets the details box height (shorter in the first fold).
 * `selectedService` pre-selects that service in the dropdown.
 * Only name, phone and city are required, to keep it quick on a phone.
 */
export function quoteForm(prefix: string, messageRows = 3, selectedService?: string): string {
  const id = (name: string) => `${prefix}-${name}`;
  const serviceOptions = SERVICES.map(
    (s) => `<option${s.name === selectedService ? ' selected' : ''}>${esc(s.name)}</option>`,
  ).join('');

  return `<form class="quote-form" action="${esc(QUOTE_FORM_ACTION)}" method="POST">
        <input type="hidden" name="_subject" value="New estimate request from ${esc(BUSINESS.shortName)} website">
        <input type="hidden" name="_next" value="${esc(`${SITE_URL}${THANK_YOU_PATH}`)}">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_captcha" value="false">
        <input type="text" name="_honey" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="field-row">
          <div class="field">
            <label for="${id('name')}">Name</label>
            <input id="${id('name')}" type="text" name="name" autocomplete="name" enterkeyhint="next" required>
          </div>
          <div class="field">
            <label for="${id('phone')}">Phone</label>
            <input id="${id('phone')}" type="tel" name="phone" autocomplete="tel" inputmode="tel" enterkeyhint="next" required>
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="${id('city')}">City or town</label>
            <input id="${id('city')}" type="text" name="city" autocomplete="address-level2" enterkeyhint="next" required>
          </div>
          <div class="field">
            <label for="${id('service')}">Service</label>
            <select id="${id('service')}" name="service">${serviceOptions}<option>Not sure / other</option></select>
          </div>
        </div>
        <div class="field">
          <label for="${id('email')}">Email <span class="optional">(optional)</span></label>
          <input id="${id('email')}" type="email" name="email" autocomplete="email" enterkeyhint="next">
        </div>
        <div class="field">
          <label for="${id('message')}">Details <span class="optional">(optional)</span></label>
          <textarea id="${id('message')}" name="message" rows="${messageRows}" placeholder="Leak, missing shingles, full replacement…"></textarea>
        </div>
        <button class="btn-block btn-solid" type="submit">Get My Free Estimate</button>
        <p class="form-note">Free estimate. No obligation.</p>
      </form>`;
}

/**
 * First-fold quote card, shown beside the hero copy (below the headline on
 * phones). Pass a service name to pre-select it on that service's page.
 */
export function heroQuote(selectedService?: string): string {
  return `<div class="quote-panel hero-quote" id="${ESTIMATE_ANCHOR}">
    <h2 class="hero-quote-title">Get your free estimate</h2>
    <p class="hero-quote-sub">Tell us about your roof and we will get back to you.</p>
    ${quoteForm('hq', 2, selectedService)}
    <p class="hero-quote-call">Prefer to talk? <a href="${PHONE_HREF}">Call ${BUSINESS.phoneDisplay}</a></p>
  </div>`;
}

/**
 * Closing call-to-action, repeated at the end of every page. Same quote form
 * as the first fold, with call and text below it.
 */
export function quoteSection(selectedService?: string): string {
  return `<section class="section section-blue" id="quote" aria-labelledby="quote-title">
  <div class="split">
    <div>
      <h2 id="quote-title">Get your free estimate</h2>
      <p class="lead">Tell us what is going on with your roof and we will get back to you with next steps. Prefer to talk? Call or text us any time.</p>
    </div>
    <div class="quote-panel">
      ${quoteForm('qf', 3, selectedService)}
      <p class="quote-alt">Or reach us directly:</p>
      <div class="quote-alt-row">
        <a class="btn-block btn-ghost btn-compact" href="${PHONE_HREF}">Call ${BUSINESS.phoneDisplay}</a>
        <a class="btn-block btn-ghost btn-compact" href="${SMS_HREF}">Text Us</a>
      </div>
    </div>
  </div>
</section>`;
}

/**
 * Phone-only bar fixed to the bottom of the screen: call, text, estimate.
 * Hidden on wider screens by CSS.
 */
export function mobileActionBar(estimateHref: string): string {
  return `<nav class="mobile-bar" aria-label="Quick contact">
  <a href="${PHONE_HREF}">Call</a>
  <a href="${SMS_HREF}">Text</a>
  <a class="mobile-bar-primary" href="${estimateHref}">Free Estimate</a>
</nav>`;
}
