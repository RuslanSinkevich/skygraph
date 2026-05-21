import {
  computed,
  inject,
  onBeforeUnmount,
  ref,
  watch,
  type ComponentPublicInstance,
  type ComputedRef,
  type Ref,
  type VNodeRef,
} from 'vue'

import { slugify } from './slugify'
import { DEMO_TOC_KEY, type DemoTOCContextValue } from './types'

export interface UseDemoTOCResult {
  /**
   * Stable id to bind to the DemoBox root. Equals the slugified title
   * on first render; on the next paint — after registration — the
   * provider may rewrite it to `<slug>-2` / `<slug>-3` if the title
   * clashes with another DemoBox on the same page.
   *
   * `undefined` when the title is empty (such boxes intentionally never
   * appear in the TOC).
   */
  id: ComputedRef<string | undefined>
  /**
   * Template ref to bind to the DemoBox root (`<div :ref="ref" />`).
   * Matches Vue's `VNodeRef` callback shape: invoked with the element
   * on mount and `null` on unmount.
   */
  ref: VNodeRef
  /**
   * True when a TOC provider is mounted above. Exposed for tests; the
   * DemoBox itself doesn't branch on this.
   */
  inTOC: boolean
}

/**
 * Vue port of the React `useDemoTOC` hook. Wires a DemoBox into the
 * page TOC.
 *
 * Behaviour matrix mirrors React 1:1:
 *
 *   • Empty / missing title           → no-op, no id, no registration.
 *   • Provider present, valid title   → registers on mount, returns the
 *                                       disambiguated id; URL hash and
 *                                       active-section highlight follow.
 *   • Provider absent, valid title    → still returns an `id` (raw
 *                                       slug) so anchor links inside
 *                                       the same page keep working,
 *                                       but skips the registration —
 *                                       the rest of the API is a no-op.
 */
export function useDemoTOC(title: Ref<string | undefined>): UseDemoTOCResult {
  const ctx = inject<DemoTOCContextValue | null>(DEMO_TOC_KEY, null)
  const register = ctx?.register
  const items = ctx?.items

  // Template ref → state. Vue's template refs invoke the callback with
  // the element (or component instance) on mount and `null` on unmount.
  // We thread it through a reactive `ref` so the resolved-id
  // computation reacts to both DOM attachment and registration.
  const el = ref<HTMLElement | null>(null)
  const refFn: VNodeRef = (node) => {
    if (node === null) {
      el.value = null
      return
    }
    // The DemoBox root is a plain HTML <div>, so Vue passes the
    // Element directly. Defensive cast for the component-instance
    // branch — never hit in practice but keeps types honest.
    if (node instanceof HTMLElement) {
      el.value = node
      return
    }
    const inst = node as ComponentPublicInstance
    el.value = (inst?.$el as HTMLElement | null) ?? null
  }

  const baseSlug = computed(() => (title.value ? slugify(title.value) : ''))

  let unregister: (() => void) | null = null
  function clearReg() {
    if (unregister) {
      unregister()
      unregister = null
    }
  }

  watch(
    [el, title, baseSlug],
    ([node, titleValue, baseSlugValue]) => {
      clearReg()
      if (!register || !node || !titleValue || !baseSlugValue) return
      unregister = register({ element: node, title: titleValue, baseSlug: baseSlugValue })
    },
    { immediate: true },
  )

  onBeforeUnmount(clearReg)

  const id = computed<string | undefined>(() => {
    const t = title.value
    const slug = baseSlug.value
    if (!t || !slug) return undefined
    const node = el.value
    const list = items?.value
    if (!list || !node) return slug
    return list.find((it) => it.element === node)?.id ?? slug
  })

  return { id, ref: refFn, inTOC: ctx !== null }
}
