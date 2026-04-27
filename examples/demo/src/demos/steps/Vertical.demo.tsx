import { Steps } from '@skygraph/react'
import { basicSteps } from './data'

/**
 * Stack vertically for dense sidebars or long wizards. The tail
 * connector is drawn down the left edge between icons.
 */
export function VerticalSteps() {
  return <Steps direction="vertical" current={1} items={basicSteps} />
}
