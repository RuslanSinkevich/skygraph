<script setup lang="ts">
import { SgButton, SgNotificationContainer, notification } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Notification',
    lead: 'Imperative toast/notification API with corner-anchored containers.',
    when1: 'Async background events: "Saved", "Job complete", "New mail".',
    when2: 'Status results that should auto-dismiss but stay visible briefly.',
    typesTitle: 'Types',
    typesDesc: 'success / error / warning / info via shorthand methods.',
    descTitle: 'With description',
    descDesc: 'Two-line variant with title + description.',
    placementTitle: 'Placement',
    placementDesc: 'Per-call placement override (corner).',
    durationTitle: 'Sticky',
    durationDesc: 'Duration `0` keeps the toast until the user closes it.',
    note: 'A `<SgNotificationContainer />` for each placement is needed once in the app shell.',
    fireSuccess: 'Success',
    fireError: 'Error',
    fireWarning: 'Warning',
    fireInfo: 'Info',
    fireDescription: 'With description',
    fireTopLeft: 'topLeft',
    fireBottomRight: 'bottomRight',
    fireSticky: 'Sticky toast',
    fireClear: 'Clear all',
  },
  ru: {
    title: 'Notification',
    lead: 'Императивный toast-API с контейнерами в углах.',
    when1: 'Асинхронные события: «Сохранено», «Готово», «Новое письмо».',
    when2: 'Статусные сообщения, которые сами скрываются, но видны какое-то время.',
    typesTitle: 'Типы',
    typesDesc: 'success / error / warning / info через шорткаты.',
    descTitle: 'С описанием',
    descDesc: 'Двухстрочный вариант: заголовок + описание.',
    placementTitle: 'Расположение',
    placementDesc: 'Переопределение угла на конкретный вызов.',
    durationTitle: 'Sticky',
    durationDesc: 'Duration `0` — пока пользователь не закроет.',
    note: 'Нужен один `<SgNotificationContainer />` на каждое расположение в шелле приложения.',
    fireSuccess: 'Success',
    fireError: 'Error',
    fireWarning: 'Warning',
    fireInfo: 'Info',
    fireDescription: 'С описанием',
    fireTopLeft: 'topLeft',
    fireBottomRight: 'bottomRight',
    fireSticky: 'Sticky toast',
    fireClear: 'Clear all',
  },
})

const propsData: PropDef[] = [
  {
    name: 'notification.success(message, description?)',
    description: 'Show success toast.',
    type: 'function',
  },
  {
    name: 'notification.error(message, description?)',
    description: 'Show error toast.',
    type: 'function',
  },
  {
    name: 'notification.warning(message, description?)',
    description: 'Show warning toast.',
    type: 'function',
  },
  {
    name: 'notification.info(message, description?)',
    description: 'Show info toast.',
    type: 'function',
  },
  {
    name: 'notification.open(config)',
    description: 'Show with full config (`type`, `duration`, `placement`, ...).',
    type: 'function',
  },
  {
    name: 'notification.destroy()',
    description: 'Clear all active notifications.',
    type: 'function',
  },
  {
    name: '<SgNotificationContainer placement="topRight" />',
    description: 'Required mount point per corner.',
    type: 'component',
  },
]

const TYPES = `notification.success('Saved')
notification.error('Something went wrong')
notification.warning('Disk almost full')
notification.info('New version available')`

const DESC = `notification.success(
  'Backup complete',
  'Synced 142 files in 3.4s.',
)`

const PLACE = `notification.open({
  type: 'info',
  message: 'Top-left',
  placement: 'topLeft',
})`

const DUR = `notification.open({
  type: 'warning',
  message: 'Manual close required',
  duration: 0,
})`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="feedback"
    :crumbs="['Feedback', 'Notification']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.typesTitle" :description="t.typesDesc" :code="TYPES">
      <SgButton @click="notification.success(t.fireSuccess)">{{ t.fireSuccess }}</SgButton>
      <SgButton @click="notification.error(t.fireError)">{{ t.fireError }}</SgButton>
      <SgButton @click="notification.warning(t.fireWarning)">{{ t.fireWarning }}</SgButton>
      <SgButton @click="notification.info(t.fireInfo)">{{ t.fireInfo }}</SgButton>
    </DemoBox>

    <DemoBox :title="t.descTitle" :description="t.descDesc" :code="DESC">
      <SgButton @click="notification.success('Backup complete', 'Synced 142 files in 3.4s.')">
        {{ t.fireDescription }}
      </SgButton>
    </DemoBox>

    <DemoBox :title="t.placementTitle" :description="t.placementDesc" :code="PLACE">
      <SgButton
        @click="notification.open({ type: 'info', message: t.fireTopLeft, placement: 'topLeft' })"
      >
        {{ t.fireTopLeft }}
      </SgButton>
      <SgButton
        @click="
          notification.open({ type: 'info', message: t.fireBottomRight, placement: 'bottomRight' })
        "
      >
        {{ t.fireBottomRight }}
      </SgButton>
    </DemoBox>

    <DemoBox :title="t.durationTitle" :description="t.durationDesc" :code="DUR">
      <SgButton @click="notification.open({ type: 'warning', message: t.fireSticky, duration: 0 })">
        {{ t.fireSticky }}
      </SgButton>
      <SgButton @click="notification.destroy()">{{ t.fireClear }}</SgButton>
    </DemoBox>

    <p style="font-size: 13px; color: var(--sg-color-text-secondary); margin-top: 16px">
      {{ t.note }}
    </p>

    <SgNotificationContainer placement="topRight" />
    <SgNotificationContainer placement="topLeft" />
    <SgNotificationContainer placement="bottomRight" />
    <SgNotificationContainer placement="bottomLeft" />

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
