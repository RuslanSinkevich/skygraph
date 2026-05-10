<script setup lang="ts">
import {
  SgButton,
  SgCheckbox,
  SgConfigProvider,
  SgInput,
  SgSwitch,
  SgTag,
} from '@skygraph/vue'

const scopeStyle = {
  '--sg-color-primary': '#ea580c',
  '--sg-color-primary-bg': 'rgba(234, 88, 12, 0.12)',
  '--sg-color-primary-hover': '#f97316',
  '--sg-border-radius': '10px',
  padding: '20px',
  borderRadius: '12px',
  border: '1px dashed var(--sg-color-border)',
} as Record<string, string>
</script>

<template>
  <div :style="scopeStyle">
    <SgConfigProvider size="middle">
      <div style="display: flex; flex-direction: column; gap: 12px">
        <p
          style="margin: 0; font-size: 13px; color: var(--sg-color-text-secondary)"
        >
          Theming and behaviour are orthogonal: CSS tokens are set on the
          wrapper, <code>SgConfigProvider</code> handles size / disabled /
          locale. Scope them together to ship self-contained micro-themes.
        </p>
        <div
          style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap"
        >
          <SgButton type="primary">Buy now</SgButton>
          <SgButton>Learn more</SgButton>
          <SgInput placeholder="Email" :style="{ width: '180px' }" />
          <SgSwitch :default-checked="true" />
          <SgCheckbox :default-checked="true">Opt in</SgCheckbox>
          <SgTag color="processing">Orange scope</SgTag>
        </div>
      </div>
    </SgConfigProvider>
  </div>
</template>
