import { json } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
  try {
    // API key is now stored server-side
    const response = await fetch('https://api.hevyapp.com/v1/routines?page=1&pageSize=5', {
      headers: {
        'accept': 'application/json',
        'api-key': '09dda1b4-5e8d-4f31-8dc3-8ec3e412c75f'
      }
    });
    
    if (!response.ok) {
      return json({ error: 'Failed to fetch workouts' }, { status: response.status });
    }
    
    const data = await response.json();
    
    // Return the data to the client
    return json(data);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}
