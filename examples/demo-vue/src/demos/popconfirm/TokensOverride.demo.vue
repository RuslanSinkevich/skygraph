<script setup lang="ts">
/**
 * Popconfirm has no component-specific tokens — tune the surface
 * globals (`--sg-color-bg-elevated`, `--sg-border-radius-lg`,
 * `--sg-shadow-lg`) and the icon uses `--sg-color-warning`.
 *
 * Vue parity: the bubble renders inline (no Teleport), so a
 * wrapping div with scoped CSS variables works directly.
 */
import { SgButton, SgPopconfirm } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const t = useDemoStrings({
  en: {
    title: 'Reset all layout preferences?',
    description: 'Panels, themes, and font size will go back to defaults.',
    okText: 'Reset',
    button: 'Reset preferences',
  },
  ru: {
    title: 'Сбросить все настройки макета?',
    description: 'Панели, темы и размер шрифта вернутся к значениям по умолчанию.',
    okText: 'Сбросить',
    button: 'Сбросить настройки',
  },
})
</script>

<template>
  <div
    :style="{
      '--sg-border-radius-lg': '14px',
      '--sg-color-bg-elevated': '#fff7ed',
      '--sg-color-border-secondary': '#fdba74',
      '--sg-color-warning': '#ea580c',
      '--sg-shadow-lg': '0 12px 28px rgba(234, 88, 12, 0.15)',
      '--sg-color-primary': '#ea580c',
      '--sg-color-primary-hover': '#c2410c',
    } as Record<string, string>"
  >
    <SgPopconfirm :title="t.title" :description="t.description" :ok-text="t.okText">
      <SgButton>{{ t.button }}</SgButton>
    </SgPopconfirm>
  </div>
</template>
