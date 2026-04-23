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

// Agregar validaciones con zod
import { z } from 'zod';

const PluginManifestSchema = z.object({
    id: z
        .string()
        .regex(
            /^[a-zA-Z0-9_-]+$/,
            'ID must only contain letters, numbers, hyphens, and underscores.'
        ),
    name: z.string(),
    version: z
        .string()
        .regex(
            /^\d+\.\d+\.\d+$/,
            'Version must follow semantic versioning (e.g., "1.0.0").'
        ),
    description: z.string(),
    author: z.string(),
    authorUrl: z.url(),
    fundingUrl: z.url().optional(),
    minAppVersion: z
        .string()
        .regex(
            /^\d+\.\d+\.\d+$/,
            'minAppVersion must follow semantic versioning (e.g., "0.20.0").'
        ),
    isDesktopOnly: z.boolean(),
});

export function validateConfig(config: unknown): PluginManifest {
    return PluginManifestSchema.parse(config);
}
