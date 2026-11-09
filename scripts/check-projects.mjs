// Checks that every published project page has the standard sections, in order,
// and that every image it links to exists. Runs before every build.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const required = ['Problem', 'My role & scope', 'Approach', 'Delivery', 'Result', 'Skills used'];
const dir = fileURLToPath(new URL('../src/content/projects/', import.meta.url));
const problems = [];
let checked = 0;

for (const name of readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  // Plain Markdown, or MDX when the page uses interactive components.
  const file = [`${dir}${name}/index.md`, `${dir}${name}/index.mdx`].find((f) => existsSync(f));
  if (!file) {
    problems.push(`${name}: missing index.md or index.mdx`);
    continue;
  }
  const text = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const front = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  if (/^draft:\s*true/m.test(front)) continue;
  checked++;

  const body = text.slice(front.length + 8).replace(/<!--[\s\S]*?-->/g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/```[\s\S]*?```/g, '');
  const headings = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  const order = required.map((h) => headings.indexOf(h));
  required.forEach((h, i) => {
    if (order[i] === -1) problems.push(`${name}: missing section "## ${h}"`);
  });
  const found = order.filter((i) => i !== -1);
  if (found.some((v, i) => i > 0 && v < found[i - 1])) {
    problems.push(`${name}: sections must be in this order: ${required.join(' → ')}`);
  }

  for (const [, src] of body.matchAll(/!\[[^\]]*\]\((\.\/[^)\s]+)\)/g)) {
    if (!existsSync(`${dir}${name}/${src.slice(2)}`)) problems.push(`${name}: image not found ${src}`);
  }
}

if (problems.length) {
  console.error(`Project check failed:\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}
console.log(`Project check passed (${checked} published projects).`);
