<script setup lang="ts">
/**
 * `direction="vertical"` stacks options — ideal for longer labels or
 * settings screens where each choice has extra description text.
 */
import { SgRadio } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    card: 'Pay by card',
    paypal: 'PayPal',
    bank: 'Bank transfer',
    cash: 'Cash on delivery',
  },
  ru: {
    card: 'Картой',
    paypal: 'PayPal',
    bank: 'Банковский перевод',
    cash: 'Наличными при получении',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <SgRadio
    direction="vertical"
    default-value="card"
    :options="[
      { label: t.card, value: 'card' },
      { label: t.paypal, value: 'paypal' },
      { label: t.bank, value: 'bank' },
      { label: t.cash, value: 'cash' },
    ]"
  />
</template>
