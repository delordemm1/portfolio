import { fail } from '@sveltejs/kit';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	submit: async ({ request }) => {
		const formData = await request.formData();
		const clientName = formData.get('clientName');
		const email = formData.get('email');
		const company = formData.get('company');
		const projectName = formData.get('projectName');
		const rating = formData.get('rating');
		const feedback = formData.get('feedback');
		const improvements = formData.get('improvements');
		const recommend = formData.get('recommend');
		const testimonialPermission = formData.get('testimonialPermission');

		// Validation
		if (!clientName || typeof clientName !== 'string' || clientName.trim().length === 0) {
			return fail(400, { message: 'Name is required' });
		}

		if (!email || typeof email !== 'string' || email.trim().length === 0) {
			return fail(400, { message: 'Email is required' });
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email.trim())) {
			return fail(400, { message: 'Please enter a valid email address' });
		}

		if (!projectName || typeof projectName !== 'string' || projectName.trim().length === 0) {
			return fail(400, { message: 'Project name is required' });
		}

		if (!rating || typeof rating !== 'string') {
			return fail(400, { message: 'Please provide a rating' });
		}

		if (!feedback || typeof feedback !== 'string' || feedback.trim().length === 0) {
			return fail(400, { message: 'Feedback is required' });
		}

		// TODO: Add Cloudflare Turnstile validation here
		// const turnstileToken = formData.get('cf-turnstile-response');
		// if (!turnstileToken) {
		//   return fail(400, { message: 'Please complete the CAPTCHA' });
		// }

		try {
			// Store the feedback submission in the database
			const submissionId = generateId();
			await db.insert(table.feedbackSubmission).values({
				id: submissionId,
				clientName: clientName.trim(),
				email: email.trim(),
				company: company && typeof company === 'string' ? company.trim() : null,
				projectName: projectName.trim(),
				rating: parseInt(rating),
				feedback: feedback.trim(),
				improvements: improvements && typeof improvements === 'string' ? improvements.trim() : null,
				recommend: recommend && typeof recommend === 'string' ? recommend : null,
				testimonialPermission: testimonialPermission && typeof testimonialPermission === 'string' ? testimonialPermission : null
			});

			return { success: true, message: 'Thank you for your valuable feedback! I really appreciate it.' };
		} catch (error) {
			console.error('Error processing feedback form:', error);
			return fail(500, { message: 'Something went wrong. Please try again later.' });
		}
	}
};

function generateId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}