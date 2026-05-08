import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/__tests__/**'],
    }),
  ],
  resolve: {
    alias: {
      '@skygraph/core': path.resolve(__dirname, '../core/src/index.ts'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['vue', '@skygraph/core', '@skygraph/styles'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
