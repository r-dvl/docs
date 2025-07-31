// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://r-dvl.ghcr.io',
	base: '/docs',
	output: 'static',
	integrations: [
		starlight({
			title: 'r-dvl | Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/r-dvl/' }],
			sidebar: [
				{
					label: 'General',
					autogenerate: { directory: 'general' },
				},
				{
					label: 'Projects',
					autogenerate: { directory: 'projects' },
				},
			],
		}),
	],
});
