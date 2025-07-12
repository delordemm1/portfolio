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

	function getReadingTime(summary: string | null) {
		if (!summary) return '2 min read';
		const words = summary.split(' ').length;
		const readingTime = Math.ceil(words / 200); // Average reading speed
		return `${readingTime} min read`;
	}
</script>

<svelte:head>
	<title>Blog - Portfolio</title>
	<meta name="description" content="Read my latest thoughts, tutorials, and insights on web development, technology, and more." />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Hero Section -->
	<div class="bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<div class="text-center">
				<h1 class="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
					Blog
				</h1>
				<p class="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
					Thoughts, tutorials, and insights on web development, technology, and the creative process.
				</p>
			</div>
		</div>
	</div>

	<!-- Blog Posts -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		{#if data.blogPosts.length === 0}
			<div class="text-center py-16">
				<svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
				</svg>
				<h2 class="mt-4 text-2xl font-semibold text-gray-900">No blog posts yet</h2>
				<p class="mt-2 text-gray-600">Check back soon for new content!</p>
			</div>
		{:else}
			<div class="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
				{#each data.blogPosts as post}
					<article class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
						<a href="/blog/{post.slug}" class="block">
							{#if post.featuredImage}
								<div class="aspect-video overflow-hidden">
									<img
										src={post.featuredImage}
										alt={post.title}
										class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
							{:else}
								<div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
									<svg class="w-16 h-16 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
									</svg>
								</div>
							{/if}
							
							<div class="p-6">
								<div class="flex items-center text-sm text-gray-500 mb-3">
									<time datetime={post.updatedAt.toISOString()}>
										{formatDate(post.updatedAt)}
									</time>
									<span class="mx-2">•</span>
									<span>{getReadingTime(post.manualSummary)}</span>
								</div>
								
								<h2 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
									{post.title}
								</h2>
								
								{#if post.manualSummary}
									<p class="text-gray-600 line-clamp-3 leading-relaxed">
										{post.manualSummary}
									</p>
								{/if}
								
								<div class="mt-4 flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
									Read more
									<svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
									</svg>
								</div>
							</div>
						</a>
					</article>
				{/each}
			</div>
		{/if}
	</main>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>