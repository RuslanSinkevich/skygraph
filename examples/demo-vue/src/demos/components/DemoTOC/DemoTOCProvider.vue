<script setup lang="ts">
import { computed, onBeforeUnmount, provide, ref, shallowRef } from 'vue'

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
let idleTimer: number | null = null
let maxTimer: number | null = null
let scrollListener: (() => void) | null = null

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

function clearManualTimers() {
  if (idleTimer !== null) {
    window.clearTimeout(idleTimer)
    idleTimer = null
  }
  if (maxTimer !== null) {
    window.clearTimeout(maxTimer)
    maxTimer = null
  }
}

function releaseManualScroll() {
  clearManualTimers()
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
    scrollListener = null
  }
  isManualScrollRef.current = false
}

function beginManualScroll() {
  // Re-entrant: a second TOC click before the first settles just
  // restarts the idle window on the existing listener.
  isManualScrollRef.current = true
  clearManualTimers()

  if (!scrollListener) {
    const onScroll = () => {
      if (idleTimer !== null) window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(releaseManualScroll, MANUAL_SCROLL_IDLE_MS)
    }
    scrollListener = onScroll
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  // Kick off the idle countdown immediately so a click that triggers
  // no scroll at all (target already on screen) still releases.
  idleTimer = window.setTimeout(releaseManualScroll, MANUAL_SCROLL_IDLE_MS)
  maxTimer = window.setTimeout(releaseManualScroll, MANUAL_SCROLL_MAX_MS)
}

onBeforeUnmount(() => {
  clearManualTimers()
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
    scrollListener = null
  }
})

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
