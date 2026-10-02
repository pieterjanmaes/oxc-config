/**
 * Shared ESLint flat configs for the stylistic rules that oxlint does not cover.
 *
 * Projects spread the result into `withNuxt()` from `./.nuxt/eslint.config.mjs`.
 * `eslint-plugin-oxlint` goes last so every rule oxlint already runs is switched off in ESLint.
 */
import jsonc from 'eslint-plugin-jsonc';
import oxlint from 'eslint-plugin-oxlint';

/** @typedef {import('eslint').Linter.Config} Config */

/**
 * @param {object} [options]
 * @param {string[]} [options.ignores] Extra ignore globs, appended to the shared list.
 * @param {Record<string, unknown>} [options.rules] Extra rules applied to every file.
 * @param {Record<string, unknown>} [options.vueRules] Extra rules applied to `.vue` files only.
 * @returns {Config[]}
 */
export function eslintConfigs({ ignores = [], rules = {}, vueRules = {} } = {}) {
	return [
		{
			ignores: ['.nuxt/*', 'node_modules/*', '.data', '.wrangler', '.output', ...ignores]
		},
		...jsonc.configs['flat/recommended-with-json'],
		{
			files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
			rules: {
				'jsonc/indent': 'off'
			}
		},
		{
			files: ['**/tsconfig.json', '**/tsconfig.*.json', '**/wrangler.jsonc', '**/.vscode/*.json'],
			rules: {
				'jsonc/no-comments': 'off'
			}
		},
		{
			rules: {
				'nuxt/nuxt-config-keys-order': 'off',
				...rules
			}
		},
		{
			files: ['**/*.vue'],
			rules: {
				'vue/script-indent': ['error', 'tab', { baseIndent: 1, switchCase: 1 }],
				'vue/html-indent': ['error', 'tab'],
				indent: 'off',
				// oxfmt (printWidth 200) owns line-wrapping; the rule fights it, because
				// oxfmt collapses onto one line exactly what this rule splits apart.
				'vue/max-attributes-per-line': 'off',
				'vue/first-attribute-linebreak': [
					'error',
					{
						singleline: 'ignore',
						multiline: 'below'
					}
				],
				// oxfmt >=0.63 owns closing-bracket placement: it breaks `/>` onto its own
				// line for multiline tags, and pushes `>` down when the preceding
				// whitespace is significant (`</strong\n>?`). Any setting here fights it.
				'vue/html-closing-bracket-newline': 'off',
				// oxfmt writes void elements as `<br />`; the Nuxt default wants `<br >`.
				'vue/html-self-closing': ['warn', { html: { void: 'any' } }],
				'vue/attribute-hyphenation': ['error', 'never'],
				// oxfmt keeps short element content on one line (`<h3>Title</h3>`); this
				// rule demands a break around it, so oxfmt would just undo every fix.
				'vue/singleline-html-element-content-newline': 'off',
				...vueRules
			}
		},
		...oxlint.configs['flat/all']
	];
}

export default eslintConfigs;
