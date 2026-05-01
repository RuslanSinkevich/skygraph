import { Form, Field, Input, Select, DatePicker, Button, InputNumber } from '@skygraph/react'
import type { Task } from './data'
import { projects, assignees } from './common'

export interface TaskFormProps {
  initialValues?: Partial<Task>
  onSubmit: (values: Partial<Task>) => void
  onCancel?: () => void
  submitLabel?: string
}

export function TaskForm({ initialValues, onSubmit, onCancel, submitLabel = 'Create Task' }: TaskFormProps) {
  return (
    <Form initialValues={initialValues} onFinish={(v) => onSubmit(v as Partial<Task>)}>
      <Field name="title" label="Task Title" rules={[{ required: true }]}>
        <Input placeholder="Implement feature X" />
      </Field>
      <Field name="project" label="Project" rules={[{ required: true }]}>
        <Select options={projects.map(p => ({ label: p, value: p }))} placeholder="Select project" />
      </Field>
      <Field name="assignee" label="Assignee" rules={[{ required: true }]}>
        <Select options={assignees.map(a => ({ label: a, value: a }))} placeholder="Assign to" />
      </Field>
      <Field name="priority" label="Priority" rules={[{ required: true }]}>
        <Select
          options={[
            { label: 'Critical', value: 'critical' },
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ]}
          placeholder="Priority"
        />
      </Field>
      <Field name="estimate" label="Estimate (hours)">
        <InputNumber min={1} max={40} placeholder="3" style={{ width: '100%' }} />
      </Field>
      <Field name="dueDate" label="Due Date">
        <DatePicker placeholder="Select date" />
      </Field>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        <Button type="primary" htmlType="submit">{submitLabel}</Button>
      </div>
    </Form>
  )
}
