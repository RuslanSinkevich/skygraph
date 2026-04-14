export interface VirtualRange {
  startIndex: number
  endIndex: number
  offsetTop: number
  totalHeight: number
  visibleItems: VirtualItem[]
}

export interface VirtualItem {
  index: number
  offsetTop: number
  height: number
}

export interface VirtualEngineOptions {
  itemCount: number
  itemHeight: number | ((index: number) => number)
  overscan?: number
}

export interface VirtualEngine {
  readonly itemCount: number
  readonly totalHeight: number

  setItemCount(count: number): void
  setItemHeight(height: number | ((index: number) => number)): void

  getRange(scrollTop: number, viewportHeight: number): VirtualRange
  getItemOffset(index: number): number
  getItemAtOffset(offset: number): number
  scrollToIndex(index: number, viewportHeight: number, align?: 'start' | 'center' | 'end'): number
}

export function createVirtual(options: VirtualEngineOptions): VirtualEngine {
  let itemCount = options.itemCount
  let itemHeight = options.itemHeight
  const overscan = options.overscan ?? 5

  let cachedOffsets: number[] | null = null
  let cachedTotalHeight: number | null = null

  function isFixedHeight(): boolean {
    return typeof itemHeight === 'number'
  }

  function getHeight(index: number): number {
    return typeof itemHeight === 'number' ? itemHeight : itemHeight(index)
  }

  function invalidateCache() {
    cachedOffsets = null
    cachedTotalHeight = null
  }

  function ensureOffsets(): number[] {
    if (cachedOffsets && cachedOffsets.length === itemCount) return cachedOffsets

    const offsets = new Array<number>(itemCount)
    let acc = 0
    for (let i = 0; i < itemCount; i++) {
      offsets[i] = acc
      acc += getHeight(i)
    }
    cachedOffsets = offsets
    cachedTotalHeight = acc
    return offsets
  }

  function getTotalHeight(): number {
    if (isFixedHeight()) {
      return itemCount * (itemHeight as number)
    }
    ensureOffsets()
    return cachedTotalHeight!
  }

  function getItemOffset(index: number): number {
    if (index < 0 || index >= itemCount) return 0
    if (isFixedHeight()) {
      return index * (itemHeight as number)
    }
    return ensureOffsets()[index]
  }

  function getItemAtOffset(offset: number): number {
    if (itemCount === 0) return 0

    if (isFixedHeight()) {
      const h = itemHeight as number
      return Math.min(Math.floor(offset / h), itemCount - 1)
    }

    const offsets = ensureOffsets()
    let lo = 0
    let hi = itemCount - 1
    while (lo < hi) {
      const mid = (lo + hi + 1) >>> 1
      if (offsets[mid] <= offset) {
        lo = mid
      } else {
        hi = mid - 1
      }
    }
    return lo
  }

  function getRange(scrollTop: number, viewportHeight: number): VirtualRange {
    if (itemCount === 0) {
      return { startIndex: 0, endIndex: 0, offsetTop: 0, totalHeight: 0, visibleItems: [] }
    }

    const total = getTotalHeight()
    const rawStart = getItemAtOffset(scrollTop)
    const startIndex = Math.max(0, rawStart - overscan)

    let endIndex = rawStart
    let accHeight = getItemOffset(rawStart) + getHeight(rawStart)
    const bottomEdge = scrollTop + viewportHeight

    while (endIndex < itemCount - 1 && accHeight < bottomEdge) {
      endIndex++
      accHeight += getHeight(endIndex)
    }
    endIndex = Math.min(itemCount - 1, endIndex + overscan)

    const visibleItems: VirtualItem[] = []
    for (let i = startIndex; i <= endIndex; i++) {
      visibleItems.push({
        index: i,
        offsetTop: getItemOffset(i),
        height: getHeight(i),
      })
    }

    return {
      startIndex,
      endIndex,
      offsetTop: getItemOffset(startIndex),
      totalHeight: total,
      visibleItems,
    }
  }

  function scrollToIndex(
    index: number,
    viewportHeight: number,
    align: 'start' | 'center' | 'end' = 'start',
  ): number {
    const clamped = Math.max(0, Math.min(index, itemCount - 1))
    const offset = getItemOffset(clamped)
    const h = getHeight(clamped)

    switch (align) {
      case 'center':
        return Math.max(0, offset - viewportHeight / 2 + h / 2)
      case 'end':
        return Math.max(0, offset - viewportHeight + h)
      default:
        return offset
    }
  }

  return {
    get itemCount() {
      return itemCount
    },
    get totalHeight() {
      return getTotalHeight()
    },
    setItemCount(count: number) {
      itemCount = count
      invalidateCache()
    },
    setItemHeight(height: number | ((index: number) => number)) {
      itemHeight = height
      invalidateCache()
    },
    getRange,
    getItemOffset,
    getItemAtOffset,
    scrollToIndex,
  }
}
