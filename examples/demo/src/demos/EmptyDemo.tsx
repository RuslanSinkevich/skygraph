import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useEmptyDocStrings } from './empty-doc/useEmptyDocStrings'

import { BasicEmpty } from './empty/Basic.demo'
import BasicSource from './empty/Basic.demo?raw'
import { DescriptionEmpty } from './empty/Description.demo'
import DescriptionSource from './empty/Description.demo?raw'
import { NoDescriptionEmpty } from './empty/NoDescription.demo'
import NoDescriptionSource from './empty/NoDescription.demo?raw'
import { WithActionsEmpty } from './empty/WithActions.demo'
import WithActionsSource from './empty/WithActions.demo?raw'
import { CustomImageEmpty } from './empty/CustomImage.demo'
import CustomImageSource from './empty/CustomImage.demo?raw'
import { InCardEmpty } from './empty/InCard.demo'
import InCardSource from './empty/InCard.demo?raw'
import { TokensOverrideEmpty } from './empty/TokensOverride.demo'
import TokensOverrideSource from './empty/TokensOverride.demo?raw'
import { UnstyledEmpty } from './empty/Unstyled.demo'
import UnstyledSource from './empty/Unstyled.demo?raw'

export function EmptyDemo() {
  const t = useEmptyDocStrings()

  const emptyProps = useMemo<PropDef[]>(
    () => [
      { name: 'image', description: t.propImage, type: 'ReactNode' },
      { name: 'description', description: t.propDescription, type: 'ReactNode' },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const emptyCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssSgColorTextDisabled },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssSgColorTextTertiary },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-line-height', default: '1.5714', description: t.cssSgLineHeight },
      { name: 'sg-padding-xl', default: '20px', description: t.cssSgPaddingXl },
      { name: 'sg-margin-sm', default: '8px', description: t.cssSgMarginSm },
      { name: 'sg-margin-md', default: '12px', description: t.cssSgMarginMd },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbEmpty]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicEmpty />
      </DemoBox>

      <DemoBox
        title={t.demoDescriptionTitle}
        description={t.demoDescriptionDesc}
        code={DescriptionSource}
      >
        <DescriptionEmpty />
      </DemoBox>

      <DemoBox
        title={t.demoNoDescriptionTitle}
        description={t.demoNoDescriptionDesc}
        code={NoDescriptionSource}
      >
        <NoDescriptionEmpty />
      </DemoBox>

      <DemoBox
        title={t.demoActionsTitle}
        description={t.demoActionsDesc}
        code={WithActionsSource}
      >
        <WithActionsEmpty />
      </DemoBox>

      <DemoBox
        title={t.demoCustomImageTitle}
        description={t.demoCustomImageDesc}
        code={CustomImageSource}
      >
        <CustomImageEmpty />
      </DemoBox>

      <DemoBox
        title={t.demoInCardTitle}
        description={t.demoInCardDesc}
        code={InCardSource}
      >
        <InCardEmpty />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideEmpty />
      </DemoBox>

      <DemoBox
        title={t.demoUnstyledTitle}
        description={t.demoUnstyledDesc}
        code={UnstyledSource}
      >
        <UnstyledEmpty />
      </DemoBox>

      <PropsTable title={t.tableEmptyApi} data={emptyProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={emptyCssVars}
      />
    </ComponentDoc>
  )
}
