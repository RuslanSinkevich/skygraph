import { useState } from 'react'
import {
  Button, Input, InputNumber, Textarea, Select, Checkbox, Segmented,
  Form, Field, InputPassword, InputGroup, notification,
} from '@skygraph/react'

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
              rules={[{ type: 'number', min: 18, max: 120, message: 'Must be 18-120' }]}
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
            <Field name="role" label="Role" required rules={[{ required: true, message: 'Select a role' }]}>
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
            <Form layout="vertical" onFinish={(v) => notification.success('Login success (mock)', JSON.stringify(v))}>
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
            <Form layout="vertical" onFinish={(v) => notification.success('Registered (mock)', JSON.stringify(v))}>
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
                {(f) => <Checkbox checked={f.value as boolean} onChange={f.onChange}>I agree to Terms &amp; Privacy Policy</Checkbox>}
              </Field>
              <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 8 }}>Create Account</Button>
            </Form>
          )}

          {mode === 'forgot' && (
            <Form layout="vertical" onFinish={(v) => notification.success('Reset link sent (mock)', JSON.stringify(v))}>
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

export function ValidationTab() {
  const [section, setSection] = useState<'rules' | 'auth-forms'>('rules')

  return (
    <div className="forms-section">
      <Segmented
        value={section}
        onChange={(v) => setSection(v as typeof section)}
        options={[
          { label: 'Rules & feedback', value: 'rules' },
          { label: 'Auth form templates', value: 'auth-forms' },
        ]}
        style={{ marginBottom: 16 }}
      />
      {section === 'rules' ? <ValidationDemo /> : <MockupsDemo />}
    </div>
  )
}
