import { BUSINESS, PHONE_HREF } from '../data/business';
import type { PageDef } from './layout';

/** Served by Vercel for unknown URLs. Returns a real 404 with noindex, never a redirect. */
export function notFoundPage(): PageDef {
  return {
    file: '404.html',
    path: '/404',
    title: `Page not found | ${BUSINESS.shortName}`,
    description: `This page could not be found. Return to ${BUSINESS.name} for roof repair, roof replacement and exterior services, or call ${BUSINESS.phoneDisplay}.`,
    ogType: 'website',
    schemas: [],
    body: `
<section class="page-hero">
  <p class="eyebrow">Error 404</p>
  <h1>We could not find that page</h1>
  <p class="lead">The link may be out of date. Head back to the homepage, or call us and we will help you find what you need.</p>
  <div class="cta-row">
    <a class="btn btn-lg" href="/">Back to home</a>
    <a class="btn btn-lg btn-outline" href="${PHONE_HREF}">${BUSINESS.phoneDisplay}</a>
  </div>
</section>`,
    indexable: false,
    lastmod: BUSINESS.contentUpdated,
    priority: 0,
    changefreq: 'monthly',
  };
}
