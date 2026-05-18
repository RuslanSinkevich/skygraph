<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgTag,
  SgButton,
  SgSelect,
  SgDescriptions,
  notification,
  type TableColumn,
} from '@skygraph/vue'
import { auditLog, auditToRow } from './data'
import { Toolbar, useAppLocale } from '../_shared'
import { severityColors } from './common'

const a = useAppLocale('admin').audit
const severity = ref<string>('all')

const filtered = computed(() =>
  severity.value === 'all' ? auditLog : auditLog.filter((l) => l.severity === severity.value),
)

const tableData = computed(() => filtered.value.map(auditToRow))

const columns: TableColumn[] = [
  { key: 'severity', title: '', width: 40, align: 'center' },
  { key: 'timestamp', title: a.columns.time, width: 160, sortable: true },
  { key: 'userName', title: a.columns.user, width: 140, sortable: true },
  { key: 'action', title: a.columns.action, width: 170, sortable: true },
  { key: 'target', title: a.columns.target, width: 160 },
  { key: 'ip', title: a.columns.ip, width: 130 },
]

function severityBg(val: string): string {
  if (val === 'critical') return 'var(--sg-color-error, red)'
  if (val === 'warning') return 'var(--sg-color-warning, orange)'
  return 'var(--sg-color-text-tertiary, gray)'
}

function severityGlyph(val: string): string {
  if (val === 'critical') return '!'
  if (val === 'warning') return '⚠'
  return '·'
}
</script>

<template>
  <Toolbar hide-search>
    <template #filters>
      <SgSelect
        :value="severity"
        :options="[
          { label: a.severityAll, value: 'all' },
          { label: a.severityInfo, value: 'info' },
          { label: a.severityWarning, value: 'warning' },
          { label: a.severityCritical, value: 'critical' },
        ]"
        :style="{ width: '160px' }"
        @update:model-value="(v) => (severity = String(v))"
      />
    </template>
    <template #actions>
      <SgButton size="small" @click="notification.info(a.exportToast)">{{ a.exportBtn }}</SgButton>
    </template>
  </Toolbar>

  <SgTable :columns="columns" :data="tableData" :page-size="12" size="small">
    <template #cell="{ column, row, value }">
      <span
        v-if="column.key === 'severity'"
        :style="{
          display: 'inline-block',
          width: '16px',
          height: '16px',
          lineHeight: '16px',
          textAlign: 'center',
          fontSize: '11px',
          color: '#fff',
          background: severityBg(String(value)),
          borderRadius: '8px',
        }"
        >{{ severityGlyph(String(value)) }}</span
      >
      <span v-else-if="column.key === 'userName'" style="font-weight: 500">{{ value }}</span>
      <code v-else-if="column.key === 'action'" class="adm-audit-action">{{ value }}</code>
      <span v-else-if="column.key === 'ip'" style="font-family: monospace; font-size: 12px">{{
        value
      }}</span>
      <template v-else>{{ value }}</template>
    </template>
    <template #expandedRow="{ row }">
      <div style="padding: 8px 0; font-size: 13px">
        <SgDescriptions
          :items="[
            { label: a.expanded.details, value: String(row.details) },
            { label: a.expanded.severity, value: String(row.severity) },
            { label: a.expanded.ip, value: String(row.ip) },
            { label: a.expanded.timestamp, value: String(row.timestamp) },
          ]"
          :column="2"
          size="small"
        />
        <div style="margin-top: 4px">
          <SgTag :color="severityColors[String(row.severity)]">{{ row.severity }}</SgTag>
        </div>
      </div>
    </template>
  </SgTable>
</template>

<style scoped>
.adm-audit-action {
  font-size: 12px;
  background: var(--sg-color-bg-secondary);
  padding: 2px 6px;
  border-radius: 3px;
}
</style>
