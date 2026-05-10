<script setup lang="ts">
import { useI18n } from '../../i18n'

/**
 * `PropsTable` — documents component props.
 *
 * Mirrors React `examples/demo/src/components/PropsTable.tsx` 1:1.
 * `PropDef` is intentionally a structural type — every page builds an
 * array literal so TypeScript checks the doc strings against keys at
 * call site.
 */
export interface PropDef {
  name: string
  description: string
  type: string
  default?: string
  required?: boolean
}

interface Props {
  title?: string
  data: PropDef[]
}

defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <div class="dv-props-section">
    <h3 class="dv-props-title">{{ title ?? t.componentDoc.propsTitle }}</h3>
    <table class="dv-doc-table">
      <thead>
        <tr>
          <th>{{ t.propsTable.colProperty }}</th>
          <th>{{ t.propsTable.colDescription }}</th>
          <th>{{ t.propsTable.colType }}</th>
          <th>{{ t.propsTable.colDefault }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in data" :key="prop.name">
          <td>
            <code>{{ prop.name }}</code>
            <span
              v-if="prop.required"
              :aria-label="t.propsTable.requiredLabel"
              style="color: var(--sg-color-error); margin-left: 2px"
              >*</span
            >
          </td>
          <td>{{ prop.description }}</td>
          <td>
            <code>{{ prop.type }}</code>
          </td>
          <td>
            <code v-if="prop.default">{{ prop.default }}</code>
            <span v-else>—</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
