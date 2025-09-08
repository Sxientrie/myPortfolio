import { defineConfig } from 'vite';
import htmlMinifier from 'vite-plugin-html-minifier';
import { glob } from 'glob';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

const htmlFiles = glob.sync('blog/**/*.html');

const input = {
  main: resolve(__dirname, 'index.html'),
  ...htmlFiles.reduce((acc, file) => {
    const name = file.replace('.html', '');
    acc[name] = resolve(__dirname, file);
    return acc;
  }, {})
};

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
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
