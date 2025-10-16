<script lang="ts">
  export let items: Array<{ label: string; href?: string }> = [];
</script>

<nav class="mb-6" aria-label="Breadcrumb">
  <ol class="flex items-center space-x-2 text-sm text-gray-500">
    {#each items as item, index}
      <li class="flex items-center">
        {#if index > 0}
          <svg class="flex-shrink-0 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        {/if}
        
        {#if item.href && index < items.length - 1}
          <a 
            href={item.href} 
            class="ml-2 hover:text-blue-600 transition-colors duration-200"
          >
            {item.label}
          </a>
        {:else}
          <span class="ml-2 amga-purple font-medium" aria-current="page">
            {item.label}
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
