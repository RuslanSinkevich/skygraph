<script setup lang="ts">
import { ref } from 'vue'
import { SgUpload } from '@skygraph/vue'
import type { UploadFile } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Upload',
    lead: 'File upload with click, drag-and-drop, picture, and picture-card layouts.',
    when1: 'Profile pictures, attachments, bulk file imports.',
    when2: 'Replace generic `<input type="file">` with managed UI and file list.',
    basicTitle: 'Basic',
    basicDesc: 'Click button to pick files. Default text list.',
    multipleTitle: 'Multiple',
    multipleDesc: 'Allow selecting multiple files at once.',
    dragTitle: 'Drag area',
    dragDesc: 'Render drop zone instead of button.',
    pictureCardTitle: 'Picture card',
    pictureCardDesc: 'Card grid layout, suitable for image uploads.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Non-interactive read-only display.',
  },
  ru: {
    title: 'Upload',
    lead: 'Загрузка файлов: клик, drag-and-drop, picture, picture-card.',
    when1: 'Аватары, вложения, массовый импорт файлов.',
    when2: 'Замена обычному `<input type="file">` с управляемым UI и списком.',
    basicTitle: 'Basic',
    basicDesc: 'Клик по кнопке выбирает файлы. Текстовый список.',
    multipleTitle: 'Multiple',
    multipleDesc: 'Можно выбрать несколько файлов сразу.',
    dragTitle: 'Drag-зона',
    dragDesc: 'Drop-зона вместо кнопки.',
    pictureCardTitle: 'Picture card',
    pictureCardDesc: 'Сеточный режим для загрузки картинок.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Только для чтения.',
  },
})

const f1 = ref<UploadFile[]>([])
const f2 = ref<UploadFile[]>([])
const f3 = ref<UploadFile[]>([])
const f4 = ref<UploadFile[]>([])

const propsData: PropDef[] = [
  { name: 'modelValue / fileList', description: 'Two-way bound file list.', type: 'UploadFile[]' },
  {
    name: 'multiple',
    description: 'Allow selecting multiple files.',
    type: 'boolean',
    default: 'false',
  },
  { name: 'accept', description: 'Forwarded to underlying input.', type: 'string' },
  {
    name: 'drag',
    description: 'Render drop zone instead of button.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'listType',
    description: 'Layout for the file list.',
    type: "'text' | 'picture' | 'picture-card'",
    default: "'text'",
  },
  { name: 'showUploadList', description: 'Show built-in list.', type: 'boolean', default: 'true' },
  { name: 'maxCount', description: 'Maximum number of files.', type: 'number' },
  { name: 'maxSize', description: 'Max file size in bytes.', type: 'number' },
  {
    name: 'beforeUpload',
    description: 'Pre-upload hook (return false to skip).',
    type: '(file, list) => boolean | Promise',
  },
  { name: 'customRequest', description: 'Take over the upload yourself.', type: '(opts) => void' },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgUpload v-model="files" />`
const MULTI = `<SgUpload multiple v-model="files" />`
const DRAG = `<SgUpload drag v-model="files" />`
const CARD = `<SgUpload list-type="picture-card" multiple v-model="files" />`
const DISABLED = `<SgUpload disabled v-model="files" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Upload']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgUpload v-model="f1" />
    </DemoBox>

    <DemoBox :title="t.multipleTitle" :description="t.multipleDesc" :code="MULTI">
      <SgUpload multiple v-model="f2" />
    </DemoBox>

    <DemoBox :title="t.dragTitle" :description="t.dragDesc" :code="DRAG">
      <SgUpload drag v-model="f3" />
    </DemoBox>

    <DemoBox :title="t.pictureCardTitle" :description="t.pictureCardDesc" :code="CARD">
      <SgUpload list-type="picture-card" multiple v-model="f4" />
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED">
      <SgUpload disabled v-model="f1" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
