import React, { useEffect, useLayoutEffect, useMemo, useReducer, useState } from 'react'
import { createVirtual } from '@skygraph/core'
import type { VirtualEngine } from '@skygraph/core'
import { TableBody, type BodyProps } from './TableBody'
import type { FlatRow } from './types'

/**
 * Сигнатура функций оценки/измерения высоты строки. Принимает данные строки
 * + её id (как в `TableEngine.getEstimatedRowHeight`).
 */
export type VirtualRowHeightFn = (row: Record<string, unknown>, id: string) => number

interface VirtualBodyProps extends BodyProps {
  /**
   * Высота строки. Число — фиксированный фоллбэк (быстрый путь). Функция —
   * включает динамические высоты, значение становится эстимейтом до
   * первого измерения через ResizeObserver.
   */
  rowHeight: number | VirtualRowHeightFn
  /**
   * Дополнительный эстимейт высоты, разрешает динамические высоты даже
   * при числовом `rowHeight`. Имеет приоритет над `rowHeight`-фоллбэком
   * при выборе размера до измерения.
   */
  estimateRowHeight?: VirtualRowHeightFn
  /** Сколько лишних строк рендерить выше / ниже viewport. */
  overscan: number
  /** Ref на родительский `.sg-table-scroll`, чей scroll-контекст мы наблюдаем. */
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

const DEFAULT_ROW_HEIGHT = 40

/**
 * Резолвит эстимейт-функцию для `createVirtual`. Использует измеренную /
 * уже виденную ранее высоту, если она прокидывается извне; иначе вызывает
 * пользовательский callback.
 */
function buildEstimate(
  rowHeight: number | VirtualRowHeightFn,
  estimate: VirtualRowHeightFn | undefined,
  flatRows: FlatRow[],
): number | ((index: number) => number) {
  if (typeof rowHeight === 'number' && estimate == null) {
    return rowHeight
  }
  const fallback = typeof rowHeight === 'number' ? rowHeight : DEFAULT_ROW_HEIGHT
  const fn: VirtualRowHeightFn | undefined =
    estimate ?? (typeof rowHeight === 'function' ? rowHeight : undefined)
  if (!fn) return fallback
  return (index: number) => {
    const row = flatRows[index]
    if (!row) return fallback
    const v = fn(row.data, row.id)
    return Number.isFinite(v) && v >= 0 ? v : fallback
  }
}

/**
 * Виртуализированное тело таблицы. Живёт в той же CSS Grid, что и `TableHeader`,
 * поэтому ширины колонок остаются согласованными автоматически. Скролл
 * наблюдается на родительском `.sg-table-scroll` — мы не вводим вложенный
 * scrollbox.
 *
 * **Динамические высоты:** если `rowHeight` — функция, или передан
 * `estimateRowHeight`, движок переходит на путь с измерениями. Каждая
 * отрендеренная строка получает `data-sg-virtual-row-index` и наблюдается
 * через `ResizeObserver`. Префикс-сумма offsets пересобирается лениво при
 * первом запросе после `setMeasuredHeight`.
 */
export function VirtualTableBody(props: VirtualBodyProps) {
  const {
    rowHeight,
    estimateRowHeight,
    overscan,
    scrollContainerRef,
    flatRows,
    totalCols,
    ...bodyProps
  } = props

  const isDynamic = typeof rowHeight === 'function' || estimateRowHeight != null

  // VirtualEngine создаётся один раз и переиспользуется. setItemCount /
  // setItemHeight применяются в эффектах.
  const virtual = useMemo<VirtualEngine>(
    () =>
      createVirtual({
        itemCount: flatRows.length,
        itemHeight: buildEstimate(rowHeight, estimateRowHeight, flatRows),
        overscan,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [, forceUpdate] = useReducer((n: number) => n + 1, 0)

  // Подписка на инвалидации движка — единственный путь, по которому новый
  // measurement вызывает перерисовку. Эффект подключается один раз.
  useEffect(() => virtual.subscribe(() => forceUpdate()), [virtual])

  useEffect(() => {
    virtual.setItemCount(flatRows.length)
    virtual.setItemHeight(buildEstimate(rowHeight, estimateRowHeight, flatRows))
  }, [virtual, flatRows, rowHeight, estimateRowHeight])

  const [scrollTop, setScrollTop] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    setViewportHeight(el.clientHeight)
    setScrollTop(el.scrollTop)

    const onScroll = () => setScrollTop(el.scrollTop)
    el.addEventListener('scroll', onScroll, { passive: true })

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => setViewportHeight(el.clientHeight))
      ro.observe(el)
    }

    return () => {
      el.removeEventListener('scroll', onScroll)
      ro?.disconnect()
    }
  }, [scrollContainerRef])

