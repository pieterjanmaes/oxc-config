/**
 * Shared oxlint configuration for Nuxt 4 projects.
 *
 * Projects wrap this with oxc-nuxt's `withNuxt()` (from `./.nuxt/oxlint.mjs`), which injects the
 * Nuxt auto-import globals and the default plugin set, so `globals` and `plugins` are omitted here.
 * Stylistic rules are intentionally omitted: ESLint (via @nuxt/eslint) owns those, see `./eslint.js`.
 *
 * oxlint's own `extends` only merges `rules`, `plugins` and `overrides`, so `oxlintConfig()` below
 * merges the remaining keys (`env`, `categories`, `globals`, `ignorePatterns`, `jsPlugins`) itself.
 */

/** @type {import('oxlint').OxlintConfig} */
export const base = {
	jsPlugins: ['@nuxt/eslint-plugin'],
	categories: {
		correctness: 'off'
	},
	env: {
		builtin: true,
		browser: true,
		es2024: true,
		node: true
	},
	ignorePatterns: [
		'**/.output',
		'**/.data',
		'**/.nuxt',
		'**/.nitro',
		'**/.cache',
		'**/dist',
		'**/node_modules',
		'**/logs',
		'**/*.log',
		'**/.DS_Store',
		'**/.fleet',
		'**/.idea',
		'**/.env',
		'**/.env.*',
		'!**/.env.example',
		'**/localhost-key.pem',
		'**/localhost.pem',
		'**/.wrangler',
		'**/.dev.vars',
		'**/.claude',
		'**/.vercel',
		'**/.netlify',
		'**/public'
	],
	rules: {
		'constructor-super': 'error',
		'for-direction': 'error',
		'no-async-promise-executor': 'error',
		'no-case-declarations': 'error',
		'no-class-assign': 'error',
		'no-compare-neg-zero': 'error',
		'no-cond-assign': 'error',
		'no-const-assign': 'error',
		'no-constant-binary-expression': 'error',
		'no-constant-condition': 'error',
		'no-control-regex': 'error',
		'no-debugger': 'error',
		'no-delete-var': 'error',
		'no-dupe-class-members': 'error',
		'no-dupe-else-if': 'error',
		'no-dupe-keys': 'error',
		'no-duplicate-case': 'error',
		'no-empty': 'error',
		'no-empty-character-class': 'error',
		'no-empty-pattern': 'error',
		'no-empty-static-block': 'error',
		'no-ex-assign': 'error',
		'no-extra-boolean-cast': 'error',
		'no-fallthrough': 'error',
		'no-func-assign': 'error',
		'no-global-assign': 'error',
		'no-import-assign': 'error',
		'no-invalid-regexp': 'error',
		'no-irregular-whitespace': 'error',
		'no-loss-of-precision': 'error',
		'no-misleading-character-class': 'error',
		'no-new-native-nonconstructor': 'error',
		'no-nonoctal-decimal-escape': 'error',
		'no-obj-calls': 'error',
		'no-prototype-builtins': 'error',
		'no-redeclare': 'error',
		'no-regex-spaces': 'error',
		'no-self-assign': 'error',
		'no-setter-return': 'error',
		'no-shadow-restricted-names': 'error',
		'no-sparse-arrays': 'error',
		'no-this-before-super': 'error',
		'no-unexpected-multiline': 'error',
		'no-unsafe-finally': 'error',
		'no-unsafe-negation': 'error',
		'no-unsafe-optional-chaining': 'error',
		'no-unused-labels': 'error',
		'no-unused-private-class-members': 'error',
		'no-unused-vars': 'error',
		'no-useless-backreference': 'error',
		'no-useless-catch': 'error',
		'no-useless-escape': 'error',
		'no-with': 'error',
		'require-yield': 'error',
		'use-isnan': 'error',
		'valid-typeof': 'error',
		'import/first': 'error',
		'import/no-duplicates': 'error',
		'import/no-mutable-exports': 'error',
		'import/no-named-default': 'error',
		'@nuxt/prefer-import-meta': 'error',
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					{
						group: ['~/*', '~~/*'],
						message: 'Use the @ alias (@/ for app, @@/ for the project root) instead of ~.'
					}
				]
			}
		]
	},
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.vue'],
			rules: {
				'constructor-super': 'off',
				'no-class-assign': 'off',
				'no-const-assign': 'off',
				'no-dupe-class-members': 'off',
				'no-dupe-keys': 'off',
				'no-func-assign': 'off',
				'no-import-assign': 'off',
				'no-new-native-nonconstructor': 'off',
				'no-obj-calls': 'off',
				'no-redeclare': 'off',
				'no-setter-return': 'off',
				'no-this-before-super': 'off',
				'no-unsafe-negation': 'off',
				'no-var': 'error',
				'no-with': 'off',
				'prefer-const': 'error',
				'prefer-rest-params': 'error',
				'prefer-spread': 'error',
				'no-array-constructor': 'error',
				'no-unused-expressions': 'error',
				'no-unused-vars': [
					'error',
					{
						args: 'after-used',
						argsIgnorePattern: '^_',
						ignoreRestSiblings: true,
						vars: 'all',
						varsIgnorePattern: '^_'
					}
				],
				'no-useless-constructor': 'error',
				'valid-typeof': 'off',
				'typescript/ban-ts-comment': 'off',
				'typescript/no-duplicate-enum-values': 'error',
				'typescript/no-empty-object-type': 'error',
				'typescript/no-explicit-any': 'off',
				'typescript/no-extra-non-null-assertion': 'error',
				'typescript/no-misused-new': 'error',
				'typescript/no-namespace': 'error',
				'typescript/no-non-null-asserted-optional-chain': 'error',
				'typescript/no-require-imports': 'error',
				'typescript/no-this-alias': 'error',
				'typescript/no-unnecessary-type-constraint': 'error',
				'typescript/no-unsafe-declaration-merging': 'error',
				'typescript/no-unsafe-function-type': 'error',
				'typescript/no-wrapper-object-types': 'error',
				'typescript/prefer-as-const': 'error',
				'typescript/prefer-namespace-keyword': 'error',
				'typescript/triple-slash-reference': 'error',
				'typescript/no-dynamic-delete': 'error',
				'typescript/no-extraneous-class': 'error',
				'typescript/no-invalid-void-type': 'error',
				'typescript/no-non-null-asserted-nullish-coalescing': 'error',
				'typescript/no-non-null-assertion': 'off',
				'typescript/prefer-literal-enum-member': 'error',
				'typescript/unified-signatures': 'error',
				'typescript/consistent-type-imports': [
					'error',
					{
						disallowTypeAnnotations: false,
						prefer: 'type-imports'
					}
				],
				'typescript/no-import-type-side-effects': 'error'
			},
			plugins: ['typescript']
		},
		{
			files: ['**/*.vue'],
			rules: {
				'vue/no-arrow-functions-in-watch': 'error',
				'vue/no-deprecated-destroyed-lifecycle': 'error',
				'vue/no-export-in-script-setup': 'error',
				'vue/no-lifecycle-after-await': 'error',
				'vue/prefer-import-from-vue': 'error',
				'vue/valid-define-emits': 'error',
				'vue/valid-define-props': 'error',
				'vue/no-multiple-slot-args': 'warn',
				'vue/no-required-prop-with-default': 'warn'
			},
			plugins: ['vue']
		},
		{
			files: ['app/pages/**/*.{js,ts,jsx,tsx,vue}'],
			rules: {
				'@nuxt/no-page-meta-runtime-values': 'error'
			},
			jsPlugins: ['@nuxt/eslint-plugin']
		},
		{
			files: ['**/.config/nuxt.?([cm])[jt]s?(x)', '**/nuxt.config.?([cm])[jt]s?(x)'],
			rules: {
				'@nuxt/no-nuxt-config-test-key': 'error'
			},
			jsPlugins: ['@nuxt/eslint-plugin']
		}
	]
};

/**
 * Merge project overrides into the shared base.
 * Arrays (`ignorePatterns`, `overrides`, `jsPlugins`) are appended, objects (`rules`, `env`,
 * `categories`, `globals`, `settings`) are shallow-merged, and anything else replaces the base value.
 *
 * @param {import('oxlint').OxlintConfig} [overrides]
 * @returns {import('oxlint').OxlintConfig}
 */
export function oxlintConfig(overrides = {}) {
	return {
		...base,
		...overrides,
		jsPlugins: unique([...(base.jsPlugins ?? []), ...(overrides.jsPlugins ?? [])]),
		categories: { ...base.categories, ...overrides.categories },
		env: { ...base.env, ...overrides.env },
		globals: { ...base.globals, ...overrides.globals },
		settings: { ...base.settings, ...overrides.settings },
		ignorePatterns: [...(base.ignorePatterns ?? []), ...(overrides.ignorePatterns ?? [])],
		rules: { ...base.rules, ...overrides.rules },
		overrides: [...(base.overrides ?? []), ...(overrides.overrides ?? [])]
	};
}

/** @template T @param {T[]} list @returns {T[]} */
function unique(list) {
	return [...new Set(list)];
}

export default base;
