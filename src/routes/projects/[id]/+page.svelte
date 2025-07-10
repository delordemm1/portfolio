<script lang="ts">
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	function formatDate(date: Date) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.project.name} - Projects</title>
	<meta name="description" content={data.project.shortDescription || `Learn more about ${data.project.name}, a web development project showcasing innovative solutions.`} />
	<meta name="keywords" content="web development, project, {data.project.name}, portfolio, case study" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{data.project.name} - Projects" />
	<meta property="og:description" content={data.project.shortDescription || `Learn more about ${data.project.name}, a web development project showcasing innovative solutions.`} />
	{#if data.project.image}
		<meta property="og:image" content={data.project.image} />
	{/if}
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="{data.project.name} - Projects" />
	<meta property="twitter:description" content={data.project.shortDescription || `Learn more about ${data.project.name}, a web development project showcasing innovative solutions.`} />
	{#if data.project.image}
		<meta property="twitter:image" content={data.project.image} />
	{/if}
	
	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "CreativeWork",
			"name": "${data.project.name}",
			"description": "${data.project.shortDescription || ''}",
			"dateCreated": "${data.project.createdAt.toISOString()}",
			"dateModified": "${data.project.updatedAt.toISOString()}",
			${data.project.image ? `"image": "${data.project.image}",` : ''}
			${data.project.optionalLink ? `"url": "${data.project.optionalLink}",` : ''}
			"author": {
				"@type": "Person",
				"name": "Portfolio Author"
			}
		}
	</script>`}
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Navigation -->
	<nav class="border-b border-gray-100">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<a href="/projects" class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
				<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
				</svg>
				Back to Projects
			</a>
		</div>
	</nav>

	<!-- Project Header -->
	<header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div>
				<h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
					{data.project.name}
				</h1>
				
				{#if data.project.shortDescription}
					<p class="text-xl text-gray-600 leading-relaxed mb-8">
						{data.project.shortDescription}
					</p>
				{/if}
				
				<div class="flex flex-wrap gap-4">
					{#if data.project.optionalLink}
						<a
							href={data.project.optionalLink}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
						>
							View Live Project
							<svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
							</svg>
						</a>
					{/if}
					
					<div class="flex items-center text-gray-500">
						<svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-3 3m3-3l3 3"></path>
						</svg>
						Updated {formatDate(data.project.updatedAt)}
					</div>
				</div>
			</div>
			
			{#if data.project.image}
				<div class="lg:order-first">
					<img
						src={data.project.image}
						alt={data.project.name}
						class="w-full rounded-2xl shadow-2xl"
					/>
				</div>
			{/if}
		</div>
	</header>

	<!-- Project Details -->
	<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
		{#if data.project.fullDescription}
			<section class="mb-12">
				<h2 class="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
				<div class="prose prose-lg prose-gray max-w-none">
					<div class="whitespace-pre-wrap leading-relaxed text-gray-700">
						{data.project.fullDescription}
					</div>
				</div>
			</section>
		{/if}

		{#if data.project.extraDetails}
			<section class="mb-12">
				<h2 class="text-2xl font-bold text-gray-900 mb-6">Technical Details</h2>
				<div class="bg-gray-50 rounded-xl p-6">
					<div class="prose prose-gray max-w-none">
						<div class="whitespace-pre-wrap leading-relaxed text-gray-700">
							{data.project.extraDetails}
						</div>
					</div>
				</div>
			</section>
		{/if}
	</main>

	<!-- Related Projects / CTA -->
	<section class="bg-gray-50 border-t border-gray-100">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
			<h2 class="text-3xl font-bold text-gray-900 mb-6">
				Explore More Projects
			</h2>
			<p class="text-lg text-gray-600 mb-8">
				Check out my other work and see how I approach different challenges.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/projects"
					class="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
				>
					View All Projects
					<svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
					</svg>
				</a>
				<a
					href="/contact"
					class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
				>
					Work With Me
					<svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
					</svg>
				</a>
			</div>
		</div>
	</section>
</div>