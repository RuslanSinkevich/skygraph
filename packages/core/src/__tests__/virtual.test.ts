import { describe, it, expect } from 'vitest'
import { createVirtual } from '../engines/virtual/index'

describe('VirtualEngine', () => {
  describe('fixed height', () => {
    it('calculates total height', () => {
      const v = createVirtual({ itemCount: 100, itemHeight: 40 })
      expect(v.totalHeight).toBe(4000)
    })

    it('returns correct range for top of list', () => {
      const v = createVirtual({ itemCount: 1000, itemHeight: 40, overscan: 3 })
      const range = v.getRange(0, 400)

      expect(range.startIndex).toBe(0)
      expect(range.endIndex).toBe(12)
      expect(range.totalHeight).toBe(40000)
      expect(range.visibleItems.length).toBe(13)
    })

    it('returns correct range for middle of list', () => {
      const v = createVirtual({ itemCount: 1000, itemHeight: 40, overscan: 2 })
      const range = v.getRange(2000, 400)

      expect(range.startIndex).toBe(48)
      expect(range.endIndex).toBe(61)
    })

    it('returns correct range for bottom of list', () => {
      const v = createVirtual({ itemCount: 100, itemHeight: 40, overscan: 2 })
      const range = v.getRange(3600, 400)

      expect(range.endIndex).toBe(99)
    })

    it('handles empty list', () => {
      const v = createVirtual({ itemCount: 0, itemHeight: 40 })
      const range = v.getRange(0, 400)

      expect(range.startIndex).toBe(0)
      expect(range.endIndex).toBe(0)
      expect(range.visibleItems).toHaveLength(0)
      expect(range.totalHeight).toBe(0)
    })

    it('getItemOffset returns correct offset', () => {
      const v = createVirtual({ itemCount: 100, itemHeight: 50 })
      expect(v.getItemOffset(0)).toBe(0)
      expect(v.getItemOffset(10)).toBe(500)
    })

    it('getItemAtOffset finds correct index', () => {
      const v = createVirtual({ itemCount: 100, itemHeight: 50 })
      expect(v.getItemAtOffset(0)).toBe(0)
      expect(v.getItemAtOffset(250)).toBe(5)
      expect(v.getItemAtOffset(275)).toBe(5)
    })
  })

  describe('variable height', () => {
    const heights = [20, 40, 60, 30, 50, 25, 35, 45, 55, 65]

    it('calculates total height', () => {
      const v = createVirtual({
        itemCount: heights.length,
        itemHeight: (i) => heights[i],
      })
      expect(v.totalHeight).toBe(425)
    })

    it('returns correct item offsets', () => {
      const v = createVirtual({
        itemCount: heights.length,
        itemHeight: (i) => heights[i],
      })
      expect(v.getItemOffset(0)).toBe(0)
      expect(v.getItemOffset(1)).toBe(20)
      expect(v.getItemOffset(2)).toBe(60)
      expect(v.getItemOffset(3)).toBe(120)
    })

    it('getItemAtOffset with variable heights', () => {
      const v = createVirtual({
        itemCount: heights.length,
        itemHeight: (i) => heights[i],
      })
      expect(v.getItemAtOffset(0)).toBe(0)
      expect(v.getItemAtOffset(20)).toBe(1)
      expect(v.getItemAtOffset(59)).toBe(1)
      expect(v.getItemAtOffset(60)).toBe(2)
    })

    it('range with variable heights', () => {
      const v = createVirtual({
        itemCount: heights.length,
        itemHeight: (i) => heights[i],
        overscan: 1,
      })
      const range = v.getRange(60, 100)

      expect(range.startIndex).toBe(1)
      expect(range.visibleItems[0].index).toBeLessThanOrEqual(2)
    })
  })

  describe('scrollToIndex', () => {
    it('scrolls to start', () => {
      const v = createVirtual({ itemCount: 100, itemHeight: 40 })
      expect(v.scrollToIndex(25, 400, 'start')).toBe(1000)
    })

    it('scrolls to center', () => {
      const v = createVirtual({ itemCount: 100, itemHeight: 40 })
      const st = v.scrollToIndex(25, 400, 'center')
      expect(st).toBe(1000 - 200 + 20)
    })

    it('scrolls to end', () => {
      const v = createVirtual({ itemCount: 100, itemHeight: 40 })
      const st = v.scrollToIndex(25, 400, 'end')
      expect(st).toBe(1000 - 400 + 40)
    })

    it('clamps to 0 for small index', () => {
      const v = createVirtual({ itemCount: 100, itemHeight: 40 })
      expect(v.scrollToIndex(0, 400, 'end')).toBe(0)
    })
  })

  describe('dynamic updates', () => {
    it('setItemCount updates total', () => {
      const v = createVirtual({ itemCount: 50, itemHeight: 40 })
      expect(v.totalHeight).toBe(2000)

      v.setItemCount(100)
      expect(v.totalHeight).toBe(4000)
      expect(v.itemCount).toBe(100)
    })

    it('setItemHeight updates calculations', () => {
      const v = createVirtual({ itemCount: 10, itemHeight: 40 })
      expect(v.totalHeight).toBe(400)

      v.setItemHeight(60)
      expect(v.totalHeight).toBe(600)
    })
  })

  describe('performance', () => {
    it('handles 1M items with fixed height', () => {
      const v = createVirtual({ itemCount: 1_000_000, itemHeight: 30 })

      const start = performance.now()
      const range = v.getRange(15_000_000, 600)
      const elapsed = performance.now() - start

      expect(elapsed).toBeLessThan(5)
      expect(range.visibleItems.length).toBeGreaterThan(0)
      expect(range.totalHeight).toBe(30_000_000)
    })
  })
})
