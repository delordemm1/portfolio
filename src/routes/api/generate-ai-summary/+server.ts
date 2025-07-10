import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { title, manualSummary } = await request.json();

		if (!title || typeof title !== 'string') {
			throw error(400, 'Title is required');
		}

		// Check if required environment variables are set
		if (!env.CLOUDFLARE_ACCOUNT_ID || !env.CLOUDFLARE_API_TOKEN) {
			throw error(500, 'Cloudflare AI configuration is missing');
		}

		// Construct the prompt for AI summary generation
		const prompt = `Please write a concise, engaging summary for a blog post with the following details:

Title: ${title}
${manualSummary ? `Manual Summary: ${manualSummary}` : ''}

Generate a professional summary that would be suitable for SEO meta descriptions and social media sharing. Keep it between 120-160 characters and make it compelling for readers. Focus on the key value and main points of the article.

Summary:`;

		// Make request to Cloudflare AI
		const aiResponse = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${env.CLOUDFLARE_AI_MODEL || '@cf/meta/llama-2-7b-chat-int8'}`,
			{
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					messages: [
						{
							role: 'user',
							content: prompt
						}
					],
					max_tokens: 150,
					temperature: 0.7
				})
			}
		);

		if (!aiResponse.ok) {
			const errorText = await aiResponse.text();
			console.error('Cloudflare AI API error:', errorText);
			throw error(500, 'Failed to generate AI summary');
		}

		const aiData = await aiResponse.json();
		
		// Extract the generated summary from the response
		let aiSummary = '';
		if (aiData.result && aiData.result.response) {
			aiSummary = aiData.result.response.trim();
		} else if (aiData.result && aiData.result.choices && aiData.result.choices[0]) {
			aiSummary = aiData.result.choices[0].message?.content?.trim() || '';
		} else {
			throw error(500, 'Unexpected AI response format');
		}

		// Clean up the summary (remove any "Summary:" prefix if present)
		aiSummary = aiSummary.replace(/^Summary:\s*/i, '').trim();

		// Ensure the summary is not too long
		if (aiSummary.length > 200) {
			aiSummary = aiSummary.substring(0, 197) + '...';
		}

		return json({ aiSummary });
	} catch (err) {
		console.error('Error generating AI summary:', err);
		if (err instanceof Error && err.message.includes('fetch')) {
			throw error(500, 'Failed to connect to AI service');
		}
		throw error(500, 'Failed to generate AI summary');
	}
};