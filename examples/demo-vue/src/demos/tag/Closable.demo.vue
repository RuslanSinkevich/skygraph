<script setup lang="ts">
/**
 * `closable` appends a × button; `@close` fires when it's activated.
 * The Tag itself never removes itself from the DOM — you manage the
 * source array.
 */
import { ref } from 'vue'
import { SgTag } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    design: 'design',
    engineering: 'engineering',
    product: 'product',
    research: 'research',
    reset: 'Reset',
  },
  ru: {
    design: 'дизайн',
    engineering: 'инженерия',
    product: 'продукт',
    research: 'исследования',
    reset: 'Сбросить',
  },
} as const

const KEYS = ['design', 'engineering', 'product', 'research'] as const
type TagKey = (typeof KEYS)[number]

const t = useDemoStrings(STRINGS)
const tags = ref<TagKey[]>([...KEYS])

function close(key: TagKey) {
  tags.value = tags.value.filter((x) => x !== key)
}

function reset() {
  tags.value = [...KEYS]
}
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
    <SgTag
      v-for="key in tags"
      :key="key"
      color="processing"
      closable
      @close="close(key)"
    >
      {{ t[key] }}
    </SgTag>
    <button v-if="tags.length === 0" type="button" style="font: inherit" @click="reset">
      {{ t.reset }}
    </button>
  </div>
</template>
