/**
 * Pure JSON-LD builders. No DOM, no framework. They run in the build script,
 * so the emitted structured data is what the prerendered HTML ships with.
 *
 * Every node that describes the business references one stable @id
 * (`${SITE_URL}/#business`). Optional facts (address, geo, hours, sameAs…)
 * are omitted when they are not set in business.ts.
 */

import { BUSINESS, SITE_URL } from '../data/business';
import { CITIES } from '../data/cities';
import { SERVICE_AREA_PATH } from '../data/routes';
import { SERVICES, type FAQ, type Service } from '../data/services';

type Json = Record<string, unknown>;

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const CONTEXT = 'https://schema.org';

function absolute(path: string): string {
  return `${SITE_URL}${path}`;
}

function withoutUndefined(obj: Json): Json {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

/** The full business entity. Included on every page; @id is shared. */
export function businessSchema(opts: { url: string; description?: string }): Json {
  const address = BUSINESS.address
    ? { '@type': 'PostalAddress', ...BUSINESS.address }
    : undefined;
  const geo = BUSINESS.geo ? { '@type': 'GeoCoordinates', ...BUSINESS.geo } : undefined;
  const hours = BUSINESS.openingHours?.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));

  return withoutUndefined({
    '@context': CONTEXT,
    '@type': BUSINESS.schemaType,
    '@id': BUSINESS_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    description: opts.description ?? BUSINESS.description,
    slogan: BUSINESS.slogan,
    url: opts.url,
    logo: absolute(BUSINESS.logoPath),
    image: [absolute(BUSINESS.logoPath)],
    telephone: BUSINESS.phoneE164,
    address,
    geo,
    openingHoursSpecification: hours,
    foundingDate: BUSINESS.foundingDate,
    currenciesAccepted: BUSINESS.currency,
    paymentAccepted: BUSINESS.paymentAccepted,
    sameAs: BUSINESS.sameAs.length ? BUSINESS.sameAs : undefined,
    knowsAbout: SERVICES.map((s) => s.name),
    areaServed: [
      { '@type': 'City', name: 'Toronto' },
      { '@type': 'City', name: 'London' },
      ...CITIES.map((name) => ({ '@type': 'City', name })),
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Roofing and exterior services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.summary,
          url: absolute(`/${s.slug}`),
        },
      })),
    },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.speakable'] },
  });
}

export function websiteSchema(): Json {
  return {
    '@context': CONTEXT,
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    url: `${SITE_URL}/`,
    inLanguage: BUSINESS.locale,
    publisher: { '@id': BUSINESS_ID },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): Json {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function faqSchema(faqs: FAQ[]): Json {
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function serviceSchema(service: Service): Json {
  return {
    '@context': CONTEXT,
    '@type': 'Service',
    '@id': `${absolute(`/${service.slug}`)}#service`,
    name: service.h1,
    serviceType: service.name,
    description: service.metaDescription,
    url: absolute(`/${service.slug}`),
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'Place', name: `Within ${BUSINESS.serviceAreaRadiusMiles} miles of Toronto and London, Ontario` },
  };
}

export function servicePageSchemas(service: Service): Json[] {
  const url = absolute(`/${service.slug}`);
  return [
    businessSchema({ url }),
    serviceSchema(service),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: service.name, path: `/${service.slug}` },
    ]),
    faqSchema(service.faqs),
  ];
}

export function homeSchemas(faqs: FAQ[]): Json[] {
  return [businessSchema({ url: `${SITE_URL}/` }), websiteSchema(), faqSchema(faqs)];
}

export function serviceAreaSchemas(): Json[] {
  return [
    businessSchema({ url: absolute(SERVICE_AREA_PATH) }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Service area', path: SERVICE_AREA_PATH },
    ]),
  ];
}
