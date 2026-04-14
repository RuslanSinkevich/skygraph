import React from 'react'
import { Form } from './Form'
import { Field } from './Field'
import { AutoField } from './AutoField/AutoField'
import { useForm } from '../../hooks/useForm'
import {
  jsonSchemaToFields,
  jsonSchemaToRules,
  jsonSchemaToDefaults,
} from '../../adapters/jsonSchemaAdapter'
import { zodToJsonSchema } from '../../adapters/zodAdapter'
import type { JSONSchema } from '../../adapters/jsonSchemaAdapter'
import type { UseFormReturn } from '../../hooks/useForm'
import type { BaseComponentProps, SizableProps } from '../../types'

export interface SchemaFormProps extends BaseComponentProps, SizableProps {
  schema: JSONSchema | { _def?: unknown }
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>
  layout?: 'horizontal' | 'vertical' | 'inline'
  disabled?: boolean
  form?: UseFormReturn
  labelCol?: { span?: number; offset?: number }
  wrapperCol?: { span?: number; offset?: number }
  className?: string
  style?: React.CSSProperties
  submitText?: string
  children?: React.ReactNode
}

function isZodSchema(schema: unknown): boolean {
  return typeof schema === 'object' && schema !== null && '_def' in schema
}

export function SchemaForm({
  schema: rawSchema,
  onSubmit,
  layout,
  size,
  disabled,
  form: externalForm,
  labelCol,
  wrapperCol,
  className,
  style,
  submitText = 'Submit',
  children,
}: SchemaFormProps) {
  const jsonSchema: JSONSchema = isZodSchema(rawSchema)
    ? zodToJsonSchema(rawSchema as Parameters<typeof zodToJsonSchema>[0])
    : (rawSchema as JSONSchema)

  const fields = jsonSchemaToFields(jsonSchema)
  const rulesMap = jsonSchemaToRules(jsonSchema)
  const defaults = jsonSchemaToDefaults(jsonSchema)

  const internalForm = useForm({
    defaultValues: defaults,
    onSubmit: onSubmit as (values: Record<string, unknown>) => Promise<void>,
  })

  const formInstance = externalForm ?? internalForm

  return (
    <Form
      form={formInstance}
      layout={layout}
      size={size}
      disabled={disabled}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      className={className}
      style={style}
    >
      {fields.map((fieldConfig) => (
        <Field
          key={fieldConfig.name}
          name={fieldConfig.name}
          label={typeof fieldConfig.label === 'string' ? fieldConfig.label : undefined}
          rules={rulesMap[fieldConfig.name]}
        >
          {(field) => (
            <AutoField
              name={fieldConfig.name}
              type={fieldConfig.type}
              options={fieldConfig.options}
              placeholder={fieldConfig.placeholder}
              min={fieldConfig.min}
              max={fieldConfig.max}
              disabled={disabled ?? field.validating}
            />
          )}
        </Field>
      ))}
      {children ?? (
        <button type="submit" className="sg-btn sg-btn-primary">
          {submitText}
        </button>
      )}
    </Form>
  )
}
