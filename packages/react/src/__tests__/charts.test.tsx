import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  DEFAULT_PALETTE,
  colorForSeries,
} from '../index'
import type { ChartSeries } from '../index'

describe('LineChart', () => {
  it('renders one polyline per series (as multiple <line> segments)', () => {
    const { container } = render(
      <LineChart
        categories={['a', 'b', 'c']}
        series={[
          { id: 's1', label: 'A', values: [1, 2, 3] },
          { id: 's2', label: 'B', values: [3, 2, 1] },
        ]}
      />,
    )
    const lines = container.querySelectorAll('line')
    // 2 series × 2 segments each = 4 lines.
    expect(lines.length).toBe(4)
  })

  it('skips segments where values are null', () => {
    const { container } = render(
      <LineChart
        categories={['a', 'b', 'c', 'd']}
        series={[{ id: 's', label: 'S', values: [1, null, 2, 3] }]}
      />,
    )
    const lines = container.querySelectorAll('line')
    // Gaps split the polyline. 1 → null breaks; 2 → 3 is a single segment.
    expect(lines.length).toBe(1)
  })

  it('renders markers at each non-null point', () => {
    const { container } = render(
      <LineChart
        categories={['a', 'b', 'c']}
        series={[{ id: 's', label: 'S', values: [1, 2, 3] }]}
        markers
      />,
    )
    const circles = container.querySelectorAll('circle')
    expect(circles.length).toBe(3)
  })

  it('hides markers when markers=false', () => {
    const { container } = render(
      <LineChart
        categories={['a', 'b']}
        series={[{ id: 's', label: 'S', values: [1, 2] }]}
        markers={false}
      />,
    )
    expect(container.querySelectorAll('circle').length).toBe(0)
  })

  it('uses sg-chart class by default and drops it on unstyled', () => {
    const { container, rerender } = render(
      <LineChart
        categories={['a']}
        series={[{ id: 's', label: 'S', values: [1] }]}
      />,
    )
    expect(container.querySelector('.sg-chart')).not.toBeNull()
    rerender(
      <LineChart
        categories={['a']}
        series={[{ id: 's', label: 'S', values: [1] }]}
        unstyled
      />,
    )
    expect(container.querySelector('.sg-chart')).toBeNull()
  })

  it('survives empty categories without throwing', () => {
    expect(() =>
      render(<LineChart categories={[]} series={[]} />),
    ).not.toThrow()
  })
})

describe('BarChart', () => {
  it('renders one rect per (series, category) cell', () => {
    const { container } = render(
      <BarChart
        categories={['Q1', 'Q2', 'Q3']}
        series={[
          { id: 'rev', label: 'Revenue', values: [10, 20, 30] },
          { id: 'cost', label: 'Cost', values: [5, 10, 15] },
        ]}
      />,
    )
    // 2 series × 3 categories = 6 rects (plus 1 baseline line).
    const rects = container.querySelectorAll('rect')
    expect(rects.length).toBe(6)
  })

  it('skips bars where the value is null', () => {
    const { container } = render(
      <BarChart
        categories={['a', 'b', 'c']}
        series={[{ id: 's', label: 'S', values: [10, null, 20] }]}
      />,
    )
    expect(container.querySelectorAll('rect').length).toBe(2)
  })

  it('renders the zero baseline line', () => {
    const { container } = render(
      <BarChart
        categories={['a']}
        series={[{ id: 's', label: 'S', values: [10] }]}
      />,
    )
    const baseline = container.querySelector('line')
    expect(baseline).not.toBeNull()
  })

  it('handles negative values (rests on zero baseline)', () => {
    const { container } = render(
      <BarChart
        categories={['a', 'b']}
        series={[{ id: 's', label: 'S', values: [-5, 10] }]}
      />,
    )
    expect(container.querySelectorAll('rect').length).toBe(2)
  })
})

