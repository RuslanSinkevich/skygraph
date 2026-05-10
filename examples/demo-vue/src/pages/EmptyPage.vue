<script setup lang="ts">
import { SgButton, SgEmpty } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Empty',
    lead: 'Placeholder shown when a list / table / search has no data.',
    when1: 'A table or list rendered before any data arrives.',
    when2: 'A search query that matched zero results.',
    basicTitle: 'Basic',
    basicDesc: 'Default illustration with the locale "No Data" label.',
    descTitle: 'Custom description',
    descDesc: 'Override the description text.',
    actionTitle: 'With action',
    actionDesc: 'Render a CTA via the default slot.',
    noDescTitle: 'Hide description',
    noDescDesc: 'Pass `:description="null"` to drop the label.',
  },
  ru: {
    title: 'Empty',
    lead: 'Заглушка для пустых списков, таблиц и результатов поиска.',
    when1: 'Таблица или список без данных.',
    when2: 'Поисковый запрос с нулевыми совпадениями.',
    basicTitle: 'Basic',
    basicDesc: 'Стандартная иллюстрация и подпись «Нет данных».',
    descTitle: 'Своё описание',
    descDesc: 'Переопределение текста.',
    actionTitle: 'С действием',
    actionDesc: 'CTA через default-слот.',
    noDescTitle: 'Без подписи',
    noDescDesc: '`:description="null"` убирает подпись.',
  },
})

const propsData: PropDef[] = [
  {
    name: 'description',
    description: 'Description text below the image. Pass `null` to hide.',
    type: 'string | null',
  },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgEmpty />`
const DESC = `<SgEmpty description="No matches for your filters" />`
const ACTION = `<SgEmpty description="No invoices yet">
  <SgButton type="primary">Create invoice</SgButton>
</SgEmpty>`
const NODESC = `<SgEmpty :description="null" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="feedback"
    :crumbs="['Feedback', 'Empty']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC" vertical>
      <SgEmpty />
    </DemoBox>

    <DemoBox :title="t.descTitle" :description="t.descDesc" :code="DESC" vertical>
      <SgEmpty description="No matches for your filters" />
    </DemoBox>

    <DemoBox :title="t.actionTitle" :description="t.actionDesc" :code="ACTION" vertical>
      <SgEmpty description="No invoices yet">
        <SgButton type="primary">Create invoice</SgButton>
      </SgEmpty>
    </DemoBox>

    <DemoBox :title="t.noDescTitle" :description="t.noDescDesc" :code="NODESC" vertical>
      <SgEmpty :description="null" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
