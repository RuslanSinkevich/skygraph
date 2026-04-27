import { Form, Field, SubmitButton } from '@skygraph/react'

/**
 * `requiredMark` controls how required fields are labeled:
 *   • `true` (default)     — red asterisk before required labels
 *   • `false`              — no marker at all
 *   • `'optional'`         — flips the convention, optional fields get
 *                            a muted "(optional)" suffix instead
 */
export function RequiredMarkForm() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <Form
        layout="vertical"
        requiredMark
        defaultValues={{ a: '', b: '' }}
        onSubmit={() => {}}
      >
        <div style={{ fontSize: 12, color: 'var(--sg-color-text-tertiary)', marginBottom: 8 }}>
          requiredMark: default
        </div>
        <Field name="a" label="Name" rules={[{ required: true }]} />
        <Field name="b" label="Nickname" />
        <SubmitButton>Save</SubmitButton>
      </Form>

      <Form
        layout="vertical"
        requiredMark="optional"
        defaultValues={{ a: '', b: '' }}
        onSubmit={() => {}}
      >
        <div style={{ fontSize: 12, color: 'var(--sg-color-text-tertiary)', marginBottom: 8 }}>
          requiredMark: "optional"
        </div>
        <Field name="a" label="Name" rules={[{ required: true }]} />
        <Field name="b" label="Nickname" />
        <SubmitButton>Save</SubmitButton>
      </Form>
    </div>
  )
}
