import { Form, Field, InputNumber, SubmitButton } from '@skygraph/react'

/**
 * InputNumber plugs straight into `<Field>`. Validation rules see a
 * `number | null`, so `required` + numeric rules cover the common
 * "must be filled" and "must be in range" cases.
 */
export function InFormInputNumber() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ quantity: 1, budget: null as number | null }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 360 }}
    >
      <Field
        name="quantity"
        label="Quantity"
        rules={[
          { required: true, message: 'Pick a quantity' },
          {
            validator: (v) => (typeof v === 'number' && v >= 1 && v <= 99) ? null : 'Must be between 1 and 99',
          },
        ]}
      >
        <InputNumber min={1} max={99} />
      </Field>
      <Field
        name="budget"
        label="Budget (USD)"
        rules={[{ required: true, message: 'Please enter a budget' }]}
      >
        <InputNumber min={0} step={50} placeholder="0" />
      </Field>
      <SubmitButton>Save</SubmitButton>
    </Form>
  )
}
