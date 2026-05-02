import { useState } from 'react'
import {
  Button, Input, Select, Segmented, Form, Field, FormList,
  InputPassword, SearchInput, PinInput, notification,
} from '@skygraph/react'

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
                      <Input value={field.value as string ?? ''} onChange={field.onChange} onBlur={field.onBlur} placeholder="Name" />
                    )}
                  </Field>
                  <Field name={`members.${idx}.email`} rules={[{ type: 'email', message: 'Invalid email' }]}>
                    {(field) => (
                      <Input value={field.value as string ?? ''} onChange={field.onChange} onBlur={field.onBlur} placeholder="Email" />
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

export function DynamicTab() {
  const [section, setSection] = useState<'lists' | 'playground'>('lists')

  return (
    <div className="forms-section">
      <Segmented
        value={section}
        onChange={(v) => setSection(v as typeof section)}
        options={[
          { label: 'Dynamic field arrays', value: 'lists' },
          { label: 'Interactive playground', value: 'playground' },
        ]}
        style={{ marginBottom: 16 }}
      />
      {section === 'lists' ? <DynamicFormDemo /> : <PlaygroundDemo />}
    </div>
  )
}
