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
  base: '/vue/showcases/',
  plugins: [vue()],
  define: {
    __SKYGRAPH_VUE_VERSION__: JSON.stringify(publicPackageJson.version),
  },
  resolve: {
    alias: {
      '@skygraph/core': path.resolve(__dirname, '../../packages/core/src/index.ts'),
      '@skygraph/vue': path.resolve(__dirname, '../../packages/vue/src/index.ts'),
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
    },
  },
  server: {
    port: 5175,
  },
})
