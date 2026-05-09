<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from '../i18n'

interface Props {
  title: string
  description?: string
  code?: string
  defaultOpen?: boolean
  flush?: boolean
  vertical?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
  flush: false,
  vertical: false,
})

const { t } = useI18n()
const open = ref(props.defaultOpen)
const copied = ref(false)
const hasCode = computed(() => typeof props.code === 'string' && props.code.trim().length > 0)

const previewClasses = computed(() => [
  'dv-demo-preview',
  props.flush ? 'dv-demo-preview-flush' : '',
  props.vertical ? 'dv-demo-preview-vertical' : '',
].filter(Boolean).join(' '))

async function copy() {
  if (!hasCode.value || !props.code) return
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1600)
  } catch {
    // ignore
  }
}

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div class="dv-demo">
    <div :class="previewClasses">
      <slot />
    </div>

    <div class="dv-demo-meta">
      <div class="dv-demo-title">{{ title }}</div>
      <div v-if="description" class="dv-demo-desc">{{ description }}</div>
    </div>

    <div v-if="hasCode" class="dv-demo-actions" role="toolbar">
      <button
        type="button"
        class="dv-demo-action"
        @click="copy"
      >
        <span aria-hidden>{{ copied ? '✓' : '⎘' }}</span>
        <span>{{ copied ? t.componentDoc.copied : t.componentDoc.copy }}</span>
      </button>
      <button
        type="button"
        class="dv-demo-action"
        :aria-expanded="open"
        @click="toggle"
      >
        <span aria-hidden>{{ open ? '⌃' : '⌄' }}</span>
        <span>{{ open ? t.componentDoc.hideCode : t.componentDoc.showCode }}</span>
      </button>
    </div>

    <div v-if="open && hasCode" class="dv-demo-code">
      <pre><code>{{ code }}</code></pre>
    </div>
  </div>
</template>
