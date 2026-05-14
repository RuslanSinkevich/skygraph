import { useCallback, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import {
  DemoTOCContext,
  type DemoTOCContextValue,
  type DemoTOCItem,
  type RegistrationEntry,
} from './DemoTOCContext'

/** Window during which IntersectionObserver updates are suppressed. */
const MANUAL_SCROLL_LOCK_MS = 600

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
  const manualScrollTimerRef = useRef<number | null>(null)

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
    isManualScrollRef.current = true
    if (manualScrollTimerRef.current !== null) {
      window.clearTimeout(manualScrollTimerRef.current)
    }
    manualScrollTimerRef.current = window.setTimeout(() => {
      isManualScrollRef.current = false
      manualScrollTimerRef.current = null
    }, MANUAL_SCROLL_LOCK_MS)
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
