<script setup lang="ts">
/**
 * Custom #2 — Glass-morphism horizontal nav.
 *
 * Floating header over a colourful hero. Wrapper provides the frosted
 * surface and re-scopes `--sg-*` tokens so menu items adopt indigo-tinted
 * hover / selection states; menu DOM stays default.
 */
import { ref, type CSSProperties } from 'vue'
import { SgMenu, type MenuItem } from '@skygraph/vue'

const items: MenuItem[] = [
  { key: 'product', label: 'Product' },
  {
    key: 'solutions',
    label: 'Solutions',
    children: [
      { key: 'sol-startups', label: 'For startups' },
      { key: 'sol-enterprise', label: 'For enterprise' },
      { key: 'sol-agencies', label: 'For agencies' },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    children: [
      { key: 'res-docs', label: 'Documentation' },
      { key: 'res-changelog', label: 'Changelog' },
      { key: 'res-community', label: 'Community' },
    ],
  },
  { key: 'pricing', label: 'Pricing' },
  { key: 'company', label: 'Company' },
]

const selected = ref<string[]>(['product'])

const heroStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  minHeight: '220px',
  padding: '28px',
  borderRadius: '20px',
  background:
    'radial-gradient(120% 90% at 0% 0%, #c7d2fe 0%, transparent 55%), radial-gradient(120% 90% at 100% 30%, #fbcfe8 0%, transparent 55%), linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
  overflow: 'hidden',
  isolation: 'isolate',
}

const barStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '18px',
  padding: '8px 14px',
  borderRadius: '14px',
  background: 'rgba(255, 255, 255, 0.55)',
  backdropFilter: 'blur(18px) saturate(140%)',
  WebkitBackdropFilter: 'blur(18px) saturate(140%)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.16)',
  '--sg-color-bg-hover': 'rgba(255, 255, 255, 0.55)',
  '--sg-color-primary-bg': 'rgba(255, 255, 255, 0.7)',
  '--sg-color-primary': '#312e81',
  '--sg-color-primary-hover': '#4f46e5',
  '--sg-color-text': '#1e1b4b',
  '--sg-color-bg-container': 'transparent',
} as CSSProperties

function onSelect(info: { key: string; selectedKeys: string[] }) {
  selected.value = info.selectedKeys
}
</script>

<template>
  <div :style="heroStyle">
    <div :style="barStyle">
      <div style="display: flex; align-items: center; gap: 8px; padding-left: 6px; color: #1e1b4b">
        <span
          aria-hidden="true"
          style="
            width: 22px;
            height: 22px;
            border-radius: 7px;
            background: linear-gradient(135deg, #6366f1, #ec4899);
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
          "
        />
        <span style="font-weight: 700; letter-spacing: -0.01em">Nimbus</span>
      </div>
      <div style="flex: 1; min-width: 0">
        <SgMenu mode="horizontal" :items="items" :selected-keys="selected" @select="onSelect" />
      </div>
      <button
        type="button"
        style="
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          background: linear-gradient(135deg, #4338ca, #db2777);
          color: #fff;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          box-shadow: 0 6px 14px rgba(67, 56, 202, 0.35);
        "
      >
        Try free
      </button>
    </div>
    <p
      style="
        margin-top: 28px;
        margin-bottom: 6px;
        font-size: 22px;
        font-weight: 700;
        color: #fff;
        line-height: 1.2;
        max-width: 480px;
        text-shadow: 0 1px 12px rgba(15, 23, 42, 0.25);
      "
    >
      Ship interfaces that feel like the future.
    </p>
    <p style="font-size: 13px; color: rgba(255, 255, 255, 0.85); max-width: 520px">
      Glass-morphism navigation built on default
      <code>&lt;SgMenu mode=&quot;horizontal&quot;&gt;</code> — only tokens are re-scoped on the
      wrapper.
    </p>
  </div>
</template>
