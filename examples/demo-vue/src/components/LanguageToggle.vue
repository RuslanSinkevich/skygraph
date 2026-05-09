<script setup lang="ts">
import { useI18n } from '../i18n'
import { SUPPORTED_LOCALES, type Locale } from '../i18n/types'

const { t, locale, setLocale } = useI18n()

function pick(next: Locale) {
  setLocale(next)
}
</script>

<template>
  <div
    class="dv-lang"
    role="group"
    :aria-label="t.header.languageAria"
  >
    <button
      v-for="code in SUPPORTED_LOCALES"
      :key="code"
      type="button"
      class="dv-lang-btn"
      :class="{ 'dv-lang-btn-active': locale === code }"
      :aria-pressed="locale === code"
      @click="pick(code)"
    >
      {{ code.toUpperCase() }}
    </button>
  </div>
</template>
