/**
 * Repository-wide constants surfaced on the demo Landing page.
 *
 * These numbers are not auto-tracked: they are bumped by hand whenever
 * a new round closes. Keeping them in `_shared` lets every example app
 * (demo, showcases, future demo-vue / demo-angular) read the same value
 * without duplicating literals across the codebase.
 *
 * Last verified: round 12 (single-commit `@skygraph/styles` extract,
 * 1013 active tests after round 11).
 */

/** Number of styled UI components shipped from `@skygraph/react`. */
export const COMPONENT_COUNT = 78

/** Active vitest cases across `core` + `react` (excluding bench-gated). */
export const TEST_COUNT = 1013

/**
 * Domain engines in `@skygraph/core`:
 * `form` / `table` / `tree` / `virtual` / `graph` / `calendar`.
 */
export const ENGINE_COUNT = 6

/** Showcases in `examples/showcases/src/showcases/`. */
export const SHOWCASE_COUNT = 12

/**
 * Hosted SkyGraph showcases entry-point. Until a public hosting target
 * is in place, this points at the GitHub source — opens in a new tab so
 * we don't break SPA navigation when the user clicks "Browse showcases"
 * from the demo Landing.
 */
export const SHOWCASES_URL =
  'https://github.com/RuslanSinkevich/skygraph-public/tree/master/examples/showcases'

/** Documentation entry-point used from the showcases AppShell. */
export const DEMO_URL = '../demo/'

/** GitHub repo entry — used in Header / Footer links. */
export const GITHUB_URL = 'https://github.com/RuslanSinkevich/skygraph-public'

/** Telegram contact of the author — used in Footer links. */
export const TELEGRAM_URL = 'https://t.me/ruslansinkevich'
