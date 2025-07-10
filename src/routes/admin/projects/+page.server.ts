import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { deleteFromR2, getR2KeyFromUrl } from '$lib/server/r2';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	
	const projects = await db
		.select()
		.from(table.project)
		.orderBy(table.project.updatedAt);

	return { user, projects };
};

export const actions: Actions = {
	delete: async (event) => {
		requireLogin();
		
		const formData = await event.request.formData();
		const projectId = formData.get('id');

		if (!projectId || typeof projectId !== 'string') {
			return fail(400, { message: 'Invalid project ID' });
		}

		try {
			// Get the project to find the image URL
			const [project] = await db
				.select()
				.from(table.project)
				.where(eq(table.project.id, projectId));

			if (!project) {
				return fail(404, { message: 'Project not found' });
			}

			// Delete image from R2 if it exists
			if (project.image) {
				const r2Key = getR2KeyFromUrl(project.image);
				if (r2Key) {
					await deleteFromR2(r2Key);
				}
			}

			// Delete project from database
			await db.delete(table.project).where(eq(table.project.id, projectId));

			return { success: true, message: 'Project deleted successfully' };
		} catch (error) {
			console.error('Error deleting project:', error);
			return fail(500, { message: 'Failed to delete project' });
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