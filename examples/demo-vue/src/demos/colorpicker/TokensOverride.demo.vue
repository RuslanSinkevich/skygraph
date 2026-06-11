<script setup lang="ts">
/**
 * ColorPicker composes the global form tokens for the trigger and the surface
 * tokens for the dropdown. Three scoped recipes — branded green, dark field,
 * glass pick — reskin the trigger and panel.
 *
 * Mirrors React `examples/demo/src/demos/colorpicker/TokensOverride.demo.tsx`.
 */
import { SgColorPicker } from '@skygraph/vue'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgColorPicker default-value="#10b981" show-text />
    </template>
  </TokenScopeCards>
</template>
