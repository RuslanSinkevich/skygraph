<script setup lang="ts">
/**
 * The active dot reads `--sg-color-primary`, idle dots read
 * `--sg-color-text-disabled`. Three scoped recipes — branded green, dark
 * field, glass pick — rebrand the indicators.
 *
 * Mirrors React `examples/demo/src/demos/carousel/TokensOverride.demo.tsx`.
 */
import { SgCarousel } from '@skygraph/vue'
import { slideBase, paletteColors } from './data'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgCarousel>
        <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
          {{ i + 1 }}
        </div>
      </SgCarousel>
    </template>
  </TokenScopeCards>
</template>
