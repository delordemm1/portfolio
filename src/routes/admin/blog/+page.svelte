<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageServerData, ActionData } from "./$types";

  let { data, form }: { data: PageServerData; form: ActionData } = $props();

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
</script>

<svelte:head>
  <title>Manage Blog Posts - Portfolio Admin</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Navigation Header -->
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <a
            href="/admin/dashboard"
            class="text-sm text-gray-500 hover:text-gray-700 mr-4"
          >
            ← Back to Dashboard
          </a>
          <h1 class="text-xl font-semibold text-gray-900">Manage Blog Posts</h1>
        </div>
        <div class="flex items-center">
          <a
            href="/admin/blog/new"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            New Blog Post
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      {#if form?.success}
        <div class="rounded-md bg-green-50 p-4 mb-6">
          <div class="text-sm text-green-700">
            {form.message}
          </div>
        </div>
      {/if}

      {#if form?.message && !form?.success}
        <div class="rounded-md bg-red-50 p-4 mb-6">
          <div class="text-sm text-red-700">
            {form.message}
          </div>
        </div>
      {/if}

      <!-- Blog Posts Table -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-lg font-medium text-gray-900">All Blog Posts</h2>
          <p class="mt-1 text-sm text-gray-500">
            Manage your blog posts. Only published posts will appear on the
            public site.
          </p>
        </div>

        {#if data.blogPosts.length === 0}
          <div class="text-center py-12">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
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
            <h3 class="mt-2 text-sm font-medium text-gray-900">
              No blog posts
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Get started by creating your first blog post.
            </p>
            <div class="mt-6">
              <a
                href="/admin/blog/new"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                New Blog Post
              </a>
            </div>
          </div>
        {:else}
          <ul class="divide-y divide-gray-200">
            {#each data.blogPosts as post}
              <li class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    {#if post.featuredImage}
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        class="h-16 w-16 rounded-lg object-cover mr-4"
                      />
                    {:else}
                      <div
                        class="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center mr-4"
                      >
                        <svg
                          class="h-8 w-8 text-gray-400"
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
                      </div>
                    {/if}
                    <div>
                      <h3 class="text-lg font-medium text-gray-900">
                        {post.title}
                      </h3>
                      <p class="text-sm text-gray-500 max-w-md">
                        {post.manualSummary || "No summary"}
                      </p>
                      <div class="flex items-center mt-1">
                        <span
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {post.status ===
                          'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'}"
                        >
                          {post.status}
                        </span>
                        <span class="text-xs text-gray-400 ml-2">
                          Updated {formatDate(post.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <a
                      href="/admin/blog/{post.id}"
                      class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Edit
                    </a>
                    <form method="post" action="?/delete" use:enhance>
                      <input type="hidden" name="id" value={post.id} />
                      <button
                        type="submit"
                        onclick={() => {
                          return confirm(
                            "Are you sure you want to delete this blog post? This action cannot be undone."
                          );
                        }}
                        class="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </main>
</div>
