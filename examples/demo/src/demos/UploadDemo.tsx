import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useUploadDocStrings } from './upload-doc/useUploadDocStrings'

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

export function UploadDemo() {
  const t = useUploadDocStrings()

  const uploadProps = useMemo<PropDef[]>(
    () => [
      { name: 'accept', description: t.propAccept, type: 'string' },
      { name: 'multiple', description: t.propMultiple, type: 'boolean', default: 'false' },
      { name: 'fileList', description: t.propFileList, type: 'UploadFile[]', default: '[]' },
      { name: 'maxCount', description: t.propMaxCount, type: 'number' },
      { name: 'onUpload', description: t.propOnUpload, type: '(files: File[]) => void' },
      { name: 'onRemove', description: t.propOnRemove, type: '(file: UploadFile) => void' },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'false' },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const uploadFileProps = useMemo<PropDef[]>(
    () => [
      { name: 'uid', description: t.fileUid, type: 'string' },
      { name: 'name', description: t.fileName, type: 'string' },
      { name: 'size', description: t.fileSize, type: 'number' },
      { name: 'status', description: t.fileStatus, type: "'uploading' | 'done' | 'error'" },
    ],
    [t],
  )

  const uploadCssVars = useMemo<CssVarDef[]>(
    () => [
      {
        name: 'sg-color-border-secondary',
        default: 'var(--sg-gray-4)',
        description: t.cssSgColorBorderSecondary,
      },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      {
        name: 'sg-color-text-tertiary',
        default: 'rgba(0, 0, 0, 0.45)',
        description: t.cssSgColorTextTertiary,
      },
      { name: 'sg-color-error', default: 'var(--sg-red-5)', description: t.cssSgColorError },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssSgBorderRadiusSm },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-margin-sm', default: '12px', description: t.cssSgMarginSm },
      { name: 'sg-margin-xs', default: '8px', description: t.cssSgMarginXs },
      { name: 'sg-padding-xs', default: '8px', description: t.cssSgPaddingXs },
      { name: 'sg-padding-sm', default: '12px', description: t.cssSgPaddingSm },
      {
        name: 'sg-spin-color',
        default: 'var(--sg-color-text-tertiary)',
        description: t.cssSgSpinColor,
      },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicUpload />
      </DemoBox>

      <DemoBox title={t.demoMultipleTitle} description={t.demoMultipleDesc} code={MultipleSource}>
        <MultipleUpload />
      </DemoBox>

      <DemoBox title={t.demoAcceptTitle} description={t.demoAcceptDesc} code={AcceptSource}>
        <AcceptUpload />
      </DemoBox>

      <DemoBox
        title={t.demoCustomTriggerTitle}
        description={t.demoCustomTriggerDesc}
        code={CustomTriggerSource}
      >
        <CustomTriggerUpload />
      </DemoBox>

      <DemoBox
        title={t.demoWithProgressTitle}
        description={t.demoWithProgressDesc}
        code={WithProgressSource}
      >
        <WithProgressUpload />
      </DemoBox>

      <DemoBox
        title={t.demoErrorStateTitle}
        description={t.demoErrorStateDesc}
        code={ErrorStateSource}
      >
        <ErrorStateUpload />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={DisabledSource}>
        <DisabledUpload />
      </DemoBox>

      <DemoBox
        title={t.demoTokensOverrideTitle}
        description={t.demoTokensOverrideDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideUpload />
      </DemoBox>

      <PropsTable title={t.tableUploadApi} data={uploadProps} />
      <PropsTable title={t.tableUploadFile} data={uploadFileProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={uploadCssVars} />
    </ComponentDoc>
  )
}
