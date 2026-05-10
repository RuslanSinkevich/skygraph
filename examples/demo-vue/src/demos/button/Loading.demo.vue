<script setup lang="ts">
/**
 * `loading` swaps in a Spin and sets `aria-busy`, `disabled` and
 * pointer-events so a second click is impossible while work is
 * in flight. The controlled variant below shows the typical
 * submit → done pattern.
 */
import { ref } from 'vue'
import { SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    defaultLoading: 'Default loading',
    primaryLoading: 'Primary loading',
    dashedLoading: 'Dashed loading',
    saving: 'Saving…',
    clickMe: 'Click me',
  },
  ru: {
    defaultLoading: 'Загрузка',
    primaryLoading: 'Основная загрузка',
    dashedLoading: 'Пунктирная загрузка',
    saving: 'Сохранение…',
    clickMe: 'Нажмите',
  },
} as const

const t = useDemoStrings(STRINGS)
const saving = ref(false)

function startSave() {
  saving.value = true
  setTimeout(() => {
    saving.value = false
  }, 1500)
}
</script>

<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap">
    <SgButton :loading="true">{{ t.defaultLoading }}</SgButton>
    <SgButton type="primary" :loading="true">{{ t.primaryLoading }}</SgButton>
    <SgButton type="dashed" :loading="true">{{ t.dashedLoading }}</SgButton>
    <SgButton type="primary" :loading="saving" @click="startSave">
      {{ saving ? t.saving : t.clickMe }}
    </SgButton>
  </div>
</template>
