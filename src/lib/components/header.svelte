<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/state";

  let y = $state(0);
  let mobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMenu() {
    mobileMenuOpen = false;
  }
  $effect(() => {
    if (browser) {
      document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    }
  });
</script>

<svelte:window bind:scrollY={y} />

<header
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
  class:bg-white={y > 50 || mobileMenuOpen}
  class:shadow-md={y > 50 || mobileMenuOpen}
  class:backdrop-blur-lg={y > 50 || mobileMenuOpen}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      <div class="flex-shrink-0">
        <a
          href="/"
          onclick={closeMenu}
          class="text-3xl font-extrabold font-sans block bg-gradient-to-r from-blue-600 via-purple-800 to-indigo-600 bg-clip-text text-transparent transition-colors hover:bg-indigo-600"
        >
          DevEmm
        </a>
      </div>

      <nav class="hidden md:flex items-center space-x-8">
        <a
          href={page.url.pathname === "/"? "#projects" : "/projects"}
          class="font-medium text-gray-600 hover:text-gray-900 transition-colors"
          class:text-blue-600={page.url.hash === "#projects" || page.url.pathname === "/projects"}>Projects</a
        >
        <a
          href="/blog"
          class="font-medium text-gray-600 hover:text-gray-900 transition-colors"
          class:text-blue-600={page.url.pathname === "/blog"}>Blog</a
        >
        <a
          href="/resume"
          class="font-medium text-gray-600 hover:text-gray-900 transition-colors"
          class:text-blue-600={page.url.pathname === "/resume"}>Resume</a
        >
        <a
          href="/contact"
          class="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Get In Touch
        </a>
      </nav>

      <div class="md:hidden flex items-center">
        <button
          onclick={toggleMobileMenu}
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-expanded={mobileMenuOpen}
        >
          <span class="sr-only">Open main menu</span>
          {#if !mobileMenuOpen}
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          {:else}
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>

  {#if mobileMenuOpen}
    <div class="md:hidden absolute top-20 left-0 w-full h-screen bg-white">
      <div
        class="flex flex-col items-center justify-center text-center pt-16 space-y-8"
      >
        <a
          href={"/#projects"}
          onclick={closeMenu}
          class="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >Projects</a
        >
        <a
          href="/blog"
          onclick={closeMenu}
          class="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >Blog</a
        >
        <a
          href="/resume"
          onclick={closeMenu}
          class="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >Resume</a
        >
        <a
          href="/contact"
          onclick={closeMenu}
          class="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Get In Touch
        </a>
      </div>
    </div>
  {/if}
</header>
