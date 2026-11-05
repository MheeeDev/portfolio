// Share images for articles: each post's cover.svg rendered to a 1200×630 PNG at build time,
// because Facebook, LINE and LinkedIn do not show SVG previews.
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { getPosts, type Post } from '../../lib';

const coverFile = (post: Post) => {
  if (!post.filePath) return undefined;
  const dir = dirname(post.filePath);
  const name = readdirSync(dir).find((f) => /^cover\.(svg|png|jpe?g|webp)$/i.test(f));
  return name ? join(dir, name) : undefined;
};

export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.filter((p) => coverFile(p)).map((post) => ({ params: { id: post.id }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
  const file = coverFile(props.post as Post)!;
  const png = await sharp(readFileSync(file), { density: 144 })
    .resize(1200, 630, { fit: 'cover', position: 'left' })
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
