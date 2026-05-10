<script setup lang="ts">
/**
 * `block` stretches the control to fill its container and makes
 * every segment equal width — ideal for full-width toolbars on
 * mobile or inside cards.
 */
import { computed } from 'vue'
import { SgSegmented } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const t = useDemoStrings({
  en: { a: 'Option A', b: 'Option B', c: 'Option C' },
  ru: { a: 'Вариант A', b: 'Вариант B', c: 'Вариант C' },
})

const options = computed(() => [t.value.a, t.value.b, t.value.c])
</script>

<template>
  <SgSegmented block :options="options" />
</template>
