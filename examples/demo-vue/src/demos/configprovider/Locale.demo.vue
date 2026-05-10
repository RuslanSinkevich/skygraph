<script setup lang="ts">
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

const schema = {
  properties: {
    name: { type: 'string', title: 'Name', minLength: 2 },
    email: { type: 'string', format: 'email', title: 'Email' },
  },
  required: ['name', 'email'],
}

function onLangChange(v: string) {
  lang.value = v as 'en' | 'ru'
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <div style="display: flex; align-items: center; gap: 12px">
      <span style="font-size: 13px; color: var(--sg-color-text-secondary)">
        Locale preset:
      </span>
      <SgSegmented
        :value="lang"
        :options="segOptions"
        @change="onLangChange"
      />
    </div>

    <SgConfigProvider :locale="locale">
      <div
        style="display: grid; gap: 24px; grid-template-columns: 1fr 1fr"
      >
        <section>
          <h4 style="margin: 0 0 8px">Empty</h4>
          <SgEmpty />
        </section>

        <section>
          <h4 style="margin: 0 0 8px">Pagination</h4>
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
          <h4 style="margin: 0 0 8px">Popconfirm</h4>
          <SgPopconfirm title="Delete item?">
            <SgButton type="primary">Delete</SgButton>
          </SgPopconfirm>
        </section>

        <section>
          <h4 style="margin: 0 0 8px">Upload</h4>
          <SgUpload />
        </section>

        <section>
          <h4 style="margin: 0 0 8px">Modal (default footer)</h4>
          <SgButton @click="modalOpen = true">Open modal</SgButton>
          <SgModal
            :open="modalOpen"
            title="Example"
            @close="modalOpen = false"
            @ok="modalOpen = false"
          >
            Body text. OK / Cancel labels follow the provider locale.
          </SgModal>
        </section>

        <section style="grid-column: 1 / -1">
          <h4 style="margin: 0 0 8px">Calendar</h4>
          <SgCalendar />
        </section>

        <section style="grid-column: 1 / -1">
          <h4 style="margin: 0 0 8px">SchemaForm + Field markers</h4>
          <SgSchemaForm :schema="schema" layout="horizontal" />
        </section>
      </div>
    </SgConfigProvider>
  </div>
</template>
