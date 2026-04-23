import { defineConfig } from '@plugin-utils/manifest';

export default defineConfig({
    id: 'obsidian-plugin',
    name: 'Obsidian Plugin',
    version: '1.0.5',
    description: 'A plugin for Obsidian',
    author: 'RepolloDev',
    authorUrl: 'https://github.com/RepolloDev',
    fundingUrl: 'https://github.com/sponsors/RepolloDev',
    minAppVersion: '0.20.0',
    isDesktopOnly: false,
});
