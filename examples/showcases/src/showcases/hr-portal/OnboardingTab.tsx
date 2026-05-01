import {
  Collapse, Form, Field, Input, Select, DatePicker, InputNumber, Button, Steps, notification,
} from '@skygraph/react'
import { useState } from 'react'

const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance']

export function OnboardingTab() {
  const [step, setStep] = useState(0)

  return (
    <div style={{ maxWidth: 720 }}>
      <Steps
        current={step}
        items={[
          { title: 'Personal' },
          { title: 'Equipment' },
          { title: 'Training' },
        ]}
        size="small"
      />

      <div style={{ marginTop: 20 }}>
        <Collapse
          items={[
            {
              key: 'personal',
              label: 'Personal Information',
              children: (
                <Form onFinish={(values) => {
                  notification.success('Personal info saved (mock)', JSON.stringify(values))
                  setStep(1)
                }}>
                  <Field name="fullName" label="Full Name" rules={[{ required: true }]}>
                    <Input placeholder="John Doe" />
                  </Field>
                  <Field name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input placeholder="john@company.com" />
                  </Field>
                  <Field name="department" label="Department" rules={[{ required: true }]}>
                    <Select options={departments.map(d => ({ label: d, value: d }))} placeholder="Select department" />
                  </Field>
                  <Field name="role" label="Role" rules={[{ required: true }]}>
                    <Input placeholder="Frontend Developer" />
                  </Field>
                  <Field name="startDate" label="Start Date">
                    <DatePicker placeholder="Select date" />
                  </Field>
                  <Field name="salary" label="Salary">
                    <InputNumber placeholder="50000" min={0} style={{ width: '100%' }} />
                  </Field>
                  <Button type="primary" htmlType="submit" style={{ marginTop: 8 }}>Continue → Equipment</Button>
                </Form>
              ),
            },
            {
              key: 'equipment',
              label: 'Equipment & Access',
              children: (
                <div style={{ fontSize: 13 }}>
                  <p style={{ color: 'var(--sg-color-text-secondary)' }}>Provisioning checklist:</p>
                  <ul style={{ paddingLeft: 20, marginTop: 8, lineHeight: 2 }}>
                    <li>✓ Laptop provisioned</li>
                    <li>✓ Email account created</li>
                    <li>✓ VPN access granted</li>
                    <li>○ Slack/Teams invited</li>
                    <li>○ GitHub org added</li>
                  </ul>
                  <Button onClick={() => setStep(2)} type="primary" style={{ marginTop: 12 }}>Continue → Training</Button>
                </div>
              ),
            },
            {
              key: 'training',
              label: 'Training Schedule',
              children: (
                <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)', lineHeight: 1.8 }}>
                  <p>Week 1: Orientation & Company Culture</p>
                  <p>Week 2: Team Processes & Tools</p>
                  <p>Week 3: Product Deep-Dive</p>
                  <p>Week 4: First Assignment</p>
                  <Button
                    onClick={() => { notification.success('Onboarding complete!'); setStep(0) }}
                    type="primary"
                    style={{ marginTop: 12 }}
                  >
                    Complete Onboarding
                  </Button>
                </div>
              ),
            },
          ]}
          defaultActiveKey={['personal']}
        />
      </div>
    </div>
  )
}
