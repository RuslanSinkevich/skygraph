<script setup lang="ts">
/**
 * With `disabled`, the Popconfirm becomes a pass-through — the
 * trigger's own `@click` fires instead of opening the bubble. Useful
 * for destructive actions that should skip the confirmation once the
 * user has opted into a "never ask again" flow.
 */
import { computed, ref } from 'vue'
import { SgButton, SgPopconfirm, SgSwitch } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const t = useDemoStrings({
  en: {
    askToggle: 'Ask before deleting',
    title: 'Delete this item?',
    confirmedLog: 'Confirmed via popconfirm',
    directLog: 'Deleted directly',
    button: 'Delete',
  },
  ru: {
    askToggle: 'Спрашивать перед удалением',
    title: 'Удалить элемент?',
    confirmedLog: 'Подтверждено через popconfirm',
    directLog: 'Удалено напрямую',
    button: 'Удалить',
  },
})

const guarded = ref(true)
const log = ref<string[]>([])

const popconfirmDisabled = computed(() => !guarded.value)

function pushLog(line: string) {
  log.value = [line, ...log.value].slice(0, 3)
}

function onConfirm() {
  pushLog(t.value.confirmedLog)
}

function onTriggerClick() {
  if (!guarded.value) pushLog(t.value.directLog)
}

function onGuardedChange(next: boolean) {
  guarded.value = next
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <label style="display: inline-flex; align-items: center; gap: 8px">
      <SgSwitch :checked="guarded" @change="onGuardedChange" />
      <span>{{ t.askToggle }}</span>
    </label>
    <SgPopconfirm :disabled="popconfirmDisabled" :title="t.title" @confirm="onConfirm">
      <SgButton @click="onTriggerClick">{{ t.button }}</SgButton>
    </SgPopconfirm>
    <ul
      style="
        font-size: 12px;
        color: var(--sg-color-text-secondary);
        margin: 0;
        padding-left: 16px;
      "
    >
      <li v-for="(l, i) in log" :key="i">{{ l }}</li>
    </ul>
  </div>
</template>
