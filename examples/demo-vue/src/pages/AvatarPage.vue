<script setup lang="ts">
import { SgAvatar } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Avatar',
    lead: 'User picture, initials, or icon — circle or square.',
    when1: 'Identify a user, organization or entity in lists, headers, comments.',
    when2: 'Combine with Badge to indicate online state.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three preset sizes plus arbitrary px.',
    typesTitle: 'Content types',
    typesDesc: 'Image, initials, icon.',
    shapeTitle: 'Shape',
    shapeDesc: 'Circle (default) or square.',
  },
  ru: {
    title: 'Avatar',
    lead: 'Аватар пользователя — фото, инициалы или иконка, круг или квадрат.',
    when1: 'Идентификация пользователя, организации в списках и хедерах.',
    when2: 'Комбинируйте с Badge для статуса онлайн.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три preset плюс произвольный px.',
    typesTitle: 'Типы контента',
    typesDesc: 'Картинка, инициалы, иконка.',
    shapeTitle: 'Форма',
    shapeDesc: 'Круг (по умолчанию) или квадрат.',
  },
})

const propsData: PropDef[] = [
  { name: 'src', description: 'Image URL.', type: 'string' },
  { name: 'alt', description: 'Image alt text.', type: 'string' },
  { name: 'size', description: 'Size token or px.', type: "'small' | 'middle' | 'large' | number", default: "'middle'" },
  { name: 'shape', description: 'Outer shape.', type: "'circle' | 'square'", default: "'circle'" },
]

const SIZES = `<SgAvatar size="small">A</SgAvatar>
<SgAvatar>A</SgAvatar>
<SgAvatar size="large">A</SgAvatar>
<SgAvatar :size="56">A</SgAvatar>`
const TYPES = `<SgAvatar>JS</SgAvatar>
<SgAvatar src="https://i.pravatar.cc/64?u=1" alt="A" />`
const SHAPE = `<SgAvatar shape="square">SQ</SgAvatar>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Avatar']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgAvatar size="small">A</SgAvatar>
      <SgAvatar>A</SgAvatar>
      <SgAvatar size="large">A</SgAvatar>
      <SgAvatar :size="56">A</SgAvatar>
    </DemoBox>

    <DemoBox :title="t.typesTitle" :description="t.typesDesc" :code="TYPES">
      <SgAvatar>JS</SgAvatar>
      <SgAvatar src="https://i.pravatar.cc/64?u=1" alt="User" />
    </DemoBox>

    <DemoBox :title="t.shapeTitle" :description="t.shapeDesc" :code="SHAPE">
      <SgAvatar shape="square">SQ</SgAvatar>
      <SgAvatar shape="square" :size="56">SQ</SgAvatar>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
