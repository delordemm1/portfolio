<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData, ActionData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
	let isSubmitting = $state(false);
	let removeFeaturedImage = $state(false);
</script>

<svelte:head>
	<title>Edit Blog Post - Portfolio Admin</title>
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
					<h1 class="text-xl font-semibold text-gray-900">Edit Blog Post</h1>
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
						action="?/update" 
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
									value={data.post.title}
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
									value={data.post.slug}
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="url-friendly-slug"
								/>
								<p class="mt-1 text-xs text-gray-500">
									URL-friendly version of the title. Only lowercase letters, numbers, and hyphens allowed.
								</p>
							</div>

							<!-- Current Featured Image Display -->
							{#if data.post.featuredImage && !removeFeaturedImage}
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-2">
										Current Featured Image
									</label>
									<div class="flex items-start space-x-4">
										<img
											src={data.post.featuredImage}
											alt={data.post.title}
											class="h-32 w-32 rounded-lg object-cover"
										/>
										<div class="flex-1">
											<button
												type="button"
												onclick={() => removeFeaturedImage = true}
												class="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
											>
												Remove Featured Image
											</button>
											<p class="mt-2 text-xs text-gray-500">
												Click "Remove Featured Image" to delete the current image, or upload a new one below to replace it.
											</p>
										</div>
									</div>
								</div>
							{/if}

							{#if removeFeaturedImage}
								<div class="rounded-md bg-yellow-50 p-4">
									<div class="flex">
										<div class="flex-shrink-0">
											<svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
												<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
											</svg>
										</div>
										<div class="ml-3">
											<h3 class="text-sm font-medium text-yellow-800">
												Featured image will be removed
											</h3>
											<div class="mt-2 text-sm text-yellow-700">
												<p>The current featured image will be permanently deleted when you save.</p>
											</div>
											<div class="mt-4">
												<button
													type="button"
													onclick={() => removeFeaturedImage = false}
													class="text-sm font-medium text-yellow-800 hover:text-yellow-600"
												>
													Keep current featured image
												</button>
											</div>
										</div>
									</div>
								</div>
								<input type="hidden" name="removeFeaturedImage" value="true" />
							{/if}

							<!-- Featured Image Upload -->
							<div>
								<label for="featuredImage" class="block text-sm font-medium text-gray-700">
									{data.post.featuredImage && !removeFeaturedImage ? 'Replace Featured Image' : 'Featured Image'}
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
									{data.post.featuredImage && !removeFeaturedImage ? 'Uploading a new image will replace the current one.' : ''}
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
								>{data.post.manualSummary || ''}</textarea>
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
									<option value="draft" selected={data.post.status === 'draft'}>
										Draft (not visible on public site)
									</option>
									<option value="published" selected={data.post.status === 'published'}>
										Published (visible on public site)
									</option>
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
								{isSubmitting ? 'Updating...' : 'Update Blog Post'}
							</button>
						</div>
					</form>
				</div>
			</div>

			<!-- Block Editor Section -->
			<div class="bg-white shadow sm:rounded-lg mt-6">
				<div class="px-4 py-5 sm:p-6">
					<h3 class="text-lg font-medium text-gray-900 mb-4">Content Blocks</h3>
					<p class="text-sm text-gray-500 mb-6">
						The block-based editor will be implemented in the next phase. For now, you can manage the basic blog post information above.
					</p>
					
					{#if data.blocks.length > 0}
						<div class="space-y-4">
							{#each data.blocks as block}
								<div class="border border-gray-200 rounded-lg p-4">
									<div class="flex items-center justify-between mb-2">
										<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
											{block.type}
										</span>
										<span class="text-xs text-gray-500">Order: {block.order}</span>
									</div>
									<div class="text-sm text-gray-600">
										{JSON.stringify(JSON.parse(block.content), null, 2)}
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<div class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
							<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
							</svg>
							<h3 class="mt-2 text-sm font-medium text-gray-900">No content blocks</h3>
							<p class="mt-1 text-sm text-gray-500">Block editor coming soon!</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</main>
</div>