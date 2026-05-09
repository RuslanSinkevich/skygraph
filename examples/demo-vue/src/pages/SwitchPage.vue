<script setup lang="ts">
import { ref } from 'vue'
import { SgSwitch } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Switch',
    lead: 'Two-state toggle for immediate on/off settings.',
    when1: 'A setting whose state should take effect immediately, no Save button.',
    when2: 'When the action is reversible (notifications, dark mode, autoplay).',
    basicTitle: 'Basic',
    basicDesc: 'v-model boolean.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Two sizes — small and middle.',
    childrenTitle: 'With labels',
    childrenDesc: 'Inline on/off labels via slots.',
  },
  ru: {
    title: 'Switch',
    lead: 'Двух-позиционный переключатель для мгновенных настроек.',
    when1: 'Настройка применяется сразу, без Save.',
    when2: 'Когда действие обратимо (уведомления, тёмная тема, автозапуск).',
    basicTitle: 'Basic',
    basicDesc: 'Булевый v-model.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Два размера — small и middle.',
    childrenTitle: 'С метками',
    childrenDesc: 'Inline-метки on/off через slot-ы.',
  },
})

const a = ref(true)
const b = ref(false)

const propsData: PropDef[] = [
  { name: 'modelValue / checked', description: 'On state.', type: 'boolean' },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle'", default: "'middle'" },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgSwitch v-model="value" />`
const SIZES = `<SgSwitch size="small" :checked="true" />
<SgSwitch :checked="true" />`
const CHILDREN = `<SgSwitch v-model="value">
  <template #checkedChildren>ON</template>
  <template #unCheckedChildren>OFF</template>
</SgSwitch>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Switch']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgSwitch v-model="a" />
      <SgSwitch v-model="b" />
      <SgSwitch :disabled="true" :checked="true" />
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgSwitch size="small" :checked="true" />
      <SgSwitch :checked="true" />
    </DemoBox>

    <DemoBox :title="t.childrenTitle" :description="t.childrenDesc" :code="CHILDREN">
      <SgSwitch v-model="a">
        <template #checkedChildren>ON</template>
        <template #unCheckedChildren>OFF</template>
      </SgSwitch>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
