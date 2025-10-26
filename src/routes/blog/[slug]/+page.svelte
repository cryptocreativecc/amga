<script lang="ts">
  import type { PageData } from './$types';
  import { error } from '@sveltejs/kit';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import { processPostContent, getProxiedImageUrl } from '$lib/utils/graphql';

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
    <meta property="og:image" content={getProxiedImageUrl(post.featuredImage.node.sourceUrl)} />
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
      <div class="relative mb-8 rounded-2xl overflow-hidden shadow-lg group">
        <img 
          src={getProxiedImageUrl(post.featuredImage.node.sourceUrl)} 
          alt={post.featuredImage.node.altText || post.title}
          class="w-full h-64 md:h-96 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
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
      <style>
        /* WordPress block image styling */
        .prose .wp-block-image {
          margin: 2rem 0 !important;
        }
        
        @media (max-width: 767px) {
          .prose .wp-block-image {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }
        }
        
        .prose .wp-block-image.is-style-rounded img {
          border-radius: 1rem !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }
        
        .prose .wp-block-image.size-medium img {
          max-width: 300px !important;
          height: auto !important;
        }
        
        .prose .wp-block-image.is-resized img {
          width: auto !important;
          height: auto !important;
        }
        
        /* WordPress group block styling */
        .prose .wp-block-group {
          margin: 2rem 0 !important;
        }
        
        .prose .wp-block-group.is-layout-flex {
          display: flex !important;
          flex-direction: column !important;
          gap: 1rem !important;
          align-items: flex-start !important;
        }
        
        @media (min-width: 768px) {
          .prose .wp-block-group.is-layout-flex {
            flex-direction: row !important;
            align-items: center !important;
          }
        }
        
        .prose .wp-block-group.is-nowrap {
          flex-wrap: nowrap !important;
        }
        
        .prose .wp-block-group.is-layout-flex .wp-block-image {
          margin: 0 !important;
          flex-shrink: 0 !important;
        }
        
        .prose .wp-block-group.is-layout-flex > * {
          flex: 1 !important;
          min-width: 0 !important;
        }
        
        @media (min-width: 768px) {
          .prose .wp-block-group.is-layout-flex > * {
            min-width: 65% !important;
          }
        }
        
        /* WordPress columns block styling */
        .prose .wp-block-columns {
          margin: 2rem 0 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 1.5rem !important;
        }
        
        @media (min-width: 768px) {
          .prose .wp-block-columns {
            flex-direction: row !important;
          }
        }
        
        .prose .wp-block-columns.is-layout-flex {
          flex-wrap: wrap !important;
        }
        
        .prose .wp-block-columns > * {
          flex: 1 !important;
          min-width: 0 !important;
        }
        
        @media (min-width: 768px) {
          .prose .wp-block-columns > * {
            min-width: 0 !important;
          }
        }
        
        /* WordPress column individual styling */
        .prose .wp-block-column {
          flex: 1 !important;
          min-width: 0 !important;
        }
        
        /* WordPress column width classes */
        .prose .wp-block-column[style*="flex-basis:66.66%"],
        .prose .wp-block-column[style*="flex-basis: 66.66%"] {
          max-width: 66.66% !important;
        }
        
        .prose .wp-block-column[style*="flex-basis:33.33%"],
        .prose .wp-block-column[style*="flex-basis: 33.33%"] {
          max-width: 33.33% !important;
        }
        
        /* Responsive column behavior */
        @media (max-width: 767px) {
          .prose .wp-block-column[style*="flex-basis:66.66%"],
          .prose .wp-block-column[style*="flex-basis: 66.66%"],
          .prose .wp-block-column[style*="flex-basis:33.33%"],
          .prose .wp-block-column[style*="flex-basis: 33.33%"] {
            flex-basis: 100% !important;
            max-width: 100% !important;
          }
        }
        
        /* General image styling */
        .prose img {
          border-radius: 0.5rem !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          transition: transform 0.5s ease !important;
          overflow: hidden !important;
        }
        
        /* Contained zoom-in animation on hover for all images */
        .prose img:hover {
          transform: scale(1.05) !important;
        }
        
        /* Image alignment styles */
        .prose img.float-left {
          float: left !important;
          margin-right: 1.5rem !important;
          margin-bottom: 1rem !important;
          max-width: 18rem !important;
        }
        
        .prose img.float-right {
          float: right !important;
          margin-left: 1.5rem !important;
          margin-bottom: 1rem !important;
          max-width: 18rem !important;
        }
        
        .prose img.mx-auto {
          display: block !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        
        /* Clear floats for proper text wrapping */
        .clear-left::after,
        .clear-right::after {
          content: "";
          display: table;
          clear: both;
        }
        
        /* WordPress button block styling */
        .prose .amga-button {
          display: inline-block;
          background-color: #b687f2 !important;
          color: #191923 !important;
          padding: 0.75rem 1.5rem !important;
          border-radius: 0.5rem !important;
          text-decoration: none !important;
          font-weight: 600 !important;
          transition: all 0.3s ease !important;
          transform: translateY(0) !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }
        
        .prose .amga-button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
          background-color: #a375e8 !important;
        }
        
        /* WordPress button container styling */
        .prose .wp-block-buttons {
          margin: 1.5rem 0 !important;
        }
        
        .prose .wp-block-button {
          margin: 0.5rem 0.5rem 0.5rem 0 !important;
        }
        
        /* WordPress-style figure captions */
        .prose figure {
          margin: 2rem 0 !important;
        }
        
        .prose figcaption {
          text-align: center !important;
          font-style: italic !important;
          color: #6b7280 !important;
          margin-top: 0.5rem !important;
          font-size: 0.875rem !important;
        }
        
        /* Enhanced paragraph spacing for better readability */
        .prose p {
          margin-bottom: 1.5rem !important;
          line-height: 1.7 !important;
        }
      </style>
      
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
