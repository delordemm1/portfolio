import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';
import { v7 } from 'uuid';

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

		// Cloudflare Turnstile validation
		const turnstileToken = formData.get('cf-turnstile-response');
		if (!turnstileToken || typeof turnstileToken !== 'string') {
			return fail(400, { message: 'Please complete the CAPTCHA verification' });
		}

		// Verify Turnstile token
		if (env.TURNSTILE_SECRET_KEY) {
			try {
				const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: new URLSearchParams({
						secret: env.TURNSTILE_SECRET_KEY,
						response: turnstileToken,
					}),
				});

				const turnstileResult = await turnstileResponse.json();
				if (!turnstileResult.success) {
					return fail(400, { message: 'CAPTCHA verification failed. Please try again.' });
				}
			} catch (error) {
				console.error('Turnstile verification error:', error);
				return fail(500, { message: 'CAPTCHA verification failed. Please try again.' });
			}
		}

		try {
			// Store the feedback submission in the database
			const submissionId = v7();
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
