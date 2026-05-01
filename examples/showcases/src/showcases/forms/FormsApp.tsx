import { useState, useMemo } from 'react'
import {
  Tabs, Button, Input, InputNumber, Textarea, Select, Checkbox, RadioGroup,
  Switch, Slider, Rate, DatePicker, RangePicker, TimePicker, AutoComplete,
  ColorPicker, Segmented, Form, Field, FormList, Tag, Modal, Steps,
  InputPassword, SearchInput, TagInput, PinInput, InlineEdit, InputGroup,
  notification, NotificationContainer,
} from '@skygraph/react'
import type { TabItem, SelectOption, AutoCompleteOption } from '@skygraph/react'

/* ── Tab 1: All Controls Gallery ──────────────────── */

function ControlsGallery() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')
  const [search, setSearch] = useState('')
  const [num, setNum] = useState(42)
  const [textarea, setTextarea] = useState('')
  const [selectVal, setSelectVal] = useState<string | number>('')
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(true)
  const [radio, setRadio] = useState('a')
  const [switchOn, setSwitchOn] = useState(true)
  const [slider, setSlider] = useState(30)
  const [rate, setRate] = useState(3)
  const [tags, setTags] = useState(['React', 'TypeScript', 'SkyGraph'])
  const [pin, setPin] = useState('')
  const [color, setColor] = useState('#1677ff')
  const [segment, setSegment] = useState('daily')
  const [inlineVal, setInlineVal] = useState('Click me to edit')
  const [autoVal, setAutoVal] = useState('')

  const autoOptions: AutoCompleteOption[] = useMemo(() => {
    if (!autoVal) return []
    return ['gmail.com', 'outlook.com', 'yahoo.com'].map(d => ({
      label: `${autoVal}@${d}`,
      value: `${autoVal}@${d}`,
    }))
  }, [autoVal])

  const selectOptions: SelectOption[] = [
    { label: 'Option Alpha', value: 'alpha' },
    { label: 'Option Beta', value: 'beta' },
    { label: 'Option Gamma', value: 'gamma' },
    { label: 'Disabled Option', value: 'disabled', disabled: true },
  ]

  return (
    <div className="forms-gallery">
      <h3>Text Inputs</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">Input</label>
          <Input value={text} onChange={setText} placeholder="Basic text input" />
        </div>
        <div className="forms-cell">
          <label className="forms-label">Password + Strength</label>
          <InputPassword
            value={password}
            onChange={setPassword}
            placeholder="Enter password"
            showStrength
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">Search Input</label>
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={(v) => notification.info(`Searching: "${v}"`)}
            enterButton="Go"
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">InputNumber</label>
          <InputNumber value={num} onChange={(v) => setNum(v ?? 0)} min={0} max={100} step={5} />
        </div>
        <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
          <label className="forms-label">Textarea</label>
          <Textarea value={textarea} onChange={setTextarea} placeholder="Multi-line text..." />
        </div>
      </div>

      <h3>Input Group</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">With protocol addon</label>
          <InputGroup before="https://">
            <Input placeholder="example.com" />
          </InputGroup>
        </div>
        <div className="forms-cell">
          <label className="forms-label">With unit addon</label>
          <InputGroup after="kg">
            <InputNumber placeholder="Weight" style={{ width: '100%' }} />
          </InputGroup>
        </div>
      </div>

      <h3>Selection Controls</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">Select</label>
          <Select value={selectVal} onChange={setSelectVal} options={selectOptions} placeholder="Choose option" />
        </div>
        <div className="forms-cell">
          <label className="forms-label">AutoComplete</label>
          <AutoComplete
            value={autoVal}
            onChange={setAutoVal}
            options={autoOptions}
            placeholder="Type email username"
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">Segmented</label>
          <Segmented value={segment} onChange={setSegment} options={['daily', 'weekly', 'monthly']} />
        </div>
        <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
          <label className="forms-label">RadioGroup</label>
          <RadioGroup
            value={radio}
            onChange={(v) => setRadio(String(v))}
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
              { label: 'Option C', value: 'c' },
              { label: 'Disabled', value: 'd', disabled: true },
            ]}
          />
        </div>
      </div>

      <h3>Toggle & Range</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">Checkbox</label>
          <div style={{ display: 'flex', gap: 16 }}>
            <Checkbox checked={checked} onChange={setChecked}>Agree to terms</Checkbox>
            <Checkbox indeterminate={indeterminate} onChange={() => setIndeterminate(false)}>Select all</Checkbox>
          </div>
        </div>
        <div className="forms-cell">
          <label className="forms-label">Switch</label>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Switch checked={switchOn} onChange={setSwitchOn} checkedChildren="ON" unCheckedChildren="OFF" />
            <span style={{ color: 'var(--sg-color-text-secondary)' }}>{switchOn ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>
        <div className="forms-cell">
          <label className="forms-label">Slider ({slider})</label>
          <Slider value={slider} onChange={setSlider} />
        </div>
        <div className="forms-cell">
          <label className="forms-label">Rate</label>
          <Rate value={rate} onChange={setRate} />
        </div>
      </div>

      <h3>Date & Time</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">DatePicker</label>
          <DatePicker placeholder="Pick a date" />
        </div>
        <div className="forms-cell">
          <label className="forms-label">RangePicker</label>
          <RangePicker />
        </div>
        <div className="forms-cell">
          <label className="forms-label">TimePicker</label>
          <TimePicker placeholder="Pick time" />
        </div>
        <div className="forms-cell">
          <label className="forms-label">ColorPicker</label>
          <ColorPicker value={color} onChange={setColor} />
        </div>
      </div>

      <h3>New Components</h3>
      <div className="forms-grid">
        <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
          <label className="forms-label">TagInput (max 8 tags)</label>
          <TagInput
            value={tags}
            onChange={setTags}
            maxTags={8}
            placeholder="Type and press Enter..."
            tagColor="processing"
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">PinInput (6 digits)</label>
          <PinInput
            value={pin}
            onChange={setPin}
            onComplete={(v) => notification.success(`PIN complete: ${v}`)}
            length={6}
            type="numeric"
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">PinInput (masked, 4 chars)</label>
          <PinInput length={4} mask type="alphanumeric" />
        </div>
        <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
          <label className="forms-label">InlineEdit</label>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <InlineEdit
              value={inlineVal}
              onSave={(v) => { setInlineVal(v); notification.info(`Saved: "${v}"`) }}
            />
            <InlineEdit defaultValue="No buttons mode" showButtons={false} saveOnBlur />
            <InlineEdit disabled defaultValue="Disabled edit" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Tab 2: Form Validation ───────────────────────── */

function ValidationDemo() {
  return (
    <div className="forms-section">
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        Real-time validation with rules, warnings, feedback icons and various trigger modes.
      </p>
      <Form
        layout="vertical"
        requiredMark
        onFinish={(values) => notification.success('Form submitted!', JSON.stringify(values, null, 2))}
        scrollToFirstError
      >
        <div className="forms-grid">
          <div className="forms-cell">
            <Field
              name="username"
              label="Username"
              required
              rules={[
                { required: true, message: 'Username is required' },
                { min: 3, message: 'At least 3 characters' },
                { max: 20, message: 'Max 20 characters' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: 'Only letters, numbers and underscore' },
              ]}
              hasFeedback
            >
              {(field) => <Input value={field.value as string ?? ''} onChange={field.onChange} onBlur={field.onBlur} placeholder="john_doe" />}
            </Field>
          </div>
          <div className="forms-cell">
            <Field
              name="email"
              label="Email"
              required
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Invalid email format' },
              ]}
              hasFeedback
            >
              {(field) => <Input value={field.value as string ?? ''} onChange={field.onChange} onBlur={field.onBlur} placeholder="user@example.com" />}
            </Field>
          </div>
          <div className="forms-cell">
            <Field
              name="password"
              label="Password"
              required
              rules={[
                { required: true, message: 'Password is required' },
                { min: 8, message: 'At least 8 characters' },
              ]}
              hasFeedback
            >
              {(field) => (
                <InputPassword
                  value={field.value as string ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Strong password"
                  showStrength
                />
              )}
            </Field>
          </div>
          <div className="forms-cell">
            <Field
              name="age"
              label="Age"
              rules={[
                { type: 'number', min: 18, max: 120, message: 'Must be 18-120' },
              ]}
              hasFeedback
            >
              {(field) => (
                <InputNumber
                  value={field.value as number}
                  onChange={(v) => field.onChange(v)}
                  onBlur={field.onBlur}
                  min={0}
                  max={200}
                  placeholder="Your age"
                  style={{ width: '100%' }}
                />
              )}
            </Field>
          </div>
          <div className="forms-cell">
            <Field
              name="website"
              label="Website"
              rules={[{ type: 'url', message: 'Enter a valid URL' }]}
              help="Include https://"
              hasFeedback
            >
              {(field) => (
                <InputGroup before="https://">
                  <Input value={field.value as string ?? ''} onChange={field.onChange} onBlur={field.onBlur} placeholder="yoursite.com" />
                </InputGroup>
              )}
            </Field>
          </div>
          <div className="forms-cell">
            <Field
              name="role"
              label="Role"
              required
              rules={[{ required: true, message: 'Select a role' }]}
            >
              {(field) => (
                <Select
                  value={field.value as string}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  options={[
                    { label: 'Developer', value: 'dev' },
                    { label: 'Designer', value: 'design' },
                    { label: 'Manager', value: 'manager' },
                    { label: 'QA Engineer', value: 'qa' },
                  ]}
                  placeholder="Select role"
                />
              )}
            </Field>
          </div>
          <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
            <Field
              name="bio"
              label="Bio"
              rules={[{ max: 200, message: 'Max 200 characters' }]}
              warningRules={[{ min: 20, message: 'A longer bio helps others know you' }]}
              extra="Tell us about yourself"
            >
              {(field) => (
                <Textarea
                  value={field.value as string ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="A few words about you..."
                />
              )}
            </Field>
          </div>
          <div className="forms-cell">
            <Field name="agree" required rules={[{ validator: (v) => v ? null : 'You must agree' }]}>
              {(field) => <Checkbox checked={field.value as boolean} onChange={field.onChange}>I agree to the Terms of Service</Checkbox>}
            </Field>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          <Button type="primary" htmlType="submit">Submit</Button>
          <Button htmlType="reset">Reset</Button>
        </div>
      </Form>
    </div>
  )
}

/* ── Tab 3: Multi-step Wizard ─────────────────────── */

interface WizardData {
  fullName: string
  email: string
  phone: string
  company: string
  position: string
  skills: string[]
  experience: string
  plan: string
  notifications: boolean
  newsletter: boolean
}

const defaultWizard: WizardData = {
  fullName: '', email: '', phone: '', company: '', position: '',
  skills: [], experience: 'junior', plan: 'free', notifications: true, newsletter: false,
}

function WizardDemo() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<WizardData>(defaultWizard)
  const [completed, setCompleted] = useState(false)

  const patch = (partial: Partial<WizardData>) => setData(d => ({ ...d, ...partial }))

  const canNext = () => {
    if (step === 0) return data.fullName.length >= 2 && data.email.includes('@')
    if (step === 1) return data.company.length >= 1
    return true
  }

  const handleFinish = () => {
    setCompleted(true)
    notification.success('Registration complete!', JSON.stringify(data, null, 2))
  }

  if (completed) {
    return (
      <div className="forms-section" style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3>Registration Complete!</h3>
        <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 20 }}>
          Welcome, {data.fullName}! Your {data.plan} plan account has been created.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <Button type="primary" onClick={() => { setStep(0); setData(defaultWizard); setCompleted(false) }}>
            Start Over
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="forms-section">
      <Steps
        current={step}
        items={[
          { title: 'Personal Info' },
          { title: 'Professional' },
          { title: 'Preferences' },
          { title: 'Review' },
        ]}
      />
      <div className="wizard-content">
        {step === 0 && (
          <div className="forms-grid" style={{ marginTop: 24 }}>
            <div className="forms-cell">
              <label className="forms-label">Full Name *</label>
              <Input value={data.fullName} onChange={(v) => patch({ fullName: v })} placeholder="Jane Smith" />
            </div>
            <div className="forms-cell">
              <label className="forms-label">Email *</label>
              <Input value={data.email} onChange={(v) => patch({ email: v })} placeholder="jane@example.com" />
            </div>
            <div className="forms-cell">
              <label className="forms-label">Phone</label>
              <InputGroup before="+1">
                <Input value={data.phone} onChange={(v) => patch({ phone: v })} placeholder="555 123 4567" />
              </InputGroup>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="forms-grid" style={{ marginTop: 24 }}>
            <div className="forms-cell">
              <label className="forms-label">Company *</label>
              <Input value={data.company} onChange={(v) => patch({ company: v })} placeholder="Acme Inc." />
            </div>
            <div className="forms-cell">
              <label className="forms-label">Position</label>
              <Input value={data.position} onChange={(v) => patch({ position: v })} placeholder="Senior Developer" />
            </div>
            <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
              <label className="forms-label">Skills</label>
              <TagInput
                value={data.skills}
                onChange={(v) => patch({ skills: v })}
                placeholder="Add skills (e.g. React, Node.js)"
                maxTags={10}
              />
            </div>
            <div className="forms-cell">
              <label className="forms-label">Experience Level</label>
              <Segmented
                value={data.experience}
                onChange={(v) => patch({ experience: v as string })}
                options={[
                  { label: 'Junior', value: 'junior' },
                  { label: 'Middle', value: 'middle' },
                  { label: 'Senior', value: 'senior' },
                  { label: 'Lead', value: 'lead' },
                ]}
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="forms-grid" style={{ marginTop: 24 }}>
            <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
              <label className="forms-label">Plan</label>
              <RadioGroup
                value={data.plan}
                onChange={(v) => patch({ plan: String(v) })}
                options={[
                  { label: 'Free — Basic features', value: 'free' },
                  { label: 'Pro — All features, priority support', value: 'pro' },
                  { label: 'Enterprise — Custom, SLA, dedicated manager', value: 'enterprise' },
                ]}
              />
            </div>
            <div className="forms-cell">
              <label className="forms-label">Notifications</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Switch
                  checked={data.notifications}
                  onChange={(v) => patch({ notifications: v })}
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                />
                <span style={{ color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>Push & email alerts</span>
              </div>
            </div>
            <div className="forms-cell">
              <label className="forms-label">Newsletter</label>
              <Checkbox checked={data.newsletter} onChange={(v) => patch({ newsletter: v })}>
                Subscribe to monthly newsletter
              </Checkbox>
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{ marginTop: 24 }}>
            <div className="wizard-review">
              <div className="wizard-review-section">
                <h4>Personal</h4>
                <div className="wizard-review-row"><span>Name</span><span>{data.fullName}</span></div>
                <div className="wizard-review-row"><span>Email</span><span>{data.email}</span></div>
                <div className="wizard-review-row"><span>Phone</span><span>{data.phone || '—'}</span></div>
              </div>
              <div className="wizard-review-section">
                <h4>Professional</h4>
                <div className="wizard-review-row"><span>Company</span><span>{data.company}</span></div>
                <div className="wizard-review-row"><span>Position</span><span>{data.position || '—'}</span></div>
                <div className="wizard-review-row">
                  <span>Skills</span>
                  <span>{data.skills.length > 0 ? data.skills.map(s => <Tag key={s} color="processing" style={{ margin: '0 2px' }}>{s}</Tag>) : '—'}</span>
                </div>
                <div className="wizard-review-row"><span>Experience</span><span style={{ textTransform: 'capitalize' }}>{data.experience}</span></div>
              </div>
              <div className="wizard-review-section">
                <h4>Preferences</h4>
                <div className="wizard-review-row"><span>Plan</span><Tag color={data.plan === 'enterprise' ? 'warning' : data.plan === 'pro' ? 'processing' : 'default'}>{data.plan}</Tag></div>
                <div className="wizard-review-row"><span>Notifications</span><span>{data.notifications ? '✓ Enabled' : '✕ Disabled'}</span></div>
                <div className="wizard-review-row"><span>Newsletter</span><span>{data.newsletter ? '✓ Subscribed' : '✕ No'}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="wizard-actions">
        {step > 0 && <Button onClick={() => setStep(s => s - 1)}>← Back</Button>}
        <div style={{ flex: 1 }} />
        {step < 3 ? (
          <Button type="primary" disabled={!canNext()} onClick={() => setStep(s => s + 1)}>
            Next →
          </Button>
        ) : (
          <Button type="primary" onClick={handleFinish}>Complete Registration</Button>
        )}
      </div>
    </div>
  )
}

/* ── Tab 4: Dynamic Form ──────────────────────────── */

function DynamicFormDemo() {
  return (
    <div className="forms-section">
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        Add and remove form fields dynamically. Each team member entry has its own validation.
      </p>
      <Form
        layout="vertical"
        initialValues={{ teamName: 'Dream Team', members: [{ name: '', role: 'dev', email: '' }] }}
        onFinish={(values) => notification.success('Team saved!', JSON.stringify(values, null, 2))}
      >
        <Field name="teamName" label="Team Name" required rules={[{ required: true }]}>
          {(field) => <Input value={field.value as string ?? ''} onChange={field.onChange} onBlur={field.onBlur} placeholder="Team name" />}
        </Field>

        <FormList name="members">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0 }}>Team Members ({fields.length})</h4>
                <Button size="small" onClick={() => add({ name: '', role: 'dev', email: '' })}>+ Add Member</Button>
              </div>
              {fields.map((f, idx) => (
                <div key={f.key} className="dynamic-member-row">
                  <span className="dynamic-member-num">{idx + 1}</span>
                  <Field name={`members.${idx}.name`} rules={[{ required: true, message: 'Name required' }]}>
                    {(field) => (
                      <Input
                        value={field.value as string ?? ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="Name"
                      />
                    )}
                  </Field>
                  <Field name={`members.${idx}.email`} rules={[{ type: 'email', message: 'Invalid email' }]}>
                    {(field) => (
                      <Input
                        value={field.value as string ?? ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="Email"
                      />
                    )}
                  </Field>
                  <Field name={`members.${idx}.role`}>
                    {(field) => (
                      <Select
                        value={field.value as string ?? 'dev'}
                        onChange={field.onChange}
                        options={[
                          { label: 'Developer', value: 'dev' },
                          { label: 'Designer', value: 'design' },
                          { label: 'PM', value: 'pm' },
                          { label: 'QA', value: 'qa' },
                        ]}
                        style={{ width: 140 }}
                      />
                    )}
                  </Field>
                  <Button
                    size="small"
                    disabled={fields.length <= 1}
                    onClick={() => remove(idx)}
                    style={{ flexShrink: 0 }}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </FormList>

        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          <Button type="primary" htmlType="submit">Save Team</Button>
          <Button htmlType="reset">Reset</Button>
        </div>
      </Form>
    </div>
  )
}

/* ── Tab 5: Form Layouts ──────────────────────────── */

function LayoutsDemo() {
  const [layout, setLayout] = useState<'vertical' | 'horizontal' | 'inline'>('vertical')
  const [sizeMode, setSizeMode] = useState<'small' | 'middle' | 'large'>('middle')
  const [requiredMark, setRequiredMark] = useState<boolean | 'optional'>(true)

  return (
    <div className="forms-section">
      <div className="forms-toolbar">
        <div>
          <label className="forms-label">Layout</label>
          <Segmented
            value={layout}
            onChange={(v) => setLayout(v as typeof layout)}
            options={['vertical', 'horizontal', 'inline']}
          />
        </div>
        <div>
          <label className="forms-label">Size</label>
          <Segmented
            value={sizeMode}
            onChange={(v) => setSizeMode(v as typeof sizeMode)}
            options={['small', 'middle', 'large']}
          />
        </div>
        <div>
          <label className="forms-label">Required Mark</label>
          <Segmented
            value={String(requiredMark)}
            onChange={(v) => setRequiredMark(v === 'true' ? true : v === 'optional' ? 'optional' : false)}
            options={[
              { label: 'Show', value: 'true' },
              { label: 'Optional', value: 'optional' },
              { label: 'Hide', value: 'false' },
            ]}
          />
        </div>
      </div>

      <div style={{ border: '1px solid var(--sg-color-border-secondary)', borderRadius: 8, padding: 24, marginTop: 16 }}>
        <Form
          layout={layout}
          size={sizeMode}
          requiredMark={requiredMark}
          labelCol={layout === 'horizontal' ? { span: 6 } : undefined}
          wrapperCol={layout === 'horizontal' ? { span: 18 } : undefined}
          onFinish={(values) => notification.success('Submitted', JSON.stringify(values))}
        >
          <Field name="firstName" label="First Name" required>
            {(f) => <Input value={f.value as string ?? ''} onChange={f.onChange} onBlur={f.onBlur} placeholder="John" />}
          </Field>
          <Field name="lastName" label="Last Name" required>
            {(f) => <Input value={f.value as string ?? ''} onChange={f.onChange} onBlur={f.onBlur} placeholder="Doe" />}
          </Field>
          <Field name="dept" label="Department">
            {(f) => (
              <Select
                value={f.value as string}
                onChange={f.onChange}
                options={[
                  { label: 'Engineering', value: 'eng' },
                  { label: 'Design', value: 'design' },
                  { label: 'Marketing', value: 'marketing' },
                ]}
                placeholder="Select..."
              />
            )}
          </Field>
          <Field name="active" label="Active">
            {(f) => <Switch checked={f.value as boolean} onChange={f.onChange} />}
          </Field>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, marginLeft: layout === 'horizontal' ? '25%' : 0 }}>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button htmlType="reset">Reset</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

/* ── Tab 6: Interactive Playground ─────────────────── */

function PlaygroundDemo() {
  const [pinValue, setPinValue] = useState('')
  const [verified, setVerified] = useState(false)
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [searchLoading, setSearchLoading] = useState(false)

  const allItems = [
    'React Components', 'TypeScript Generics', 'CSS Grid Layout', 'Form Validation',
    'State Management', 'API Integration', 'Unit Testing', 'Performance Optimization',
    'Responsive Design', 'Accessibility', 'Dark Mode', 'Animation Library',
  ]

  const handleSearch = (q: string) => {
    if (!q.trim()) { setSearchResults([]); return }
    setSearchLoading(true)
    setTimeout(() => {
      const res = allItems.filter(i => i.toLowerCase().includes(q.toLowerCase()))
      setSearchResults(res)
      setSearchLoading(false)
    }, 500)
  }

  return (
    <div className="forms-section">
      <div className="playground-grid">
        <div className="playground-card">
          <h4>OTP Verification</h4>
          <p>Enter the 6-digit code sent to your email.</p>
          {!verified ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <PinInput
                  value={pinValue}
                  onChange={setPinValue}
                  onComplete={() => { setVerified(true); notification.success('Code verified!') }}
                  length={6}
                  size="large"
                  autoFocus
                />
              </div>
              <div style={{ textAlign: 'center', color: 'var(--sg-color-text-tertiary)' }}>
                {pinValue.replace(/ /g, '').length}/6 digits entered
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: 20 }}>
              <div style={{ fontSize: 32, color: 'var(--sg-color-success)' }}>✓</div>
              <p>Verified successfully!</p>
              <Button size="small" onClick={() => { setVerified(false); setPinValue('') }}>Try again</Button>
            </div>
          )}
        </div>

        <div className="playground-card">
          <h4>Live Search</h4>
          <p>Search through items with instant results.</p>
          <SearchInput
            placeholder="Search topics..."
            loading={searchLoading}
            onSearch={handleSearch}
            onChange={(v) => { if (!v) setSearchResults([]) }}
            enterButton="Search"
          />
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map(r => (
                <div key={r} className="search-result-item">{r}</div>
              ))
            ) : (
              <div style={{ color: 'var(--sg-color-text-quaternary)', textAlign: 'center', padding: 16 }}>
                Type something and hit Search
              </div>
            )}
          </div>
        </div>

        <div className="playground-card" style={{ gridColumn: 'span 2' }}>
          <h4>Password Strength Checker</h4>
          <p>Try different passwords to see real-time strength analysis.</p>
          <div className="forms-grid" style={{ marginTop: 12 }}>
            <div className="forms-cell">
              <label className="forms-label">Weak example</label>
              <InputPassword showStrength defaultValue="abc" placeholder="Weak password" />
            </div>
            <div className="forms-cell">
              <label className="forms-label">Medium example</label>
              <InputPassword showStrength defaultValue="Hello123" placeholder="Medium password" />
            </div>
            <div className="forms-cell">
              <label className="forms-label">Strong example</label>
              <InputPassword showStrength defaultValue="MyP@ss2024!" placeholder="Strong password" />
            </div>
            <div className="forms-cell">
              <label className="forms-label">Try your own</label>
              <InputPassword showStrength placeholder="Type anything..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Tab 7: Login / Register Mockups ──────────────── */

function MockupsDemo() {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login')

  return (
    <div className="forms-section">
      <div className="mockup-container">
        <div className="mockup-card">
          <div className="mockup-header">
            <div style={{ fontSize: 24, fontWeight: 700 }}>SkyGraph</div>
            <Segmented
              value={mode}
              onChange={(v) => setMode(v as typeof mode)}
              options={[
                { label: 'Login', value: 'login' },
                { label: 'Register', value: 'register' },
                { label: 'Forgot', value: 'forgot' },
              ]}
              size="small"
            />
          </div>

          {mode === 'login' && (
            <Form
              layout="vertical"
              onFinish={(v) => notification.success('Login success (mock)', JSON.stringify(v))}
            >
              <Field name="email" label="Email" required rules={[{ required: true }, { type: 'email' }]}>
                {(f) => <Input value={f.value as string ?? ''} onChange={f.onChange} onBlur={f.onBlur} placeholder="you@email.com" />}
              </Field>
              <Field name="password" label="Password" required rules={[{ required: true }]}>
                {(f) => <InputPassword value={f.value as string ?? ''} onChange={f.onChange} onBlur={f.onBlur} placeholder="Your password" />}
              </Field>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0' }}>
                <Checkbox>Remember me</Checkbox>
                <a style={{ fontSize: 13, color: 'var(--sg-color-primary)', cursor: 'pointer' }} onClick={() => setMode('forgot')}>Forgot password?</a>
              </div>
              <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 8 }}>Sign In</Button>
            </Form>
          )}

          {mode === 'register' && (
            <Form
              layout="vertical"
              onFinish={(v) => notification.success('Registered (mock)', JSON.stringify(v))}
            >
              <div className="forms-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="forms-cell">
                  <Field name="firstName" label="First Name" required rules={[{ required: true }]}>
                    {(f) => <Input value={f.value as string ?? ''} onChange={f.onChange} onBlur={f.onBlur} placeholder="Jane" />}
                  </Field>
                </div>
                <div className="forms-cell">
                  <Field name="lastName" label="Last Name" required rules={[{ required: true }]}>
                    {(f) => <Input value={f.value as string ?? ''} onChange={f.onChange} onBlur={f.onBlur} placeholder="Doe" />}
                  </Field>
                </div>
              </div>
              <Field name="email" label="Email" required rules={[{ required: true }, { type: 'email' }]}>
                {(f) => <Input value={f.value as string ?? ''} onChange={f.onChange} onBlur={f.onBlur} placeholder="jane@example.com" />}
              </Field>
              <Field name="password" label="Password" required rules={[{ required: true }, { min: 8 }]}>
                {(f) => <InputPassword value={f.value as string ?? ''} onChange={f.onChange} onBlur={f.onBlur} placeholder="Min 8 characters" showStrength />}
              </Field>
              <Field name="agree" required rules={[{ validator: (v) => v ? null : 'Required' }]}>
                {(f) => <Checkbox checked={f.value as boolean} onChange={f.onChange}>I agree to Terms & Privacy Policy</Checkbox>}
              </Field>
              <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 8 }}>Create Account</Button>
            </Form>
          )}

          {mode === 'forgot' && (
            <Form
              layout="vertical"
              onFinish={(v) => notification.success('Reset link sent (mock)', JSON.stringify(v))}
            >
              <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16, fontSize: 13 }}>
                Enter your email and we'll send you a reset link.
              </p>
              <Field name="email" label="Email" required rules={[{ required: true }, { type: 'email' }]}>
                {(f) => <Input value={f.value as string ?? ''} onChange={f.onChange} onBlur={f.onBlur} placeholder="you@email.com" />}
              </Field>
              <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 8 }}>Send Reset Link</Button>
              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <a style={{ fontSize: 13, color: 'var(--sg-color-primary)', cursor: 'pointer' }} onClick={() => setMode('login')}>← Back to login</a>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Main App ─────────────────────────────────────── */

