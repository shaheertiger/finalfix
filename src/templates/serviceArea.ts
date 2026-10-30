import { BUSINESS, PHONE_HREF } from '../data/business';
import { CITIES } from '../data/cities';
import { SERVICE_AREA_PATH } from '../data/routes';
import { SERVICES } from '../data/services';
import { esc } from '../lib/html';
import { serviceAreaSchemas } from '../lib/schema';
import type { PageDef } from './layout';
import { breadcrumb, quoteSection } from './partials';

export function serviceAreaPage(): PageDef {
  const cities = CITIES.map((c) => `<li>${esc(c)}</li>`).join('');
  const services = SERVICES.map(
    (s) => `<li><a href="/${s.slug}">${esc(s.name)}</a></li>`,
  ).join('');

  const body = `
${breadcrumb([
  { name: 'Home', path: '/' },
  { name: 'Service area', path: SERVICE_AREA_PATH },
])}

<section class="page-hero">
  <p class="eyebrow">${esc(BUSINESS.name)}</p>
  <h1>Roofing service area: 100 miles around Toronto and London</h1>
  <p class="lead speakable">If your home is within ${BUSINESS.serviceAreaRadiusMiles} miles of Toronto or London, Ontario, ${esc(BUSINESS.shortName)} will come to you. Not sure whether your address is in range? Call ${BUSINESS.phoneDisplay} and we will confirm.</p>
  <div class="cta-row">
    <a class="btn btn-lg" href="/#quote">Get a Free Estimate</a>
    <a class="btn btn-lg btn-outline" href="${PHONE_HREF}">${BUSINESS.phoneDisplay}</a>
  </div>
</section>

<section class="section section-panel" aria-labelledby="cities-title">
  <p class="eyebrow">Cities and towns</p>
  <h2 id="cities-title">Where we work</h2>
  <ul class="chips">${cities}</ul>
</section>

<section class="section section-light" aria-labelledby="services-area-title">
  <p class="eyebrow eyebrow-blue">Services</p>
  <h2 id="services-area-title">Available in every part of the service area</h2>
  <ul class="link-list">${services}</ul>
</section>

${quoteSection()}`;

  return {
    file: `${SERVICE_AREA_PATH.slice(1)}.html`,
    path: SERVICE_AREA_PATH,
    title: 'Roofing Service Area Ontario | Final Fix Roofing',
    description:
      'Final Fix Roofing serves homes within 100 miles of Toronto and London, Ontario, including Mississauga, Hamilton, Kitchener and London. Call 437-869-1930.',
    ogType: 'website',
    schemas: serviceAreaSchemas(),
    body,
    indexable: true,
    lastmod: BUSINESS.contentUpdated,
    priority: 0.7,
    changefreq: 'monthly',
  };
}
