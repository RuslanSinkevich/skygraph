<script setup lang="ts">
import { useI18n } from '../../i18n'

/**
 * `CssVarsTable` — documents the CSS custom properties a component
 * exposes. Mirrors React `examples/demo/src/components/CssVarsTable.tsx`
 * 1:1 (same `.demo-props-section` / `.demo-props-title` / `.doc-table`
 * className contract; `hint` rendered with the same inline-styles).
 *
 * Conventions:
 *   - `name` is **without** the `--` prefix; the table renders it
 *     with `--` glued in for copy-paste comfort (`--sg-btn-height`).
 *   - `default` is the raw CSS value or a `var(--other)` reference.
 *   - `description` is the human-readable purpose. Locales come from
 *     `<comp>-doc/{en,ru}.ts` so the table itself is locale-free.
 *   - empty `data` → renders nothing (parent controls visibility by
 *     not rendering the table when there are no exposed tokens).
 */
export interface CssVarDef {
  name: string
  default: string
  description: string
}

interface Props {
  title?: string
  /** Optional usage note rendered under the heading. */
  hint?: string
  data: CssVarDef[]
}

const props = defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <div v-if="props.data.length > 0" class="demo-props-section">
    <h3 class="demo-props-title">{{ title ?? t.cssVarsTable.title }}</h3>
    <p
      v-if="hint"
      style="margin: -4px 0 12px; font-size: 13px; color: var(--sg-color-text-secondary)"
    >
      {{ hint }}
    </p>
    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 30%">{{ t.cssVarsTable.colVariable }}</th>
          <th style="width: 28%">{{ t.cssVarsTable.colDefault }}</th>
          <th>{{ t.cssVarsTable.colDescription }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="v in props.data" :key="v.name">
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
</template>
