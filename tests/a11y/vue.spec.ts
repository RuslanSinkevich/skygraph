import { test } from '@playwright/test'
import { gotoHash, runAxe, type A11yPage } from './_lib'

/**
 * A11y matrix for `examples/demo-vue`. Same shape and rule set as the
 * React spec — see `react.spec.ts` for the reasoning behind page choice
 * and the WCAG 2.1 AA bar.
 *
 * The Vue demo is "catching up" with the React demo (per CHARTER §2), so
 * not every key route is guaranteed to exist yet. We still hit them by
 * hash; missing routes fall back to the landing page in `App.vue`'s
 * router which is itself a valid axe target — the test will scan
 * whatever DOM is rendered. If a route is genuinely broken (no app shell
 * mounted), the smoke spec catches that, this spec stays focused on
 * accessibility regressions of the *rendered* content.
 */
const PAGES: A11yPage[] = [
  { hash: '', label: 'landing' },
  { hash: 'components/form', label: 'components/form' },
  { hash: 'components/table', label: 'components/table' },
  { hash: 'components/tree', label: 'components/tree' },
  { hash: 'components/charts', label: 'components/charts' },
]

test.describe('a11y · demo-vue', () => {
  for (const target of PAGES) {
    test(`axe WCAG 2.1 AA · ${target.label}`, async ({ page }, testInfo) => {
      await page.goto('./')
      await gotoHash(page, target.hash)
      await runAxe(page, target.label, testInfo)
    })
  }
})
