<script lang="ts">
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	function formatDate(dateString: string) {
		if (!dateString) return 'Present';
		const [year, month] = dateString.split('-');
		const date = new Date(parseInt(year), parseInt(month) - 1);
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
	}

	function groupSkillsByCategory(skills: typeof data.skills) {
		const grouped: Record<string, typeof skills> = {};
		skills.forEach(skill => {
			if (!grouped[skill.category]) {
				grouped[skill.category] = [];
			}
			grouped[skill.category].push(skill);
		});
		return grouped;
	}

	function getPlatformIcon(platform: string) {
		const icons: Record<string, string> = {
			linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
			github: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
			twitter: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
		};
		return icons[platform.toLowerCase()] || '';
	}

let groupedSkills = $derived.by(()=>groupSkillsByCategory(data.skills));
</script>

<svelte:head>
	<title>Resume - {data.resume?.fullName || 'Portfolio'}</title>
	<meta name="description" content={data.resume?.summary || 'Professional resume and CV showcasing experience, education, and skills.'} />
	<meta name="keywords" content="resume, CV, professional experience, skills, education, {data.resume?.fullName || 'developer'}" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="profile" />
	<meta property="og:title" content="Resume - {data.resume?.fullName || 'Portfolio'}" />
	<meta property="og:description" content={data.resume?.summary || 'Professional resume and CV showcasing experience, education, and skills.'} />
	<meta property="og:url" content="/resume" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:title" content="Resume - {data.resume?.fullName || 'Portfolio'}" />
	<meta property="twitter:description" content={data.resume?.summary || 'Professional resume and CV showcasing experience, education, and skills.'} />
	
	<!-- JSON-LD Structured Data -->
	{#if data.resume}
		{@html `<script type="application/ld+json">
			{
				"@context": "https://schema.org",
				"@type": "Person",
				"name": "${data.resume.fullName}",
				"jobTitle": "${data.resume.title}",
				"email": "${data.resume.email}",
				${data.resume.phone ? `"telephone": "${data.resume.phone}",` : ''}
				${data.resume.location ? `"address": "${data.resume.location}",` : ''}
				${data.resume.website ? `"url": "${data.resume.website}",` : ''}
				"description": "${data.resume.summary || ''}"
			}
		</script>`}
	{/if}
</svelte:head>

<div class="min-h-screen bg-gray-50">
	{#if !data.resume}
		<!-- No Resume Data -->
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
			<div class="text-center">
				<div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
					<svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
					</svg>
				</div>
				<h1 class="text-3xl font-bold text-gray-900 mb-4">Resume Coming Soon</h1>
				<p class="text-gray-600 text-lg">I'm currently updating my resume. Please check back soon!</p>
			</div>
		</div>
	{:else}
		<!-- Resume Header -->
		<header class="bg-white shadow-sm">
			<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div class="text-center">
					<h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
						{data.resume.fullName}
					</h1>
					<p class="text-xl text-gray-600 mb-6">
						{data.resume.title}
					</p>
					
					<!-- Contact Info -->
					<div class="flex flex-wrap justify-center items-center gap-6 text-gray-600 mb-8">
						{#if data.resume.email}
							<a href="mailto:{data.resume.email}" class="flex items-center hover:text-blue-600 transition-colors">
								<svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
								</svg>
								{data.resume.email}
							</a>
						{/if}
						
						{#if data.resume.phone}
							<a href="tel:{data.resume.phone}" class="flex items-center hover:text-blue-600 transition-colors">
								<svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
								</svg>
								{data.resume.phone}
							</a>
						{/if}
						
						{#if data.resume.location}
							<div class="flex items-center">
								<svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
								</svg>
								{data.resume.location}
							</div>
						{/if}
						
						{#if data.resume.website}
							<a href={data.resume.website} target="_blank" rel="noopener noreferrer" class="flex items-center hover:text-blue-600 transition-colors">
								<svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
								</svg>
								{data.resume.website}
							</a>
						{/if}
					</div>
					
					<!-- Social Links -->
					{#if data.socialLinks.length > 0}
						<div class="flex justify-center space-x-4 mb-8">
							{#each data.socialLinks as link}
								<a
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
									title={link.platform}
								>
									<svg class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
										<path d={getPlatformIcon(link.platform)}></path>
									</svg>
								</a>
							{/each}
						</div>
					{/if}
					
					<!-- Download Button -->
					<a
						href="/resume/download"
						class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
					>
						<svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
						</svg>
						Download PDF
					</a>
				</div>
			</div>
		</header>

		<!-- Resume Content -->
		<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<!-- Summary -->
			{#if data.resume.summary}
				<section class="mb-12">
					<div class="bg-white rounded-xl shadow-sm p-8">
						<h2 class="text-2xl font-bold text-gray-900 mb-4">Professional Summary</h2>
						<p class="text-gray-700 leading-relaxed text-lg">
							{data.resume.summary}
						</p>
					</div>
				</section>
			{/if}

			<!-- Experience -->
			{#if data.experiences.length > 0}
				<section class="mb-12">
					<h2 class="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h2>
					<div class="space-y-6">
						{#each data.experiences as experience}
							<div class="bg-white rounded-xl shadow-sm p-8">
								<div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
									<div>
										<h3 class="text-xl font-bold text-gray-900">{experience.position}</h3>
										<p class="text-lg text-blue-600 font-semibold">{experience.company}</p>
										{#if experience.location}
											<p class="text-gray-600">{experience.location}</p>
										{/if}
									</div>
									<div class="text-gray-500 mt-2 md:mt-0">
										{formatDate(experience.startDate)} - {formatDate(experience.endDate)}
									</div>
								</div>
								{#if experience.description}
									<div class="prose prose-gray max-w-none">
										<div class="whitespace-pre-wrap text-gray-700 leading-relaxed">
											{experience.description}
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</section>
			{/if}

			<!-- Education -->
			{#if data.education.length > 0}
				<section class="mb-12">
					<h2 class="text-2xl font-bold text-gray-900 mb-6">Education</h2>
					<div class="space-y-6">
						{#each data.education as edu}
							<div class="bg-white rounded-xl shadow-sm p-8">
								<div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
									<div>
										<h3 class="text-xl font-bold text-gray-900">{edu.degree}</h3>
										{#if edu.field}
											<p class="text-lg text-gray-700">{edu.field}</p>
										{/if}
										<p class="text-lg text-blue-600 font-semibold">{edu.institution}</p>
										{#if edu.gpa}
											<p class="text-gray-600">GPA: {edu.gpa}</p>
										{/if}
									</div>
									<div class="text-gray-500 mt-2 md:mt-0">
										{formatDate(edu.startDate)} - {formatDate(edu.endDate)}
									</div>
								</div>
								{#if edu.description}
									<div class="prose prose-gray max-w-none">
										<div class="whitespace-pre-wrap text-gray-700 leading-relaxed">
											{edu.description}
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</section>
			{/if}

			<!-- Skills -->
			{#if data.skills.length > 0}
				<section class="mb-12">
					<h2 class="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
					<div class="bg-white rounded-xl shadow-sm p-8">
						<div class="grid gap-6 md:grid-cols-2">
							{#each Object.entries(groupedSkills) as [category, skills]}
								<div>
									<h3 class="text-lg font-semibold text-gray-900 mb-3 capitalize">
										{category.replace('_', ' ')}
									</h3>
									<div class="flex flex-wrap gap-2">
										{#each skills as skill}
											<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
												{skill.name}
												{#if skill.level}
													<span class="ml-1 text-xs text-blue-600">({skill.level})</span>
												{/if}
											</span>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</section>
			{/if}
		</main>
	{/if}
</div>