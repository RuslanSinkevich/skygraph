<script setup lang="ts">
/**
 * `locale` overrides the default English strings. Combine with
 * `:week-start-day="1"` for Monday-first calendars typical in the EU.
 */
import { SgCalendar, type CalendarLocale } from '@skygraph/vue'

const ru: CalendarLocale = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  dayNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: 'Сегодня',
  week: 'Нед.',
}
</script>

<template>
  <SgCalendar :fullscreen="false" :week-start-day="1" :locale="ru" show-week-number />
</template>