describe('AreaChart', () => {
  it('renders an area path + a top line per series', () => {
    const { container } = render(
      <AreaChart
        categories={['a', 'b', 'c']}
        series={[
          { id: 's1', label: 'A', values: [1, 2, 3] },
          { id: 's2', label: 'B', values: [3, 2, 1] },
        ]}
      />,
    )
    // 2 paths per series (area fill + top stroke) → 4 paths total.
    expect(container.querySelectorAll('path').length).toBe(4)
  })

  it('stacked mode produces cumulative areas', () => {
    const { container } = render(
      <AreaChart
        categories={['a', 'b']}
        series={[
          { id: 's1', label: 'A', values: [1, 2] },
          { id: 's2', label: 'B', values: [1, 1] },
        ]}
        stacked
      />,
    )
    // Same path count (2 series × 2 paths) — stacking is reflected in y-coords.
    expect(container.querySelectorAll('path').length).toBe(4)
  })

  it('handles empty series gracefully', () => {
    expect(() =>
      render(<AreaChart categories={['a']} series={[]} />),
    ).not.toThrow()
  })
})

describe('PieChart', () => {
  it('renders one path per non-zero slice', () => {
    const { container } = render(
      <PieChart
        data={[
          { id: 'a', label: 'A', value: 30 },
          { id: 'b', label: 'B', value: 50 },
          { id: 'c', label: 'C', value: 20 },
        ]}
      />,
    )
    expect(container.querySelectorAll('path').length).toBe(3)
  })

  it('skips zero-value slices', () => {
    const { container } = render(
      <PieChart
        data={[
          { id: 'a', label: 'A', value: 100 },
          { id: 'b', label: 'B', value: 0 },
        ]}
      />,
    )
    expect(container.querySelectorAll('path').length).toBe(1)
  })

  it('clamps negative values to 0', () => {
    const { container } = render(
      <PieChart
        data={[
          { id: 'a', label: 'A', value: 50 },
          { id: 'b', label: 'B', value: -10 },
          { id: 'c', label: 'C', value: 50 },
        ]}
      />,
    )
    expect(container.querySelectorAll('path').length).toBe(2)
  })

  it('renders an empty SVG when total is zero', () => {
    const { container } = render(
      <PieChart
        data={[
          { id: 'a', label: 'A', value: 0 },
          { id: 'b', label: 'B', value: 0 },
        ]}
      />,
    )
    expect(container.querySelectorAll('path').length).toBe(0)
  })

  it('donut mode (innerRadius > 0) builds the path with two arcs', () => {
    const { container } = render(
      <PieChart
        innerRadius={30}
        outerRadius={60}
        data={[
          { id: 'a', label: 'A', value: 50 },
          { id: 'b', label: 'B', value: 50 },
        ]}
      />,
    )
    const paths = container.querySelectorAll('path')
    expect(paths.length).toBe(2)
    // Donut path uses two `A ... A ...` arcs.
    expect(paths[0]!.getAttribute('d')).toMatch(/A .* A /)
  })

  it('uses explicit slice color over palette', () => {
    const { container } = render(
      <PieChart
        data={[{ id: 'x', label: 'X', value: 100, color: '#ff0000' }]}
      />,
    )
    expect(container.querySelector('path')!.getAttribute('fill')).toBe('#ff0000')
  })
})

describe('colorForSeries / palette', () => {
  it('uses the explicit color when provided on the series', () => {
    const s: ChartSeries = { id: 'x', label: 'X', values: [1], color: '#ff0000' }
    expect(colorForSeries(s, 0)).toBe('#ff0000')
  })

  it('falls back to the default palette by index', () => {
    const s: ChartSeries = { id: 'x', label: 'X', values: [1] }
    expect(colorForSeries(s, 0)).toBe(DEFAULT_PALETTE[0])
    expect(colorForSeries(s, 3)).toBe(DEFAULT_PALETTE[3])
  })

  it('wraps around the palette for high indices', () => {
    const s: ChartSeries = { id: 'x', label: 'X', values: [1] }
    expect(colorForSeries(s, DEFAULT_PALETTE.length)).toBe(DEFAULT_PALETTE[0])
  })
})
