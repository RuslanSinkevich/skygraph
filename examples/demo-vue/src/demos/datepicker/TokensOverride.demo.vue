<script setup lang="ts">
/**
 * DatePicker reads `--sg-color-primary` for selected days, the global form
 * tokens for the control shell and the surface tokens for the dropdown. Three
 * scoped recipes — branded green, dark field, glass pick — reskin one picker.
 *
 * Mirrors React `examples/demo/src/demos/datepicker/TokensOverride.demo.tsx`.
 */
import { SgDatePicker } from '@skygraph/vue'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgDatePicker placeholder="Pick a date" allow-clear />
    </template>
  </TokenScopeCards>
</template>
