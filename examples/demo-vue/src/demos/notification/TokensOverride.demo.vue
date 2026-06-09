<script setup lang="ts">
/**
 * Live toasts render in a portal at the document root, so a scoped wrapper
 * can't restyle them. The preview below renders the real `.sg-notification`
 * markup inside each scope so you can see how the tokens cascade. Three recipes
 * — branded green, dark field, glass pick.
 *
 * Mirrors React `examples/demo/src/demos/notification/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { title: 'Backup complete', desc: 'Tint follows --sg-color-success.' },
  ru: { title: 'Бэкап завершён', desc: 'Оттенок следует за --sg-color-success.' },
} as const

const t = useDemoStrings(STRINGS)

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-success': '#059669' } as CSSProperties,
  dark: { '--sg-color-success': '#34d399' } as CSSProperties,
  glass: { '--sg-color-success': '#6366f1' } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <div
        class="sg-notification sg-notification-success"
        style="position: static; animation: none; min-width: 200px"
      >
        <span class="sg-notification-icon">✓</span>
        <div class="sg-notification-content">
          <div class="sg-notification-message">{{ t.title }}</div>
          <div class="sg-notification-description">{{ t.desc }}</div>
        </div>
      </div>
    </template>
  </TokenScopeCards>
</template>
