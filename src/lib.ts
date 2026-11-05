import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

/** Published projects, grouped by track (in `tracks` order), newest first within each track. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', (p) => !p.data.draft);
  const rank = (p: Project) => tracks.findIndex((t) => t.id === p.data.track);
  return all.sort((a, b) => rank(a) - rank(b) || sortKey(b).localeCompare(sortKey(a)));
}

export type Track = Project['data']['track'];

/** Display order and wording for each track. */
export const tracks: { id: Track; title: string; blurb: string }[] = [
  {
    id: 'industry',
    title: 'Industry projects',
    blurb: 'Control, SCADA and OT/IT systems delivered for manufacturing and utility plants.',
  },
  {
    id: 'education',
    title: 'Education & lab systems',
    blurb: 'University process-control work — my B.Eng. thesis, then part-time with a professor: training rigs, digital twins, courses and the cloud lab students use.',
  },
];

export const byTrack = (projects: Project[], track: Track) => projects.filter((p) => p.data.track === track);

const sortKey =(p: Project) => (p.data.period.end === 'present' ? '9999-99' : p.data.period.end) + p.data.period.start;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const fmt = (ym: string) => {
  if (ym === 'present') return 'Present';
  const [y, m] = ym.split('-');
  return `${MONTHS[Number(m) - 1]} ${y}`;
};

export const formatPeriod = (p: Project['data']['period']) => `${fmt(p.start)} – ${fmt(p.end)}`;

export type Post = CollectionEntry<'posts'>;
export type Category = Post['data']['category'];

/** Display order and wording for each blog category. */
export const categories: { id: Category; label: string }[] = [
  { id: 'plc', label: 'PLC' },
  { id: 'scada', label: 'SCADA' },
  { id: 'ot-it', label: 'OT/IT' },
  { id: 'ai-tools', label: 'AI Tools' },
  { id: 'career', label: 'Career' },
];

export const categoryLabel = (id: Category) => categories.find((c) => c.id === id)?.label ?? id;

/** Published posts, newest first. Drafts show up in `npm run dev` so they can be previewed. */
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('posts', (p) => import.meta.env.DEV || !p.data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Frontmatter dates have no time, so format them in UTC to keep the day the author wrote. */
export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const slugify =(s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
