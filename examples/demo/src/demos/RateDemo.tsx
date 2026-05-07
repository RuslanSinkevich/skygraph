import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useRateDocStrings } from './rate-doc/useRateDocStrings'

import { BasicRate } from './rate/Basic.demo'
import BasicSource from './rate/Basic.demo?raw'
import { AllowHalfRate } from './rate/AllowHalf.demo'
import AllowHalfSource from './rate/AllowHalf.demo?raw'
import { CountRate } from './rate/Count.demo'
import CountSource from './rate/Count.demo?raw'
import { CustomCharacterRate } from './rate/CustomCharacter.demo'
import CustomCharacterSource from './rate/CustomCharacter.demo?raw'
import { DisabledRate } from './rate/Disabled.demo'
import DisabledSource from './rate/Disabled.demo?raw'
import { InFormRate } from './rate/InForm.demo'
import InFormSource from './rate/InForm.demo?raw'
import { TokensOverrideRate } from './rate/TokensOverride.demo'
import TokensOverrideSource from './rate/TokensOverride.demo?raw'
import { UnstyledRate } from './rate/Unstyled.demo'
import UnstyledSource from './rate/Unstyled.demo?raw'

export function RateDemo() {
  const t = useRateDocStrings()

  const rateProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propValue, type: 'number' },
      { name: 'defaultValue', description: t.propDefaultValue, type: 'number', default: '0' },
      { name: 'count', description: t.propCount, type: 'number', default: '5' },
      { name: 'allowHalf', description: t.propAllowHalf, type: 'boolean', default: 'false' },
      { name: 'character', description: t.propCharacter, type: 'ReactNode', default: "'★'" },
      { name: 'onChange', description: t.propOnChange, type: '(value: number) => void' },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const rateCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-star', default: '#fadb14', description: t.cssSgColorStar },
      { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: t.cssSgColorBorder },
      {
        name: 'sg-rate-symbol-empty-opacity',
        default: '0.42',
        description: t.cssSgRateSymbolEmptyOpacity,
      },
      { name: 'sg-font-size-xl', default: '20px', description: t.cssSgFontSizeXl },
      { name: 'sg-padding-xs', default: '8px', description: t.cssSgPaddingXs },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssSgTransitionDuration },
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
        <BasicRate />
      </DemoBox>

      <DemoBox title={t.demoAllowHalfTitle} description={t.demoAllowHalfDesc} code={AllowHalfSource}>
        <AllowHalfRate />
      </DemoBox>

      <DemoBox title={t.demoCountTitle} description={t.demoCountDesc} code={CountSource}>
        <CountRate />
      </DemoBox>

      <DemoBox title={t.demoCustomCharacterTitle} description={t.demoCustomCharacterDesc} code={CustomCharacterSource}>
        <CustomCharacterRate />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={DisabledSource}>
        <DisabledRate />
      </DemoBox>

      <DemoBox title={t.demoInFormTitle} description={t.demoInFormDesc} code={InFormSource}>
        <InFormRate />
      </DemoBox>

      <DemoBox title={t.demoTokensOverrideTitle} description={t.demoTokensOverrideDesc} code={TokensOverrideSource}>
        <TokensOverrideRate />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledRate />
      </DemoBox>

      <PropsTable title={t.tableRateApi} data={rateProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={rateCssVars}
      />
    </ComponentDoc>
  )
}
