import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const blogPosts = await db
		.select()
		.from(table.blogPost)
		.where(eq(table.blogPost.status, 'published'))
		.orderBy(table.blogPost.updatedAt);

	return { blogPosts };
};