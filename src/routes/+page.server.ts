import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Fetch the 3 most recent published blog posts
	const recentBlogPosts = await db
		.select()
		.from(table.blogPost)
		.where(eq(table.blogPost.status, 'published'))
		.orderBy(table.blogPost.updatedAt)
		.limit(3);

	// Fetch the 6 most recent published projects
	const featuredProjects = await db
		.select()
		.from(table.project)
		.where(eq(table.project.status, 'published'))
		.orderBy(table.project.updatedAt)
		.limit(6);

	return {
		recentBlogPosts,
		featuredProjects
	};
};