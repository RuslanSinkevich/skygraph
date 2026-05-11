<script setup lang="ts">
/**
 * FrameworkSwitcher — Wave 3.4 port of
 * `examples/demo/src/components/FrameworkSwitcher.tsx`.
 *
 * DOM/markup parity (role="tablist", role="tab", aria-selected) is kept
 * 1:1 with React. Inline styling mirrors the React reference so visual
 * output matches without a stylesheet contribution.
 *
 * Buttons that are not yet shipped (`ready: false`) render as a `<span>`
 * with `aria-disabled="true"` and a "Coming soon" tooltip. Anchors use
 * plain `<a href>` because they navigate between separate built demos
 * (different Vite outputs) — vue-router cannot resolve them.
 */
import { useI18n } from '../i18n'

type Framework = 'react' | 'vue' | 'angular'

interface FrameworkSpec {
  id: Framework
  label: string
  href: string
  ready: boolean
}

const FRAMEWORKS: FrameworkSpec[] = [
  { id: 'react', label: 'React', href: '/', ready: false },
  { id: 'vue', label: 'Vue', href: '/vue/', ready: true },
  { id: 'angular', label: 'Angular', href: '/angular/', ready: false },
]

defineProps<{
  active: Framework
}>()

const { t } = useI18n()

const containerStyle = {
  display: 'inline-flex',
  gap: '4px',
  padding: '2px',
  borderRadius: '8px',
  border: '1px solid var(--sg-border, #e5e7eb)',
  background: 'var(--sg-surface, transparent)',
} as const

const baseStyle = {
  padding: '4px 10px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: 500,
  fontFamily: 'inherit',
  textDecoration: 'none',
  transition: 'background 150ms, color 150ms',
} as const

function disabledStyle() {
  return {
    ...baseStyle,
    color: 'var(--sg-text-muted, #9ca3af)',
    cursor: 'not-allowed',
    opacity: 0.55,
  }
}

function readyStyle(isActive: boolean) {
  return {
    ...baseStyle,
    color: isActive ? 'var(--sg-text, #111827)' : 'var(--sg-text-muted, #6b7280)',
    background: isActive ? 'var(--sg-bg-hover, #f3f4f6)' : 'transparent',
    cursor: 'pointer',
  }
}
</script>

<template>
  <div role="tablist" :aria-label="t.frameworkSwitcher.label" :style="containerStyle">
    <template v-for="f in FRAMEWORKS" :key="f.id">
      <span
        v-if="!f.ready"
        role="tab"
        aria-disabled="true"
        :title="t.frameworkSwitcher.comingSoonTitle"
        :style="disabledStyle()"
      >
        {{ f.label }}
      </span>
      <a
        v-else
        :href="f.href"
        role="tab"
        :aria-selected="f.id === active"
        :style="readyStyle(f.id === active)"
      >
        {{ f.label }}
      </a>
    </template>
  </div>
</template>
