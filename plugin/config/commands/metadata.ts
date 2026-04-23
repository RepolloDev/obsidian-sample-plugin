import { write } from 'bun';
import { PROD_PATH, DEV_PATH } from '@config/utils/constant';
import { validateConfig } from '@config/utils/manifest';
import pluginConfig from '@config/plugin.config';

type Mode = 'development' | 'production';

export function buildManifest(mode: Mode) {
    const outDir = mode === 'production' ? PROD_PATH : DEV_PATH;
    const isValid = validateConfig(pluginConfig);
    if (!isValid) {
        throw new Error('Invalid plugin configuration');
    }
    const manifestPath = `${outDir}/manifest.json`;
    write(manifestPath, JSON.stringify(pluginConfig, null, 2));
}

if (import.meta.main) {
    const args = process.argv.slice(2);
    const mode = args.includes('--dev') ? 'development' : 'production';

    buildManifest(mode);
}
