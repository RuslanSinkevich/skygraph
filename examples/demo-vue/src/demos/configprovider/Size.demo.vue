<script setup lang="ts">
import {
  SgButton,
  SgCheckbox,
  SgConfigProvider,
  SgInput,
  SgSelect,
  SgSwitch,
} from '@skygraph/vue'

const sizes = ['small', 'middle', 'large'] as const

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]
</script>

<template>
  <div style="display: grid; gap: 20px">
    <div
      v-for="size in sizes"
      :key="size"
      style="display: flex; flex-direction: column; gap: 8px"
    >
      <span style="font-size: 12px; color: var(--sg-color-text-tertiary)">
        size="{{ size }}"
      </span>
      <SgConfigProvider :size="size">
        <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
          <SgButton type="primary">Action</SgButton>
          <SgInput placeholder="Name" :style="{ width: '160px' }" />
          <SgSelect
            :options="options"
            placeholder="Framework"
            :style="{ width: '160px' }"
          />
          <SgSwitch :default-checked="true" />
          <SgCheckbox>Agree</SgCheckbox>
        </div>
      </SgConfigProvider>
    </div>
  </div>
</template>
