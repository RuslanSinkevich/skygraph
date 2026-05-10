<script setup lang="ts">
/**
 * Adds a second line under the title. The title gets the ⚠ icon and
 * bold weight; the description lines up beside it in secondary text.
 */
import { SgButton, SgPopconfirm } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const t = useDemoStrings({
  en: {
    title: 'Delete the task',
    description: 'This action cannot be undone.',
    okText: 'Delete',
    cancelText: 'Keep',
    button: 'Delete task',
  },
  ru: {
    title: 'Удалить задачу',
    description: 'Действие нельзя отменить.',
    okText: 'Удалить',
    cancelText: 'Оставить',
    button: 'Удалить задачу',
  },
})
</script>

<template>
  <SgPopconfirm
    :title="t.title"
    :description="t.description"
    :ok-text="t.okText"
    :cancel-text="t.cancelText"
  >
    <SgButton
      type="primary"
      :style="{ background: 'var(--sg-color-error)', borderColor: 'var(--sg-color-error)' }"
    >
      {{ t.button }}
    </SgButton>
  </SgPopconfirm>
</template>
