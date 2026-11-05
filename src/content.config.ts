import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM, e.g. 2025-06');

// Every project must fill in all of these. A missing or misspelled field fails the build,
// which is what keeps every project page in the same pattern.
const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(5),
      summary: z.string().min(20).max(220),
      company: z.string(),
      period: z.object({
        start: month,
        end: z.union([month, z.literal('present')]),
      }),
      role: z.string(),
      sector: z.string(),
      platforms: z.array(z.string()).min(1),
      tags: z.array(z.string()).min(1),
      cover: image(),
      coverAlt: z.string().min(5),
      highlights: z.array(z.string()).min(2).max(5),
      // industry = paid delivery work for plants; education = training rigs, courses and lab systems
      track: z.enum(['industry', 'education']).default('industry'),
      featured: z.boolean().default(false),
      // true = kept in the repo but left off the site and the PDF
      draft: z.boolean().default(false),
    }),
});

// Blog articles: src/content/posts/<slug>/index.mdx (or .md), images next to it.
const posts = defineCollection({
  loader: glob({ pattern: '*/index.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(5),
      summary: z.string().min(20).max(300),
      date: z.coerce.date(),
      category: z.enum(['plc', 'scada', 'ot-it', 'ai-tools', 'career']),
      tags: z.array(z.string()).default([]),
      lang: z.enum(['th', 'en']).default('th'),
      // Main clip shown at the top of the article and listed on /videos/. The 11-character ID from the YouTube URL.
      youtube: z.string().regex(/^[\w-]{11}$/, 'Use the 11-character video ID, e.g. dQw4w9WgXcQ').optional(),
      cover: image().optional(),
      coverAlt: z.string().min(5).optional(),
      // true = shown by `npm run dev` only, left out of the built site and the RSS feed
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, posts };
