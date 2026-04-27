import type { TreeNodeData } from '@skygraph/react'

/** Two-department org, 3 levels deep. Realistic demo fodder. */
export const orgTree: TreeNodeData[] = [
  {
    key: 'eng',
    title: 'Engineering',
    children: [
      {
        key: 'eng-web',
        title: 'Web',
        children: [
          { key: 'eng-web-fe', title: 'Frontend' },
          { key: 'eng-web-be', title: 'Backend' },
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
      { key: 'eng-qa', title: 'QA', disabled: true },
    ],
  },
  {
    key: 'ops',
    title: 'Operations',
    children: [
      { key: 'ops-hr', title: 'HR' },
      { key: 'ops-legal', title: 'Legal' },
      { key: 'ops-finance', title: 'Finance' },
    ],
  },
]

/** Filesystem-like tree for directory mode. */
export const fileTree: TreeNodeData[] = [
  {
    key: 'src',
    title: 'src',
    children: [
      {
        key: 'src-components',
        title: 'components',
        children: [
          { key: 'src-components-button', title: 'Button.tsx' },
          { key: 'src-components-input', title: 'Input.tsx' },
        ],
      },
      {
        key: 'src-hooks',
        title: 'hooks',
        children: [
          { key: 'src-hooks-useform', title: 'useForm.ts' },
          { key: 'src-hooks-usetree', title: 'useTree.ts' },
        ],
      },
      { key: 'src-index', title: 'index.ts' },
    ],
  },
  {
    key: 'public',
    title: 'public',
    children: [
      { key: 'public-favicon', title: 'favicon.ico' },
      { key: 'public-index', title: 'index.html' },
    ],
  },
  { key: 'package', title: 'package.json' },
]
