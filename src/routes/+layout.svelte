<script lang="ts">
	import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import BackToTop from '$lib/components/BackToTop.svelte';

	let { children } = $props();
</script>

<Header />

{@render children()}

<Footer />

<BackToTop />
