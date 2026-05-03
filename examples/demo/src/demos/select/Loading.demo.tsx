import { Select } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    fetching: 'Fetching options…',
    pickWorker: 'Pick a worker',
    w1: 'worker-01 (ready)',
    w2: 'worker-02 (syncing…)',
    w3: 'worker-03 (offline)',
  },
  ru: {
    fetching: 'Загрузка вариантов…',
    pickWorker: 'Выберите воркер',
    w1: 'worker-01 (готов)',
    w2: 'worker-02 (синхронизация…)',
    w3: 'worker-03 (офлайн)',
  },
} as const

/**
 * `loading` on the whole select shows a spinner and disables input —
 * perfect while fetching options. Individual option `loading` marks a row
 * as "still syncing" without blocking the others.
 */
export function LoadingSelect() {
  const t = useDemoStrings(STRINGS)
  return (
    <>
      <Select loading placeholder={t.fetching} options={[]} />
      <Select
        placeholder={t.pickWorker}
        options={[
          { label: t.w1, value: 'w1' },
          { label: t.w2, value: 'w2', loading: true },
          { label: t.w3, value: 'w3', disabled: true },
        ]}
      />
    </>
  )
}
