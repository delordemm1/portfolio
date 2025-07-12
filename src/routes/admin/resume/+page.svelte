<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData, ActionData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
	
	let isSubmitting = $state(false);
	let showAddExperience = $state(false);
	let showAddEducation = $state(false);
	let showAddSkill = $state(false);
	let showAddSocialLink = $state(false);
	let editingExperience = $state<string | null>(null);
	let editingEducation = $state<string | null>(null);
	let editingSkill = $state<string | null>(null);
	let editingSocialLink = $state<string | null>(null);

	function formatDate(dateString: string | null) {
		if (!dateString) return '';
		return dateString;
	}

	function resetForms() {
		showAddExperience = false;
		showAddEducation = false;
		showAddSkill = false;
		showAddSocialLink = false;
		editingExperience = null;
		editingEducation = null;
		editingSkill = null;
		editingSocialLink = null;
	}

	// Reset forms when form action succeeds
	$effect(() => {
		if (form?.success) {
			resetForms();
		}
	});
</script>

<svelte:head>
	<title>Resume Management - Portfolio Admin</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Navigation Header -->
	<nav class="bg-white shadow">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<a href="/admin/dashboard" class="text-sm text-gray-500 hover:text-gray-700 mr-4">
						← Back to Dashboard
					</a>
					<h1 class="text-xl font-semibold text-gray-900">Resume Management</h1>
				</div>
				<div class="flex items-center">
					<a
						href="/resume"
						target="_blank"
						class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
					>
						Preview Resume
					</a>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
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

			<!-- Basic Information -->
			<div class="bg-white shadow sm:rounded-lg mb-6">
				<div class="px-4 py-5 sm:p-6">
					<h2 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
					<form
						method="post"
						action="?/updateResume"
						use:enhance={() => {
							isSubmitting = true;
							return async ({ update }) => {
								await update();
								isSubmitting = false;
							};
						}}
					>
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div>
								<label for="fullName" class="block text-sm font-medium text-gray-700">
									Full Name *
								</label>
								<input
									type="text"
									name="fullName"
									id="fullName"
									required
									value={data.resume?.fullName || ''}
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>

							<div>
								<label for="title" class="block text-sm font-medium text-gray-700">
									Professional Title *
								</label>
								<input
									type="text"
									name="title"
									id="title"
									required
									value={data.resume?.title || ''}
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>

							<div>
								<label for="email" class="block text-sm font-medium text-gray-700">
									Email *
								</label>
								<input
									type="email"
									name="email"
									id="email"
									required
									value={data.resume?.email || ''}
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>

							<div>
								<label for="phone" class="block text-sm font-medium text-gray-700">
									Phone
								</label>
								<input
									type="tel"
									name="phone"
									id="phone"
									value={data.resume?.phone || ''}
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>

							<div>
								<label for="location" class="block text-sm font-medium text-gray-700">
									Location
								</label>
								<input
									type="text"
									name="location"
									id="location"
									value={data.resume?.location || ''}
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>

							<div>
								<label for="website" class="block text-sm font-medium text-gray-700">
									Website
								</label>
								<input
									type="url"
									name="website"
									id="website"
									value={data.resume?.website || ''}
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>

							<div class="sm:col-span-2">
								<label for="summary" class="block text-sm font-medium text-gray-700">
									Professional Summary
								</label>
								<textarea
									name="summary"
									id="summary"
									rows="4"
									class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="Brief professional summary..."
								>{data.resume?.summary || ''}</textarea>
							</div>
						</div>

						<div class="mt-6">
							<button
								type="submit"
								disabled={isSubmitting}
								class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
							>
								{isSubmitting ? 'Saving...' : 'Save Basic Information'}
							</button>
						</div>
					</form>
				</div>
			</div>

			<!-- Professional Experience -->
			<div class="bg-white shadow sm:rounded-lg mb-6">
				<div class="px-4 py-5 sm:p-6">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-medium text-gray-900">Professional Experience</h2>
						<button
							type="button"
							onclick={() => showAddExperience = !showAddExperience}
							class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
						>
							{showAddExperience ? 'Cancel' : 'Add Experience'}
						</button>
					</div>

					{#if showAddExperience}
						<form method="post" action="?/addExperience" use:enhance class="mb-6 p-4 border border-gray-200 rounded-lg">
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div>
									<label class="block text-sm font-medium text-gray-700">Company *</label>
									<input
										type="text"
										name="company"
										required
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700">Position *</label>
									<input
										type="text"
										name="position"
										required
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700">Start Date *</label>
									<input
										type="date"
										name="startDate"
										required
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700">End Date</label>
									<input
										type="date"
										name="endDate"
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
									<p class="text-xs text-gray-500 mt-1">Leave empty if current position</p>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700">Location</label>
									<input
										type="text"
										name="location"
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
								<div class="sm:col-span-2">
									<label class="block text-sm font-medium text-gray-700">Description</label>
									<textarea
										name="description"
										rows="3"
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									></textarea>
								</div>
							</div>
							<div class="mt-4">
								<button
									type="submit"
									class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
								>
									Add Experience
								</button>
							</div>
						</form>
					{/if}

					<div class="space-y-4">
						{#each data.experiences as experience}
							<div class="border border-gray-200 rounded-lg p-4">
								{#if editingExperience === experience.id}
									<form method="post" action="?/updateExperience" use:enhance>
										<input type="hidden" name="id" value={experience.id} />
										<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
											<div>
												<label class="block text-sm font-medium text-gray-700">Company *</label>
												<input
													type="text"
													name="company"
													required
													value={experience.company}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
											<div>
												<label class="block text-sm font-medium text-gray-700">Position *</label>
												<input
													type="text"
													name="position"
													required
													value={experience.position}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
											<div>
												<label class="block text-sm font-medium text-gray-700">Start Date *</label>
												<input
													type="date"
													name="startDate"
													required
													value={formatDate(experience.startDate)}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
											<div>
												<label class="block text-sm font-medium text-gray-700">End Date</label>
												<input
													type="date"
													name="endDate"
													value={formatDate(experience.endDate)}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
											<div>
												<label class="block text-sm font-medium text-gray-700">Location</label>
												<input
													type="text"
													name="location"
													value={experience.location || ''}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
											<div class="sm:col-span-2">
												<label class="block text-sm font-medium text-gray-700">Description</label>
												<textarea
													name="description"
													rows="3"
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												>{experience.description || ''}</textarea>
											</div>
										</div>
										<div class="mt-4 flex space-x-2">
											<button
												type="submit"
												class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
											>
												Save
											</button>
											<button
												type="button"
												onclick={() => editingExperience = null}
												class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
											>
												Cancel
											</button>
										</div>
									</form>
								{:else}
									<div class="flex justify-between items-start">
										<div>
											<h3 class="text-lg font-medium text-gray-900">{experience.position}</h3>
											<p class="text-blue-600 font-medium">{experience.company}</p>
											{#if experience.location}
												<p class="text-gray-600">{experience.location}</p>
											{/if}
											<p class="text-gray-500 text-sm">
												{experience.startDate} - {experience.endDate || 'Present'}
											</p>
											{#if experience.description}
												<p class="text-gray-700 mt-2">{experience.description}</p>
											{/if}
										</div>
										<div class="flex space-x-2">
											<button
												type="button"
												onclick={() => editingExperience = experience.id}
												class="text-blue-600 hover:text-blue-800 text-sm"
											>
												Edit
											</button>
											<form method="post" action="?/deleteExperience" use:enhance class="inline">
												<input type="hidden" name="id" value={experience.id} />
												<button
													type="submit"
													onclick={() => confirm('Are you sure you want to delete this experience?')}
													class="text-red-600 hover:text-red-800 text-sm"
												>
													Delete
												</button>
											</form>
										</div>
									</div>
								{/if}
							</div>
						{/each}

						{#if data.experiences.length === 0}
							<p class="text-gray-500 text-center py-4">No experience entries yet. Add your first one above.</p>
						{/if}
					</div>
				</div>
			</div>

			<!-- Education -->
			<div class="bg-white shadow sm:rounded-lg mb-6">
				<div class="px-4 py-5 sm:p-6">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-medium text-gray-900">Education</h2>
						<button
							type="button"
							onclick={() => showAddEducation = !showAddEducation}
							class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
						>
							{showAddEducation ? 'Cancel' : 'Add Education'}
						</button>
					</div>

					{#if showAddEducation}
						<form method="post" action="?/addEducation" use:enhance class="mb-6 p-4 border border-gray-200 rounded-lg">
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div>
									<label class="block text-sm font-medium text-gray-700">Institution *</label>
									<input
										type="text"
										name="institution"
										required
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700">Degree *</label>
									<input
										type="text"
										name="degree"
										required
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700">Field of Study</label>
									<input
										type="text"
										name="field"
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700">GPA</label>
									<input
										type="text"
										name="gpa"
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700">Start Date *</label>
									<input
										type="date"
										name="startDate"
										required
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700">End Date</label>
									<input
										type="date"
										name="endDate"
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
								<div class="sm:col-span-2">
									<label class="block text-sm font-medium text-gray-700">Description</label>
									<textarea
										name="description"
										rows="3"
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									></textarea>
								</div>
							</div>
							<div class="mt-4">
								<button
									type="submit"
									class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
								>
									Add Education
								</button>
							</div>
						</form>
					{/if}

					<div class="space-y-4">
						{#each data.education as edu}
							<div class="border border-gray-200 rounded-lg p-4">
								{#if editingEducation === edu.id}
									<form method="post" action="?/updateEducation" use:enhance>
										<input type="hidden" name="id" value={edu.id} />
										<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
											<div>
												<label class="block text-sm font-medium text-gray-700">Institution *</label>
												<input
													type="text"
													name="institution"
													required
													value={edu.institution}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
											<div>
												<label class="block text-sm font-medium text-gray-700">Degree *</label>
												<input
													type="text"
													name="degree"
													required
													value={edu.degree}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
											<div>
												<label class="block text-sm font-medium text-gray-700">Field of Study</label>
												<input
													type="text"
													name="field"
													value={edu.field || ''}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
											<div>
												<label class="block text-sm font-medium text-gray-700">GPA</label>
												<input
													type="text"
													name="gpa"
													value={edu.gpa || ''}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
											<div>
												<label class="block text-sm font-medium text-gray-700">Start Date *</label>
												<input
													type="date"
													name="startDate"
													required
													value={formatDate(edu.startDate)}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
											<div>
												<label class="block text-sm font-medium text-gray-700">End Date</label>
												<input
													type="date"
													name="endDate"
													value={formatDate(edu.endDate)}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
											<div class="sm:col-span-2">
												<label class="block text-sm font-medium text-gray-700">Description</label>
												<textarea
													name="description"
													rows="3"
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												>{edu.description || ''}</textarea>
											</div>
										</div>
										<div class="mt-4 flex space-x-2">
											<button
												type="submit"
												class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
											>
												Save
											</button>
											<button
												type="button"
												onclick={() => editingEducation = null}
												class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
											>
												Cancel
											</button>
										</div>
									</form>
								{:else}
									<div class="flex justify-between items-start">
										<div>
											<h3 class="text-lg font-medium text-gray-900">{edu.degree}</h3>
											{#if edu.field}
												<p class="text-gray-700">{edu.field}</p>
											{/if}
											<p class="text-blue-600 font-medium">{edu.institution}</p>
											<p class="text-gray-500 text-sm">
												{edu.startDate} - {edu.endDate || 'Present'}
											</p>
											{#if edu.gpa}
												<p class="text-gray-600 text-sm">GPA: {edu.gpa}</p>
											{/if}
											{#if edu.description}
												<p class="text-gray-700 mt-2">{edu.description}</p>
											{/if}
										</div>
										<div class="flex space-x-2">
											<button
												type="button"
												onclick={() => editingEducation = edu.id}
												class="text-blue-600 hover:text-blue-800 text-sm"
											>
												Edit
											</button>
											<form method="post" action="?/deleteEducation" use:enhance class="inline">
												<input type="hidden" name="id" value={edu.id} />
												<button
													type="submit"
													onclick={() => confirm('Are you sure you want to delete this education entry?')}
													class="text-red-600 hover:text-red-800 text-sm"
												>
													Delete
												</button>
											</form>
										</div>
									</div>
								{/if}
							</div>
						{/each}

						{#if data.education.length === 0}
							<p class="text-gray-500 text-center py-4">No education entries yet. Add your first one above.</p>
						{/if}
					</div>
				</div>
			</div>

			<!-- Skills -->
			<div class="bg-white shadow sm:rounded-lg mb-6">
				<div class="px-4 py-5 sm:p-6">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-medium text-gray-900">Skills</h2>
						<button
							type="button"
							onclick={() => showAddSkill = !showAddSkill}
							class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
						>
							{showAddSkill ? 'Cancel' : 'Add Skill'}
						</button>
					</div>

					{#if showAddSkill}
						<form method="post" action="?/addSkill" use:enhance class="mb-6 p-4 border border-gray-200 rounded-lg">
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
								<div>
									<label class="block text-sm font-medium text-gray-700">Skill Name *</label>
									<input
										type="text"
										name="name"
										required
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700">Category *</label>
									<select
										name="category"
										required
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									>
										<option value="">Select category</option>
										<option value="technical">Technical</option>
										<option value="soft">Soft Skills</option>
										<option value="language">Languages</option>
										<option value="tools">Tools</option>
										<option value="frameworks">Frameworks</option>
									</select>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700">Level</label>
									<select
										name="level"
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									>
										<option value="">Select level</option>
										<option value="beginner">Beginner</option>
										<option value="intermediate">Intermediate</option>
										<option value="advanced">Advanced</option>
										<option value="expert">Expert</option>
									</select>
								</div>
							</div>
							<div class="mt-4">
								<button
									type="submit"
									class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
								>
									Add Skill
								</button>
							</div>
						</form>
					{/if}

					<div class="space-y-4">
						{#each data.skills as skill}
							<div class="border border-gray-200 rounded-lg p-4">
								{#if editingSkill === skill.id}
									<form method="post" action="?/updateSkill" use:enhance>
										<input type="hidden" name="id" value={skill.id} />
										<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
											<div>
												<label class="block text-sm font-medium text-gray-700">Skill Name *</label>
												<input
													type="text"
													name="name"
													required
													value={skill.name}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
											<div>
												<label class="block text-sm font-medium text-gray-700">Category *</label>
												<select
													name="category"
													required
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												>
													<option value="technical" selected={skill.category === 'technical'}>Technical</option>
													<option value="soft" selected={skill.category === 'soft'}>Soft Skills</option>
													<option value="language" selected={skill.category === 'language'}>Languages</option>
													<option value="tools" selected={skill.category === 'tools'}>Tools</option>
													<option value="frameworks" selected={skill.category === 'frameworks'}>Frameworks</option>
												</select>
											</div>
											<div>
												<label class="block text-sm font-medium text-gray-700">Level</label>
												<select
													name="level"
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												>
													<option value="">Select level</option>
													<option value="beginner" selected={skill.level === 'beginner'}>Beginner</option>
													<option value="intermediate" selected={skill.level === 'intermediate'}>Intermediate</option>
													<option value="advanced" selected={skill.level === 'advanced'}>Advanced</option>
													<option value="expert" selected={skill.level === 'expert'}>Expert</option>
												</select>
											</div>
										</div>
										<div class="mt-4 flex space-x-2">
											<button
												type="submit"
												class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
											>
												Save
											</button>
											<button
												type="button"
												onclick={() => editingSkill = null}
												class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
											>
												Cancel
											</button>
										</div>
									</form>
								{:else}
									<div class="flex justify-between items-center">
										<div>
											<h3 class="text-lg font-medium text-gray-900">{skill.name}</h3>
											<p class="text-gray-600 capitalize">{skill.category.replace('_', ' ')}</p>
											{#if skill.level}
												<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
													{skill.level}
												</span>
											{/if}
										</div>
										<div class="flex space-x-2">
											<button
												type="button"
												onclick={() => editingSkill = skill.id}
												class="text-blue-600 hover:text-blue-800 text-sm"
											>
												Edit
											</button>
											<form method="post" action="?/deleteSkill" use:enhance class="inline">
												<input type="hidden" name="id" value={skill.id} />
												<button
													type="submit"
													onclick={() => confirm('Are you sure you want to delete this skill?')}
													class="text-red-600 hover:text-red-800 text-sm"
												>
													Delete
												</button>
											</form>
										</div>
									</div>
								{/if}
							</div>
						{/each}

						{#if data.skills.length === 0}
							<p class="text-gray-500 text-center py-4">No skills yet. Add your first one above.</p>
						{/if}
					</div>
				</div>
			</div>

			<!-- Social Links -->
			<div class="bg-white shadow sm:rounded-lg mb-6">
				<div class="px-4 py-5 sm:p-6">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-medium text-gray-900">Social Links</h2>
						<button
							type="button"
							onclick={() => showAddSocialLink = !showAddSocialLink}
							class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
						>
							{showAddSocialLink ? 'Cancel' : 'Add Social Link'}
						</button>
					</div>

					{#if showAddSocialLink}
						<form method="post" action="?/addSocialLink" use:enhance class="mb-6 p-4 border border-gray-200 rounded-lg">
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div>
									<label class="block text-sm font-medium text-gray-700">Platform *</label>
									<select
										name="platform"
										required
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									>
										<option value="">Select platform</option>
										<option value="linkedin">LinkedIn</option>
										<option value="github">GitHub</option>
										<option value="twitter">Twitter</option>
										<option value="instagram">Instagram</option>
										<option value="facebook">Facebook</option>
										<option value="youtube">YouTube</option>
										<option value="portfolio">Portfolio</option>
										<option value="website">Personal Website</option>
									</select>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700">URL *</label>
									<input
										type="url"
										name="url"
										required
										placeholder="https://..."
										class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									/>
								</div>
							</div>
							<div class="mt-4">
								<button
									type="submit"
									class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
								>
									Add Social Link
								</button>
							</div>
						</form>
					{/if}

					<div class="space-y-4">
						{#each data.socialLinks as link}
							<div class="border border-gray-200 rounded-lg p-4">
								{#if editingSocialLink === link.id}
									<form method="post" action="?/updateSocialLink" use:enhance>
										<input type="hidden" name="id" value={link.id} />
										<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
											<div>
												<label class="block text-sm font-medium text-gray-700">Platform *</label>
												<select
													name="platform"
													required
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												>
													<option value="linkedin" selected={link.platform === 'linkedin'}>LinkedIn</option>
													<option value="github" selected={link.platform === 'github'}>GitHub</option>
													<option value="twitter" selected={link.platform === 'twitter'}>Twitter</option>
													<option value="instagram" selected={link.platform === 'instagram'}>Instagram</option>
													<option value="facebook" selected={link.platform === 'facebook'}>Facebook</option>
													<option value="youtube" selected={link.platform === 'youtube'}>YouTube</option>
													<option value="website" selected={link.platform === 'portfolio'}>Portfolio</option>
													<option value="website" selected={link.platform === 'website'}>Personal Website</option>
												</select>
											</div>
											<div>
												<label class="block text-sm font-medium text-gray-700">URL *</label>
												<input
													type="url"
													name="url"
													required
													value={link.url}
													class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
												/>
											</div>
										</div>
										<div class="mt-4 flex space-x-2">
											<button
												type="submit"
												class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
											>
												Save
											</button>
											<button
												type="button"
												onclick={() => editingSocialLink = null}
												class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
											>
												Cancel
											</button>
										</div>
									</form>
								{:else}
									<div class="flex justify-between items-center">
										<div>
											<h3 class="text-lg font-medium text-gray-900 capitalize">{link.platform}</h3>
											<a href={link.url} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 break-all">
												{link.url}
											</a>
										</div>
										<div class="flex space-x-2">
											<button
												type="button"
												onclick={() => editingSocialLink = link.id}
												class="text-blue-600 hover:text-blue-800 text-sm"
											>
												Edit
											</button>
											<form method="post" action="?/deleteSocialLink" use:enhance class="inline">
												<input type="hidden" name="id" value={link.id} />
												<button
													type="submit"
													onclick={() => confirm('Are you sure you want to delete this social link?')}
													class="text-red-600 hover:text-red-800 text-sm"
												>
													Delete
												</button>
											</form>
										</div>
									</div>
								{/if}
							</div>
						{/each}

						{#if data.socialLinks.length === 0}
							<p class="text-gray-500 text-center py-4">No social links yet. Add your first one above.</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</main>
</div>