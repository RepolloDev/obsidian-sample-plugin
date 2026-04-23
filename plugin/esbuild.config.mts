import esbuild from 'esbuild';
import process from 'process';
import { builtinModules } from 'node:module';
import type { BuildOptions } from 'esbuild';

interface Option {
    type?: 'production' | 'development';
    outfile: BuildOptions['outfile'];
    sourcemap: BuildOptions['sourcemap'];
    minify: BuildOptions['minify'];
}

function OPT(arg: unknown): Option {
    const OPTIONS: Record<'--prod' | '--dev' | 'default', Option> = {
        '--prod': {
            type: 'production',
            outfile: '../dist/main.js',
            sourcemap: false,
            minify: true,
        },
        '--dev': {
            type: 'development',
            outfile: '../main.js',
            sourcemap: 'inline',
            minify: false,
        },
        default: {
            type: 'production',
            outfile: '../dist/main.js',
            sourcemap: 'inline',
            minify: true,
        },
    } as const;

    if (typeof arg === 'string' && arg in OPTIONS) {
        return OPTIONS[arg as keyof typeof OPTIONS];
    } else {
        return OPTIONS.default;
    }
}

export async function buildPlugin(isDev: boolean = false) {
    const arg = isDev ? '--dev' : '--prod';

    const { outfile, sourcemap, minify, type } = OPT(arg);

    const context = await esbuild.context({
        entryPoints: ['src/main.ts'],
        bundle: true,
        external: [
            'obsidian',
            'electron',
            '@codemirror/autocomplete',
            '@codemirror/collab',
            '@codemirror/commands',
            '@codemirror/language',
            '@codemirror/lint',
            '@codemirror/search',
            '@codemirror/state',
            '@codemirror/view',
            '@lezer/common',
            '@lezer/highlight',
            '@lezer/lr',
            ...builtinModules,
        ],
        format: 'cjs',
        target: 'es2018',
        logLevel: 'info',
        treeShaking: true,
        sourcemap,
        outfile,
        minify,
    });

    if (type === 'production') {
        console.log('Production build initialized.');
        await context.rebuild();
        // process.exit() handled by caller if needed
    } else {
        console.log('Development build initialized.');
        await context.watch();
    }
}

if (import.meta.main) {
    await buildPlugin(process.argv.includes('--dev'));
    if (!process.argv.includes('--dev')) process.exit(0);
}
