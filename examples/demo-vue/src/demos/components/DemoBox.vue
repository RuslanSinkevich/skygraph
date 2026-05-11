<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from '../../i18n'
import SourceCode from './SourceCode.vue'

/**
 * `DemoBox` — single example card.
 *
 * Mirrors React `examples/demo/src/components/DemoBox.tsx` 1:1 (same
 * `.demo-box*` DOM, same i18n keys via `t.demoBox.*`):
 *   - `code` is the **raw file contents** (`?raw`-import of the
 *     example .vue file), not a manually-typed snippet.
 *   - copy / show / hide buttons share the i18n strings from
 *     `useI18n().t.demoBox.*` (paritet React `t.demoBox.*`).
 *   - `flush` / `vertical` toggle the preview layout for wide
 *     components (Table, Charts) and stacked previews.
 *
 * Vue-side delta vs React: the code block is rendered through the
 * existing {@link SourceCode} component (a `<pre><code>` wrapper),
 * placed inside `.demo-box-code`. React inlines `<pre><code>{code}` —
 * the wrapping class and DOM shape match. SourceCode is kept as a
 * seam for future syntax-highlighting without touching DemoBox; see
 * `docs/_streams/decisions/T-Vue-Demo-Wrappers-Parity.md`.
 */
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

const previewClasses = computed(() =>
  [
    'demo-box-preview',
    props.flush ? 'demo-box-preview-flush' : '',
    props.vertical ? 'demo-box-preview-vertical' : '',
  ]
    .filter(Boolean)
    .join(' '),
)

async function copy() {
  if (!hasCode.value || !props.code) return
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1600)
  } catch {
    // ignore — older browsers / insecure context
  }
}

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div class="demo-box">
    <div :class="previewClasses">
      <slot />
    </div>

    <div class="demo-box-meta">
      <div class="demo-box-title">{{ title }}</div>
      <div v-if="description" class="demo-box-description">{{ description }}</div>
    </div>

    <div
      v-if="hasCode"
      class="demo-box-actions"
      role="toolbar"
      :aria-label="t.demoBox.toolbarLabel"
    >
      <button
        type="button"
        class="demo-box-action"
        :aria-label="t.demoBox.copyCode"
        :title="copied ? t.demoBox.copiedToast : t.demoBox.copyCode"
        @click="copy"
      >
        <span aria-hidden="true">{{ copied ? '✓' : '⎘' }}</span>
        <span>{{ copied ? t.demoBox.copied : t.demoBox.copy }}</span>
      </button>
      <button
        type="button"
        class="demo-box-action"
        :aria-expanded="open"
        :aria-label="open ? t.demoBox.hideCodeAria : t.demoBox.showCodeAria"
        @click="toggle"
      >
        <span aria-hidden="true">{{ open ? '⌃' : '⌄' }}</span>
        <span>{{ open ? t.demoBox.hideCode : t.demoBox.showCode }}</span>
      </button>
    </div>

    <div v-if="open && hasCode" class="demo-box-code">
      <SourceCode :source="code ?? ''" />
    </div>
  </div>
</template>
