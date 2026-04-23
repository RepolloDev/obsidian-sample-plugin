import { file, write } from 'bun';
import { PROD_PATH, DEV_PATH } from '@config/utils/constant';
import config from '@config/plugin.config';

type Mode = 'production' | 'development';

export async function syncVersions(mode: Mode) {
    const PERSISTENT_PATH = import.meta.dir + '/version-data.json';
    const outDir = mode === 'production' ? PROD_PATH : DEV_PATH;
    const VERSIONS_PATH = (outDir || PROD_PATH) + '/versions.json';
    let versions: Record<string, string> = {};

    const f = file(PERSISTENT_PATH);
    if (await f.exists()) {
        try {
            versions = await f.json();
        } catch {
            versions = {};
        }
    }

    versions[config.version] = config.minAppVersion;

    await write(PERSISTENT_PATH, JSON.stringify(versions, null, 2));
    await write(VERSIONS_PATH, JSON.stringify(versions, null, 2));
}

if (import.meta.main) {
    const args = process.argv.slice(2);
    const mode = args.includes('--dev') ? 'development' : 'production';
    await syncVersions(mode);
}
