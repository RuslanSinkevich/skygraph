import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import {
  DemoTOCContext,
  type DemoTOCContextValue,
  type DemoTOCItem,
  type RegistrationEntry,
} from './DemoTOCContext'

/**
 * Idle gap (ms) after the last scroll event before a programmatic
 * scroll is considered finished. The active-section tracker stays
 * suppressed for the whole smooth-scroll animation and re-engages only
 * once scrolling has actually stopped — a fixed timeout was too short
 * for long jumps (the highlight flickered mid-animation).
 */
const MANUAL_SCROLL_IDLE_MS = 120
/**
 * Hard ceiling so the lock can never get stuck if a `scroll` event is
 * somehow missed (e.g. the target was already in view and no scroll
 * happened at all).
 */
const MANUAL_SCROLL_MAX_MS = 1200

/**
 * Walk the entries map, sort by DOM order via
 * {@link Node#compareDocumentPosition} and append `-2`, `-3` suffixes
 * to duplicate slugs. The result is stable for a given set of
 * registered DOM nodes regardless of registration order.
 */
function computeOrderedItems(entries: ReadonlyMap<HTMLElement, RegistrationEntry>): DemoTOCItem[] {
  if (entries.size === 0) return []

  const elements = Array.from(entries.keys())
  elements.sort((a, b) => {
    if (a === b) return 0
    const pos = a.compareDocumentPosition(b)
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1
    if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1
    return 0
  })

  const counts = new Map<string, number>()
  const out: DemoTOCItem[] = []
  for (const el of elements) {
    const entry = entries.get(el)
    if (!entry) continue
    const next = (counts.get(entry.baseSlug) ?? 0) + 1
    counts.set(entry.baseSlug, next)
    const id = next === 1 ? entry.baseSlug : `${entry.baseSlug}-${next}`
    out.push({ id, title: entry.title, element: el })
  }
  return out
}

/**
 * Adds / removes a registration entry and returns a *new* map so React
 * picks up the change. We keep this as a free function to make the
 * setState callbacks below trivially pure.
 */
function withEntry(
  prev: ReadonlyMap<HTMLElement, RegistrationEntry>,
  entry: RegistrationEntry,
): Map<HTMLElement, RegistrationEntry> {
  const next = new Map(prev)
  next.set(entry.element, entry)
  return next
}

function withoutEntry(
  prev: ReadonlyMap<HTMLElement, RegistrationEntry>,
  element: HTMLElement,
): Map<HTMLElement, RegistrationEntry> {
  if (!prev.has(element)) return prev as Map<HTMLElement, RegistrationEntry>
  const next = new Map(prev)
  next.delete(element)
  return next
}

export function DemoTOCProvider({ children }: { children: ReactNode }) {
  // Entries live in state (not a ref) so derived items can be computed
  // via useMemo without reading a ref during render — the React 19
  // hooks lint flags that pattern explicitly. setState-on-register
  // batches naturally in React 18+, so 50 simultaneous mounts still
  // produce a single re-render.
  const [entries, setEntries] = useState<ReadonlyMap<HTMLElement, RegistrationEntry>>(
    () => new Map(),
  )
  const [activeId, setActiveIdState] = useState<string | null>(null)

  const isManualScrollRef = useRef(false)
  const idleTimerRef = useRef<number | null>(null)
  const maxTimerRef = useRef<number | null>(null)
  const scrollListenerRef = useRef<(() => void) | null>(null)

  const items = useMemo(() => computeOrderedItems(entries), [entries])

  const register = useCallback((entry: RegistrationEntry) => {
    setEntries((prev) => withEntry(prev, entry))
    return () => {
      setEntries((prev) => withoutEntry(prev, entry.element))
    }
  }, [])

  const setActiveId = useCallback((id: string | null) => {
    setActiveIdState(id)
  }, [])

  const beginManualScroll = useCallback(() => {
    const clearTimers = () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current)
        idleTimerRef.current = null
      }
      if (maxTimerRef.current !== null) {
        window.clearTimeout(maxTimerRef.current)
        maxTimerRef.current = null
      }
    }

    const release = () => {
      clearTimers()
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current)
        scrollListenerRef.current = null
      }
      isManualScrollRef.current = false
    }

    // Re-entrant: a second TOC click before the first settles just
    // restarts the idle window on the existing listener.
    isManualScrollRef.current = true
    clearTimers()

    if (!scrollListenerRef.current) {
      const onScroll = () => {
        if (idleTimerRef.current !== null) window.clearTimeout(idleTimerRef.current)
        idleTimerRef.current = window.setTimeout(release, MANUAL_SCROLL_IDLE_MS)
      }
      scrollListenerRef.current = onScroll
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    // Kick off the idle countdown immediately so a click that triggers
    // no scroll at all (target already on screen) still releases.
    idleTimerRef.current = window.setTimeout(release, MANUAL_SCROLL_IDLE_MS)
    maxTimerRef.current = window.setTimeout(release, MANUAL_SCROLL_MAX_MS)
  }, [])

  useEffect(() => {
    return () => {
      if (idleTimerRef.current !== null) window.clearTimeout(idleTimerRef.current)
      if (maxTimerRef.current !== null) window.clearTimeout(maxTimerRef.current)
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current)
      }
    }
  }, [])

  const value = useMemo<DemoTOCContextValue>(
    () => ({
      register,
      items,
      activeId,
      setActiveId,
      isManualScrollRef,
      beginManualScroll,
    }),
    [register, items, activeId, setActiveId, beginManualScroll],
  )

  return <DemoTOCContext.Provider value={value}>{children}</DemoTOCContext.Provider>
}
