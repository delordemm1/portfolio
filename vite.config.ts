
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	// define: {
	// 	'import.meta.env.VITE_TURNSTILE_SITE_KEY': JSON.stringify(process.env.TURNSTILE_SITE_KEY)
	// }
});
