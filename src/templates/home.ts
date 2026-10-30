import { BUSINESS, PHONE_HREF } from '../data/business';
import { HOME_FAQS, PROCESS_STEPS } from '../data/home';
import { SERVICES } from '../data/services';
import { CITIES } from '../data/cities';
import { SERVICE_AREA_PATH } from '../data/routes';
import { esc } from '../lib/html';
import { homeSchemas } from '../lib/schema';
import type { PageDef } from './layout';
import { faqList, quoteSection } from './partials';

export function homePage(): PageDef {
  const serviceCards = SERVICES.map(
    (s, i) => `<a class="card" href="/${s.slug}">
        <span class="card-num">${String(i + 1).padStart(2, '0')}</span>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.summary)}</p>
        <span class="card-link">Learn more</span>
      </a>`,
  ).join('\n      ');

  const steps = PROCESS_STEPS.map(
    (step, i) => `<li class="step">
        <span class="step-num">${String(i + 1).padStart(2, '0')}</span>
        <h3>${esc(step.title)}</h3>
        <p>${esc(step.body)}</p>
      </li>`,
  ).join('\n      ');

  const cities = CITIES.map((c) => `<li>${esc(c)}</li>`).join('');

  const body = `
<section class="hero" id="top" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="eyebrow">${esc(BUSINESS.name)}</p>
    <h1 id="hero-title">Roof repair &amp; replacement <span class="accent">Fixed right. Final.</span></h1>
    <p class="lead speakable">Roof replacement, repair and exterior construction for homeowners across Southern Ontario, within 100 miles of Toronto and London.</p>
    <div class="cta-row">
      <a class="btn btn-lg" href="#quote">Get a Free Estimate</a>
      <a class="btn btn-lg btn-outline" href="${PHONE_HREF}">${BUSINESS.phoneDisplay}</a>
    </div>
  </div>
  <div class="hero-art">
    <img src="/images/logo.png" alt="${esc(BUSINESS.name)} logo" width="${BUSINESS.logoWidth}" height="${BUSINESS.logoHeight}" fetchpriority="high">
  </div>
</section>

<section class="section section-light" id="services" aria-labelledby="services-title">
  <p class="eyebrow eyebrow-blue">What we do</p>
  <h2 id="services-title">Services</h2>
  <div class="card-grid">
      ${serviceCards}
  </div>
</section>

<section class="section section-dark" id="process" aria-labelledby="process-title">
  <p class="eyebrow">How it works</p>
  <h2 id="process-title">Four steps to a finished roof</h2>
  <ol class="steps">
      ${steps}
  </ol>
</section>

<section class="section section-panel split" id="area" aria-labelledby="area-title">
  <div>
    <p class="eyebrow">Service area</p>
    <h2 id="area-title">100 miles from Toronto and London</h2>
    <p class="lead">If your home is within 100 miles of either city, we will come to you. Not sure? Call and we will tell you.</p>
    <p><a class="text-link" href="${SERVICE_AREA_PATH}">See the full service area</a></p>
  </div>
  <ul class="chips" aria-label="Cities and towns we serve">${cities}</ul>
</section>

<section class="section" id="faq" aria-labelledby="faq-title">
  <p class="eyebrow">Questions</p>
  <h2 id="faq-title">Roofing questions, answered</h2>
  ${faqList(HOME_FAQS)}
</section>

${quoteSection()}`;

  return {
    file: 'index.html',
    path: '/',
    title: 'Roof Repair & Replacement Ontario | Final Fix Roofing',
    description:
      'Roof repair, roof replacement, leak repair and exterior construction across Southern Ontario, within 100 miles of Toronto and London. Call 437-869-1930.',
    ogType: 'business.business',
    schemas: homeSchemas(HOME_FAQS),
    body,
    preloadLogo: true,
    indexable: true,
    lastmod: BUSINESS.contentUpdated,
    priority: 1.0,
    changefreq: 'weekly',
  };
}
