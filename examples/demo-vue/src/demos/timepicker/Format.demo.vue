<script setup lang="ts">
/**
 * `format` decides both the displayed string and the shape of the
 * emitted value. Use `HH` for 24h hours, `hh` + `A` for 12h + AM/PM.
 * Set `:show-second="false"` to hide the seconds column.
 */
import { SgTimePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    full: '24h + seconds',
    noSeconds: '24h no seconds',
    twelve: '12h + AM/PM',
  },
  ru: {
    full: '24-часовой + секунды',
    noSeconds: '24-часовой без секунд',
    twelve: '12-часовой + AM/PM',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgTimePicker default-value="09:00:00" format="HH:mm:ss" :placeholder="t.full" />
    <SgTimePicker
      default-value="13:45"
      format="HH:mm"
      :show-second="false"
      :placeholder="t.noSeconds"
    />
    <SgTimePicker
      default-value="03:30:15 PM"
      format="hh:mm:ss A"
      :use12-hours="true"
      :placeholder="t.twelve"
    />
  </div>
</template>
