import { Form, Field, FormList, SubmitButton, Button } from '@skygraph/react'
import './styles.css'

/**
 * `FormList` registers an array path and gives you `add` / `remove` / `move`
 * operations. Child fields address array items with dotted paths
 * (`phones.0`, `phones.1`, …). Each item validates independently.
 */
export function FormListDynamic() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ phones: [''] }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 520 }}
    >
      <label className="sg-field-label">Phone numbers</label>
      <FormList name="phones">
        {(fields, { add, remove, move }) => (
          <div className="demo-form-list">
            {fields.map((f, i) => (
              <div key={f.key} className="demo-form-list-row">
                <Field
                  name={`phones.${f.index}`}
                  placeholder={`Phone #${f.index + 1}`}
                  rules={[
                    { required: true, message: 'Required' },
                    { pattern: /^[+\d\s()-]+$/, message: 'Invalid phone' },
                  ]}
                  style={{ marginBottom: 0 }}
                />
                <span title="Move up">
                  <Button type="text" disabled={i === 0} onClick={() => move(i, i - 1)}>
                    ↑
                  </Button>
                </span>
                <span title="Move down">
                  <Button
                    type="text"
                    disabled={i === fields.length - 1}
                    onClick={() => move(i, i + 1)}
                  >
                    ↓
                  </Button>
                </span>
                <span title="Remove">
                  <Button type="text" disabled={fields.length <= 1} onClick={() => remove(f.index)}>
                    ×
                  </Button>
                </span>
              </div>
            ))}
            <Button
              type="dashed"
              onClick={() => add('')}
              style={{ alignSelf: 'flex-start', marginTop: 4 }}
            >
              + Add phone
            </Button>
          </div>
        )}
      </FormList>

      <div style={{ marginTop: 16 }}>
        <SubmitButton>Save contacts</SubmitButton>
      </div>
    </Form>
  )
}
