import { onScopeDispose, watch, type Ref } from 'vue'

import type { DemoTOCItem } from './types'

/**
 * Distance from the viewport top (in px) at which a section is
 * considered "the one being read". A section becomes active once its
 * top edge scrolls above this line; the *last* section whose top has
 * crossed it wins. Tuned a bit below the sticky AppShell header (56px)
 * so a section lights up when its heading sits in the comfortable
 * reading band near the top — not while it's still in the lower half of
 * the screen, and never while it has already scrolled far out of view.
 *
 * Byte-equivalent port of the React TOC's active-line tracker.
 */
const ACTIVE_LINE_PX = 200

/**
 * Picks the active section id for the current scroll position.
 *
 * Rule: the active section is the *last* one whose top edge is at or
 * above the {@link ACTIVE_LINE_PX} line. This is deterministic and
 * matches what the eye reads — the section currently sitting under the
 * header — instead of "the visible box with the smallest top", which
 * could pick a box already scrolled far past the top.
 *
 * Two edge cases:
 *   • Nothing has crossed the line yet (page is near the very top) →
 *     fall back to the first item so the panel always highlights
 *     something.
 *   • The page is scrolled to the bottom → force-activate the last
 *     item, because a short trailing section may never reach the line.
 */
function computeActiveId(items: readonly DemoTOCItem[]): string | null {
  if (items.length === 0) return null

  // Bottom-of-page guard: when we can't scroll any further, the last
  // section is what the user is looking at even if its top never made
  // it up to the active line.
  const scrollBottom = window.scrollY + window.innerHeight
  const docHeight = document.documentElement.scrollHeight
  if (scrollBottom >= docHeight - 2) {
    return items[items.length - 1].id
  }

  const viewportHeight = window.innerHeight
  let activeId = items[0].id
  // Track the bottom edge of the current candidate so we can tell whether it
  // is still on screen or has already scrolled past the top.
  let activeBottom = Number.POSITIVE_INFINITY
  for (const item of items) {
    const rect = item.element.getBoundingClientRect()
    if (rect.top <= ACTIVE_LINE_PX) {
      activeId = item.id
      activeBottom = rect.bottom
    } else {
      // First section below the active line. If the chosen candidate has
      // already scrolled fully above the viewport (its bottom is off the top
      // edge), the reader is actually looking at this upcoming section — as
      // long as it has entered the viewport. Switch to it so the panel never
      // highlights a section that is no longer visible.
      if (activeBottom <= 0 && rect.top < viewportHeight) {
        return item.id
      }
      // Items are in DOM order, so once one is below the line every
      // following item is below it too — stop scanning.
      break
    }
  }
  return activeId
}

/**
 * Tracks the active section against scroll position and pushes it into
 * the provider state.
 *
 * Uses a throttled scroll/resize listener (one update per animation
 * frame) rather than an IntersectionObserver: the "last section above a
 * fixed line" rule needs precise top coordinates, which a rAF-batched
 * `getBoundingClientRect` sweep gives directly and predictably.
 *
 * Respects `isManualScrollRef`: while a programmatic scroll is in
 * flight (after a TOC click) we skip updates so the highlight doesn't
 * strobe through intermediate sections.
 */
export function useActiveSection(
  items: Ref<readonly DemoTOCItem[]>,
  activeId: Ref<string | null>,
  setActiveId: (id: string | null) => void,
  isManualScrollRef: { readonly current: boolean },
) {
  // Default-active = first item, but only when nothing else won (e.g.
  // on first paint, before the first scroll sweep has run).
  watch(
    items,
    (current) => {
      if (current.length === 0) {
        if (activeId.value !== null) setActiveId(null)
        return
      }
      if (!activeId.value || !current.some((it) => it.id === activeId.value)) {
        setActiveId(current[0].id)
      }
    },
    { immediate: true },
  )

  let frame = 0
  let scroll: (() => void) | null = null
  let resize: (() => void) | null = null

  function teardown() {
    if (scroll) window.removeEventListener('scroll', scroll)
    if (resize) window.removeEventListener('resize', resize)
    if (frame !== 0) window.cancelAnimationFrame(frame)
    frame = 0
    scroll = null
    resize = null
  }

  watch(
    items,
    (current) => {
      teardown()
      if (current.length === 0) return
      if (typeof window === 'undefined') return

      const update = () => {
        frame = 0
        if (isManualScrollRef.current) return
        const next = computeActiveId(current)
        if (next) setActiveId(next)
      }

      const schedule = () => {
        if (frame !== 0) return
        frame = window.requestAnimationFrame(update)
      }

      // Initial sweep so the highlight is correct on mount / deep-link.
      schedule()

      scroll = schedule
      resize = schedule
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
    },
    { immediate: true },
  )

  onScopeDispose(teardown)
}
