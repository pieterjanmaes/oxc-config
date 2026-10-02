/**
 * Shared ESLint flat configs for the stylistic rules that oxlint does not cover.
 *
 * Projects spread the result into `withNuxt()` from `./.nuxt/eslint.config.mjs`.
 * `eslint-plugin-oxlint` goes last and switches off, in ESLint, exactly the rules oxlint runs.
 * It reads the resolved oxlint config (`oxlint` option), so pass the same object the project
 * exports from `oxlint.config.ts` to keep the two in sync. Without it the shared base is used.
 */
import jsonc from 'eslint-plugin-jsonc';
import oxlintPlugin from 'eslint-plugin-oxlint';

import { base as oxlintBase } from './oxlint.js';

/** @typedef {import('eslint').Linter.Config} Config */

/**
 * The plugin set oxc-nuxt's `withNuxt()` applies when a config declares none.
 * Used only when a project does not pass its resolved oxlint config.
 */
const { buildFromOxlintConfig } = oxlintPlugin;

const nuxtDefaultPlugins = ['typescript', 'oxc', 'import', 'vue', 'promise'];

/**
 * @param {object} [options]
 * @param {string[]} [options.ignores] Extra ignore globs, appended to the shared list.
 * @param {Record<string, unknown>} [options.rules] Extra rules applied to every file.
 * @param {Record<string, unknown>} [options.vueRules] Extra rules applied to `.vue` files only.
 * @param {import('oxlint').OxlintConfig} [options.oxlint] The project's resolved oxlint config.
 * @returns {Config[]}
 */
export function eslintConfigs({ ignores = [], rules = {}, vueRules = {}, oxlint } = {}) {
	const oxlintConfig = oxlint ?? { ...oxlintBase, plugins: nuxtDefaultPlugins };
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
				// oxfmt breaks a start tag's `>` onto its own line at attribute depth when the
				// following whitespace is significant (`<a ...\n\t>text</a\n>`), so the bracket
				// of a start or self-closing tag is expected one level deeper than the element.
				'vue/html-indent': ['error', 'tab', { closeBracket: { startTag: 1, endTag: 0, selfClosingTag: 1 } }],
				indent: 'off',
				// oxfmt (printWidth 120, singleAttributePerLine) owns attribute wrapping;
				// this rule would fight it.
				'vue/max-attributes-per-line': 'off',
				'vue/first-attribute-linebreak': [
					'error',
					{
						singleline: 'ignore',
						multiline: 'below'
					}
				],
				// oxfmt owns closing-bracket placement (bracketSameLine). Any setting here fights it.
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
		...buildFromOxlintConfig(oxlintConfig, { typeAware: true })
	];
}

export default eslintConfigs;
