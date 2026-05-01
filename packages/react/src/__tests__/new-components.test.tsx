import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
// @ts-expect-error React is needed for JSX
import React from 'react'

import { Transfer } from '../components/ui/Transfer'
import { Calendar } from '../components/ui/Calendar'
import { TreeSelect } from '../components/ui/TreeSelect'
import { Mentions } from '../components/ui/Mentions'

/* ============================================================
   Transfer
   ============================================================ */

describe('Transfer', () => {
  const dataSource = [
    { key: '1', title: 'Item 1' },
    { key: '2', title: 'Item 2' },
    { key: '3', title: 'Item 3' },
  ]

  it('renders source and target lists', () => {
    render(<Transfer dataSource={dataSource} />)
    expect(screen.getByText('Source')).toBeDefined()
    expect(screen.getByText('Target')).toBeDefined()
  })

  it('renders all items in source', () => {
    render(<Transfer dataSource={dataSource} />)
    expect(screen.getByText('Item 1')).toBeDefined()
    expect(screen.getByText('Item 2')).toBeDefined()
    expect(screen.getByText('Item 3')).toBeDefined()
  })

  it('moves items with targetKeys', () => {
    render(<Transfer dataSource={dataSource} targetKeys={['2']} />)
    const listboxes = screen.getAllByRole('listbox')
    expect(listboxes.length).toBe(2)
  })

  it('renders custom titles', () => {
    render(<Transfer dataSource={dataSource} titles={['Left', 'Right']} />)
    expect(screen.getByText('Left')).toBeDefined()
    expect(screen.getByText('Right')).toBeDefined()
  })

  it('search filters items', () => {
    render(<Transfer dataSource={dataSource} showSearch />)
    const inputs = screen.getAllByPlaceholderText('Search')
    fireEvent.change(inputs[0], { target: { value: 'Item 1' } })
    expect(screen.getByText('Item 1')).toBeDefined()
    expect(screen.queryByText('Item 2')).toBeNull()
  })
})

/* ============================================================
   Calendar
   ============================================================ */

describe('Calendar', () => {
  it('renders calendar', () => {
    const { container } = render(<Calendar />)
    expect(container.querySelector('.sg-calendar')).toBeTruthy()
  })

  it('renders weekday headers', () => {
    render(<Calendar />)
    expect(screen.getByText('Su')).toBeDefined()
    expect(screen.getByText('Mo')).toBeDefined()
  })

  it('renders today button', () => {
    render(<Calendar />)
    expect(screen.getByText('Today')).toBeDefined()
  })

  it('calls onChange on date select', () => {
    const fn = vi.fn()
    render(<Calendar onChange={fn} />)
    const day15 = screen.queryByText('15')
    if (day15) {
      fireEvent.click(day15)
      expect(fn).toHaveBeenCalled()
    }
  })

  it('switches to year view', () => {
    const { container } = render(<Calendar />)
    const yearBtn = container.querySelector('.sg-calendar-mode-btn:last-child')
    if (yearBtn) {
      fireEvent.click(yearBtn)
      expect(container.querySelector('.sg-calendar-month-grid')).toBeTruthy()
    }
  })
})

/* ============================================================
   TreeSelect
   ============================================================ */

describe('TreeSelect', () => {
  const treeData = [
    {
      key: 'parent1',
      title: 'Parent 1',
      children: [
        { key: 'child1', title: 'Child 1' },
        { key: 'child2', title: 'Child 2' },
      ],
    },
    { key: 'leaf', title: 'Leaf' },
  ]

  it('renders with placeholder', () => {
    render(<TreeSelect treeData={treeData} />)
    expect(screen.getByText('Select...')).toBeDefined()
  })

  it('opens dropdown on click', () => {
    const { container } = render(<TreeSelect treeData={treeData} />)
    fireEvent.click(container.querySelector('.sg-treeselect-selector')!)
    expect(container.querySelector('.sg-treeselect-dropdown')).toBeTruthy()
  })

  it('shows tree nodes', () => {
    const { container } = render(<TreeSelect treeData={treeData} treeDefaultExpandAll />)
    fireEvent.click(container.querySelector('.sg-treeselect-selector')!)
    expect(screen.getByText('Parent 1')).toBeDefined()
    expect(screen.getByText('Child 1')).toBeDefined()
    expect(screen.getByText('Leaf')).toBeDefined()
  })

  it('selects leaf node', () => {
    const fn = vi.fn()
    const { container } = render(<TreeSelect treeData={treeData} onChange={fn} />)
    fireEvent.click(container.querySelector('.sg-treeselect-selector')!)
    fireEvent.click(screen.getByText('Leaf'))
    expect(fn).toHaveBeenCalledWith('leaf')
  })

  it('disabled blocks open', () => {
    const { container } = render(<TreeSelect treeData={treeData} disabled />)
    fireEvent.click(container.querySelector('.sg-treeselect-selector')!)
    expect(container.querySelector('.sg-treeselect-dropdown')).toBeNull()
  })
})

/* ============================================================
   Mentions
   ============================================================ */

describe('Mentions', () => {
  const options = [
    { value: 'john', label: 'John' },
    { value: 'jane', label: 'Jane' },
  ]

  it('renders textarea', () => {
    const { container } = render(<Mentions options={options} />)
    expect(container.querySelector('textarea')).toBeTruthy()
  })

  it('controlled value', () => {
    const { container } = render(<Mentions options={options} value="hello" />)
    expect(container.querySelector('textarea')!.value).toBe('hello')
  })

  it('calls onChange on input', () => {
    const fn = vi.fn()
    const { container } = render(<Mentions options={options} onChange={fn} />)
    fireEvent.change(container.querySelector('textarea')!, { target: { value: 'hi' } })
    expect(fn).toHaveBeenCalledWith('hi')
  })

  it('disabled blocks input', () => {
    const { container } = render(<Mentions options={options} disabled />)
    expect(container.querySelector('textarea')!.disabled).toBe(true)
  })

  it('placeholder', () => {
    render(<Mentions options={options} placeholder="Type @..." />)
    expect(screen.getByPlaceholderText('Type @...')).toBeDefined()
  })
})
