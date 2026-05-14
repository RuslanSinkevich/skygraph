<script setup lang="ts">
/**
 * Mark a node `isLeaf: false` to advertise expandable children and hand
 * loading to `loadData`. This demo fakes a network round-trip with a
 * timeout and populates `children` on the selected option.
 */
import { ref } from 'vue'
import { SgCascader, type CascaderOption } from '@skygraph/vue'

const options = ref<CascaderOption[]>([
  { value: 'dynamic-1', label: 'Dynamic Option 1', isLeaf: false },
  { value: 'dynamic-2', label: 'Dynamic Option 2', isLeaf: false },
])

function loadData(selected: CascaderOption[]) {
  const target = selected[selected.length - 1]
  setTimeout(() => {
    target.children = [
      { value: `${String(target.value)}-child-1`, label: `${target.label} → child 1` },
      {
        value: `${String(target.value)}-child-2`,
        label: `${target.label} → child 2`,
        isLeaf: true,
      },
    ]
    options.value = [...options.value]
  }, 700)
}
</script>

<template>
  <div style="max-width: 340px">
    <SgCascader :options="options" :load-data="loadData" placeholder="Open to load children" />
  </div>
</template>
