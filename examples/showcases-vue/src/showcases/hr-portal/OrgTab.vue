<script setup lang="ts">
import { SgTree } from '@skygraph/vue'
import { orgTree, employees } from './data'
import { useAppLocale } from '../_shared'

const l = useAppLocale('hrPortal')
const departments = [...new Set(employees.map((e) => e.department))]

function deptColor(d: string): string {
  return `hsl(${(d.charCodeAt(0) * 11) % 360}, 60%, 55%)`
}
</script>

<template>
  <div style="display: flex; gap: 16px">
    <div class="hr-org-tree">
      <SgTree :tree-data="orgTree" default-expand-all />
    </div>
    <div style="width: 280px; flex-shrink: 0">
      <h4 style="margin-bottom: 12px">{{ l.org.departmentSizes }}</h4>
      <div v-for="d of departments" :key="d" style="margin-bottom: 10px">
        <div class="hr-org-row">
          <span>{{ d }}</span>
          <span style="color: var(--sg-color-text-secondary)">
            {{ employees.filter((e) => e.department === d).length }}
          </span>
        </div>
        <div class="hr-org-bar">
          <div
            class="hr-org-fill"
            :style="{
              width: `${(employees.filter((e) => e.department === d).length / employees.length) * 100}%`,
              background: deptColor(d),
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hr-org-tree {
  flex: 1;
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 8px;
  padding: 16px;
}
.hr-org-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 4px;
}
.hr-org-bar {
  height: 6px;
  background: var(--sg-color-border-secondary);
  border-radius: 3px;
  overflow: hidden;
}
.hr-org-fill {
  height: 100%;
}
</style>
