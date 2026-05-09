<script setup lang="ts">
import { ref } from 'vue'
import { SgTag } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Tag',
    lead: 'Compact label or category marker.',
    when1: 'Categorize, filter, label, or display short metadata.',
    when2: 'Use a closable Tag for chips that can be removed inline.',
    presetTitle: 'Preset colors',
    presetDesc: 'Five preset semantic colors.',
    customTitle: 'Custom color',
    customDesc: 'Pass any CSS color string.',
    closableTitle: 'Closable',
    closableDesc: 'Click × to dismiss.',
  },
  ru: {
    title: 'Tag',
    lead: 'Компактная метка или категория.',
    when1: 'Категоризация, фильтрация, метаданные.',
    when2: '`closable` — для чипов, которые можно удалить inline.',
    presetTitle: 'Preset цвета',
    presetDesc: 'Пять предустановленных семантических цветов.',
    customTitle: 'Свой цвет',
    customDesc: 'Любой CSS-цвет.',
    closableTitle: 'Closable',
    closableDesc: 'Клик по × — закрытие.',
  },
})

const tags = ref(['Vue', 'TypeScript', 'CSS Vars'])

function close(name: string) {
  tags.value = tags.value.filter((t) => t !== name)
}

const propsData: PropDef[] = [
  { name: 'color', description: 'Preset semantic color or any CSS color.', type: "'default' | 'success' | 'error' | 'warning' | 'processing' | string", default: "'default'" },
  { name: 'closable', description: 'Render close × button.', type: 'boolean', default: 'false' },
  { name: 'bordered', description: 'Whether to draw a border.', type: 'boolean', default: 'true' },
]

const PRESET = `<SgTag>Default</SgTag>
<SgTag color="success">Success</SgTag>
<SgTag color="error">Error</SgTag>`
const CUSTOM = `<SgTag color="#722ed1">Purple</SgTag>`
const CLOSE = `<SgTag closable @close="close(name)">{{ name }}</SgTag>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Tag']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.presetTitle" :description="t.presetDesc" :code="PRESET">
      <SgTag>Default</SgTag>
      <SgTag color="success">Success</SgTag>
      <SgTag color="error">Error</SgTag>
      <SgTag color="warning">Warning</SgTag>
      <SgTag color="processing">Processing</SgTag>
    </DemoBox>

    <DemoBox :title="t.customTitle" :description="t.customDesc" :code="CUSTOM">
      <SgTag color="#722ed1">Purple</SgTag>
      <SgTag color="#13c2c2">Cyan</SgTag>
      <SgTag color="#fa541c">Orange</SgTag>
    </DemoBox>

    <DemoBox :title="t.closableTitle" :description="t.closableDesc" :code="CLOSE">
      <SgTag v-for="name in tags" :key="name" closable @close="close(name)">
        {{ name }}
      </SgTag>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
