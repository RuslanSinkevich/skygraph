<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue'

import { useActiveSection } from './intersection'
import { useDemoTOCStrings } from './strings'
import { DEMO_TOC_KEY, type DemoTOCContextValue, type DemoTOCItem } from './types'

/**
 * Right-rail "On this page" panel. Vue port of React
 * `examples/demo/src/components/DemoTOC/DemoTOC.tsx`.
 *
 * Hash-routing detail mirrors the React app: the leading `#` is owned
 * by the router (`#/components/button`), so the section anchor is
 * encoded with a `~` suffix — `#/components/button~loading`. The
 * router strips that suffix when resolving the route so a TOC click
 * never triggers a re-route.
 */

const SECTION_DELIMITER = '~'

const SCROLL_OFFSET_PX = 72

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}

function readSectionFromHash(): string {
  if (typeof window === 'undefined') return ''
  const raw = window.location.hash
  const idx = raw.indexOf(SECTION_DELIMITER)
  if (idx < 0) return ''
  try {
    return decodeURIComponent(raw.slice(idx + 1))
  } catch {
    return raw.slice(idx + 1)
  }
}

function buildSectionUrl(sectionId: string | null): string {
  if (typeof window === 'undefined') return ''
  const raw = window.location.hash
  const idx = raw.indexOf(SECTION_DELIMITER)
  const base = idx < 0 ? raw : raw.slice(0, idx)
  const tail = sectionId ? `${SECTION_DELIMITER}${encodeURIComponent(sectionId)}` : ''
  return `${window.location.pathname}${window.location.search}${base}${tail}`
}

function buildSectionHref(sectionId: string): string {
  if (typeof window === 'undefined') return `${SECTION_DELIMITER}${sectionId}`
  const raw = window.location.hash
  const idx = raw.indexOf(SECTION_DELIMITER)
  const base = idx < 0 ? raw : raw.slice(0, idx)
  return `${base || '#'}${SECTION_DELIMITER}${encodeURIComponent(sectionId)}`
}

const ctx = inject<DemoTOCContextValue | null>(DEMO_TOC_KEY, null)
const strings = useDemoTOCStrings()

const items = computed<readonly DemoTOCItem[]>(() => ctx?.items.value ?? [])
const activeId = computed<string | null>(() => ctx?.activeId.value ?? null)

function setActiveId(id: string | null) {
  ctx?.setActiveId(id)
}

const isManualScrollRef = ctx?.isManualScrollRef ?? { current: false }

function beginManualScroll() {
  ctx?.beginManualScroll()
}

useActiveSection(
  items,
  computed(() => activeId.value),
  setActiveId,
  isManualScrollRef,
)

// Keep the active row visible inside the rail's own scroll area. On long
// pages (e.g. Table has 30+ demos) the rail scrolls independently, so the
// highlighted item would otherwise drift out of view as the page scrolls,
// making the list look out of sync with the content. Mirrors React DemoTOC.
const navRef = ref<HTMLElement | null>(null)
watch(activeId, () => {
  void nextTick(() => {
    const nav = navRef.value
    if (!nav) return
    const link = nav.querySelector<HTMLElement>('.demo-toc-item-active')
    if (!link) return
    const navRect = nav.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    if (linkRect.top < navRect.top) {
      nav.scrollTop -= navRect.top - linkRect.top + 12
    } else if (linkRect.bottom > navRect.bottom) {
      nav.scrollTop += linkRect.bottom - navRect.bottom + 12
    }
  })
})

function scrollToId(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  beginManualScroll()
  setActiveId(id)
  const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX
  window.scrollTo({ top, behavior: scrollBehavior() })
}

// Deep-link support: when the URL hash already carries a `~section`,
// scroll to it once the freshly registered DemoBoxes are in the DOM.
// Re-run on every `items` change because a section may register only
// after the page has re-rendered.
let scrollFrame: number | null = null
function syncFromHash() {
  if (scrollFrame !== null) {
    window.cancelAnimationFrame(scrollFrame)
    scrollFrame = null
  }
  if (items.value.length === 0) return
  const section = readSectionFromHash()
  if (!section) return
  if (!items.value.some((it) => it.id === section)) return
  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = null
    scrollToId(section)
  })
}

onMounted(() => {
  void nextTick(syncFromHash)
})
watch(items, syncFromHash)

function handleClick(event: MouseEvent, id: string) {
  event.preventDefault()
  scrollToId(id)
  if (typeof window !== 'undefined' && window.history?.replaceState) {
    window.history.replaceState(null, '', buildSectionUrl(id))
  }
}

function handleBackToTop(event: MouseEvent) {
  event.preventDefault()
  beginManualScroll()
  window.scrollTo({ top: 0, behavior: scrollBehavior() })
  if (items.value.length > 0) setActiveId(items.value[0].id)
  if (typeof window !== 'undefined' && window.history?.replaceState) {
    window.history.replaceState(null, '', buildSectionUrl(null))
  }
}
</script>

<template>
  <nav v-if="items.length > 0" ref="navRef" class="demo-toc" :aria-label="strings.ariaLabel">
    <a class="demo-toc-back-to-top" href="#" @click="handleBackToTop">
      <span aria-hidden>↑</span>
      <span>{{ strings.backToTop }}</span>
    </a>
    <div class="demo-toc-heading">{{ strings.onThisPage }}</div>
    <ul class="demo-toc-list">
      <li v-for="item in items" :key="item.id" class="demo-toc-row">
        <a
          :href="buildSectionHref(item.id)"
          :class="'demo-toc-item' + (item.id === activeId ? ' demo-toc-item-active' : '')"
          :aria-current="item.id === activeId ? 'location' : undefined"
          @click="(e) => handleClick(e, item.id)"
        >
          {{ item.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>
