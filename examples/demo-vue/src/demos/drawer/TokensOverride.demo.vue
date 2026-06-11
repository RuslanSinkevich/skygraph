<script setup lang="ts">
/**
 * Drawer composes `--sg-color-bg-elevated` for the panel, `--sg-color-overlay`
 * for the mask and `--sg-shadow-lg` for the lift. Three scoped recipes —
 * branded green, dark field, glass pick — rebrand the trigger and panel.
 *
 * Mirrors React `examples/demo/src/demos/drawer/TokensOverride.demo.tsx`.
 * `<SgDrawer>` teleports to `<body>`, but it now copies the scoped `--sg-*`
 * tokens from its mount point onto the panel, so the per-card scope survives.
 */
import { reactive } from 'vue'
import { SgDrawer, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: {
    open: 'Open drawer',
    title: 'Scoped drawer',
    body: 'Panel, mask and shadow follow the scoped tokens.',
  },
  ru: {
    open: 'Открыть',
    title: 'Скоуп Drawer',
    body: 'Панель, маска и тень следуют за токенами.',
  },
} as const

const t = useDemoStrings(STRINGS)

const open = reactive<Record<TokenScopeKey, boolean>>({
  brand: false,
  dark: false,
  glass: false,
})
</script>

<template>
  <TokenScopeCards>
    <template #default="{ scope }">
      <SgButton type="primary" @click="open[scope] = true">{{ t.open }}</SgButton>
      <SgDrawer :open="open[scope]" :title="t.title" @close="open[scope] = false">
        <p>{{ t.body }}</p>
      </SgDrawer>
    </template>
  </TokenScopeCards>
</template>
