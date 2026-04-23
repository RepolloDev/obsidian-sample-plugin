import { file, write } from 'bun';
import config from '../config.mts';

const VERSIONS_PATH = import.meta.dir + '/versions.json';

/**
 * Syncs the current plugin version with the required app version.
 * @param pluginVersion The active plugin version.
 */
export async function syncAppVersions(pluginVersion: string) {
    const f = file(VERSIONS_PATH);
    let versions: Record<string, string> = {};

    if (await f.exists()) {
        try {
            versions = await f.json();
        } catch {
            versions = {};
        }
    }

    versions[pluginVersion] = config.minAppVersion;

    await write(VERSIONS_PATH, JSON.stringify(versions, null, 2));
    console.log(`✅ updated v${pluginVersion} -> App v${config.minAppVersion}`);

    return versions;
}

if (import.meta.main) {
    const versions = await syncAppVersions(config.version);
    console.log('Current version mappings:', versions);
}
