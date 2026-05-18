import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    dts({
      // Emit one .d.ts that re-exports `@skygraph/vue`. We deliberately do
      // NOT roll types here: api-extractor sometimes fails on Vue SFC
      // composables, and a meta-package doesn't need the full surface
      // inlined — consumers resolve `@skygraph/vue` types through the
      // workspace dependency.
      rollupTypes: false,
      tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
      include: ['src/**/*.ts'],
    }),
  ],
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
      external: ['vue', '@skygraph/core', '@skygraph/vue', '@skygraph/styles'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
