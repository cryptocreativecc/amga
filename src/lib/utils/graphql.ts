// src/lib/utils/graphql.ts
import { GraphQLClient } from 'graphql-request';

// ----------------------------------------------------------------------
// 1. CONFIGURATION
// ----------------------------------------------------------------------

// The new WordPress GraphQL endpoint URL
const WORDPRESS_GRAPHQL_URL = 'https://media.amga.co.uk/graphql';

// The base URL for WordPress media files, as they come from the GraphQL API
const WORDPRESS_MEDIA_URL = 'https://media.amga.co.uk/wp-content/uploads/';

// The proxied path on your frontend domain (amga.co.uk) that Traefik will handle
const PROXIED_PATH = '/wp-media/';

// Your production frontend domain(s)
const PRODUCTION_HOSTNAMES = ['amga.co.uk', 'www.amga.co.uk'];


export const graphqlClient = new GraphQLClient(WORDPRESS_GRAPHQL_URL, {
  credentials: 'omit', // Don't send cookies with cross-origin requests
  mode: 'cors', // Explicitly set CORS mode
});

// ----------------------------------------------------------------------
// 2. CACHE
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
// 3. TYPES
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
// 4. GRAPHQL QUERIES (UNCHANGED)
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
// 5. API FUNCTIONS (UNCHANGED)
// ----------------------------------------------------------------------

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

// Cache management functions (UNCHANGED)
export function clearPostsCache(): void {
  graphqlCache.delete('posts:all');
}

export function clearPostCache(slug: string): void {
  graphqlCache.delete(`post:${slug}`);
}

export function clearAllCache(): void {
  graphqlCache.clear();
}

// ----------------------------------------------------------------------
// 6. IMAGE URL HANDLING (SIMPLIFIED - NO PROXYING)
// ----------------------------------------------------------------------

/**
 * Returns the original WordPress image URL without any proxying.
 * @param originalUrl The full URL from the WordPress API (e.g., https://media.amga.co.uk/wp-content/uploads/...)
 * @returns The original WordPress URL unchanged.
 */
export function getProxiedImageUrl(originalUrl: string): string {
  // Simply return the original URL - no proxying needed
  return originalUrl;
}

/**
 * Utility function to process WordPress content (styling only, no URL changes)
 */
export function processPostContent(content: string): string {
  if (!content) return '';
  
  let processedContent = content;
  
  // Note: No URL transformation - all images will use original WordPress URLs
  // Only apply styling and class modifications below
  
  // ----------------------------------------------------------------------
  // REMAINDER OF PROCESSING LOGIC (STYLES/CLASSES) IS UNCHANGED
  // ----------------------------------------------------------------------
  
  // ----------------------------------------------------------------------
  // REMAINDER OF PROCESSING LOGIC (STYLES/CLASSES) IS UNCHANGED
  // ----------------------------------------------------------------------

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
  
  // Handle WordPress button blocks with custom styling
  processedContent = processedContent.replace(
    /<a class="([^"]*wp-block-button[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g,
    (match, classes, attributes, innerContent) => {
      // Add our custom button styling
      let newClasses = classes;
      if (!newClasses.includes('amga-button')) {
        newClasses += ' amga-button';
      }
      return `<a class="${newClasses}"${attributes}>${innerContent}</a>`;
    }
  );
  
  return processedContent;
}
