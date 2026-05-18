import { useState, type CSSProperties } from 'react'
import { BarChart, ChartLegend } from '@skygraph/react'
import { quarterlyMarkets } from './_data'

const data = quarterlyMarkets()

type Placement = 'top' | 'right' | 'bottom' | 'left'

const TILE: CSSProperties = {
  border: '1px solid var(--sg-color-border)',
  borderRadius: 8,
  padding: 12,
  background: 'var(--sg-color-bg-elevated)',
}

const LEGEND_VERTICAL: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
  marginTop: 0,
  minWidth: 80,
}

function Tile({ placement }: { placement: Placement }) {
  const direction: CSSProperties['flexDirection'] =
    placement === 'top'
      ? 'column'
      : placement === 'bottom'
        ? 'column-reverse'
        : placement === 'left'
          ? 'row-reverse'
          : 'row'

  const isVertical = placement === 'left' || placement === 'right'

  return (
    <div style={TILE}>
      <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)', marginBottom: 8 }}>
        legend = <code>{placement}</code>
      </div>
      <div style={{ display: 'flex', flexDirection: direction, gap: 12, alignItems: 'stretch' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <BarChart categories={data.categories} series={data.series} height={180} />
        </div>
        <ChartLegend series={data.series} style={isVertical ? LEGEND_VERTICAL : undefined} />
      </div>
    </div>
  )
}

export function WithLegendChart() {
  const [placement, setPlacement] = useState<Placement>('bottom')
  const placements: Placement[] = ['top', 'right', 'bottom', 'left']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {placements.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPlacement(p)}
            aria-pressed={placement === p}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid var(--sg-color-border)',
              background:
                placement === p ? 'var(--sg-color-primary)' : 'var(--sg-color-bg-elevated)',
              color: placement === p ? 'var(--sg-color-white)' : 'var(--sg-color-text)',
              cursor: 'pointer',
            }}
          >
            {p}
          </button>
        ))}
      </div>
      <Tile placement={placement} />
    </div>
  )
}
