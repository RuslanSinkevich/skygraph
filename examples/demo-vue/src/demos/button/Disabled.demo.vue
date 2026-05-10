<script setup lang="ts">
/**
 * `disabled` dims the button, sets `aria-disabled` and blocks
 * both click and keyboard activation. Each type has its own
 * disabled look — `text` / `link` keep their minimal chrome.
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
    <SgButton disabled>{{ t.default }}</SgButton>
    <SgButton type="primary" disabled>{{ t.primary }}</SgButton>
    <SgButton type="dashed" disabled>{{ t.dashed }}</SgButton>
    <SgButton type="text" disabled>{{ t.text }}</SgButton>
    <SgButton type="link" disabled>{{ t.link }}</SgButton>
  </div>
</template>
