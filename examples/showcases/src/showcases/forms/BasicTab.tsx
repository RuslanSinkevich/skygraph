import { useState, useMemo } from 'react'
import {
  Input, InputNumber, Textarea, Select, Checkbox, RadioGroup,
  Switch, Slider, Rate, DatePicker, RangePicker, TimePicker, AutoComplete,
  ColorPicker, Segmented, InputPassword, SearchInput, TagInput, PinInput,
  InlineEdit, InputGroup, notification,
} from '@skygraph/react'
import type { SelectOption, AutoCompleteOption } from '@skygraph/react'

export function BasicTab() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')
  const [search, setSearch] = useState('')
  const [num, setNum] = useState(42)
  const [textarea, setTextarea] = useState('')
  const [selectVal, setSelectVal] = useState<string | number>('')
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(true)
  const [radio, setRadio] = useState('a')
  const [switchOn, setSwitchOn] = useState(true)
  const [slider, setSlider] = useState(30)
  const [rate, setRate] = useState(3)
  const [tags, setTags] = useState(['React', 'TypeScript', 'SkyGraph'])
  const [pin, setPin] = useState('')
  const [color, setColor] = useState('#1677ff')
  const [segment, setSegment] = useState('daily')
  const [inlineVal, setInlineVal] = useState('Click me to edit')
  const [autoVal, setAutoVal] = useState('')

  const autoOptions: AutoCompleteOption[] = useMemo(() => {
    if (!autoVal) return []
    return ['gmail.com', 'outlook.com', 'yahoo.com'].map(d => ({
      label: `${autoVal}@${d}`,
      value: `${autoVal}@${d}`,
    }))
  }, [autoVal])

  const selectOptions: SelectOption[] = [
    { label: 'Option Alpha', value: 'alpha' },
    { label: 'Option Beta', value: 'beta' },
    { label: 'Option Gamma', value: 'gamma' },
    { label: 'Disabled Option', value: 'disabled', disabled: true },
  ]

  return (
    <div className="forms-gallery">
      <h3>Text Inputs</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">Input</label>
          <Input value={text} onChange={setText} placeholder="Basic text input" />
        </div>
        <div className="forms-cell">
          <label className="forms-label">Password + Strength</label>
          <InputPassword value={password} onChange={setPassword} placeholder="Enter password" showStrength />
        </div>
        <div className="forms-cell">
          <label className="forms-label">Search Input</label>
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={(v) => notification.info(`Searching: "${v}"`)}
            enterButton="Go"
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">InputNumber</label>
          <InputNumber value={num} onChange={(v) => setNum(v ?? 0)} min={0} max={100} step={5} />
        </div>
        <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
          <label className="forms-label">Textarea</label>
          <Textarea value={textarea} onChange={setTextarea} placeholder="Multi-line text..." />
        </div>
      </div>

      <h3>Input Group</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">With protocol addon</label>
          <InputGroup before="https://"><Input placeholder="example.com" /></InputGroup>
        </div>
        <div className="forms-cell">
          <label className="forms-label">With unit addon</label>
          <InputGroup after="kg"><InputNumber placeholder="Weight" style={{ width: '100%' }} /></InputGroup>
        </div>
      </div>

      <h3>Selection Controls</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">Select</label>
          <Select value={selectVal} onChange={setSelectVal} options={selectOptions} placeholder="Choose option" />
        </div>
        <div className="forms-cell">
          <label className="forms-label">AutoComplete</label>
          <AutoComplete value={autoVal} onChange={setAutoVal} options={autoOptions} placeholder="Type email username" />
        </div>
        <div className="forms-cell">
          <label className="forms-label">Segmented</label>
          <Segmented value={segment} onChange={setSegment} options={['daily', 'weekly', 'monthly']} />
        </div>
        <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
          <label className="forms-label">RadioGroup</label>
          <RadioGroup
            value={radio}
            onChange={(v) => setRadio(String(v))}
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
              { label: 'Option C', value: 'c' },
              { label: 'Disabled', value: 'd', disabled: true },
            ]}
          />
        </div>
      </div>

      <h3>Toggle &amp; Range</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">Checkbox</label>
          <div style={{ display: 'flex', gap: 16 }}>
            <Checkbox checked={checked} onChange={setChecked}>Agree to terms</Checkbox>
            <Checkbox indeterminate={indeterminate} onChange={() => setIndeterminate(false)}>Select all</Checkbox>
          </div>
        </div>
        <div className="forms-cell">
          <label className="forms-label">Switch</label>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Switch checked={switchOn} onChange={setSwitchOn} checkedChildren="ON" unCheckedChildren="OFF" />
            <span style={{ color: 'var(--sg-color-text-secondary)' }}>{switchOn ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>
        <div className="forms-cell">
          <label className="forms-label">Slider ({slider})</label>
          <Slider value={slider} onChange={setSlider} />
        </div>
        <div className="forms-cell">
          <label className="forms-label">Rate</label>
          <Rate value={rate} onChange={setRate} />
        </div>
      </div>

      <h3>Date &amp; Time</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">DatePicker</label>
          <DatePicker placeholder="Pick a date" />
        </div>
        <div className="forms-cell">
          <label className="forms-label">RangePicker</label>
          <RangePicker />
        </div>
        <div className="forms-cell">
          <label className="forms-label">TimePicker</label>
          <TimePicker placeholder="Pick time" />
        </div>
        <div className="forms-cell">
          <label className="forms-label">ColorPicker</label>
          <ColorPicker value={color} onChange={setColor} />
        </div>
      </div>

      <h3>Specialised Inputs</h3>
      <div className="forms-grid">
        <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
          <label className="forms-label">TagInput (max 8 tags)</label>
          <TagInput
            value={tags}
            onChange={setTags}
            maxTags={8}
            placeholder="Type and press Enter..."
            tagColor="processing"
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">PinInput (6 digits)</label>
          <PinInput
            value={pin}
            onChange={setPin}
            onComplete={(v) => notification.success(`PIN complete: ${v}`)}
            length={6}
            type="numeric"
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">PinInput (masked, 4 chars)</label>
          <PinInput length={4} mask type="alphanumeric" />
        </div>
        <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
          <label className="forms-label">InlineEdit</label>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <InlineEdit
              value={inlineVal}
              onSave={(v) => { setInlineVal(v); notification.info(`Saved: "${v}"`) }}
            />
            <InlineEdit defaultValue="No buttons mode" showButtons={false} saveOnBlur />
            <InlineEdit disabled defaultValue="Disabled edit" />
          </div>
        </div>
      </div>
    </div>
  )
}
