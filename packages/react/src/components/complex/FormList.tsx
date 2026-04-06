import React from 'react'
import { useFormContext } from './FormContext'
import { useWatch } from '../../hooks/useWatch'
import type { FormListOperation } from '@skygraph/core'

export interface FormListProps {
  name: string
  children: (
    fields: Array<{ key: number; index: number }>,
    operation: FormListOperation
  ) => React.ReactNode
}

export function FormList({ name, children }: FormListProps) {
  const { core, form } = useFormContext()
  const listValue = useWatch(core, name)
  const items = Array.isArray(listValue) ? listValue : []

  const fields = items.map((_, index) => ({
    key: index,
    index,
  }))

  const operation: FormListOperation = {
    add(defaultValue?: unknown) {
      form.listAdd(name, defaultValue)
    },
    remove(index: number) {
      form.listRemove(name, index)
    },
    move(from: number, to: number) {
      form.listMove(name, from, to)
    },
  }

  return <>{children(fields, operation)}</>
}
