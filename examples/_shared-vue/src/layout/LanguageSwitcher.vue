<script setup lang="ts">
export interface LanguageOption {
  /** Language code (e.g. `'en'`). */
  code: string
  /** Short label shown on the button (e.g. `'EN'`). */
  label: string
  /** Tooltip / aria title (e.g. `'English'`). */
  fullName?: string
}

interface Props {
  /** Available languages. */
  options: readonly LanguageOption[]
  /** Currently-active language code. */
  active: string
  /** Group aria-label. */
  groupLabel?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'change', code: string): void
}>()
</script>

<template>
  <div role="group" :aria-label="groupLabel ?? 'Language'" class="xshell-lang">
    <button
      v-for="opt in options"
      :key="opt.code"
      type="button"
      :class="opt.code === active ? 'xshell-lang-btn xshell-lang-btn--active' : 'xshell-lang-btn'"
      :aria-pressed="opt.code === active"
      :title="opt.fullName ?? opt.label"
      @click="emit('change', opt.code)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>
