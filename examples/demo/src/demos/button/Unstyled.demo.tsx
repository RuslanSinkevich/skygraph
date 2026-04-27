import { Button } from '@skygraph/react'

/**
 * `unstyled` keeps the `<button>` element semantics — htmlType,
 * disabled state, aria-busy for loading — but removes every
 * `sg-button-*` class. Pair it with your own stylesheet or a
 * Tailwind className.
 */
export function UnstyledButton() {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <style>{`
        .demo-pill-btn {
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 999px;
          padding: 10px 24px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
        }
        .demo-pill-btn:hover { filter: brightness(1.1); }
        .demo-pill-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
      <Button unstyled className="demo-pill-btn">Custom pill</Button>
      <Button unstyled className="demo-pill-btn" disabled>Disabled pill</Button>
      <Button unstyled className="demo-pill-btn" loading>Loading pill</Button>
    </div>
  )
}
