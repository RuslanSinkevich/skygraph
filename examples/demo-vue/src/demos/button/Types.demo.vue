<script setup lang="ts">
/**
 * Five visual variants. `primary` is the CTA, `default` sits next
 * to it for secondary actions, `dashed` suggests "add", `text`
 * and `link` are for inline / toolbar actions where a bordered
 * button would feel heavy.
 */
import { SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    default: 'Default',
    primary: 'Primary',
    dashed: 'Dashed',
    text: 'Text',
    link: 'Link',
  },
  ru: {
    default: 'Обычная',
    primary: 'Основная',
    dashed: 'Пунктирная',
    text: 'Текстовая',
    link: 'Ссылка',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap">
    <SgButton>{{ t.default }}</SgButton>
    <SgButton type="primary">{{ t.primary }}</SgButton>
    <SgButton type="dashed">{{ t.dashed }}</SgButton>
    <SgButton type="text">{{ t.text }}</SgButton>
    <SgButton type="link">{{ t.link }}</SgButton>
  </div>
</template>
