import { useEffect, useMemo, useRef } from 'react'

import { useDemoTOCContext } from './DemoTOCContext'
import { slugify } from './slugify'

export interface UseDemoTOCResult {
  /**
   * Stable id to spread onto the DemoBox root. Equals the slugified
   * title on first render; on the next paint — after the registration
   * effect — the provider may rewrite it to `<slug>-2` / `<slug>-3` if
   * the title clashes with another DemoBox on the same page.
   *
   * `undefined` when the title is empty (such boxes intentionally never
   * appear in the TOC).
   */
  id: string | undefined
  /** Ref to spread onto the DemoBox root. */
  ref: React.RefObject<HTMLDivElement | null>
  /**
   * True when a `<DemoTOCProvider>` is mounted above. DemoBox doesn't
   * branch on this — it's exposed for tests and for future widgets
   * that may want to render only inside a TOC-enabled page.
   */
  inTOC: boolean
}

/**
 * Wires a DemoBox into the page TOC.
 *
 * Behaviour matrix:
 *
 *   • Empty / missing title           → no-op, no id, no registration.
 *   • Provider present, valid title   → registers on mount, returns the
 *                                       disambiguated id; URL hash and
 *                                       active-section highlight follow.
 *   • Provider absent, valid title    → still returns an `id` (raw
 *                                       slug) so anchor links inside
 *                                       the same page keep working,
 *                                       but skips the registration —
 *                                       the rest of the API is a no-op
 *                                       and DemoBox callers don't have
 *                                       to special-case it.
 */
export function useDemoTOC(title: string | undefined): UseDemoTOCResult {
  const ctx = useDemoTOCContext()
  const ref = useRef<HTMLDivElement>(null)
  // IMPORTANT: depend on stable `register` only — the whole context
  // value changes whenever `activeId` updates; listing `ctx` here
  // re-ran the effect every scroll/highlight tick, causing register →
  // setVersion → infinite re-render ("Maximum update depth exceeded").
  const register = ctx?.register

  const baseSlug = useMemo(() => (title ? slugify(title) : ''), [title])

  useEffect(() => {
    if (!register || !title || !baseSlug) return
    const el = ref.current
    if (!el) return
    // The provider bumps its own version on register, which updates
    // the context value and re-renders this consumer — that's how the
    // disambiguated id gets read back via `getIdFor` on the next
    // paint. No local state bump needed here.
    return register({ element: el, title, baseSlug })
  }, [register, title, baseSlug])

  const resolvedId = ctx?.getIdFor(ref.current) ?? null
  const id = !title || !baseSlug ? undefined : (resolvedId ?? baseSlug)

  return { id, ref, inTOC: ctx !== null }
}
