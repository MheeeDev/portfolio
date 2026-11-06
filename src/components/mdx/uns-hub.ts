// Drawing for UnsHub: the same systems wired point-to-point, then through one UNS broker.
// Shared by the server render (no-JS readers) and the slider script.

export const SYSTEMS = ['PLC', 'SCADA', 'Historian', 'MES', 'ERP', 'Dashboard', 'QA Lab', 'CMMS', 'Energy', 'AI / ML', 'Mobile', 'Cloud'];

const CX = 160, CY = 150, R = 112;

function spots(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a), label: SYSTEMS[i] };
  });
}

const node = (p: { x: number; y: number; label: string }) =>
  `<g class="node"><rect x="${(p.x - 34).toFixed(1)}" y="${(p.y - 12).toFixed(1)}" width="68" height="24" rx="7"/>` +
  `<text x="${p.x.toFixed(1)}" y="${(p.y + 4).toFixed(1)}">${p.label}</text></g>`;

const line = (a: { x: number; y: number }, b: { x: number; y: number }, cls: string) =>
  `<line class="${cls}" x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"/>`;

/** Point-to-point: every system talks to every other one. */
export function meshSvg(n: number) {
  const p = spots(n);
  let lines = '';
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) lines += line(p[i], p[j], 'wire');
  return lines + p.map(node).join('');
}

/** UNS: every system talks only to the broker in the middle. */
export function hubSvg(n: number) {
  const p = spots(n);
  const hub = { x: CX, y: CY };
  return (
    p.map((q) => line(q, hub, 'spoke')).join('') +
    `<g class="hub"><circle cx="${CX}" cy="${CY}" r="34"/><text x="${CX}" y="${CY - 2}">UNS</text>` +
    `<text class="sub" x="${CX}" y="${CY + 12}">MQTT Broker</text></g>` +
    p.map(node).join('')
  );
}

export const meshCount = (n: number) => (n * (n - 1)) / 2;
