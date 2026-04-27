import { Form, Field, Rate, SubmitButton } from '@skygraph/react'

/**
 * Rate plugs into `<Field>` like any controlled control. Add a
 * validator for "not zero" if a rating is required.
 */
export function InFormRate() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ rating: 0 }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 380 }}
    >
      <Field
        name="rating"
        label="How was it?"
        rules={[
          {
            validator: (v) =>
              typeof v === 'number' && v > 0 ? null : 'Please leave a rating',
          },
        ]}
      >
        <Rate allowHalf />
      </Field>
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}
