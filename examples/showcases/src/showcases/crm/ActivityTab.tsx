import { useState, useMemo } from 'react'
import { Select, Tag, Timeline } from '@skygraph/react'
import { activities, contacts } from './data'
import type { Activity } from './data'
import { Toolbar } from '../_shared'

const typeIcons: Record<Activity['type'], string> = {
  call: '📞', email: '📧', meeting: '🤝', note: '📝',
}

const colors: Record<Activity['type'], string> = {
  call: 'blue', email: 'green', meeting: 'orange', note: 'gray',
}

export function ActivityTab() {
  const [type, setType] = useState<string>('all')

  const filtered = useMemo(
    () => type === 'all' ? activities : activities.filter(a => a.type === type),
    [type],
  )

  return (
    <>
      <Toolbar
        filters={
          <Select
            value={type}
            onChange={(v) => setType(String(v))}
            options={[
              { label: 'All Types', value: 'all' },
              { label: '📞 Calls', value: 'call' },
              { label: '📧 Emails', value: 'email' },
              { label: '🤝 Meetings', value: 'meeting' },
              { label: '📝 Notes', value: 'note' },
            ]}
            style={{ width: 160 }}
          />
        }
        actions={<Tag>{filtered.length} activities</Tag>}
      />
      <Timeline
        items={filtered.slice(0, 30).map(a => {
          const contact = contacts.find(c => c.id === a.contactId)
          return {
            children: (
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>
                  {typeIcons[a.type]} {a.description}
                </div>
                <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
                  {contact?.name} · {a.date}
                </div>
              </div>
            ),
            color: colors[a.type],
          }
        })}
      />
    </>
  )
}