export function FormsApp() {
  const [activeTab, setActiveTab] = useState('gallery')

  const tabs: TabItem[] = [
    { key: 'gallery', label: 'All Controls', children: <ControlsGallery /> },
    { key: 'validation', label: 'Validation', children: <ValidationDemo /> },
    { key: 'wizard', label: 'Multi-step Wizard', children: <WizardDemo /> },
    { key: 'dynamic', label: 'Dynamic Form', children: <DynamicFormDemo /> },
    { key: 'layouts', label: 'Layouts', children: <LayoutsDemo /> },
    { key: 'playground', label: 'Playground', children: <PlaygroundDemo /> },
    { key: 'mockups', label: 'Login/Register', children: <MockupsDemo /> },
  ]

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <style>{formsStyles}</style>
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  )
}

const formsStyles = `
.forms-gallery h3 {
  margin: 24px 0 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--sg-color-text-secondary);
  border-bottom: 1px solid var(--sg-color-border-secondary);
  padding-bottom: 6px;
}
.forms-gallery h3:first-child {
  margin-top: 0;
}
.forms-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.forms-cell {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.forms-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--sg-color-text-secondary);
}
.forms-section {
  padding: 4px 0;
}
.forms-toolbar {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: flex-end;
}
.forms-toolbar > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Wizard */
.wizard-content {
  min-height: 200px;
}
.wizard-actions {
  display: flex;
  gap: 8px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--sg-color-border-secondary);
}
.wizard-review {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.wizard-review-section h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--sg-color-text-secondary);
}
.wizard-review-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  font-size: 13px;
}
.wizard-review-row > span:first-child {
  color: var(--sg-color-text-secondary);
}

/* Dynamic form */
.dynamic-member-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius);
  background: var(--sg-color-bg-secondary);
}
.dynamic-member-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 32px;
  font-size: 12px;
  font-weight: 600;
  color: var(--sg-color-text-tertiary);
  flex-shrink: 0;
}
.dynamic-member-row .sg-field {
  flex: 1;
  margin: 0;
}

/* Playground */
.playground-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.playground-card {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius-lg);
  padding: 20px;
}
.playground-card h4 {
  margin: 0 0 4px;
  font-size: 15px;
}
.playground-card > p {
  color: var(--sg-color-text-secondary);
  font-size: 13px;
  margin: 0 0 12px;
}
.search-results {
  margin-top: 12px;
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius);
  max-height: 200px;
  overflow-y: auto;
}
.search-result-item {
  padding: 8px 12px;
  font-size: 13px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  transition: background var(--sg-transition-duration);
}
.search-result-item:last-child {
  border-bottom: none;
}
.search-result-item:hover {
  background: var(--sg-color-bg-hover);
}

/* Mockups */
.mockup-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
.mockup-card {
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius-lg);
  padding: 32px;
  background: var(--sg-color-bg-container);
  box-shadow: var(--sg-shadow);
}
.mockup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
`
