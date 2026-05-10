import type { DescriptionsItem } from '@skygraph/vue'

/**
 * Shared sample data used by every Descriptions demo.
 * Mirrors `examples/demo/src/demos/descriptions/data.ts` (Vue uses
 * `value` instead of React's `children`).
 */
export const userItems: DescriptionsItem[] = [
  { key: 'name', label: 'Username', value: 'John Doe' },
  { key: 'phone', label: 'Telephone', value: '+1 (415) 555-0187' },
  { key: 'live', label: 'Live', value: 'Hangzhou, Zhejiang' },
  { key: 'remark', label: 'Remark', value: 'Empty' },
  {
    key: 'address',
    label: 'Address',
    value: 'No. 18, Wantang Road, Xihu District, Hangzhou',
    span: 2,
  },
]

export const invoiceItems: DescriptionsItem[] = [
  { key: 'id', label: 'Invoice', value: 'SG-2026-00412' },
  { key: 'status', label: 'Status', value: 'Paid' },
  { key: 'issued', label: 'Issued', value: '2026-04-01' },
  { key: 'due', label: 'Due', value: '2026-04-15' },
  { key: 'total', label: 'Total', value: '$1,240.00', span: 2 },
]
