<script setup lang="ts">
/**
 * Pass objects with `icon` + `label` to mix graphics with text. The
 * second row demonstrates icon-only segments — handy for
 * view-switchers (grid / list) when space is tight.
 */
import { computed } from 'vue'
import { SgSegmented } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    list: 'List',
    kanban: 'Kanban',
    calendar: 'Calendar',
    ariaGrid: 'Grid',
    ariaList: 'List',
    ariaCard: 'Card',
  },
  ru: {
    list: 'Список',
    kanban: 'Канбан',
    calendar: 'Календарь',
    ariaGrid: 'Сетка',
    ariaList: 'Список',
    ariaCard: 'Карточки',
  },
} as const

const t = useDemoStrings(STRINGS)

const row1 = computed(() => [
  { label: t.value.list, value: 'List', icon: '☰' },
  { label: t.value.kanban, value: 'Kanban', icon: '▤' },
  { label: t.value.calendar, value: 'Calendar', icon: '🗓' },
])

const row2 = computed(() => [
  { label: t.value.ariaGrid, value: 'grid', icon: '▦' },
  { label: t.value.ariaList, value: 'list', icon: '☰' },
  { label: t.value.ariaCard, value: 'card', icon: '▢' },
])
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <SgSegmented default-value="List" :options="row1" />
    <SgSegmented default-value="grid" :options="row2" />
  </div>
</template>
