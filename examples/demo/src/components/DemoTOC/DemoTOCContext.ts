import { createContext, useContext } from 'react'

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
export interface RegistrationEntry {
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
   * Begin a manual-scroll window. After the lock expires the flag
   * clears and the observer takes over again.
   */
  beginManualScroll: () => void
}

export const DemoTOCContext = createContext<DemoTOCContextValue | null>(null)

/**
 * Raw context accessor — returns `null` outside a provider. Most
 * callers should use {@link useDemoTOC} from `./useDemoTOC.ts`, which
 * adds a slug helper and tolerates missing providers (no-op).
 */
export function useDemoTOCContext(): DemoTOCContextValue | null {
  return useContext(DemoTOCContext)
}
