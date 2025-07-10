import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	try {
		// Fetch all published blog posts and projects
		const [blogPosts, projects] = await Promise.all([
			db.select({
				slug: table.blogPost.slug,
				updatedAt: table.blogPost.updatedAt
			}).from(table.blogPost).where(eq(table.blogPost.status, 'published')),
			
			db.select({
				id: table.project.id,
				updatedAt: table.project.updatedAt
			}).from(table.project).where(eq(table.project.status, 'published'))
		]);

		const baseUrl = url.origin;
		const currentDate = new Date().toISOString();

		// Static pages
		const staticPages = [
			{ url: '', priority: '1.0', changefreq: 'weekly' },
			{ url: '/about', priority: '0.8', changefreq: 'monthly' },
			{ url: '/projects', priority: '0.9', changefreq: 'weekly' },
			{ url: '/blog', priority: '0.9', changefreq: 'daily' },
			{ url: '/contact', priority: '0.7', changefreq: 'monthly' },
			{ url: '/feedback', priority: '0.6', changefreq: 'monthly' },
			{ url: '/resume', priority: '0.8', changefreq: 'monthly' }
		];

		// Build sitemap XML
		let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

		// Add static pages
		for (const page of staticPages) {
			sitemap += `
	<url>
		<loc>${baseUrl}${page.url}</loc>
		<lastmod>${currentDate}</lastmod>
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>
	</url>`;
		}

		// Add blog posts
		for (const post of blogPosts) {
			sitemap += `
	<url>
		<loc>${baseUrl}/blog/${post.slug}</loc>
		<lastmod>${post.updatedAt.toISOString()}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.7</priority>
	</url>`;
		}

		// Add projects
		for (const project of projects) {
			sitemap += `
	<url>
		<loc>${baseUrl}/projects/${project.id}</loc>
		<lastmod>${project.updatedAt.toISOString()}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.8</priority>
	</url>`;
		}

		sitemap += `
</urlset>`;

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'max-age=3600' // Cache for 1 hour
			}
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);
		return new Response('Error generating sitemap', { status: 500 });
	}
};