/**
 * Seed data + layout for the Org Chart showcase.
 *
 * The people list is a plain tree (each person points at a manager). The
 * GraphEngine doesn't store hierarchy itself, so we compute a tidy top-down
 * layout here and push positioned nodes into the engine. Collapsing a branch
 * simply hides its descendants and re-runs the layout — the engine stays the
 * single source of truth for what's on screen.
 */
import type { OrgDept } from '@skygraph-examples/shared'

export interface Person {
  id: string
  name: string
  title: string
  dept: OrgDept
  managerId: string | null
  email: string
}

export const PEOPLE: Person[] = [
  {
    id: 'ceo',
    name: 'Eleanor Shaw',
    title: 'Chief Executive Officer',
    dept: 'exec',
    managerId: null,
    email: 'eleanor.shaw@northwind.io',
  },

  {
    id: 'cto',
    name: 'Marcus Lindqvist',
    title: 'Chief Technology Officer',
    dept: 'eng',
    managerId: 'ceo',
    email: 'marcus.l@northwind.io',
  },
  {
    id: 'cpo',
    name: 'Priya Nair',
    title: 'Chief Product Officer',
    dept: 'product',
    managerId: 'ceo',
    email: 'priya.nair@northwind.io',
  },
  {
    id: 'cro',
    name: 'Diego Alvarez',
    title: 'Chief Revenue Officer',
    dept: 'sales',
    managerId: 'ceo',
    email: 'diego.a@northwind.io',
  },
  {
    id: 'cmo',
    name: 'Hana Kim',
    title: 'Chief Marketing Officer',
    dept: 'marketing',
    managerId: 'ceo',
    email: 'hana.kim@northwind.io',
  },

  {
    id: 'be-lead',
    name: 'Tom Becker',
    title: 'Backend Lead',
    dept: 'eng',
    managerId: 'cto',
    email: 'tom.becker@northwind.io',
  },
  {
    id: 'fe-lead',
    name: 'Sara Vogel',
    title: 'Frontend Lead',
    dept: 'eng',
    managerId: 'cto',
    email: 'sara.vogel@northwind.io',
  },
  {
    id: 'infra-lead',
    name: 'Omar Said',
    title: 'Infrastructure Lead',
    dept: 'eng',
    managerId: 'cto',
    email: 'omar.said@northwind.io',
  },
  {
    id: 'eng-1',
    name: 'Lucas Meyer',
    title: 'Backend Engineer',
    dept: 'eng',
    managerId: 'be-lead',
    email: 'lucas.meyer@northwind.io',
  },
  {
    id: 'eng-2',
    name: 'Nina Petrova',
    title: 'Backend Engineer',
    dept: 'eng',
    managerId: 'be-lead',
    email: 'nina.petrova@northwind.io',
  },
  {
    id: 'eng-3',
    name: 'Yuki Tanaka',
    title: 'Frontend Engineer',
    dept: 'eng',
    managerId: 'fe-lead',
    email: 'yuki.tanaka@northwind.io',
  },
  {
    id: 'eng-4',
    name: 'Paul Durand',
    title: 'Frontend Engineer',
    dept: 'eng',
    managerId: 'fe-lead',
    email: 'paul.durand@northwind.io',
  },
  {
    id: 'eng-5',
    name: 'Greta Hoffmann',
    title: 'DevOps Engineer',
    dept: 'eng',
    managerId: 'infra-lead',
    email: 'greta.h@northwind.io',
  },

  {
    id: 'pm-1',
    name: 'Aisha Khan',
    title: 'Product Manager',
    dept: 'product',
    managerId: 'cpo',
    email: 'aisha.khan@northwind.io',
  },
  {
    id: 'pm-2',
    name: 'Ivan Novak',
    title: 'Product Manager',
    dept: 'product',
    managerId: 'cpo',
    email: 'ivan.novak@northwind.io',
  },
  {
    id: 'design-lead',
    name: 'Mia Rossi',
    title: 'Design Lead',
    dept: 'design',
    managerId: 'cpo',
    email: 'mia.rossi@northwind.io',
  },
  {
    id: 'des-1',
    name: 'Leo Fischer',
    title: 'Product Designer',
    dept: 'design',
    managerId: 'design-lead',
    email: 'leo.fischer@northwind.io',
  },
  {
    id: 'des-2',
    name: 'Clara Mendes',
    title: 'UX Researcher',
    dept: 'design',
    managerId: 'design-lead',
    email: 'clara.mendes@northwind.io',
  },

  {
    id: 'sales-1',
    name: 'Ben Carter',
    title: 'Account Executive',
    dept: 'sales',
    managerId: 'cro',
    email: 'ben.carter@northwind.io',
  },
  {
    id: 'sales-2',
    name: 'Zoe Laurent',
    title: 'Account Executive',
    dept: 'sales',
    managerId: 'cro',
    email: 'zoe.laurent@northwind.io',
  },

  {
    id: 'mkt-1',
    name: 'Ravi Desai',
    title: 'Content Lead',
    dept: 'marketing',
    managerId: 'cmo',
    email: 'ravi.desai@northwind.io',
  },
  {
    id: 'mkt-2',
    name: 'Emma Stone',
    title: 'Growth Marketer',
    dept: 'marketing',
    managerId: 'cmo',
    email: 'emma.stone@northwind.io',
  },
]

