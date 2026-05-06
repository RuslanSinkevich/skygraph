import { Form, Field, SubmitButton } from '@skygraph/react'
import './styles.css'

/**
 * The same form store is composed across **three nested components**:
 * root owns `<Form>`, the middle tier renders layout chrome, the leaf only
 * registers `<Field>` nodes by path — values are not threaded via props.
 *
 * `defaultValues` keys must match `name` on each `<Field>` (flat store).
 */

/** Level 3 — leaf: fields only (reads Form context from ancestors). */
function ProfileFieldsLeaf() {
  return (
    <div className="demo-form-grid-2">
      <Field name="account_name" label="Display name" rules={[{ required: true }]} />
      <Field
        name="account_role"
        label="Role"
        placeholder="e.g. Owner"
        rules={[{ required: true }]}
      />
    </div>
  )
}

/**
 * Level 2 — sits under the root `<Form>` and wraps the leaf.
 * Could live in another file in a real app; works unchanged.
 */
function AccountSection() {
  return (
    <section className="demo-distributed-panel" aria-labelledby="distributed-account-title">
      <div id="distributed-account-title" className="demo-distributed-panel-title">
        Account
      </div>
      <p className="demo-distributed-panel-sub">
        Middle tier: layout + title; fields come from a nested child component.
      </p>
      <ProfileFieldsLeaf />
    </section>
  )
}

/** Level 1 — owns `<Form>` and nests level 2 (which contains level 3). */
export function DistributedCompositionForm() {
  return (
    <Form
      layout="vertical"
      defaultValues={{
        account_name: 'Ada Lovelace',
      }}
      onSubmit={(values) => console.log('distributed form', values)}
      style={{ maxWidth: 520 }}
    >
      <AccountSection />
      <SubmitButton>Save</SubmitButton>
    </Form>
  )
}
