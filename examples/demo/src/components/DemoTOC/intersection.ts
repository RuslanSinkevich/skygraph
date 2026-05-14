import { useEffect } from 'react'

import type { DemoTOCItem } from './DemoTOCContext'

/**
 * Top viewport band that *doesn't* count as "active" — anything above
 * this offset is considered already scrolled past. Tuned for the
 * sticky AppShell header (56px) plus a small visual buffer.
 */
const ROOT_MARGIN_TOP = '-15%'
/**
 * Bottom band — anything below this point is "not yet reached". A
 * generous value avoids flipping the highlight onto a section the user
 * has only barely scrolled into.
 */
const ROOT_MARGIN_BOTTOM = '-70%'

const ROOT_MARGIN = `${ROOT_MARGIN_TOP} 0% ${ROOT_MARGIN_BOTTOM} 0%`

/**
 * Wires an IntersectionObserver to every registered DemoBox and pushes
 * the currently most-relevant id into the provider state.
 *
 * "Most relevant" = the visible section whose top is closest to the
 * viewport top inside the active band defined by `ROOT_MARGIN`. When
 * nothing is intersecting (e.g. on very tall sections that span the
 * whole band) we fall back to the last known active id rather than
 * clearing it — flipping to `null` mid-scroll feels broken.
 *
 * The observer respects `isManualScrollRef`: while a programmatic
 * scroll is in flight (after a TOC click) we ignore its updates so the
 * highlight doesn't strobe through intermediate sections.
 */
export function useActiveSection(
  items: readonly DemoTOCItem[],
  activeId: string | null,
  setActiveId: (id: string | null) => void,
  isManualScrollRef: { readonly current: boolean },
) {
  // Default-active = first item, but only when nothing else won (e.g.
  // on first paint, before any IntersectionObserver entry has fired).
  useEffect(() => {
    if (items.length === 0) {
      if (activeId !== null) setActiveId(null)
      return
    }
    if (!activeId || !items.some((it) => it.id === activeId)) {
      setActiveId(items[0].id)
    }
  }, [items, activeId, setActiveId])

  useEffect(() => {
    if (items.length === 0) return
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return
    }

    const visible = new Map<string, IntersectionObserverEntry>()

    const observer = new IntersectionObserver(
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

    for (const item of items) {
      observer.observe(item.element)
    }

    return () => {
      observer.disconnect()
      visible.clear()
    }
  }, [items, isManualScrollRef, setActiveId])
}
