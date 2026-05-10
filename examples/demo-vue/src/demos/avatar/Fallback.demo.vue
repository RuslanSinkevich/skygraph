<script setup lang="ts">
/**
 * When `src` is missing, the avatar falls back to the `icon` slot,
 * and when that's also empty, to the default slot text. Use this to
 * render initials when a photo URL hasn't loaded yet.
 */
import { SgAvatar } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    photoAlt: 'Photo',
    unknownUser: 'Unknown user',
  },
  ru: {
    photoAlt: 'Фото',
    unknownUser: 'Неизвестный пользователь',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <SgAvatar
      size="large"
      src="https://api.dicebear.com/7.x/miniavs/svg?seed=3"
      :alt="t.photoAlt"
    />
    <SgAvatar size="large" :aria-label="t.unknownUser">
      <template #icon>
        <span aria-hidden="true">👤</span>
      </template>
    </SgAvatar>
    <SgAvatar size="large">AB</SgAvatar>
    <SgAvatar size="large">김</SgAvatar>
  </div>
</template>
