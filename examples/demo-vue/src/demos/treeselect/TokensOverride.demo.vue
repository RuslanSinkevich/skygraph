<script setup lang="ts">
/**
 * TreeSelect shares Input tokens for the control and uses
 * `--sg-color-primary` for the selected pills / focused row.
 */
import type { CSSProperties } from 'vue'
import { SgTreeSelect } from '@skygraph/vue'
import { orgTree } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green branded', soft: 'Soft & tall' },
  ru: { green: 'Зелёный бренд', soft: 'Мягкий и высокий' },
} as const

const t = useDemoStrings(STRINGS)

const green = {
  '--sg-color-primary': '#16a34a',
  '--sg-color-primary-bg': '#dcfce7',
  '--sg-color-primary-hover': '#15803d',
  width: '320px',
} as CSSProperties

const soft = {
  '--sg-input-radius': '14px',
  '--sg-input-height': '44px',
  width: '320px',
} as CSSProperties
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap">
    <div :style="green">
      <SgTreeSelect
        :tree-data="orgTree"
        multiple
        tree-default-expand-all
        :placeholder="t.green"
        allow-clear
      />
    </div>
    <div :style="soft">
      <SgTreeSelect
        :tree-data="orgTree"
        tree-default-expand-all
        :placeholder="t.soft"
        allow-clear
      />
    </div>
  </div>
</template>
