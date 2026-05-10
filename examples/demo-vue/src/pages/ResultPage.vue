<script setup lang="ts">
import { SgButton, SgResult } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Result',
    lead: 'Full-page status / outcome screen — success, error, info, warning and 403/404/500.',
    when1: 'Final step of a wizard or after a long-running operation.',
    when2: 'HTTP error pages and confirmations.',
    successTitle: 'Success',
    successDesc: 'Outcome of an action that succeeded.',
    errorTitle: 'Error',
    errorDesc: 'Outcome of an action that failed.',
    infoTitle: 'Info',
    infoDesc: 'Neutral confirmation / acknowledgement.',
    warningTitle: 'Warning',
    warningDesc: 'Caution / partially completed operation.',
    notFoundTitle: '404',
    notFoundDesc: 'Resource missing.',
  },
  ru: {
    title: 'Result',
    lead: 'Полноэкранный экран итога — success, error, info, warning и 403/404/500.',
    when1: 'Финальный шаг визарда или после долгой операции.',
    when2: 'HTTP-страницы ошибок и подтверждений.',
    successTitle: 'Success',
    successDesc: 'Успешное действие.',
    errorTitle: 'Error',
    errorDesc: 'Неудачное действие.',
    infoTitle: 'Info',
    infoDesc: 'Нейтральное подтверждение.',
    warningTitle: 'Warning',
    warningDesc: 'Осторожно / частично выполнено.',
    notFoundTitle: '404',
    notFoundDesc: 'Ресурс не найден.',
  },
})

const propsData: PropDef[] = [
  {
    name: 'status',
    description: 'Outcome type.',
    type: "'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'",
    required: true,
  },
  { name: 'title', description: 'Primary heading.', type: 'string', required: true },
  { name: 'subTitle', description: 'Secondary explanatory text.', type: 'string' },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const SUCCESS = `<SgResult status="success" title="Order submitted" sub-title="We sent a confirmation email." >
  <template #extra>
    <SgButton type="primary">Back home</SgButton>
  </template>
</SgResult>`
const ERROR = `<SgResult status="error" title="Submission failed" sub-title="Two fields contain validation errors." >
  <template #extra>
    <SgButton type="primary">Try again</SgButton>
  </template>
</SgResult>`
const NOT_FOUND = `<SgResult status="404" title="Not found" sub-title="The page you requested does not exist." />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="feedback"
    :crumbs="['Feedback', 'Result']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.successTitle" :description="t.successDesc" :code="SUCCESS" vertical>
      <SgResult status="success" title="Order submitted" sub-title="We sent a confirmation email.">
        <template #extra>
          <SgButton type="primary">Back home</SgButton>
        </template>
      </SgResult>
    </DemoBox>

    <DemoBox :title="t.errorTitle" :description="t.errorDesc" :code="ERROR" vertical>
      <SgResult
        status="error"
        title="Submission failed"
        sub-title="Two fields contain validation errors."
      >
        <template #extra>
          <SgButton type="primary">Try again</SgButton>
        </template>
      </SgResult>
    </DemoBox>

    <DemoBox :title="t.infoTitle" :description="t.infoDesc" :code="''" vertical>
      <SgResult status="info" title="Operation queued" sub-title="It will run within a minute." />
    </DemoBox>

    <DemoBox :title="t.warningTitle" :description="t.warningDesc" :code="''" vertical>
      <SgResult status="warning" title="Partial success" sub-title="3 of 4 items processed." />
    </DemoBox>

    <DemoBox :title="t.notFoundTitle" :description="t.notFoundDesc" :code="NOT_FOUND" vertical>
      <SgResult status="404" title="Not found" sub-title="The page you requested does not exist." />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
