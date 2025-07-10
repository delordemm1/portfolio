<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData, ActionData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
	let isSubmitting = $state(false);
	let title = $state('');
	let slug = $state('');

	// Auto-generate slug from title
	function generateSlug(title: string) {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.trim();
	}

	function onTitleChange() {
		if (!slug || slug === generateSlug(title)) {
			slug = generateSlug(title);
		}
	}
</script>

<svelte:head>
	<title>New Blog Post - Portfolio Admin</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Navigation Header -->
	<nav class="bg-white shadow">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<a href="/admin/blog" class="text-sm text-gray-500 hover:text-gray-700 mr-4">
						← Back to Blog Posts
					</a>
					<h1 class="text-xl font-semibold text-gray-900">New Blog Post</h1>
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
							<!-- Blog Post Title -->
							<div>
								<label for="title" class="block text-sm font-medium text-gray-700">
									Title *
								</label>
								<input
									type="text"
									name="title"
									id="title"
									required
									bind:value={title}
									oninput={onTitleChange}
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="Enter blog post title"
								/>
							</div>

							<!-- Blog Post Slug -->
							<div>
								<label for="slug" class="block text-sm font-medium text-gray-700">
									Slug *
								</label>
								<input
									type="text"
									name="slug"
									id="slug"
									required
									bind:value={slug}
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="url-friendly-slug"
								/>
								<p class="mt-1 text-xs text-gray-500">
									URL-friendly version of the title. Only lowercase letters, numbers, and hyphens allowed.
								</p>
							</div>

							<!-- Featured Image -->
							<div>
								<label for="featuredImage" class="block text-sm font-medium text-gray-700">
									Featured Image
								</label>
								<input
									type="file"
									name="featuredImage"
									id="featuredImage"
									accept="image/jpeg,image/jpg,image/png,image/webp"
									class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
								/>
								<p class="mt-1 text-xs text-gray-500">
									JPEG, PNG, or WebP. Maximum file size: 5MB.
								</p>
							</div>

							<!-- Manual Summary -->
							<div>
								<label for="manualSummary" class="block text-sm font-medium text-gray-700">
									Summary
								</label>
								<textarea
									name="manualSummary"
									id="manualSummary"
									rows="4"
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="Brief summary of the blog post"
								></textarea>
								<p class="mt-1 text-xs text-gray-500">
									A brief description that will appear in blog post listings and meta tags.
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
								href="/admin/blog"
								class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Cancel
							</a>
							<button
								type="submit"
								disabled={isSubmitting}
								class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? 'Creating...' : 'Create Blog Post'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</main>
</div>