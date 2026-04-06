import { useState, useEffect } from 'react'
import { Progress, Button } from '@skygraph/react'

export function ProgressDemo() {
  const [percent, setPercent] = useState(30)
  const [auto, setAuto] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setAuto((p) => (p >= 100 ? 0 : p + 1))
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <section>
      <h2>Progress</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        Line and circle progress bars with status and animation.
      </p>

      <h4 style={{ marginBottom: 8 }}>Line</h4>
      <div style={{ maxWidth: 400, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Progress percent={30} />
        <Progress percent={70} status="active" />
        <Progress percent={100} />
        <Progress percent={50} status="error" />
      </div>

      <h4 style={{ marginBottom: 8 }}>Interactive</h4>
      <div style={{ maxWidth: 400, marginBottom: 16 }}>
        <Progress percent={percent} />
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Button size="small" onClick={() => setPercent(Math.max(0, percent - 10))}>−10</Button>
          <Button size="small" onClick={() => setPercent(Math.min(100, percent + 10))}>+10</Button>
        </div>
      </div>

      <h4 style={{ marginBottom: 8 }}>Auto-running</h4>
      <div style={{ maxWidth: 400, marginBottom: 24 }}>
        <Progress percent={auto} status="active" />
      </div>

      <h4 style={{ marginBottom: 8 }}>Circle</h4>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
        <Progress type="circle" percent={75} />
        <Progress type="circle" percent={100} />
        <Progress type="circle" percent={40} status="error" />
        <Progress type="circle" percent={auto} width={80} />
      </div>

      <h4 style={{ marginBottom: 8 }}>Small</h4>
      <div style={{ maxWidth: 300 }}>
        <Progress percent={60} size="small" />
      </div>
    </section>
  )
}
