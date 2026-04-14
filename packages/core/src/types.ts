// ── Middleware types ──

export type WriteSource = 'user' | 'computed' | 'transaction' | 'engine' | 'restore'

export interface WriteEvent {
  path: string
  value: unknown
  oldValue: unknown
  source: WriteSource
  meta?: Record<string, unknown>
}

export type NextFn = (event: WriteEvent) => void

export type Middleware = (event: WriteEvent, next: NextFn) => void

// ── Core interface ──

export interface Core {
  get(path: string): unknown
  set(path: string, value: unknown): void
  subscribe(path: string, cb: (value: unknown) => void): () => void
  batch(fn: () => void): void
  transaction(fn: () => void): void
  computed(
    target: string,
    deps: string[],
    fn: (...values: unknown[]) => unknown
  ): void

  use(middleware: Middleware): () => void

  snapshot(): Record<string, unknown>
  restore(snapshot: Record<string, unknown>): void
}
