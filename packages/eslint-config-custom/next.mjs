import turboConfig from 'eslint-config-turbo/flat'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'

// This is a custom ESLint configuration to work around the buggy eslint-config-next@16.
// It includes basic TypeScript and React rules.
const eslintConfig = tseslint.config(
    ...turboConfig,
    ...tseslint.configs.recommended,

    // Ignore .next folder
    {
        ignores: ['.next/**/*', 'node_modules/**/*', 'dist/**/*', 'build/**/*', 'out/**/*'],
    },

    // React rules
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
        plugins: { react: reactPlugin },
        languageOptions: {
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/no-unescaped-entities': 'off',
        },
        settings: { react: { version: 'detect' } },
    },

    // Allow require() in js/cjs files
    {
        files: ['**/*.{js,cjs}'],
        rules: { '@typescript-eslint/no-require-imports': 'off' },
    },

    // Prettier last
    eslintConfigPrettier,
)

export default eslintConfig

