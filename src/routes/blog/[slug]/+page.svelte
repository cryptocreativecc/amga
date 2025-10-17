<script lang="ts">
  import type { PageData } from './$types';
  import { error } from '@sveltejs/kit';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import { processPostContent } from '$lib/utils/graphql';

  export let data: PageData;
  
  if (!data?.post) {
    throw error(404, 'Post not found');
  }

  const { post } = data;
  const processedContent = processPostContent(post.content);
</script>

<svelte:head>
  <title>{post.title} - AMGA Blog</title>
  <meta name="description" content={post.excerpt || `Read ${post.title} on AMGA's blog`} />
  {#if post.featuredImage}
    <meta property="og:image" content={post.featuredImage.node.sourceUrl} />
  {/if}
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    <Breadcrumb items={[
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: post.title }
    ]} />

    <!-- Featured Image -->
    {#if post.featuredImage}
      <div class="relative mb-8 rounded-lg overflow-hidden">
        <img 
          src={post.featuredImage.node.sourceUrl} 
          alt={post.featuredImage.node.altText || post.title}
          class="w-full h-64 md:h-96 object-cover"
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
        
        <!-- Category overlay - bottom left -->
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
    {/if}

    <!-- Article Header -->
    <header class="mb-8">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
    </header>

    <!-- Article Content -->
    <article class="prose prose-lg max-w-none">
      <div class="prose-headings:text-white prose-h3:text-[#b687f2] prose-p:text-white prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-[#b687f2] prose-blockquote:amga-bg-black prose-blockquote:border prose-blockquote:border-[#b687f2] prose-blockquote:py-4 prose-blockquote:px-6 prose-strong:text-[#b687f2] prose-ul:text-white prose-ol:text-white prose-li:text-white">
        {@html processedContent}
      </div>
    </article>

    <!-- Back to Blog Button -->
    <div class="mt-12 pt-8 border-t border-gray-200">
      <a 
        href="/blog" 
        class="inline-flex items-center amga-purple hover:text-blue-800 font-medium transition-colors duration-200"
      >
        <svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </a>
    </div>
  </div>
</div>
