import { fail } from '@sveltejs/kit';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	submit: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const company = formData.get('company');
		const subject = formData.get('subject');
		const message = formData.get('message');
		const budget = formData.get('budget');
		const timeline = formData.get('timeline');

		// Validation
		if (!name || typeof name !== 'string' || name.trim().length === 0) {
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

		if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
			return fail(400, { message: 'Subject is required' });
		}

		if (!message || typeof message !== 'string' || message.trim().length === 0) {
			return fail(400, { message: 'Message is required' });
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
			// Store the contact form submission in the database
			const submissionId = generateId();
			await db.insert(table.contactSubmission).values({
				id: submissionId,
				name: name.trim(),
				email: email.trim(),
				company: company && typeof company === 'string' ? company.trim() : null,
				subject: subject.trim(),
				message: message.trim(),
				budget: budget && typeof budget === 'string' ? budget.trim() : null,
				timeline: timeline && typeof timeline === 'string' ? timeline.trim() : null,
			});

			return { success: true, message: 'Thank you for your message! I\'ll get back to you soon.' };
		} catch (error) {
			console.error('Error processing contact form:', error);
			return fail(500, { message: 'Something went wrong. Please try again later.' });
		}
	}
};

function generateId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}