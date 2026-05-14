<script setup lang="ts">
/**
 * The `#header` slot gives full control of the chrome. We replace the
 * default selects + arrows with a minimal "prev / title / next" layout.
 */
import { SgCalendar, SgButton } from '@skygraph/vue'

function shift(value: Date, months: number, onChange: (d: Date) => void) {
  const next = new Date(value)
  next.setMonth(next.getMonth() + months)
  onChange(next)
}
</script>

<template>
  <SgCalendar :fullscreen="false">
    <template #header="{ value, onChange }">
      <div class="custom-header">
        <SgButton size="small" @click="shift(value, -1, onChange)">‹ Prev</SgButton>
        <strong>
          {{ value.toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) }}
        </strong>
        <SgButton size="small" @click="shift(value, 1, onChange)">Next ›</SgButton>
      </div>
    </template>
  </SgCalendar>
</template>

<style scoped>
.custom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sg-padding-sm, 12px) var(--sg-padding-md, 16px);
  border-bottom: 1px solid var(--sg-color-border-secondary, #f0f0f0);
}
</style>
