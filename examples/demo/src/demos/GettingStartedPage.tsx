export function GettingStartedPage() {
  return (
    <section className="doc-page">
      <h1>Getting Started</h1>
      <p className="doc-lead">
        Get up and running with SkyGraph in under 5 minutes.
      </p>

      <h2 id="installation">Installation</h2>
      <p>Install the core engine and React bindings:</p>
      <pre className="doc-code"><code>npm install @skygraph/core @skygraph/react</code></pre>
      <p>Or with pnpm:</p>
      <pre className="doc-code"><code>pnpm add @skygraph/core @skygraph/react</code></pre>

      <h2 id="import-styles">Import Styles</h2>
      <p>
        SkyGraph ships a default theme via CSS. Import it once at the root of your app:
      </p>
      <pre className="doc-code"><code>{`import '@skygraph/react/styles'`}</code></pre>
      <p>
        This gives you the full design system — palette, spacing, typography, and
        component tokens. You can override any variable (see{' '}
        <a href="#/theming" className="doc-link">Theming</a>).
      </p>

      <h2 id="basic-form">Basic Form Example</h2>
      <p>
        SkyGraph's reactive core powers forms out of the box — validation,
        dependencies, and dynamic fields with zero boilerplate:
      </p>
      <pre className="doc-code"><code>{`import { Form, Field, SubmitButton } from '@skygraph/react'

function LoginForm() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ email: '', password: '' }}
      onSubmit={(values) => console.log(values)}
    >
      <Field
        name="email"
        label="Email"
        rules={[{ required: true }, { type: 'email' }]}
      />
      <Field
        name="password"
        label="Password"
        type="password"
        rules={[{ required: true }, { min: 6 }]}
      />
      <SubmitButton>Log in</SubmitButton>
    </Form>
  )
}`}</code></pre>

      <h2 id="individual-components">Using Individual Components</h2>
      <p>
        Every component works standalone — no provider or context required:
      </p>
      <pre className="doc-code"><code>{`import { Button, Switch, Select } from '@skygraph/react'

function App() {
  return (
    <>
      <Button type="primary">Click me</Button>
      <Switch checked={false} onChange={(v) => {}} />
      <Select
        options={[
          { label: 'React', value: 'react' },
          { label: 'Vue', value: 'vue' },
        ]}
        placeholder="Pick a framework"
      />
    </>
  )
}`}</code></pre>

      <h2 id="whats-next">What's Next</h2>
      <div className="doc-card-row">
        <a href="#/theming" className="doc-next-card">
          <strong>Theming</strong>
          <span>CSS variables, dark mode, custom palettes</span>
        </a>
        <a href="#/core-api" className="doc-next-card">
          <strong>Core API</strong>
          <span>createCore, createForm, createTable, createTree</span>
        </a>
        <a href="#/components/button" className="doc-next-card">
          <strong>Components</strong>
          <span>Browse 35+ ready-made UI components</span>
        </a>
      </div>
    </section>
  )
}
