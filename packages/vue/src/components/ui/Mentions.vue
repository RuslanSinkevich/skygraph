<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

export interface MentionOption {
  value: string
  label?: string
  disabled?: boolean
}

export interface MentionsProps {
  /** v-model binding (Vue idiom). */
  modelValue?: string
  /** Compat alias. */
  value?: string
  /** Initial value when uncontrolled. */
  defaultValue?: string
  /** Placeholder text. */
  placeholder?: string
  /** Mention prefix character(s). */
  prefix?: string | string[]
  /** Number of textarea rows. */
  rows?: number
  /** Mention suggestion options. */
  options?: MentionOption[]
  /** Disables interaction. */
  disabled?: boolean
  /** Strips built-in styling. */
  unstyled?: boolean
}

const props = withDefaults(defineProps<MentionsProps>(), {
  prefix: '@',
  rows: 4,
  disabled: false,
  options: () => [],
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'search', text: string, prefix: string): void
  (e: 'select', option: MentionOption, prefix: string): void
}>()

const internal = ref<string>(props.modelValue ?? props.value ?? props.defaultValue ?? '')
watch(
  () => props.modelValue ?? props.value,
  (v) => {
    if (v !== undefined) internal.value = v
  },
)
const current = computed(() => props.modelValue ?? props.value ?? internal.value)

const showSuggest = ref(false)
const search = ref('')
const activePrefix = ref('')
const cursorPos = ref(0)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const prefixes = computed(() => (Array.isArray(props.prefix) ? props.prefix : [props.prefix]))

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  const v = target.value
  internal.value = v
  emit('update:modelValue', v)
  emit('change', v)

  const pos = target.selectionStart ?? v.length
  cursorPos.value = pos
  const before = v.slice(0, pos)

  for (const p of prefixes.value) {
    const idx = before.lastIndexOf(p)
    if (idx >= 0) {
      const between = before.slice(idx + p.length)
      if (!/\s/.test(between)) {
        activePrefix.value = p
        search.value = between
        showSuggest.value = true
        emit('search', between, p)
        return
      }
    }
  }
  showSuggest.value = false
}

const filteredOptions = computed(() =>
  props.options.filter((o) => !search.value || o.value.toLowerCase().includes(search.value.toLowerCase())),
)

function selectOption(opt: MentionOption) {
  if (opt.disabled) return
  const v = current.value
  const pos = cursorPos.value
  const before = v.slice(0, pos)
  const after = v.slice(pos)
  const idx = before.lastIndexOf(activePrefix.value)
  const newBefore = before.slice(0, idx) + activePrefix.value + opt.value + ' '
  const newValue = newBefore + after
  internal.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
  emit('select', opt, activePrefix.value)
  showSuggest.value = false
  void nextTick(() => {
    if (textareaRef.value) {
      const newPos = newBefore.length
      textareaRef.value.focus()
      textareaRef.value.setSelectionRange(newPos, newPos)
    }
  })
}

const wrapperCls = computed(() =>
  props.unstyled ? '' : ['sg-mentions', props.disabled ? 'sg-mentions-disabled' : ''].filter(Boolean).join(' '),
)
</script>

<template>
  <div :class="wrapperCls">
    <textarea
      ref="textareaRef"
      class="sg-mentions-textarea"
      :value="current"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      @input="handleInput"
    />
    <ul v-if="showSuggest && filteredOptions.length" class="sg-mentions-dropdown">
      <li
        v-for="opt in filteredOptions"
        :key="opt.value"
        :class="[
          'sg-mentions-option',
          opt.disabled ? 'sg-mentions-option-disabled' : '',
        ]"
        @mousedown.prevent="selectOption(opt)"
      >{{ opt.label ?? opt.value }}</li>
    </ul>
  </div>
</template>
