/**
 * Static build for the Final Fix Roofing site.
 *
 * Every route is rendered to a complete HTML file, so the title, description,
 * canonical, Open Graph, JSON-LD and body copy are all in the raw response.
 * Crawlers and AI answer engines do not need to run JavaScript.
 *
 * Also writes sitemap.xml, robots.txt and llms.txt from the same data, so
 * none of them can drift from the pages.
 *
 * Run with: npm run build
 */

import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { BUSINESS, SITE_URL } from '../src/data/business';
import { squish } from '../src/lib/html';
import { buildLlmsTxt } from '../src/lib/llms';
import { notFoundPage } from '../src/templates/notFound';
import { homePage } from '../src/templates/home';
import { serviceAreaPage } from '../src/templates/serviceArea';
import { servicePage } from '../src/templates/service';
import { renderDocument, type PageDef } from '../src/templates/layout';
import { SERVICES } from '../src/data/services';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const DIST = join(ROOT, 'dist');

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
  'Applebot-Extended',
  'bingbot',
  'Amazonbot',
  'meta-externalagent',
  'CCBot',
  'MistralAI-User',
  'YouBot',
  'DuckAssistBot',
];

function collectPages(): PageDef[] {
  return [
    homePage(),
    serviceAreaPage(),
    ...SERVICES.map((service) => servicePage(service)),
    notFoundPage(),
  ];
}

// ─── Validation ─────────────────────────────────────────────────────────────

/** Fails the build on problems that would hurt SEO. Warns on soft issues. */
function validate(pages: PageDef[]): void {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seenPaths = new Set<string>();
  const seenTitles = new Set<string>();

  for (const page of pages) {
    const label = page.path;

    if (seenPaths.has(page.path)) errors.push(`${label}: duplicate path`);
    seenPaths.add(page.path);

    const title = squish(page.title);
    if (seenTitles.has(title)) errors.push(`${label}: duplicate title "${title}"`);
    seenTitles.add(title);
    if (title.length > 60) warnings.push(`${label}: title is ${title.length} characters (max 60)`);

    const description = squish(page.description);
    if (page.indexable && (description.length < 140 || description.length > 160)) {
      warnings.push(`${label}: description is ${description.length} characters (target 140 to 160)`);
    }

    const h1Count = (page.body.match(/<h1[\s>]/g) ?? []).length;
    if (h1Count !== 1) errors.push(`${label}: expected exactly one <h1>, found ${h1Count}`);

    if (page.indexable && page.schemas.length === 0) {
      errors.push(`${label}: indexable page has no JSON-LD`);
    }
  }

  if (errors.length) {
    throw new Error(`Build validation failed:\n  - ${errors.join('\n  - ')}`);
  }
  if (warnings.length) {
    console.warn(`Build warnings:\n  - ${warnings.join('\n  - ')}`);
  }
}

/** Every internal href or src must point at a file that exists in dist/. */
function checkInternalLinks(pages: PageDef[]): void {
  const known = new Set(pages.map((p) => p.path));
  const broken: string[] = [];

  for (const page of pages) {
    const html = renderDocument(page);
    if (/\bundefined\b|\bNaN\b|\{\{\s*[\w.]+\s*\}\}/.test(html)) {
      broken.push(`${page.path}: contains undefined, NaN or template markers`);
    }
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
      const target = match[1];
      if (target === '/' || known.has(target)) continue;
      if (existsSync(join(PUBLIC, target))) continue;
      broken.push(`${page.path} → ${target}`);
    }
  }

  if (broken.length) {
    throw new Error(`Broken internal links or invalid output:\n  - ${broken.join('\n  - ')}`);
  }
}

// ─── Output files ───────────────────────────────────────────────────────────

function writeSitemap(pages: PageDef[]): void {
  const entries = pages
    .filter((p) => p.indexable)
    .map(
      (p) =>
        `  <url>\n    <loc>${SITE_URL}${p.path === '/' ? '/' : p.path}</loc>\n` +
        `    <lastmod>${p.lastmod}</lastmod>\n` +
        `    <changefreq>${p.changefreq}</changefreq>\n` +
        `    <priority>${p.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  writeFileSync(join(DIST, 'sitemap.xml'), xml, 'utf8');
}

function writeRobots(): void {
  const bots = AI_CRAWLERS.map((bot) => `User-agent: ${bot}\nAllow: /\n`).join('\n');
  const txt =
    `# ${BUSINESS.name}\n` +
    `User-agent: *\nAllow: /\n\n` +
    `# AI and answer-engine crawlers are welcome. See /llms.txt for a summary of the business.\n` +
    `${bots}\n` +
    `Sitemap: ${SITE_URL}/sitemap.xml\n`;
  writeFileSync(join(DIST, 'robots.txt'), txt, 'utf8');
}

function countFiles(dir: string): number {
  return readdirSync(dir).reduce((n, name) => {
    const full = join(dir, name);
    return n + (statSync(full).isDirectory() ? countFiles(full) : 1);
  }, 0);
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main(): void {
  const pages = collectPages();
  validate(pages);
  checkInternalLinks(pages);

  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });
  cpSync(PUBLIC, DIST, { recursive: true });

  for (const page of pages) {
    writeFileSync(join(DIST, page.file), renderDocument(page), 'utf8');
  }

  writeSitemap(pages);
  writeRobots();
  writeFileSync(join(DIST, 'llms.txt'), buildLlmsTxt(BUSINESS.contentUpdated), 'utf8');

  const indexable = pages.filter((p) => p.indexable).length;
  console.log(
    `Built ${pages.length} HTML files (${indexable} indexable) + sitemap.xml, robots.txt, llms.txt. ` +
      `${countFiles(DIST)} files in dist/.`,
  );
}

main();
