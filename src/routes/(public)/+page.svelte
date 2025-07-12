<script lang="ts">
  import type { PageServerData } from "./$types";

  let { data }: { data: PageServerData } = $props();

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function getReadingTime(summary: string | null) {
    if (!summary) return "3 min read";
    const words = summary.split(" ").length;
    const readingTime = Math.ceil(words / 200);
    return `${readingTime} min read`;
  }
</script>

<svelte:head>
  <title>Portfolio - Full Stack Developer & Creative Technologist</title>
  <meta
    name="description"
    content="Welcome to my digital portfolio. I'm a passionate full-stack developer creating innovative web applications and sharing insights through my blog. Explore my projects and thoughts on modern web development."
  />
  <meta
    name="keywords"
    content="full stack developer, web development, portfolio, blog, projects, SvelteKit, TypeScript, modern web apps"
  />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    content="Portfolio - Full Stack Developer & Creative Technologist"
  />
  <meta
    property="og:description"
    content="Welcome to my digital portfolio. I'm a passionate full-stack developer creating innovative web applications and sharing insights through my blog."
  />
  <meta property="og:url" content="/" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta
    property="twitter:title"
    content="Portfolio - Full Stack Developer & Creative Technologist"
  />
  <meta
    property="twitter:description"
    content="Welcome to my digital portfolio. I'm a passionate full-stack developer creating innovative web applications and sharing insights through my blog."
  />

  <!-- JSON-LD Structured Data -->
  {@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Portfolio Author",
			"jobTitle": "Full Stack Developer",
			"description": "Passionate full-stack developer creating innovative web applications",
			"url": "/",
			"sameAs": []
		}
	</script>`}
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- Hero Section -->
  <section
    class="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute inset-0"
        style="background-image: radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0); background-size: 40px 40px;"
      ></div>
    </div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-32"
    >
      <div class="text-center">
        <!-- Main Heading -->
        <h1
          class="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8"
        >
          <span class="block">Building the</span>
          <span
            class="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Future of Web
          </span>
        </h1>

        <!-- Subtitle -->
        <p
          class="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
        >
          I'm a passionate full-stack developer who crafts exceptional digital
          experiences. From concept to deployment, I bring ideas to life with
          modern technologies and creative solutions.
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <a
            href="#projects"
            class="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            View My Work
            <svg
              class="ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </a>
          <a
            href="/blog"
            class="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Read My Blog
            <svg
              class="ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </a>
        </div>

        <!-- Tech Stack Icons -->
        <div
          class="flex flex-wrap justify-center items-center gap-8 opacity-60"
        >
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">Go</span>
            </div>
            <span class="text-gray-600 font-medium">Golang</span>
          </div>
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">JS</span>
            </div>
            <span class="text-gray-600 font-medium">JavaScript</span>
          </div>
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">TS</span>
            </div>
            <span class="text-gray-600 font-medium">TypeScript</span>
          </div>
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">S</span>
            </div>
            <span class="text-gray-600 font-medium">Svelte</span>
          </div>
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">N</span>
            </div>
            <span class="text-gray-600 font-medium">Node.js</span>
          </div>
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">Py</span>
            </div>
            <span class="text-gray-600 font-medium">Python</span>
          </div>
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">php</span>
            </div>
            <span class="text-gray-600 font-medium">PHP</span>
          </div>
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-[#0288D8] rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">Pg</span>
            </div>
            <span class="text-gray-600 font-medium">Postgres</span>
          </div>
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-[#F8971A] rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">MS</span>
            </div>
            <span class="text-gray-600 font-medium">MySQL</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
    >
      <svg
        class="w-6 h-6 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        ></path>
      </svg>
    </div>
  </section>

  <!-- Featured Projects Section -->
  <section id="projects" class="py-20 lg:py-32 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Featured Projects
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A showcase of my recent work, featuring innovative solutions and
          cutting-edge technologies.
        </p>
      </div>

      {#if data.featuredProjects.length === 0}
        <div class="text-center py-16">
          <div
            class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-12 h-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">
            Projects Coming Soon
          </h3>
          <p class="text-gray-600">
            I'm currently working on some exciting projects that will be
            showcased here.
          </p>
        </div>
      {:else}
        <!-- Projects Grid -->
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {#each data.featuredProjects as project}
            <article
              class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200"
            >
              <div
                class="aspect-video overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
              >
                {#if project.image}
                  <img
                    src={project.image}
                    alt={project.name}
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                {:else}
                  <div class="w-full h-full flex items-center justify-center">
                    <svg
                      class="w-16 h-16 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      ></path>
                    </svg>
                  </div>
                {/if}
              </div>

              <div class="p-6">
                <h3
                  class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors"
                >
                  {project.name}
                </h3>

                {#if project.shortDescription}
                  <p class="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {project.shortDescription}
                  </p>
                {/if}

                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">
                    Updated {formatDate(project.updatedAt)}
                  </span>

                  {#if project.optionalLink}
                    <a
                      href={project.optionalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      View Project
                      <svg
                        class="ml-1 w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  {/if}
                </div>
              </div>
            </article>
          {/each}
        </div>

        <!-- View All Projects Link -->
        <div class="text-center mt-12">
          <a
            href="/projects"
            class="inline-flex items-center px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            View All Projects
            <svg
              class="ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>
      {/if}
    </div>
  </section>

  <!-- Latest Blog Posts Section -->
  <section class="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Latest Thoughts
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Insights, tutorials, and reflections on web development, technology,
          and the creative process.
        </p>
      </div>

      {#if data.recentBlogPosts.length === 0}
        <div class="text-center py-16">
          <div
            class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <svg
              class="w-12 h-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">
            Blog Posts Coming Soon
          </h3>
          <p class="text-gray-600">
            I'm working on some exciting content that will be published here.
          </p>
        </div>
      {:else}
        <!-- Blog Posts Grid -->
        <div class="grid gap-8 lg:grid-cols-3">
          {#each data.recentBlogPosts as post}
            <article
              class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <a href="/blog/{post.slug}" class="block">
                <div class="aspect-video overflow-hidden">
                  {#if post.featuredImage}
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  {:else}
                    <div
                      class="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center"
                    >
                      <svg
                        class="w-16 h-16 text-white opacity-80"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        ></path>
                      </svg>
                    </div>
                  {/if}
                </div>

                <div class="p-6">
                  <div class="flex items-center text-sm text-gray-500 mb-3">
                    <time datetime={post.updatedAt.toISOString()}>
                      {formatDate(post.updatedAt)}
                    </time>
                    <span class="mx-2">•</span>
                    <span>{getReadingTime(post.manualSummary)}</span>
                  </div>

                  <h3
                    class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2"
                  >
                    {post.title}
                  </h3>

                  {#if post.manualSummary}
                    <p class="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {post.manualSummary}
                    </p>
                  {/if}

                  <div
                    class="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors"
                  >
                    Read more
                    <svg
                      class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </div>
                </div>
              </a>
            </article>
          {/each}
        </div>

        <!-- View All Posts Link -->
        <div class="text-center mt-12">
          <a
            href="/blog"
            class="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            View All Posts
            <svg
              class="ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>
      {/if}
    </div>
  </section>

  <!-- Call to Action Section -->
  <section class="py-20 lg:py-32 bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
        Let's Build Something Amazing
      </h2>
      <p class="text-xl text-gray-300 leading-relaxed mb-12">
        Have a project in mind? I'd love to hear about it and discuss how we can
        bring your ideas to life.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="/contact"
          class="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Get In Touch
          <svg
            class="ml-2 w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
        </a>
        <a
          href="/resume"
          class="inline-flex items-center px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1"
        >
          View Resume
          <svg
            class="ml-2 w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  </section>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @keyframes bounce {
    0%,
    20%,
    53%,
    80%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    40%,
    43% {
      transform: translate3d(0, -8px, 0);
    }
    70% {
      transform: translate3d(0, -4px, 0);
    }
    90% {
      transform: translate3d(0, -2px, 0);
    }
  }

  .animate-bounce {
    animation: bounce 2s infinite;
  }
</style>
