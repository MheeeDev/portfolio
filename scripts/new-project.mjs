// npm run new -- 2026-boiler-scada
// Copies templates/project into src/content/projects/<name>/ as a draft.
import { cpSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const name = process.argv[2];
if (!name || !/^\d{4}-[a-z0-9-]+$/.test(name)) {
  console.error('Usage: npm run new -- <year>-<short-name>   e.g. npm run new -- 2026-boiler-scada');
  process.exit(1);
}

const root = fileURLToPath(new URL('..', import.meta.url));
const target = `${root}src/content/projects/${name}`;
if (existsSync(target)) {
  console.error(`Already exists: ${target}`);
  process.exit(1);
}

cpSync(`${root}templates/project`, target, { recursive: true });
console.log(`Created ${target}
Next:
  1. Fill in index.md (it starts as draft: true, so it stays off the site)
  2. Put redacted images next to it (cover.webp, screen-01.webp, ...)
  3. Set draft: false and run  npm run dev  to check it`);
