import { useState } from 'react'
import {
  Button, Input, Checkbox, RadioGroup, Switch, Segmented, TagInput,
  InputGroup, Steps, Tag, notification,
} from '@skygraph/react'

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
  fullName: '',
  email: '',
  phone: '',
  company: '',
  position: '',
  skills: [],
  experience: 'junior',
  plan: 'free',
  notifications: true,
  newsletter: false,
}

export function SchemaTab() {
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
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16, fontSize: 13 }}>
        Multi-step schema-driven registration: each step has its own data shape and gating rules,
        with a structured review before submit.
      </p>
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
                  <span>{data.skills.length > 0
                    ? data.skills.map(s => <Tag key={s} color="processing" style={{ margin: '0 2px' }}>{s}</Tag>)
                    : '—'}</span>
                </div>
                <div className="wizard-review-row">
                  <span>Experience</span>
                  <span style={{ textTransform: 'capitalize' }}>{data.experience}</span>
                </div>
              </div>
              <div className="wizard-review-section">
                <h4>Preferences</h4>
                <div className="wizard-review-row">
                  <span>Plan</span>
                  <Tag color={data.plan === 'enterprise' ? 'warning' : data.plan === 'pro' ? 'processing' : 'default'}>
                    {data.plan}
                  </Tag>
                </div>
                <div className="wizard-review-row">
                  <span>Notifications</span><span>{data.notifications ? '✓ Enabled' : '✕ Disabled'}</span>
                </div>
                <div className="wizard-review-row">
                  <span>Newsletter</span><span>{data.newsletter ? '✓ Subscribed' : '✕ No'}</span>
                </div>
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
