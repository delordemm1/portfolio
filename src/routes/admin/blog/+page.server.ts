import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { deleteFromR2, getR2KeyFromUrl } from '$lib/server/r2';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	
	const blogPosts = await db
		.select()
		.from(table.blogPost)
		.orderBy(table.blogPost.updatedAt);

	return { user, blogPosts };
};

export const actions: Actions = {
	delete: async (event) => {
		requireLogin();
		
		const formData = await event.request.formData();
		const postId = formData.get('id');

		if (!postId || typeof postId !== 'string') {
			return fail(400, { message: 'Invalid post ID' });
		}

		try {
			// Get the blog post to find the featured image URL
			const [post] = await db
				.select()
				.from(table.blogPost)
				.where(eq(table.blogPost.id, postId));

			if (!post) {
				return fail(404, { message: 'Blog post not found' });
			}

			// Get all blocks to delete any images
			const blocks = await db
				.select()
				.from(table.blogBlock)
				.where(eq(table.blogBlock.postId, postId));

			// Delete images from R2
			const imagesToDelete = [];
			
			// Add featured image if it exists
			if (post.featuredImage) {
				const r2Key = getR2KeyFromUrl(post.featuredImage);
				if (r2Key) imagesToDelete.push(r2Key);
			}

			// Add block images
			for (const block of blocks) {
				if (block.type === 'image') {
					try {
						const content = JSON.parse(block.content);
						if (content.url) {
							const r2Key = getR2KeyFromUrl(content.url);
							if (r2Key) imagesToDelete.push(r2Key);
						}
					} catch (e) {
						console.error('Error parsing block content:', e);
					}
				}
			}

			// Delete all images from R2
			for (const key of imagesToDelete) {
				try {
					await deleteFromR2(key);
				} catch (e) {
					console.error('Error deleting image from R2:', e);
				}
			}

			// Delete blog post (blocks will be deleted automatically due to cascade)
			await db.delete(table.blogPost).where(eq(table.blogPost.id, postId));

			return { success: true, message: 'Blog post deleted successfully' };
		} catch (error) {
			console.error('Error deleting blog post:', error);
			return fail(500, { message: 'Failed to delete blog post' });
		}
	}
};

function requireLogin() {
	const { locals } = getRequestEvent();

	if (!locals.user) {
		return redirect(302, '/admin/login');
	}

	return locals.user;
}