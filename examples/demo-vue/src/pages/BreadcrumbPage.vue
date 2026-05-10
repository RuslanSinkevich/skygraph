<script setup lang="ts">
import { SgBreadcrumb } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Breadcrumb',
    lead: 'Navigation trail showing the current page location within a hierarchy.',
    when1: 'Show users where they are in a multi-level interface.',
    when2: 'Provide one-click access to ancestor pages.',
    basicTitle: 'Basic',
    basicDesc: 'Three-segment trail with `/` separator (default).',
    sepTitle: 'Custom separator',
    sepDesc: 'Pass any short string as `separator`.',
    linksTitle: 'With links',
    linksDesc: 'Items with `href` render as anchors.',
  },
  ru: {
    title: 'Breadcrumb',
    lead: 'Навигационный «хлебный путь» с положением страницы в иерархии.',
    when1: 'Показать пользователю его место в многоуровневом интерфейсе.',
    when2: 'Дать один клик до любого родительского раздела.',
    basicTitle: 'Basic',
    basicDesc: 'Три сегмента с разделителем `/` по умолчанию.',
    sepTitle: 'Свой разделитель',
    sepDesc: 'Передайте любую короткую строку в `separator`.',
    linksTitle: 'Со ссылками',
    linksDesc: 'Элементы с `href` рендерятся как `<a>`.',
  },
})

const items = [{ title: 'Home' }, { title: 'Components' }, { title: 'Breadcrumb' }]

const itemsLinks = [
  { title: 'Home', href: '#/' },
  { title: 'Components', href: '#/components/button' },
  { title: 'Breadcrumb' },
]

const propsData: PropDef[] = [
  {
    name: 'items',
    description: 'Ordered trail from root to current location.',
    type: 'BreadcrumbItem[]',
    required: true,
  },
  {
    name: 'separator',
    description: 'Node rendered between segments.',
    type: 'string',
    default: "'/'",
  },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const itemProps: PropDef[] = [
  { name: 'title', description: 'Segment label.', type: 'string', required: true },
  { name: 'href', description: 'Renders the segment as a link.', type: 'string' },
]

const BASIC = `<SgBreadcrumb :items="[
  { title: 'Home' }, { title: 'Components' }, { title: 'Breadcrumb' }
]" />`
const SEP = `<SgBreadcrumb separator=">" :items="items" />`
const LINKS = `<SgBreadcrumb :items="[
  { title: 'Home', href: '#/' },
  { title: 'Components', href: '#/components/button' },
  { title: 'Breadcrumb' },
]" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="navigation"
    :crumbs="['Navigation', 'Breadcrumb']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgBreadcrumb :items="items" />
    </DemoBox>

    <DemoBox :title="t.sepTitle" :description="t.sepDesc" :code="SEP">
      <SgBreadcrumb separator=">" :items="items" />
    </DemoBox>

    <DemoBox :title="t.linksTitle" :description="t.linksDesc" :code="LINKS">
      <SgBreadcrumb :items="itemsLinks" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
      <PropsTable title="BreadcrumbItem" :data="itemProps" />
    </template>
  </ComponentDoc>
</template>
