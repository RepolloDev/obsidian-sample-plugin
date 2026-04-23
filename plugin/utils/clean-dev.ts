import { unlink } from 'node:fs/promises';
import { join } from 'node:path';

// Resolves to the workspace root directory
const ROOT_DIR = join(import.meta.dir, '../../');

const TARGET_FILES = [
    'main.js',
    'main.css',
    'manifest.json',
    'versions.json',
    'data.json',
    'styles.css',
];

/**
 * Removes generated development files from the project root.
 */
export async function cleanDevFiles() {
    console.log('\n🧹 Cleaning development files...');

    for (const filename of TARGET_FILES) {
        const filePath = join(ROOT_DIR, filename);
        try {
            await unlink(filePath);
            console.log(`🗑️  Removed ${filename}`);
        } catch (error: any) {
            if (error.code !== 'ENOENT') {
                console.error(`Failed to remove ${filename}:`, error.message);
            }
        }
    }

    console.log('✅ Clean complete.\n');
}

if (import.meta.main) {
    await cleanDevFiles();
}
