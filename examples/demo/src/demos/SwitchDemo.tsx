import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useSwitchDocStrings } from './switch-doc/useSwitchDocStrings'

import { BasicSwitch } from './switch/Basic.demo'
import BasicSource from './switch/Basic.demo?raw'
import { TextIconSwitch } from './switch/TextIcon.demo'
import TextIconSource from './switch/TextIcon.demo?raw'
import { SizesSwitch } from './switch/Sizes.demo'
import SizesSource from './switch/Sizes.demo?raw'
import { StatesSwitch } from './switch/States.demo'
import StatesSource from './switch/States.demo?raw'
import { AsyncToggleSwitch } from './switch/AsyncToggle.demo'
import AsyncToggleSource from './switch/AsyncToggle.demo?raw'
import { InFormSwitch } from './switch/InForm.demo'
import InFormSource from './switch/InForm.demo?raw'
import { TokensOverrideSwitch } from './switch/TokensOverride.demo'
import TokensOverrideSource from './switch/TokensOverride.demo?raw'
import { UnstyledSwitch } from './switch/Unstyled.demo'
import UnstyledSource from './switch/Unstyled.demo?raw'

export function SwitchDemo() {
  const t = useSwitchDocStrings()

  const switchProps = useMemo<PropDef[]>(
    () => [
      { name: 'checked', description: t.propChecked, type: 'boolean' },
      { name: 'defaultChecked', description: t.propDefaultChecked, type: 'boolean', default: 'false' },
      { name: 'onChange', description: t.propOnChange, type: '(checked: boolean) => void' },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'false' },
      { name: 'size', description: t.propSize, type: "'small' | 'middle' | 'large'", default: "'middle'" },
      { name: 'checkedChildren', description: t.propCheckedChildren, type: 'ReactNode' },
      { name: 'unCheckedChildren', description: t.propUnCheckedChildren, type: 'ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const switchCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssSgColorPrimary },
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssSgColorTextDisabled },
      { name: 'sg-color-white', default: '#ffffff', description: t.cssSgColorWhite },
      { name: 'sg-shadow-sm', default: '0 1px 2px rgba(0, 0, 0, 0.05)', description: t.cssSgShadowSm },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssSgTransitionDuration },
      { name: 'sg-transition-timing', default: 'cubic-bezier(.4,0,.2,1)', description: t.cssSgTransitionTiming },
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
        <BasicSwitch />
      </DemoBox>

      <DemoBox title={t.demoTextIconTitle} description={t.demoTextIconDesc} code={TextIconSource}>
        <TextIconSwitch />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesSwitch />
      </DemoBox>

      <DemoBox title={t.demoStatesTitle} description={t.demoStatesDesc} code={StatesSource}>
        <StatesSwitch />
      </DemoBox>

      <DemoBox
        title={t.demoAsyncTitle}
        description={t.demoAsyncDesc}
        code={AsyncToggleSource}
      >
        <AsyncToggleSwitch />
      </DemoBox>

      <DemoBox
        title={t.demoInFormTitle}
        description={t.demoInFormDesc}
        code={InFormSource}
      >
        <InFormSwitch />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideSwitch />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledSwitch />
      </DemoBox>

      <PropsTable title={t.tableSwitchApi} data={switchProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={switchCssVars}
      />
    </ComponentDoc>
  )
}
