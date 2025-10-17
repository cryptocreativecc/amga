import { clearAllCache, clearPostsCache, clearPostCache } from './graphql';

// Cache management utility for manual cache clearing
export class CacheManager {
  static clearAll(): void {
    clearAllCache();
    console.log('All cache cleared');
  }

  static clearPosts(): void {
    clearPostsCache();
    console.log('Posts cache cleared');
  }

  static clearPost(slug: string): void {
    clearPostCache(slug);
    console.log(`Post cache cleared for: ${slug}`);
  }

  // Utility to clear cache after new post creation
  static onNewPost(): void {
    clearPostsCache();
    console.log('Cache cleared for new post');
  }

  // Utility to clear cache after post update
  static onPostUpdate(slug: string): void {
    clearPostsCache();
    clearPostCache(slug);
    console.log(`Cache cleared for updated post: ${slug}`);
  }
}

// Export for easy access
export const cacheManager = new CacheManager();

// Development helper - expose cache manager globally for debugging
if (import.meta.env.DEV) {
  (window as any).cacheManager = cacheManager;
}
