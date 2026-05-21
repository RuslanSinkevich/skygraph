<script setup lang="ts">
import { computed, provide, ref, shallowRef } from 'vue'

import {
  DEMO_TOC_KEY,
  type DemoTOCContextValue,
  type DemoTOCItem,
  type RegistrationEntry,
} from './types'

/**
 * Vue port of React `DemoTOCProvider`. Owns the registration map and
 * derives the ordered, disambiguated list of TOC items.
 *
 * The DOM-order sort + duplicate-suffixing logic is byte-equivalent to
 * the React provider's `computeOrderedItems`.
 */

/** Window during which IntersectionObserver updates are suppressed. */
const MANUAL_SCROLL_LOCK_MS = 600

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

// `shallowRef` because the map's identity changes on every mutation
// (we replace the whole Map). A deep ref would trigger reactivity per
// element key — unnecessary overhead.
const entries = shallowRef<ReadonlyMap<HTMLElement, RegistrationEntry>>(new Map())
const activeId = ref<string | null>(null)
const isManualScrollRef = { current: false }
let manualScrollTimer: number | null = null

const items = computed<DemoTOCItem[]>(() => computeOrderedItems(entries.value))

function register(entry: RegistrationEntry): () => void {
  const next = new Map(entries.value)
  next.set(entry.element, entry)
  entries.value = next
  return () => {
    if (!entries.value.has(entry.element)) return
    const cleaned = new Map(entries.value)
    cleaned.delete(entry.element)
    entries.value = cleaned
  }
}

function setActiveId(id: string | null) {
  activeId.value = id
}

function beginManualScroll() {
  isManualScrollRef.current = true
  if (manualScrollTimer !== null) {
    window.clearTimeout(manualScrollTimer)
  }
  manualScrollTimer = window.setTimeout(() => {
    isManualScrollRef.current = false
    manualScrollTimer = null
  }, MANUAL_SCROLL_LOCK_MS)
}

const value: DemoTOCContextValue = {
  register,
  items,
  activeId,
  setActiveId,
  isManualScrollRef,
  beginManualScroll,
}

provide(DEMO_TOC_KEY, value)
</script>

<template>
  <slot />
</template>
