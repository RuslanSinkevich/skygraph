<script setup lang="ts">
import { computed } from 'vue'
import { SgButton } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Button',
    lead: 'Buttons trigger an action. Five visual variants, three sizes, danger / loading / disabled / block modifiers.',
    when1: 'A primary action of a page or a section (Submit, Save, Continue).',
    when2: 'An inline action inside a list, card, or table cell.',
    typesTitle: 'Types',
    typesDesc: 'Five visual variants — primary, default, dashed, text, link.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three sizes — small, middle, large.',
    dangerTitle: 'Danger',
    dangerDesc: 'Combine `danger` with any type to flag a destructive action.',
    loadingTitle: 'Loading',
    loadingDesc: 'Show a spinner and disable interaction during async work.',
    blockTitle: 'Block',
    blockDesc: 'Stretches the button to fill its parent.',
  },
  ru: {
    title: 'Button',
    lead: 'Кнопки запускают действие. Пять визуальных вариантов, три размера, модификаторы danger / loading / disabled / block.',
    when1: 'Главное действие страницы или секции (Submit, Save, Продолжить).',
    when2: 'Inline-действие внутри списка, карточки или ячейки таблицы.',
    typesTitle: 'Типы',
    typesDesc: 'Пять визуальных вариантов — primary, default, dashed, text, link.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три размера — small, middle, large.',
    dangerTitle: 'Danger',
    dangerDesc: 'Сочетайте `danger` с любым типом для деструктивного действия.',
    loadingTitle: 'Loading',
    loadingDesc: 'Показывает спиннер и блокирует кнопку на время асинхронной работы.',
    blockTitle: 'Block',
    blockDesc: 'Растягивает кнопку на всю ширину родителя.',
  },
})

const propsData = computed<PropDef[]>(() => [
  { name: 'type', description: 'Visual variant.', type: "'default' | 'primary' | 'dashed' | 'text' | 'link'", default: "'default'" },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'htmlType', description: 'Native button type attribute.', type: "'button' | 'submit' | 'reset'", default: "'button'" },
  { name: 'danger', description: 'Destructive action variant.', type: 'boolean', default: 'false' },
  { name: 'block', description: 'Stretches to parent width.', type: 'boolean', default: 'false' },
  { name: 'disabled', description: 'Disables interaction.', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Shows spinner and disables interaction.', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Strips built-in styling.', type: 'boolean', default: 'false' },
])

const TYPES_CODE = `<SgButton type="primary">Primary</SgButton>
<SgButton>Default</SgButton>
<SgButton type="dashed">Dashed</SgButton>
<SgButton type="text">Text</SgButton>
<SgButton type="link">Link</SgButton>`

const SIZES_CODE = `<SgButton size="small">Small</SgButton>
<SgButton size="middle">Middle</SgButton>
<SgButton size="large">Large</SgButton>`

const DANGER_CODE = `<SgButton type="primary" danger>Delete</SgButton>
<SgButton danger>Delete</SgButton>
<SgButton type="text" danger>Delete</SgButton>`

const LOADING_CODE = `<SgButton type="primary" :loading="true">Saving…</SgButton>
<SgButton :loading="true">Loading</SgButton>`

const BLOCK_CODE = `<SgButton type="primary" block>Continue</SgButton>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="general"
    :crumbs="['Form', 'Button']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.typesTitle" :description="t.typesDesc" :code="TYPES_CODE">
      <SgButton type="primary">Primary</SgButton>
      <SgButton>Default</SgButton>
      <SgButton type="dashed">Dashed</SgButton>
      <SgButton type="text">Text</SgButton>
      <SgButton type="link">Link</SgButton>
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES_CODE">
      <SgButton size="small">Small</SgButton>
      <SgButton size="middle">Middle</SgButton>
      <SgButton size="large">Large</SgButton>
    </DemoBox>

    <DemoBox :title="t.dangerTitle" :description="t.dangerDesc" :code="DANGER_CODE">
      <SgButton type="primary" danger>Delete</SgButton>
      <SgButton danger>Delete</SgButton>
      <SgButton type="text" danger>Delete</SgButton>
    </DemoBox>

    <DemoBox :title="t.loadingTitle" :description="t.loadingDesc" :code="LOADING_CODE">
      <SgButton type="primary" :loading="true">Saving…</SgButton>
      <SgButton :loading="true">Loading</SgButton>
    </DemoBox>

    <DemoBox :title="t.blockTitle" :description="t.blockDesc" :code="BLOCK_CODE">
      <SgButton type="primary" block>Continue</SgButton>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
