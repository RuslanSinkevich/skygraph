import { useEffect, useRef, useState } from 'react'
import { AutoComplete } from '@skygraph/react'
import type { AutoCompleteOption } from '@skygraph/react'
import { cityDatabase } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Search cities…',
  },
  ru: {
    placeholder: 'Поиск городов…',
  },
} as const

/**
 * Fire server-side search through `onSearch`, debouncing rapid
 * keystrokes. Show the `loading` state until the response arrives so
 * the user knows the list is being fetched.
 */
export function AsyncSearchAutoComplete() {
  const t = useDemoStrings(STRINGS)
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<AutoCompleteOption[]>([])
  const [loading, setLoading] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
  }, [])

  const onSearch = (q: string) => {
    if (timer.current !== null) window.clearTimeout(timer.current)
    if (!q) {
      setOptions([])
      setLoading(false)
      return
    }
    setLoading(true)
    timer.current = window.setTimeout(() => {
      const next = cityDatabase
        .filter((c) => c.toLowerCase().includes(q.toLowerCase()))
        .slice(0, 6)
        .map((c) => ({ value: c, label: c }))
      setOptions(next)
      setLoading(false)
    }, 350)
  }

  return (
    <AutoComplete
      value={value}
      onChange={setValue}
      onSearch={onSearch}
      options={options}
      loading={loading}
      placeholder={t.placeholder}
      style={{ maxWidth: 320 }}
    />
  )
}
