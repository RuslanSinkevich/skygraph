import { test } from '@playwright/test'
import { gotoHash, runAxe, type A11yPage } from './_lib'

/**
 * A11y matrix for `examples/demo` (React). Pages are picked to cover the
 * different rendering shapes the library has to get right:
 *
 * • Landing       — marketing copy + skip-links.
 * • Form / Table  — interactive widgets and grid semantics (the
 *                   biggest source of a11y bugs in component libs).
 * • Tree          — virtualized listbox semantics.
 * • Charts        — SVG with `role="img"` + `<title>` / `<desc>`.
 * • Showcases     — composite app screen, exercises Header + Sidebar +
 *                   ARIA landmarks together.
 *
 * The list is intentionally short: each axe run walks ~all of the DOM, so
 * adding pages is cheap in test code but expensive in CI minutes. Trim or
 * extend this list, do not loop the entire route table — see the smoke
 * spec for "every-route-must-mount" coverage.
 */
const PAGES: A11yPage[] = [
  { hash: '', label: 'landing' },
  { hash: 'components/form', label: 'components/form' },
  { hash: 'components/table', label: 'components/table' },
  { hash: 'components/tree', label: 'components/tree' },
  { hash: 'components/charts', label: 'components/charts' },
  { hash: 'showcases', label: 'showcases' },
]

test.describe('a11y · demo (React)', () => {
  for (const target of PAGES) {
    test(`axe WCAG 2.1 AA · ${target.label}`, async ({ page }, testInfo) => {
      await page.goto('./')
      await gotoHash(page, target.hash)
      await runAxe(page, target.label, testInfo)
    })
  }
})
