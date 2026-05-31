<script setup lang="ts">
/**
 * Custom #3 — Search-driven command palette (dark).
 *
 * Dark gradient surface, fuzzy search, shortcut chips. Items are built
 * from a typed command list and re-derived whenever the query changes.
 * Rich rows go through `h()` VNodes inside `label`, exactly as the
 * public Menu API allows.
 */
import { computed, h, ref, type CSSProperties, type VNodeChild } from 'vue'
import { SgMenu, type MenuItem } from '@skygraph/vue'

type Cmd = {
  key: string
  group: string
  label: string
  hint: string
  shortcut?: string
}

const COMMANDS: Cmd[] = [
  {
    key: 'go-dashboard',
    group: 'Navigate',
    label: 'Go to Dashboard',
    hint: 'jump to overview',
    shortcut: 'G D',
  },
  {
    key: 'go-projects',
    group: 'Navigate',
    label: 'Go to Projects',
    hint: 'all workspaces',
    shortcut: 'G P',
  },
  {
    key: 'go-inbox',
    group: 'Navigate',
    label: 'Go to Inbox',
    hint: 'notifications',
    shortcut: 'G I',
  },
  {
    key: 'new-task',
    group: 'Create',
    label: 'New task',
    hint: 'add to current project',
    shortcut: '⌘ N',
  },
  { key: 'new-doc', group: 'Create', label: 'New document', hint: 'blank page', shortcut: '⌘ D' },
  { key: 'new-team', group: 'Create', label: 'New team', hint: 'invite members', shortcut: '⌘ T' },
  {
    key: 'toggle-theme',
    group: 'Settings',
    label: 'Toggle theme',
    hint: 'light / dark',
    shortcut: '⌘ ⇧ L',
  },
  {
    key: 'open-settings',
    group: 'Settings',
    label: 'Open settings',
    hint: 'account, billing',
    shortcut: '⌘ ,',
  },
  { key: 'sign-out', group: 'Account', label: 'Sign out', hint: 'end session' },
]

const query = ref('')
const selected = ref<string[]>([])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return COMMANDS
  return COMMANDS.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(q) ||
      cmd.hint.toLowerCase().includes(q) ||
      cmd.group.toLowerCase().includes(q),
  )
})

function row(cmd: Cmd): VNodeChild {
  return h(
    'span',
    { style: { display: 'flex', alignItems: 'center', gap: '12px', width: '100%', minWidth: 0 } },
    [
      h('span', { style: { display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 } }, [
        h('span', { style: { fontWeight: 500 } }, cmd.label),
        h(
          'span',
          {
            style: {
              fontSize: '11px',
              opacity: 0.65,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          },
          cmd.hint,
        ),
      ]),
      cmd.shortcut
        ? h(
            'kbd',
            {
              style: {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 8px',
                fontSize: '11px',
                fontFamily: 'var(--sg-font-mono, monospace)',
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '6px',
                letterSpacing: '0.04em',
              },
            },
            cmd.shortcut,
          )
        : null,
    ],
  )
}

const items = computed<MenuItem[]>(() => {
  const groups = new Map<string, Cmd[]>()
  for (const cmd of filtered.value) {
    if (!groups.has(cmd.group)) groups.set(cmd.group, [])
    groups.get(cmd.group)!.push(cmd)
  }
  const out: MenuItem[] = []
  let i = 0
  for (const [name, list] of groups) {
    if (i > 0) out.push({ key: `div-${name}`, type: 'divider', label: '' })
    out.push({
      key: `g-${name}`,
      type: 'group',
      label: name,
      children: list.map((cmd) => ({ key: cmd.key, label: row(cmd) })),
    })
    i += 1
  }
  return out
})

const wrapperStyle: CSSProperties = {
  width: '380px',
  padding: '14px',
  borderRadius: '16px',
  color: '#fff',
  background:
    'radial-gradient(120% 80% at 100% 0%, rgba(59,130,246,0.25) 0%, transparent 55%), linear-gradient(160deg,#0b1220 0%,#111827 55%,#1f2937 100%)',
  border: '1px solid rgba(148, 163, 184, 0.18)',
  boxShadow: '0 22px 40px -18px rgba(15,23,42,0.55)',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96,165,250,0.18)',
  '--sg-border-radius': '10px',
  '--sg-padding-lg': '14px',
} as CSSProperties

function onSelect(info: { key: string; selectedKeys: string[] }) {
  selected.value = info.selectedKeys
}
</script>

<template>
  <div :style="wrapperStyle">
    <div
      style="
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        margin-bottom: 10px;
        background: rgba(15, 23, 42, 0.55);
        border: 1px solid rgba(148, 163, 184, 0.18);
        border-radius: 10px;
      "
    >
      <span aria-hidden="true" style="font-size: 14px; opacity: 0.7">⌕</span>
      <input
        v-model="query"
        placeholder="Type a command…"
        aria-label="Search commands"
        :style="{
          all: 'unset',
          flex: 1,
          fontSize: '13px',
          color: '#e2e8f0',
          caretColor: '#60a5fa',
        }"
      />
      <kbd
        style="
          font-size: 10px;
          padding: 2px 6px;
          color: rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 6px;
        "
        >⌘ K</kbd
      >
    </div>
    <div style="max-height: 320px; overflow-y: auto">
      <SgMenu
        mode="inline"
        theme="dark"
        :items="items"
        :selected-keys="selected"
        @select="onSelect"
      />
    </div>
  </div>
</template>
