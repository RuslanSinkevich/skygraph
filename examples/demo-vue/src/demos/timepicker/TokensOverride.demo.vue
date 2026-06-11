<script setup lang="ts">
/**
 * TimePicker composes the global form tokens for the trigger and the surface
 * tokens for the dropdown. Three scoped recipes — branded green, dark field,
 * glass pick — reskin one instance.
 *
 * Mirrors React `examples/demo/src/demos/timepicker/TokensOverride.demo.tsx`.
 */
import { SgTimePicker } from '@skygraph/vue'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgTimePicker default-value="09:30:00" placeholder="Select time" />
    </template>
  </TokenScopeCards>
</template>
