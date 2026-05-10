import { expect, type Page } from '@playwright/test'

/**
 * Hooks page-level error sinks. Returns the live error array — assert
 * it's empty at the end of the test.
 */
export function captureRuntimeErrors(page: Page): string[] {
  const errors: string[] = []

  page.on('pageerror', (e) => {
    errors.push(`[pageerror] ${e.message}`)
  })

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text()
      // Vite preview occasionally logs benign favicon 404s on demos
      // that don't ship one — silence only that exact pattern.
      if (text.includes('favicon') && text.includes('404')) return
      errors.push(`[console.error] ${text}`)
    }
  })

  page.on('response', (resp) => {
    const status = resp.status()
    if (status < 500) return
    const url = resp.url()
    if (!url.startsWith('http://127.0.0.1') && !url.startsWith('http://localhost')) return
    errors.push(`[5xx ${status}] ${url}`)
  })

  return errors
}

/**
 * Collect every in-app hash route anchored from the current page.
 * Filters out external links and `mailto:` / `javascript:` etc.
 */
export async function collectHashRoutes(page: Page): Promise<string[]> {
  const hrefs = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'))
      .map((a) => a.getAttribute('href') || '')
      .filter(
        (h) =>
          h.startsWith('#/') &&
          !h.includes('://') &&
          !h.startsWith('mailto:') &&
          !h.startsWith('javascript:'),
      ),
  )
  return Array.from(new Set(hrefs))
}

/**
 * Drive the SPA hash router without a full page reload. Returns once
 * the location reports the requested hash; calling code is responsible
 * for asserting the resulting render.
 */
export async function navigateHash(page: Page, hash: string): Promise<void> {
  const target = hash.startsWith('#') ? hash : `#${hash}`
  await page.evaluate((h) => {
    window.location.hash = h
  }, target)
  // Hash routers re-render synchronously on `hashchange`, but React /
  // Vue still need a microtask to flush. 50ms is comfortable on CI.
  await page.waitForTimeout(50)
}

/**
 * Asserts that the app's mount node is present and visible.
 */
export async function expectAppMounted(page: Page, mountSelector: string): Promise<void> {
  await expect(page.locator(mountSelector)).toBeVisible()
  await expect(page.locator(`${mountSelector} *`).first()).toBeVisible()
}
