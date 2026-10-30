/** Small, dependency-free helpers for building HTML strings. */

/** Escape text for HTML text and attribute values. */
export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Serialise a JSON-LD object for a <script> tag. "<" is escaped so a string
 * containing "</script>" cannot break out of the tag.
 */
export function jsonLd(id: string, data: unknown): string {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `<script type="application/ld+json" id="${esc(id)}">${json}</script>`;
}

/** Collapse runs of whitespace so title and description lengths are real. */
export function squish(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}
