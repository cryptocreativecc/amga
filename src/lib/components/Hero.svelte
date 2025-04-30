<script lang="ts">
  import lottie from 'lottie-web'
  import SectionWrapper from '$lib/components/SectionWrapper.svelte'

  let animationContainer: HTMLDivElement

    $effect(() => {
      lottie.loadAnimation({
        container: animationContainer,
        path:'/AMGA-Animation.json',
      })
    })

</script>

<SectionWrapper>
  <div class="flex flex-col relative z-20">
    <div class="max-w-[1200px] mx-auto w-full py-22">
      
      <div class="flex flex-col md:flex-row items-center gap-8">
        <div class="text-center md:text-left md:w-[70%]">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Hi! I'm <span class="text-green-500">Austin</span> McCormick</h1>
          <h2 class="text-2xl md:text-3xl font-semibold mb-3">Full Stack <span class="text-green-500">Developer</span> / Digital <span class="text-green-500">Designer</span></h2>
          <p class="text-lg md:text-xl w-full mb-4">
            Turning ideas into elegant solutions through code and creativity.
          </p>
          <p class="text-lg md:text-xl w-full mx-auto md:mx-0 mb-4">
            By day, I craft code as a Senior Web Designer at Edge Hill University. By night (and whenever inspiration strikes), this little corner of the internet becomes my creative playground – a space where code, design, and my random musings collide. Think of it as my digital sandbox where I experiment, create, and occasionally break things (in the best way possible).
          </p>
          <p class="text-lg md:text-xl w-full mx-auto md:mx-0">
            Fancy a chat about turning your wild ideas into reality? Or perhaps you've spotted an opportunity we could explore together? Drop me a line at contact@amga.co.uk
          </p>
          </div>
        <div class="md:w-[30%]" bind:this={animationContainer}></div>
      </div>

    </div>
  </div>
</SectionWrapper>
