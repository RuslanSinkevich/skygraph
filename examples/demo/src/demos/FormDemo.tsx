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

const roleOptions = [
  { label: 'Developer', value: 'dev' },
  { label: 'Designer', value: 'design' },
  { label: 'Manager', value: 'manager' },
  { label: 'QA Engineer', value: 'qa' },
  { label: 'DevOps', value: 'devops' },
]

const skillOptions = [
  { label: 'React', value: 'React' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Node.js', value: 'Node.js' },
  { label: 'Python', value: 'Python' },
  { label: 'Rust', value: 'Rust' },
  { label: 'Go', value: 'Go' },
  { label: 'Docker', value: 'Docker' },
  { label: 'Kubernetes', value: 'Kubernetes' },
]

// --- Live state panel ---
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

// --- Form actions (reset, fill, validate) ---
function FormActions() {
  const { form } = useFormContext()
  const [validationResult, setValidationResult] = useState<string | null>(null)

  return (
    <div style={{
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      padding: '12px 0',
      borderTop: '1px solid var(--sg-color-border)',
      borderBottom: '1px solid var(--sg-color-border)',
      marginBottom: 20,
    }}>
      <Button
        type="default"
        onClick={() => {
          form.reset()
          setValidationResult(null)
        }}
      >
        Reset
      </Button>
      <Button
        type="default"
        onClick={() => {
          form.setFieldsValue({
            username: 'john_doe',
            email: 'john@example.com',
            password: 'secret123',
            confirm: 'secret123',
            bio: 'Full-stack developer with 5 years of experience.',
            age: 28,
            role: 'dev',
            skill: 'TypeScript',
            birthDate: '2026-01-15',
            startTime: '09:00',
            gender: 'male',
            newsletter: true,
            darkMode: true,
            experience: 75,
            rating: 4,
          })
          setValidationResult(null)
        }}
      >
        Fill Sample Data
      </Button>
      <Button
        type="default"
        onClick={async () => {
          const result = await form.validate()
          if (result.valid) {
            setValidationResult('All fields valid')
          } else {
            const count = Object.keys(result.errors).length
            setValidationResult(`${count} error(s): ${Object.keys(result.errors).join(', ')}`)
          }
        }}
      >
        Validate All
      </Button>
      {validationResult && (
        <span style={{
          alignSelf: 'center',
          fontSize: 12,
          color: validationResult.startsWith('All')
            ? 'var(--sg-color-success, #52c41a)'
            : 'var(--sg-color-error, #ff4d4f)',
        }}>
          {validationResult}
        </span>
      )}
    </div>
  )
}

// --- Section wrapper ---
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h4 style={{
        margin: '0 0 12px',
        fontSize: 13,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color: 'var(--sg-color-text-tertiary)',
      }}>
        {title}
      </h4>
      {children}
    </div>
  )
}

