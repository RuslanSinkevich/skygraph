import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicUpload } from './upload/Basic.demo'
import BasicSource from './upload/Basic.demo?raw'
import { MultipleUpload } from './upload/Multiple.demo'
import MultipleSource from './upload/Multiple.demo?raw'
import { AcceptUpload } from './upload/Accept.demo'
import AcceptSource from './upload/Accept.demo?raw'
import { CustomTriggerUpload } from './upload/CustomTrigger.demo'
import CustomTriggerSource from './upload/CustomTrigger.demo?raw'
import { WithProgressUpload } from './upload/WithProgress.demo'
import WithProgressSource from './upload/WithProgress.demo?raw'
import { ErrorStateUpload } from './upload/ErrorState.demo'
import ErrorStateSource from './upload/ErrorState.demo?raw'
import { DisabledUpload } from './upload/Disabled.demo'
import DisabledSource from './upload/Disabled.demo?raw'
import { TokensOverrideUpload } from './upload/TokensOverride.demo'
import TokensOverrideSource from './upload/TokensOverride.demo?raw'
import { UnstyledUpload } from './upload/Unstyled.demo'
import UnstyledSource from './upload/Unstyled.demo?raw'

const uploadProps: PropDef[] = [
  { name: 'accept', description: 'Passed to the hidden <input type="file" accept>', type: 'string' },
  { name: 'multiple', description: 'Allow picking many files per dialog', type: 'boolean', default: 'false' },
  { name: 'fileList', description: 'Controlled file list rendered under the trigger', type: 'UploadFile[]', default: '[]' },
  { name: 'maxCount', description: 'Limit how many new files pass through onUpload', type: 'number' },
  { name: 'onUpload', description: 'Called with native File objects after the picker resolves', type: '(files: File[]) => void' },
  { name: 'onRemove', description: 'Called when the user clicks × on a list item', type: '(file: UploadFile) => void' },
  { name: 'disabled', description: 'Block the trigger entirely', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Render the default trigger in loading state', type: 'boolean', default: 'false' },
  { name: 'children', description: 'Custom trigger (defaults to a primary "Upload" button)', type: 'ReactNode' },
  { name: 'className', description: 'Root wrapper className', type: 'string' },
  { name: 'style', description: 'Root wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes — keep only semantics', type: 'boolean', default: 'false' },
]

const uploadFileProps: PropDef[] = [
  { name: 'uid', description: 'Stable unique id (keys + remove callbacks)', type: 'string' },
  { name: 'name', description: 'Display file name', type: 'string' },
  { name: 'size', description: 'File size in bytes', type: 'number' },
  { name: 'status', description: 'Row status variant', type: "'uploading' | 'done' | 'error'" },
]

const uploadCssVars: CssVarDef[] = [
  { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: 'File row border' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'File name color (done/uploading)' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Remove (×) button color' },
  { name: 'sg-color-error', default: 'var(--sg-red-5)', description: 'Error-row border, text and hover state of ×' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'File row radius' },
  { name: 'sg-font-size', default: '14px', description: 'Remove button font size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'File row name font size' },
  { name: 'sg-margin-sm', default: '12px', description: 'Gap between trigger and list' },
  { name: 'sg-margin-xs', default: '8px', description: 'Gap between list rows' },
  { name: 'sg-padding-xs', default: '8px', description: 'Row vertical padding + inner gap' },
  { name: 'sg-padding-sm', default: '12px', description: 'Row horizontal padding' },
  { name: 'sg-spin-color', default: 'var(--sg-color-text-tertiary)', description: 'Inline loading spinner color' },
]

export function UploadDemo() {
  return (
    <ComponentDoc
      title="Upload"
      description="Hidden native file input with a swappable trigger and an optional controlled file list. No network layer — you own the transport."
      whenToUse={[
        'When you need file selection inside a form; pair it with your own upload/progress logic.',
        'When the built-in list (uploading / done / error) is enough for UX feedback.',
        'When you want a branded trigger — Upload accepts any ReactNode as children.',
      ]}
    >
      <DemoBox title="Basic" description="Simulated upload with uploading → done transition." code={BasicSource}>
        <BasicUpload />
      </DemoBox>

      <DemoBox title="Multiple" description="Pick several files at once, cap via maxCount." code={MultipleSource}>
        <MultipleUpload />
      </DemoBox>

      <DemoBox title="Accept filter" description="Restrict the native picker to specific MIME types or extensions." code={AcceptSource}>
        <AcceptUpload />
      </DemoBox>

      <DemoBox title="Custom trigger" description="Swap the default button for a branded card or drop zone." code={CustomTriggerSource}>
        <CustomTriggerUpload />
      </DemoBox>

      <DemoBox title="With progress bar" description="Show Progress in parallel with the built-in dots." code={WithProgressSource}>
        <WithProgressUpload />
      </DemoBox>

      <DemoBox title="Error state" description="Failed rows get the error theme and a remove button." code={ErrorStateSource}>
        <ErrorStateUpload />
      </DemoBox>

      <DemoBox title="Disabled / loading" description="Block the trigger or swap it for a loading state." code={DisabledSource}>
        <DisabledUpload />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope global tokens on a wrapper to re-skin the list."
        code={TokensOverrideSource}
      >
        <TokensOverrideUpload />
      </DemoBox>

      <DemoBox title="Unstyled" description="Just semantics — paint with your own CSS." code={UnstyledSource}>
        <UnstyledUpload />
      </DemoBox>

      <PropsTable title="Upload API" data={uploadProps} />
      <PropsTable title="UploadFile" data={uploadFileProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Upload itself has no --sg-upload-* tokens — it is fully driven by global palette/spacing. Override them on a scoped wrapper to re-skin a single instance."
        data={uploadCssVars}
      />
    </ComponentDoc>
  )
}
