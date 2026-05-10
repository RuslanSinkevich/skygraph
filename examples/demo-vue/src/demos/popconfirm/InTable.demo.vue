<script setup lang="ts">
import { computed, ref } from 'vue'
import { SgButton, SgPopconfirm } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

interface Row {
  id: number
  name: string
}

const t = useDemoStrings({
  en: {
    task1: 'Launch checklist',
    task2: 'Design review',
    task3: 'Q4 postmortem',
    colTask: 'Task',
    confirmTitle: 'Delete',
    confirmDesc: 'This cannot be undone.',
    okText: 'Delete',
    button: 'Delete',
    allDeleted: 'All tasks deleted.',
    reset: 'Reset',
  },
  ru: {
    task1: 'Чек-лист запуска',
    task2: 'Дизайн-ревью',
    task3: 'Постмортем Q4',
    colTask: 'Задача',
    confirmTitle: 'Удалить',
    confirmDesc: 'Действие нельзя отменить.',
    okText: 'Удалить',
    button: 'Удалить',
    allDeleted: 'Все задачи удалены.',
    reset: 'Сбросить',
  },
})

const initialRows = computed<Row[]>(() => [
  { id: 1, name: t.value.task1 },
  { id: 2, name: t.value.task2 },
  { id: 3, name: t.value.task3 },
])

const rows = ref<Row[]>(initialRows.value.slice())

function deleteRow(id: number) {
  rows.value = rows.value.filter((r) => r.id !== id)
}

function reset() {
  rows.value = initialRows.value.slice()
}
</script>

<template>
  <table style="border-collapse: collapse; font-size: 14px">
    <thead>
      <tr>
        <th style="text-align: left; padding: 6px 12px">{{ t.colTask }}</th>
        <th style="padding: 6px 12px"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="row in rows"
        :key="row.id"
        style="border-top: 1px solid var(--sg-color-border)"
      >
        <td style="padding: 6px 12px">{{ row.name }}</td>
        <td style="padding: 6px 12px">
          <SgPopconfirm
            :title="`${t.confirmTitle} &quot;${row.name}&quot;?`"
            :description="t.confirmDesc"
            :ok-text="t.okText"
            placement="left"
            @confirm="deleteRow(row.id)"
          >
            <SgButton size="small">{{ t.button }}</SgButton>
          </SgPopconfirm>
        </td>
      </tr>
      <tr v-if="rows.length === 0">
        <td
          colspan="2"
          style="padding: 12px; color: var(--sg-color-text-secondary)"
        >
          {{ t.allDeleted }}
          <SgButton size="small" @click="reset">{{ t.reset }}</SgButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>
