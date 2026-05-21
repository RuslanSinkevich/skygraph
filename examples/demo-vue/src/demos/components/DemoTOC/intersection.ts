import { onScopeDispose, watch, type Ref } from 'vue'

import type { DemoTOCItem } from './types'

/**
 * Top viewport band that *doesn't* count as "active" — anything above
 * this offset is considered already scrolled past. Tuned for the
 * sticky AppShell header (56px) plus a small visual buffer.
 *
 * Byte-equivalent port of the React TOC's intersection band.
 */
const ROOT_MARGIN_TOP = '-15%'
const ROOT_MARGIN_BOTTOM = '-70%'
const ROOT_MARGIN = `${ROOT_MARGIN_TOP} 0% ${ROOT_MARGIN_BOTTOM} 0%`

/**
 * Wires an IntersectionObserver to every registered DemoBox and pushes
 * the currently most-relevant id into the provider state.
 *
 * "Most relevant" = the visible section whose top is closest to the
 * viewport top inside the active band defined by `ROOT_MARGIN`. The
 * observer respects `isManualScrollRef`: while a programmatic scroll
 * is in flight (after a TOC click) we ignore its updates so the
 * highlight doesn't strobe through intermediate sections.
 */
export function useActiveSection(
  items: Ref<readonly DemoTOCItem[]>,
  activeId: Ref<string | null>,
  setActiveId: (id: string | null) => void,
  isManualScrollRef: { readonly current: boolean },
) {
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

  let observer: IntersectionObserver | null = null
  const visible = new Map<string, IntersectionObserverEntry>()

  function tearDown() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    visible.clear()
  }

  watch(
    items,
    (current) => {
      tearDown()
      if (current.length === 0) return
      if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return

      observer = new IntersectionObserver(
        (entries) => {
          if (isManualScrollRef.current) return

          for (const entry of entries) {
            const id = entry.target.id
            if (!id) continue
            if (entry.isIntersecting) {
              visible.set(id, entry)
            } else {
              visible.delete(id)
            }
          }

          if (visible.size === 0) return

          let bestId: string | null = null
          let bestTop = Number.POSITIVE_INFINITY
          for (const entry of visible.values()) {
            const top = entry.boundingClientRect.top
            if (top < bestTop) {
              bestTop = top
              bestId = entry.target.id
            }
          }
          if (bestId) setActiveId(bestId)
        },
        { rootMargin: ROOT_MARGIN, threshold: [0, 1] },
      )

      for (const item of current) {
        observer.observe(item.element)
      }
    },
    { immediate: true },
  )

  onScopeDispose(tearDown)
}
