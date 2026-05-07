import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useTimelineDocStrings } from './timeline-doc/useTimelineDocStrings'

import { BasicTimeline } from './timeline/Basic.demo'
import BasicSource from './timeline/Basic.demo?raw'
import { RightModeTimeline } from './timeline/RightMode.demo'
import RightModeSource from './timeline/RightMode.demo?raw'
import { AlternateTimeline } from './timeline/Alternate.demo'
import AlternateSource from './timeline/Alternate.demo?raw'
import { WithLabelTimeline } from './timeline/WithLabel.demo'
import WithLabelSource from './timeline/WithLabel.demo?raw'
import { PendingTimeline } from './timeline/Pending.demo'
import PendingSource from './timeline/Pending.demo?raw'
import { ReverseTimeline } from './timeline/Reverse.demo'
import ReverseSource from './timeline/Reverse.demo?raw'
import { CustomDotTimeline } from './timeline/CustomDot.demo'
import CustomDotSource from './timeline/CustomDot.demo?raw'
import { CustomColorTimeline } from './timeline/CustomColor.demo'
import CustomColorSource from './timeline/CustomColor.demo?raw'
import { TokensOverrideTimeline } from './timeline/TokensOverride.demo'
import TokensOverrideSource from './timeline/TokensOverride.demo?raw'
import { UnstyledTimeline } from './timeline/Unstyled.demo'
import UnstyledSource from './timeline/Unstyled.demo?raw'

export function TimelineDemo() {
  const t = useTimelineDocStrings()

  const timelineProps = useMemo<PropDef[]>(
    () => [
      { name: 'items', description: t.propItems, type: 'TimelineItem[]' },
      { name: 'mode', description: t.propMode, type: "'left' | 'right' | 'alternate'", default: "'left'" },
      { name: 'pending', description: t.propPending, type: 'ReactNode | boolean' },
      { name: 'pendingDot', description: t.propPendingDot, type: 'ReactNode' },
      { name: 'reverse', description: t.propReverse, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const timelineItemProps = useMemo<PropDef[]>(
    () => [
      { name: 'children', description: t.itemChildren, type: 'ReactNode' },
      { name: 'color', description: t.itemColor, type: 'string' },
      { name: 'dot', description: t.itemDot, type: 'ReactNode' },
      { name: 'label', description: t.itemLabel, type: 'ReactNode' },
      { name: 'position', description: t.itemPosition, type: "'left' | 'right'" },
    ],
    [t],
  )

  const timelineCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssSgColorPrimary },
      { name: 'sg-color-bg', default: '#ffffff', description: t.cssSgColorBg },
      { name: 'sg-color-border-secondary', default: '#f0f0f0', description: t.cssSgColorBorderSecondary },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssSgColorTextSecondary },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssSgColorTextTertiary },
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssSgColorTextDisabled },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssSgFontSizeLg },
      { name: 'sg-line-height', default: '1.57', description: t.cssSgLineHeight },
      { name: 'sg-padding-md', default: '12px', description: t.cssSgPaddingMd },
      { name: 'sg-padding-xl', default: '24px', description: t.cssSgPaddingXl },
      { name: 'sg-margin-xs', default: '4px', description: t.cssSgMarginXs },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbTimeline]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicTimeline />
      </DemoBox>

      <DemoBox
        title={t.demoRightModeTitle}
        description={t.demoRightModeDesc}
        code={RightModeSource}
      >
        <RightModeTimeline />
      </DemoBox>

      <DemoBox
        title={t.demoAlternateTitle}
        description={t.demoAlternateDesc}
        code={AlternateSource}
      >
        <AlternateTimeline />
      </DemoBox>

      <DemoBox
        title={t.demoWithLabelTitle}
        description={t.demoWithLabelDesc}
        code={WithLabelSource}
      >
        <WithLabelTimeline />
      </DemoBox>

      <DemoBox
        title={t.demoPendingTitle}
        description={t.demoPendingDesc}
        code={PendingSource}
      >
        <PendingTimeline />
      </DemoBox>

      <DemoBox
        title={t.demoReverseTitle}
        description={t.demoReverseDesc}
        code={ReverseSource}
      >
        <ReverseTimeline />
      </DemoBox>

      <DemoBox
        title={t.demoCustomDotTitle}
        description={t.demoCustomDotDesc}
        code={CustomDotSource}
      >
        <CustomDotTimeline />
      </DemoBox>

      <DemoBox
        title={t.demoCustomColorTitle}
        description={t.demoCustomColorDesc}
        code={CustomColorSource}
      >
        <CustomColorTimeline />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideTimeline />
      </DemoBox>

      <DemoBox
        title={t.demoUnstyledTitle}
        description={t.demoUnstyledDesc}
        code={UnstyledSource}
      >
        <UnstyledTimeline />
      </DemoBox>

      <PropsTable title={t.tableTimelineApi} data={timelineProps} />
      <PropsTable title={t.tableTimelineItem} data={timelineItemProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={timelineCssVars}
      />
    </ComponentDoc>
  )
}
