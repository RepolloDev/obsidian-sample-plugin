import esbuild from 'esbuild';
import { builtinModules } from 'node:module';
import type { BuildOptions } from 'esbuild';
import { PROD_PATH } from '@config/utils/constant';

type Options = {
    outDir?: BuildOptions['outfile'];
    watch?: boolean;
};

async function builder(opt: Options) {
    const { outDir, watch } = opt;
    const finalOutfile = (outDir || PROD_PATH) + '/main.js';

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
        sourcemap: false,
        minify: true,
        outfile: finalOutfile,
        // sourcemap: 'inline',
        // outfile: '../dist/main.js',
        // minify: true,
    });

    if (watch) {
        console.log('Watching for changes...');
        await context.watch();
    } else {
        console.log('Building artifacts...');
        await context.rebuild();
        await context.dispose();
    }
}

export default builder;

if (import.meta.main) {
    await builder({});
}
