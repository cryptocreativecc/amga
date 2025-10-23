<script lang="ts">
  // Import any necessary dependencies
</script>

<style>
  @keyframes bounce {
    0%, 20%, 60%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    80% {
      transform: translateY(-5px);
    }
  }

  @keyframes logoColorShift {
    0% {
      filter: brightness(1) saturate(1);
    }
    50% {
      filter: brightness(1.2) saturate(1.3);
    }
    100% {
      filter: invert(27%) sepia(89%) saturate(750%) hue-rotate(230deg) brightness(95%) contrast(85%);
    }
  }

  .social-icon {
    transition: all 0.3s ease;
  }

  .social-icon:hover {
    color: #b687f2;
    animation: bounce 0.6s ease;
  }

</style>

<header class="flex flex-col relative z-20">
  <div class="max-w-[95%] mx-auto w-full">
    <!-- Main navbar row -->
    <div class="navbar lg:px-4 mt-6 rounded-lg">
      <div class="navbar-start">
        <a href="/" class="p-0">
          <img src="/AMGA-Logo.svg" alt="AMGA Logo" class="h-10 w-auto" />
        </a>
      </div>
      
      <!-- Mobile social icons - positioned to the right of logo -->
      <div class="navbar-center lg:hidden flex items-center gap-4 ml-4">
        <a href="https://github.com/amga-code" target="_blank" class="text-3xl social-icon" aria-label="GitHub">
          <i class="fa-brands fa-github"></i>
        </a>
        <a href="https://www.instagram.com/amga_media/" target="_blank" class="text-3xl social-icon" aria-label="Instagram">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/mccormick-austin/" target="_blank" class="text-3xl social-icon" aria-label="LinkedIn">
          <i class="fa-brands fa-linkedin"></i>
        </a>
        <a href="https://t.me/AMGA_Code_Bot" target="_blank" class="text-3xl social-icon" aria-label="Telegram Ai">
            <i class="fa-brands fa-telegram"></i>
        </a>
      </div>
      
      <div class="navbar-center hidden lg:flex">
        <div class="form-control ml-4">
          <input type="text" placeholder="Search..." class="input input-bordered w-[400px]" />
        </div>
      </div>
      <div class="navbar-end hidden lg:flex">
        <div class="flex items-center gap-4 mr-4">
          <a href="https://github.com/amga-code" target="_blank" class="text-3xl social-icon" aria-label="GitHub">
            <i class="fa-brands fa-github"></i>
          </a>
          <a href="https://www.instagram.com/amga_media/" target="_blank" class="text-3xl social-icon" aria-label="Instagram">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/mccormick-austin/" target="_blank" class="text-3xl social-icon" aria-label="LinkedIn">
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://t.me/AMGA_Code_Bot" target="_blank" class="text-3xl social-icon" aria-label="Telegram Ai">
            <i class="fa-brands fa-telegram"></i>
          </a>
        </div>
        <a href="https://wa.me/447727106840" target="_blank" class="btn" style="background-color: #b687f2; border-color: #b687f2; color:#191923;">Contact me</a>
      </div>
    </div>

    <!-- Mobile search row - appears below navbar on mobile -->
    <div class="lg:hidden mt-4">
      <div class="form-control">
        <input type="text" placeholder="Search..." class="input input-bordered w-full" />
      </div>
    </div>

    <!-- Mobile contact button row - full width under search -->
    <div class="lg:hidden mt-4">
      <a href="https://wa.me/447727106840" target="_blank" class="btn w-full" style="background-color: #b687f2; border-color: #b687f2; color:#191923;">Contact me</a>
    </div>
  </div>
  <!-- Gradient line below navbar -->
  <div class="max-w-[95%] mx-auto h-[2px] w-full bg-gradient-to-r from-transparent to-[#b687f2] mt-8"></div>
</header>
