import process from 'process';
import { write } from 'bun';
import config from '../config.mts';
import { syncAppVersions } from './version-tracker.ts';

/**
 * Compiles and outputs the `manifest.json` and `versions.json` files based on the target environment.
 * @param isDev Whether the build is targeting development mode.
 */
export async function buildManifestFiles(isDev: boolean) {
    const outdir = isDev ? '../' : '../dist/';

    // Keeps a manifest copy in the root folder so eslint-plugin-obsidianmd can read it.
    const tempManifestDir = './';

    const versions = await syncAppVersions(config.version);
    const manifestData = JSON.stringify(config, null, 2);

    await write(`${outdir}manifest.json`, manifestData);
    if (!isDev) await write(`${tempManifestDir}manifest.json`, manifestData);
    await write(`${outdir}versions.json`, JSON.stringify(versions, null, 2));

    console.log(`✅ manifest.json -> ${outdir}`);
    console.log(`✅ versions.json -> ${outdir}`);
}

if (import.meta.main) {
    await buildManifestFiles(process.argv[2] === '--dev');
}
