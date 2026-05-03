import { useMemo, useState } from 'react'
import { AutoComplete } from '@skygraph/react'
import { emailDomains } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'name@…',
  },
  ru: {
    placeholder: 'имя@…',
  },
} as const

/**
 * Derive the suggestion list from the current input — here we take the
 * part before "@" and prepend it to every known domain. This is the
 * pattern behind mail clients that suggest "me@gmail.com" as you type.
 */
export function EmailDomainsAutoComplete() {
  const t = useDemoStrings(STRINGS)
  const [email, setEmail] = useState('')
  const options = useMemo(() => {
    const at = email.indexOf('@')
    const prefix = at === -1 ? email : email.slice(0, at)
    if (!prefix) return []
    return emailDomains.map((d) => ({
      value: `${prefix}@${d.value}`,
      label: `${prefix}@${d.label}`,
    }))
  }, [email])

  return (
    <AutoComplete
      value={email}
      onChange={setEmail}
      options={options}
      placeholder={t.placeholder}
      style={{ maxWidth: 320 }}
    />
  )
}
