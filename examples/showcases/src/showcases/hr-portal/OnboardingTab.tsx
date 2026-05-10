import {
  Collapse,
  Form,
  Field,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Steps,
  notification,
} from '@skygraph/react'
import { useState } from 'react'
import { useAppLocale } from '../_shared'

const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance']

export function OnboardingTab() {
  const o = useAppLocale('hrPortal').onboarding
  const [step, setStep] = useState(0)

  return (
    <div style={{ maxWidth: 720 }}>
      <Steps
        current={step}
        items={[
          { title: o.steps.personal },
          { title: o.steps.equipment },
          { title: o.steps.training },
        ]}
        size="small"
      />

      <div style={{ marginTop: 20 }}>
        <Collapse
          items={[
            {
              key: 'personal',
              label: o.panels.personal,
              children: (
                <Form
                  onFinish={(values) => {
                    notification.success(o.toasts.personalSaved, JSON.stringify(values))
                    setStep(1)
                  }}
                >
                  <Field name="fullName" label={o.fields.fullName} rules={[{ required: true }]}>
                    <Input placeholder={o.fields.fullNamePh} />
                  </Field>
                  <Field
                    name="email"
                    label={o.fields.email}
                    rules={[{ required: true, type: 'email' }]}
                  >
                    <Input placeholder={o.fields.emailPh} />
                  </Field>
                  <Field name="department" label={o.fields.department} rules={[{ required: true }]}>
                    <Select
                      options={departments.map((d) => ({ label: d, value: d }))}
                      placeholder={o.fields.deptPh}
                    />
                  </Field>
                  <Field name="role" label={o.fields.role} rules={[{ required: true }]}>
                    <Input placeholder={o.fields.rolePh} />
                  </Field>
                  <Field name="startDate" label={o.fields.startDate}>
                    <DatePicker placeholder={o.fields.datePh} />
                  </Field>
                  <Field name="salary" label={o.fields.salary}>
                    <InputNumber
                      placeholder={o.fields.salaryPh}
                      min={0}
                      style={{ width: '100%' }}
                    />
                  </Field>
                  <Button type="primary" htmlType="submit" style={{ marginTop: 8 }}>
                    {o.continueEquipment}
                  </Button>
                </Form>
              ),
            },
            {
              key: 'equipment',
              label: o.panels.equipment,
              children: (
                <div style={{ fontSize: 13 }}>
                  <p style={{ color: 'var(--sg-color-text-secondary)' }}>{o.equipmentLead}</p>
                  <ul style={{ paddingLeft: 20, marginTop: 8, lineHeight: 2 }}>
                    <li>✓ {o.equipmentList.laptop}</li>
                    <li>✓ {o.equipmentList.email}</li>
                    <li>✓ {o.equipmentList.vpn}</li>
                    <li>○ {o.equipmentList.slack}</li>
                    <li>○ {o.equipmentList.github}</li>
                  </ul>
                  <Button onClick={() => setStep(2)} type="primary" style={{ marginTop: 12 }}>
                    {o.continueTraining}
                  </Button>
                </div>
              ),
            },
            {
              key: 'training',
              label: o.panels.training,
              children: (
                <div
                  style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)', lineHeight: 1.8 }}
                >
                  <p>{o.trainingPlan.week1}</p>
                  <p>{o.trainingPlan.week2}</p>
                  <p>{o.trainingPlan.week3}</p>
                  <p>{o.trainingPlan.week4}</p>
                  <Button
                    onClick={() => {
                      notification.success(o.toasts.complete)
                      setStep(0)
                    }}
                    type="primary"
                    style={{ marginTop: 12 }}
                  >
                    {o.completeBtn}
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
