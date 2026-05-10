<script setup lang="ts">
import { useI18n } from '../../i18n'

/**
 * `CssVarsTable` — documents the CSS custom properties a component
 * exposes. New in Volna 3 (Vue side); React-аналог:
 * `examples/demo/src/components/CssVarsTable.tsx`.
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
  <div v-if="props.data.length > 0" class="dv-props-section">
    <h3 class="dv-props-title">{{ title ?? t.cssVarsTable.title }}</h3>
    <p v-if="hint" class="dv-css-vars-hint">{{ hint }}</p>
    <table class="dv-doc-table">
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
