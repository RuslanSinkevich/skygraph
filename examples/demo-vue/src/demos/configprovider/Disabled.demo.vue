<script setup lang="ts">
import {
  SgButton,
  SgCheckbox,
  SgConfigProvider,
  SgInput,
  SgSelect,
  SgSwitch,
} from '@skygraph/vue'

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
]
</script>

<template>
  <SgConfigProvider :disabled="true">
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <SgButton type="primary">Save</SgButton>
      <SgButton>Cancel</SgButton>
      <SgInput placeholder="Locked" :style="{ width: '160px' }" />
      <SgSelect
        :options="options"
        placeholder="Locked"
        :style="{ width: '140px' }"
      />
      <SgSwitch :default-checked="true" />
      <SgCheckbox :default-checked="true">Subscribe</SgCheckbox>
    </div>
  </SgConfigProvider>
</template>
