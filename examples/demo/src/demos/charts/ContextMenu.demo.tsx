import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { BarChart, colorForSeries } from '@skygraph/react'
import { quarterlyMarkets, toCsv } from './_data'

/**
 * SkyGraph не предоставляет prop `onSeriesContextMenu` (chart остаётся
 * композабельным примитивом). Контекстное меню по сериям собирается на
 * уровне demo: рисуем свой "legend" с per-series chip и навешиваем на чип
 * `onContextMenu`. Действия меню оперируют локальным state — какие серии
 * скрыты, и копированием CSV в clipboard.
 */

const data = quarterlyMarkets()

interface MenuState {
  seriesId: string
  x: number
  y: number
}

const MENU_STYLE: CSSProperties = {
  position: 'fixed',
  zIndex: 1000,
  minWidth: 180,
  padding: 4,
  background: 'var(--sg-color-bg-default)',
  border: '1px solid var(--sg-color-border)',
  borderRadius: 6,
  boxShadow: 'var(--sg-shadow-2, 0 4px 12px rgba(0,0,0,0.12))',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}

const MENU_ITEM: CSSProperties = {
  padding: '6px 10px',
  borderRadius: 4,
  background: 'transparent',
  border: 'none',
  textAlign: 'left',
  fontSize: 13,
  color: 'var(--sg-color-text-primary)',
  cursor: 'pointer',
}

const CHIP_BASE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '4px 10px',
  borderRadius: 999,
  border: '1px solid var(--sg-color-border)',
  background: 'var(--sg-color-bg-elevated)',
  fontSize: 12,
  cursor: 'context-menu',
  userSelect: 'none',
}

export function ContextMenuChart() {
  const [hidden, setHidden] = useState<readonly string[]>([])
  const [menu, setMenu] = useState<MenuState | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!menu) return
    const close = () => setMenu(null)
    window.addEventListener('click', close)
    window.addEventListener('contextmenu', close, true)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close()
    })
    return () => {
      window.removeEventListener('click', close)
      window.removeEventListener('contextmenu', close, true)
    }
  }, [menu])

  const visibleSeries = useMemo(
    () => data.series.filter((s) => !hidden.includes(s.id)),
    [hidden],
  )

  const target = menu ? data.series.find((s) => s.id === menu.seriesId) : null

  const showToast = (text: string) => {
    setToast(text)
    window.setTimeout(() => setToast(null), 1800)
  }

  const handleHide = () => {
    if (!target) return
    setHidden((prev) => (prev.includes(target.id) ? prev : [...prev, target.id]))
    setMenu(null)
  }

  const handleShow = () => {
    if (!target) return
    setHidden((prev) => prev.filter((id) => id !== target.id))
    setMenu(null)
  }

  const handleCopyCsv = async () => {
    if (!target) return
    const csv = toCsv({
      categories: data.categories,
      series: [target],
    })
    try {
      await navigator.clipboard.writeText(csv)
      showToast(`Copied "${target.label}" CSV to clipboard`)
    } catch {
      showToast('Clipboard not available')
    }
    setMenu(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
          Right-click a series chip:
        </span>
        {data.series.map((s, idx) => {
          const isHidden = hidden.includes(s.id)
          return (
            <span
              key={s.id}
              role="button"
              tabIndex={0}
              onContextMenu={(e) => {
                e.preventDefault()
                setMenu({ seriesId: s.id, x: e.clientX, y: e.clientY })
              }}
              style={{
                ...CHIP_BASE,
                opacity: isHidden ? 0.45 : 1,
                textDecoration: isHidden ? 'line-through' : 'none',
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: colorForSeries(s, idx),
                }}
              />
              {s.label}
            </span>
          )
        })}
      </div>

      <BarChart
        categories={data.categories}
        series={visibleSeries}
        height={220}
        yAxis={{ gridLines: true }}
      />

      {toast && (
        <div
          style={{
            alignSelf: 'flex-start',
            padding: '4px 10px',
            background: 'var(--sg-color-success)',
            color: 'var(--sg-color-text-inverse)',
            borderRadius: 4,
            fontSize: 12,
          }}
        >
          {toast}
        </div>
      )}

      {menu && target && (
        <div style={{ ...MENU_STYLE, top: menu.y, left: menu.x }} role="menu">
          <div
            style={{
              padding: '4px 10px',
              fontSize: 11,
              color: 'var(--sg-color-text-secondary)',
            }}
          >
            {target.label}
          </div>
          {hidden.includes(target.id) ? (
            <button
              type="button"
              style={MENU_ITEM}
              onClick={handleShow}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--sg-color-bg-elevated)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Show series
            </button>
          ) : (
            <button
              type="button"
              style={MENU_ITEM}
              onClick={handleHide}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--sg-color-bg-elevated)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Hide series
            </button>
          )}
          <button
            type="button"
            style={MENU_ITEM}
            onClick={handleCopyCsv}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--sg-color-bg-elevated)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            Copy as CSV
          </button>
        </div>
      )}
    </div>
  )
}
