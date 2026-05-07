import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { useChartsDocStrings } from './charts-doc/useChartsDocStrings'

import { BasicLineChart } from './charts/BasicLine.demo'
import BasicLineSource from './charts/BasicLine.demo?raw'
import { BasicBarChart } from './charts/BasicBar.demo'
import BasicBarSource from './charts/BasicBar.demo?raw'
import { BasicAreaChart } from './charts/BasicArea.demo'
import BasicAreaSource from './charts/BasicArea.demo?raw'
import { BasicPieChart } from './charts/BasicPie.demo'
import BasicPieSource from './charts/BasicPie.demo?raw'

export function ChartsDemo() {
  const t = useChartsDocStrings()

  const baseProps = useMemo<PropDef[]>(
    () => [
      { name: 'categories', description: t.propCategories, type: 'ChartCategory[]', required: true },
      { name: 'series', description: t.propSeries, type: 'ChartSeries[]', required: true },
      { name: 'width', description: t.propWidth, type: 'number | string', default: "'100%'" },
      { name: 'height', description: t.propHeight, type: 'number', default: '200' },
      { name: 'padding', description: t.propPadding, type: 'number | [number, number, number, number]', default: '[16,16,24,32]' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
    ],
    [t],
  )

  const lineExtraProps = useMemo<PropDef[]>(
    () => [
      { name: 'markers', description: t.propMarkers, type: 'boolean', default: 'true' },
      { name: 'strokeWidth', description: t.propStrokeWidth, type: 'number', default: '2' },
    ],
    [t],
  )

  const barExtraProps = useMemo<PropDef[]>(
    () => [
      { name: 'groupGap', description: t.propGroupGap, type: 'number', default: '0.2' },
      { name: 'barGap', description: t.propBarGap, type: 'number', default: '0.1' },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox
        title={t.demoLineTitle}
        description={t.demoLineDesc}
        code={BasicLineSource}
      >
        <BasicLineChart />
      </DemoBox>

      <DemoBox
        title={t.demoBarTitle}
        description={t.demoBarDesc}
        code={BasicBarSource}
      >
        <BasicBarChart />
      </DemoBox>

      <DemoBox
        title={t.demoAreaTitle}
        description={t.demoAreaDesc}
        code={BasicAreaSource}
      >
        <BasicAreaChart />
      </DemoBox>

      <DemoBox
        title={t.demoPieTitle}
        description={t.demoPieDesc}
        code={BasicPieSource}
      >
        <BasicPieChart />
      </DemoBox>

      <PropsTable title={t.tableCommonApi} data={baseProps} />
      <PropsTable title={t.tableLineExtras} data={lineExtraProps} />
      <PropsTable title={t.tableBarExtras} data={barExtraProps} />
    </ComponentDoc>
  )
}
