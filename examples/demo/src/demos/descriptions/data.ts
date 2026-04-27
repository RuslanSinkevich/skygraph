import type { DescriptionsItem } from '@skygraph/react'

export const userItems: DescriptionsItem[] = [
  { key: 'name', label: 'Username', children: 'John Doe' },
  { key: 'phone', label: 'Telephone', children: '+1 (415) 555-0187' },
  { key: 'live', label: 'Live', children: 'Hangzhou, Zhejiang' },
  { key: 'remark', label: 'Remark', children: 'Empty' },
  { key: 'address', label: 'Address', children: 'No. 18, Wantang Road, Xihu District, Hangzhou', span: 2 },
]

export const invoiceItems: DescriptionsItem[] = [
  { key: 'id', label: 'Invoice', children: 'SG-2026-00412' },
  { key: 'status', label: 'Status', children: 'Paid' },
  { key: 'issued', label: 'Issued', children: '2026-04-01' },
  { key: 'due', label: 'Due', children: '2026-04-15' },
  { key: 'total', label: 'Total', children: '$1,240.00', span: 2 },
]
