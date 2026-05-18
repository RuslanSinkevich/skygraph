<script setup lang="ts">
import { ref } from 'vue'
import { SgTransfer, SgTag } from '@skygraph/vue'
import { employees, transferSource } from './data'
import { useAppLocale } from '../_shared'

const t = useAppLocale('hrPortal').team

const targetKeys = ref<string[]>(
  employees.filter((e) => e.department === 'Engineering').map((e) => e.id),
)
</script>

<template>
  <div>
    <div class="hr-team-head">
      <h4 style="margin: 0">{{ t.heading }}</h4>
      <SgTag color="processing">{{ t.assignedTag(targetKeys.length) }}</SgTag>
    </div>
    <SgTransfer
      :data-source="transferSource"
      :target-keys="targetKeys"
      :titles="[t.available, t.assigned]"
      show-search
      @change="(keys: string[]) => (targetKeys = keys)"
    />
  </div>
</template>

<style scoped>
.hr-team-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
</style>
