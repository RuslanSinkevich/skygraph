export interface Node {
  readonly id: string
  value: unknown
  version: number
  dirty: boolean
}

export function createNode(id: string, value: unknown): Node {
  return { id, value, version: 0, dirty: false }
}
