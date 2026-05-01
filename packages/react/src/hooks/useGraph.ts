import { useMemo, useSyncExternalStore } from 'react'
import { createCore, createGraph } from '@skygraph/core'
import type {
  Core,
  GraphEngine,
  GraphEngineOptions,
  GraphState,
} from '@skygraph/core'

export interface UseGraphOptions extends GraphEngineOptions {
  /** Bring your own Core instance (for cross-engine coordination). */
  core?: Core
}

export interface UseGraphReturn {
  /** Underlying engine — call mutating methods on this. */
  graph: GraphEngine
  /** Reactive snapshot of nodes / edges / edgesByNode. */
  state: GraphState
  /** The Core instance backing the engine (own or borrowed). */
  core: Core
}

/**
 * Reactive bridge between {@link createGraph} and React.
 *
 * The hook creates (or reuses) a Core + Graph pair, subscribes to the
 * `$graph.snapshot.*` namespace, and re-renders the consumer on every commit.
 *
 * The graph object reference is stable across renders. Mutations go through
 * `graph.addNode(...)`, `graph.moveNode(...)`, etc.
 */
export function useGraph(options: UseGraphOptions = {}): UseGraphReturn {
  const { core: externalCore, ...graphOptions } = options

  const { graph, core } = useMemo(() => {
    const c = externalCore ?? createCore()
    const g = createGraph(c, graphOptions)
    return { graph: g, core: c }
    // graphOptions contains a name only; ignoring its identity is the
    // correct behaviour — re-creating the engine on each render would lose
    // user-mutated state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalCore])

  const state = useSyncExternalStore(
    (cb) => core.subscribe('$graph.snapshot', cb),
    () => graph.getState(),
    () => graph.getState(),
  )

  return { graph, state, core }
}
