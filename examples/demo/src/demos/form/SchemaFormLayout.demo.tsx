import { SchemaForm } from '@skygraph/react'

const contactSchema = {
  properties: {
    firstName: { type: 'string', title: 'First name' },
    lastName: { type: 'string', title: 'Last name' },
    email: { type: 'string', format: 'email', title: 'Email' },
  },
  required: ['firstName', 'email'],
}

export function SchemaFormLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <section>
        <h4 style={{ margin: '0 0 8px' }}>layout=&quot;horizontal&quot; + size=&quot;small&quot;</h4>
        <SchemaForm
          schema={contactSchema}
          layout="horizontal"
          size="small"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          submitText="Send"
          onSubmit={() => {}}
        />
      </section>
      <section>
        <h4 style={{ margin: '0 0 8px' }}>layout=&quot;inline&quot; + disabled</h4>
        <SchemaForm
          schema={contactSchema}
          layout="inline"
          disabled
          submitText="Send"
          onSubmit={() => {}}
        />
      </section>
    </div>
  )
}
