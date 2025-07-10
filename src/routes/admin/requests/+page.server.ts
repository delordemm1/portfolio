import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	
	// Fetch all contact submissions and feedback submissions
	const [contactSubmissions, feedbackSubmissions] = await Promise.all([
		db.select().from(table.contactSubmission).orderBy(table.contactSubmission.createdAt),
		db.select().from(table.feedbackSubmission).orderBy(table.feedbackSubmission.createdAt)
	]);

	return { 
		user, 
		contactSubmissions: contactSubmissions.reverse(), // Most recent first
		feedbackSubmissions: feedbackSubmissions.reverse() // Most recent first
	};
};

export const actions: Actions = {
	deleteContact: async (event) => {
		requireLogin();
		
		const formData = await event.request.formData();
		const submissionId = formData.get('id');

		if (!submissionId || typeof submissionId !== 'string') {
			return fail(400, { message: 'Invalid submission ID' });
		}

		try {
			await db.delete(table.contactSubmission).where(eq(table.contactSubmission.id, submissionId));
			return { success: true, message: 'Contact submission deleted successfully' };
		} catch (error) {
			console.error('Error deleting contact submission:', error);
			return fail(500, { message: 'Failed to delete contact submission' });
		}
	},

	deleteFeedback: async (event) => {
		requireLogin();
		
		const formData = await event.request.formData();
		const submissionId = formData.get('id');

		if (!submissionId || typeof submissionId !== 'string') {
			return fail(400, { message: 'Invalid submission ID' });
		}

		try {
			await db.delete(table.feedbackSubmission).where(eq(table.feedbackSubmission.id, submissionId));
			return { success: true, message: 'Feedback submission deleted successfully' };
		} catch (error) {
			console.error('Error deleting feedback submission:', error);
			return fail(500, { message: 'Failed to delete feedback submission' });
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