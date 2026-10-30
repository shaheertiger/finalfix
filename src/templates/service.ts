import { BUSINESS, PHONE_HREF } from '../data/business';
import { SERVICES, type Service } from '../data/services';
import { esc } from '../lib/html';
import { servicePageSchemas } from '../lib/schema';
import type { PageDef } from './layout';
import { breadcrumb, faqList, quoteSection } from './partials';

export function servicePage(service: Service): PageDef {
  const features = service.features.map((f) => `<li>${esc(f)}</li>`).join('\n      ');

  const related = SERVICES.filter((s) => s.slug !== service.slug)
    .map(
      (s) => `<a class="card" href="/${s.slug}">
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.summary)}</p>
        <span class="card-link">Learn more</span>
      </a>`,
    )
    .join('\n      ');

  const body = `
${breadcrumb([
  { name: 'Home', path: '/' },
  { name: service.name, path: `/${service.slug}` },
])}

<section class="page-hero">
  <p class="eyebrow">${esc(BUSINESS.name)} · Southern Ontario</p>
  <h1>${esc(service.h1)}</h1>
  <p class="lead speakable">${esc(service.intro)}</p>
  <div class="cta-row">
    <a class="btn btn-lg" href="/#quote">Get a Free Estimate</a>
    <a class="btn btn-lg btn-outline" href="${PHONE_HREF}">${BUSINESS.phoneDisplay}</a>
  </div>
</section>

<section class="section section-light" aria-labelledby="included-title">
  <p class="eyebrow eyebrow-blue">Scope</p>
  <h2 id="included-title">What's included</h2>
  <ul class="feature-grid">
      ${features}
  </ul>
</section>

<section class="section" aria-labelledby="faq-title">
  <p class="eyebrow">Questions</p>
  <h2 id="faq-title">${esc(service.name)} questions, answered</h2>
  ${faqList(service.faqs)}
</section>

<section class="section section-dark" aria-labelledby="related-title">
  <h2 id="related-title">Other services</h2>
  <div class="card-grid">
      ${related}
  </div>
</section>

${quoteSection()}`;

  return {
    file: `${service.slug}.html`,
    path: `/${service.slug}`,
    title: service.metaTitle,
    description: service.metaDescription,
    ogType: 'website',
    schemas: servicePageSchemas(service),
    body,
    indexable: true,
    lastmod: BUSINESS.contentUpdated,
    priority: 0.8,
    changefreq: 'monthly',
  };
}
