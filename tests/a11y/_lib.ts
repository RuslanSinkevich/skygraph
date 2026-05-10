import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, type TestInfo } from '@playwright/test'

/**
 * Shared accessibility helpers for the SkyGraph a11y matrix.
 *
 * The runner contract is: each spec drives the SPA hash router to a list of
 * "key" pages (Home, Forms, Table, Tree, Chart, …) and calls `runAxe(page)`
 * on every stop. `runAxe` walks the page with `@axe-core/playwright` using
 * WCAG 2.1 AA rules, fails the test only on `critical` / `serious` impacts
 * (per T-Quality task card §3), and attaches the full report — including
 * moderate/minor warnings — to the Playwright HTML report so a human
 * reviewer can triage the long tail without breaking the bar.
 */

export interface A11yPage {
  /** Hash route without leading `#/`. Use empty string for the landing page. */
  hash: string
  /** Human label that ends up in the test title and the attached report. */
  label: string
}

const BLOCKING_IMPACTS = new Set(['critical', 'serious'])

export async function runAxe(page: Page, label: string, testInfo: TestInfo): Promise<void> {
  // WCAG 2.1 AA is what real-world audits cite (Section 508, EN 301 549,
  // EAA). Using the canonical tag list keeps the bar consistent between
  // the React and Vue projects without per-app overrides.
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()

  await testInfo.attach(`axe-${slug(label)}.json`, {
    body: JSON.stringify(
      {
        url: results.url,
        timestamp: results.timestamp,
        violations: results.violations,
        incomplete: results.incomplete,
      },
      null,
      2,
    ),
    contentType: 'application/json',
  })

  const blocking = results.violations.filter((v) => v.impact && BLOCKING_IMPACTS.has(v.impact))

  if (blocking.length > 0) {
    const lines = blocking.map(
      (v) =>
        `[${v.impact}] ${v.id}: ${v.help} (${v.helpUrl})\n  nodes: ${v.nodes
          .slice(0, 3)
          .map((n) => n.target.join(' '))
          .join(' | ')}`,
    )
    expect
      .soft(blocking, `axe critical/serious violations on ${label}:\n${lines.join('\n')}`)
      .toEqual([])
  }
}

/**
 * Drive the SPA hash router without a full page reload. Returns once the
 * `hashchange` listener has had a chance to flush React/Vue state. Empty
 * `hash` resets the location to the landing page.
 */
export async function gotoHash(page: Page, hash: string): Promise<void> {
  if (hash === '') {
    await page.evaluate(() => {
      window.location.hash = ''
    })
  } else {
    const target = hash.startsWith('#') ? hash : `#/${hash}`
    await page.evaluate((h) => {
      window.location.hash = h
    }, target)
  }
  // Hash routers re-render synchronously, but the framework still needs a
  // microtask + a frame for portals/menus to finish mounting before axe
  // can see them. 80ms is comfortable on CI without blowing the budget.
  await page.waitForTimeout(80)
}

function slug(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'page'
  )
}
