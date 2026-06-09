<script setup lang="ts">
/**
 * Click-triggered confirm bubble. `@confirm` fires when the user
 * hits the primary button; `@cancel` fires on the secondary button
 * (outside-click just dismisses silently).
 */
import { ref } from 'vue'
import { SgButton, SgPopconfirm } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const t = useDemoStrings({
  en: {
    title: 'Are you sure you want to delete this?',
    deleted: 'Deleted ✓',
    cancelled: 'Cancelled',
    button: 'Delete',
  },
  ru: {
    title: 'Точно удалить?',
    deleted: 'Удалено ✓',
    cancelled: 'Отменено',
    button: 'Удалить',
  },
})

const status = ref<string | null>(null)
function onConfirm() {
  console.log('[Popconfirm] confirm')
  status.value = t.value.deleted
}
function onCancel() {
  console.log('[Popconfirm] cancel')
  status.value = t.value.cancelled
}
</script>

<template>
  <div style="display: flex; align-items: center; gap: 12px">
    <SgPopconfirm :title="t.title" @confirm="onConfirm" @cancel="onCancel">
      <SgButton
        type="primary"
        :style="{ background: 'var(--sg-color-error)', borderColor: 'var(--sg-color-error)' }"
      >
        {{ t.button }}
      </SgButton>
    </SgPopconfirm>
    <span v-if="status" style="font-size: 13px; color: var(--sg-color-text-secondary)">
      {{ status }}
    </span>
  </div>
</template>
