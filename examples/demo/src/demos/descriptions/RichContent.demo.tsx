import { Descriptions, Badge, Tag } from '@skygraph/react'

/**
 * Both `label` and `children` accept any ReactNode — drop in
 * Badges, Tags, links, copy-to-clipboard buttons, whatever.
 */
export function RichContentDescriptions() {
  return (
    <Descriptions
      bordered
      column={2}
      title="Subscription"
      items={[
        { label: 'Plan', children: <Tag color="processing">Pro annual</Tag> },
        {
          label: 'Status',
          children: <Badge status="success" text="Active" />,
        },
        { label: 'Seats', children: <strong>12 / 25</strong> },
        { label: 'Renewal', children: '2027-04-01', span: 2 },
      ]}
    />
  )
}
