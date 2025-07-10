import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { uploadToR2, validateImageFile } from '$lib/server/r2';
import { v4 as uuidv4 } from 'uuid';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	return { user };
};

export const actions: Actions = {
	create: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const name = formData.get('name');
		const shortDescription = formData.get('shortDescription');
		const optionalLink = formData.get('optionalLink');
		const fullDescription = formData.get('fullDescription');
		const extraDetails = formData.get('extraDetails');
		const status = formData.get('status');
		const imageFile = formData.get('image') as File;

		// Validation
		if (!name || typeof name !== 'string' || name.trim().length === 0) {
			return fail(400, { message: 'Project name is required' });
		}

		if (!status || (status !== 'draft' && status !== 'published')) {
			return fail(400, { message: 'Invalid status' });
		}

		let imageUrl: string | null = null;

		// Handle image upload if provided
		if (imageFile && imageFile.size > 0) {
			const validation = validateImageFile(imageFile);
			if (!validation.valid) {
				return fail(400, { message: validation.error });
			}

			try {
				const fileExtension = imageFile.name.split('.').pop() || 'jpg';
				const fileName = `projects/${uuidv4()}.${fileExtension}`;
				imageUrl = await uploadToR2(imageFile, fileName);
			} catch (error) {
				console.error('Error uploading image:', error);
				return fail(500, { message: 'Failed to upload image' });
			}
		}

		try {
			const projectId = generateProjectId();
			
			await db.insert(table.project).values({
				id: projectId,
				name: name.trim(),
				image: imageUrl,
				shortDescription: shortDescription && typeof shortDescription === 'string' ? shortDescription.trim() || null : null,
				optionalLink: optionalLink && typeof optionalLink === 'string' ? optionalLink.trim() || null : null,
				fullDescription: fullDescription && typeof fullDescription === 'string' ? fullDescription.trim() || null : null,
				extraDetails: extraDetails && typeof extraDetails === 'string' ? extraDetails.trim() || null : null,
				status: status as 'draft' | 'published'
			});

			return redirect(302, '/admin/projects');
		} catch (error) {
			console.error('Error creating project:', error);
			return fail(500, { message: 'Failed to create project' });
		}
	}
};

function generateProjectId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

function requireLogin() {
	const { locals } = getRequestEvent();

	if (!locals.user) {
		return redirect(302, '/admin/login');
	}

	return locals.user;
}