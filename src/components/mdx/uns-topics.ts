// Topics and the MQTT wildcard rules for TopicPath. Shared by the server render and the script.

export const TOPICS: [string, string][] = [
  ['iae-lab/rayong/utilities/water/tk101/level', '52.4 %'],
  ['iae-lab/rayong/utilities/water/tk101/sp', '50.0 %'],
  ['iae-lab/rayong/utilities/water/tk101/mv', '48.7 %'],
  ['iae-lab/rayong/utilities/water/tk101/status', 'online: 1'],
  ['iae-lab/rayong/utilities/water/tk102/level', '81.0 %'],
  ['iae-lab/rayong/utilities/air/comp01/pressure', '7.1 bar'],
  ['iae-lab/rayong/utilities/air/comp01/status', 'online: 1'],
  ['iae-lab/rayong/packaging/line1/filler/speed', '120 bpm'],
  ['iae-lab/chonburi/utilities/water/tk201/level', '64.9 %'],
];

/** Why a subscription filter is invalid, or '' when it is fine. */
export function filterError(filter: string): string {
  if (!filter) return 'ใส่ Topic ก่อน';
  if (filter.startsWith('/')) return 'ไม่ควรขึ้นต้นด้วย / เพราะจะได้ระดับแรกเป็นค่าว่าง';
  const parts = filter.split('/');
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p.includes('#') && (p !== '#' || i !== parts.length - 1)) return '# ต้องอยู่ท้ายสุด และอยู่คนเดียวในระดับนั้น';
    if (p.includes('+') && p !== '+') return '+ ต้องแทนทั้งระดับ เช่น water/+/level ไม่ใช่ tk+';
  }
  return '';
}

/** MQTT topic matching: + is exactly one level, # is this level and everything below it. */
export function matches(filter: string, topic: string): boolean {
  const f = filter.split('/');
  const t = topic.split('/');
  for (let i = 0; i < f.length; i++) {
    if (f[i] === '#') return true;
    if (i >= t.length) return false;
    if (f[i] !== '+' && f[i] !== t[i]) return false;
  }
  return f.length === t.length;
}
