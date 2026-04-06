import { Store } from './runtime/Store'
import { SubscriptionEngine } from './runtime/SubscriptionEngine'
import { Batch } from './runtime/Batch'
import { Transaction } from './runtime/Transaction'
import { ComputedEngine } from './runtime/ComputedEngine'
import { Scheduler } from './runtime/Scheduler'
import type { Core } from './types'

class CoreImpl implements Core {
  private store = new Store()
  private subscriptions = new SubscriptionEngine()
  private batch_ = new Batch()
  private transaction_ = new Transaction()
  private computed_ = new ComputedEngine()
  readonly scheduler = new Scheduler()

  get(path: string): unknown {
    return this.store.get(path)
  }

  set(path: string, value: unknown): void {
    if (this.transaction_.isActive) {
      this.transaction_.stage(path, value, this.store.get(path))
      return
    }

    const oldValue = this.store.get(path)
    if (Object.is(oldValue, value)) return

    this.store.set(path, value)

    const computedChanges = this.computed_.propagate(
      new Set([path]),
      this.store
    )

    if (this.batch_.isActive) {
      this.batch_.enqueue(path, value)
      for (const [cp, cv] of computedChanges) {
        this.batch_.enqueue(cp, cv)
      }
      return
    }

    this.subscriptions.notify(path, value)
    this.subscriptions.notifyMany(computedChanges)
  }

  subscribe(path: string, cb: (value: unknown) => void): () => void {
    return this.subscriptions.subscribe(path, cb)
  }

  batch(fn: () => void): void {
    this.batch_.start()
    try {
      fn()
    } finally {
      const changes = this.batch_.end()
      if (changes) {
        this.subscriptions.notifyMany(changes)
      }
    }
  }

  transaction(fn: () => void): void {
    this.batch_.start()
    this.transaction_.start()
    try {
      fn()
      const changes = this.transaction_.commit(this.store)

      const computedChanges = this.computed_.propagate(
        new Set(changes.keys()),
        this.store
      )

      for (const [path, value] of changes) {
        this.batch_.enqueue(path, value)
      }
      for (const [path, value] of computedChanges) {
        this.batch_.enqueue(path, value)
      }
    } catch (e) {
      this.transaction_.rollback()
      throw e
    } finally {
      const batchedChanges = this.batch_.end()
      if (batchedChanges) {
        this.subscriptions.notifyMany(batchedChanges)
      }
    }
  }

  computed(
    target: string,
    deps: string[],
    fn: (...values: unknown[]) => unknown
  ): void {
    this.computed_.register(target, deps, fn)
    const depValues = deps.map((d) => this.store.get(d))
    const value = fn(...depValues)
    this.store.set(target, value)
  }
}

export function createCore(): Core {
  return new CoreImpl()
}
