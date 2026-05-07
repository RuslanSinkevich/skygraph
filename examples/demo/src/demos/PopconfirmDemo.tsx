import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { usePopconfirmDocStrings } from './popconfirm-doc/usePopconfirmDocStrings'

import { BasicPopconfirm } from './popconfirm/Basic.demo'
import BasicSource from './popconfirm/Basic.demo?raw'
import { WithDescriptionPopconfirm } from './popconfirm/WithDescription.demo'
import WithDescriptionSource from './popconfirm/WithDescription.demo?raw'
import { PlacementPopconfirm } from './popconfirm/Placement.demo'
import PlacementSource from './popconfirm/Placement.demo?raw'
import { DisabledPopconfirm } from './popconfirm/Disabled.demo'
import DisabledSource from './popconfirm/Disabled.demo?raw'
import { InTablePopconfirm } from './popconfirm/InTable.demo'
import InTableSource from './popconfirm/InTable.demo?raw'
import { TokensOverridePopconfirm } from './popconfirm/TokensOverride.demo'
import TokensOverrideSource from './popconfirm/TokensOverride.demo?raw'
import { UnstyledPopconfirm } from './popconfirm/Unstyled.demo'
import UnstyledSource from './popconfirm/Unstyled.demo?raw'

export function PopconfirmDemo() {
  const t = usePopconfirmDocStrings()

  const popconfirmProps = useMemo<PropDef[]>(
    () => [
      { name: 'title', description: t.propTitle, type: 'ReactNode' },
      { name: 'description', description: t.propDescription, type: 'ReactNode' },
      { name: 'onConfirm', description: t.propOnConfirm, type: '() => void' },
      { name: 'onCancel', description: t.propOnCancel, type: '() => void' },
      { name: 'okText', description: t.propOkText, type: 'string', default: "'Yes'" },
      { name: 'cancelText', description: t.propCancelText, type: 'string', default: "'No'" },
      { name: 'placement', description: t.propPlacement, type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'" },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'children', description: t.propChildren, type: 'ReactElement' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const popconfirmCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.cssBgElevated },
      { name: 'sg-color-border-secondary', default: 'rgba(5, 5, 5, 0.04)', description: t.cssBorderSecondary },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssTextSecondary },
      { name: 'sg-color-warning', default: '#faad14', description: t.cssWarning },
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssPrimary },
      { name: 'sg-font-size', default: '14px', description: t.cssFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssFontSizeSm },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssFontSizeLg },
      { name: 'sg-padding-sm', default: '8px', description: t.cssPaddingSm },
      { name: 'sg-padding-md', default: '12px', description: t.cssPaddingMd },
      { name: 'sg-margin-xs', default: '4px', description: t.cssMarginXs },
      { name: 'sg-border-radius-lg', default: '8px', description: t.cssRadiusLg },
      { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0,0,0,0.08)', description: t.cssShadowLg },
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
        <BasicPopconfirm />
      </DemoBox>

      <DemoBox title={t.demoDescTitle} description={t.demoDescDesc} code={WithDescriptionSource}>
        <WithDescriptionPopconfirm />
      </DemoBox>

      <DemoBox title={t.demoPlacementTitle} description={t.demoPlacementDesc} code={PlacementSource}>
        <PlacementPopconfirm />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={DisabledSource}>
        <DisabledPopconfirm />
      </DemoBox>

      <DemoBox title={t.demoTableTitle} description={t.demoTableDesc} code={InTableSource}>
        <InTablePopconfirm />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverridePopconfirm />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledPopconfirm />
      </DemoBox>

      <PropsTable title={t.tablePopconfirmApi} data={popconfirmProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={popconfirmCssVars} />
    </ComponentDoc>
  )
}
