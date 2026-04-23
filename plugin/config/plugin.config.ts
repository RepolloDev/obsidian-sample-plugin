import { defineConfig } from '@config/utils/manifest';

export default defineConfig({
    id: 'obsidian-plugin',
    name: 'Obsidian Plugin',
    version: '1.0.10',
    description: 'A plugin for Obsidian',
    author: 'RepolloDev',
    authorUrl: 'https://github.com/RepolloDev',
    fundingUrl: 'https://github.com/sponsors/RepolloDev',
    minAppVersion: '0.22.0',
    isDesktopOnly: false,
});
