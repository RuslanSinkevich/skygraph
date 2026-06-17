<script setup lang="ts">
/**
 * Floating label over the TreeSelect control. The shared `FloatingField`
 * tracks focus via bubbling `focusin` / `focusout` and defers the blur one
 * frame, so selecting a node never makes the label flicker.
 */
import { ref, computed } from 'vue'
import { SgTreeSelect } from '@skygraph/vue'
import { orgTree } from './data'
import { useDemoStrings } from '../../i18n'
import FloatingField from '../_shared/FloatingField.vue'

const STRINGS = {
  en: { team: 'Team', owner: 'Owner unit' },
  ru: { team: 'Команда', owner: 'Подразделение' },
} as const

const t = useDemoStrings(STRINGS)

const team = ref<string | number | undefined>(undefined)
const owner = ref<string | number | undefined>('eng-web-frontend')

const teamFilled = computed(() => team.value != null && team.value !== '')
const ownerFilled = computed(() => owner.value != null && owner.value !== '')
</script>

<template>
  <div style="display: flex; gap: 24px; flex-wrap: wrap; max-width: 560px">
    <div style="flex: 1 1 240px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.team" :filled="teamFilled">
        <SgTreeSelect
          v-model="team"
          :tree-data="orgTree"
          tree-default-expand-all
          placeholder=" "
          allow-clear
        />
      </FloatingField>
    </div>
    <div style="flex: 1 1 240px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.owner" :filled="ownerFilled">
        <SgTreeSelect
          v-model="owner"
          :tree-data="orgTree"
          tree-default-expand-all
          placeholder=" "
          allow-clear
        />
      </FloatingField>
    </div>
  </div>
</template>
