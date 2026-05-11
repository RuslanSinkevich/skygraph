import angular from '@analogjs/vite-plugin-angular'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['__tests__/setup.ts'],
    include: ['__tests__/**/*.test.ts'],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
})
