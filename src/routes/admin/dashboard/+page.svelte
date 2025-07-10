<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
	<title>Admin Dashboard - Portfolio</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Navigation Header -->
	<nav class="bg-white shadow">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<h1 class="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
				</div>
				<div class="flex items-center space-x-4">
					<span class="text-sm text-gray-700">Welcome, {data.user.username}</span>
					<form method='post' action='?/logout' use:enhance>
						<button
							type="submit"
							class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
						>
							Sign out
						</button>
					</form>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
		<div class="px-4 py-6 sm:px-0">
			<!-- Welcome Section -->
			<div class="bg-white overflow-hidden shadow rounded-lg mb-6">
				<div class="px-4 py-5 sm:p-6">
					<h2 class="text-lg font-medium text-gray-900 mb-2">Welcome to your Portfolio Admin Panel</h2>
					<p class="text-sm text-gray-600">
						Manage your projects, blog posts, resume, and site content from here.
					</p>
					<p class="text-xs text-gray-500 mt-2">User ID: {data.user.id}</p>
				</div>
			</div>

			<!-- Quick Actions Grid -->
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<!-- Projects Management -->
				<div class="bg-white overflow-hidden shadow rounded-lg">
					<div class="p-6">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
									<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
									</svg>
								</div>
							</div>
							<div class="ml-4">
								<h3 class="text-lg font-medium text-gray-900">Projects</h3>
								<p class="text-sm text-gray-500">Manage your portfolio projects</p>
							</div>
						</div>
						<div class="mt-4">
							<button class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
								Manage Projects
							</button>
						</div>
					</div>
				</div>

				<!-- Blog Management -->
				<div class="bg-white overflow-hidden shadow rounded-lg">
					<div class="p-6">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
									<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
									</svg>
								</div>
							</div>
							<div class="ml-4">
								<h3 class="text-lg font-medium text-gray-900">Blog</h3>
								<p class="text-sm text-gray-500">Write and manage blog posts</p>
							</div>
						</div>
						<div class="mt-4">
							<button class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
								Manage Blog
							</button>
						</div>
					</div>
				</div>

				<!-- Resume Management -->
				<div class="bg-white overflow-hidden shadow rounded-lg">
					<div class="p-6">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
									<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
									</svg>
								</div>
							</div>
							<div class="ml-4">
								<h3 class="text-lg font-medium text-gray-900">Resume</h3>
								<p class="text-sm text-gray-500">Update your CV information</p>
							</div>
						</div>
						<div class="mt-4">
							<button class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
								Edit Resume
							</button>
						</div>
					</div>
				</div>

				<!-- Messages & Feedback -->
				<div class="bg-white overflow-hidden shadow rounded-lg">
					<div class="p-6">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
									<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
									</svg>
								</div>
							</div>
							<div class="ml-4">
								<h3 class="text-lg font-medium text-gray-900">Messages</h3>
								<p class="text-sm text-gray-500">View contact form submissions</p>
							</div>
						</div>
						<div class="mt-4">
							<button class="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
								View Messages
							</button>
						</div>
					</div>
				</div>

				<!-- Comments Management -->
				<div class="bg-white overflow-hidden shadow rounded-lg">
					<div class="p-6">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
									<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"></path>
									</svg>
								</div>
							</div>
							<div class="ml-4">
								<h3 class="text-lg font-medium text-gray-900">Comments</h3>
								<p class="text-sm text-gray-500">Moderate blog comments</p>
							</div>
						</div>
						<div class="mt-4">
							<button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
								Moderate Comments
							</button>
						</div>
					</div>
				</div>

				<!-- Site Settings -->
				<div class="bg-white overflow-hidden shadow rounded-lg">
					<div class="p-6">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
									<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
									</svg>
								</div>
							</div>
							<div class="ml-4">
								<h3 class="text-lg font-medium text-gray-900">Settings</h3>
								<p class="text-sm text-gray-500">Configure site settings</p>
							</div>
						</div>
						<div class="mt-4">
							<button class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
								Site Settings
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>