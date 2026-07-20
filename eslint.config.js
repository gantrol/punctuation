import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
	{
		ignores: [
			'.svelte-kit/**',
			'build/**',
			'node_modules/**',
			'package/**',
			'playwright-report/**',
			'test-results/**'
		]
	},
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	{
		languageOptions: {
			ecmaVersion: 2024,
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	}
];
