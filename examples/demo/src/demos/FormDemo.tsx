import { useState } from 'react'
import {
  Form,
  Field,
  FormList,
  SubmitButton,
  Button,
  useFormContext,
  useWatch,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  InputNumber,
  DatePicker,
  TimePicker,
  AutoComplete,
  Slider,
  Rate,
  Upload,
} from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const formProps: PropDef[] = [
  { name: 'layout', description: 'Form layout', type: "'horizontal' | 'vertical' | 'inline'", default: "'horizontal'" },
  { name: 'defaultValues', description: 'Initial form values', type: 'Record<string, any>' },
  { name: 'onSubmit', description: 'Submit handler', type: '(values) => void | Promise' },
  { name: 'onSubmitInvalid', description: 'Called if validation fails on submit', type: '(errors) => void' },
  { name: 'onValuesChange', description: 'Callback when any value changes', type: '(changed, all) => void' },
  { name: 'validateTrigger', description: 'When to validate', type: "'onChange' | 'onBlur' | 'onSubmit'", default: "'onChange'" },
  { name: 'scrollToFirstError', description: 'Scroll to first error on submit', type: 'boolean', default: 'false' },
  { name: 'preserve', description: 'Preserve values of unmounted fields', type: 'boolean', default: 'true' },
  { name: 'disabled', description: 'Disable all form controls', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Form controls size', type: "'small' | 'middle' | 'large'" },
]

const fieldProps: PropDef[] = [
  { name: 'name', description: 'Field name (path in form values)', type: 'string' },
  { name: 'label', description: 'Field label', type: 'string' },
  { name: 'rules', description: 'Validation rules array', type: 'Rule[]' },
  { name: 'type', description: 'Input type', type: "'text' | 'password' | 'email' | 'textarea' | ..." },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
  { name: 'tooltip', description: 'Help tooltip next to label', type: 'string' },
  { name: 'help', description: 'Help text below the field', type: 'string' },
  { name: 'extra', description: 'Extra text below the field', type: 'string' },
  { name: 'dependencies', description: 'Fields to watch for re-validation', type: 'string[]' },
  { name: 'children', description: 'Render prop for custom controls', type: '(field) => ReactNode' },
]

const formListProps: PropDef[] = [
  { name: 'name', description: 'Array field name in form values', type: 'string' },
  { name: 'children', description: 'Render prop: (fields, operations) => ReactNode', type: 'Function' },
]

const roleOptions = [
  { label: 'Developer', value: 'dev' },
  { label: 'Designer', value: 'design' },
  { label: 'Manager', value: 'manager' },
  { label: 'QA Engineer', value: 'qa' },
]

const skillOptions = [
  { label: 'React', value: 'React' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Node.js', value: 'Node.js' },
  { label: 'Python', value: 'Python' },
]

function LiveState() {
  const { core } = useFormContext()
  const username = useWatch(core, 'username')
  const email = useWatch(core, 'email')
  const role = useWatch(core, 'role')
  const experience = useWatch(core, 'experience')
  const rating = useWatch(core, 'rating')
  const newsletter = useWatch(core, 'newsletter')

  const entries = [
    ['username', username],
    ['email', email],
    ['role', role],
    ['experience', experience],
    ['rating', rating],
    ['newsletter', newsletter],
  ] as const

  return (
    <div style={{
      padding: '10px 14px',
      background: 'var(--sg-color-bg-secondary)',
      borderRadius: 'var(--sg-border-radius)',
      border: '1px solid var(--sg-color-border)',
      fontSize: 12,
      fontFamily: 'monospace',
      color: 'var(--sg-color-text-secondary)',
      marginBottom: 20,
    }}>
      <div style={{ fontWeight: 600, marginBottom: 6, color: 'var(--sg-color-text-primary)', fontFamily: 'inherit' }}>
        useWatch — live values
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {entries.map(([key, val]) => (
          <span key={key}>
            <span style={{ color: 'var(--sg-color-primary)' }}>{key}</span>
            {': '}
            <span style={{ color: 'var(--sg-color-text-tertiary)' }}>
              {val === '' ? '""' : JSON.stringify(val ?? null)}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

function FormActions() {
  const { form } = useFormContext()
  const [validationResult, setValidationResult] = useState<string | null>(null)

  return (
    <div style={{
      display: 'flex', gap: 8, flexWrap: 'wrap',
      padding: '12px 0',
      borderTop: '1px solid var(--sg-color-border)',
      borderBottom: '1px solid var(--sg-color-border)',
      marginBottom: 20,
    }}>
      <Button type="default" onClick={() => { form.reset(); setValidationResult(null) }}>Reset</Button>
      <Button type="default" onClick={() => {
        form.setFieldsValue({
          username: 'john_doe', email: 'john@example.com',
          password: 'secret123', confirm: 'secret123',
          bio: 'Full-stack developer.', age: 28,
          role: 'dev', skill: 'TypeScript',
          gender: 'male', newsletter: true, darkMode: true,
          experience: 75, rating: 4,
        })
        setValidationResult(null)
      }}>Fill Sample Data</Button>
      <Button type="default" onClick={async () => {
        const result = await form.validate()
        if (result.valid) {
          setValidationResult('All fields valid')
        } else {
          const count = Object.keys(result.errors).length
          setValidationResult(`${count} error(s): ${Object.keys(result.errors).join(', ')}`)
        }
      }}>Validate All</Button>
      {validationResult && (
        <span style={{
          alignSelf: 'center', fontSize: 12,
          color: validationResult.startsWith('All')
            ? 'var(--sg-color-success, #52c41a)'
            : 'var(--sg-color-error, #ff4d4f)',
        }}>{validationResult}</span>
      )}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 style={{
      margin: '0 0 12px', fontSize: 13, fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '0.5px',
      color: 'var(--sg-color-text-tertiary)',
    }}>{children}</h4>
  )
}

function FullFormExample() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [submittedData, setSubmittedData] = useState<string | null>(null)

  const handleUpload = (newFiles: File[]) => {
    const uploaded: UploadFile[] = newFiles.map((f, i) => ({
      uid: `${Date.now()}-${i}`, name: f.name, size: f.size, status: 'done' as const,
    }))
    setFiles(prev => [...prev, ...uploaded])
  }

  return (
    <Form
      layout="vertical"
      defaultValues={{
        username: '', email: '', password: '', confirm: '', bio: '',
        age: 25, role: '', skill: '', birthDate: '', startTime: '',
        gender: 'other', newsletter: false, darkMode: false,
        experience: 50, rating: 3, phones: [''], tags: [''],
      }}
      onSubmit={async (values) => {
        setSubmittedData(JSON.stringify({ ...values, files: files.map(f => f.name) }, null, 2))
      }}
      onSubmitInvalid={(errors) => { console.log('Validation errors:', errors) }}
    >
      <LiveState />
      <FormActions />

      <SectionTitle>Account</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field name="username" label="Username" tooltip="Letters, numbers, underscores."
          help="This will be your public display name"
          rules={[{ required: true }, { min: 3, message: 'At least 3 characters' }, { pattern: /^[a-zA-Z0-9_]+$/, message: 'Only letters, numbers, underscores' }]}
          placeholder="e.g. john_doe" />
        <Field name="email" label="Email" type="email"
          rules={[{ required: true }, { type: 'email' }]}
          placeholder="your@email.com" />
        <Field name="password" label="Password" type="password"
          rules={[{ required: true }, { min: 6, message: 'At least 6 characters' }]}
          placeholder="Min 6 characters" />
        <Field name="confirm" label="Confirm Password" type="password"
          dependencies={['password']}
          rules={[
            { required: true },
            { validator: (value, getFieldValue) => value && value !== getFieldValue('password') ? 'Passwords do not match' : null },
          ]}
          placeholder="Repeat password" />
      </div>

      <SectionTitle>Profile</SectionTitle>
      <Field name="bio" label="Bio" type="textarea" extra="Markdown is supported"
        rules={[{ max: 200, message: 'Max 200 characters' }]}
        placeholder="Tell about yourself..." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 16px' }}>
        <Field name="age" label="Age">
          {(field) => <InputNumber value={field.value as number} onChange={(v) => field.onChange(v)} min={18} max={99} />}
        </Field>
        <Field name="role" label="Role" rules={[{ required: true, message: 'Select a role' }]}>
          {(field) => <Select value={field.value as string} onChange={(v) => field.onChange(v)} placeholder="Select role" options={roleOptions} />}
        </Field>
        <Field name="skill" label="Primary Skill">
          {(field) => <AutoComplete value={field.value as string} onChange={(v) => field.onChange(v)} options={skillOptions} placeholder="Type to search..." />}
        </Field>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field name="birthDate" label="Birth Date">
          {(field) => (
            <DatePicker
              value={(field.value as Date | undefined) ?? undefined}
              onChange={(d) => field.onChange(d)}
            />
          )}
        </Field>
        <Field name="startTime" label="Start Time">
          {(field) => <TimePicker value={field.value as string} onChange={(v) => field.onChange(v)} />}
        </Field>
      </div>

      <SectionTitle>Preferences</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field name="gender" label="Gender">
          {(field) => <RadioGroup value={field.value as string} onChange={(v) => field.onChange(v)} options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'Other', value: 'other' }]} />}
        </Field>
        <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Field name="newsletter">
            {(field) => <Checkbox checked={field.value as boolean} onChange={(v) => field.onChange(v)}>Subscribe to newsletter</Checkbox>}
          </Field>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Field name="darkMode">
              {(field) => <Switch checked={field.value as boolean} onChange={(v) => field.onChange(v)} />}
            </Field>
            <span>Dark mode</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field name="experience" label="Experience Level">
          {(field) => <Slider value={field.value as number} onChange={(v) => field.onChange(v)} />}
        </Field>
        <Field name="rating" label="Rate our platform">
          {(field) => <Rate value={field.value as number} onChange={(v) => field.onChange(v)} />}
        </Field>
      </div>

      <SectionTitle>Dynamic Fields (FormList)</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <div style={{ marginBottom: 16 }}>
          <label className="sg-field-label">Phone Numbers</label>
          <FormList name="phones">
            {(fields, { add, remove }) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {fields.map((f) => (
                  <div key={f.key} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Field name={`phones.${f.index}`} placeholder={`Phone #${f.index + 1}`}
                      rules={[{ pattern: /^[+\d\s()-]*$/, message: 'Invalid phone format' }]} />
                    {fields.length > 1 && <Button type="text" onClick={() => remove(f.index)} style={{ flexShrink: 0 }}>×</Button>}
                  </div>
                ))}
                <Button type="dashed" onClick={() => add('')} style={{ alignSelf: 'flex-start' }}>+ Add phone</Button>
              </div>
            )}
          </FormList>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="sg-field-label">Tags</label>
          <FormList name="tags">
            {(fields, { add, remove }) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {fields.map((f) => (
                  <div key={f.key} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Field name={`tags.${f.index}`} placeholder={`Tag #${f.index + 1}`} />
                    {fields.length > 1 && <Button type="text" onClick={() => remove(f.index)} style={{ flexShrink: 0 }}>×</Button>}
                  </div>
                ))}
                <Button type="dashed" onClick={() => add('')} style={{ alignSelf: 'flex-start' }}>+ Add tag</Button>
              </div>
            )}
          </FormList>
        </div>
      </div>

      <SectionTitle>Attachments</SectionTitle>
      <div style={{ marginBottom: 16 }}>
        <Upload accept=".pdf,.doc,.docx,.txt" fileList={files}
          onUpload={handleUpload}
          onRemove={(f) => setFiles(prev => prev.filter(x => x.uid !== f.uid))} />
      </div>

      <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
        <SubmitButton>Submit Application</SubmitButton>
      </div>

      {submittedData && (
        <div style={{ marginTop: 20, padding: 16, background: 'var(--sg-color-bg-secondary)',
          borderRadius: 'var(--sg-border-radius)', border: '1px solid var(--sg-color-success, #52c41a)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <strong style={{ color: 'var(--sg-color-success, #52c41a)' }}>Submitted successfully</strong>
            <Button type="text" onClick={() => setSubmittedData(null)}>Close</Button>
          </div>
          <pre style={{ margin: 0, fontSize: 12, fontFamily: 'monospace', color: 'var(--sg-color-text-secondary)', whiteSpace: 'pre-wrap', maxHeight: 300, overflow: 'auto' }}>
            {submittedData}
          </pre>
        </div>
      )}
    </Form>
  )
}

export function FormDemo() {
  return (
    <ComponentDoc
      title="Form"
      description="High-performance form with field-level validation, dependencies, dynamic fields, and programmatic control."
      whenToUse={[
        'When you need to create/edit data with validation.',
        'When the form has dependent fields (e.g. confirm password).',
        'For dynamic field arrays (phones, tags, addresses).',
      ]}
    >
      <DemoBox
        title="Complete Form"
        description="Full form demo — validation, dependencies, dynamic fields, useWatch, programmatic control, file upload."
        code={`import { Form, Field, FormList, SubmitButton, useWatch } from '@skygraph/react'

<Form
  layout="vertical"
  defaultValues={{ username: '', email: '', ... }}
  onSubmit={async (values) => { console.log(values) }}
>
  <Field name="username" label="Username"
    rules={[{ required: true }, { min: 3 }]}
    placeholder="e.g. john_doe" />

  <Field name="email" label="Email" type="email"
    rules={[{ required: true }, { type: 'email' }]} />

  <Field name="role" label="Role" rules={[{ required: true }]}>
    {(field) => (
      <Select value={field.value} onChange={field.onChange}
        options={[{ label: 'Dev', value: 'dev' }, ...]} />
    )}
  </Field>

  <FormList name="phones">
    {(fields, { add, remove }) => (
      <>
        {fields.map((f) => (
          <Field key={f.key} name={\`phones.\${f.index}\`} />
        ))}
        <Button onClick={() => add('')}>+ Add</Button>
      </>
    )}
  </FormList>

  <SubmitButton>Submit</SubmitButton>
</Form>`}
      >
        <div style={{ width: '100%' }}>
          <FullFormExample />
        </div>
      </DemoBox>

      <DemoBox
        title="Horizontal layout"
        description="Labels sit to the left of controls. Use for admin settings and compact forms."
        code={`<Form layout="horizontal" onSubmit={(v) => console.log(v)}>
  <Field name="name" label="Name" rules={[{ required: true }]} />
  <Field name="email" label="Email" type="email" rules={[{ required: true }]} />
  <SubmitButton>Save</SubmitButton>
</Form>`}
      >
        <div style={{ width: '100%', maxWidth: 520 }}>
          <Form
            layout="horizontal"
            defaultValues={{ name: '', email: '' }}
            onSubmit={(v) => console.log('horizontal submit', v)}
          >
            <Field name="name" label="Name" rules={[{ required: true }]} />
            <Field name="email" label="Email" type="email" rules={[{ required: true }, { type: 'email' }]} />
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <SubmitButton>Save</SubmitButton>
            </div>
          </Form>
        </div>
      </DemoBox>

      <DemoBox
        title="Inline layout"
        description="All fields in one row — perfect for search/filter bars."
        code={`<Form layout="inline" onSubmit={(v) => console.log(v)}>
  <Field name="q" placeholder="Search…" />
  <Field name="status">
    {(f) => <Select value={f.value} onChange={f.onChange} options={[...]} />}
  </Field>
  <SubmitButton>Search</SubmitButton>
</Form>`}
      >
        <Form
          layout="inline"
          defaultValues={{ q: '', status: 'all' }}
          onSubmit={(v) => console.log('inline submit', v)}
        >
          <Field name="q" placeholder="Search…" />
          <Field name="status">
            {(f) => (
              <Select
                value={f.value as string}
                onChange={(v) => f.onChange(v)}
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'Archived', value: 'archived' },
                ]}
              />
            )}
          </Field>
          <SubmitButton>Search</SubmitButton>
        </Form>
      </DemoBox>

      <DemoBox
        title="Small size"
        description="Size propagates to all descendants through Form's size prop."
        code={`<Form size="small" layout="vertical">
  <Field name="title" label="Title" rules={[{ required: true }]} />
  <SubmitButton>Create</SubmitButton>
</Form>`}
      >
        <div style={{ width: '100%', maxWidth: 420 }}>
          <Form size="small" layout="vertical" defaultValues={{ title: '' }} onSubmit={() => {}}>
            <Field name="title" label="Title" rules={[{ required: true }]} />
            <SubmitButton>Create</SubmitButton>
          </Form>
        </div>
      </DemoBox>

      <PropsTable title="Form API" data={formProps} />
      <PropsTable title="Field API" data={fieldProps} />
      <PropsTable title="FormList API" data={formListProps} />
    </ComponentDoc>
  )
}
