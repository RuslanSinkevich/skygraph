import { useState } from 'react'
import {
  Button,
  Input,
  InputNumber,
  Textarea,
  Select,
  Checkbox,
  Segmented,
  Form,
  Field,
  InputPassword,
  InputGroup,
  notification,
} from '@skygraph/react'
import { useAppLocale } from '../_shared'

function ValidationDemo() {
  const v = useAppLocale('forms').validation
  return (
    <div className="forms-section">
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>{v.rulesLead}</p>
      <Form
        layout="vertical"
        requiredMark
        onFinish={(values) =>
          notification.success(v.submittedToast, JSON.stringify(values, null, 2))
        }
        scrollToFirstError
      >
        <div className="forms-grid">
          <div className="forms-cell">
            <Field
              name="username"
              label={v.fields.username}
              required
              rules={[
                { required: true, message: v.fields.usernameRequired },
                { min: 3, message: v.fields.usernameMin },
                { max: 20, message: v.fields.usernameMax },
                { pattern: /^[a-zA-Z0-9_]+$/, message: v.fields.usernamePattern },
              ]}
              hasFeedback
            >
              {(field) => (
                <Input
                  value={(field.value as string) ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder={v.fields.usernamePlaceholder}
                />
              )}
            </Field>
          </div>
          <div className="forms-cell">
            <Field
              name="email"
              label={v.fields.email}
              required
              rules={[
                { required: true, message: v.fields.emailRequired },
                { type: 'email', message: v.fields.emailInvalid },
              ]}
              hasFeedback
            >
              {(field) => (
                <Input
                  value={(field.value as string) ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder={v.fields.emailPlaceholder}
                />
              )}
            </Field>
          </div>
          <div className="forms-cell">
            <Field
              name="password"
              label={v.fields.password}
              required
              rules={[
                { required: true, message: v.fields.passwordRequired },
                { min: 8, message: v.fields.passwordMin },
              ]}
              hasFeedback
            >
              {(field) => (
                <InputPassword
                  value={(field.value as string) ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder={v.fields.passwordPlaceholder}
                  showStrength
                />
              )}
            </Field>
          </div>
          <div className="forms-cell">
            <Field
              name="age"
              label={v.fields.age}
              rules={[{ type: 'number', min: 18, max: 120, message: v.fields.ageRange }]}
              hasFeedback
            >
              {(field) => (
                <InputNumber
                  value={field.value as number}
                  onChange={(val) => field.onChange(val)}
                  onBlur={field.onBlur}
                  min={0}
                  max={200}
                  placeholder={v.fields.agePlaceholder}
                  style={{ width: '100%' }}
                />
              )}
            </Field>
          </div>
          <div className="forms-cell">
            <Field
              name="website"
              label={v.fields.website}
              rules={[{ type: 'url', message: v.fields.websiteUrl }]}
              help={v.fields.websiteHelp}
              hasFeedback
            >
              {(field) => (
                <InputGroup before="https://">
                  <Input
                    value={(field.value as string) ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={v.fields.websitePlaceholder}
                  />
                </InputGroup>
              )}
            </Field>
          </div>
          <div className="forms-cell">
            <Field
              name="role"
              label={v.fields.role}
              required
              rules={[{ required: true, message: v.fields.rolePick }]}
            >
              {(field) => (
                <Select
                  value={field.value as string}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  options={[
                    { label: v.roleOptions.developer, value: 'dev' },
                    { label: v.roleOptions.designer, value: 'design' },
                    { label: v.roleOptions.manager, value: 'manager' },
                    { label: v.roleOptions.qa, value: 'qa' },
                  ]}
                  placeholder={v.fields.rolePlaceholder}
                />
              )}
            </Field>
          </div>
          <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
            <Field
              name="bio"
              label={v.fields.bio}
              rules={[{ max: 200, message: v.fields.bioMax }]}
              warningRules={[{ min: 20, message: v.fields.bioWarn }]}
              extra={v.fields.bioExtra}
            >
              {(field) => (
                <Textarea
                  value={(field.value as string) ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder={v.fields.bioPlaceholder}
                />
              )}
            </Field>
          </div>
          <div className="forms-cell">
            <Field
              name="agree"
              required
              rules={[{ validator: (val) => (val ? null : v.fields.agreeRequired) }]}
            >
              {(field) => (
                <Checkbox checked={field.value as boolean} onChange={field.onChange}>
                  {v.fields.agree}
                </Checkbox>
              )}
            </Field>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          <Button type="primary" htmlType="submit">
            {v.submit}
          </Button>
          <Button htmlType="reset">{v.reset}</Button>
        </div>
      </Form>
    </div>
  )
}

function MockupsDemo() {
  const v = useAppLocale('forms').validation
  const a = v.auth
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login')

  return (
    <div className="forms-section">
      <div className="mockup-container">
        <div className="mockup-card">
          <div className="mockup-header">
            <div style={{ fontSize: 24, fontWeight: 700 }}>{a.brand}</div>
            <Segmented
              value={mode}
              onChange={(val) => setMode(val as typeof mode)}
              options={[
                { label: a.modes.login, value: 'login' },
                { label: a.modes.register, value: 'register' },
                { label: a.modes.forgot, value: 'forgot' },
              ]}
              size="small"
            />
          </div>

          {mode === 'login' && (
            <Form
              layout="vertical"
              onFinish={(values) => notification.success(a.loginToast, JSON.stringify(values))}
            >
              <Field
                name="email"
                label={a.loginEmail}
                required
                rules={[{ required: true }, { type: 'email' }]}
              >
                {(f) => (
                  <Input
                    value={(f.value as string) ?? ''}
                    onChange={f.onChange}
                    onBlur={f.onBlur}
                    placeholder={a.loginEmailPlaceholder}
                  />
                )}
              </Field>
              <Field name="password" label={a.loginPassword} required rules={[{ required: true }]}>
                {(f) => (
                  <InputPassword
                    value={(f.value as string) ?? ''}
                    onChange={f.onChange}
                    onBlur={f.onBlur}
                    placeholder={a.loginPasswordPlaceholder}
                  />
                )}
              </Field>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '8px 0',
                }}
              >
                <Checkbox>{a.rememberMe}</Checkbox>
                <a
                  style={{ fontSize: 13, color: 'var(--sg-color-primary)', cursor: 'pointer' }}
                  onClick={() => setMode('forgot')}
                >
                  {a.forgotLink}
                </a>
              </div>
              <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 8 }}>
                {a.signIn}
              </Button>
            </Form>
          )}

          {mode === 'register' && (
            <Form
              layout="vertical"
              onFinish={(values) => notification.success(a.registerToast, JSON.stringify(values))}
            >
              <div className="forms-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="forms-cell">
                  <Field name="firstName" label={a.firstName} required rules={[{ required: true }]}>
                    {(f) => (
                      <Input
                        value={(f.value as string) ?? ''}
                        onChange={f.onChange}
                        onBlur={f.onBlur}
                        placeholder={a.firstNamePlaceholder}
                      />
                    )}
                  </Field>
                </div>
                <div className="forms-cell">
                  <Field name="lastName" label={a.lastName} required rules={[{ required: true }]}>
                    {(f) => (
                      <Input
                        value={(f.value as string) ?? ''}
                        onChange={f.onChange}
                        onBlur={f.onBlur}
                        placeholder={a.lastNamePlaceholder}
                      />
                    )}
                  </Field>
                </div>
              </div>
              <Field
                name="email"
                label={a.loginEmail}
                required
                rules={[{ required: true }, { type: 'email' }]}
              >
                {(f) => (
                  <Input
                    value={(f.value as string) ?? ''}
                    onChange={f.onChange}
                    onBlur={f.onBlur}
                    placeholder={a.regEmailPlaceholder}
                  />
                )}
              </Field>
              <Field
                name="password"
                label={a.loginPassword}
                required
                rules={[{ required: true }, { min: 8 }]}
              >
                {(f) => (
                  <InputPassword
                    value={(f.value as string) ?? ''}
                    onChange={f.onChange}
                    onBlur={f.onBlur}
                    placeholder={a.regPasswordPlaceholder}
                    showStrength
                  />
                )}
              </Field>
              <Field
                name="agree"
                required
                rules={[{ validator: (val) => (val ? null : a.agreeRequired) }]}
              >
                {(f) => (
                  <Checkbox checked={f.value as boolean} onChange={f.onChange}>
                    {a.agreeTerms}
                  </Checkbox>
                )}
              </Field>
              <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 8 }}>
                {a.createAccount}
              </Button>
            </Form>
          )}

          {mode === 'forgot' && (
            <Form
              layout="vertical"
              onFinish={(values) => notification.success(a.resetToast, JSON.stringify(values))}
            >
              <p
                style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16, fontSize: 13 }}
              >
                {a.forgotLead}
              </p>
              <Field
                name="email"
                label={a.loginEmail}
                required
                rules={[{ required: true }, { type: 'email' }]}
              >
                {(f) => (
                  <Input
                    value={(f.value as string) ?? ''}
                    onChange={f.onChange}
                    onBlur={f.onBlur}
                    placeholder={a.loginEmailPlaceholder}
                  />
                )}
              </Field>
              <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 8 }}>
                {a.sendReset}
              </Button>
              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <a
                  style={{ fontSize: 13, color: 'var(--sg-color-primary)', cursor: 'pointer' }}
                  onClick={() => setMode('login')}
                >
                  {a.backToLogin}
                </a>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}

export function ValidationTab() {
  const v = useAppLocale('forms').validation
  const [section, setSection] = useState<'rules' | 'auth-forms'>('rules')

  return (
    <div className="forms-section">
      <Segmented
        value={section}
        onChange={(val) => setSection(val as typeof section)}
        options={[
          { label: v.sections.rules, value: 'rules' },
          { label: v.sections.authForms, value: 'auth-forms' },
        ]}
        style={{ marginBottom: 16 }}
      />
      {section === 'rules' ? <ValidationDemo /> : <MockupsDemo />}
    </div>
  )
}
