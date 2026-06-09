<script setup lang="ts">
/**
 * `SgConfigProvider` cascades a locale preset (`en_US` / `ru_RU`) to every
 * descendant. The demo's own labels switch with the same toggle so the whole
 * surface — not just the framework strings — reflects the active language.
 */
import { computed, ref } from 'vue'
import {
  SgButton,
  SgCalendar,
  SgConfigProvider,
  SgEmpty,
  SgModal,
  SgPagination,
  SgPopconfirm,
  SgSchemaForm,
  SgSegmented,
  SgUpload,
  en_US,
  ru_RU,
} from '@skygraph/vue'

const lang = ref<'en' | 'ru'>('en')
const page = ref(1)
const modalOpen = ref(false)

const locale = computed(() => (lang.value === 'en' ? en_US : ru_RU))

const segOptions = [
  { label: 'en_US', value: 'en' },
  { label: 'ru_RU', value: 'ru' },
]

const STRINGS = {
  en: {
    localePreset: 'Locale preset:',
    empty: 'Empty',
    pagination: 'Pagination',
    popconfirm: 'Popconfirm',
    upload: 'Upload',
    modal: 'Modal (default footer)',
    calendar: 'Calendar',
    schemaForm: 'SchemaForm + Field markers',
    deleteItem: 'Delete item?',
    delete: 'Delete',
    openModal: 'Open modal',
    modalTitle: 'Example',
    modalBody: 'Body text. OK / Cancel labels follow the provider locale.',
    fieldName: 'Name',
    fieldEmail: 'Email',
  },
  ru: {
    localePreset: 'Пресет локали:',
    empty: 'Empty',
    pagination: 'Pagination',
    popconfirm: 'Popconfirm',
    upload: 'Upload',
    modal: 'Modal (стандартный футер)',
    calendar: 'Calendar',
    schemaForm: 'SchemaForm + маркеры полей',
    deleteItem: 'Удалить элемент?',
    delete: 'Удалить',
    openModal: 'Открыть модалку',
    modalTitle: 'Пример',
    modalBody: 'Текст. Подписи ОК / Отмена следуют за локалью провайдера.',
    fieldName: 'Имя',
    fieldEmail: 'Email',
  },
} as const

const t = computed(() => STRINGS[lang.value])

const schema = computed(() => ({
  properties: {
    name: { type: 'string', title: t.value.fieldName, minLength: 2 },
    email: { type: 'string', format: 'email', title: t.value.fieldEmail },
  },
  required: ['name', 'email'],
}))

function onLangChange(v: string) {
  lang.value = v as 'en' | 'ru'
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <div style="display: flex; align-items: center; gap: 12px">
      <span style="font-size: 13px; color: var(--sg-color-text-secondary)">
        {{ t.localePreset }}
      </span>
      <SgSegmented :value="lang" :options="segOptions" @change="onLangChange" />
    </div>

    <SgConfigProvider :locale="locale">
      <div style="display: grid; gap: 24px; grid-template-columns: 1fr 1fr">
        <section>
          <h4 style="margin: 0 0 8px">{{ t.empty }}</h4>
          <SgEmpty />
        </section>

        <section>
          <h4 style="margin: 0 0 8px">{{ t.pagination }}</h4>
          <SgPagination
            :current="page"
            :total="245"
            :show-total="true"
            :show-size-changer="true"
            :show-quick-jumper="true"
            @change="(p: number) => (page = p)"
          />
        </section>

        <section>
          <h4 style="margin: 0 0 8px">{{ t.popconfirm }}</h4>
          <SgPopconfirm :title="t.deleteItem">
            <SgButton type="primary">{{ t.delete }}</SgButton>
          </SgPopconfirm>
        </section>

        <section>
          <h4 style="margin: 0 0 8px">{{ t.upload }}</h4>
          <SgUpload />
        </section>

        <section>
          <h4 style="margin: 0 0 8px">{{ t.modal }}</h4>
          <SgButton @click="modalOpen = true">{{ t.openModal }}</SgButton>
          <SgModal
            :open="modalOpen"
            :title="t.modalTitle"
            @close="modalOpen = false"
            @ok="modalOpen = false"
          >
            {{ t.modalBody }}
          </SgModal>
        </section>

        <section style="grid-column: 1 / -1">
          <h4 style="margin: 0 0 8px">{{ t.calendar }}</h4>
          <SgCalendar :fullscreen="false" />
        </section>

        <section style="grid-column: 1 / -1">
          <h4 style="margin: 0 0 8px">{{ t.schemaForm }}</h4>
          <SgSchemaForm :schema="schema" layout="horizontal" />
        </section>
      </div>
    </SgConfigProvider>
  </div>
</template>
