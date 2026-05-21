import type { InjectionKey, Ref } from 'vue'

/**
 * Public TOC entry — what the panel (and the active-section observer)
 * consume. `element` is the DemoBox root node; we keep a direct
 * reference so the observer can `.observe()` it without an extra hop.
 *
 * Byte-equivalent port of the React TOC's `DemoTOCItem`.
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
 * Internal entry — what `<DemoBox>` hands the provider through
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
   * Register a DemoBox. Returns an unregister function — call it when
   * the box unmounts. Idempotent for the same `element`.
   */
  register: (entry: RegistrationEntry) => () => void
  /** All registered items, sorted by DOM order. */
  items: Ref<DemoTOCItem[]>
  /** Currently active id — what the panel highlights. */
  activeId: Ref<string | null>
  /** Imperative setter for the active id (used by click handler). */
  setActiveId: (id: string | null) => void
  /**
   * True while a programmatic scroll (click on a TOC item) is in
   * flight. The IntersectionObserver listener skips its updates during
   * that window so the highlight doesn't flicker through intermediate
   * sections.
   */
  isManualScrollRef: { readonly current: boolean }
  /** Begin a manual-scroll window. */
  beginManualScroll: () => void
}

export const DEMO_TOC_KEY: InjectionKey<DemoTOCContextValue> = Symbol('skygraph-demo-vue-toc')
