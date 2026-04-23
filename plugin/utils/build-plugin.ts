import process from 'process';
import { buildManifestFiles } from './build-manifest.ts';
import { buildPlugin } from '../esbuild.config.mts';
import { unlink } from 'node:fs/promises';

const args = process.argv.slice(2);
const isDev = args.includes('--dev');

const onlyManifest = args.includes('--manifest');
const onlyPlugin = args.includes('--plugin');

const runBoth = !onlyManifest && !onlyPlugin;

async function main() {
    const targetEnv = isDev ? 'Dev' : 'Prod';

    if (onlyManifest || runBoth) {
        console.log(`\n📦 Building Manifest (${targetEnv})...`);
        await buildManifestFiles(isDev);
    }

    if (onlyPlugin || runBoth) {
        console.log(`\n🛠️  Building Plugin (${targetEnv})...`);
        await buildPlugin(isDev);
    }

    if (!isDev) {
        // Eslint temporary manifest cleanup
        try {
            await unlink('./manifest.json');
        } catch {}
        process.exit(0);
    }
}

main().catch((err) => {
    console.error('Build Failed:', err);
    process.exit(1);
});
