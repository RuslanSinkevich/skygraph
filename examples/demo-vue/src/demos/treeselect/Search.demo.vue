<script setup lang="ts">
/**
 * `show-search` adds a filter field inside the dropdown that matches
 * the node `label` text. While searching every match is shown
 * (regardless of expand state).
 */
import { SgTreeSelect } from '@skygraph/vue'
import { orgTree } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Start typing a team name…' },
  ru: { placeholder: 'Начните ввод имени команды…' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="width: 340px">
    <SgTreeSelect
      show-search
      :tree-data="orgTree"
      tree-default-expand-all
      :placeholder="t.placeholder"
      allow-clear
    />
  </div>
</template>
