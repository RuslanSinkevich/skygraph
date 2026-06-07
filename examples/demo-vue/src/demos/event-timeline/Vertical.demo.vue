<script setup lang="ts">
/**
 * Vertical event stream grouped by month. Each event has a colored
 * dot, title and description; dividers mark new month buckets.
 */
import { computed } from 'vue'
import { SgEventTimeline } from '@skygraph/vue'
import type { TimelineEvent } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    kickoffTitle: 'Project kickoff',
    kickoffDesc: 'Stakeholders aligned, scope locked.',
    designTitle: 'Design review',
    designDesc: 'Mocks signed off; component inventory ready.',
    alphaTitle: 'Alpha release',
    alphaDesc: 'Internal users start dogfooding.',
    betaTitle: 'Beta opens',
    betaDesc: 'External waiting list invited.',
    launchTitle: 'GA launch',
    launchDesc: 'Public release with marketing push.',
  },
  ru: {
    kickoffTitle: 'Старт проекта',
    kickoffDesc: 'Согласовали участников и зафиксировали объём.',
    designTitle: 'Дизайн-ревью',
    designDesc: 'Макеты утверждены, инвентарь компонентов готов.',
    alphaTitle: 'Alpha-релиз',
    alphaDesc: 'Внутренние пользователи начинают проверку.',
    betaTitle: 'Открытие beta',
    betaDesc: 'Приглашена внешняя очередь ожидания.',
    launchTitle: 'Публичный релиз',
    launchDesc: 'Запуск с маркетинговой поддержкой.',
  },
} as const

const t = useDemoStrings(STRINGS)

const events = computed<TimelineEvent[]>(() => [
  {
    id: 'kickoff',
    date: Date.UTC(2026, 0, 12),
    title: t.value.kickoffTitle,
    description: t.value.kickoffDesc,
    color: '#52c41a',
  },
  {
    id: 'design',
    date: Date.UTC(2026, 0, 25),
    title: t.value.designTitle,
    description: t.value.designDesc,
  },
  {
    id: 'alpha',
    date: Date.UTC(2026, 1, 10),
    title: t.value.alphaTitle,
    description: t.value.alphaDesc,
    color: '#1677ff',
  },
  {
    id: 'beta',
    date: Date.UTC(2026, 2, 5),
    title: t.value.betaTitle,
    description: t.value.betaDesc,
    color: '#722ed1',
  },
  {
    id: 'launch',
    date: Date.UTC(2026, 3, 1),
    title: t.value.launchTitle,
    description: t.value.launchDesc,
    color: '#faad14',
  },
])
</script>

<template>
  <SgEventTimeline :events="events" group-by="month" />
</template>
