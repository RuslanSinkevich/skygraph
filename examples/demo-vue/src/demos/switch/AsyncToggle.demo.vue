<script setup lang="ts">
/**
 * Real-world pattern: flip optimistically, block clicks while the
 * request is in flight, and roll back if the backend rejects the
 * update. Without a `loading` prop on `SgSwitch` we use `disabled` to
 * gate clicks and surface the pending state in the side label.
 */
import { ref } from 'vue'
import { SgSwitch } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    labelPrefix: 'Notifications:',
    on: 'on',
    off: 'off',
    saving: 'saving…',
  },
  ru: {
    labelPrefix: 'Уведомления:',
    on: 'вкл',
    off: 'выкл',
    saving: 'сохранение…',
  },
} as const

const t = useDemoStrings(STRINGS)
const enabled = ref(false)
const pending = ref(false)

async function onChange(next: boolean) {
  pending.value = true
  enabled.value = next
  try {
    await new Promise((r) => setTimeout(r, 700))
    if (Math.random() < 0.25) throw new Error('rate limited')
  } catch {
    enabled.value = !next
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <SgSwitch :model-value="enabled" :disabled="pending" @update:model-value="onChange" />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.labelPrefix }} {{ pending ? t.saving : enabled ? t.on : t.off }}
    </span>
  </div>
</template>
