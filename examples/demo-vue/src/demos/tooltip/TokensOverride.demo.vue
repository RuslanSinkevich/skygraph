<script setup lang="ts">
/**
 * The Tooltip and its trigger Button read the global palette. Three scoped
 * recipes — branded green, dark field, glass pick — rebrand the trigger and
 * the themed surface around it. Hover the button to reveal the tip.
 *
 * Mirrors React `examples/demo/src/demos/tooltip/TokensOverride.demo.tsx`.
 */
import { SgTooltip, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { hint: 'Press ⌘K to search', btn: 'Hover me' },
  ru: { hint: 'Нажмите ⌘K для поиска', btn: 'Наведите' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgTooltip :title="t.hint" placement="top">
        <SgButton type="primary">{{ t.btn }}</SgButton>
      </SgTooltip>
    </template>
  </TokenScopeCards>
</template>
