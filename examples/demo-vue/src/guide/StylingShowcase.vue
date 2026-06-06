<script setup lang="ts">
/**
 * Guide → Styling Showcase (`/guide/styling-showcase`) — Vue 3 port of
 * `examples/demo/src/demos/StylingShowcasePage.tsx`.
 *
 * The previous version of this file was a 30-line stub that linked to
 * the private GitHub repo. That contradicted the "everything works on
 * the demo site" promise on the landing page, so it's been replaced by
 * a real implementation.
 *
 * Scope-cut vs. React: the React reference ships 15 recipes incl. slot
 * overrides, conditional rows / cells, and headless modals. Those rely
 * on Table/List slot APIs that are React-specific (cellClassName fn,
 * unstyled prop on Modal) and would balloon this file past 1k lines.
 * The seven recipes ported here cover the conceptual ground users hit
 * first — palette, semantic tokens, scoped brand, dark scope, two
 * component-token examples and a composed per-feature brand.
 */
import { ref, computed } from 'vue'
import { SgButton, SgInput, SgSwitch, SgProgress, SgTag, SgBadge } from '@skygraph/vue'
import { ComponentDoc, DemoBox } from '../demos/components'
import { useI18n } from '../i18n'

const { t } = useI18n()
const s = computed(() => t.value.stylingShowcase)

const paletteTokens = [
  { name: 'blue', shades: 10 },
  { name: 'gray', shades: 10 },
  { name: 'red', shades: 10 },
  { name: 'green', shades: 10 },
  { name: 'orange', shades: 10 },
]

const semanticTokens = [
  '--sg-color-bg',
  '--sg-color-bg-elevated',
  '--sg-color-bg-secondary',
  '--sg-color-text',
  '--sg-color-text-secondary',
  '--sg-color-border',
  '--sg-color-border-secondary',
  '--sg-color-primary',
  '--sg-color-primary-hover',
  '--sg-color-primary-bg',
  '--sg-color-success',
  '--sg-color-error',
  '--sg-color-warning',
]

function shadesOf(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i + 1)
}

const PALETTE_CODE = `/* Every palette token is stable. */
var(--sg-blue-1) … var(--sg-blue-10)
var(--sg-gray-1) … var(--sg-gray-10)
var(--sg-red-1) … var(--sg-red-10)
var(--sg-green-1) … var(--sg-green-10)
var(--sg-orange-1) … var(--sg-orange-10)`

const SEMANTIC_CODE = `/* Semantic tokens follow data-sg-theme="dark|light".
   Override them to re-skin without touching components. */
var(--sg-color-bg)
var(--sg-color-text)
var(--sg-color-primary)
var(--sg-color-success) | --sg-color-error | --sg-color-warning`

const SCOPED_BRAND_CODE = `<div :style="{
  '--sg-color-primary': '#e91e63',
  '--sg-color-primary-hover': '#c2185b',
  '--sg-color-primary-bg': '#fce4ec',
  '--sg-border-radius': '10px',
  '--sg-font-size': '15px',
}">
  <SgButton type="primary">Primary</SgButton>
  <SgInput placeholder="Inherits tokens" />
  <SgSwitch :modelValue="true" />
  <SgProgress :percent="60" />
</div>`

const DARK_SCOPE_CODE = `<div data-sg-theme="dark" :style="{ padding: '16px', borderRadius: '8px', background: '#0d1117' }">
  <SgButton type="primary">Primary</SgButton>
  <SgInput placeholder="Dark input" />
  <SgTag color="success">active</SgTag>
</div>`

const BTN_TOKENS_CODE = `<div :style="{
  '--sg-btn-height': '40px',
  '--sg-btn-radius': '999px',
  '--sg-btn-font-size': '15px',
  '--sg-btn-padding': '0 20px',
}">
  <SgButton type="primary">Pill primary</SgButton>
  <SgButton>Pill default</SgButton>
</div>`

const INPUT_TOKENS_CODE = `<div :style="{
  '--sg-input-height': '44px',
  '--sg-input-radius': '14px',
  '--sg-input-font-size': '16px',
}">
  <SgInput placeholder="Rounded soft input" />
</div>`

const PER_FEATURE_CODE = `const scope = {
  '--sg-color-primary': primary,
  '--sg-color-primary-bg': \`color-mix(in srgb, \${primary} 18%, var(--sg-color-bg) 82%)\`,
  '--sg-border-radius': \`\${radius}px\`,
  '--sg-btn-radius': \`\${radius}px\`,
  '--sg-input-radius': \`\${radius}px\`,
}

<div :style="scope">…</div>`

const radius = ref(10)
const primary = ref('#7c3aed')

const perFeatureScope = computed(() => ({
  '--sg-color-primary': primary.value,
  '--sg-color-primary-hover': primary.value,
  '--sg-color-primary-bg': `color-mix(in srgb, ${primary.value} 18%, var(--sg-color-bg) 82%)`,
  '--sg-border-radius': `${radius.value}px`,
  '--sg-btn-radius': `${radius.value}px`,
  '--sg-input-radius': `${radius.value}px`,
  '--sg-table-header-bg': `color-mix(in srgb, ${primary.value} 10%, var(--sg-color-bg) 90%)`,
}))
</script>

