import { useMemo } from 'react'
import { Segmented } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
  },
  ru: {
    daily: 'Ежедневно',
    weekly: 'Еженедельно',
    monthly: 'Ежемесячно',
    yearly: 'Ежегодно',
  },
} as const

/**
 * Pass bare strings for the simplest usage — each string becomes
 * both the label and the value. Uncontrolled: defaults to the
 * first option.
 */
export function BasicSegmented() {
  const t = useDemoStrings(STRINGS)
  const options = useMemo(() => [t.daily, t.weekly, t.monthly, t.yearly], [t])
  return <Segmented options={options} />
}
