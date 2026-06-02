import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { readFileSync } from 'node:fs'

// Read the version of the public meta-package (`skygraph-react`) so the
// footer always shows the version a consumer would actually install via
// `npm install skygraph-react`. Hardcoding it in App.tsx would drift
// every time we bump the package; this read happens once at build time.
const publicPackageJson = JSON.parse(
  readFileSync(path.resolve(__dirname, '../../packages/skygraph-react/package.json'), 'utf8'),
) as { version: string }

export default defineConfig({
  base: '/react/',
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  plugins: [react(), vue()],
  define: {
    __SKYGRAPH_REACT_VERSION__: JSON.stringify(publicPackageJson.version),
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'vue'],
    alias: {
      '@skygraph/core': path.resolve(__dirname, '../../packages/core/src/index.ts'),
      '@skygraph/react': path.resolve(__dirname, '../../packages/react/src/index.ts'),
      '@skygraph/vue': path.resolve(__dirname, '../../packages/vue/src/index.ts'),
      // @skygraph/styles is consumed as plain CSS via pnpm workspace symlink
      // (no source vs dist distinction; vite resolves the package's "main"
      // -> packages/styles/index.css automatically).
    },
  },
})
