<script setup lang="ts">
import { computed, onBeforeUnmount, provide, ref, useSlots, watch } from 'vue'
import { APP_SHELL_KEY, type AppShellSection } from './useAppShell'

interface Props {
  /**
   * Logical app section. Drives sidebar visibility (sections that don't
   * benefit from contextual nav — `landing`, `roadmap`, `about`,
   * `showcases` — render full-width).
   */
  section: AppShellSection
  /**
   * Drop the default content padding. Useful for pages that already
   * provide their own outer wrapper (Landing hero) or showcases that
   * fill the viewport.
   */
  flush?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  flush: false,
})

defineSlots<{
  /** Header content. Render `<Header />` here so the consumer can pass
   * app-specific nav items + extras (theme/lang/search). */
  header(): unknown
  /** Sidebar content. Omit (don't render the slot) for full-width pages
   * like Landing or Roadmap. */
  sidebar?(): unknown
  /** Footer content. Omit for pages that want the full viewport. */
  footer?(): unknown
  /** Page content. */
  default(): unknown
}>()

const slots = useSlots()
const hasSidebar = computed(() => Boolean(slots.sidebar))

const sidebarOpen = ref(false)
const openSidebar = () => {
  sidebarOpen.value = true
}
const closeSidebar = () => {
  sidebarOpen.value = false
}

provide(APP_SHELL_KEY, { openSidebar })

function onKey(ev: KeyboardEvent) {
  if (ev.key === 'Escape') closeSidebar()
}

watch(sidebarOpen, (open) => {
  if (typeof window === 'undefined') return
  if (open) {
    window.addEventListener('keydown', onKey)
  } else {
    window.removeEventListener('keydown', onKey)
  }
})

watch(
  () => props.section,
  () => {
    closeSidebar()
  },
)

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKey)
  }
})

const rootClasses = computed(() =>
  [
    'xshell',
    `xshell--section-${props.section ?? 'none'}`,
    hasSidebar.value ? '' : 'xshell--no-sidebar',
    sidebarOpen.value ? 'xshell--sidebar-open' : '',
    props.flush ? 'xshell--flush' : '',
  ]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <div :class="rootClasses" :data-section="section ?? 'none'">
    <slot name="header" />
    <div class="xshell-body">
      <template v-if="hasSidebar">
        <aside class="xshell-sidebar" aria-label="Section navigation">
          <slot name="sidebar" />
        </aside>
        <div class="xshell-sidebar-backdrop" aria-hidden="true" @click="closeSidebar" />
      </template>
      <main class="xshell-main">
        <div class="xshell-main-inner">
          <slot />
        </div>
      </main>
    </div>
    <slot name="footer" />
  </div>
</template>
