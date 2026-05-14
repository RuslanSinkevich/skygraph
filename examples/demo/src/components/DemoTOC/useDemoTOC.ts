import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Ref } from 'react'

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
  /**
   * Callback ref to spread onto the DemoBox root. Works the same as a
   * regular `useRef` object on the JSX side — React accepts either — but
   * routes the underlying element through `useState`, which lets the
   * hook compute the disambiguated id during render without breaking
   * the React 19 lint rule that forbids reading `ref.current` outside
   * an effect.
   */
  ref: Ref<HTMLDivElement>
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
  // IMPORTANT: depend on stable `register` only — the whole context
  // value changes whenever `activeId` updates; listing `ctx` here
  // would re-run the registration effect every scroll/highlight tick.
  const register = ctx?.register
  const items = ctx?.items

  // Callback ref → state. Reading `ref.current` during render is
  // forbidden by `react-hooks/refs`; threading the element through
  // state instead keeps everything inside render-pure useMemo. React
  // calls the callback once with the node on mount and once with
  // `null` on unmount, so we get clean register / unregister via
  // useEffect.
  const [el, setEl] = useState<HTMLDivElement | null>(null)
  const ref = useCallback<(node: HTMLDivElement | null) => void>((node) => {
    setEl(node)
  }, [])

  const baseSlug = useMemo(() => (title ? slugify(title) : ''), [title])

  useEffect(() => {
    if (!register || !title || !baseSlug || !el) return
    return register({ element: el, title, baseSlug })
  }, [register, title, baseSlug, el])

  const resolvedId = useMemo(() => {
    if (!items || !el) return undefined
    return items.find((it) => it.element === el)?.id
  }, [items, el])

  const id = !title || !baseSlug ? undefined : (resolvedId ?? baseSlug)

  return { id, ref, inTOC: ctx !== null }
}
