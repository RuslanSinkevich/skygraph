<script setup lang="ts">
import { ref } from 'vue'
import { SgButton, SgModal } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Modal',
    lead: 'Modal dialog with focus trap, ESC to close and OK / Cancel default footer.',
    when1: 'Confirmations, focused secondary forms, blocking workflows.',
    when2: 'Avoid for non-blocking notifications — use Notification or Drawer.',
    basicTitle: 'Basic',
    basicDesc: 'Open via state, close via ESC, mask click, or footer.',
    handlerTitle: 'With OK handler',
    handlerDesc: 'Provide an `okHandler` to render a primary OK button.',
  },
  ru: {
    title: 'Modal',
    lead: 'Модальное окно с focus trap, ESC для закрытия и футером OK / Cancel.',
    when1: 'Подтверждения, второстепенные формы, блокирующие сценарии.',
    when2: 'Не подходит для неблокирующих уведомлений — используйте Notification или Drawer.',
    basicTitle: 'Basic',
    basicDesc: 'Открытие через state, закрытие через ESC, клик по маске или футер.',
    handlerTitle: 'С OK handler',
    handlerDesc: '`okHandler` рендерит primary OK-кнопку.',
  },
})

const open1 = ref(false)
const open2 = ref(false)

function handleOk() {
  open2.value = false
}

const propsData: PropDef[] = [
  { name: 'open', description: 'Controls visibility.', type: 'boolean', required: true },
  { name: 'title', description: 'Heading text.', type: 'string' },
  { name: 'width', description: 'Dialog width.', type: 'number | string', default: '520' },
  { name: 'okHandler', description: 'Click handler for the default OK button.', type: '() => void | Promise<void>' },
  { name: 'okText', description: 'Custom OK label.', type: 'string', default: "'OK'" },
  { name: 'cancelText', description: 'Custom Cancel label.', type: 'string', default: "'Cancel'" },
  { name: 'confirmLoading', description: 'Show OK button in loading state.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgButton @click="open = true">Open</SgButton>
<SgModal :open="open" title="Hello" @close="open = false">
  Body content
</SgModal>`

const HANDLER = `<SgModal :open="open" title="Confirm" :ok-handler="handleOk" @close="close">
  Save changes?
</SgModal>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="feedback"
    :crumbs="['Feedback', 'Modal']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgButton @click="open1 = true">Open modal</SgButton>
      <SgModal :open="open1" title="Hello" @close="open1 = false">
        <p>This is a modal body. Press ESC, click the mask, or the close button to dismiss.</p>
      </SgModal>
    </DemoBox>

    <DemoBox :title="t.handlerTitle" :description="t.handlerDesc" :code="HANDLER">
      <SgButton type="primary" @click="open2 = true">Open with OK</SgButton>
      <SgModal
        :open="open2"
        title="Confirm"
        :ok-handler="handleOk"
        ok-text="Save"
        cancel-text="Cancel"
        @close="open2 = false"
      >
        <p>Save your changes?</p>
      </SgModal>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