<template>
  <ComponentDoc
    :title="s.pageTitle"
    :description="s.pageLead"
    :when-to-use="[s.when1, s.when2, s.when3]"
  >
    <DemoBox :title="s.recipePaletteTitle" :description="s.recipePaletteDesc" :code="PALETTE_CODE">
      <div class="demo-swatches">
        <template v-for="p in paletteTokens" :key="p.name">
          <div v-for="shade in shadesOf(p.shades)" :key="`${p.name}-${shade}`" class="demo-swatch">
            <div class="demo-swatch-box" :style="{ background: `var(--sg-${p.name}-${shade})` }" />
            <div class="demo-swatch-meta">
              <strong>--sg-{{ p.name }}-{{ shade }}</strong>
              {{ p.name }}-{{ shade }}
            </div>
          </div>
        </template>
      </div>
    </DemoBox>

    <DemoBox
      :title="s.recipeSemanticTitle"
      :description="s.recipeSemanticDesc"
      :code="SEMANTIC_CODE"
    >
      <div class="demo-swatches">
        <div v-for="token in semanticTokens" :key="token" class="demo-swatch">
          <div class="demo-swatch-box" :style="{ background: `var(${token})` }" />
          <div class="demo-swatch-meta">
            <strong>{{ token }}</strong>
            {{ s.swatchSemanticBadge }}
          </div>
        </div>
      </div>
    </DemoBox>

    <DemoBox
      :title="s.recipeScopedBrandTitle"
      :description="s.recipeScopedBrandDesc"
      :code="SCOPED_BRAND_CODE"
    >
      <div
        class="demo-scope-card"
        :style="{
          width: '100%',
          '--sg-color-primary': '#e91e63',
          '--sg-color-primary-hover': '#c2185b',
          '--sg-color-primary-bg': '#fce4ec',
          '--sg-border-radius': '10px',
          '--sg-font-size': '15px',
        }"
      >
        <h4>{{ s.recipeScopedBrandHeading }}</h4>
        <div class="demo-scope-row">
          <SgButton type="primary">{{ s.scopedBrandPrimary }}</SgButton>
          <SgButton>{{ s.scopedBrandDefault }}</SgButton>
          <SgInput :style="{ width: '240px' }" :placeholder="s.scopedBrandInputPlaceholder" />
          <SgSwitch :modelValue="true" />
        </div>
        <SgProgress :percent="60" />
      </div>
    </DemoBox>

    <DemoBox :title="s.recipeDarkTitle" :description="s.recipeDarkDesc" :code="DARK_SCOPE_CODE">
      <div data-sg-theme="dark" class="demo-dark-scope" :style="{ width: '100%' }">
        <div class="demo-scope-row" :style="{ gap: '12px' }">
          <SgButton type="primary">{{ s.darkPrimary }}</SgButton>
          <SgButton>{{ s.darkDefault }}</SgButton>
          <SgInput :style="{ width: '220px' }" :placeholder="s.darkInputPlaceholder" />
          <SgTag color="success">active</SgTag>
          <SgTag color="error">error</SgTag>
          <SgBadge :count="5" />
        </div>
      </div>
    </DemoBox>

    <DemoBox
      :title="s.recipeBtnTokensTitle"
      :description="s.recipeBtnTokensDesc"
      :code="BTN_TOKENS_CODE"
    >
      <div
        class="demo-scope-row"
        :style="{
          '--sg-btn-height': '40px',
          '--sg-btn-radius': '999px',
          '--sg-btn-font-size': '15px',
          '--sg-btn-padding': '0 20px',
        }"
      >
        <SgButton type="primary">{{ s.pillPrimary }}</SgButton>
        <SgButton>{{ s.pillDefault }}</SgButton>
      </div>
    </DemoBox>

    <DemoBox
      :title="s.recipeInputTokensTitle"
      :description="s.recipeInputTokensDesc"
      :code="INPUT_TOKENS_CODE"
    >
      <div
        class="demo-scope-row"
        :style="{
          '--sg-input-height': '44px',
          '--sg-input-radius': '14px',
          '--sg-input-font-size': '16px',
        }"
      >
        <SgInput :placeholder="s.roundedInputPlaceholder" :style="{ width: '260px' }" />
      </div>
    </DemoBox>

    <DemoBox
      :title="s.recipePerFeatureTitle"
      :description="s.recipePerFeatureDesc"
      :code="PER_FEATURE_CODE"
      flush
    >
      <div :style="{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }">
        <div
          :style="{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            padding: '12px 16px',
            borderBottom: '1px solid var(--sg-color-border-secondary)',
          }"
        >
          <label :style="{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px' }">
            {{ s.perFeatureLabelPrimary }}
            <input
              type="color"
              :value="primary"
              @input="primary = ($event.target as HTMLInputElement).value"
              :style="{ width: '36px', height: '26px', border: 'none', background: 'none' }"
            />
          </label>
          <label :style="{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px' }">
            {{ s.perFeatureLabelRadius }}
            <input
              type="range"
              :min="0"
              :max="20"
              :value="radius"
              @input="radius = Number(($event.target as HTMLInputElement).value)"
            />
            <code :style="{ padding: '2px 6px' }">{{ radius }}px</code>
          </label>
        </div>
        <div :style="perFeatureScope">
          <div :style="{ padding: '16px 24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }">
            <SgButton type="primary">{{ s.perFeaturePrimary }}</SgButton>
            <SgButton>{{ s.perFeatureDefault }}</SgButton>
            <SgInput :style="{ width: '220px' }" :placeholder="s.perFeatureInputPlaceholder" />
          </div>
        </div>
      </div>
    </DemoBox>
  </ComponentDoc>
</template>
