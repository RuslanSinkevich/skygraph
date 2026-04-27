import type { CascaderOption } from '@skygraph/react'

export const regionOptions: CascaderOption[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake' },
          { value: 'xiasha', label: 'Xiasha' },
          { value: 'binjiang', label: 'Binjiang' },
        ],
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        children: [
          { value: 'dongqian', label: 'Dongqian Lake' },
          { value: 'yinzhou', label: 'Yinzhou' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          { value: 'zhonghua', label: 'Zhong Hua Men' },
          { value: 'xuanwu', label: 'Xuanwu Lake' },
        ],
      },
      {
        value: 'suzhou',
        label: 'Suzhou',
        children: [
          { value: 'humble', label: 'Humble Administrator Garden' },
          { value: 'tiger', label: 'Tiger Hill' },
        ],
      },
    ],
  },
  {
    value: 'sichuan',
    label: 'Sichuan',
    disabled: true,
    children: [
      {
        value: 'chengdu',
        label: 'Chengdu',
        children: [{ value: 'kuanzhai', label: 'Kuanzhai Alley' }],
      },
    ],
  },
]

export const categoryOptions: CascaderOption[] = [
  {
    value: 'frontend',
    label: 'Frontend',
    children: [
      {
        value: 'react',
        label: 'React',
        children: [
          { value: 'hooks', label: 'Hooks' },
          { value: 'suspense', label: 'Suspense' },
          { value: 'rsc', label: 'Server Components' },
        ],
      },
      {
        value: 'vue',
        label: 'Vue',
        children: [
          { value: 'composition', label: 'Composition API' },
          { value: 'pinia', label: 'Pinia' },
        ],
      },
    ],
  },
  {
    value: 'backend',
    label: 'Backend',
    children: [
      {
        value: 'node',
        label: 'Node.js',
        children: [
          { value: 'express', label: 'Express' },
          { value: 'fastify', label: 'Fastify' },
          { value: 'nest', label: 'NestJS' },
        ],
      },
      {
        value: 'go',
        label: 'Go',
        children: [
          { value: 'gin', label: 'Gin' },
          { value: 'echo', label: 'Echo' },
        ],
      },
    ],
  },
]
