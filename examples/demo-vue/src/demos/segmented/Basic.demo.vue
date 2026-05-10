<script setup lang="ts">
/**
 * Pass bare strings for the simplest usage — each string becomes
 * both the label and the value. Uncontrolled: defaults to the
 * first option.
 */
import { computed } from 'vue'
import { SgSegmented } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const t = useDemoStrings({
  en: { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', yearly: 'Yearly' },
  ru: { daily: 'Ежедневно', weekly: 'Еженедельно', monthly: 'Ежемесячно', yearly: 'Ежегодно' },
})

const options = computed(() => [t.value.daily, t.value.weekly, t.value.monthly, t.value.yearly])
</script>

<template>
  <SgSegmented :options="options" />
</template>
