// npm run pdf  →  portfolio.pdf
// Builds the site, serves it locally, and prints the /print page with Microsoft Edge
// (already installed on Windows, so no browser download is needed).
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { preview } from 'astro';
import { chromium } from 'playwright-core';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = `${root}portfolio.pdf`;
const base = process.env.BASE_PATH ?? '/';

execSync('npm run build', { cwd: root, stdio: 'inherit' });

const server = await preview({ root, logLevel: 'warn' });
const browser = await chromium.launch({ channel: process.env.PDF_BROWSER ?? 'msedge' });
try {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${server.port}${base.replace(/\/$/, '')}/print/`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    margin: { top: '16mm', bottom: '16mm', left: '14mm', right: '14mm' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate:
      '<div style="font-size:8px;width:100%;text-align:center;color:#888"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
  });
  console.log(`Saved ${out}`);
} finally {
  await browser.close();
  await server.stop();
}
