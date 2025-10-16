<script lang="ts">
  import { onMount } from 'svelte';
  
  let showButton = false;
  
  onMount(() => {
    const handleScroll = () => {
      // Show button when user scrolls near the bottom of the page
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show button when user is within 300px of the bottom
      showButton = scrollTop + windowHeight >= documentHeight - 300;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
</script>

<button
  class="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#b687f2] text-[#191923] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#b687f2] focus:ring-offset-2 focus:ring-offset-[#191923]"
  class:opacity-0={!showButton}
  class:opacity-100={showButton}
  class:pointer-events-none={!showButton}
  on:click={scrollToTop}
  aria-label="Back to top"
>
  <!-- Up arrow icon -->
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
</button>

<style>
  button {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
</style>
