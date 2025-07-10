<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData, ActionData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
	let isSubmitting = $state(false);
	let removeImage = $state(false);
</script>

<svelte:head>
	<title>Edit Project - Portfolio Admin</title>
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
					<h1 class="text-xl font-semibold text-gray-900">Edit Project</h1>
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
									value={data.project.name}
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="Enter project name"
								/>
							</div>

							<!-- Current Image Display -->
							{#if data.project.image && !removeImage}
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-2">
										Current Image
									</label>
									<div class="flex items-start space-x-4">
										<img
											src={data.project.image}
											alt={data.project.name}
											class="h-32 w-32 rounded-lg object-cover"
										/>
										<div class="flex-1">
											<button
												type="button"
												onclick={() => removeImage = true}
												class="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
											>
												Remove Image
											</button>
											<p class="mt-2 text-xs text-gray-500">
												Click "Remove Image" to delete the current image, or upload a new one below to replace it.
											</p>
										</div>
									</div>
								</div>
							{/if}

							{#if removeImage}
								<div class="rounded-md bg-yellow-50 p-4">
									<div class="flex">
										<div class="flex-shrink-0">
											<svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
												<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
											</svg>
										</div>
										<div class="ml-3">
											<h3 class="text-sm font-medium text-yellow-800">
												Image will be removed
											</h3>
											<div class="mt-2 text-sm text-yellow-700">
												<p>The current image will be permanently deleted when you save.</p>
											</div>
											<div class="mt-4">
												<button
													type="button"
													onclick={() => removeImage = false}
													class="text-sm font-medium text-yellow-800 hover:text-yellow-600"
												>
													Keep current image
												</button>
											</div>
										</div>
									</div>
								</div>
								<input type="hidden" name="removeImage" value="true" />
							{/if}

							<!-- Project Image Upload -->
							<div>
								<label for="image" class="block text-sm font-medium text-gray-700">
									{data.project.image && !removeImage ? 'Replace Image' : 'Project Image'}
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
									{data.project.image && !removeImage ? 'Uploading a new image will replace the current one.' : ''}
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
								>{data.project.shortDescription || ''}</textarea>
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
									value={data.project.optionalLink || ''}
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
								>{data.project.fullDescription || ''}</textarea>
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
								>{data.project.extraDetails || ''}</textarea>
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
									<option value="draft" selected={data.project.status === 'draft'}>
										Draft (not visible on public site)
									</option>
									<option value="published" selected={data.project.status === 'published'}>
										Published (visible on public site)
									</option>
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
								{isSubmitting ? 'Updating...' : 'Update Project'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</main>
</div>