<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData, ActionData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
	let isSubmitting = $state(false);
	let selectedRating = $state(0);

	function setRating(rating: number) {
		selectedRating = rating;
	}
</script>

<svelte:head>
	<title>Client Feedback - Portfolio</title>
	<meta name="description" content="Share your experience working with me. Your feedback helps me improve my services and better serve future clients." />
	<meta name="keywords" content="client feedback, testimonial, review, project experience, service quality" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Client Feedback - Portfolio" />
	<meta property="og:description" content="Share your experience working with me. Your feedback helps me improve my services and better serve future clients." />
	<meta property="og:url" content="/feedback" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:title" content="Client Feedback - Portfolio" />
	<meta property="twitter:description" content="Share your experience working with me. Your feedback helps me improve my services and better serve future clients." />
	
	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebPage",
			"name": "Client Feedback",
			"description": "Share your experience and provide feedback on our collaboration",
			"url": "/feedback"
		}
	</script>`}
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Hero Section -->
	<section class="bg-white">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
			<div class="text-center">
				<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
					<svg class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
					</svg>
				</div>
				<h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
					Your Feedback Matters
				</h1>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
					I value your honest feedback about our collaboration. Your insights help me improve my services 
					and deliver even better results for future clients. Thank you for taking the time to share your experience.
				</p>
			</div>
		</div>
	</section>

	<!-- Feedback Form Section -->
	<section class="py-20">
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
			{#if form?.success}
				<div class="rounded-xl bg-green-50 p-8 mb-8 border border-green-200 text-center">
					<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-green-800 mb-2">Feedback Submitted Successfully!</h3>
					<p class="text-green-700">{form.message}</p>
				</div>
			{/if}

			{#if form?.message && !form?.success}
				<div class="rounded-xl bg-red-50 p-6 mb-8 border border-red-200">
					<div class="flex items-center">
						<svg class="w-6 h-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						<div class="text-red-800">
							<h3 class="font-semibold">Error</h3>
							<p class="text-sm">{form.message}</p>
						</div>
					</div>
				</div>
			{/if}

			<div class="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
				<h2 class="text-2xl font-bold text-gray-900 mb-8">Share Your Experience</h2>
				
				<form 
					method="post" 
					action="?/submit"
					use:enhance={() => {
						isSubmitting = true;
						return async ({ update }) => {
							await update();
							isSubmitting = false;
						};
					}}
				>
					<div class="space-y-8">
						<!-- Client Information -->
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div>
								<label for="clientName" class="block text-sm font-medium text-gray-700 mb-2">
									Your Name *
								</label>
								<input
									type="text"
									name="clientName"
									id="clientName"
									required
									class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="Your full name"
								/>
							</div>

							<div>
								<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
									Email *
								</label>
								<input
									type="email"
									name="email"
									id="email"
									required
									class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="your.email@example.com"
								/>
							</div>

							<div>
								<label for="company" class="block text-sm font-medium text-gray-700 mb-2">
									Company
								</label>
								<input
									type="text"
									name="company"
									id="company"
									class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="Your company name"
								/>
							</div>

							<div>
								<label for="projectName" class="block text-sm font-medium text-gray-700 mb-2">
									Project Name *
								</label>
								<input
									type="text"
									name="projectName"
									id="projectName"
									required
									class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="Name of the project we worked on"
								/>
							</div>
						</div>

						<!-- Rating -->
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-4">
								Overall Rating *
							</label>
							<div class="flex items-center space-x-2">
								{#each [1, 2, 3, 4, 5] as rating}
									<button
										type="button"
										onclick={() => setRating(rating)}
										class="p-1 rounded-lg hover:bg-gray-100 transition-colors"
									>
										<svg 
											class="w-8 h-8 {selectedRating >= rating ? 'text-yellow-400' : 'text-gray-300'} transition-colors" 
											fill="currentColor" 
											viewBox="0 0 24 24"
										>
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
										</svg>
									</button>
								{/each}
								<span class="ml-4 text-sm text-gray-600">
									{#if selectedRating === 0}
										Click to rate
									{:else if selectedRating === 1}
										Poor
									{:else if selectedRating === 2}
										Fair
									{:else if selectedRating === 3}
										Good
									{:else if selectedRating === 4}
										Very Good
									{:else}
										Excellent
									{/if}
								</span>
							</div>
							<input type="hidden" name="rating" value={selectedRating} />
						</div>

						<!-- Feedback -->
						<div>
							<label for="feedback" class="block text-sm font-medium text-gray-700 mb-2">
								Your Feedback *
							</label>
							<textarea
								name="feedback"
								id="feedback"
								rows="6"
								required
								class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
								placeholder="Please share your experience working with me. What went well? How was the communication? Were you satisfied with the final result?"
							></textarea>
						</div>

						<!-- Improvements -->
						<div>
							<label for="improvements" class="block text-sm font-medium text-gray-700 mb-2">
								Suggestions for Improvement
							</label>
							<textarea
								name="improvements"
								id="improvements"
								rows="4"
								class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
								placeholder="Is there anything I could have done better? Any suggestions for improving my services?"
							></textarea>
						</div>

						<!-- Recommendation -->
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-4">
								Would you recommend my services to others?
							</label>
							<div class="space-y-3">
								<label class="flex items-center">
									<input
										type="radio"
										name="recommend"
										value="yes"
										class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
									/>
									<span class="ml-3 text-gray-700">Yes, definitely</span>
								</label>
								<label class="flex items-center">
									<input
										type="radio"
										name="recommend"
										value="maybe"
										class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
									/>
									<span class="ml-3 text-gray-700">Maybe, with some conditions</span>
								</label>
								<label class="flex items-center">
									<input
										type="radio"
										name="recommend"
										value="no"
										class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
									/>
									<span class="ml-3 text-gray-700">No, I wouldn't recommend</span>
								</label>
							</div>
						</div>

						<!-- Testimonial Permission -->
						<div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
							<label class="block text-sm font-medium text-gray-700 mb-4">
								Testimonial Permission
							</label>
							<p class="text-sm text-gray-600 mb-4">
								May I use your feedback as a testimonial on my website? Your name and company will be included, 
								but I can make it anonymous if you prefer.
							</p>
							<div class="space-y-3">
								<label class="flex items-center">
									<input
										type="radio"
										name="testimonialPermission"
										value="yes"
										class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
									/>
									<span class="ml-3 text-gray-700">Yes, you may use my feedback with my name</span>
								</label>
								<label class="flex items-center">
									<input
										type="radio"
										name="testimonialPermission"
										value="anonymous"
										class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
									/>
									<span class="ml-3 text-gray-700">Yes, but please keep it anonymous</span>
								</label>
								<label class="flex items-center">
									<input
										type="radio"
										name="testimonialPermission"
										value="no"
										class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
									/>
									<span class="ml-3 text-gray-700">No, please keep this feedback private</span>
								</label>
							</div>
						</div>

						<!-- Cloudflare Turnstile -->
						<div class="pt-6">
							<div class="cf-turnstile" data-sitekey="{import.meta.env.VITE_TURNSTILE_SITE_KEY || 'YOUR_SITE_KEY'}"></div>
						</div>

						<!-- Submit Button -->
						<div class="pt-6">
							<button
								type="submit"
								disabled={isSubmitting || selectedRating === 0}
								class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
							>
								{#if isSubmitting}
									<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Submitting...
								{:else}
									Submit Feedback
									<svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
									</svg>
								{/if}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</section>

	<!-- Thank You Section -->
	<section class="py-20 bg-white">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl font-bold text-gray-900 mb-6">
				Thank You for Your Time
			</h2>
			<p class="text-lg text-gray-600 mb-8">
				Your feedback is invaluable in helping me grow and provide better services. 
				I truly appreciate you taking the time to share your experience.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/projects"
					class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
				>
					View My Portfolio
					<svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
					</svg>
				</a>
				<a
					href="/contact"
					class="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
				>
					Work Together Again
					<svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
					</svg>
				</a>
			</div>
		</div>
	</section>
</div>