<script setup lang="ts">
import { useI18n } from '../../i18n'
import { DemoTOC, DemoTOCProvider } from './DemoTOC'

/**
 * `ComponentDoc` — top-level page wrapper that renders the
 * crumbs / title / lead / "When to use" block + an "Examples"
 * section title before the `<DemoBox>` cards (passed via the
 * default slot).
 *
 * Mirrors React `examples/demo/src/components/ComponentDoc.tsx` 1:1
 * (same DOM, same `.doc-*` className contract). Two Vue-side deltas:
 *   1. The optional `notes` block is exposed as a **named slot**
 *      `#notes` — Vue idiom equivalent to React's `notes?: ReactNode`
 *      prop. Renders inside `<div class="doc-notes">` exactly where
 *      React does (after `whenToUse`, before the "Examples" heading).
 *   2. Pages render their `<PropsTable>` / `<CssVarsTable>` via the
 *      named slot `#api`. React inlines them as children inside the
 *      `.doc-demos` block; in Vue separating them keeps demo cards in
 *      the default slot and API tables in their own region. The slot
 *      output sits **after** `.doc-demos` to mirror the visual order
 *      (tables under demos) — see `docs/_streams/decisions/T-Vue-Demo-
 *      Wrappers-Parity.md` for the full rationale.
 *
 * The page is wrapped in `<DemoTOCProvider>` so the right-rail
 * "On this page" panel can register each `<DemoBox>` by title and
 * keep the active section highlighted while the user scrolls.
 */
interface Props {
  title: string
  description: string
  badge?: string
  crumbs?: string[]
  whenToUse?: string[]
}

defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <DemoTOCProvider>
    <div class="doc-with-toc">
      <section class="doc-page">
        <div v-if="crumbs && crumbs.length > 0" class="doc-crumbs">
          <span v-for="(c, i) in crumbs" :key="i" class="doc-crumb">
            {{ c }}
            <span v-if="i < crumbs.length - 1" class="doc-crumb-sep">/</span>
          </span>
        </div>

        <header class="doc-header">
          <h1 class="doc-component-title">
            {{ title }}
            <span v-if="badge" class="doc-badge">{{ badge }}</span>
          </h1>
          <p class="doc-lead">{{ description }}</p>
        </header>

        <div v-if="whenToUse && whenToUse.length > 0" class="doc-when-to-use">
          <h2>{{ t.componentDoc.whenToUse }}</h2>
          <ul>
            <li v-for="(item, i) in whenToUse" :key="i">{{ item }}</li>
          </ul>
        </div>

        <div v-if="$slots.notes" class="doc-notes">
          <slot name="notes" />
        </div>

        <h2>{{ t.componentDoc.examples }}</h2>
        <div class="doc-demos">
          <slot />
        </div>

        <slot name="api" />
      </section>
      <aside class="doc-toc-aside">
        <DemoTOC />
      </aside>
    </div>
  </DemoTOCProvider>
</template>
