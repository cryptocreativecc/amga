<script lang="ts">
  // Import any necessary dependencies
</script>

<header class="flex flex-col relative z-20">
  <div class="max-w-[1400px] mx-auto w-full">
<div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a href="/about">About</a></li>
        <li>
          <a href="/services">Services</a>
          <ul class="p-2">
            <li><a href="/services/consulting">Consulting</a></li>
            <li><a href="/services/development">Development</a></li>
          </ul>
        </li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
    <a href="/" class="btn btn-ghost p-0">
      <img src="/AMGA-Logo.svg" alt="AMGA Logo" class="h-8 w-auto" />
    </a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/about">About</a></li>
      <li>
        <details>
          <summary>Services</summary>
          <ul class="p-2">
            <li><a href="/services/consulting">Consulting</a></li>
            <li><a href="/services/development">Development</a></li>
          </ul>
        </details>
      </li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    <div class="flex items-center gap-4 mr-4">
      <a href="https://github.com/AMGA" class="text-xl hover:text-primary transition-colors" aria-label="GitHub">
        <i class="fa-brands fa-github"></i>
      </a>
      <a href="https://instagram.com/AMGA" class="text-xl hover:text-primary transition-colors" aria-label="Instagram">
        <i class="fa-brands fa-instagram"></i>
      </a>
      <a href="https://linkedin.com/company/AMGA" class="text-xl hover:text-primary transition-colors" aria-label="LinkedIn">
        <i class="fa-brands fa-linkedin"></i>
      </a>
    </div>
    <a href="/get-started" class="btn btn-primary">Get Started</a>
  </div>
</div>
</div>
</header>
