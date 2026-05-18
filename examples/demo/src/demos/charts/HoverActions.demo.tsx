import { useRef, useState, type CSSProperties } from 'react'
import { LineChart, type ChartRef } from '@skygraph/react'
import { monthlyRevenue } from './_data'

/**
 * Renders a small toolbar on the top-right of the chart that fades in on hover.
 * SkyGraph не экспонирует `actions` prop по дизайну (charts остаются
 * композабельными примитивами) — toolbar собирается из обычного DOM
 * и `ref.print()` плюс ручной экспорт SVG → PNG через `<canvas>`.
 */

const WRAPPER: CSSProperties = {
  position: 'relative',
  border: '1px solid var(--sg-color-border)',
  borderRadius: 8,
  padding: 12,
  background: 'var(--sg-color-bg-elevated)',
}

const TOOLBAR_BASE: CSSProperties = {
  position: 'absolute',
  top: 8,
  right: 8,
  display: 'flex',
  gap: 4,
  padding: 4,
  borderRadius: 6,
  background: 'var(--sg-color-bg-default)',
  border: '1px solid var(--sg-color-border)',
  boxShadow: 'var(--sg-shadow-1, 0 1px 4px rgba(0,0,0,0.08))',
  transition: 'opacity 120ms ease',
}

const ACTION_BTN: CSSProperties = {
  padding: '4px 10px',
  borderRadius: 4,
  border: '1px solid var(--sg-color-border)',
  background: 'var(--sg-color-bg-elevated)',
  color: 'var(--sg-color-text)',
  fontSize: 12,
  cursor: 'pointer',
}

async function downloadSvgAsPng(svg: SVGSVGElement | null, fileName: string) {
  if (!svg) return
  const xml = new XMLSerializer().serializeToString(svg)
  const blob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  try {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('image load failed'))
      img.src = url
    })
    const rect = svg.getBoundingClientRect()
    const w = Math.max(1, Math.floor(rect.width || 600))
    const h = Math.max(1, Math.floor(rect.height || 220))
    const canvas = document.createElement('canvas')
    canvas.width = w * 2 // 2× retina
    canvas.height = h * 2
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(2, 2)
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, w, h)
    ctx.drawImage(img, 0, 0, w, h)
    const pngUrl = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = pngUrl
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } finally {
    URL.revokeObjectURL(url)
  }
}

function ChartWithDefaultToolbar() {
  const ref = useRef<ChartRef | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [hover, setHover] = useState(false)
  const data = monthlyRevenue(7)

  return (
    <div
      ref={wrapperRef}
      style={WRAPPER}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{ ...TOOLBAR_BASE, opacity: hover ? 1 : 0, pointerEvents: hover ? 'auto' : 'none' }}
      >
        <button
          type="button"
          style={ACTION_BTN}
          onClick={() => ref.current?.print()}
          title="Print chart"
        >
          🖨 Print
        </button>
        <button
          type="button"
          style={ACTION_BTN}
          onClick={() => {
            const svg = wrapperRef.current?.querySelector('svg') ?? null
            void downloadSvgAsPng(svg, 'chart.png')
          }}
          title="Download as PNG"
        >
          ⬇ PNG
        </button>
      </div>
      <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)', marginBottom: 6 }}>
        Default toolbar — Print / DownloadPng (hover the chart)
      </div>
      <LineChart
        ref={ref}
        categories={data.categories}
        series={data.series}
        height={220}
        printable={{ fileName: 'monthly-revenue' }}
        crosshair
        xAxis={{ tickCount: 6 }}
        yAxis={{ tickCount: 5, gridLines: true }}
      />
    </div>
  )
}

function ChartWithCustomActions() {
  const [seed, setSeed] = useState(7)
  const data = monthlyRevenue(seed)
  return (
    <div style={WRAPPER}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
        }}
      >
        <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
          Custom actions — your own buttons composed around the chart
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button type="button" style={ACTION_BTN} onClick={() => setSeed((s) => s + 1)}>
            ↻ Refresh
          </button>
          <button type="button" style={ACTION_BTN} onClick={() => setSeed(7)}>
            ↺ Reset
          </button>
        </div>
      </div>
      <LineChart
        categories={data.categories}
        series={data.series}
        height={220}
        crosshair
        xAxis={{ tickCount: 6 }}
        yAxis={{ tickCount: 5, gridLines: true }}
      />
    </div>
  )
}

export function HoverActionsChart() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
        gap: 16,
      }}
    >
      <ChartWithDefaultToolbar />
      <ChartWithCustomActions />
    </div>
  )
}
