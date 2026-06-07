import { useState } from 'react'
import { TreeSelect } from '@skygraph/react'
import { orgTree } from './data'
import { useDemoStrings } from '../../i18n'
import { FloatingField, FloatingFieldStyles } from '../_shared/FloatingField'

/**
 * Floating label on the TreeSelect trigger. The label floats on focus or once
 * a node is chosen.
 */
const STRINGS = {
  en: { team: 'Team' },
  ru: { team: 'Команда' },
} as const

export function FloatingLabelTreeSelect() {
  const t = useDemoStrings(STRINGS)
  const [value, setValue] = useState<string | number | undefined>(undefined)
  return (
    <div style={{ maxWidth: 280 }}>
      <FloatingFieldStyles />
      <FloatingField label={t.team} filled={value !== undefined && value !== ''}>
        <TreeSelect
          treeData={orgTree}
          treeDefaultExpandAll
          value={value}
          onChange={(v) => setValue(v as string | number)}
          placeholder=""
          allowClear
        />
      </FloatingField>
    </div>
  )
}
