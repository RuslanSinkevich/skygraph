import type { TreeNodeData } from '@skygraph/vue'

/** Org chart with 3 departments × multiple teams. Big enough to show
 *  search filtering and multi-select without being overwhelming.
 *  Mirrors React's `examples/demo/src/demos/treeselect/data.ts` so the
 *  two demos stay structurally identical. */
export const orgTree: TreeNodeData[] = [
  {
    key: 'eng',
    title: 'Engineering',
    children: [
      {
        key: 'eng-web',
        title: 'Web Platform',
        children: [
          { key: 'eng-web-frontend', title: 'Frontend' },
          { key: 'eng-web-backend', title: 'Backend' },
          { key: 'eng-web-devops', title: 'DevOps' },
        ],
      },
      {
        key: 'eng-mobile',
        title: 'Mobile',
        children: [
          { key: 'eng-mobile-ios', title: 'iOS' },
          { key: 'eng-mobile-android', title: 'Android' },
        ],
      },
      { key: 'eng-qa', title: 'QA' },
    ],
  },
  {
    key: 'design',
    title: 'Design',
    children: [
      { key: 'design-product', title: 'Product Design' },
      { key: 'design-research', title: 'UX Research' },
      { key: 'design-brand', title: 'Brand' },
    ],
  },
  {
    key: 'ops',
    title: 'Operations',
    children: [
      { key: 'ops-hr', title: 'HR' },
      { key: 'ops-finance', title: 'Finance', disabled: true },
      { key: 'ops-legal', title: 'Legal' },
    ],
  },
]

/** Convenience list of parent keys for demos that prefer to mimic
 *  `treeDefaultExpandAll` by passing `tree-default-expanded-keys`. */
export const orgTreeAllParentKeys: (string | number)[] = [
  'eng',
  'eng-web',
  'eng-mobile',
  'design',
  'ops',
]
