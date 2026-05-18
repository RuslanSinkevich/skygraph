import { useI18n } from '../i18n'

export function GettingStartedPage() {
  const { t } = useI18n()
  const g = t.gettingStarted

  return (
    <section className="doc-page">
      <h1>{g.title}</h1>
      <p className="doc-lead">{g.lead}</p>

      <h2 id="installation">{g.installation}</h2>
      <p>{g.installLeadNpm}</p>
      <pre className="doc-code">
        <code>npm install skygraph-react</code>
      </pre>
      <p>{g.installLeadPnpm}</p>
      <pre className="doc-code">
        <code>pnpm add skygraph-react</code>
      </pre>

      <h2 id="import-styles">{g.importStyles}</h2>
      <p>{g.importStylesLead}</p>
      <pre className="doc-code">
        <code>{`// styles are loaded automatically by skygraph-react`}</code>
      </pre>
      <p>
        {g.importStylesNote1}
        <a href="#/theming" className="doc-link">
          {g.importStylesNote2Theming}
        </a>
        {').'}
      </p>

      <h2 id="basic-form">{g.basicForm}</h2>
      <p>{g.basicFormLead}</p>
      <pre className="doc-code">
        <code>{`import { Form, Field, SubmitButton } from 'skygraph-react'

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
}`}</code>
      </pre>

      <h2 id="individual-components">{g.individualComponents}</h2>
      <p>{g.individualComponentsLead}</p>
      <pre className="doc-code">
        <code>{`import { Button, Switch, Select } from 'skygraph-react'

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
}`}</code>
      </pre>

      <h2 id="whats-next">{g.whatsNext}</h2>
      <div className="doc-card-row">
        <a href="#/theming" className="doc-next-card">
          <strong>{g.cardThemingTitle}</strong>
          <span>{g.cardThemingDesc}</span>
        </a>
        <a href="#/core-api" className="doc-next-card">
          <strong>{g.cardCoreApiTitle}</strong>
          <span>{g.cardCoreApiDesc}</span>
        </a>
        <a href="#/components/button" className="doc-next-card">
          <strong>{g.cardComponentsTitle}</strong>
          <span>{g.cardComponentsDesc}</span>
        </a>
      </div>
    </section>
  )
}
