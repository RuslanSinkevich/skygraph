import { RadioGroup } from '@skygraph/react'

/**
 * `unstyled` keeps the semantics (radiogroup + native inputs) but drops
 * every SkyGraph class. Paint with your own CSS.
 */
export function UnstyledRadio() {
  return (
    <RadioGroup
      unstyled
      defaultValue="first"
      options={[
        { label: 'First', value: 'first' },
        { label: 'Second', value: 'second' },
        { label: 'Third', value: 'third' },
      ]}
    />
  )
}
