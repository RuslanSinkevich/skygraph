import { useState } from 'react'
import { Cascader } from '../../../../packages/react/src/components/complex/Cascader'

const regionOptions = [
  {
    value: 'eu',
    label: 'Europe',
    children: [
      {
        value: 'de',
        label: 'Germany',
        children: [
          { value: 'ber', label: 'Berlin' },
          { value: 'mun', label: 'Munich' },
        ],
      },
      {
        value: 'fr',
        label: 'France',
        children: [
          { value: 'par', label: 'Paris' },
          { value: 'lyo', label: 'Lyon' },
        ],
      },
    ],
  },
  {
    value: 'us',
    label: 'United States',
    children: [
      {
        value: 'ca',
        label: 'California',
        children: [
          { value: 'sf', label: 'San Francisco' },
          { value: 'la', label: 'Los Angeles' },
        ],
      },
    ],
  },
]

export function CascaderDemo() {
  const [cos, setCos] = useState<(string | number)[]>(['eu', 'de'])

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <h2>Cascader</h2>

      <section>
        <h3>Basic (click expand)</h3>
        <Cascader
          style={{ minWidth: 280 }}
          options={regionOptions}
          placeholder="Select region / country / city"
          allowClear
        />
      </section>

      <section>
        <h3>Hover expand</h3>
        <Cascader
          style={{ minWidth: 280 }}
          options={regionOptions}
          expandTrigger="hover"
          placeholder="Hover to open next column"
        />
      </section>

      <section>
        <h3>Search</h3>
        <Cascader
          style={{ minWidth: 280 }}
          options={regionOptions}
          showSearch
          placeholder="Search cities or countries"
        />
      </section>

      <section>
        <h3>changeOnSelect (pick parent levels)</h3>
        <Cascader
          style={{ minWidth: 280 }}
          options={regionOptions}
          changeOnSelect
          value={cos}
          onChange={(v) => setCos(v)}
          placeholder="Selecting Germany is valid"
        />
      </section>

      <section>
        <h3>Multiple</h3>
        <Cascader
          style={{ minWidth: 320 }}
          options={regionOptions}
          multiple
          showSearch
          allowClear
          placeholder="Add several paths"
        />
      </section>
    </section>
  )
}
