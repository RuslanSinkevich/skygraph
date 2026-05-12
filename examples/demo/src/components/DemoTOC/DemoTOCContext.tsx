import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { slugify } from './slugify'

/**
 * Public TOC entry — what the panel (and the active-section observer)
 * actually consume. `element` is the DemoBox root node; we keep a
 * direct reference rather than a ref so the observer can `.observe()`
 * it without an extra hop.
 */
export interface DemoTOCItem {
  /** Final id (already disambiguated against duplicates). */
  id: string
  /** Human title, shown in the panel and used as aria-label. */
  title: string
  /** DOM node — its `id` attribute matches `id`. */
  element: HTMLElement
}

/**
 * Internal entry — what DemoBox.tsx hands the provider through
 * `register`. We slug the title once at registration time and store the
 * raw element so the provider can sort by DOM order and assign final
 * disambiguated ids on every recompute.
 */
interface RegistrationEntry {
  element: HTMLElement
  title: string
  baseSlug: string
}

export interface DemoTOCContextValue {
  /**
   * Register a DemoBox. Returns an unregister function — call it in the
   * effect cleanup. Idempotent for the same `element` (StrictMode-safe).
   */
  register: (entry: RegistrationEntry) => () => void
  /**
   * Resolve the disambiguated id for a given DOM node. Returns `null`
   * before the node has been registered (DemoBox falls back to the bare
   * slug on first render, then re-reads after the registration effect).
   */
  getIdFor: (element: HTMLElement | null) => string | null
  /** All registered items, sorted by DOM order. */
  items: DemoTOCItem[]
  /** Currently active id — what the panel highlights. */
  activeId: string | null
  /** Imperative setter for the active id (used by click handler). */
  setActiveId: (id: string | null) => void
  /**
   * Returns true while a programmatic scroll (click on a TOC item) is
   * in flight. The IntersectionObserver listener in `intersection.ts`
   * skips its updates during that window so the highlight doesn't
   * flicker through intermediate sections.
   */
  isManualScrollRef: { readonly current: boolean }
  /**
   * Begin a manual-scroll window. After {@link MANUAL_SCROLL_LOCK_MS}
   * the flag clears and the observer takes over again.
   */
  beginManualScroll: () => void
}

const DemoTOCContext = createContext<DemoTOCContextValue | null>(null)

/** Window during which IntersectionObserver updates are suppressed. */
const MANUAL_SCROLL_LOCK_MS = 600

/**
 * Walk the entries map, sort by DOM order via {@link Node#compareDocumentPosition}
 * and append `-2`, `-3` suffixes to duplicate slugs. The result is
 * stable for a given set of registered DOM nodes regardless of
 * registration order.
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

export function DemoTOCProvider({ children }: { children: ReactNode }) {
  // We keep entries in a ref so register/unregister don't tear React
  // state, then bump a version counter to re-derive `items` via
  // useMemo. Refs survive StrictMode's double-invocation cleanly.
  const entriesRef = useRef<Map<HTMLElement, RegistrationEntry>>(new Map())
  const [version, setVersion] = useState(0)
  const [activeId, setActiveIdState] = useState<string | null>(null)

  const isManualScrollRef = useRef(false)
  const manualScrollTimerRef = useRef<number | null>(null)

  const items = useMemo(
    () => computeOrderedItems(entriesRef.current),
    // `version` is the canonical signal that the entries map changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version],
  )

  const register = useCallback((entry: RegistrationEntry) => {
    entriesRef.current.set(entry.element, entry)
    setVersion((v) => v + 1)
    return () => {
      entriesRef.current.delete(entry.element)
      setVersion((v) => v + 1)
    }
  }, [])

  const getIdFor = useCallback(
    (element: HTMLElement | null): string | null => {
      if (!element) return null
      for (const item of items) {
        if (item.element === element) return item.id
      }
      return null
    },
    [items],
  )

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
      getIdFor,
      items,
      activeId,
      setActiveId,
      isManualScrollRef,
      beginManualScroll,
    }),
    [register, getIdFor, items, activeId, setActiveId, beginManualScroll],
  )

  return <DemoTOCContext.Provider value={value}>{children}</DemoTOCContext.Provider>
}

/**
 * Raw context accessor — returns `null` outside a provider. Most
 * callers should use {@link useDemoTOC} from `./useDemoTOC.ts`, which
 * adds a slug helper and tolerates missing providers (no-op).
 */
export function useDemoTOCContext(): DemoTOCContextValue | null {
  return useContext(DemoTOCContext)
}

export { slugify }
