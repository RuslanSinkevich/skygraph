<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const THEME_STORAGE_KEY = 'skygraph-demo-theme'

type Theme = 'light' | 'dark'

interface Props {
  /** Aria-label for the toggle button. */
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  ariaLabel: 'Toggle theme',
})

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // localStorage may be unavailable (SSR / privacy mode).
  }
  if (typeof window.matchMedia === 'function') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  }
  return 'light'
}

const theme = ref<Theme>('light')

onMounted(() => {
  theme.value = readInitialTheme()
})

watch(
  theme,
  (next) => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-sg-theme', next)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // ignore
    }
  },
  { immediate: true },
)

function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="xshell-theme"
    :aria-label="ariaLabel"
    :title="ariaLabel"
    @click="toggle"
  >
    <svg
      v-if="theme === 'dark'"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="3" fill="currentColor" />
      <path
        d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
      />
    </svg>
    <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13 9.5A6 6 0 0 1 6.5 3a.5.5 0 0 0-.7-.5A6.5 6.5 0 1 0 13.5 10.2a.5.5 0 0 0-.5-.7Z"
        fill="currentColor"
      />
    </svg>
  </button>
</template>
