import { defineConfig } from 'eslint/config';
import tsparser from '@typescript-eslint/parser';
import globals from 'globals';
import { globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';

export default defineConfig(
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parser: tsparser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    },
    prettier,
    globalIgnores(['node_modules', 'config/**/*.ts'])
);