/** Department visual order + accent colour (left stripe + legend dot). */
export const DEPT_ORDER: OrgDept[] = ['exec', 'eng', 'product', 'design', 'sales', 'marketing']

export const DEPT_COLOR: Record<OrgDept, string> = {
  exec: '#7c3aed',
  eng: '#2563eb',
  product: '#0891b2',
  design: '#db2777',
  sales: '#16a34a',
  marketing: '#ea580c',
}

// ─── Indexes (built once) ───────────────────────────────────────────────────
const BY_ID = new Map<string, Person>(PEOPLE.map((p) => [p.id, p]))
const CHILDREN = new Map<string, Person[]>()
for (const p of PEOPLE) {
  if (p.managerId) {
    const list = CHILDREN.get(p.managerId)
    if (list) list.push(p)
    else CHILDREN.set(p.managerId, [p])
  }
}
const ROOTS = PEOPLE.filter((p) => p.managerId === null)

export function personById(id: string): Person | undefined {
  return BY_ID.get(id)
}

export function childrenOf(id: string): Person[] {
  return CHILDREN.get(id) ?? []
}

/** Total number of people below `id` (whole subtree, excluding `id`). */
export function subtreeCount(id: string): number {
  let total = 0
  for (const child of childrenOf(id)) total += 1 + subtreeCount(child.id)
  return total
}

/** Ids of every person that has at least one direct report. */
export const MANAGER_IDS: string[] = PEOPLE.filter((p) => childrenOf(p.id).length > 0).map(
  (p) => p.id,
)

// ─── Layout ─────────────────────────────────────────────────────────────────
export const NODE_W = 190
export const NODE_H = 74
const H_GAP = 28
const V_GAP = 80
const X_PAD = 56
const Y_PAD = 28

export interface PositionedNode {
  id: string
  x: number
  y: number
}

export interface VisibleEdge {
  id: string
  from: string
  to: string
}

export interface OrgLayout {
  nodes: PositionedNode[]
  edges: VisibleEdge[]
  depth: number
}

/**
 * Tidy top-down tree layout. Leaves (or collapsed branches) consume one slot;
 * a parent centres over the span of its visible children. Slots convert to
 * world pixels using the node footprint plus gaps.
 */
export function computeLayout(collapsed: ReadonlySet<string>): OrgLayout {
  const nodes: PositionedNode[] = []
  const edges: VisibleEdge[] = []
  let slot = 0
  let maxDepth = 0

  function walk(p: Person, depth: number): number {
    if (depth > maxDepth) maxDepth = depth
    const kids = childrenOf(p.id)
    let slotX: number
    if (kids.length === 0 || collapsed.has(p.id)) {
      slotX = slot++
    } else {
      const childSlots = kids.map((k) => {
        edges.push({ id: `${p.id}->${k.id}`, from: p.id, to: k.id })
        return walk(k, depth + 1)
      })
      slotX = (childSlots[0]! + childSlots[childSlots.length - 1]!) / 2
    }
    nodes.push({
      id: p.id,
      x: X_PAD + slotX * (NODE_W + H_GAP),
      y: Y_PAD + depth * (NODE_H + V_GAP),
    })
    return slotX
  }

  for (const root of ROOTS) walk(root, 0)
  return { nodes, edges, depth: maxDepth + 1 }
}
