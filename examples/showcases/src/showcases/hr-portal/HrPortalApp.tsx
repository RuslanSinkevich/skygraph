import { useState, useMemo } from 'react'
import {
  Table, Tabs, Tag, Button, Input, Select, Tree, Calendar,
  Transfer, Collapse, Segmented, Avatar, Form, Field, DatePicker,
  InputNumber, notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn, TabItem } from '@skygraph/react'
import { employees, orgTree, leaveRecords, transferSource, employeeToRow, leaveToRow } from './data'
import type { Employee } from './data'

const statusColors: Record<string, string> = {
  active: 'success', 'on-leave': 'warning', remote: 'processing', terminated: 'error',
  approved: 'success', pending: 'warning', rejected: 'error',
}

function StatsRow() {
  const active = employees.filter(e => e.status === 'active').length
  const remote = employees.filter(e => e.status === 'remote').length
  const onLeave = employees.filter(e => e.status === 'on-leave').length
  const avgSalary = Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length)
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-card-label">Total Employees</div>
        <div className="stat-card-value">{employees.length}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Active / Remote</div>
        <div className="stat-card-value">{active} / {remote}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">On Leave</div>
        <div className="stat-card-value">{onLeave}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Avg Salary</div>
        <div className="stat-card-value">${(avgSalary / 1000).toFixed(0)}k</div>
      </div>
    </div>
  )
}

