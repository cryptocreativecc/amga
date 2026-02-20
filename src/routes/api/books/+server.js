import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const KAVITA_BASE = env.KAVITA_BASE_URL || 'https://library.codemash.dev';
const KAVITA_API_KEY = env.KAVITA_API_KEY;

async function getToken() {
  const res = await fetch(
    `${KAVITA_BASE}/api/Plugin/authenticate?apiKey=${KAVITA_API_KEY}&pluginName=amga-site`,
    { method: 'POST' }
  );
  if (!res.ok) throw new Error('Failed to authenticate with Kavita');
  const data = await res.json();
  return data.token;
}

export async function GET() {
  try {
    const token = await getToken();

    // Fetch on-deck series (currently reading)
    const onDeckRes = await fetch(`${KAVITA_BASE}/api/Series/on-deck`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: 0,
        statements: [],
        combination: 1,
        sortOptions: { sortField: 1, isAscending: true },
        limitTo: 0
      })
    });

    if (!onDeckRes.ok) {
      return json({ error: 'Failed to fetch on-deck series' }, { status: onDeckRes.status });
    }

    const series = await onDeckRes.json();

    // Fetch metadata for each on-deck series (for author/summary)
    const books = await Promise.all(
      series.map(async (s) => {
        const metaRes = await fetch(
          `${KAVITA_BASE}/api/Series/metadata?seriesId=${s.id}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const meta = metaRes.ok ? await metaRes.json() : {};

        const totalPages = s.pages || 1;
        const pagesRead = s.pagesRead || 0;
        const progress = Math.round((pagesRead / totalPages) * 100);

        return {
          id: s.id,
          title: s.name,
          pages: totalPages,
          pagesRead,
          progress,
          coverUrl: `/api/books/cover?seriesId=${s.id}`,
          summary: meta.summary || '',
          writers: (meta.writers || []).map((w) => w.name),
          publisher: (meta.publishers || [])[0]?.name || '',
          releaseYear: meta.releaseYear || null
        };
      })
    );

    return json({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}
