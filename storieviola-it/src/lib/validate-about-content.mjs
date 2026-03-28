import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** App root (`storieviola-it/`), regardless of `process.cwd()` */
const appRoot = path.join(__dirname, '../..');

const htmlPath = path.join(appRoot, 'dist/about/index.html');
const mdPath = path.join(appRoot, 'src/content/about/index.md');

function readUtf8(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Lightweight regression guard:
// - ensures about content exists (markdown)
// - ensures rendered output includes the required headings (build output)
// - ensures fallback is not shown when content exists
const md = readUtf8(mdPath);
assert(/\bOrigini\b/.test(md), 'about markdown must include an "Origini" heading');
assert(/\bCome viene realizzato\b/i.test(md), 'about markdown must include a "Come viene realizzato" heading');

const html = readUtf8(htmlPath);
assert(/\bOrigini\b/.test(html), 'about HTML must include "Origini" heading');
assert(/\bCome viene realizzato\b/i.test(html), 'about HTML must include "Come viene realizzato" heading');
assert(!/Contenuto non trovato\./i.test(html), 'about HTML must not include fallback text when content exists');

console.log('validate-about-content: OK');