function DirectoryTab() {
  const [search, setSearch] = useState('')
  const [view, setView] = useState<string>('table')

  const filtered = useMemo(() => {
    if (!search) return employees
    const q = search.toLowerCase()
    return employees.filter(e => e.name.toLowerCase().includes(q))
  }, [search])

  const tableData = useMemo(() => filtered.map(employeeToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Employee', width: 220, sortable: true,
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar size="small">{String(row.avatar)}</Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{String(val)}</div>
            <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{String(row.email)}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'department', title: 'Department', width: 120, sortable: true,
      filters: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance'].map(d => ({ text: d, value: d })),
      onFilter: (value, row) => row.department === value,
    },
    { key: 'role', title: 'Role', width: 150 },
    {
      key: 'status', title: 'Status', width: 100,
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'On Leave', value: 'on-leave' },
        { text: 'Remote', value: 'remote' },
      ],
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColors[String(val)]}>{String(val)}</Tag>,
    },
    { key: 'startDate', title: 'Start Date', width: 110, sortable: true },
    {
      key: 'salary', title: 'Salary', width: 100, sortable: true, align: 'right',
      render: (val) => `$${Number(val).toLocaleString()}`,
    },
  ]

  return (
    <>
      <div className="sc-toolbar">
        <Input placeholder="Search employees..." value={search} onChange={setSearch} style={{ width: 220 }} />
        <div className="sc-toolbar-spacer" />
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { label: 'Table', value: 'table' },
            { label: 'Cards', value: 'cards' },
          ]}
        />
      </div>
      {view === 'table' ? (
        <Table columns={columns} data={tableData} pageSize={10} size="small" />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {filtered.map(e => (
            <div key={e.id} style={{ border: '1px solid var(--sg-color-border-secondary)', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Avatar size="large">{e.avatar}</Avatar>
              <div style={{ fontWeight: 600 }}>{e.name}</div>
              <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{e.role}</div>
              <Tag color={statusColors[e.status]}>{e.status}</Tag>
              <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{e.department}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

function OrgTab() {
  return (
    <div style={{ border: '1px solid var(--sg-color-border-secondary)', borderRadius: 8, padding: 16 }}>
      <Tree treeData={orgTree} defaultExpandAll />
    </div>
  )
}

function LeaveTab() {
  const tableData = useMemo(() => leaveRecords.map(leaveToRow), [])

  const columns: TableColumn[] = [
    { key: 'employeeName', title: 'Employee', width: 160, sortable: true },
    {
      key: 'type', title: 'Type', width: 100,
      render: (val) => <Tag>{String(val)}</Tag>,
    },
    { key: 'startDate', title: 'From', width: 110, sortable: true },
    { key: 'endDate', title: 'To', width: 110 },
    {
      key: 'status', title: 'Status', width: 100,
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Pending', value: 'pending' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColors[String(val)]}>{String(val)}</Tag>,
    },
    {
      key: 'actions', title: '', width: 160,
      render: (_, row) => row.status === 'pending' ? (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button size="small" type="primary" onClick={() => notification.success(`Approved leave for ${row.employeeName}`)}>Approve</Button>
          <Button size="small" onClick={() => notification.error(`Rejected leave for ${row.employeeName}`)}>Reject</Button>
        </div>
      ) : null,
    },
  ]

  return (
    <>
      <Calendar
        fullscreen={false}
        cellRender={(date) => {
          const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
          const leaves = leaveRecords.filter(l =>
            l.status === 'approved' && dateStr >= l.startDate && dateStr <= l.endDate
          )
          if (!leaves.length) return null
          return (
            <div style={{ fontSize: 10 }}>
              {leaves.slice(0, 1).map((l, i) => <div key={i}>{l.employeeName.split(' ')[0]}</div>)}
              {leaves.length > 1 && <div>+{leaves.length - 1}</div>}
            </div>
          )
        }}
      />
      <div style={{ marginTop: 20 }}>
        <h4 style={{ marginBottom: 12 }}>Leave Requests</h4>
        <Table columns={columns} data={tableData} pageSize={8} size="small" />
      </div>
    </>
  )
}

function TeamAssignTab() {
  const [targetKeys, setTargetKeys] = useState<string[]>(
    employees.filter(e => e.department === 'Engineering').map(e => e.id)
  )
  return (
    <div>
      <h4 style={{ marginBottom: 12 }}>Assign employees to Project Alpha</h4>
      <Transfer
        dataSource={transferSource}
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
        titles={['Available', 'Assigned']}
        showSearch
      />
    </div>
  )
}

function OnboardingTab() {
  return (
    <div style={{ maxWidth: 480 }}>
      <h4 style={{ marginBottom: 12 }}>New Employee Onboarding</h4>
      <Collapse
        items={[
          {
            key: 'personal',
            label: 'Personal Information',
            children: (
              <Form onFinish={(values) => notification.success('Employee onboarded (mock)', JSON.stringify(values))}>
                <Field name="fullName" label="Full Name" rules={[{ required: true }]}>
                  <Input placeholder="John Doe" />
                </Field>
                <Field name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                  <Input placeholder="john@company.com" />
                </Field>
                <Field name="department" label="Department" rules={[{ required: true }]}>
                  <Select
                    options={['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance'].map(d => ({ label: d, value: d }))}
                    placeholder="Select department"
                  />
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
                <Button type="primary" htmlType="submit" style={{ marginTop: 8 }}>Submit</Button>
              </Form>
            ),
          },
          {
            key: 'equipment',
            label: 'Equipment & Access',
            children: (
              <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
                <p>Checklist:</p>
                <ul style={{ paddingLeft: 20, marginTop: 8, lineHeight: 2 }}>
                  <li>Laptop provisioned</li>
                  <li>Email account created</li>
                  <li>VPN access granted</li>
                  <li>Slack/Teams invited</li>
                  <li>GitHub org added</li>
                </ul>
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
              </div>
            ),
          },
        ]}
        defaultActiveKey={['personal']}
      />
    </div>
  )
}

export function HrPortalApp() {
  const [activeTab, setActiveTab] = useState('directory')

  const tabs: TabItem[] = [
    { key: 'directory', label: 'Directory', children: <DirectoryTab /> },
    { key: 'org', label: 'Org Chart', children: <OrgTab /> },
    { key: 'leave', label: 'Leave Calendar', children: <LeaveTab /> },
    { key: 'team', label: 'Team Assign', children: <TeamAssignTab /> },
    { key: 'onboarding', label: 'Onboarding', children: <OnboardingTab /> },
  ]

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <StatsRow />
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  )
}
