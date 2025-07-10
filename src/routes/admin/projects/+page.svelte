<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageServerData, ActionData } from "./$types";

  let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<svelte:head>
  <title>Manage Projects - Portfolio Admin</title>
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
          <h1 class="text-xl font-semibold text-gray-900">Manage Projects</h1>
        </div>
        <div class="flex items-center">
          <a
            href="/admin/projects/new"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            New Project
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

      <!-- Projects Table -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-lg font-medium text-gray-900">All Projects</h2>
          <p class="mt-1 text-sm text-gray-500">
            Manage your portfolio projects. Only published projects will appear
            on the public site.
          </p>
        </div>

        {#if data.projects.length === 0}
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No projects</h3>
            <p class="mt-1 text-sm text-gray-500">
              Get started by creating your first project.
            </p>
            <div class="mt-6">
              <a
                href="/admin/projects/new"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                New Project
              </a>
            </div>
          </div>
        {:else}
          <ul class="divide-y divide-gray-200">
            {#each data.projects as project}
              <li class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    {#if project.image}
                      <img
                        src={project.image}
                        alt={project.name}
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
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                    {/if}
                    <div>
                      <h3 class="text-lg font-medium text-gray-900">
                        {project.name}
                      </h3>
                      <p class="text-sm text-gray-500 max-w-md">
                        {project.shortDescription || "No description"}
                      </p>
                      <div class="flex items-center mt-1">
                        <span
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {project.status ===
                          'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'}"
                        >
                          {project.status}
                        </span>
                        <span class="text-xs text-gray-400 ml-2">
                          Updated {new Date(
                            project.updatedAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <a
                      href="/admin/projects/{project.id}"
                      class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Edit
                    </a>
                    <form method="post" action="?/delete" use:enhance>
                      <input type="hidden" name="id" value={project.id} />
                      <button
                        type="submit"
                        onclick={() => {
                          return confirm(
                            "Are you sure you want to delete this project? This action cannot be undone."
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
