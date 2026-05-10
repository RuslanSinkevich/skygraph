import { defineConfig } from '@playwright/test'

// SkyGraph smoke matrix: 2 demo apps × Chromium × hash routes.
//
// • `demo` (React)   — vite preview at :5173, base "/skygraph/" from
//   examples/demo/vite.config.ts.
// • `demo-vue`       — vite preview at :5174, root base.
//
// Both apps use hash-routing (`#/...`), so the smoke spec can collect
// every nav anchor once and replay it without page reloads.

const isCI = !!process.env.CI

export default defineConfig({
  testDir: 'tests/smoke',
  timeout: 60_000,
  expect: { timeout: 10_000 },

  fullyParallel: false,
  workers: 1,
  retries: isCI ? 1 : 0,

  reporter: isCI
    ? [['github'], ['html', { open: 'never', outputFolder: 'playwright-report' }]]
    : [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],

  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
  },

  projects: [
    {
      name: 'demo',
      testMatch: /demo\.spec\.ts$/,
      use: {
        baseURL: 'http://127.0.0.1:5173/skygraph/',
      },
    },
    {
      name: 'demo-vue',
      testMatch: /demo-vue\.spec\.ts$/,
      use: {
        baseURL: 'http://127.0.0.1:5174/',
      },
    },
  ],

  webServer: [
    {
      command: 'pnpm --filter demo exec vite preview --port 5173 --strictPort --host 127.0.0.1',
      url: 'http://127.0.0.1:5173/skygraph/',
      timeout: 120_000,
      reuseExistingServer: !isCI,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'pnpm --filter demo-vue exec vite preview --port 5174 --strictPort --host 127.0.0.1',
      url: 'http://127.0.0.1:5174/',
      timeout: 120_000,
      reuseExistingServer: !isCI,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  ],
})