// --- Main demo ---
export function FormDemo() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [submittedData, setSubmittedData] = useState<string | null>(null)

  const handleUpload = (newFiles: File[]) => {
    const uploaded: UploadFile[] = newFiles.map((f, i) => ({
      uid: `${Date.now()}-${i}`,
      name: f.name,
      size: f.size,
      status: 'done' as const,
    }))
    setFiles(prev => [...prev, ...uploaded])
  }

  return (
    <section>
      <h2>Form</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 20 }}>
        Full form demo — validation, dependencies, dynamic fields, useWatch, programmatic control.
      </p>

      <Form
        layout="vertical"
        defaultValues={{
          username: '',
          email: '',
          password: '',
          confirm: '',
          bio: '',
          age: 25,
          role: '',
          skill: '',
          birthDate: '',
          startTime: '',
          gender: 'other',
          newsletter: false,
          darkMode: false,
          experience: 50,
          rating: 3,
          phones: [''],
          tags: [''],
        }}
        onSubmit={async (values) => {
          setSubmittedData(JSON.stringify(
            { ...values, files: files.map(f => f.name) },
            null, 2
          ))
        }}
        onSubmitInvalid={(errors) => {
          console.log('Validation errors:', errors)
        }}
      >
        <LiveState />
        <FormActions />

        {/* ---- Account ---- */}
        <Section title="Account">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field
              name="username"
              label="Username"
              tooltip="Letters, numbers, underscores. Min 3 chars."
              help="This will be your public display name"
              rules={[
                { required: true },
                { min: 3, message: 'At least 3 characters' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: 'Only letters, numbers, underscores' },
              ]}
              placeholder="e.g. john_doe"
            />

            <Field
              name="email"
              label="Email"
              type="email"
              tooltip="We'll never share your email"
              rules={[
                { required: true },
                { type: 'email' },
              ]}
              placeholder="your@email.com"
            />

            <Field
              name="password"
              label="Password"
              type="password"
              help="Use a mix of letters, numbers and symbols"
              rules={[
                { required: true },
                { min: 6, message: 'At least 6 characters' },
              ]}
              placeholder="Min 6 characters"
            />

            <Field
              name="confirm"
              label="Confirm Password"
              type="password"
              dependencies={['password']}
              rules={[
                { required: true },
                {
                  validator: (value, getFieldValue) => {
                    if (value && value !== getFieldValue('password')) {
                      return 'Passwords do not match'
                    }
                    return null
                  },
                },
              ]}
              placeholder="Repeat password"
            />
          </div>
        </Section>

        {/* ---- Profile ---- */}
        <Section title="Profile">
          <Field
            name="bio"
            label="Bio"
            type="textarea"
            extra="Markdown is supported"
            rules={[{ max: 200, message: 'Max 200 characters' }]}
            placeholder="Tell about yourself..."
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 16px' }}>
            <Field name="age" label="Age" tooltip="Between 18 and 99">
              {(field) => (
                <InputNumber
                  value={field.value as number}
                  onChange={(v) => field.onChange(v)}
                  min={18}
                  max={99}
                />
              )}
            </Field>

            <div style={{ marginBottom: 16 }}>
              <label className="sg-field-label">Role</label>
              <Field name="role" rules={[{ required: true, message: 'Select a role' }]}>
                {(field) => (
                  <Select
                    value={field.value as string}
                    onChange={(v) => field.onChange(v)}
                    placeholder="Select role"
                    options={roleOptions}
                  />
                )}
              </Field>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="sg-field-label">Primary Skill</label>
              <Field name="skill">
                {(field) => (
                  <AutoComplete
                    value={field.value as string}
                    onChange={(v) => field.onChange(v)}
                    options={skillOptions}
                    placeholder="Type to search..."
                  />
                )}
              </Field>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <div style={{ marginBottom: 16 }}>
              <label className="sg-field-label">Birth Date</label>
              <Field name="birthDate">
                {(field) => (
                  <DatePicker
                    value={field.value as string}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              </Field>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="sg-field-label">Preferred Start Time</label>
              <Field name="startTime">
                {(field) => (
                  <TimePicker
                    value={field.value as string}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              </Field>
            </div>
          </div>
        </Section>

        {/* ---- Preferences ---- */}
        <Section title="Preferences">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <div style={{ marginBottom: 16 }}>
              <label className="sg-field-label">Gender</label>
              <Field name="gender">
                {(field) => (
                  <RadioGroup
                    value={field.value as string}
                    onChange={(v) => field.onChange(v)}
                    options={[
                      { label: 'Male', value: 'male' },
                      { label: 'Female', value: 'female' },
                      { label: 'Other', value: 'other' },
                    ]}
                  />
                )}
              </Field>
            </div>

            <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Field name="newsletter">
                {(field) => (
                  <Checkbox
                    checked={field.value as boolean}
                    onChange={(v) => field.onChange(v)}
                  >
                    Subscribe to newsletter
                  </Checkbox>
                )}
              </Field>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Field name="darkMode">
                  {(field) => (
                    <Switch
                      checked={field.value as boolean}
                      onChange={(v) => field.onChange(v)}
                    />
                  )}
                </Field>
                <span>Dark mode</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <div style={{ marginBottom: 16 }}>
              <label className="sg-field-label">Experience Level</label>
              <Field name="experience">
                {(field) => (
                  <Slider
                    value={field.value as number}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              </Field>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="sg-field-label">Rate our platform</label>
              <Field name="rating">
                {(field) => (
                  <Rate
                    value={field.value as number}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              </Field>
            </div>
          </div>
        </Section>

        {/* ---- Dynamic fields ---- */}
        <Section title="Dynamic Fields (FormList)">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <div style={{ marginBottom: 16 }}>
              <label className="sg-field-label">Phone Numbers</label>
              <FormList name="phones">
                {(fields, { add, remove }) => (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {fields.map((f) => (
                      <div key={f.key} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <Field
                          name={`phones.${f.index}`}
                          placeholder={`Phone #${f.index + 1}`}
                          rules={[{ pattern: /^[+\d\s()-]*$/, message: 'Invalid phone format' }]}
                        />
                        {fields.length > 1 && (
                          <Button type="text" onClick={() => remove(f.index)} style={{ flexShrink: 0 }}>
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="dashed" onClick={() => add('')} style={{ alignSelf: 'flex-start' }}>
                      + Add phone
                    </Button>
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
                        <Field
                          name={`tags.${f.index}`}
                          placeholder={`Tag #${f.index + 1}`}
                        />
                        {fields.length > 1 && (
                          <Button type="text" onClick={() => remove(f.index)} style={{ flexShrink: 0 }}>
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="dashed" onClick={() => add('')} style={{ alignSelf: 'flex-start' }}>
                      + Add tag
                    </Button>
                  </div>
                )}
              </FormList>
            </div>
          </div>
        </Section>

        {/* ---- Upload ---- */}
        <Section title="Attachments">
          <div style={{ marginBottom: 16 }}>
            <label className="sg-field-label">Resume / Documents</label>
            <Upload
              accept=".pdf,.doc,.docx,.txt"
              fileList={files}
              onUpload={handleUpload}
              onRemove={(f) => setFiles(prev => prev.filter(x => x.uid !== f.uid))}
            />
          </div>
        </Section>

        {/* ---- Submit ---- */}
        <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
          <SubmitButton>Submit Application</SubmitButton>
        </div>

        {/* ---- Result ---- */}
        {submittedData && (
          <div style={{
            marginTop: 20,
            padding: 16,
            background: 'var(--sg-color-bg-secondary)',
            borderRadius: 'var(--sg-border-radius)',
            border: '1px solid var(--sg-color-success, #52c41a)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}>
              <strong style={{ color: 'var(--sg-color-success, #52c41a)' }}>
                Submitted successfully
              </strong>
              <Button type="text" onClick={() => setSubmittedData(null)}>
                Close
              </Button>
            </div>
            <pre style={{
              margin: 0,
              fontSize: 12,
              fontFamily: 'monospace',
              color: 'var(--sg-color-text-secondary)',
              whiteSpace: 'pre-wrap',
              maxHeight: 300,
              overflow: 'auto',
            }}>
              {submittedData}
            </pre>
          </div>
        )}
      </Form>
    </section>
  )
}
