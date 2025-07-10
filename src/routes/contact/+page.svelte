<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData, ActionData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>Contact - Portfolio</title>
	<meta name="description" content="Get in touch to discuss your next project. I'm available for freelance work, consulting, and collaboration opportunities." />
	<meta name="keywords" content="contact, hire, freelance, web development, consultation, project inquiry, collaboration" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Contact - Portfolio" />
	<meta property="og:description" content="Get in touch to discuss your next project. I'm available for freelance work, consulting, and collaboration opportunities." />
	<meta property="og:url" content="/contact" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:title" content="Contact - Portfolio" />
	<meta property="twitter:description" content="Get in touch to discuss your next project. I'm available for freelance work, consulting, and collaboration opportunities." />
	
	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "ContactPage",
			"name": "Contact",
			"description": "Get in touch to discuss your next project",
			"url": "/contact"
		}
	</script>`}
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Hero Section -->
	<section class="bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
			<div class="text-center">
				<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
					Let's Work Together
				</h1>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
					Have a project in mind? I'd love to hear about it. Whether you need a complete web application, 
					a redesign, or just want to discuss ideas, I'm here to help bring your vision to life.
				</p>
			</div>
		</div>
	</section>

	<!-- Contact Form Section -->
	<section class="py-20">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			{#if form?.success}
				<div class="rounded-xl bg-green-50 p-6 mb-8 border border-green-200">
					<div class="flex items-center">
						<svg class="w-6 h-6 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						<div class="text-green-800">
							<h3 class="font-semibold">Message Sent Successfully!</h3>
							<p class="text-sm">{form.message}</p>
						</div>
					</div>
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

			<div class="grid lg:grid-cols-3 gap-12">
				<!-- Contact Information -->
				<div class="lg:col-span-1">
					<div class="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
						<h2 class="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
						
						<div class="space-y-6">
							<div class="flex items-start">
								<div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
									<svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
									</svg>
								</div>
								<div>
									<h3 class="font-semibold text-gray-900">Email</h3>
									<p class="text-gray-600">hello@example.com</p>
								</div>
							</div>

							<div class="flex items-start">
								<div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
									<svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
									</svg>
								</div>
								<div>
									<h3 class="font-semibold text-gray-900">Response Time</h3>
									<p class="text-gray-600">Usually within 24 hours</p>
								</div>
							</div>

							<div class="flex items-start">
								<div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
									<svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
									</svg>
								</div>
								<div>
									<h3 class="font-semibold text-gray-900">Location</h3>
									<p class="text-gray-600">Available worldwide (Remote)</p>
								</div>
							</div>
						</div>

						<div class="mt-8 pt-8 border-t border-gray-100">
							<h3 class="font-semibold text-gray-900 mb-4">What I Can Help With</h3>
							<ul class="space-y-2 text-sm text-gray-600">
								<li class="flex items-center">
									<svg class="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									Web Application Development
								</li>
								<li class="flex items-center">
									<svg class="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									Frontend & Backend Development
								</li>
								<li class="flex items-center">
									<svg class="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									Technical Consulting
								</li>
								<li class="flex items-center">
									<svg class="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									Code Reviews & Optimization
								</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Contact Form -->
				<div class="lg:col-span-2">
					<div class="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
						<h2 class="text-2xl font-bold text-gray-900 mb-6">Send Me a Message</h2>
						
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
							<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<!-- Name -->
								<div>
									<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
										Name *
									</label>
									<input
										type="text"
										name="name"
										id="name"
										required
										class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										placeholder="Your full name"
									/>
								</div>

								<!-- Email -->
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

								<!-- Company -->
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

								<!-- Budget -->
								<div>
									<label for="budget" class="block text-sm font-medium text-gray-700 mb-2">
										Budget Range
									</label>
									<select
										name="budget"
										id="budget"
										class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									>
										<option value="">Select budget range</option>
										<option value="under-5k">Under $5,000</option>
										<option value="5k-10k">$5,000 - $10,000</option>
										<option value="10k-25k">$10,000 - $25,000</option>
										<option value="25k-50k">$25,000 - $50,000</option>
										<option value="50k-plus">$50,000+</option>
									</select>
								</div>

								<!-- Subject -->
								<div class="sm:col-span-2">
									<label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
										Subject *
									</label>
									<input
										type="text"
										name="subject"
										id="subject"
										required
										class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										placeholder="What's this about?"
									/>
								</div>

								<!-- Timeline -->
								<div class="sm:col-span-2">
									<label for="timeline" class="block text-sm font-medium text-gray-700 mb-2">
										Project Timeline
									</label>
									<select
										name="timeline"
										id="timeline"
										class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									>
										<option value="">Select timeline</option>
										<option value="asap">ASAP</option>
										<option value="1-month">Within 1 month</option>
										<option value="2-3-months">2-3 months</option>
										<option value="3-6-months">3-6 months</option>
										<option value="6-months-plus">6+ months</option>
										<option value="just-exploring">Just exploring</option>
									</select>
								</div>

								<!-- Message -->
								<div class="sm:col-span-2">
									<label for="message" class="block text-sm font-medium text-gray-700 mb-2">
										Message *
									</label>
									<textarea
										name="message"
										id="message"
										rows="6"
										required
										class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
										placeholder="Tell me about your project, goals, and any specific requirements..."
									></textarea>
								</div>
							</div>

							<!-- TODO: Add Cloudflare Turnstile here -->
							<!-- <div class="mt-6">
								<div class="cf-turnstile" data-sitekey="YOUR_SITE_KEY"></div>
							</div> -->

							<!-- Submit Button -->
							<div class="mt-8">
								<button
									type="submit"
									disabled={isSubmitting}
									class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
								>
									{#if isSubmitting}
										<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
											<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
											<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Sending...
									{:else}
										Send Message
										<svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
										</svg>
									{/if}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="py-20 bg-white">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-gray-900 mb-6">
					Frequently Asked Questions
				</h2>
				<p class="text-lg text-gray-600">
					Quick answers to common questions about working together.
				</p>
			</div>

			<div class="space-y-8">
				<div class="bg-gray-50 rounded-xl p-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-3">
						What's your typical project timeline?
					</h3>
					<p class="text-gray-600">
						Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, 
						while a complex web application could take 2-6 months. I'll provide a detailed timeline estimate 
						after our initial discussion.
					</p>
				</div>

				<div class="bg-gray-50 rounded-xl p-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-3">
						Do you work with international clients?
					</h3>
					<p class="text-gray-600">
						Absolutely! I work with clients worldwide and am comfortable with remote collaboration. 
						I'm flexible with time zones and use modern communication tools to ensure smooth project delivery.
					</p>
				</div>

				<div class="bg-gray-50 rounded-xl p-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-3">
						What technologies do you specialize in?
					</h3>
					<p class="text-gray-600">
						I specialize in modern web technologies including React, Svelte, Node.js, TypeScript, and various 
						databases. I choose the best technology stack based on your project's specific requirements and goals.
					</p>
				</div>

				<div class="bg-gray-50 rounded-xl p-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-3">
						Do you provide ongoing support after project completion?
					</h3>
					<p class="text-gray-600">
						Yes! I offer various support and maintenance packages to keep your application running smoothly. 
						This includes bug fixes, security updates, performance optimization, and feature enhancements.
					</p>
				</div>
			</div>
		</div>
	</section>
</div>