import { useState } from 'react'
import {
  Button,
  Input,
  Checkbox,
  RadioGroup,
  Switch,
  Segmented,
  TagInput,
  InputGroup,
  Steps,
  Tag,
  notification,
} from '@skygraph/react'
import { useAppLocale } from '../_shared'

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
  const s = useAppLocale('forms').schema
  const f = s.fields
  const [step, setStep] = useState(0)
  const [data, setData] = useState<WizardData>(defaultWizard)
  const [completed, setCompleted] = useState(false)

  const patch = (partial: Partial<WizardData>) => setData((d) => ({ ...d, ...partial }))

  const canNext = () => {
    if (step === 0) return data.fullName.length >= 2 && data.email.includes('@')
    if (step === 1) return data.company.length >= 1
    return true
  }

  const handleFinish = () => {
    setCompleted(true)
    notification.success(s.completedToast, JSON.stringify(data, null, 2))
  }

  const planLabel = (plan: string): string => {
    if (plan === 'free') return f.planOptions.free
    if (plan === 'pro') return f.planOptions.pro
    if (plan === 'enterprise') return f.planOptions.enterprise
    return plan
  }
  const expLabel = (exp: string): string => {
    if (exp === 'junior') return f.experienceLevels.junior
    if (exp === 'middle') return f.experienceLevels.middle
    if (exp === 'senior') return f.experienceLevels.senior
    if (exp === 'lead') return f.experienceLevels.lead
    return exp
  }

  if (completed) {
    return (
      <div className="forms-section" style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3>{s.completedHeading}</h3>
        <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 20 }}>
          {s.completedLead(data.fullName, planLabel(data.plan))}
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <Button
            type="primary"
            onClick={() => {
              setStep(0)
              setData(defaultWizard)
              setCompleted(false)
            }}
          >
            {s.startOver}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="forms-section">
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16, fontSize: 13 }}>
        {s.intro}
      </p>
      <Steps
        current={step}
        items={[
          { title: s.steps.personal },
          { title: s.steps.professional },
          { title: s.steps.preferences },
          { title: s.steps.review },
        ]}
      />
      <div className="wizard-content">
        {step === 0 && (
          <div className="forms-grid" style={{ marginTop: 24 }}>
            <div className="forms-cell">
              <label className="forms-label">{f.fullName}</label>
              <Input
                value={data.fullName}
                onChange={(v) => patch({ fullName: v })}
                placeholder={f.fullNamePh}
              />
            </div>
            <div className="forms-cell">
              <label className="forms-label">{f.email}</label>
              <Input
                value={data.email}
                onChange={(v) => patch({ email: v })}
                placeholder={f.emailPh}
              />
            </div>
            <div className="forms-cell">
              <label className="forms-label">{f.phone}</label>
              <InputGroup before="+1">
                <Input
                  value={data.phone}
                  onChange={(v) => patch({ phone: v })}
                  placeholder={f.phonePh}
                />
              </InputGroup>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="forms-grid" style={{ marginTop: 24 }}>
            <div className="forms-cell">
              <label className="forms-label">{f.company}</label>
              <Input
                value={data.company}
                onChange={(v) => patch({ company: v })}
                placeholder={f.companyPh}
              />
            </div>
            <div className="forms-cell">
              <label className="forms-label">{f.position}</label>
              <Input
                value={data.position}
                onChange={(v) => patch({ position: v })}
                placeholder={f.positionPh}
              />
            </div>
            <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
              <label className="forms-label">{f.skills}</label>
              <TagInput
                value={data.skills}
                onChange={(v) => patch({ skills: v })}
                placeholder={f.skillsPh}
                maxTags={10}
              />
            </div>
            <div className="forms-cell">
              <label className="forms-label">{f.experience}</label>
              <Segmented
                value={data.experience}
                onChange={(v) => patch({ experience: v as string })}
                options={[
                  { label: f.experienceLevels.junior, value: 'junior' },
                  { label: f.experienceLevels.middle, value: 'middle' },
                  { label: f.experienceLevels.senior, value: 'senior' },
                  { label: f.experienceLevels.lead, value: 'lead' },
                ]}
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="forms-grid" style={{ marginTop: 24 }}>
            <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
              <label className="forms-label">{f.plan}</label>
              <RadioGroup
                value={data.plan}
                onChange={(v) => patch({ plan: String(v) })}
                options={[
                  { label: f.planOptions.free, value: 'free' },
                  { label: f.planOptions.pro, value: 'pro' },
                  { label: f.planOptions.enterprise, value: 'enterprise' },
                ]}
              />
            </div>
            <div className="forms-cell">
              <label className="forms-label">{f.notifications}</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Switch
                  checked={data.notifications}
                  onChange={(v) => patch({ notifications: v })}
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                />
                <span style={{ color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
                  {f.notificationsHelp}
                </span>
              </div>
            </div>
            <div className="forms-cell">
              <label className="forms-label">{f.newsletter}</label>
              <Checkbox checked={data.newsletter} onChange={(v) => patch({ newsletter: v })}>
                {f.newsletterLabel}
              </Checkbox>
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{ marginTop: 24 }}>
            <div className="wizard-review">
              <div className="wizard-review-section">
                <h4>{s.review.personal}</h4>
                <div className="wizard-review-row">
                  <span>{s.review.name}</span>
                  <span>{data.fullName}</span>
                </div>
                <div className="wizard-review-row">
                  <span>{s.review.email}</span>
                  <span>{data.email}</span>
                </div>
                <div className="wizard-review-row">
                  <span>{s.review.phone}</span>
                  <span>{data.phone || '—'}</span>
                </div>
              </div>
              <div className="wizard-review-section">
                <h4>{s.review.professional}</h4>
                <div className="wizard-review-row">
                  <span>{s.review.company}</span>
                  <span>{data.company}</span>
                </div>
                <div className="wizard-review-row">
                  <span>{s.review.position}</span>
                  <span>{data.position || '—'}</span>
                </div>
                <div className="wizard-review-row">
                  <span>{s.review.skills}</span>
                  <span>
                    {data.skills.length > 0
                      ? data.skills.map((skill) => (
                          <Tag key={skill} color="processing" style={{ margin: '0 2px' }}>
                            {skill}
                          </Tag>
                        ))
                      : '—'}
                  </span>
                </div>
                <div className="wizard-review-row">
                  <span>{s.review.experience}</span>
                  <span>{expLabel(data.experience)}</span>
                </div>
              </div>
              <div className="wizard-review-section">
                <h4>{s.review.preferences}</h4>
                <div className="wizard-review-row">
                  <span>{s.review.plan}</span>
                  <Tag
                    color={
                      data.plan === 'enterprise'
                        ? 'warning'
                        : data.plan === 'pro'
                          ? 'processing'
                          : 'default'
                    }
                  >
                    {planLabel(data.plan)}
                  </Tag>
                </div>
                <div className="wizard-review-row">
                  <span>{s.review.notifications}</span>
                  <span>
                    {data.notifications ? `✓ ${s.review.enabled}` : `✕ ${s.review.disabled}`}
                  </span>
                </div>
                <div className="wizard-review-row">
                  <span>{s.review.newsletter}</span>
                  <span>{data.newsletter ? `✓ ${s.review.subscribed}` : `✕ ${s.review.no}`}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="wizard-actions">
        {step > 0 && <Button onClick={() => setStep((st) => st - 1)}>{s.back}</Button>}
        <div style={{ flex: 1 }} />
        {step < 3 ? (
          <Button type="primary" disabled={!canNext()} onClick={() => setStep((st) => st + 1)}>
            {s.next}
          </Button>
        ) : (
          <Button type="primary" onClick={handleFinish}>
            {s.completeBtn}
          </Button>
        )}
      </div>
    </div>
  )
}
