<script setup lang="ts">
import { ref } from 'vue'
import { SgButton, SgPopconfirm } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Popconfirm',
    lead: 'Inline confirmation popover anchored to a trigger. Lighter than Modal for low-stakes destructive actions.',
    when1: 'Cheap "are you sure?" before delete / archive / remove.',
    when2: 'Inline confirmation inside table rows or list items.',
    basicTitle: 'Basic',
    basicDesc: 'Title only, default Yes / No labels.',
    descTitle: 'With description',
    descDesc: 'Add a secondary line for extra context.',
    placementTitle: 'Placement',
    placementDesc: 'Four sides — top / bottom / left / right.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Trigger does not open the popover.',
  },
  ru: {
    title: 'Popconfirm',
    lead: 'Inline-подтверждение во всплывающем окне у триггера. Легче Modal для бытовых деструктивных действий.',
    when1: 'Дешёвое «вы уверены?» перед delete / archive / remove.',
    when2: 'Inline-подтверждение в строках таблиц и списков.',
    basicTitle: 'Basic',
    basicDesc: 'Только заголовок, кнопки Yes / No по умолчанию.',
    descTitle: 'С описанием',
    descDesc: 'Дополнительная строка с контекстом.',
    placementTitle: 'Placement',
    placementDesc: 'Четыре стороны — top / bottom / left / right.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Триггер не открывает окно.',
  },
})

const log = ref<string>('—')

function confirm(label: string) {
  log.value = label + ' confirmed'
}
function cancel(label: string) {
  log.value = label + ' cancelled'
}

const propsData: PropDef[] = [
  { name: 'title', description: 'Main confirmation question.', type: 'string', required: true },
  { name: 'description', description: 'Optional supporting text.', type: 'string' },
  { name: 'okText', description: 'Confirm button label.', type: 'string', default: "'Yes'" },
  { name: 'cancelText', description: 'Cancel button label.', type: 'string', default: "'No'" },
  {
    name: 'placement',
    description: 'Popover side relative to trigger.',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
  },
  {
    name: 'disabled',
    description: 'Trigger does not open the popover.',
    type: 'boolean',
    default: 'false',
  },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgPopconfirm title="Delete this item?" @confirm="onConfirm">
  <SgButton danger>Delete</SgButton>
</SgPopconfirm>`
const DESC = `<SgPopconfirm
  title="Archive 12 items?"
  description="Archived items can be restored within 30 days."
  ok-text="Archive"
  cancel-text="Keep"
  @confirm="onConfirm"
>
  <SgButton>Archive</SgButton>
</SgPopconfirm>`
const PLACEMENT = `<SgPopconfirm placement="right" title="Confirm?" @confirm="onConfirm">
  <SgButton>right</SgButton>
</SgPopconfirm>`
const DISABLED = `<SgPopconfirm disabled title="Delete?">
  <SgButton disabled>Disabled</SgButton>
</SgPopconfirm>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="feedback"
    :crumbs="['Feedback', 'Popconfirm']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgPopconfirm title="Delete this item?" @confirm="confirm('basic')" @cancel="cancel('basic')">
        <SgButton danger>Delete</SgButton>
      </SgPopconfirm>
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{ log }}</span>
    </DemoBox>

    <DemoBox :title="t.descTitle" :description="t.descDesc" :code="DESC">
      <SgPopconfirm
        title="Archive 12 items?"
        description="Archived items can be restored within 30 days."
        ok-text="Archive"
        cancel-text="Keep"
        @confirm="confirm('archive')"
      >
        <SgButton>Archive</SgButton>
      </SgPopconfirm>
    </DemoBox>

    <DemoBox :title="t.placementTitle" :description="t.placementDesc" :code="PLACEMENT">
      <SgPopconfirm placement="top" title="Confirm?" @confirm="confirm('top')">
        <SgButton>top</SgButton>
      </SgPopconfirm>
      <SgPopconfirm placement="bottom" title="Confirm?" @confirm="confirm('bottom')">
        <SgButton>bottom</SgButton>
      </SgPopconfirm>
      <SgPopconfirm placement="left" title="Confirm?" @confirm="confirm('left')">
        <SgButton>left</SgButton>
      </SgPopconfirm>
      <SgPopconfirm placement="right" title="Confirm?" @confirm="confirm('right')">
        <SgButton>right</SgButton>
      </SgPopconfirm>
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED">
      <SgPopconfirm disabled title="Delete?">
        <SgButton disabled>Disabled</SgButton>
      </SgPopconfirm>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