  const range = virtual.getRange(scrollTop, viewportHeight || 400)
  const visibleRows = flatRows.slice(range.startIndex, range.endIndex + 1)
  const totalHeight = range.totalHeight
  const topPad = range.offsetTop
  const visibleSize = visibleRows.reduce(
    (sum, _row, idx) => sum + virtual.getItemSize(range.startIndex + idx),
    0,
  )
  const bottomPad = Math.max(0, totalHeight - topPad - visibleSize)

  // ResizeObserver на первом дочернем элементе каждой строки. Так как row-div
  // использует `display: contents`, у него нет собственной геометрии — мы
  // измеряем первую ячейку, чьи размеры в CSS Grid = размерам всей строки.
  useLayoutEffect(() => {
    if (!isDynamic) return
    const grid = scrollContainerRef.current?.querySelector('.sg-table-grid')
    if (!grid) return
    if (typeof ResizeObserver === 'undefined') {
      // jsdom / старые runtime — фоллбэк на одноразовое измерение через
      // getBoundingClientRect, чтобы хотя бы initial-render отчитался.
      const rowEls = grid.querySelectorAll<HTMLElement>('[data-sg-virtual-row-index]')
      rowEls.forEach((rowEl) => {
        const idx = Number(rowEl.getAttribute('data-sg-virtual-row-index'))
        const firstCell = rowEl.firstElementChild as HTMLElement | null
        if (firstCell) {
          virtual.setMeasuredHeight(idx, firstCell.getBoundingClientRect().height)
        }
      })
      return
    }

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement
        const rowEl = target.closest('[data-sg-virtual-row-index]') as HTMLElement | null
        if (!rowEl) continue
        const idx = Number(rowEl.getAttribute('data-sg-virtual-row-index'))
        const h = entry.contentRect.height
        virtual.setMeasuredHeight(idx, h)
      }
    })

    const rowEls = grid.querySelectorAll<HTMLElement>('[data-sg-virtual-row-index]')
    rowEls.forEach((rowEl) => {
      const firstCell = rowEl.firstElementChild as HTMLElement | null
      if (!firstCell) return
      const idx = Number(rowEl.getAttribute('data-sg-virtual-row-index'))
      virtual.setMeasuredHeight(idx, firstCell.getBoundingClientRect().height)
      ro.observe(firstCell)
    })

    return () => ro.disconnect()
  }, [isDynamic, virtual, scrollContainerRef, visibleRows])

  const spacerColumn = `1 / ${totalCols + 1}`

  return (
    <>
      {topPad > 0 && (
        <div
          style={{ gridColumn: spacerColumn, height: topPad }}
          role="presentation"
          aria-hidden
        />
      )}
      <TableBody
        {...bodyProps}
        flatRows={visibleRows}
        totalCols={totalCols}
        rowIndexOffset={range.startIndex}
      />
      {bottomPad > 0 && (
        <div
          style={{ gridColumn: spacerColumn, height: bottomPad }}
          role="presentation"
          aria-hidden
        />
      )}
    </>
  )
}
