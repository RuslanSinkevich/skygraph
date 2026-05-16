import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/react/showcases/',
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@skygraph/core': path.resolve(__dirname, '../../packages/core/src/index.ts'),
      '@skygraph/react': path.resolve(__dirname, '../../packages/react/src/index.ts'),
      // @skygraph/styles is consumed as plain CSS via pnpm workspace symlink
      // (no source vs dist distinction; vite resolves the package's "main"
      // -> packages/styles/index.css automatically).
    },
  },
})
