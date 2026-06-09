import type { CollapseItem } from '@skygraph/vue'

/**
 * Shared sample data used by Basic / Accordion / Borderless / Ghost /
 * IconPosition / Sizes / TokensOverride demos. Mirrors the
 * React `examples/demo/src/demos/collapse/data.ts` (Vue uses
 * `content` instead of React's `children`).
 */
export const sampleItems: CollapseItem[] = [
  {
    key: '1',
    label: 'This is panel header 1',
    content: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness.',
  },
  {
    key: '2',
    label: 'This is panel header 2',
    content: 'A cat is a small domesticated mammal valued for companionship.',
  },
  {
    key: '3',
    label: 'This is panel header 3',
    content: 'A bird is an animal with wings that can usually fly.',
  },
]
