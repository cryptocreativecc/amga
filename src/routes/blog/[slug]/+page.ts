import { getPostBySlug, getPosts } from '$lib/utils/graphql';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    throw error(404, 'Post not found');
  }

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
