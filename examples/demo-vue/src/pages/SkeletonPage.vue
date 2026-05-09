<script setup lang="ts">
import { SgSkeleton } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Skeleton',
    lead: 'Placeholder for content that is loading. Avoids layout shift.',
    when1: 'Cards, profiles, lists that take noticeable time to load.',
    when2: 'Combine with `active` for a shimmering placeholder.',
    basicTitle: 'Basic',
    basicDesc: 'Title + paragraph.',
    avatarTitle: 'With avatar',
    avatarDesc: 'Adds an avatar block to the side.',
    activeTitle: 'Animated',
    activeDesc: 'Shimmering animation while loading.',
  },
  ru: {
    title: 'Skeleton',
    lead: 'Плейсхолдер для загружаемого контента. Без layout shift.',
    when1: 'Карточки, профили, списки с заметным временем загрузки.',
    when2: '`active` — мерцающий плейсхолдер.',
    basicTitle: 'Basic',
    basicDesc: 'Title + параграф.',
    avatarTitle: 'С аватаром',
    avatarDesc: 'Добавляет блок аватара сбоку.',
    activeTitle: 'Анимация',
    activeDesc: 'Мерцающая анимация во время загрузки.',
  },
})

const propsData: PropDef[] = [
  { name: 'active', description: 'Shimmering animation.', type: 'boolean', default: 'false' },
  { name: 'avatar', description: 'Show avatar block.', type: 'boolean | { size, shape }', default: 'false' },
  { name: 'title', description: 'Show title block.', type: 'boolean | { width }', default: 'true' },
  { name: 'paragraph', description: 'Show paragraph rows.', type: 'boolean | { rows, width[] }', default: 'true' },
  { name: 'loading', description: 'When false, render slot instead.', type: 'boolean', default: 'true' },
]

const BASIC = `<SgSkeleton />`
const AVATAR = `<SgSkeleton avatar />`
const ACTIVE = `<SgSkeleton avatar active />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="feedback"
    :crumbs="['Feedback', 'Skeleton']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC" vertical>
      <SgSkeleton />
    </DemoBox>

    <DemoBox :title="t.avatarTitle" :description="t.avatarDesc" :code="AVATAR" vertical>
      <SgSkeleton avatar />
    </DemoBox>

    <DemoBox :title="t.activeTitle" :description="t.activeDesc" :code="ACTIVE" vertical>
      <SgSkeleton avatar active />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
