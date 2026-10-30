/**
 * Single source of truth for business facts.
 *
 * Every page, JSON-LD block, llms.txt, robots.txt and the sitemap read from
 * here. Never hand-type a fact (name, phone, area, hours…) anywhere else.
 *
 * Facts that were not supplied yet are left undefined. Copy and schema omit
 * them instead of guessing. Fill them in here once confirmed:
 *   address, geo, openingHours, sameAs, foundingDate, paymentAccepted
 */

/**
 * Canonical origin, no trailing slash. On Vercel this is the production
 * *.vercel.app URL, set automatically at build time. Set SITE_URL to override.
 */
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (
  process.env.SITE_URL || (vercelHost ? `https://${vercelHost}` : 'http://localhost:8765')
).replace(/\/+$/, '');

export interface PostalAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface OpeningHours {
  days: string[];
  opens: string;
  closes: string;
}

export const BUSINESS = {
  name: 'Final Fix Roofing & Construction',
  alternateName: ['Final Fix Roofing', 'Final Fix'],
  shortName: 'Final Fix Roofing',
  /** Most specific schema.org type that fits a roofing contractor. */
  schemaType: 'RoofingContractor',
  slogan: 'Fixed right. Final.',
  description:
    'Final Fix Roofing & Construction provides roof replacement, roof repair, leak and emergency repair, eavestrough and soffit, siding and exterior construction for homeowners across Southern Ontario, within 100 miles of Toronto and London.',

  /** Display format and E.164 for tel: and sms: links and schema. */
  phoneDisplay: '437-869-1930',
  phoneE164: '+14378691930',

  /** Visible service-area wording. Keep identical in every place it appears. */
  serviceAreaSummary: '100 miles around Toronto & London, Ontario',
  serviceAreaRadiusMiles: 100,
  hubCities: ['Toronto', 'London'],

  country: 'CA',
  countryName: 'Canada',
  region: 'ON',
  currency: 'CAD',
  locale: 'en-CA',
  ogLocale: 'en_CA',
  geoRegion: 'CA-ON',
  geoPlacename: 'Southern Ontario',

  logoPath: '/images/logo.png',
  logoWidth: 500,
  logoHeight: 500,

  /** Last date the visible content was edited. Drives sitemap lastmod. */
  contentUpdated: '2026-10-30',
  copyrightYear: 2026,

  // ── Not supplied yet. Left undefined on purpose. ──────────────────────────
  address: undefined as PostalAddress | undefined,
  geo: undefined as GeoPoint | undefined,
  openingHours: undefined as OpeningHours[] | undefined,
  paymentAccepted: undefined as string | undefined,
  foundingDate: undefined as string | undefined,
  /** Off-site profiles (Google Business Profile, Facebook, etc.). */
  sameAs: [] as string[],
  /** Booking or quote-form URL. Empty means the page uses the phone and text CTAs. */
  bookingUrl: undefined as string | undefined,
} as const;

/** Google Ads conversion tag ID. Loaded once per page in <head>. */
export const GOOGLE_TAG_ID = 'AW-18546344742';

export const PHONE_HREF = `tel:${BUSINESS.phoneE164}`;
export const SMS_HREF = `sms:${BUSINESS.phoneE164}`;
