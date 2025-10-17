<script lang="ts">
  import { onMount } from 'svelte';
  import { getPosts, type Post } from '$lib/utils/graphql';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let posts: Post[] = [];
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      posts = await getPosts();
    } catch (err) {
      error = 'Failed to load blog posts';
      console.error(err);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Blog - AMGA</title>
  <meta name="description" content="Read the latest blog posts from AMGA" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    <Breadcrumb items={[
      { label: 'Home', href: '/' },
      { label: 'Blog' }
    ]} />
    
    {#if loading}
      <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    {:else if error}
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-800">{error}</p>
      </div>
    {:else if posts.length === 0}
      <div class="text-center py-12">
        <p class="text-gray-500 text-lg">No blog posts found.</p>
      </div>
    {:else}
      <div class="bg-white rounded-lg shadow-md overflow-hidden border border-[#b687f2] transition-all duration-500 ease-in-out s-3oGfk5OZ8kfi">
        {#each posts as post}
          <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {#if post.featuredImage}
              <div class="relative h-[400px] overflow-hidden">
                <img 
                  src={post.featuredImage.node.sourceUrl} 
                  alt={post.featuredImage.node.altText || post.title}
                  class="w-full h-full object-cover"
                />
                
                <!-- Date overlay - top right -->
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <time datetime={post.date} class="text-sm font-medium text-gray-700">
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </time>
                </div>
                
                <!-- Category button overlay - bottom left -->
                {#if post.categories && post.categories.nodes.length > 0}
                  <div class="absolute bottom-4 left-4">
                    {#each post.categories.nodes as category}
                      <span 
                        class="inline-block amga-bg-purple text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                      >
                        {category.name}
                      </span>
                    {/each}
                  </div>
                {/if}
              </div>
            {:else}
              <!-- Fallback for posts without featured images -->
              <div class="relative h-48 bg-gray-100 flex items-center justify-center">
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <time datetime={post.date} class="text-sm font-medium text-gray-700">
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </time>
                </div>
                
                {#if post.categories && post.categories.nodes.length > 0}
                  <div class="absolute bottom-4 left-4">
                    {#each post.categories.nodes as category}
                      <span 
                        class="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                      >
                        {category.name}
                      </span>
                    {/each}
                  </div>
                {/if}
                
                <div class="text-gray-400">
                  <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            {/if}
            
            <!-- Content below the image -->
            <div class="p-6 amga-bg-black">
              <div class="mb-3">
                <h2 class="text-2xl font-semibold text-white">
                  <a 
                    href="/blog/{post.slug}" 
                    class="hover:text-[#b687f2] transition-colors duration-200"
                  >
                    {post.title}
                  </a>
                </h2>
              </div>
              
              {#if post.excerpt}
                <div class="prose prose-gray max-w-none mb-4">
                  {@html post.excerpt}
                </div>
              {/if}
              
              <div class="view-more-container">
                <a 
                  href="/blog/{post.slug}" 
                  class="view-more-button"
                >
                   Read more <i class="pl-3 fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</div>
