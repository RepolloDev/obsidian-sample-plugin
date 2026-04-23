/**
 * Defines the required fields for an Obsidian plugin manifest.
 * Maps directly to the plugin's `manifest.json`.
 */
export interface PluginManifest {
    id: string;
    name: string;
    version: string;
    description: string;
    author: string;
    authorUrl: string;
    fundingUrl?: string;
    minAppVersion: string;
    isDesktopOnly: boolean;
}

/**
 * Helper to define the plugin manifest with native type support.
 * @param config Plugin manifest properties.
 */
export function defineConfig(config: PluginManifest): PluginManifest {
    return config;
}
