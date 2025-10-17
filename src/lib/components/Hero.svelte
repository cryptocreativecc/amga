<script lang="ts">
  import SectionWrapper from '$lib/components/SectionWrapper.svelte'
  import { onMount } from 'svelte'
  import { getPosts, type Post } from '$lib/utils/graphql'
  
  let currentSlide = 0;
  let isHovering = false;
  let allPosts: Post[] = [];
  let loading = true;
  let error: string | null = null;
  let currentSkillIndex = 0;
  let skillInterval: ReturnType<typeof setInterval>;

  const skills = [
    'HTML5/CSS3',
    'JavaScript',
    'React',
    'Vue.js',
    'Node.js',
    'Astro.js',
    'Svelte',
    'Express',
    'MongoDB',
    'SQL',
    'PHP 5/7/8',
    'Bootstrap',
    'Tailwind CSS',
    'WordPress',
    'Git / GitHub',
    'UI / UX Design',
    'Adobe Photoshop / Illustrator / XD',
    'Docker',
    'Visual Studio Code'
  ];

  function nextSlide() {
    if (allPosts.length > 0) {
      currentSlide = (currentSlide + 1) % allPosts.length;
    }
  }

  function prevSlide() {
    if (allPosts.length > 0) {
      currentSlide = (currentSlide - 1 + allPosts.length) % allPosts.length;
    }
  }

  function goToSlide(index: number) {
    currentSlide = index;
  }

  function nextSkill() {
    currentSkillIndex = (currentSkillIndex + 1) % skills.length;
  }

  // Auto-advance slides every 5 seconds and skills every 2 seconds
  onMount(() => {
    let postInterval: ReturnType<typeof setInterval>;

    const fetchPosts = async () => {
      try {
        allPosts = await getPosts();
      } catch (err) {
        error = 'Failed to load blog posts';
        console.error(err);
      } finally {
        loading = false;
      }

      postInterval = setInterval(() => {
        if (allPosts.length > 0) {
          nextSlide();
        }
      }, 5000);
    };

    // Start skill animation
    skillInterval = setInterval(() => {
      nextSkill();
    }, 2000);

    fetchPosts();

    return () => {
      if (postInterval) {
        clearInterval(postInterval);
      }
      if (skillInterval) {
        clearInterval(skillInterval);
      }
    };
  });
</script>

