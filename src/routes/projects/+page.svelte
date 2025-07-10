<script lang="ts">
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	function formatDate(date: Date) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Projects - Portfolio</title>
	<meta name="description" content="Explore my portfolio of web development projects, featuring innovative solutions and cutting-edge technologies." />
	<meta name="keywords" content="web development projects, portfolio, full stack development, SvelteKit, TypeScript, modern web applications" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Projects - Portfolio" />
	<meta property="og:description" content="Explore my portfolio of web development projects, featuring innovative solutions and cutting-edge technologies." />
	<meta property="og:url" content="/projects" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="Projects - Portfolio" />
	<meta property="twitter:description" content="Explore my portfolio of web development projects, featuring innovative solutions and cutting-edge technologies." />
	
	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			"name": "Projects Portfolio",
			"description": "A collection of web development projects showcasing innovative solutions and modern technologies",
			"url": "/projects"
		}
	</script>`}
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Hero Section -->
	<section class="bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
			<div class="text-center">
				<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
					My Projects
				</h1>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
					A showcase of my work, featuring innovative solutions, cutting-edge technologies, 
					and creative approaches to modern web development challenges.
				</p>
			</div>
		</div>
	</section>

	<!-- Projects Grid -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		{#if data.projects.length === 0}
			<div class="text-center py-20">
				<div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
					<svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
					</svg>
				</div>
				<h2 class="text-3xl font-semibold text-gray-900 mb-4">Projects Coming Soon</h2>
				<p class="text-gray-600 text-lg">I'm currently working on some exciting projects that will be showcased here.</p>
			</div>
		{:else}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each data.projects as project}
					<article class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200">
						<a href="/projects/{project.id}" class="block">
							<div class="aspect-video overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
								{#if project.image}
									<img
										src={project.image}
										alt={project.name}
										class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
									/>
								{:else}
									<div class="w-full h-full flex items-center justify-center">
										<svg class="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
										</svg>
									</div>
								{/if}
							</div>
							
							<div class="p-6">
								<h2 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
									{project.name}
								</h2>
								
								{#if project.shortDescription}
									<p class="text-gray-600 leading-relaxed mb-4 line-clamp-3">
										{project.shortDescription}
									</p>
								{/if}
								
								<div class="flex items-center justify-between">
									<span class="text-sm text-gray-500">
										Updated {formatDate(project.updatedAt)}
									</span>
									
									<div class="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
										View Details
										<svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
										</svg>
									</div>
								</div>
							</div>
						</a>
					</article>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Call to Action -->
	<section class="bg-white border-t border-gray-100">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
			<h2 class="text-3xl font-bold text-gray-900 mb-6">
				Interested in Working Together?
			</h2>
			<p class="text-lg text-gray-600 mb-8">
				I'm always excited to take on new challenges and collaborate on innovative projects.
			</p>
			<a
				href="/contact"
				class="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
			>
				Get In Touch
				<svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
				</svg>
			</a>
		</div>
	</section>
</div>

<style>
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>