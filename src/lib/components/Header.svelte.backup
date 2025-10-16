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

  .logo-link {
    transition: all 0.3s ease;
  }

  .logo-link:hover {
    background-color: transparent !important;
  }

  .logo-link:hover img {
    animation: logoColorShift 0.5s ease forwards;
  }
</style>

<header class="flex flex-col relative z-20">
  <div class="max-w-[95%] mx-auto w-full">
<div class="navbar shadow-sm border border-solid border-base-200 px-4 mt-6 rounded-lg">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <div class="dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-4 shadow">
        <div class="form-control">
          <input type="text" placeholder="Search..." class="input input-bordered w-full" />
        </div>
      </div>
    </div>
    <a href="/" class="p-0 logo-link">
      <img src="/AMGA-Logo.svg" alt="AMGA Logo" class="h-10 w-auto" />
    </a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <div class="form-control">
      <input type="text" placeholder="Search..." class="input input-bordered w-[480px]" />
    </div>
  </div>
  <div class="navbar-end">
    <div class="flex items-center gap-4 mr-4">
      <a href="https://github.com/AMGA" class="text-3xl social-icon" aria-label="GitHub">
        <i class="fa-brands fa-github"></i>
      </a>
      <a href="https://instagram.com/AMGA" class="text-3xl social-icon" aria-label="Instagram">
        <i class="fa-brands fa-instagram"></i>
      </a>
      <a href="https://linkedin.com/company/AMGA" class="text-3xl social-icon" aria-label="LinkedIn">
        <i class="fa-brands fa-linkedin"></i>
      </a>
    </div>
    <a href="/get-started" class="btn" style="background-color: #b687f2; border-color: #b687f2; color:#191923;">Contact me</a>
  </div>
</div>
</div>
  <!-- Gradient line below navbar -->
  <div class="max-w-[95%] mx-auto h-[2px] w-full bg-gradient-to-r from-transparent to-[#b687f2] mt-8"></div>
</header>
