import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Dashboard } from '../index'
import type { DashboardWidget } from '../index'

const sampleWidgets: DashboardWidget[] = [
  { id: 'kpi', title: 'Revenue', x: 1, y: 1, w: 4, h: 2, children: <strong>$120k</strong> },
  { id: 'chart', title: 'Traffic', x: 5, y: 1, w: 8, h: 3, children: <span>chart</span> },
  { id: 'feed', x: 1, y: 3, w: 4, h: 4, children: <span>feed</span> },
]

describe('Dashboard', () => {
  it('renders one wrapper with sg-dashboard class', () => {
    const { container } = render(<Dashboard widgets={sampleWidgets} />)
    expect(container.querySelector('.sg-dashboard')).not.toBeNull()
  })

  it('renders one widget div per entry with stable data-widget-id', () => {
    const { container } = render(<Dashboard widgets={sampleWidgets} />)
    const items = container.querySelectorAll('[data-widget-id]')
    expect(items.length).toBe(3)
    const ids = Array.from(items).map((n) => n.getAttribute('data-widget-id'))
    expect(ids).toEqual(['kpi', 'chart', 'feed'])
  })

  it('uses gridColumn / gridRow inline styles per widget', () => {
    const { container } = render(<Dashboard widgets={sampleWidgets} />)
    const kpi = container.querySelector('[data-widget-id="kpi"]') as HTMLElement
    expect(kpi.style.gridColumn).toBe('1 / span 4')
    expect(kpi.style.gridRow).toBe('1 / span 2')
  })

  it('omits the header when title is undefined', () => {
    const { container } = render(<Dashboard widgets={sampleWidgets} />)
    const feed = container.querySelector('[data-widget-id="feed"]') as HTMLElement
    expect(feed.querySelector('.sg-dashboard-widget-header')).toBeNull()
  })

  it('renders the header when title is set', () => {
    const { container, getByText } = render(<Dashboard widgets={sampleWidgets} />)
    expect(getByText('Revenue')).toBeDefined()
    expect(getByText('Traffic')).toBeDefined()
    const kpi = container.querySelector('[data-widget-id="kpi"]') as HTMLElement
    expect(kpi.querySelector('.sg-dashboard-widget-header')).not.toBeNull()
  })

  it('uses given columns / rowHeight / gap on the grid', () => {
    const { container } = render(
      <Dashboard widgets={sampleWidgets} columns={6} rowHeight={120} gap={24} />,
    )
    const root = container.querySelector('.sg-dashboard') as HTMLElement
    expect(root.style.gridTemplateColumns).toBe('repeat(6, 1fr)')
    expect(root.style.gridAutoRows).toBe('120px')
    expect(root.style.gap).toBe('24px')
  })

  it('drops sg-dashboard classes when unstyled', () => {
    const { container } = render(<Dashboard widgets={sampleWidgets} unstyled />)
    expect(container.querySelector('.sg-dashboard')).toBeNull()
    expect(container.querySelector('.sg-dashboard-widget')).toBeNull()
  })

  it('render callback can replace children', () => {
    const widgets: DashboardWidget[] = [
      { id: 'r', title: 'R', x: 1, y: 1, render: () => <div data-testid="from-render">via render</div> },
    ]
    const { container } = render(<Dashboard widgets={widgets} />)
    expect(container.querySelector('[data-testid="from-render"]')).not.toBeNull()
  })

  it('survives empty widgets', () => {
    expect(() => render(<Dashboard widgets={[]} />)).not.toThrow()
  })
})
