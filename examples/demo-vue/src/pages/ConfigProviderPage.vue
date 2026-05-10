<script setup lang="ts">
import { SgButton, SgConfigProvider, SgInput, SgSelect } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'ConfigProvider',
    lead: 'Inject defaults (size, disabled, locale, bordered) into all nested Skygraph components.',
    when1: 'Set demo-wide form size or disabled state without prop drilling.',
    when2: 'Switch app-wide locale messages or scoped section overrides.',
    sizeTitle: 'Default size',
    sizeDesc: 'All nested controls inherit `size = "small"`.',
    disabledTitle: 'Default disabled',
    disabledDesc: 'Disable a whole subtree at once.',
    nestedTitle: 'Nested overrides',
    nestedDesc: 'Inner provider merges over outer values.',
  },
  ru: {
    title: 'ConfigProvider',
    lead: 'Передаёт дефолты (size, disabled, locale, bordered) всем вложенным компонентам.',
    when1: 'Глобальный размер форм или disabled без prop-drilling.',
    when2: 'Сменить локаль на всё приложение или конкретную секцию.',
    sizeTitle: 'Default size',
    sizeDesc: 'Все вложенные контролы наследуют `size = "small"`.',
    disabledTitle: 'Default disabled',
    disabledDesc: 'Отключить целую секцию.',
    nestedTitle: 'Вложенные оверрайды',
    nestedDesc: 'Внутренний провайдер мерджится поверх внешнего.',
  },
})

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]

const propsData: PropDef[] = [
  {
    name: 'size',
    description: 'Default size for nested components.',
    type: "'small' | 'middle' | 'large'",
  },
  { name: 'disabled', description: 'Disable interactions in subtree.', type: 'boolean' },
  { name: 'bordered', description: 'Default bordered styling for subtree.', type: 'boolean' },
  { name: 'locale', description: 'Locale messages merged with parent.', type: 'SgLocale' },
]

const SIZE = `<SgConfigProvider size="small">
  <SgInput placeholder="Inherits small" />
  <SgButton>Inherits small</SgButton>
</SgConfigProvider>`

const DIS = `<SgConfigProvider :disabled="true">
  <SgInput placeholder="Disabled" />
  <SgButton>Disabled</SgButton>
</SgConfigProvider>`

const NESTED = `<SgConfigProvider size="large">
  <SgButton>Large</SgButton>
  <SgConfigProvider size="small">
    <SgButton>Inner small</SgButton>
  </SgConfigProvider>
</SgConfigProvider>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="general"
    :crumbs="['General', 'ConfigProvider']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.sizeTitle" :description="t.sizeDesc" :code="SIZE">
      <SgConfigProvider size="small">
        <div style="display: flex; gap: 8px; align-items: center">
          <SgInput placeholder="Inherits small" />
          <SgSelect :options="options" placeholder="Inherits small" />
          <SgButton>Inherits small</SgButton>
        </div>
      </SgConfigProvider>
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DIS">
      <SgConfigProvider :disabled="true">
        <div style="display: flex; gap: 8px; align-items: center">
          <SgInput placeholder="Disabled" />
          <SgSelect :options="options" placeholder="Disabled" />
          <SgButton>Disabled</SgButton>
        </div>
      </SgConfigProvider>
    </DemoBox>

    <DemoBox :title="t.nestedTitle" :description="t.nestedDesc" :code="NESTED">
      <SgConfigProvider size="large">
        <div style="display: flex; gap: 8px; align-items: center">
          <SgButton>Large</SgButton>
          <SgConfigProvider size="small">
            <SgButton>Inner small</SgButton>
          </SgConfigProvider>
        </div>
      </SgConfigProvider>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
