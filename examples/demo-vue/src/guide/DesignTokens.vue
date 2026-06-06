<script setup lang="ts">
/**
 * Guide → Design Tokens (`/guide/design-tokens`) — Vue 3 port of the
 * React reference page. Data is sourced from
 * `@skygraph-examples/shared/tokens` so React, Vue and Angular surface
 * the same registry; the only divergence is which framework's reactive
 * primitives drive the search filter.
 *
 * The previous version of this file was a stub that linked to the
 * private GitHub repo — that contradicted the "everything on the demo
 * site" promise on the landing page. Inline content replaces it.
 */
import { computed, ref } from 'vue'
import {
  globalTokens,
  componentTokenGroups,
  categoryLabels,
  categoryOrder,
} from '@skygraph-examples/shared/tokens'
import type { TokenCategory, TokenDef } from '@skygraph-examples/shared/tokens'
import { useI18n } from '../i18n'

const { t } = useI18n()

const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) {
    return { global: globalTokens, components: componentTokenGroups }
  }
  const matches = (text: string) => text.toLowerCase().includes(q)
  return {
    global: globalTokens.filter(
      (tok) => matches(tok.name) || matches(tok.description) || matches(tok.default),
    ),
    components: componentTokenGroups
      .map((g) => ({
        ...g,
        vars: g.vars.filter(
          (v) =>
            matches(v.name) || matches(v.description) || matches(v.default) || matches(g.component),
        ),
      }))
      .filter((g) => g.vars.length > 0),
  }
})

const groupedGlobal = computed(() => {
  const map = new Map<TokenCategory, TokenDef[]>()
  for (const tok of filtered.value.global) {
    const list = map.get(tok.category) ?? []
    list.push(tok)
    map.set(tok.category, list)
  }
  return map
})

const componentVarsCount = computed(() =>
  filtered.value.components.reduce((acc, g) => acc + g.vars.length, 0),
)

function isColorValue(value: string): boolean {
  return /^#[0-9a-f]{3,8}$/i.test(value) || value.startsWith('rgb') || value.startsWith('hsl')
}

function showSwatchFor(category: TokenCategory): boolean {
  return (
    category === 'palette' ||
    category === 'color' ||
    category === 'background' ||
    category === 'text' ||
    category === 'border'
  )
}

const ROOT_OVERRIDE = `:root {
  --sg-color-primary: #7c3aed;
  --sg-color-primary-hover: #8b5cf6;
  --sg-color-primary-active: #6d28d9;
  --sg-border-radius: 10px;
}`

const SUBTREE_OVERRIDE = `<div :style="{
  '--sg-table-header-bg': '#f0f5ff',
  '--sg-table-row-hover-bg': '#e6f4ff',
}">
  <SgTable ... />
</div>`
</script>

<template>
  <section class="doc-page">
    <header class="doc-header">
      <h1 class="doc-component-title">{{ t.designTokens.title }}</h1>
      <p class="doc-lead">{{ t.designTokens.lead }}</p>
    </header>

    <div class="demo-props-section" style="margin-bottom: 20px">
      <input
        type="search"
        :placeholder="t.designTokens.searchPlaceholder"
        :aria-label="t.designTokens.searchAriaLabel"
        :value="query"
        @input="query = ($event.target as HTMLInputElement).value"
        style="
          width: 100%;
          max-width: 520px;
          height: 38px;
          padding: 0 14px;
          font-size: 14px;
          background: var(--sg-color-bg-container);
          color: var(--sg-color-text);
          border: 1px solid var(--sg-color-border);
          border-radius: var(--sg-border-radius);
        "
      />
      <div style="margin-top: 12px; font-size: 13px; color: var(--sg-color-text-secondary)">
        {{ filtered.global.length }} {{ t.designTokens.summaryGlobal }} · {{ componentVarsCount }}
        {{ t.designTokens.summaryComponentsLeft }} {{ filtered.components.length }}
        {{ t.designTokens.summaryComponentsRight }}
      </div>
    </div>

    <h2>{{ t.designTokens.globalHeading }}</h2>
    <p style="margin-top: -8px; font-size: 14px; color: var(--sg-color-text-secondary)">
      {{ t.designTokens.globalLead }}
    </p>

    <template v-for="cat in categoryOrder" :key="cat">
      <div v-if="(groupedGlobal.get(cat) ?? []).length > 0" class="demo-props-section">
        <h3 class="demo-props-title">{{ categoryLabels[cat] }}</h3>
        <table class="doc-table">
          <thead>
            <tr>
              <th style="width: 30%">{{ t.designTokens.colVariable }}</th>
              <th style="width: 32%">{{ t.designTokens.colDefault }}</th>
              <th>{{ t.designTokens.colDescription }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tok in groupedGlobal.get(cat) ?? []" :key="tok.name">
              <td>
                <code>--{{ tok.name }}</code>
              </td>
              <td>
                <span
                  v-if="showSwatchFor(tok.category)"
                  aria-hidden="true"
                  :style="{
                    display: 'inline-block',
                    width: '14px',
                    height: '14px',
                    borderRadius: '3px',
                    border: '1px solid var(--sg-color-border-secondary)',
                    marginRight: '8px',
                    verticalAlign: 'middle',
                    background: isColorValue(tok.default) ? tok.default : `var(--${tok.name})`,
                  }"
                />
                <code>{{ tok.default }}</code>
              </td>
              <td>{{ tok.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <h2>{{ t.designTokens.perComponentHeading }}</h2>
    <p style="margin-top: -8px; font-size: 14px; color: var(--sg-color-text-secondary)">
      {{ t.designTokens.perComponentLead }}
    </p>

    <div
      v-for="group in filtered.components"
      :key="group.slug"
      class="demo-props-section"
      :id="`token-${group.slug}`"
    >
      <h3 class="demo-props-title">{{ group.component }}</h3>
      <table class="doc-table">
        <thead>
          <tr>
            <th style="width: 30%">{{ t.designTokens.colVariable }}</th>
            <th style="width: 32%">{{ t.designTokens.colDefault }}</th>
            <th>{{ t.designTokens.colDescription }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in group.vars" :key="v.name">
            <td>
              <code>--{{ v.name }}</code>
            </td>
            <td>
              <code>{{ v.default }}</code>
            </td>
            <td>{{ v.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>{{ t.designTokens.overrideHeading }}</h2>
    <div class="demo-props-section">
      <p style="font-size: 14px; color: var(--sg-color-text-secondary); margin-top: 0">
        {{ t.designTokens.overrideAppWide }}
      </p>
      <pre class="doc-code"><code>{{ ROOT_OVERRIDE }}</code></pre>
      <p style="font-size: 14px; color: var(--sg-color-text-secondary); margin-top: 20px">
        {{ t.designTokens.overrideSubtree }}
      </p>
      <pre class="doc-code"><code>{{ SUBTREE_OVERRIDE }}</code></pre>
    </div>
  </section>
</template>
