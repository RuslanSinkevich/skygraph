<script setup lang="ts">
/**
 * The default slot accepts arbitrary VNodes — embed rich labels with
 * descriptions, links, or badges. Keep the touch target tight by
 * wrapping extra text inside the same slotted element.
 */
import { SgCheckbox } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    twoFa: 'Enable two-factor authentication',
    twoFaHint: 'Adds a second step after password — recommended for admins.',
    acceptPrefix: 'I accept the',
    terms: 'Terms of Service',
    and: 'and',
    privacy: 'Privacy Policy',
  },
  ru: {
    twoFa: 'Включить двухфакторную аутентификацию',
    twoFaHint: 'Добавляет второй шаг после пароля — рекомендуется для админов.',
    acceptPrefix: 'Я принимаю',
    terms: 'Условия использования',
    and: 'и',
    privacy: 'Политику конфиденциальности',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 12px">
    <SgCheckbox default-checked>
      <div>
        <div>{{ t.twoFa }}</div>
        <div style="font-size: 12px; color: var(--sg-color-text-tertiary)">
          {{ t.twoFaHint }}
        </div>
      </div>
    </SgCheckbox>

    <SgCheckbox>
      <span>
        {{ t.acceptPrefix }}
        <a href="#terms" @click.prevent>{{ t.terms }}</a>
        {{ t.and }}
        <a href="#privacy" @click.prevent>{{ t.privacy }}</a>
      </span>
    </SgCheckbox>
  </div>
</template>
