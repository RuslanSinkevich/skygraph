<script setup lang="ts">
/**
 * When Badge has no children but gets a `status`, it renders a
 * standalone dot + label row. `processing` pulses with a keyframe
 * animation to hint "currently active".
 */
import { SgBadge } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    processing: 'Processing',
    default: 'Default',
  },
  ru: {
    success: 'Успех',
    error: 'Ошибка',
    warning: 'Предупреждение',
    processing: 'В процессе',
    default: 'По умолчанию',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <SgBadge status="success" :text="t.success" />
    <SgBadge status="error" :text="t.error" />
    <SgBadge status="warning" :text="t.warning" />
    <SgBadge status="processing" :text="t.processing" />
    <SgBadge status="default" :text="t.default" />
  </div>
</template>