<SectionWrapper>
  <div class="flex flex-col relative z-20">
    <div class="max-w-[1200px] mx-auto w-full py-16">
      
      <!-- Main Content with Dotted Divide -->
      <div class="flex flex-col lg:flex-row gap-12 items-start">
        <!-- Left Side - Image and Text -->
        <div class="lg:w-1/2">
          <!-- Image and Text Container -->
          <div class="flex flex-col items-center">
            <!-- Image Section -->
            <div class="mb-6">
              <div 
                class="relative rounded-full w-48 h-48 md:w-56 md:h-56 border-4 border-white shadow-lg overflow-hidden cursor-pointer"
                role="button"
                tabindex="0"
                on:mouseenter={() => isHovering = true}
                on:mouseleave={() => isHovering = false}
                on:keydown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    isHovering = !isHovering;
                  }
                }}
              >
                <img 
                  src="/AMGA-austin.png" 
                  alt="Austin McCormick" 
                  class="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out"
                  class:opacity-0={isHovering}
                  class:scale-110={isHovering}
                />
                <img 
                  src="/AMGA-austin-coffee.jpg" 
                  alt="Austin McCormick with coffee" 
                  class="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out"
                  class:opacity-0={!isHovering}
                  class:scale-110={!isHovering}
                />
              </div>
            </div>

            <!-- Text Section -->
            <div class="text-center">
              <h1 class="text-2xl md:text-4xl font-bold mb-3">Hi! I'm <span class="amga-purple">Austin</span> McCormick</h1>
              <h2 class="text-xl md:text-2xl font-semibold mb-2">Website <span class="amga-purple">Developer</span> & Digital <span class="amga-purple">Designer</span></h2>
              <p class="text-base md:text-lg max-w-3xl lg:max-w-none mx-auto mb-3">
                By day, I craft code as a <strong>Senior Web Designer at Edge Hill University</strong>. By night this little corner of the internet becomes my creative playground.
              </p>
              <!-- My Skill Set Section -->
              <div class="mt-8">
                <h3 class="text-2xl md:text-3xl font-semibold mb-3 text-center">My Skill set</h3>
                <div class="max-w-[28%] h-[2px] w-full bg-gradient-to-r from-transparent to-[#b687f2] mt-2 mb-4 mx-auto"></div>
                <div class="h-12 flex items-center justify-center overflow-hidden">
                  <div class="skill-scroll-container">
                    {#each skills as skill, index}
                      <div 
                        class="skill-item text-lg md:text-xl font-semibold text-center transition-all duration-500 ease-in-out"
                        class:active={currentSkillIndex === index}
                        class:next={currentSkillIndex === (index - 1 + skills.length) % skills.length}
                        class:prev={currentSkillIndex === (index + 1) % skills.length}
                      >
                        {skill}
                      </div>
                    {/each}
                  </div>
                </div>
              </div>

              <!-- Fancy a chat and WhatsApp Section -->
              <div class="mt-8">
                <p class="text-base md:text-xl max-w-3xl lg:max-w-none mx-auto mb-2">
                  Fancy a chat?
                </p>
                <a href="https://wa.me/447727106840" class="text-4xl hover:text-[#b687f2] transition-colors" aria-label="Whatsapp">
                  <i class="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Dotted Divide -->
        <div class="hidden lg:block border-l-2 border-dashed border-gray-300"></div>
        
        <!-- Right Side - Latest Blog Posts Slider -->
        <div class="lg:w-1/2">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl md:text-3xl font-bold text-center lg:text-left">Latest Blog Posts</h2>
            <div class="view-blog-container">
              <a href="/blog" class="view-blog-button">
                View Blog
              </a>
            </div>
          </div>
          <div class="max-w-[48%] h-[2px] w-full bg-gradient-to-r from-transparent to-[#b687f2] mt-2 mb-4"></div>
          <!-- Slider Container -->
          <div class="relative">
            {#if loading}
              <div class="bg-white rounded-lg shadow-md overflow-hidden border border-[#b687f2]">
                <div class="h-48 bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
                <div class="p-6 bg-[#191923]">
                  <div class="h-6 bg-gray-600 rounded mb-3 animate-pulse"></div>
                  <div class="h-4 bg-gray-600 rounded mb-2 animate-pulse"></div>
                  <div class="h-4 bg-gray-600 rounded mb-4 animate-pulse"></div>
                  <div class="h-10 bg-gray-600 rounded animate-pulse"></div>
                </div>
              </div>
            {:else if error}
              <div class="bg-white rounded-lg shadow-md overflow-hidden border border-[#b687f2]">
                <div class="h-48 bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-center">
                  <span class="text-white font-semibold">Error Loading Posts</span>
                </div>
                <div class="p-6 bg-[#191923]">
                  <p class="text-white mb-4">{error}</p>
                  <button 
                    on:click={() => location.reload()} 
                    class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            {:else if allPosts.length === 0}
              <div class="bg-white rounded-lg shadow-md overflow-hidden border border-[#b687f2]">
                <div class="h-48 bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center">
                  <span class="text-white font-semibold">No Blog Posts</span>
                </div>
                <div class="p-6 bg-[#191923]">
                  <p class="text-white mb-4">No blog posts available yet.</p>
                  <a 
                    href="/blog" 
                    class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 inline-block"
                  >
                    View Blog
                  </a>
                </div>
              </div>
            {:else}
              <!-- Blog Post Slide -->
              <div class="bg-white rounded-lg shadow-md overflow-hidden border border-[#b687f2] transition-all duration-500 ease-in-out">
                <!-- Blog Image -->
                {#if allPosts[currentSlide]?.featuredImage}
                  <div class="h-48 overflow-hidden">
                    <img 
                      src={allPosts[currentSlide].featuredImage.node.sourceUrl} 
                      alt={allPosts[currentSlide].featuredImage.node.altText || allPosts[currentSlide].title}
                      class="w-full h-full object-cover"
                    />
                  </div>
                {:else}
                  <!-- Image Placeholder -->
                  <div class="h-48 bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                    <span class="text-white font-semibold">Blog Image</span>
                  </div>
                {/if}
                
                <!-- Content -->
                <div class="p-6 bg-[#191923]">
                  <h3 class="text-xl font-bold mb-3 text-white">{allPosts[currentSlide]?.title || 'Untitled Post'}</h3>
                  <div class="text-white mb-4 prose prose-invert max-w-none">
                    {@html allPosts[currentSlide]?.excerpt || 'No excerpt available.'}
                  </div>
                  <a 
                    href="/blog/{allPosts[currentSlide]?.slug || '#'}" 
                    class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 inline-block"
                  >
                    Read Post
                  </a>
                </div>
              </div>

              <!-- Navigation Controls -->
              <div class="flex items-center justify-between mt-6">
                <!-- Left Arrow -->
                <button 
                  on:click={prevSlide}
                  class="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-full transition-colors duration-200 transform hover:scale-105"
                  aria-label="Previous post"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>

                <!-- Dot Indicators -->
                <div class="flex space-x-2">
                  {#each allPosts as _, index}
                    <button 
                      on:click={() => goToSlide(index)}
                      class="w-3 h-3 rounded-full transition-all duration-300 {index === currentSlide ? 'bg-purple-600' : 'bg-gray-300 hover:bg-gray-400'}"
                      aria-label={`Go to post ${index + 1}`}
                    ></button>
                  {/each}
                </div>

                <!-- Right Arrow -->
                <button 
                  on:click={nextSlide}
                  class="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-full transition-colors duration-200 transform hover:scale-105"
                  aria-label="Next post"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>

    </div>
  </div>
</SectionWrapper>

<style>
  .view-blog-container {
    display: flex;
    width: fit-content;
    justify-content: center;
    padding: 2px;
    border-radius: 8px;
    background: linear-gradient(to right, transparent, #b687f2);
  }
  
  .view-blog-button {
    display: inline-flex;
    align-items: center;
    background-color: #24292e;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.875rem;
    transition: background-color 0.3s ease;
    text-decoration: none;
  }
  
  .view-blog-button:hover {
    background-color: #b687f2;
    color: #191923;
  }

  /* Skill Animation Styles */
  .skill-scroll-container {
    position: relative;
    height: 48px;
    width: 100%;
  }

  .skill-item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.5s ease-in-out;
  }

  .skill-item.active {
    opacity: 1;
    transform: translateY(0);
  }

  .skill-item.next {
    opacity: 0;
    transform: translateY(-100%);
  }

  .skill-item.prev {
    opacity: 0;
    transform: translateY(100%);
  }
</style>
