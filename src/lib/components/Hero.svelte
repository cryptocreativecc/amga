<script lang="ts">
  import SectionWrapper from '$lib/components/SectionWrapper.svelte'
</script>

<SectionWrapper>
  <div class="flex flex-col relative z-20">
    <div class="max-w-[1200px] mx-auto w-full py-16">
      
      <div class="flex flex-col md:flex-row items-center gap-8">
        <div class="md:w-[30%] flex justify-center">
          <img 
            src="/AMGA-austin.png" 
            alt="Austin McCormick" 
            class="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-white shadow-lg"
          />
        </div>
        <div class="text-center md:text-left md:w-[70%]">
          <h1 class="text-3xl md:text-5xl font-bold mb-4">Hi! I'm <span class="amga-purple">Austin</span> McCormick</h1>
          <h2 class="text-2xl md:text-3xl font-semibold mb-3">Website <span class="amga-purple">Developer</span> & Digital <span class="amga-purple">Designer</span></h2>
          <p class="text-lg md:text-xl w-full mx-auto md:mx-0 mb-4">
            By day, I craft code as a <strong>Senior Web Designer at Edge Hill University</strong>. By night (and whenever inspiration strikes), this little corner of the internet becomes my creative playground – a space where code, design, and my random musings collide.
          </p>
          <p class="text-lg md:text-xl w-full mx-auto md:mx-0">
            Fancy a chat? Or perhaps you've spotted an opportunity we could explore together? 
          </p>
        </div>
      </div>

    </div>
  </div>
</SectionWrapper>
