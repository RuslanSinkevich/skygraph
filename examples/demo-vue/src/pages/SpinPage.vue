<script setup lang="ts">
import { SgSpin } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Spin',
    lead: 'Loading indicator. Inline, with tip, or wrapped around content.',
    when1: 'Async operation that blocks the UI for less than a few seconds.',
    when2: 'Use Skeleton for longer placeholder loading.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three sizes.',
    tipTitle: 'With tip',
    tipDesc: 'Optional text below the spinner.',
    overlayTitle: 'Overlay',
    overlayDesc: 'Spin wraps children to dim and overlay them.',
  },
  ru: {
    title: 'Spin',
    lead: 'Индикатор загрузки. Inline, с tip, или поверх контента.',
    when1: 'Async операция блокирует UI на несколько секунд.',
    when2: 'Skeleton — для длительной загрузки-плейсхолдера.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три размера.',
    tipTitle: 'С подписью',
    tipDesc: 'Опциональный текст под спиннером.',
    overlayTitle: 'Оверлей',
    overlayDesc: 'Spin оборачивает контент, затемняет и накрывает.',
  },
})

const propsData: PropDef[] = [
  { name: 'spinning', description: 'Show loading state.', type: 'boolean', default: 'true' },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'delay', description: 'Ms to wait before showing.', type: 'number' },
  { name: 'tip', description: 'Text below the spinner.', type: 'string' },
  { name: 'fullscreen', description: 'Cover the viewport.', type: 'boolean', default: 'false' },
]

const SIZES = `<SgSpin size="small" />
<SgSpin />
<SgSpin size="large" />`
const TIP = `<SgSpin tip="Loading…" />`
const OVERLAY = `<SgSpin tip="Refreshing">
  <p>Some content underneath.</p>
</SgSpin>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="feedback"
    :crumbs="['Feedback', 'Spin']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgSpin size="small" />
      <SgSpin />
      <SgSpin size="large" />
    </DemoBox>

    <DemoBox :title="t.tipTitle" :description="t.tipDesc" :code="TIP">
      <SgSpin tip="Loading…" />
    </DemoBox>

    <DemoBox :title="t.overlayTitle" :description="t.overlayDesc" :code="OVERLAY" vertical>
      <SgSpin tip="Refreshing">
        <div style="padding: 20px; border: 1px dashed var(--sg-color-border-secondary); border-radius: 6px;">
          Content goes here. Spin overlays it while loading.
        </div>
      </SgSpin>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
