import tseslint from 'typescript-eslint'

// This is a custom ESLint configuration for non-Next.js packages.
const eslintConfig = tseslint.config(
    // Base TypeScript rules
    ...tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
)

export default eslintConfig