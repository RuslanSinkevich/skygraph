<script setup lang="ts">
/**
 * `SgConfigProvider` with the `ru_RU` preset: month / weekday names plus
 * the "Сегодня", "Сейчас" footer captions and the modal OK button.
 */
import { ref } from 'vue'
import { SgConfigProvider, SgDatePicker, ru_RU } from '@skygraph/vue'

const value = ref<Date | null>(null)
</script>

<template>
  <SgConfigProvider :locale="ru_RU">
    <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start">
      <SgDatePicker v-model="value" placeholder="Выберите дату" allow-clear />
      <SgDatePicker
        show-time
        show-now
        format="YYYY-MM-DD HH:mm"
        placeholder="Дата и время"
        allow-clear
      />
    </div>
  </SgConfigProvider>
</template>
