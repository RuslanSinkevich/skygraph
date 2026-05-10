<script setup lang="ts">
/**
 * Controlled checkbox with label. v-model receives the new boolean
 * value; the native `accent-color` matches `--sg-color-primary`.
 */
import { ref } from 'vue'
import { SgCheckbox } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    agree: 'I agree to the terms',
    statePrefix: 'state:',
    checked: 'checked',
    unchecked: 'unchecked',
  },
  ru: {
    agree: 'Я принимаю условия',
    statePrefix: 'состояние:',
    checked: 'отмечено',
    unchecked: 'не отмечено',
  },
} as const

const t = useDemoStrings(STRINGS)
const checked = ref(false)
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <SgCheckbox v-model="checked">{{ t.agree }}</SgCheckbox>
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.statePrefix }} {{ checked ? t.checked : t.unchecked }}
    </span>
  </div>
</template>
