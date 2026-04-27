import { Form, Field, SubmitButton } from '@skygraph/react'
import './styles.css'

/**
 * Real-world styling example: centred login card. All layout lives in a
 * plain `.demo-login-card` wrapper — the form itself stays semantic and
 * untouched, which keeps it fully reusable.
 */
export function LoginCardForm() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
      <Form
        layout="vertical"
        className="demo-login-card"
        defaultValues={{ email: '', password: '', remember: false }}
        onSubmit={(values) => console.log('login', values)}
      >
        <div>
          <h3 className="demo-login-card-title">Welcome back</h3>
          <p className="demo-login-card-sub">Sign in to your SkyGraph account</p>
        </div>

        <Field
          name="email"
          label="Email"
          type="email"
          rules={[{ required: true }, { type: 'email' }]}
          placeholder="you@example.com"
        />
        <Field
          name="password"
          label="Password"
          type="password"
          rules={[{ required: true }, { min: 6 }]}
          placeholder="••••••••"
        />

        <div className="demo-login-card-links">
          <span />
          <a href="#forgot" onClick={(e) => e.preventDefault()}>Forgot password?</a>
        </div>

        <SubmitButton style={{ width: '100%' }}>Sign in</SubmitButton>

        <div className="demo-login-card-links" style={{ justifyContent: 'center' }}>
          <span style={{ color: 'var(--sg-color-text-tertiary)' }}>
            New here?&nbsp;
            <a href="#signup" onClick={(e) => e.preventDefault()}>Create an account</a>
          </span>
        </div>
      </Form>
    </div>
  )
}
