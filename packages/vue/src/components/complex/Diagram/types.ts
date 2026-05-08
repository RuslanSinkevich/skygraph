/**
 * Diagram types — simplified Vue port of React's Diagram component.
 *
 * Trims advanced features (lasso, HoverActions, multi-anchor edges) compared
 * to the React source. Node/edge IDs and the `GraphEngine` contract are kept
 * compatible so consumers can switch frameworks without rewriting graph logic.
 */
import type { CSSProperties } from 'vue'
import type { GraphEngine, GraphNode, GraphState, NodeId } from '@skygraph/core'

export type DiagramSelectionMode = 'single' | 'multi'

export interface DiagramProps {
  graph: GraphEngine
  state: GraphState
  width?: number | string
  height?: number | string
  unstyled?: boolean
  className?: string
  style?: CSSProperties
  /** Allow dragging nodes by their wrappers. @default true */
  draggableNodes?: boolean
  /** Allow zoom via wheel and pan via canvas drag. @default true */
  panZoom?: boolean
  /** Selection behaviour. @default 'single' */
  selectionMode?: DiagramSelectionMode
  /** Controlled selected ids; falls back to internal state when omitted. */
  selectedNodeIds?: readonly NodeId[]
  /** File name (without extension) used by `ref.print()`. @default 'diagram' */
  fileName?: string
}

export interface DiagramExpose {
  print: (opts?: { fileName?: string }) => void
  getSelectedIds: () => NodeId[]
  setSelectedIds: (ids: NodeId[]) => void
}

export type DiagramNodeRenderProps = { node: GraphNode }
