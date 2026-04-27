import { Form, Field, SubmitButton } from '@skygraph/react'

/**
 * Vertical layout — labels sit above controls. Default and best choice for
 * long signup / profile forms where the form is the main content.
 */
export function LayoutVerticalForm() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ title: '', body: '' }}
      onSubmit={(v) => console.log(v)}
      style={{ maxWidth: 520 }}
    >
      <Field name="title" label="Title" rules={[{ required: true }]} />
      <Field name="body" label="Body" type="textarea" placeholder="Write something…" />
      <SubmitButton>Publish</SubmitButton>
    </Form>
  )
}
