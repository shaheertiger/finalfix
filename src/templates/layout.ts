import { BUSINESS, SITE_URL } from '../data/business';
import { esc, jsonLd, squish } from '../lib/html';
import { footer, header, topbar } from './partials';

type Json = Record<string, unknown>;

/** One prerendered route. The build script writes each one to dist/. */
export interface PageDef {
  /** Output file under dist/, e.g. "roof-repair-ontario.html". */
  file: string;
  /** Canonical path beginning with "/". */
  path: string;
  /** Full <title>. 60 characters or fewer where possible. */
  title: string;
  /** Meta description, 140 to 160 characters. */
  description: string;
  /** og:type. Homepage uses "business.business"; other pages use "website". */
  ogType: 'website' | 'business.business';
  /** JSON-LD blocks in order. */
  schemas: Json[];
  /** Inner HTML for <main>. */
  body: string;
  /** Preload the logo (LCP image) on the homepage only. */
  preloadLogo?: boolean;
  /** Included in sitemap.xml when true. */
  indexable: boolean;
  lastmod: string;
  priority: number;
  changefreq: 'weekly' | 'monthly';
}

/** Render a full HTML document. Head metadata and JSON-LD are baked in. */
export function renderDocument(page: PageDef): string {
  const url = `${SITE_URL}${page.path}`;
  const logo = `${SITE_URL}${BUSINESS.logoPath}`;
  const title = squish(page.title);
  const description = squish(page.description);
  const robots = page.indexable ? 'index, follow' : 'noindex, follow';

  const head = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}">`,
    `<meta name="robots" content="${robots}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    '<meta name="theme-color" content="#0b0d11">',
    '<meta name="format-detection" content="telephone=no">',
    `<meta name="geo.region" content="${BUSINESS.geoRegion}">`,
    `<meta name="geo.placename" content="${esc(BUSINESS.geoPlacename)}">`,
    `<meta property="og:locale" content="${BUSINESS.ogLocale}">`,
    `<meta property="og:site_name" content="${esc(BUSINESS.name)}">`,
    `<meta property="og:type" content="${page.ogType}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:image" content="${esc(logo)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(description)}">`,
    `<meta name="twitter:image" content="${esc(logo)}">`,
    '<link rel="icon" type="image/png" href="/images/logo.png">',
    '<link rel="apple-touch-icon" href="/images/logo.png">',
    '<link rel="manifest" href="/site.webmanifest">',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap">',
    '<link rel="stylesheet" href="/styles.css">',
  ];

  if (page.preloadLogo) {
    head.push('<link rel="preload" as="image" href="/images/logo.png" fetchpriority="high">');
  }

  page.schemas.forEach((schema, i) => {
    head.push(jsonLd(`page-ld-${i}`, schema));
  });

  return `<!doctype html>
<html lang="en-CA">
<head>
${head.map((line) => `  ${line}`).join('\n')}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${topbar()}
${header()}
<main id="main">
${page.body}
</main>
${footer()}
</body>
</html>
`;
}
