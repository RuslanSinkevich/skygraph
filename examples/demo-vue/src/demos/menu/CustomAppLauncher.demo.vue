<script setup lang="ts">
/**
 * Custom #1 — App launcher sidebar.
 *
 * SaaS-style launcher: gradient brand mark, coloured glyph badges, soft
 * elevated surface. Only `--sg-*` tokens are scoped on the wrapper — no
 * global overrides, no extra CSS classes.
 */
import { h, ref, type CSSProperties, type VNodeChild } from 'vue'
import { SgMenu, type MenuItem } from '@skygraph/vue'

const glyph = (ch: string, bg: string): VNodeChild =>
  h(
    'span',
    {
      'aria-hidden': true,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        borderRadius: '8px',
        background: bg,
        color: '#fff',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
    },
    ch,
  )

const items: MenuItem[] = [
  { key: 'inbox', label: 'Inbox', icon: glyph('✉', 'linear-gradient(135deg,#5b8def,#3b6cff)') },
  { key: 'tasks', label: 'Tasks', icon: glyph('✓', 'linear-gradient(135deg,#34c759,#1ea14b)') },
  { key: 'docs', label: 'Documents', icon: glyph('¶', 'linear-gradient(135deg,#ffb84d,#ff8a00)') },
  {
    key: 'calendar',
    label: 'Calendar',
    icon: glyph('◫', 'linear-gradient(135deg,#ff7a8b,#e63b67)'),
  },
  {
    key: 'team',
    label: 'Workspaces',
    icon: glyph('◌', 'linear-gradient(135deg,#a78bfa,#7c3aed)'),
    children: [
      { key: 'design', label: 'Design' },
      { key: 'engineering', label: 'Engineering' },
      { key: 'marketing', label: 'Marketing' },
    ],
  },
]

const selected = ref<string[]>(['inbox'])

const wrapperStyle: CSSProperties = {
  width: '280px',
  padding: '16px',
  borderRadius: '18px',
  background:
    'linear-gradient(180deg, color-mix(in srgb, var(--sg-color-primary) 6%, var(--sg-color-bg) 94%) 0%, var(--sg-color-bg) 100%)',
  border:
    '1px solid color-mix(in srgb, var(--sg-color-primary) 14%, var(--sg-color-border-secondary) 86%)',
  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
  '--sg-color-primary-bg':
    'color-mix(in srgb, var(--sg-color-primary) 12%, var(--sg-color-bg) 88%)',
  '--sg-color-bg-hover': 'color-mix(in srgb, var(--sg-color-primary) 5%, var(--sg-color-bg) 95%)',
  '--sg-border-radius': '10px',
  '--sg-padding-lg': '14px',
} as CSSProperties

function onSelect(info: { key: string; selectedKeys: string[] }) {
  selected.value = info.selectedKeys
}
</script>

<template>
  <div :style="wrapperStyle">
    <div style="display: flex; align-items: center; gap: 10px; padding: 4px 8px 14px">
      <span
        aria-hidden="true"
        :style="{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 700,
        }"
        >S</span
      >
      <div style="display: flex; flex-direction: column; line-height: 1.2">
        <span style="font-weight: 700; font-size: 14px">SkyGraph Cloud</span>
        <span
          style="
            font-size: 11px;
            color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
          "
        >
          ny-prod · synced
        </span>
      </div>
    </div>
    <SgMenu
      mode="inline"
      :items="items"
      :selected-keys="selected"
      :default-open-keys="['team']"
      @select="onSelect"
    />
  </div>
</template>
