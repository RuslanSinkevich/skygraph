<script setup lang="ts">
/**
 * Fire server-side search through `@search`, debouncing rapid
 * keystrokes. Vue `SgAutoComplete` has no `loading` prop yet — see
 * `findings/T-Vue-Demo-Forms.md` (`autocomplete-loading-not-in-vue`).
 * We surface progress in a side label instead of an inline spinner.
 */
import { onBeforeUnmount, ref } from 'vue'
import { SgAutoComplete, type AutoCompleteOption } from '@skygraph/vue'
import { cityDatabase } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Search cities…', loading: 'searching…' },
  ru: { placeholder: 'Поиск городов…', loading: 'идёт поиск…' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref('')
const options = ref<AutoCompleteOption[]>([])
const loading = ref(false)
let timer: number | null = null

onBeforeUnmount(() => {
  if (timer !== null) window.clearTimeout(timer)
})

function onSearch(q: string) {
  if (timer !== null) window.clearTimeout(timer)
  if (!q) {
    options.value = []
    loading.value = false
    return
  }
  loading.value = true
  timer = window.setTimeout(() => {
    options.value = cityDatabase
      .filter((c) => c.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 6)
      .map((c) => ({ value: c, label: c }))
    loading.value = false
  }, 350)
}
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgAutoComplete
      v-model="value"
      :options="options"
      :placeholder="t.placeholder"
      @search="onSearch"
    />
    <span v-if="loading" style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.loading }}
    </span>
  </div>
</template>
