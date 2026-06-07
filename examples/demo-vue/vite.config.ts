import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicPackageJson = JSON.parse(
  readFileSync(path.resolve(__dirname, '../../packages/skygraph-vue/package.json'), 'utf8'),
) as { version: string }

export default defineConfig({
  base: '/vue/',
  plugins: [vue()],
  define: {
    __SKYGRAPH_VUE_VERSION__: JSON.stringify(publicPackageJson.version),
  },
  resolve: {
    alias: {
      '@skygraph/core': path.resolve(__dirname, '../../packages/core/src/index.ts'),
      '@skygraph/vue': path.resolve(__dirname, '../../packages/vue/src/index.ts'),
      // Sub-path aliases MUST come before the bare-name alias — Vite
      // matches `alias` entries top-to-bottom, so the more specific
      // patterns have to win first. Without these, `shared/tokens`
      // would resolve to `shared/src/index.ts/tokens` (file-not-found).
      '@skygraph-examples/shared/tokens': path.resolve(__dirname, '../_shared/src/tokens/index.ts'),
      '@skygraph-examples/shared/constants/stats': path.resolve(
        __dirname,
        '../_shared/src/constants/stats.ts',
      ),
      '@skygraph-examples/shared/parsers/changelog': path.resolve(
        __dirname,
        '../_shared/src/parsers/changelog.ts',
      ),
      '@skygraph-examples/shared/parsers/todo': path.resolve(
        __dirname,
        '../_shared/src/parsers/todo.ts',
      ),
      '@skygraph-examples/shared/types/changelog': path.resolve(
        __dirname,
        '../_shared/src/types/changelog.ts',
      ),
      '@skygraph-examples/shared/types/todo': path.resolve(
        __dirname,
        '../_shared/src/types/todo.ts',
      ),
      '@skygraph-examples/shared': path.resolve(__dirname, '../_shared/src/index.ts'),
      '@skygraph-examples/shared-vue/layout/styles.css': path.resolve(
        __dirname,
        '../_shared-vue/src/layout/styles.css',
      ),
      '@skygraph-examples/shared-vue/layout': path.resolve(
        __dirname,
        '../_shared-vue/src/layout/index.ts',
      ),
      '@skygraph-examples/shared-vue': path.resolve(__dirname, '../_shared-vue/src/index.ts'),
      'showcases-vue': path.resolve(__dirname, '../showcases-vue/src'),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
  },
  preview: {
    port: 4174,
    strictPort: true,
  },
})
