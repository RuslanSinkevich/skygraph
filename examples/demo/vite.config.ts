import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/skygraph/',
  plugins: [react()],
  resolve: {
    alias: {
      '@skygraph/core': path.resolve(__dirname, '../../packages/core/src/index.ts'),
      '@skygraph/react': path.resolve(__dirname, '../../packages/react/src/index.ts'),
      '@skygraph/react/styles': path.resolve(__dirname, '../../packages/react/styles/index.css'),
    },
  },
})
