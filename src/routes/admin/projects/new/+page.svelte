<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData, ActionData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>New Project - Portfolio Admin</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Navigation Header -->
	<nav class="bg-white shadow">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<a href="/admin/projects" class="text-sm text-gray-500 hover:text-gray-700 mr-4">
						← Back to Projects
					</a>
					<h1 class="text-xl font-semibold text-gray-900">New Project</h1>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
		<div class="px-4 py-6 sm:px-0">
			{#if form?.message}
				<div class="rounded-md bg-red-50 p-4 mb-6">
					<div class="text-sm text-red-700">
						{form.message}
					</div>
				</div>
			{/if}

			<div class="bg-white shadow sm:rounded-lg">
				<div class="px-4 py-5 sm:p-6">
					<form 
						method="post" 
						action="?/create" 
						enctype="multipart/form-data"
						use:enhance={() => {
							isSubmitting = true;
							return async ({ update }) => {
								await update();
								isSubmitting = false;
							};
						}}
					>
						<div class="space-y-6">
							<!-- Project Name -->
							<div>
								<label for="name" class="block text-sm font-medium text-gray-700">
									Project Name *
								</label>
								<input
									type="text"
									name="name"
									id="name"
									required
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="Enter project name"
								/>
							</div>

							<!-- Project Image -->
							<div>
								<label for="image" class="block text-sm font-medium text-gray-700">
									Project Image
								</label>
								<input
									type="file"
									name="image"
									id="image"
									accept="image/jpeg,image/jpg,image/png,image/webp"
									class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
								/>
								<p class="mt-1 text-xs text-gray-500">
									JPEG, PNG, or WebP. Maximum file size: 5MB.
								</p>
							</div>

							<!-- Short Description -->
							<div>
								<label for="shortDescription" class="block text-sm font-medium text-gray-700">
									Short Description
								</label>
								<textarea
									name="shortDescription"
									id="shortDescription"
									rows="3"
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="Brief description for project cards"
								></textarea>
							</div>

							<!-- Optional Link -->
							<div>
								<label for="optionalLink" class="block text-sm font-medium text-gray-700">
									Project Link
								</label>
								<input
									type="url"
									name="optionalLink"
									id="optionalLink"
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="https://example.com"
								/>
								<p class="mt-1 text-xs text-gray-500">
									Link to live project, GitHub repo, or case study.
								</p>
							</div>

							<!-- Full Description -->
							<div>
								<label for="fullDescription" class="block text-sm font-medium text-gray-700">
									Full Description
								</label>
								<textarea
									name="fullDescription"
									id="fullDescription"
									rows="6"
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="Detailed project description, challenges, solutions, etc."
								></textarea>
							</div>

							<!-- Extra Details -->
							<div>
								<label for="extraDetails" class="block text-sm font-medium text-gray-700">
									Extra Details
								</label>
								<textarea
									name="extraDetails"
									id="extraDetails"
									rows="4"
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="Technologies used, skills demonstrated, team size, duration, etc."
								></textarea>
								<p class="mt-1 text-xs text-gray-500">
									Additional information like tech stack, skills, timeline, etc.
								</p>
							</div>

							<!-- Status -->
							<div>
								<label for="status" class="block text-sm font-medium text-gray-700">
									Status *
								</label>
								<select
									name="status"
									id="status"
									required
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								>
									<option value="draft">Draft (not visible on public site)</option>
									<option value="published">Published (visible on public site)</option>
								</select>
							</div>
						</div>

						<!-- Form Actions -->
						<div class="mt-6 flex justify-end space-x-3">
							<a
								href="/admin/projects"
								class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Cancel
							</a>
							<button
								type="submit"
								disabled={isSubmitting}
								class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? 'Creating...' : 'Create Project'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</main>
</div>