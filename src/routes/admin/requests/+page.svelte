<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData, ActionData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
	let selectedTab = $state<'contact' | 'feedback'>('contact');
	let expandedContact = $state<string | null>(null);
	let expandedFeedback = $state<string | null>(null);

	function formatDate(date: Date) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getRatingStars(rating: number) {
		return '★'.repeat(rating) + '☆'.repeat(5 - rating);
	}

	function toggleContactExpanded(id: string) {
		expandedContact = expandedContact === id ? null : id;
	}

	function toggleFeedbackExpanded(id: string) {
		expandedFeedback = expandedFeedback === id ? null : id;
	}
</script>

<svelte:head>
	<title>Request Management - Portfolio Admin</title>
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
					<h1 class="text-xl font-semibold text-gray-900">Request Management</h1>
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

			<!-- Tab Navigation -->
			<div class="bg-white shadow sm:rounded-lg mb-6">
				<div class="border-b border-gray-200">
					<nav class="-mb-px flex">
						<button
							type="button"
							onclick={() => selectedTab = 'contact'}
							class="w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm {selectedTab === 'contact' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
						>
							Contact Submissions ({data.contactSubmissions.length})
						</button>
						<button
							type="button"
							onclick={() => selectedTab = 'feedback'}
							class="w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm {selectedTab === 'feedback' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
						>
							Client Feedback ({data.feedbackSubmissions.length})
						</button>
					</nav>
				</div>

				<!-- Contact Submissions Tab -->
				{#if selectedTab === 'contact'}
					<div class="p-6">
						<h2 class="text-lg font-medium text-gray-900 mb-4">Contact Form Submissions</h2>
						
						{#if data.contactSubmissions.length === 0}
							<div class="text-center py-12">
								<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
								</svg>
								<h3 class="mt-2 text-sm font-medium text-gray-900">No contact submissions</h3>
								<p class="mt-1 text-sm text-gray-500">No one has submitted the contact form yet.</p>
							</div>
						{:else}
							<div class="space-y-4">
								{#each data.contactSubmissions as submission}
									<div class="border border-gray-200 rounded-lg">
										<div class="p-4">
											<div class="flex items-center justify-between">
												<div class="flex-1">
													<div class="flex items-center space-x-4">
														<h3 class="text-lg font-medium text-gray-900">{submission.name}</h3>
														{#if submission.company}
															<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
																{submission.company}
															</span>
														{/if}
														{#if submission.budget}
															<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
																{submission.budget}
															</span>
														{/if}
													</div>
													<p class="text-sm text-gray-600 mt-1">{submission.email}</p>
													<p class="text-sm font-medium text-gray-900 mt-1">{submission.subject}</p>
													<p class="text-xs text-gray-500 mt-1">Submitted {formatDate(submission.createdAt)}</p>
												</div>
												<div class="flex items-center space-x-2">
													<button
														type="button"
														onclick={() => toggleContactExpanded(submission.id)}
														class="text-blue-600 hover:text-blue-800 text-sm font-medium"
													>
														{expandedContact === submission.id ? 'Hide Details' : 'View Details'}
													</button>
													<form method="post" action="?/deleteContact" use:enhance class="inline">
														<input type="hidden" name="id" value={submission.id} />
														<button
															type="submit"
															onclick={() => confirm('Are you sure you want to delete this contact submission?')}
															class="text-red-600 hover:text-red-800 text-sm font-medium"
														>
															Delete
														</button>
													</form>
												</div>
											</div>
											
											{#if expandedContact === submission.id}
												<div class="mt-4 pt-4 border-t border-gray-200">
													<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
														{#if submission.timeline}
															<div>
																<h4 class="text-sm font-medium text-gray-900">Timeline</h4>
																<p class="text-sm text-gray-600">{submission.timeline}</p>
															</div>
														{/if}
													</div>
													<div class="mt-4">
														<h4 class="text-sm font-medium text-gray-900 mb-2">Message</h4>
														<div class="bg-gray-50 rounded-lg p-3">
															<p class="text-sm text-gray-700 whitespace-pre-wrap">{submission.message}</p>
														</div>
													</div>
													<div class="mt-4 flex space-x-4">
														<a
															href="mailto:{submission.email}?subject=Re: {submission.subject}"
															class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
														>
															Reply via Email
														</a>
													</div>
												</div>
											{/if}
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/if}

				<!-- Feedback Submissions Tab -->
				{#if selectedTab === 'feedback'}
					<div class="p-6">
						<h2 class="text-lg font-medium text-gray-900 mb-4">Client Feedback Submissions</h2>
						
						{#if data.feedbackSubmissions.length === 0}
							<div class="text-center py-12">
								<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
								</svg>
								<h3 class="mt-2 text-sm font-medium text-gray-900">No feedback submissions</h3>
								<p class="mt-1 text-sm text-gray-500">No clients have submitted feedback yet.</p>
							</div>
						{:else}
							<div class="space-y-4">
								{#each data.feedbackSubmissions as submission}
									<div class="border border-gray-200 rounded-lg">
										<div class="p-4">
											<div class="flex items-center justify-between">
												<div class="flex-1">
													<div class="flex items-center space-x-4">
														<h3 class="text-lg font-medium text-gray-900">{submission.clientName}</h3>
														{#if submission.company}
															<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
																{submission.company}
															</span>
														{/if}
														<span class="text-lg" title="Rating: {submission.rating}/5">
															{getRatingStars(submission.rating)}
														</span>
													</div>
													<p class="text-sm text-gray-600 mt-1">{submission.email}</p>
													<p class="text-sm font-medium text-gray-900 mt-1">Project: {submission.projectName}</p>
													<p class="text-xs text-gray-500 mt-1">Submitted {formatDate(submission.createdAt)}</p>
													{#if submission.testimonialPermission === 'yes'}
														<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
															Can use as testimonial
														</span>
													{:else if submission.testimonialPermission === 'anonymous'}
														<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-2">
															Can use anonymously
														</span>
													{/if}
												</div>
												<div class="flex items-center space-x-2">
													<button
														type="button"
														onclick={() => toggleFeedbackExpanded(submission.id)}
														class="text-blue-600 hover:text-blue-800 text-sm font-medium"
													>
														{expandedFeedback === submission.id ? 'Hide Details' : 'View Details'}
													</button>
													<form method="post" action="?/deleteFeedback" use:enhance class="inline">
														<input type="hidden" name="id" value={submission.id} />
														<button
															type="submit"
															onclick={() => confirm('Are you sure you want to delete this feedback submission?')}
															class="text-red-600 hover:text-red-800 text-sm font-medium"
														>
															Delete
														</button>
													</form>
												</div>
											</div>
											
											{#if expandedFeedback === submission.id}
												<div class="mt-4 pt-4 border-t border-gray-200">
													<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
														{#if submission.recommend}
															<div>
																<h4 class="text-sm font-medium text-gray-900">Would Recommend</h4>
																<p class="text-sm text-gray-600 capitalize">{submission.recommend}</p>
															</div>
														{/if}
													</div>
													<div class="mb-4">
														<h4 class="text-sm font-medium text-gray-900 mb-2">Feedback</h4>
														<div class="bg-gray-50 rounded-lg p-3">
															<p class="text-sm text-gray-700 whitespace-pre-wrap">{submission.feedback}</p>
														</div>
													</div>
													{#if submission.improvements}
														<div class="mb-4">
															<h4 class="text-sm font-medium text-gray-900 mb-2">Suggestions for Improvement</h4>
															<div class="bg-gray-50 rounded-lg p-3">
																<p class="text-sm text-gray-700 whitespace-pre-wrap">{submission.improvements}</p>
															</div>
														</div>
													{/if}
													<div class="flex space-x-4">
														<a
															href="mailto:{submission.email}?subject=Thank you for your feedback on {submission.projectName}"
															class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
														>
															Send Thank You Email
														</a>
													</div>
												</div>
											{/if}
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</main>
</div>