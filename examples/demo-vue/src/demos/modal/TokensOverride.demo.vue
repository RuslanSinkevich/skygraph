<script setup lang="ts">
/**
 * Scoping tokens on the wrapper reskins the trigger and the dialog it opens —
 * every `type="primary"` button inherits the scoped palette. Three recipes —
 * branded green, dark field, glass pick.
 *
 * Mirrors React `examples/demo/src/demos/modal/TokensOverride.demo.tsx`.
 * `<SgModal>` teleports to `<body>`, but it now copies the scoped `--sg-*`
 * tokens from its mount point onto the mask, so the per-card scope survives.
 */
import { reactive } from 'vue'
import { SgModal, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: {
    open: 'Open modal',
    title: 'Scoped tokens',
    body: 'Primary palette is scoped here.',
    cancel: 'Cancel',
    ok: 'Confirm',
  },
  ru: {
    open: 'Открыть',
    title: 'Скоуп токенов',
    body: 'Primary-палитра скоупится здесь.',
    cancel: 'Отмена',
    ok: 'Ок',
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
      <SgModal :open="open[scope]" :title="t.title" @close="open[scope] = false">
        <p>{{ t.body }}</p>
        <template #footer>
          <SgButton @click="open[scope] = false">{{ t.cancel }}</SgButton>
          <SgButton type="primary" @click="open[scope] = false">{{ t.ok }}</SgButton>
        </template>
      </SgModal>
    </template>
  </TokenScopeCards>
</template>
