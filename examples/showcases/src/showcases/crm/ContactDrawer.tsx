import { Drawer, Avatar, Tag, Descriptions, Timeline, Button } from '@skygraph/react'
import type { Contact, Activity, Deal } from './data'
import { statusColor, useAppLocale } from '../_shared'
import { money, shortDate } from '../_shared'

interface Props {
  contact: Contact | null
  onClose: () => void
  onEdit: () => void
  activities: Activity[]
  deals: Deal[]
}

const activityColor: Record<Activity['type'], string> = {
  call: 'blue',
  email: 'green',
  meeting: 'orange',
  note: 'gray',
}

const activityIcon: Record<Activity['type'], string> = {
  call: '📞',
  email: '📧',
  meeting: '🤝',
  note: '📝',
}

export function ContactDrawer({ contact, onClose, onEdit, activities, deals }: Props) {
  const lc = useAppLocale('crm')
  const d = lc.contactDrawer
  return (
    <Drawer open={!!contact} onClose={onClose} title={contact?.name ?? ''} width={500}>
      {contact && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar size="large">{contact.avatar}</Avatar>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{contact.name}</div>
              <Tag color={statusColor(contact.status)}>
                {lc.statusLabel[contact.status] ?? contact.status}
              </Tag>
            </div>
            <Button size="small" onClick={onEdit}>
              {d.edit}
            </Button>
          </div>
          <Descriptions
            items={[
              { label: d.email, children: contact.email },
              { label: d.phone, children: contact.phone },
              { label: d.company, children: contact.company },
              { label: d.revenue, children: money(contact.revenue) },
              { label: d.lastContact, children: shortDate(contact.lastContact) },
            ]}
            column={1}
            size="small"
          />
          {deals.length > 0 && (
            <>
              <h4>{d.openDeals(deals.length)}</h4>
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 0',
                    borderBottom: '1px solid var(--sg-color-border-secondary)',
                  }}
                >
                  <span style={{ fontSize: 13, flex: 1 }}>{deal.title}</span>
                  <span
                    style={{
                      fontSize: 12,
                      color: 'var(--sg-color-text-secondary)',
                      marginRight: 8,
                    }}
                  >
                    {money(deal.value)} · {deal.probability}%
                  </span>
                  <Tag color={statusColor(deal.stage)}>
                    {lc.stageLabel[deal.stage] ?? deal.stage}
                  </Tag>
                </div>
              ))}
            </>
          )}
          <h4>{d.activity}</h4>
          <Timeline
            items={activities.slice(0, 8).map((a) => ({
              children: (
                <div>
                  <div style={{ fontSize: 13 }}>
                    {activityIcon[a.type]} {a.description}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--sg-color-text-secondary)' }}>
                    {lc.activityTypeLabel[a.type] ?? a.type} — {a.date}
                  </div>
                </div>
              ),
              color: activityColor[a.type],
            }))}
          />
        </div>
      )}
    </Drawer>
  )
}
