<script setup lang="ts">
import { SgMenu, type MenuItem } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Menu',
    lead: 'Vertical, horizontal or inline navigation list with submenus, groups and dividers.',
    when1: 'Primary navigation in dashboards and admin panels.',
    when2: 'Inline mode for collapsible category trees.',
    verticalTitle: 'Vertical',
    verticalDesc: 'Default mode for sidebars.',
    horizontalTitle: 'Horizontal',
    horizontalDesc: 'Top-level menubar layout.',
  },
  ru: {
    title: 'Menu',
    lead: 'Вертикальное, горизонтальное или inline навигационное меню с подменю, группами и разделителями.',
    when1: 'Главная навигация в дашбордах и админ-панелях.',
    when2: 'Inline-режим для свёртываемых деревьев категорий.',
    verticalTitle: 'Вертикальное',
    verticalDesc: 'Режим по умолчанию для сайдбаров.',
    horizontalTitle: 'Горизонтальное',
    horizontalDesc: 'Top-level menubar.',
  },
})

const items: MenuItem[] = [
  { key: 'home', label: 'Home' },
  { key: 'docs', label: 'Documentation' },
  {
    key: 'group',
    type: 'group',
    label: 'Settings',
    children: [
      { key: 'profile', label: 'Profile' },
      { key: 'security', label: 'Security' },
    ],
  },
  { key: 'divider', type: 'divider', label: '' },
  { key: 'logout', label: 'Logout', danger: true },
]

const items2: MenuItem[] = [
  { key: 'a', label: 'Products' },
  { key: 'b', label: 'Pricing' },
  { key: 'c', label: 'About' },
  { key: 'd', label: 'Contact' },
]

const propsData: PropDef[] = [
  { name: 'items', description: 'Menu structure.', type: 'MenuItem[]', required: true },
  { name: 'mode', description: 'Layout mode.', type: "'vertical' | 'horizontal' | 'inline'", default: "'vertical'" },
  { name: 'selectedKeys', description: 'Controlled selection.', type: 'string[]' },
  { name: 'defaultSelectedKeys', description: 'Initial selection.', type: 'string[]', default: '[]' },
  { name: 'theme', description: 'Color scheme.', type: "'light' | 'dark'", default: "'light'" },
]

const VERT = `<SgMenu :items="items" />`
const HORIZ = `<SgMenu mode="horizontal" :items="items" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="navigation"
    :crumbs="['Navigation', 'Menu']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.verticalTitle" :description="t.verticalDesc" :code="VERT" vertical>
      <div style="max-width: 240px;">
        <SgMenu :items="items" />
      </div>
    </DemoBox>

    <DemoBox :title="t.horizontalTitle" :description="t.horizontalDesc" :code="HORIZ" vertical>
      <SgMenu mode="horizontal" :items="items2" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
