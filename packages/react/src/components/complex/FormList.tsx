import React, { useState, useCallback, useMemo, useRef } from 'react'
import { useFormContext } from './FormContext'
import { useWatch } from '../../hooks/useWatch'
import type { FormListOperation } from '@skygraph/core'

let listUid = 0
function genKey(): string {
  return `fl_${++listUid}`
}

export interface FormListField {
  key: string
  index: number
}

export interface FormListProps {
  name: string
  initialValue?: unknown[]
  draggable?: boolean
  children: (
    fields: FormListField[],
    operation: FormListOperation,
    meta: { errors: string[] },
  ) => React.ReactNode
}

export function FormList({ name, initialValue, draggable, children }: FormListProps) {
  const { core, form } = useFormContext()

  React.useEffect(() => {
    if (initialValue && !Array.isArray(core.get(name))) {
      core.set(name, initialValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const listValue = useWatch(core, name)
  const items = Array.isArray(listValue) ? listValue : []

  const [keys, setKeys] = useState<string[]>(() => items.map(() => genKey()))

  React.useEffect(() => {
    setKeys((prev) => {
      if (prev.length === items.length) return prev
      if (items.length > prev.length) {
        return [...prev, ...Array.from({ length: items.length - prev.length }, () => genKey())]
      }
      return prev.slice(0, items.length)
    })
  }, [items.length])

  const fields = useMemo(
    () => keys.slice(0, items.length).map((key, index) => ({ key, index })),
    [keys, items.length],
  )

  const add = useCallback(
    (defaultValue?: unknown, insertIndex?: number) => {
      form.listAdd(name, defaultValue, insertIndex)
      setKeys((prev) => {
        const k = genKey()
        if (insertIndex !== undefined && insertIndex >= 0 && insertIndex <= prev.length) {
          const next = [...prev]
          next.splice(insertIndex, 0, k)
          return next
        }
        return [...prev, k]
      })
    },
    [form, name],
  )

  const remove = useCallback(
    (index: number | number[]) => {
      form.listRemove(name, index)
      setKeys((prev) => {
        if (Array.isArray(index)) {
          const indices = new Set(index)
          return prev.filter((_, i) => !indices.has(i))
        }
        return prev.filter((_, i) => i !== index)
      })
    },
    [form, name],
  )

  const move = useCallback(
    (from: number, to: number) => {
      form.listMove(name, from, to)
      setKeys((prev) => {
        const next = [...prev]
        const [item] = next.splice(from, 1)
        next.splice(to, 0, item)
        return next
      })
    },
    [form, name],
  )

  const replace = useCallback(
    (values: unknown[]) => {
      form.listReplace(name, values)
      setKeys(values.map(() => genKey()))
    },
    [form, name],
  )

  const operation: FormListOperation = useMemo(
    () => ({ add, remove, move, replace }),
    [add, remove, move, replace],
  )

  const meta = useMemo(() => ({ errors: form.getFieldErrors(name) }), [form, name])

  // Drag reorder support
  const dragIdx = useRef<number>(-1)
  const dragOverIdx = useRef<number>(-1)

  if (!draggable) {
    return <>{children(fields, operation, meta)}</>
  }

  const dragFields = fields.map((f) => ({
    ...f,
    dragProps: {
      draggable: true,
      onDragStart: () => {
        dragIdx.current = f.index
      },
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault()
        dragOverIdx.current = f.index
      },
      onDrop: () => {
        if (dragIdx.current !== -1 && dragOverIdx.current !== -1 && dragIdx.current !== dragOverIdx.current) {
          move(dragIdx.current, dragOverIdx.current)
        }
        dragIdx.current = -1
        dragOverIdx.current = -1
      },
      onDragEnd: () => {
        dragIdx.current = -1
        dragOverIdx.current = -1
      },
    },
  }))

  return <>{children(dragFields, operation, meta)}</>
}
