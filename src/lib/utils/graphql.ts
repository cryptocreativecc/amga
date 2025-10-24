import { GraphQLClient } from 'graphql-request';

const WORDPRESS_GRAPHQL_URL = 'https://wordpress.codemash.dev/graphql';

export const graphqlClient = new GraphQLClient(WORDPRESS_GRAPHQL_URL);

// Cache configuration
interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

class GraphQLCache {
  private cache = new Map<string, CacheEntry>();
  private defaultTTL = 60 * 60 * 1000; // 1 hour in milliseconds

  set(key: string, data: any, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Get stale data (for stale-while-revalidate pattern)
  getStale(key: string): any | null {
    const entry = this.cache.get(key);
    return entry ? entry.data : null;
  }
}

export const graphqlCache = new GraphQLCache();

// Types for WordPress GraphQL responses
export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  categories?: {
    nodes: Category[];
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface PostsResponse {
  posts: {
    nodes: Post[];
  };
}

export interface PostResponse {
  post: Post;
}

// GraphQL queries
export const GET_POSTS_QUERY = `
  query GetPosts {
    posts {
      nodes {
        id
        title
        slug
        date
        excerpt
        categories {
          nodes {
            id
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      content
      excerpt
      categories {
        nodes {
          id
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// API functions with caching
export async function getPosts(): Promise<Post[]> {
  const cacheKey = 'posts:all';
  
  try {
    // Try to get fresh data first
    const data: PostsResponse = await graphqlClient.request(GET_POSTS_QUERY);
    graphqlCache.set(cacheKey, data);
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    
    // Fallback to stale cache if available
    const staleData = graphqlCache.getStale(cacheKey) as PostsResponse;
    if (staleData) {
      console.log('Using stale cache for posts');
      return staleData.posts.nodes;
    }
    
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const cacheKey = `post:${slug}`;
  
  try {
    const data: PostResponse = await graphqlClient.request(GET_POST_BY_SLUG_QUERY, { slug });
    graphqlCache.set(cacheKey, data);
    return data.post;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    
    // Fallback to stale cache if available
    const staleData = graphqlCache.getStale(cacheKey) as PostResponse;
    if (staleData) {
      console.log(`Using stale cache for post: ${slug}`);
      return staleData.post;
    }
    
    return null;
  }
}

// Cache management functions
export function clearPostsCache(): void {
  graphqlCache.delete('posts:all');
}

export function clearPostCache(slug: string): void {
  graphqlCache.delete(`post:${slug}`);
}

export function clearAllCache(): void {
  graphqlCache.clear();
}

// URL transformation for WordPress image proxying
const WORDPRESS_URL = 'https://wordpress.codemash.dev/wp-content/uploads/';
const PROXIED_PATH = '/wp-media/';

export function getProxiedImageUrl(originalUrl: string): string {
  // If the URL is already from our domain or doesn't match WordPress pattern, return as-is
  if (!originalUrl || !originalUrl.includes(WORDPRESS_URL)) {
    return originalUrl;
  }
  
  // During prerendering, keep the original URL to avoid 404 errors
  // The proxied URLs will work in production with Traefik
  if (import.meta.env.SSR) {
    return originalUrl;
  }
  
  // Strip the WordPress URL prefix to get the relative path
  const relativePath = originalUrl.replace(WORDPRESS_URL, '');
  
  // Build the new proxied URL (will be handled by Traefik)
  // Note: We use relative path since the domain will be handled by the browser
  return `${PROXIED_PATH}${relativePath}`;
}

// Utility function to process WordPress content and fix image URLs if needed
export function processPostContent(content: string): string {
  if (!content) return '';
  
  // Process images in the content to ensure they display correctly
  let processedContent = content;
  
  // Transform WordPress image URLs to proxied URLs (only in client-side)
  if (!import.meta.env.SSR) {
    processedContent = processedContent.replace(
      /https:\/\/wordpress\.codemash\.dev\/wp-content\/uploads\/([^"'\s]+)/g,
      (match, path) => {
        return `${PROXIED_PATH}${path}`;
      }
    );
  }
  
  // Handle WordPress block image styling
  processedContent = processedContent.replace(
    /<figure class="([^"]*wp-block-image[^"]*)"([^>]*)>([\s\S]*?)<\/figure>/g,
    (match, classes, attributes, innerContent) => {
      // Add WordPress block styling
      let newClasses = classes;
      if (classes.includes('is-style-rounded')) {
        newClasses += ' wp-image-rounded';
      }
      if (classes.includes('size-medium')) {
        newClasses += ' wp-image-medium';
      }
      if (classes.includes('is-resized')) {
        newClasses += ' wp-image-resized';
      }
      return `<figure class="${newClasses}"${attributes}>${innerContent}</figure>`;
    }
  );
  
  // Handle WordPress group blocks
  processedContent = processedContent.replace(
    /<div class="([^"]*wp-block-group[^"]*)"([^>]*)>([\s\S]*?)<\/div>/g,
    (match, classes, attributes, innerContent) => {
      let newClasses = classes;
      if (classes.includes('is-layout-flex')) {
        newClasses += ' wp-group-flex';
      }
      if (classes.includes('is-nowrap')) {
        newClasses += ' wp-group-nowrap';
      }
      return `<div class="${newClasses}"${attributes}>${innerContent}</div>`;
    }
  );
  
  // Add responsive image classes, lazy loading, and ensure proper styling
  processedContent = processedContent.replace(
    /<img([^>]*)>/g,
    (match, attributes) => {
      // Check if the image already has a class attribute
      if (attributes.includes('class="')) {
        // Add our classes to existing ones
        return match.replace(
          /class="([^"]*)"/,
          'class="$1 max-w-full h-auto" loading="lazy"'
        );
      } else {
        // Add our classes and lazy loading
        return `<img${attributes} class="max-w-full h-auto" loading="lazy">`;
      }
    }
  );
  
  // Ensure images without width/height attributes get proper styling
  processedContent = processedContent.replace(
    /<img((?:(?!width=|height=).)*?)>/g,
    (match, attributes) => {
      if (!attributes.includes('style=')) {
        return `<img${attributes} style="max-width: 100%; height: auto;">`;
      }
      return match;
    }
  );
  
  return processedContent;
}
