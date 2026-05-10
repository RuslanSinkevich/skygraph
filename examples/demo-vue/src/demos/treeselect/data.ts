import type { TreeSelectNode } from '@skygraph/vue'

/** Org chart with 3 departments × multiple teams. Big enough to show
 *  search filtering and multi-select without being overwhelming.
 *
 *  Vue `SgTreeSelect` uses `value` / `label` (not `key` / `title`).
 */
export const orgTree: TreeSelectNode[] = [
  {
    value: 'eng',
    label: 'Engineering',
    children: [
      {
        value: 'eng-web',
        label: 'Web Platform',
        children: [
          { value: 'eng-web-frontend', label: 'Frontend' },
          { value: 'eng-web-backend', label: 'Backend' },
          { value: 'eng-web-devops', label: 'DevOps' },
        ],
      },
      {
        value: 'eng-mobile',
        label: 'Mobile',
        children: [
          { value: 'eng-mobile-ios', label: 'iOS' },
          { value: 'eng-mobile-android', label: 'Android' },
        ],
      },
      { value: 'eng-qa', label: 'QA' },
    ],
  },
  {
    value: 'design',
    label: 'Design',
    children: [
      { value: 'design-product', label: 'Product Design' },
      { value: 'design-research', label: 'UX Research' },
      { value: 'design-brand', label: 'Brand' },
    ],
  },
  {
    value: 'ops',
    label: 'Operations',
    children: [
      { value: 'ops-hr', label: 'HR' },
      { value: 'ops-finance', label: 'Finance', disabled: true },
      { value: 'ops-legal', label: 'Legal' },
    ],
  },
]

/** Vue lacks `treeDefaultExpandAll`; pass these to `default-expanded-keys`
 *  to mimic the React behaviour. */
export const orgTreeAllParentKeys: (string | number)[] = [
  'eng',
  'eng-web',
  'eng-mobile',
  'design',
  'ops',
]
