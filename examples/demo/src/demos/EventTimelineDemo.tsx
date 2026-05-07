import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useEventTimelineDocStrings } from './event-timeline-doc/useEventTimelineDocStrings'

import { EventsTimeline } from './timeline/Events.demo'
import EventsSource from './timeline/Events.demo?raw'
import { HorizontalTimeline } from './timeline/Horizontal.demo'
import HorizontalSource from './timeline/Horizontal.demo?raw'

export function EventTimelineDemo() {
  const t = useEventTimelineDocStrings()

  const eventTimelineProps = useMemo<PropDef[]>(
    () => [
      { name: 'events', description: t.propEvents, type: 'TimelineEvent[]', required: true },
      { name: 'orientation', description: t.propOrientation, type: "'horizontal' | 'vertical'", default: "'vertical'" },
      { name: 'groupBy', description: t.propGroupBy, type: "'day' | 'month' | 'year'" },
      { name: 'renderMarker', description: t.propRenderMarker, type: '(event: TimelineEvent) => ReactNode' },
      { name: 'renderEvent', description: t.propRenderEvent, type: '(event: TimelineEvent) => ReactNode' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
    ],
    [t],
  )

  const eventProps = useMemo<PropDef[]>(
    () => [
      { name: 'id', description: t.propEventId, type: 'string', required: true },
      { name: 'date', description: t.propEventDate, type: 'Date | number', required: true },
      { name: 'title', description: t.propEventTitle, type: 'ReactNode', required: true },
      { name: 'description', description: t.propEventDescription, type: 'ReactNode' },
      { name: 'color', description: t.propEventColor, type: 'string' },
    ],
    [t],
  )

  const eventTimelineCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssSgColorPrimary },
      { name: 'sg-color-bg', default: '#ffffff', description: t.cssSgColorBg },
      { name: 'sg-color-border-secondary', default: '#f0f0f0', description: t.cssSgColorBorderSecondary },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssSgColorTextSecondary },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssSgColorTextTertiary },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-line-height', default: '1.57', description: t.cssSgLineHeight },
      { name: 'sg-margin-md', default: '16px', description: t.cssSgMarginMd },
      { name: 'sg-margin-sm', default: '8px', description: t.cssSgMarginSm },
      { name: 'sg-margin-xs', default: '4px', description: t.cssSgMarginXs },
      { name: 'sg-padding-md', default: '12px', description: t.cssSgPaddingMd },
      { name: 'sg-padding-sm', default: '8px', description: t.cssSgPaddingSm },
      { name: 'sg-padding-xs', default: '4px', description: t.cssSgPaddingXs },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbEventTimeline]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox
        title={t.demoBasicTitle}
        description={t.demoBasicDesc}
        code={EventsSource}
      >
        <EventsTimeline />
      </DemoBox>

      <DemoBox
        title={t.demoHorizontalTitle}
        description={t.demoHorizontalDesc}
        code={HorizontalSource}
      >
        <HorizontalTimeline />
      </DemoBox>

      <PropsTable title={t.tableEventTimelineApi} data={eventTimelineProps} />
      <PropsTable title={t.tableEventApi} data={eventProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={eventTimelineCssVars}
      />
    </ComponentDoc>
  )
}
