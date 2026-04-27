import { Select } from '@skygraph/react'
import { numberOptions } from './data'

/** Three sizes — match whatever form/toolbar density you're going for. */
export function SelectSizes() {
  return (
    <>
      <Select size="small" placeholder="Small" options={numberOptions} />
      <Select placeholder="Default" options={numberOptions} />
      <Select size="large" placeholder="Large" options={numberOptions} />
    </>
  )
}
