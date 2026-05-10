import { test, expect } from '@playwright/test'
import { captureRuntimeErrors, collectHashRoutes, expectAppMounted, navigateHash } from './_lib'

const MOUNT = '#app'

test.describe('demo-vue smoke', () => {
  test('every advertised hash route mounts without runtime errors', async ({ page }) => {
    const errors = captureRuntimeErrors(page)

    await page.goto('./')
    await expectAppMounted(page, MOUNT)

    const routes = await collectHashRoutes(page)
    expect(routes.length, 'no #/ routes discovered on the landing page').toBeGreaterThan(0)

    for (const route of routes) {
      await navigateHash(page, route)
      await expectAppMounted(page, MOUNT)
    }

    expect(errors, `runtime errors during smoke run:\n${errors.join('\n')}`).toEqual([])
  })
})
