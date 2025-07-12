<script lang="ts">
	// No server data needed for this static page
</script>

<svelte:head>
	<title>About - Portfolio</title>
	<meta name="description" content="Learn more about me, my background, skills, and passion for web development. Discover my journey as a full-stack developer and creative technologist." />
	<meta name="keywords" content="about, full stack developer, web development, skills, experience, background, creative technologist" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="profile" />
	<meta property="og:title" content="About - Portfolio" />
	<meta property="og:description" content="Learn more about me, my background, skills, and passion for web development. Discover my journey as a full-stack developer and creative technologist." />
	<meta property="og:url" content="/about" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:title" content="About - Portfolio" />
	<meta property="twitter:description" content="Learn more about me, my background, skills, and passion for web development. Discover my journey as a full-stack developer and creative technologist." />
	
	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Portfolio Author",
			"jobTitle": "Full Stack Developer & Creative Technologist",
			"description": "Passionate full-stack developer creating innovative web applications and sharing insights through my blog",
			"url": "/about"
		}
	</script>`}
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Hero Section -->
	<section class="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
		<!-- Background Pattern -->
		<div class="absolute inset-0 opacity-5">
			<div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0); background-size: 40px 40px;"></div>
		</div>
		
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
			<div class="grid lg:grid-cols-2 gap-12 items-center">
				<div>
					<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
						Hi, I'm a
						<span class="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
							Creative Developer
						</span>
					</h1>
					<p class="text-xl text-gray-600 leading-relaxed mb-8">
						I'm passionate about crafting exceptional digital experiences that bridge the gap between 
						design and technology. With a focus on modern web development, I bring ideas to life through 
						clean code and innovative solutions.
					</p>
					<div class="flex flex-col sm:flex-row gap-4">
						<a
							href="/contact"
							class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
						>
							Let's Work Together
							<svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
							</svg>
						</a>
						<a
							href="/resume"
							class="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
						>
							View Resume
							<svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
							</svg>
						</a>
					</div>
				</div>
				
				<!-- Profile Image Placeholder -->
				<div class="relative">
					<div class="w-full max-w-md mx-auto">
						<div class="aspect-square bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl shadow-2xl flex items-center justify-center">
							<svg class="w-32 h-32 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
							</svg>
						</div>
						<!-- Floating Elements -->
						<div class="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-80 animate-bounce" style="animation-delay: 0.5s;"></div>
						<div class="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-80 animate-bounce" style="animation-delay: 1s;"></div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- About Content -->
	<section class="py-20 lg:py-32 bg-white">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="prose prose-lg prose-gray max-w-none">
				<h2 class="text-3xl font-bold text-gray-900 mb-8">My Story</h2>
				
				<div class="space-y-6 text-gray-700 leading-relaxed">
					<p>
						My journey into web development began with a simple curiosity about how websites work. 
						What started as tinkering with HTML and CSS quickly evolved into a deep passion for creating 
						digital experiences that not only look beautiful but also solve real-world problems.
					</p>
					
					<p>
						Over the years, I've had the privilege of working on diverse projects ranging from 
						small business websites to complex web applications. Each project has taught me something new 
						and reinforced my belief that great software is built at the intersection of technical 
						excellence and user-centered design.
					</p>
					
					<p>
						When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
						projects, or sharing my knowledge through blog posts and community involvement. I believe 
						in the power of continuous learning and the importance of giving back to the developer community.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Skills & Expertise -->
	<section class="py-20 lg:py-32 bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
					Skills & Expertise
				</h2>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto">
					I specialize in modern web technologies and love working across the full stack.
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				<!-- Frontend -->
				<div class="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow">
					<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
						<svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-4">Frontend Development</h3>
					<p class="text-gray-600 mb-4">
						Creating responsive, interactive user interfaces with modern frameworks and libraries.
					</p>
					<div class="flex flex-wrap gap-2">
						<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">React</span>
						<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Svelte</span>
						<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">TypeScript</span>
						<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Tailwind CSS</span>
					</div>
				</div>

				<!-- Backend -->
				<div class="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow">
					<div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
						<svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-4">Backend Development</h3>
					<p class="text-gray-600 mb-4">
						Building scalable server-side applications and APIs with robust architecture.
					</p>
					<div class="flex flex-wrap gap-2">
						<span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Node.js</span>
						<span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Python</span>
						<span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">PostgreSQL</span>
						<span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">MongoDB</span>
					</div>
				</div>

				<!-- DevOps & Tools -->
				<div class="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow">
					<div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
						<svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-4">DevOps & Tools</h3>
					<p class="text-gray-600 mb-4">
						Streamlining development workflows and deploying applications to the cloud.
					</p>
					<div class="flex flex-wrap gap-2">
						<span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Docker</span>
						<span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">AWS</span>
						<span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Git</span>
						<span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">CI/CD</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Values & Approach -->
	<section class="py-20 lg:py-32 bg-white">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
					My Approach
				</h2>
				<p class="text-xl text-gray-600">
					The principles that guide my work and collaboration.
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8">
				<div class="space-y-6">
					<div class="flex items-start">
						<div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
							<svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>
						<div>
							<h3 class="text-lg font-semibold text-gray-900 mb-2">Quality First</h3>
							<p class="text-gray-600">
								I believe in writing clean, maintainable code that stands the test of time. 
								Every line is written with purpose and clarity.
							</p>
						</div>
					</div>

					<div class="flex items-start">
						<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4">
							<svg class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
							</svg>
						</div>
						<div>
							<h3 class="text-lg font-semibold text-gray-900 mb-2">User-Centered</h3>
							<p class="text-gray-600">
								Every decision is made with the end user in mind. Great technology should 
								be invisible and intuitive.
							</p>
						</div>
					</div>
				</div>

				<div class="space-y-6">
					<div class="flex items-start">
						<div class="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
							<svg class="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
							</svg>
						</div>
						<div>
							<h3 class="text-lg font-semibold text-gray-900 mb-2">Performance Focused</h3>
							<p class="text-gray-600">
								Fast, efficient applications that provide excellent user experiences 
								across all devices and network conditions.
							</p>
						</div>
					</div>

					<div class="flex items-start">
						<div class="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
							<svg class="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
							</svg>
						</div>
						<div>
							<h3 class="text-lg font-semibold text-gray-900 mb-2">Continuous Learning</h3>
							<p class="text-gray-600">
								Technology evolves rapidly, and I'm committed to staying current with 
								the latest tools and best practices.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="py-20 lg:py-32 bg-gray-900">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
				Ready to Build Something Amazing?
			</h2>
			<p class="text-xl text-gray-300 leading-relaxed mb-12">
				I'm always excited to take on new challenges and collaborate on innovative projects. 
				Let's discuss how we can bring your ideas to life.
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
				<a
					href="/contact"
					class="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
				>
					Start a Conversation
					<svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
					</svg>
				</a>
				<a
					href="/projects"
					class="inline-flex items-center px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1"
				>
					View My Work
					<svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
					</svg>
				</a>
			</div>
		</div>
	</section>
</div>

<style>
	@keyframes bounce {
		0%, 20%, 53%, 80%, 100% {
			transform: translate3d(0,0,0);
		}
		40%, 43% {
			transform: translate3d(0,-8px,0);
		}
		70% {
			transform: translate3d(0,-4px,0);
		}
		90% {
			transform: translate3d(0,-2px,0);
		}
	}
	
	.animate-bounce {
		animation: bounce 2s infinite;
	}
</style>