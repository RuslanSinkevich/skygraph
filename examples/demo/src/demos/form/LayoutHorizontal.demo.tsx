import { Form, Field, SubmitButton } from '@skygraph/react'

/**
 * Horizontal layout — labels are aligned to the left of controls via a
 * 24-column grid (`labelCol` / `wrapperCol`). Good for admin/settings
 * panels where label/value pairs read best in rows.
 */
export function LayoutHorizontalForm() {
  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      labelAlign="right"
      defaultValues={{ name: '', email: '' }}
      onSubmit={(v) => console.log(v)}
      style={{ maxWidth: 520 }}
    >
      <Field name="name" label="Name" rules={[{ required: true }]} />
      <Field name="email" label="Email" type="email" rules={[{ required: true }, { type: 'email' }]} />
      <div style={{ paddingLeft: 'calc(8 / 24 * 100%)' }}>
        <SubmitButton>Save</SubmitButton>
      </div>
    </Form>
  )
}
