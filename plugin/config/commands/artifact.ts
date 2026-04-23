import builder from '@config/esbuild.config';
import { PROD_PATH, DEV_PATH } from '@config/utils/constant';

type Mode = 'production' | 'development';

export async function buildArtifacts(mode: Mode, watch = false) {
    const outDir = mode === 'production' ? PROD_PATH : DEV_PATH;
    await builder({
        outDir,
        watch,
    });
}

if (import.meta.main) {
    const args = process.argv.slice(2);
    const mode = args.includes('--dev') ? 'development' : 'production';
    const watch = mode === 'development';

    await buildArtifacts(mode, watch);
}
