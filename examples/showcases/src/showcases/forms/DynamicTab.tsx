import { useState } from 'react'
import {
  Button,
  Input,
  Select,
  Segmented,
  Form,
  Field,
  FormList,
  InputPassword,
  SearchInput,
  PinInput,
  notification,
} from '@skygraph/react'
import { useAppLocale } from '../_shared'

function DynamicFormDemo() {
  const d = useAppLocale('forms').dynamic
  return (
    <div className="forms-section">
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>{d.teamLead}</p>
      <Form
        layout="vertical"
        initialValues={{ teamName: 'Dream Team', members: [{ name: '', role: 'dev', email: '' }] }}
        onFinish={(values) =>
          notification.success(d.teamSavedToast, JSON.stringify(values, null, 2))
        }
      >
        <Field name="teamName" label={d.teamName} required rules={[{ required: true }]}>
          {(field) => (
            <Input
              value={(field.value as string) ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={d.teamNamePlaceholder}
            />
          )}
        </Field>

        <FormList name="members">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <h4 style={{ margin: 0 }}>{d.membersHeading(fields.length)}</h4>
                <Button size="small" onClick={() => add({ name: '', role: 'dev', email: '' })}>
                  {d.addMember}
                </Button>
              </div>
              {fields.map((f, idx) => (
                <div key={f.key} className="dynamic-member-row">
                  <span className="dynamic-member-num">{idx + 1}</span>
                  <Field
                    name={`members.${idx}.name`}
                    rules={[{ required: true, message: d.nameRequired }]}
                  >
                    {(field) => (
                      <Input
                        value={(field.value as string) ?? ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder={d.namePlaceholder}
                      />
                    )}
                  </Field>
                  <Field
                    name={`members.${idx}.email`}
                    rules={[{ type: 'email', message: d.emailInvalid }]}
                  >
                    {(field) => (
                      <Input
                        value={(field.value as string) ?? ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder={d.emailPlaceholder}
                      />
                    )}
                  </Field>
                  <Field name={`members.${idx}.role`}>
                    {(field) => (
                      <Select
                        value={(field.value as string) ?? 'dev'}
                        onChange={field.onChange}
                        options={[
                          { label: d.roles.developer, value: 'dev' },
                          { label: d.roles.designer, value: 'design' },
                          { label: d.roles.pm, value: 'pm' },
                          { label: d.roles.qa, value: 'qa' },
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
          <Button type="primary" htmlType="submit">
            {d.saveTeam}
          </Button>
          <Button htmlType="reset">{d.reset}</Button>
        </div>
      </Form>
    </div>
  )
}

function PlaygroundDemo() {
  const p = useAppLocale('forms').dynamic.playground
  const [pinValue, setPinValue] = useState('')
  const [verified, setVerified] = useState(false)
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [searchLoading, setSearchLoading] = useState(false)

  const allItems = [
    'React Components',
    'TypeScript Generics',
    'CSS Grid Layout',
    'Form Validation',
    'State Management',
    'API Integration',
    'Unit Testing',
    'Performance Optimization',
    'Responsive Design',
    'Accessibility',
    'Dark Mode',
    'Animation Library',
  ]

  const handleSearch = (q: string) => {
    if (!q.trim()) {
      setSearchResults([])
      return
    }
    setSearchLoading(true)
    setTimeout(() => {
      const res = allItems.filter((i) => i.toLowerCase().includes(q.toLowerCase()))
      setSearchResults(res)
      setSearchLoading(false)
    }, 500)
  }

  return (
    <div className="forms-section">
      <div className="playground-grid">
        <div className="playground-card">
          <h4>{p.otpHeading}</h4>
          <p>{p.otpLead}</p>
          {!verified ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <PinInput
                  value={pinValue}
                  onChange={setPinValue}
                  onComplete={() => {
                    setVerified(true)
                    notification.success(p.otpVerified)
                  }}
                  length={6}
                  size="large"
                  autoFocus
                />
              </div>
              <div style={{ textAlign: 'center', color: 'var(--sg-color-text-tertiary)' }}>
                {p.otpProgress(pinValue.replace(/ /g, '').length, 6)}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: 20 }}>
              <div style={{ fontSize: 32, color: 'var(--sg-color-success)' }}>✓</div>
              <p>{p.otpSuccess}</p>
              <Button
                size="small"
                onClick={() => {
                  setVerified(false)
                  setPinValue('')
                }}
              >
                {p.tryAgain}
              </Button>
            </div>
          )}
        </div>

        <div className="playground-card">
          <h4>{p.searchHeading}</h4>
          <p>{p.searchLead}</p>
          <SearchInput
            placeholder={p.searchPlaceholder}
            loading={searchLoading}
            onSearch={handleSearch}
            onChange={(v) => {
              if (!v) setSearchResults([])
            }}
            enterButton={p.searchButton}
          />
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((r) => (
                <div key={r} className="search-result-item">
                  {r}
                </div>
              ))
            ) : (
              <div
                style={{
                  color: 'var(--sg-color-text-quaternary)',
                  textAlign: 'center',
                  padding: 16,
                }}
              >
                {p.searchEmpty}
              </div>
            )}
          </div>
        </div>

        <div className="playground-card" style={{ gridColumn: 'span 2' }}>
          <h4>{p.passwordHeading}</h4>
          <p>{p.passwordLead}</p>
          <div className="forms-grid" style={{ marginTop: 12 }}>
            <div className="forms-cell">
              <label className="forms-label">{p.weakLabel}</label>
              <InputPassword showStrength defaultValue="abc" placeholder={p.weakPlaceholder} />
            </div>
            <div className="forms-cell">
              <label className="forms-label">{p.mediumLabel}</label>
              <InputPassword
                showStrength
                defaultValue="Hello123"
                placeholder={p.mediumPlaceholder}
              />
            </div>
            <div className="forms-cell">
              <label className="forms-label">{p.strongLabel}</label>
              <InputPassword
                showStrength
                defaultValue="MyP@ss2024!"
                placeholder={p.strongPlaceholder}
              />
            </div>
            <div className="forms-cell">
              <label className="forms-label">{p.tryYourOwnLabel}</label>
              <InputPassword showStrength placeholder={p.tryYourOwnPlaceholder} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DynamicTab() {
  const d = useAppLocale('forms').dynamic
  const [section, setSection] = useState<'lists' | 'playground'>('lists')

  return (
    <div className="forms-section">
      <Segmented
        value={section}
        onChange={(v) => setSection(v as typeof section)}
        options={[
          { label: d.sections.lists, value: 'lists' },
          { label: d.sections.playground, value: 'playground' },
        ]}
        style={{ marginBottom: 16 }}
      />
      {section === 'lists' ? <DynamicFormDemo /> : <PlaygroundDemo />}
    </div>
  )
}
