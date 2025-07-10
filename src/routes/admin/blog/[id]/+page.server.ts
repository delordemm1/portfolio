import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { uploadToR2, validateImageFile, deleteFromR2, getR2KeyFromUrl } from '$lib/server/r2';
import { v4 as uuidv4 } from 'uuid';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const user = requireLogin();
	
	const [post] = await db
		.select()
		.from(table.blogPost)
		.where(eq(table.blogPost.id, params.id));

	if (!post) {
		throw error(404, 'Blog post not found');
	}

	const blocks = await db
		.select()
		.from(table.blogBlock)
		.where(eq(table.blogBlock.postId, params.id))
		.orderBy(table.blogBlock.order);

	return { user, post, blocks };
};

export const actions: Actions = {
	update: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const postId = event.params.id;
		const title = formData.get('title');
		const slug = formData.get('slug');
		const manualSummary = formData.get('manualSummary');
		const status = formData.get('status');
		const featuredImageFile = formData.get('featuredImage') as File;
		const removeFeaturedImage = formData.get('removeFeaturedImage') === 'true';

		// Validation
		if (!title || typeof title !== 'string' || title.trim().length === 0) {
			return fail(400, { message: 'Blog post title is required' });
		}

		if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
			return fail(400, { message: 'Blog post slug is required' });
		}

		// Validate slug format (URL-friendly)
		if (!/^[a-z0-9-]+$/.test(slug.trim())) {
			return fail(400, { message: 'Slug must contain only lowercase letters, numbers, and hyphens' });
		}

		if (!status || (status !== 'draft' && status !== 'published')) {
			return fail(400, { message: 'Invalid status' });
		}

		try {
			// Get current post data
			const [currentPost] = await db
				.select()
				.from(table.blogPost)
				.where(eq(table.blogPost.id, postId));

			if (!currentPost) {
				return fail(404, { message: 'Blog post not found' });
			}

			let featuredImageUrl = currentPost.featuredImage;

			// Handle featured image removal
			if (removeFeaturedImage && currentPost.featuredImage) {
				const r2Key = getR2KeyFromUrl(currentPost.featuredImage);
				if (r2Key) {
					await deleteFromR2(r2Key);
				}
				featuredImageUrl = null;
			}

			// Handle new featured image upload
			if (featuredImageFile && featuredImageFile.size > 0) {
				const validation = validateImageFile(featuredImageFile);
				if (!validation.valid) {
					return fail(400, { message: validation.error });
				}

				// Delete old featured image if it exists and we're uploading a new one
				if (currentPost.featuredImage && !removeFeaturedImage) {
					const r2Key = getR2KeyFromUrl(currentPost.featuredImage);
					if (r2Key) {
						await deleteFromR2(r2Key);
					}
				}

				// Upload new featured image
				const fileExtension = featuredImageFile.name.split('.').pop() || 'jpg';
				const fileName = `blog/${uuidv4()}.${fileExtension}`;
				featuredImageUrl = await uploadToR2(featuredImageFile, fileName);
			}

			// Update blog post in database
			await db
				.update(table.blogPost)
				.set({
					title: title.trim(),
					slug: slug.trim(),
					manualSummary: manualSummary && typeof manualSummary === 'string' ? manualSummary.trim() || null : null,
					featuredImage: featuredImageUrl,
					status: status as 'draft' | 'published',
					updatedAt: new Date()
				})
				.where(eq(table.blogPost.id, postId));

			return redirect(302, '/admin/blog');
		} catch (error) {
			console.error('Error updating blog post:', error);
			return fail(500, { message: 'Failed to update blog post' });
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