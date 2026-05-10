import { defineConfig } from '@playwright/test'

// SkyGraph a11y matrix: same demo apps as the smoke run, but each project
// loads only the matching `tests/a11y/<framework>.spec.ts`. We reuse the
// smoke webServer block so spinning up vite preview is centralised in one
// place (`playwright.config.ts`); when the smoke servers are already up
// `reuseExistingServer` lets the a11y run attach instead of relaunching.
//
// Why a separate config and not extend?
// `defineConfig` in Playwright is plain JSON-shape — there's no `extends`
// helper. Mirroring the relevant fields keeps both runs runnable in
// isolation (`playwright test` and `playwright test --config=...`) without
// implicit cross-file coupling.

const isCI = !!process.env.CI

export default defineConfig({
  testDir: 'tests/a11y',
  timeout: 90_000,
  expect: { timeout: 10_000 },

  // a11y scans walk a lot of DOM; serial execution matches the smoke run
  // and keeps memory + axe state predictable on shared machines.
  fullyParallel: false,
  workers: 1,
  retries: isCI ? 1 : 0,

  reporter: isCI
    ? [['github'], ['html', { open: 'never', outputFolder: 'playwright-a11y-report' }]]
    : [['list'], ['html', { open: 'never', outputFolder: 'playwright-a11y-report' }]],

  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
  },

  projects: [
    {
      name: 'react-demo',
      testMatch: /react\.spec\.ts$/,
      use: {
        baseURL: 'http://127.0.0.1:5173/skygraph/',
      },
    },
    {
      name: 'vue-demo',
      testMatch: /vue\.spec\.ts$/,
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
