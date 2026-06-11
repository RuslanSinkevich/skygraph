<script setup lang="ts">
/**
 * Slider uses only global tokens — the fill and handle follow
 * `--sg-color-primary`, the rail follows `--sg-color-border`. Three scoped
 * recipes — branded green, dark field, glass pick — rebrand the control.
 *
 * Mirrors React `examples/demo/src/demos/slider/TokensOverride.demo.tsx`.
 */
import { SgSlider } from '@skygraph/vue'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgSlider :default-value="60" />
    </template>
  </TokenScopeCards>
</template>
