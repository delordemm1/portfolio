import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [post] = await db
		.select()
		.from(table.blogPost)
		.where(eq(table.blogPost.slug, params.slug));

	if (!post || post.status !== 'published') {
		throw error(404, 'Blog post not found');
	}

	const blocks = await db
		.select()
		.from(table.blogBlock)
		.where(eq(table.blogBlock.postId, post.id))
		.orderBy(table.blogBlock.order);

	return { post, blocks };
};