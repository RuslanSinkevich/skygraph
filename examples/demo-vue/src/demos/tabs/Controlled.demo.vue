<script setup lang="ts">
/**
 * Controlled `activeKey` lets you drive Tabs from elsewhere — a deep
 * link, a wizard "Next" button, a keyboard shortcut, etc.
 */
import { ref } from 'vue'
import { SgTabs, SgButton, type TabItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    jump1: 'Jump to 1',
    jump2: 'Jump to 2',
    jump3: 'Jump to 3',
    step1: 'Step 1',
    step2: 'Step 2',
    step3: 'Step 3',
    step1Body: 'Step 1 content',
    step2Body: 'Step 2 content',
    step3Body: 'Step 3 content',
  },
  ru: {
    jump1: 'К шагу 1',
    jump2: 'К шагу 2',
    jump3: 'К шагу 3',
    step1: 'Шаг 1',
    step2: 'Шаг 2',
    step3: 'Шаг 3',
    step1Body: 'Содержимое шага 1',
    step2Body: 'Содержимое шага 2',
    step3Body: 'Содержимое шага 3',
  },
} as const

const t = useDemoStrings(STRINGS)
const activeKey = ref('step-1')

function onChange(key: string) {
  activeKey.value = key
}
</script>

<template>
  <div style="width: 100%">
    <div style="display: flex; gap: 8px; margin-bottom: 12px">
      <SgButton size="small" @click="activeKey = 'step-1'">{{ t.jump1 }}</SgButton>
      <SgButton size="small" @click="activeKey = 'step-2'">{{ t.jump2 }}</SgButton>
      <SgButton size="small" @click="activeKey = 'step-3'">{{ t.jump3 }}</SgButton>
    </div>
    <SgTabs
      :active-key="activeKey"
      :items="[
        { key: 'step-1', label: t.step1, content: t.step1Body },
        { key: 'step-2', label: t.step2, content: t.step2Body },
        { key: 'step-3', label: t.step3, content: t.step3Body },
      ] as TabItem[]"
      @change="onChange"
    />
  </div>
</template>
