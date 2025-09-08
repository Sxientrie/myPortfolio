import { defineConfig } from 'vite';
import htmlMinifier from 'vite-plugin-html-minifier';
import { glob } from 'glob';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

const blogHtmlFiles = glob.sync('**/*.html', { cwd: resolve(__dirname, 'blog') });

const input = {
  main: resolve(__dirname, 'index.html'),
  ...blogHtmlFiles.reduce((acc, file) => {
    // The key should mirror the file path to ensure Vite respects the directory structure.
    const name = `blog/${file}`;
    acc[name] = resolve(__dirname, 'blog', file);
    return acc;
  }, {})
};

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  const base = isBuild ? '/myPortfolio/' : '/';

  return {
    plugins: [
      handlebars({
        partialDirectory: resolve(__dirname, 'src/partials'),
        context: {
          baseUrl: base,
        },
      }),
      htmlMinifier(),
    ],
    base: base,

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
  };
});
