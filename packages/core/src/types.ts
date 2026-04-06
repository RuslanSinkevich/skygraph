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
}
