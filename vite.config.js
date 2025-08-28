import { defineConfig } from 'vite';
import htmlMinifier from 'vite-plugin-html-minifier';
import { glob } from 'glob';
import { resolve, dirname } from 'path';

// Find all index.html files within the blog/posts/ subdirectories.
const blogPostFiles = glob.sync('blog/posts/**/index.html');

const input = {
  main: resolve(__dirname, 'index.html'),
  blog: resolve(__dirname, 'blog/index.html'),
  ...blogPostFiles.reduce((acc, file) => {
    // Create a clean name like "blog/posts/001-the-no-code-tech-stack-101"
    const name = dirname(file);
    acc[name] = resolve(__dirname, file);
    return acc;
  }, {})
};

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    htmlMinifier(),
  ],
  // The base path for the project. This is necessary for GitHub Pages
  // deployment, as the site will be served from a subdirectory.
  base: '/myPortfolio/',

  // The directory where the build output will be placed.
  build: {
    outDir: 'dist',
    // This ensures the dist directory is cleared on each build.
    emptyOutDir: true,
    // Minify settings
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      input,
    },
  },

  // The directory for static assets that are copied directly.
  publicDir: 'public',
});