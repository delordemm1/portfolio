<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import type { PageServerData } from "./$types";

  let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<svelte:head>
  <title>Admin Login - Portfolio</title>
</svelte:head>

<div
  class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
>
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Admin Panel
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      {data.allowRegistration
        ? "Create your admin account or sign in"
        : "Sign in to manage your portfolio"}
    </p>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" method="post" action="?/login" use:enhance>
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">
            Username
          </label>
          <div class="mt-1">
            <input
              id="username"
              name="username"
              type="text"
              autocomplete="username"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {#if form?.message}
          <div class="rounded-md bg-red-50 p-4">
            <div class="text-sm text-red-700">
              {form.message}
            </div>
          </div>
        {/if}

        <div class="flex {data.allowRegistration ? ' flex-col space-y-4' : ''}">
          <button
            type="submit"
            class="{data.allowRegistration
              ? 'flex-1'
              : 'w-full'} flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
          {#if data.allowRegistration}
            <button
              type="submit"
              formaction="?/register"
              class="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Admin Account
            </button>
          {/if}
        </div>
      </form>

      {#if data.allowRegistration}
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">First time setup</span>
            </div>
          </div>
          <div class="mt-4 text-center">
            <p class="text-xs text-gray-600">
              No admin account exists yet. Create the first admin account to get
              started.
            </p>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
