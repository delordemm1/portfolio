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
	
	const [project] = await db
		.select()
		.from(table.project)
		.where(eq(table.project.id, params.id));

	if (!project) {
		throw error(404, 'Project not found');
	}

	return { user, project };
};

export const actions: Actions = {
	update: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const projectId = event.params.id;
		const name = formData.get('name');
		const shortDescription = formData.get('shortDescription');
		const optionalLink = formData.get('optionalLink');
		const fullDescription = formData.get('fullDescription');
		const extraDetails = formData.get('extraDetails');
		const status = formData.get('status');
		const imageFile = formData.get('image') as File;
		const removeImage = formData.get('removeImage') === 'true';

		// Validation
		if (!name || typeof name !== 'string' || name.trim().length === 0) {
			return fail(400, { message: 'Project name is required' });
		}

		if (!status || (status !== 'draft' && status !== 'published')) {
			return fail(400, { message: 'Invalid status' });
		}

		try {
			// Get current project data
			const [currentProject] = await db
				.select()
				.from(table.project)
				.where(eq(table.project.id, projectId));

			if (!currentProject) {
				return fail(404, { message: 'Project not found' });
			}

			let imageUrl = currentProject.image;

			// Handle image removal
			if (removeImage && currentProject.image) {
				const r2Key = getR2KeyFromUrl(currentProject.image);
				if (r2Key) {
					await deleteFromR2(r2Key);
				}
				imageUrl = null;
			}

			// Handle new image upload
			if (imageFile && imageFile.size > 0) {
				const validation = validateImageFile(imageFile);
				if (!validation.valid) {
					return fail(400, { message: validation.error });
				}

				// Delete old image if it exists and we're uploading a new one
				if (currentProject.image && !removeImage) {
					const r2Key = getR2KeyFromUrl(currentProject.image);
					if (r2Key) {
						await deleteFromR2(r2Key);
					}
				}

				// Upload new image
				const fileExtension = imageFile.name.split('.').pop() || 'jpg';
				const fileName = `projects/${uuidv4()}.${fileExtension}`;
				imageUrl = await uploadToR2(imageFile, fileName);
			}

			// Update project in database
			await db
				.update(table.project)
				.set({
					name: name.trim(),
					image: imageUrl,
					shortDescription: shortDescription && typeof shortDescription === 'string' ? shortDescription.trim() || null : null,
					optionalLink: optionalLink && typeof optionalLink === 'string' ? optionalLink.trim() || null : null,
					fullDescription: fullDescription && typeof fullDescription === 'string' ? fullDescription.trim() || null : null,
					extraDetails: extraDetails && typeof extraDetails === 'string' ? extraDetails.trim() || null : null,
					status: status as 'draft' | 'published',
					updatedAt: new Date()
				})
				.where(eq(table.project.id, projectId));

			return redirect(302, '/admin/projects');
		} catch (error) {
			console.error('Error updating project:', error);
			return fail(500, { message: 'Failed to update project' });
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