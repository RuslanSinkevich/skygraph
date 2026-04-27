import { Segmented } from '@skygraph/react'

/**
 * Pass bare strings for the simplest usage — each string becomes
 * both the label and the value. Uncontrolled: defaults to the
 * first option.
 */
export function BasicSegmented() {
  return <Segmented options={['Daily', 'Weekly', 'Monthly', 'Yearly']} />
}
