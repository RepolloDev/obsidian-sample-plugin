import { PROD_PATH, DEV_PATH } from '@config/utils/constant';
import { join } from 'node:path';
import { unlink } from 'node:fs/promises';

const TARGET_FILES = [
    'main.js',
    'styles.css',
    'manifest.json',
    'versions.json',
    'data.json',
];

type Mode = 'production' | 'development';

export async function cleanArtifacts(mode: Mode) {
    const outDir = mode === 'production' ? PROD_PATH : DEV_PATH;

    for (const artifact of TARGET_FILES) {
        const filePath = join(outDir, artifact);
        try {
            await unlink(filePath);
            console.log(`🗑️  Removed ${artifact}`);
        } catch (error: any) {
            if (error.code !== 'ENOENT') {
                console.error(`Failed to remove ${artifact}:`, error.message);
            }
        }
    }
}

if (import.meta.main) {
    const args = process.argv.slice(2);
    const mode = args.includes('--dev') ? 'development' : 'production';

    await cleanArtifacts(mode);
}
