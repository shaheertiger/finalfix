import { BUSINESS, LEAD_FORM_CONVERSION_SEND_TO, PHONE_HREF, THANK_YOU_PATH } from '../data/business';
import { squish } from '../lib/html';
import type { PageDef } from './layout';

/**
 * Landing page after a quote form request. Not indexed. Reports the
 * Google Ads "Submit lead form" conversion on load, since reaching this page
 * means a form was submitted.
 */
export function thankYouPage(): PageDef {
  return {
    file: 'thank-you.html',
    path: THANK_YOU_PATH,
    title: `Thank you | ${BUSINESS.shortName}`,
    description: `Your estimate request was sent to ${BUSINESS.name}. We will be in touch shortly. For anything urgent, call ${BUSINESS.phoneDisplay}.`,
    ogType: 'website',
    schemas: [],
    headExtra: [
      '<!-- Event snippet for Submit lead form conversion page -->',
      squish(`<script>
gtag('event', 'conversion', { 'send_to': '${LEAD_FORM_CONVERSION_SEND_TO}', 'value': 1.0, 'currency': '${BUSINESS.currency}' });
</script>`),
    ],
    body: `
<section class="page-hero">
  <p class="eyebrow">Request received</p>
  <h1>Thanks, we got your request</h1>
  <p class="lead">We will review the details and get back to you shortly. If it is urgent, such as an active leak, call us now.</p>
  <div class="cta-row">
    <a class="btn btn-lg" href="${PHONE_HREF}">Call ${BUSINESS.phoneDisplay}</a>
    <a class="btn btn-lg btn-outline" href="/">Back to home</a>
  </div>
</section>`,
    indexable: false,
    lastmod: BUSINESS.contentUpdated,
    priority: 0,
    changefreq: 'monthly',
  };
}
