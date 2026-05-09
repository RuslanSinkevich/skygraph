<script setup lang="ts">
import { ref } from 'vue'
import { SgButton, SgDrawer } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Drawer',
    lead: 'Side panel that slides in from one of four edges.',
    when1: 'Settings, details, or auxiliary forms that should not interrupt page flow.',
    when2: 'Wider content that does not fit a Modal or a Tooltip.',
    rightTitle: 'Right (default)',
    rightDesc: 'Slide in from the right.',
    leftTitle: 'Left placement',
    leftDesc: '`placement="left"`.',
  },
  ru: {
    title: 'Drawer',
    lead: 'Боковая панель, выезжающая с одного из четырёх краёв.',
    when1: 'Настройки, детали, дополнительные формы — без блокировки потока страницы.',
    when2: 'Широкий контент, не влезающий в Modal или Tooltip.',
    rightTitle: 'Справа (по умолчанию)',
    rightDesc: 'Выезд справа.',
    leftTitle: 'Слева',
    leftDesc: '`placement="left"`.',
  },
})

const a = ref(false)
const b = ref(false)

const propsData: PropDef[] = [
  { name: 'open', description: 'Controls visibility.', type: 'boolean', required: true },
  { name: 'placement', description: 'Edge from which the panel enters.', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'" },
  { name: 'width', description: 'Width for left/right placement.', type: 'number | string', default: '378' },
  { name: 'height', description: 'Height for top/bottom placement.', type: 'number | string', default: '378' },
  { name: 'title', description: 'Header text.', type: 'string' },
  { name: 'closable', description: 'Show close icon.', type: 'boolean', default: 'true' },
  { name: 'mask', description: 'Render a dimmed mask.', type: 'boolean', default: 'true' },
  { name: 'maskClosable', description: 'Mask click closes drawer.', type: 'boolean', default: 'true' },
]

const RIGHT = `<SgDrawer :open="open" title="Settings" @close="open = false">…</SgDrawer>`
const LEFT = `<SgDrawer placement="left" :open="open" @close="open = false">…</SgDrawer>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="feedback"
    :crumbs="['Feedback', 'Drawer']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.rightTitle" :description="t.rightDesc" :code="RIGHT">
      <SgButton @click="a = true">Open drawer</SgButton>
      <SgDrawer :open="a" title="Settings" @close="a = false">
        <p>Drawer body content.</p>
      </SgDrawer>
    </DemoBox>

    <DemoBox :title="t.leftTitle" :description="t.leftDesc" :code="LEFT">
      <SgButton @click="b = true">Open from left</SgButton>
      <SgDrawer :open="b" placement="left" title="Menu" @close="b = false">
        <p>Sliding from the left edge.</p>
      </SgDrawer>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
