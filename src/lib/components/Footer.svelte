<script>
  // Simple footer component
</script>

<!-- Gradient above footer -->
<div class="h-2 bg-gradient-to-r from-transparent to-[#b687f2]"></div>

<footer class="amga-bg-black text-base-content py-8">
  <div class="max-w-[1400px] mx-auto px-4">
    <div class="flex flex-col items-center justify-center space-y-4">
      <!-- Logo/Brand -->
      <div class="flex items-center space-x-2">
        <img src="/AMGA-Logo.svg" alt="AMGA Logo" class="h-8 w-auto" />
      </div>
      
      <!-- Tech stack info -->
      <div class="text-center text-sm text-base-content/70 space-y-2">
        <p class="flex items-center justify-center space-x-2">
          <span>Website build utilising the Svelte framework</span> 
        </p>
        <p class="flex items-center justify-center space-x-2">
          <span>Hosted utilising Dokploy and Github</span>
        </p>
        <p class="flex items-center justify-center space-x-2">
          <span>Designed with Love</span>
        </p>
      </div>
      
      <!-- Copyright -->
      <div class="text-center text-sm text-base-content/70">
        <p>&copy; {new Date().getFullYear()} AMGA. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>
