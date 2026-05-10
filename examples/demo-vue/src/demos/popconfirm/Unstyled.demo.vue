<script setup lang="ts">
/**
 * `unstyled` removes every `sg-popconfirm-*` class and renders a
 * minimal alertdialog with native buttons. Focus trap, outside-
 * click handling, and ARIA wiring stay — the painting is yours.
 */
import { SgButton, SgPopconfirm } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const t = useDemoStrings({
  en: { title: 'Proceed?', okText: 'Yes', cancelText: 'No', button: 'Click me' },
  ru: { title: 'Продолжить?', okText: 'Да', cancelText: 'Нет', button: 'Нажмите' },
})
</script>

<template>
  <SgPopconfirm
    unstyled
    :title="t.title"
    :ok-text="t.okText"
    :cancel-text="t.cancelText"
  >
    <SgButton>{{ t.button }}</SgButton>
  </SgPopconfirm>
</template>
