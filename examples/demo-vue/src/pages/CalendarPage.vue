<script setup lang="ts">
import { ref } from 'vue'
import { SgCalendar } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Calendar',
    lead: 'Month, week, or year overview with optional event highlights.',
    when1: 'Date selection where surrounding context (week, month) matters.',
    when2: 'Booking flows, attendance trackers, schedule overviews.',
    basicTitle: 'Basic',
    basicDesc: 'Default month grid with today highlighted.',
    weekTitle: 'Week mode',
    weekDesc: 'Single-week view.',
    eventsTitle: 'With events',
    eventsDesc: 'Mark days with calendar events.',
    weekStartTitle: 'Week starts Monday',
    weekStartDesc: 'Set `weekStartDay = 1`.',
    showWeekTitle: 'Week numbers',
    showWeekDesc: 'Show ISO week numbers.',
  },
  ru: {
    title: 'Calendar',
    lead: 'Обзор по месяцу, неделе или году, опциональные события.',
    when1: 'Выбор даты с контекстом (вокруг недели, месяца).',
    when2: 'Бронирование, трекеры посещаемости, расписание.',
    basicTitle: 'Basic',
    basicDesc: 'Месячная сетка, сегодняшний день выделен.',
    weekTitle: 'Режим недели',
    weekDesc: 'Только одна неделя.',
    eventsTitle: 'С событиями',
    eventsDesc: 'Подсветить дни с событиями.',
    weekStartTitle: 'Неделя с понедельника',
    weekStartDesc: 'Установить `weekStartDay = 1`.',
    showWeekTitle: 'Номера недель',
    showWeekDesc: 'Показать ISO-номера недель.',
  },
})

const v = ref<Date>(new Date())
const today = new Date()
const events = [
  { id: '1', date: new Date(today.getFullYear(), today.getMonth(), 5), title: 'Demo' },
  { id: '2', date: new Date(today.getFullYear(), today.getMonth(), 12), title: 'Sprint review' },
  { id: '3', date: new Date(today.getFullYear(), today.getMonth(), 20), title: 'Release' },
]

const propsData: PropDef[] = [
  { name: 'modelValue / value', description: 'Selected date.', type: 'Date' },
  {
    name: 'mode',
    description: 'Display mode.',
    type: "'month' | 'week' | 'year'",
    default: "'month'",
  },
  { name: 'events', description: 'Events to highlight per day.', type: 'CalendarEvent[]' },
  {
    name: 'weekStartDay',
    description: 'First day of the week (0 = Sun).',
    type: 'number',
    default: '0',
  },
  {
    name: 'showWeekNumbers',
    description: 'Show ISO week numbers.',
    type: 'boolean',
    default: 'false',
  },
  { name: 'disabledDate', description: 'Disable specific days.', type: '(d: Date) => boolean' },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgCalendar v-model="value" />`
const WEEK = `<SgCalendar mode="week" v-model="value" />`
const EVENTS = `<SgCalendar :events="events" v-model="value" />`
const WS = `<SgCalendar :week-start-day="1" v-model="value" />`
const SW = `<SgCalendar show-week-numbers v-model="value" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Calendar']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgCalendar v-model="v" />
    </DemoBox>

    <DemoBox :title="t.weekTitle" :description="t.weekDesc" :code="WEEK">
      <SgCalendar mode="week" v-model="v" />
    </DemoBox>

    <DemoBox :title="t.eventsTitle" :description="t.eventsDesc" :code="EVENTS">
      <SgCalendar :events="events" v-model="v" />
    </DemoBox>

    <DemoBox :title="t.weekStartTitle" :description="t.weekStartDesc" :code="WS">
      <SgCalendar :week-start-day="1" v-model="v" />
    </DemoBox>

    <DemoBox :title="t.showWeekTitle" :description="t.showWeekDesc" :code="SW">
      <SgCalendar show-week-numbers v-model="v" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
