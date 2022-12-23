// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-netlify';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

const config = {
	kit: {
		adapter: adapter()
	},

	extensions: ['.svelte', '.md'],

	// Consult https://github.com/sveltejs/svelte-preprocess
	preprocess: [
		sveltePreprocess({
			postcss: true
		}),
		mdsvex({
			extensions: ['.md']
		})
	],

	vitePlugin: {
		experimental: {
		  inspector: true,
		},
	  },
};

export default config;
