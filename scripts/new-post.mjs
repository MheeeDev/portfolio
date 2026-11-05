// npm run new-post -- uns-mqtt-ignition
// Copies templates/post into src/content/posts/<name>/ as a draft dated today.
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const name = process.argv[2];
if (!name || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
  console.error('Usage: npm run new-post -- <short-name>   e.g. npm run new-post -- uns-mqtt-ignition');
  process.exit(1);
}

const root = fileURLToPath(new URL('..', import.meta.url));
const target = `${root}src/content/posts/${name}`;
if (existsSync(target)) {
  console.error(`Already exists: ${target}`);
  process.exit(1);
}

cpSync(`${root}templates/post`, target, { recursive: true });
const file = `${target}/index.mdx`;
const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Bangkok' });
writeFileSync(file, readFileSync(file, 'utf8').replace(/^date: \S+/m, `date: ${today}`));
console.log(`Created ${file}
Next:
  1. Write the article (it starts as draft: true, so only  npm run dev  shows it)
  2. Put images next to it (cover.webp, screen-01.webp, ...)
  3. Set draft: false when it is ready to publish`);
