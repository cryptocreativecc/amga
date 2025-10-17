<script lang="ts">
  import Hero from '$lib/components/Hero.svelte'
  import ProjectSection from '$lib/components/ProjectSection.svelte'
  import ExperienceSection from '$lib/components/ExperienceSection.svelte'
  import FitnessSection from '$lib/components/FitnessSection.svelte';
</script>

<svelte:head>
  <title>AMGA - Austin McCormick Graphical Artist</title>
  <meta name="description" content="Austin McCormick Graphical Artist - Professional graphic design, web development, and creative solutions" />
</svelte:head>

<main class="flex flex-col">
  <Hero />
  <ProjectSection />
  <ExperienceSection />
  <FitnessSection />
</main>
