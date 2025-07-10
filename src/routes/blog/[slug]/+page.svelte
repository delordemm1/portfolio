<script lang="ts">
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	function parseBlockContent(content: string) {
		try {
			return JSON.parse(content);
		} catch {
			return {};
		}
	}

	function getYouTubeEmbedUrl(url: string) {
		const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
		return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : '';
	}

	function formatDate(date: Date) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function getReadingTime(blocks: typeof data.blocks) {
		let wordCount = 0;
		blocks.forEach(block => {
			if (block.type === 'text') {
				const content = parseBlockContent(block.content);
				if (content.content) {
					wordCount += content.content.split(' ').length;
				}
			}
		});
		const readingTime = Math.ceil(wordCount / 200);
		return `${readingTime} min read`;
	}
</script>

<svelte:head>
	<title>{data.post.title} - Blog</title>
	<meta name="description" content={data.post.manualSummary || `Read ${data.post.title} on my blog.`} />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.manualSummary || `Read ${data.post.title} on my blog.`} />
	{#if data.post.featuredImage}
		<meta property="og:image" content={data.post.featuredImage} />
	{/if}
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content={data.post.title} />
	<meta property="twitter:description" content={data.post.manualSummary || `Read ${data.post.title} on my blog.`} />
	{#if data.post.featuredImage}
		<meta property="twitter:image" content={data.post.featuredImage} />
	{/if}
	
	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"headline": "${data.post.title}",
			"description": "${data.post.manualSummary || ''}",
			"datePublished": "${data.post.createdAt.toISOString()}",
			"dateModified": "${data.post.updatedAt.toISOString()}",
			${data.post.featuredImage ? `"image": "${data.post.featuredImage}",` : ''}
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
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<a href="/blog" class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
				<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
				</svg>
				Back to Blog
			</a>
		</div>
	</nav>

	<!-- Article Header -->
	<header class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="text-center">
			<div class="flex items-center justify-center text-sm text-gray-500 mb-4">
				<time datetime={data.post.updatedAt.toISOString()}>
					{formatDate(data.post.updatedAt)}
				</time>
				<span class="mx-2">•</span>
				<span>{getReadingTime(data.blocks)}</span>
			</div>
			
			<h1 class="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl mb-6 leading-tight">
				{data.post.title}
			</h1>
			
			{#if data.post.manualSummary}
				<p class="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
					{data.post.manualSummary}
				</p>
			{/if}
		</div>
		
		{#if data.post.featuredImage}
			<div class="mt-12">
				<img
					src={data.post.featuredImage}
					alt={data.post.title}
					class="w-full rounded-2xl shadow-2xl"
				/>
			</div>
		{/if}
	</header>

	<!-- Article Content -->
	<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
		<article class="prose prose-lg prose-gray max-w-none">
			{#if data.blocks.length > 0}
				{#each data.blocks as block}
					{@const content = parseBlockContent(block.content)}
					
					{#if block.type === 'text'}
						{#if content.content}
							<div class="prose prose-lg prose-gray max-w-none my-8">
								<div class="whitespace-pre-wrap leading-relaxed text-gray-800">
									{content.content}
								</div>
							</div>
						{/if}
					{:else if block.type === 'image'}
						{#if content.url}
							<figure class="my-12">
								<img
									src={content.url}
									alt={content.alt || ''}
									class="w-full rounded-xl shadow-lg"
								/>
								{#if content.caption}
									<figcaption class="text-center text-gray-600 mt-4 italic">
										{content.caption}
									</figcaption>
								{/if}
							</figure>
						{/if}
					{:else if block.type === 'youtube'}
						{#if content.url}
							{@const embedUrl = getYouTubeEmbedUrl(content.url)}
							{#if embedUrl}
								<div class="my-12">
									{#if content.title}
										<h3 class="text-2xl font-semibold text-gray-900 mb-4 text-center">
											{content.title}
										</h3>
									{/if}
									<div class="aspect-video rounded-xl overflow-hidden shadow-lg">
										<iframe
											src={embedUrl}
											title={content.title || 'YouTube video'}
											class="w-full h-full"
											frameborder="0"
											allowfullscreen
										></iframe>
									</div>
								</div>
							{/if}
						{/if}
					{:else if block.type === 'link'}
						{#if content.url}
							<div class="my-8">
								<a
									href={content.url}
									target="_blank"
									rel="noopener noreferrer"
									class="block p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
								>
									<div class="flex items-start">
										<div class="flex-1">
											{#if content.title}
												<h4 class="text-lg font-semibold text-blue-600 group-hover:text-blue-700 mb-2">
													{content.title}
												</h4>
											{/if}
											{#if content.description}
												<p class="text-gray-600 mb-3 leading-relaxed">
													{content.description}
												</p>
											{/if}
											<p class="text-sm text-gray-500 font-mono">
												{content.url}
											</p>
										</div>
										<svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 ml-4 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
										</svg>
									</div>
								</a>
							</div>
						{/if}
					{/if}
				{/each}
			{:else}
				<div class="text-center py-16">
					<p class="text-gray-500 italic">This post doesn't have any content yet.</p>
				</div>
			{/if}
		</article>
	</main>

	<!-- Back to Blog -->
	<div class="border-t border-gray-100">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="text-center">
				<a
					href="/blog"
					class="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
				>
					<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
					</svg>
					Back to all posts
				</a>
			</div>
		</div>
	</div>
</div>