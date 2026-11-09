import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
    // Static HTML export, served by GitHub Pages at https://dosepehr.github.io/.
    output: 'export',
    trailingSlash: true,
    reactStrictMode: true,
    images: { unoptimized: true },
    experimental: {
        // The site's CSS is compiled from the synced, gitignored foundation/
        // folder. Turbopack's persistent dev cache doesn't notice those files
        // changing between sessions, so a restart could serve stale styles
        // (e.g. a class the library just added). Dev starts are still fast.
        turbopackFileSystemCacheForDev: false,
    },
};

export default withMDX(config);
