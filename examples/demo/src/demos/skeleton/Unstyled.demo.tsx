import { Skeleton } from '@skygraph/react'

/**
 * `unstyled` keeps the `aria-busy="true"` wrapper and the same
 * block order but drops all classes — bring your own skeleton
 * style. Widths / heights are still computed so the layout is
 * consistent.
 */
export function UnstyledSkeleton() {
  return (
    <div style={{ fontFamily: 'monospace', fontSize: 13 }}>
      <style>{`
        .demo-skeleton { display: flex; gap: 12px; padding: 12px;
          background: #eef2ff; border-radius: 10px; }
        .demo-skeleton > div:first-child { border-radius: 50%;
          background: #c7d2fe; }
        .demo-skeleton > div:last-child { flex: 1; display: flex;
          flex-direction: column; gap: 6px; }
        .demo-skeleton > div:last-child > div {
          background: #c7d2fe; border-radius: 4px; }
      `}</style>
      <Skeleton unstyled className="demo-skeleton" avatar paragraph={{ rows: 3 }} />
    </div>
  )
}
