<script setup lang="ts">
/**
 * Popconfirm has no component-specific tokens — it composes the surface
 * globals plus the primary palette for the confirm button. Three scoped
 * recipes — branded green, dark field, glass pick — reskin the trigger and
 * popup.
 *
 * Mirrors React `examples/demo/src/demos/popconfirm/TokensOverride.demo.tsx`.
 */
import { SgButton, SgPopconfirm } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { title: 'Reset preferences?', ok: 'Reset', button: 'Reset' },
  ru: { title: 'Сбросить настройки?', ok: 'Сбросить', button: 'Сбросить' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgPopconfirm :title="t.title" :ok-text="t.ok">
        <SgButton>{{ t.button }}</SgButton>
      </SgPopconfirm>
    </template>
  </TokenScopeCards>
</template>
