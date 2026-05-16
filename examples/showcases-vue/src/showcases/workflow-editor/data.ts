/**
 * Seed graph for the Vue Workflow Editor showcase.
 *
 * The data is intentionally small and shape-agnostic — it lives outside the
 * GraphEngine. The showcase pushes it into the engine on mount, after which
 * the engine becomes the single source of truth (drag, add, delete, etc.).
 */

export type NodeKind = 'start' | 'task' | 'decision' | 'end'

export interface SeedNode {
  id: string
  kind: NodeKind
  label: string
  x: number
  y: number
}

export interface SeedEdge {
  id: string
  from: string
  to: string
  label?: string
}

export const seedNodes: SeedNode[] = [
  { id: 'start', kind: 'start', label: 'Start', x: 40, y: 40 },
  { id: 'collect', kind: 'task', label: 'Collect docs', x: 220, y: 40 },
  { id: 'review', kind: 'decision', label: 'Auto-approve?', x: 440, y: 40 },
  { id: 'manual', kind: 'task', label: 'Manual review', x: 440, y: 200 },
  { id: 'sign', kind: 'task', label: 'Sign contract', x: 700, y: 40 },
  { id: 'end', kind: 'end', label: 'Done', x: 940, y: 40 },
]

export const seedEdges: SeedEdge[] = [
  { id: 'e1', from: 'start', to: 'collect' },
  { id: 'e2', from: 'collect', to: 'review' },
  { id: 'e3', from: 'review', to: 'sign', label: 'yes' },
  { id: 'e4', from: 'review', to: 'manual', label: 'no' },
  { id: 'e5', from: 'manual', to: 'sign' },
  { id: 'e6', from: 'sign', to: 'end' },
]

export const NODE_SHAPE: Record<
  NodeKind,
  { w: number; h: number; outline: 'rect' | 'ellipse' | 'diamond' }
> = {
  start: { w: 90, h: 50, outline: 'ellipse' },
  task: { w: 140, h: 60, outline: 'rect' },
  decision: { w: 160, h: 80, outline: 'diamond' },
  end: { w: 90, h: 50, outline: 'ellipse' },
}

export const NODE_PALETTE: { kind: NodeKind; label: string; emoji: string }[] = [
  { kind: 'start', label: 'Start', emoji: '▶' },
  { kind: 'task', label: 'Task', emoji: '▭' },
  { kind: 'decision', label: 'Decision', emoji: '◇' },
  { kind: 'end', label: 'End', emoji: '■' },
]
