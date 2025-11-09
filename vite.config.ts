import { defineConfig } from 'vite';
import { config } from 'dotenv';

config();

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: 'src/main.ts',
      },
      output: {
        entryFileNames: 'niconico.js',
        format: 'cjs', // CommonJS形式に変更
      },
      external: ['discord.js', 'dotenv', 'node-html-parser'],
    },
  },
  define: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'process.env': process.env,
  },
});
