import { Select } from '@skygraph/react'

/**
 * `loading` on the whole select shows a spinner and disables input —
 * perfect while fetching options. Individual option `loading` marks a row
 * as "still syncing" without blocking the others.
 */
export function LoadingSelect() {
  return (
    <>
      <Select loading placeholder="Fetching options…" options={[]} />
      <Select
        placeholder="Pick a worker"
        options={[
          { label: 'worker-01 (ready)', value: 'w1' },
          { label: 'worker-02 (syncing…)', value: 'w2', loading: true },
          { label: 'worker-03 (offline)', value: 'w3', disabled: true },
        ]}
      />
    </>
  )
}
