<script setup lang="ts">
import { SgTimeline, type TimelineItem } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Timeline',
    lead: 'Vertical sequence of events with dots and connecting line — activity feeds, audit trails, version history.',
    when1: 'Show a chronological feed of events.',
    when2: 'Audit log of changes with status colours.',
    basicTitle: 'Basic',
    basicDesc: 'Default left mode.',
    colorTitle: 'Coloured dots',
    colorDesc: 'Per-item `color` paints both dot and connecting line.',
    altTitle: 'Alternate sides',
    altDesc: 'Items zig-zag around the central axis.',
    pendingTitle: 'Pending tail',
    pendingDesc: 'Open-ended timeline with a synthetic last item.',
  },
  ru: {
    title: 'Timeline',
    lead: 'Вертикальная последовательность событий с точками и соединяющей линией — лента активности, audit, история.',
    when1: 'Хронологическая лента событий.',
    when2: 'Audit-лог изменений с цветами статусов.',
    basicTitle: 'Basic',
    basicDesc: 'Режим по умолчанию — left.',
    colorTitle: 'Цветные точки',
    colorDesc: 'Per-item `color` красит и точку, и линию.',
    altTitle: 'Чередование сторон',
    altDesc: 'Элементы зигзагом вокруг центральной оси.',
    pendingTitle: 'Pending хвост',
    pendingDesc: 'Открытая лента с синтетическим последним элементом.',
  },
})

const basicItems: TimelineItem[] = [
  { content: 'Created repository' },
  { content: 'Added CI workflow' },
  { content: 'Released v0.1.0' },
]

const colorItems: TimelineItem[] = [
  { content: 'Build passed', color: 'var(--sg-color-success)' },
  { content: 'Tests passed', color: 'var(--sg-color-success)' },
  { content: 'Deploy queued', color: 'var(--sg-color-warning)' },
  { content: 'Deploy failed: timeout', color: 'var(--sg-color-error)' },
]

const altItems: TimelineItem[] = [
  { content: '09:00 — Standup', label: 'Today' },
  { content: '11:30 — Code review', label: 'Today' },
  { content: '14:00 — Demo prep', label: 'Today' },
  { content: '16:00 — Retro', label: 'Tomorrow' },
]

const propsData: PropDef[] = [
  { name: 'items', description: 'Ordered timeline steps.', type: 'TimelineItem[]', required: true },
  {
    name: 'mode',
    description: 'Layout.',
    type: "'left' | 'right' | 'alternate'",
    default: "'left'",
  },
  {
    name: 'pending',
    description: 'Pending tail content (boolean = empty).',
    type: 'string | boolean',
  },
  { name: 'reverse', description: 'Reverse visual order.', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const itemPropsTable: PropDef[] = [
  { name: 'content', description: 'Main body text.', type: 'string', required: true },
  { name: 'label', description: 'Optional label text.', type: 'string' },
  { name: 'color', description: 'Border / text color.', type: 'string' },
  { name: 'dot', description: 'Custom marker text.', type: 'string' },
  { name: 'position', description: 'Force one side (alternate mode).', type: "'left' | 'right'" },
]

const BASIC = `<SgTimeline :items="items" />`
const COLOR = `<SgTimeline :items="[
  { content: 'Build passed', color: 'var(--sg-color-success)' },
  ...
]" />`
const ALT = `<SgTimeline mode="alternate" :items="items" />`
const PENDING = `<SgTimeline pending="Recording…" :items="items" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Timeline']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC" vertical>
      <SgTimeline :items="basicItems" />
    </DemoBox>

    <DemoBox :title="t.colorTitle" :description="t.colorDesc" :code="COLOR" vertical>
      <SgTimeline :items="colorItems" />
    </DemoBox>

    <DemoBox :title="t.altTitle" :description="t.altDesc" :code="ALT" vertical>
      <SgTimeline mode="alternate" :items="altItems" />
    </DemoBox>

    <DemoBox :title="t.pendingTitle" :description="t.pendingDesc" :code="PENDING" vertical>
      <SgTimeline pending="Recording…" :items="basicItems" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
      <PropsTable title="TimelineItem" :data="itemPropsTable" />
    </template>
  </ComponentDoc>
</template>
