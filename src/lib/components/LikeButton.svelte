<script lang="ts">
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  let { postId, size = 'md' } = $props<{
    postId: string;
    size?: 'sm' | 'md' | 'lg';
  }>();

  // Ensure size is properly typed
  const typedSize = $derived(size as 'sm' | 'md' | 'lg');

  // Create stores for likes and vote counts that persist in localStorage
  const likedPosts = writable<Set<string>>(new Set());
  const voteCounts = writable<Record<string, number>>({});

  // Initialize from localStorage (browser only)
  onMount(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedLikes = localStorage.getItem('amga-liked-posts');
      const storedVotes = localStorage.getItem('amga-vote-counts');
      
      if (storedLikes) {
        likedPosts.set(new Set(JSON.parse(storedLikes)));
      }
      
      if (storedVotes) {
        voteCounts.set(JSON.parse(storedVotes));
      }
    }
  });

  // Subscribe to store changes and persist to localStorage (browser only)
  likedPosts.subscribe($likedPosts => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('amga-liked-posts', JSON.stringify([...$likedPosts]));
    }
  });

  voteCounts.subscribe($voteCounts => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('amga-vote-counts', JSON.stringify($voteCounts));
    }
  });

  let isLiked = $derived($likedPosts.has(postId));
  let currentVoteCount = $derived($voteCounts[postId] || 0);

  function toggleLike() {
    // Users can only vote once per post
    if (isLiked) {
      // User is unliking - decrement count
      voteCounts.update(counts => {
        const newCounts = { ...counts };
        if (newCounts[postId] > 0) {
          newCounts[postId]--;
        }
        return newCounts;
      });
      
      likedPosts.update(posts => {
        const newPosts = new Set(posts);
        newPosts.delete(postId);
        return newPosts;
      });
    } else {
      // User is liking - increment count
      voteCounts.update(counts => {
        const newCounts = { ...counts };
        newCounts[postId] = (newCounts[postId] || 0) + 1;
        return newCounts;
      });
      
      likedPosts.update(posts => {
        const newPosts = new Set(posts);
        newPosts.add(postId);
        return newPosts;
      });
    }
  }

  // Size classes with proper typing
  const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const containerClasses: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };
</script>

<div class="flex items-center gap-2">
  <button
    class="flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#b687f2] focus:ring-opacity-50 {containerClasses[typedSize]} amga-bg-purple"
    onclick={toggleLike}
    aria-label="{isLiked ? 'Unlike this post' : 'Like this post'}"
  >
    <svg
      class="{sizeClasses[typedSize]} transition-all duration-300 fill-white stroke-white"
      stroke-width="1.5"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  </button>
  
  <div class="flex items-center gap-1">
    <span class="text-sm font-medium {isLiked ? 'text-[#b687f2]' : 'text-gray-500'}">
      {currentVoteCount}
    </span>
    {#if isLiked}
      <span class="text-sm font-medium text-[#b687f2]">Liked</span>
    {/if}
  </div>
</div>
