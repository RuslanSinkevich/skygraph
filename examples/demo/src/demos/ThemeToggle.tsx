import { useState } from 'react'
import { Switch } from '@skygraph/react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-sg-theme', next ? 'dark' : 'light')
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
      <Switch checked={dark} onChange={toggle} size="small" />
      <span>{dark ? 'Dark' : 'Light'}</span>
    </div>
  )
}
