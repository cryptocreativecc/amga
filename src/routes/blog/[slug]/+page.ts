import { getPostBySlug, getPosts } from '$lib/utils/graphql';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, setHeaders }) => {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    throw error(404, 'Post not found');
  }

  // Set cache headers for CDN and browser caching
  setHeaders({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400', // 1 hour fresh, 1 day stale
    'CDN-Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
  });

  return {
    post
  };
};

// Generate static paths for pre-rendering
export async function entries() {
  const posts = await getPosts();
  return posts.map(post => ({
    slug: post.slug
  }));
}

export const prerender = true;
