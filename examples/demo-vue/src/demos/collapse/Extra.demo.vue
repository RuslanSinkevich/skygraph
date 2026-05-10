<script setup lang="ts">
/**
 * `extra` lives on each item and renders to the right of the header
 * text. Use it for short status tags or counts.
 *
 * Vue-specific delta: `CollapseItem.extra` is `string` only — the
 * Vue component renders it inside a `<span>`, so React's "rich
 * `ReactNode` extra" (Tag / Button) cannot be ported 1:1. See
 * `docs/_streams/findings/T-Vue-Demo-Display.md` →
 * `collapse-rich-extra-no-vue` for follow-up.
 */
import { SgCollapse, type CollapseItem } from '@skygraph/vue'

const items: CollapseItem[] = [
  {
    key: 'billing',
    label: 'Billing information',
    extra: 'Up to date',
    content: 'Visa •••• 4242 — next invoice 1 May.',
  },
  {
    key: 'team',
    label: 'Team members',
    extra: '3 pending',
    content: 'Alice, Bob, Charlie — invites sent 3 days ago.',
  },
  {
    key: 'danger',
    label: 'Danger zone',
    extra: 'Sensitive',
    content: 'Reset API keys and invalidate every session.',
  },
]
</script>

<template>
  <SgCollapse :items="items" :default-active-key="['billing']" />
</template>
