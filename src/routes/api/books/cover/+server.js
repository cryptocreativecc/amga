import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const KAVITA_BASE = env.KAVITA_BASE_URL || 'https://library.codemash.dev';
const KAVITA_API_KEY = env.KAVITA_API_KEY;

export async function GET({ url }) {
  const seriesId = url.searchParams.get('seriesId');
  if (!seriesId) throw error(400, 'Missing seriesId');

  const imageRes = await fetch(
    `${KAVITA_BASE}/api/image/series-cover?seriesId=${seriesId}&apiKey=${KAVITA_API_KEY}`
  );

  if (!imageRes.ok) throw error(imageRes.status, 'Failed to fetch cover image');

  const contentType = imageRes.headers.get('content-type') || 'image/jpeg';
  const buffer = await imageRes.arrayBuffer();

  return new Response(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
