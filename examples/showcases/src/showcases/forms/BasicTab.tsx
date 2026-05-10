import { useState, useMemo } from 'react'
import {
  Input,
  InputNumber,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  Slider,
  Rate,
  DatePicker,
  RangePicker,
  TimePicker,
  AutoComplete,
  ColorPicker,
  Segmented,
  InputPassword,
  SearchInput,
  TagInput,
  PinInput,
  InlineEdit,
  InputGroup,
  notification,
} from '@skygraph/react'
import type { SelectOption, AutoCompleteOption } from '@skygraph/react'
import { useAppLocale } from '../_shared'

export function BasicTab() {
  const l = useAppLocale('forms').basic
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
  const [inlineVal, setInlineVal] = useState(l.inlineDefault)
  const [autoVal, setAutoVal] = useState('')

  const autoOptions: AutoCompleteOption[] = useMemo(() => {
    if (!autoVal) return []
    return ['gmail.com', 'outlook.com', 'yahoo.com'].map((d) => ({
      label: `${autoVal}@${d}`,
      value: `${autoVal}@${d}`,
    }))
  }, [autoVal])

  const selectOptions: SelectOption[] = [
    { label: l.options.alpha, value: 'alpha' },
    { label: l.options.beta, value: 'beta' },
    { label: l.options.gamma, value: 'gamma' },
    { label: l.options.disabled, value: 'disabled', disabled: true },
  ]

  return (
    <div className="forms-gallery">
      <h3>{l.sections.textInputs}</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">{l.labels.input}</label>
          <Input value={text} onChange={setText} placeholder={l.placeholders.basic} />
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.passwordStrength}</label>
          <InputPassword
            value={password}
            onChange={setPassword}
            placeholder={l.placeholders.password}
            showStrength
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.searchInput}</label>
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={(v) => notification.info(l.toasts.searching(v))}
            enterButton="Go"
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.inputNumber}</label>
          <InputNumber value={num} onChange={(v) => setNum(v ?? 0)} min={0} max={100} step={5} />
        </div>
        <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
          <label className="forms-label">{l.labels.textarea}</label>
          <Textarea
            value={textarea}
            onChange={setTextarea}
            placeholder={l.placeholders.multiLine}
          />
        </div>
      </div>

      <h3>{l.sections.inputGroup}</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">{l.labels.protocolAddon}</label>
          <InputGroup before="https://">
            <Input placeholder={l.placeholders.example} />
          </InputGroup>
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.unitAddon}</label>
          <InputGroup after="kg">
            <InputNumber placeholder={l.placeholders.weight} style={{ width: '100%' }} />
          </InputGroup>
        </div>
      </div>

      <h3>{l.sections.selection}</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">{l.labels.select}</label>
          <Select
            value={selectVal}
            onChange={setSelectVal}
            options={selectOptions}
            placeholder={l.placeholders.chooseOption}
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.autoComplete}</label>
          <AutoComplete
            value={autoVal}
            onChange={setAutoVal}
            options={autoOptions}
            placeholder={l.placeholders.autoEmail}
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.segmented}</label>
          <Segmented
            value={segment}
            onChange={setSegment}
            options={[
              { label: l.options.daily, value: 'daily' },
              { label: l.options.weekly, value: 'weekly' },
              { label: l.options.monthly, value: 'monthly' },
            ]}
          />
        </div>
        <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
          <label className="forms-label">{l.labels.radioGroup}</label>
          <RadioGroup
            value={radio}
            onChange={(v) => setRadio(String(v))}
            options={[
              { label: l.options.a, value: 'a' },
              { label: l.options.b, value: 'b' },
              { label: l.options.c, value: 'c' },
              { label: l.options.disabledRadio, value: 'd', disabled: true },
            ]}
          />
        </div>
      </div>

      <h3>{l.sections.toggleRange}</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">{l.labels.checkbox}</label>
          <div style={{ display: 'flex', gap: 16 }}>
            <Checkbox checked={checked} onChange={setChecked}>
              {l.agreeTerms}
            </Checkbox>
            <Checkbox indeterminate={indeterminate} onChange={() => setIndeterminate(false)}>
              {l.selectAll}
            </Checkbox>
          </div>
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.switch}</label>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Switch
              checked={switchOn}
              onChange={setSwitchOn}
              checkedChildren={l.on}
              unCheckedChildren={l.off}
            />
            <span style={{ color: 'var(--sg-color-text-secondary)' }}>
              {switchOn ? l.enabled : l.disabledLabel}
            </span>
          </div>
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.sliderValue(slider)}</label>
          <Slider value={slider} onChange={setSlider} />
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.rate}</label>
          <Rate value={rate} onChange={setRate} />
        </div>
      </div>

      <h3>{l.sections.dateTime}</h3>
      <div className="forms-grid">
        <div className="forms-cell">
          <label className="forms-label">{l.labels.datePicker}</label>
          <DatePicker placeholder={l.placeholders.pickDate} />
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.rangePicker}</label>
          <RangePicker />
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.timePicker}</label>
          <TimePicker placeholder={l.placeholders.pickTime} />
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.colorPicker}</label>
          <ColorPicker value={color} onChange={setColor} />
        </div>
      </div>

      <h3>{l.sections.specialised}</h3>
      <div className="forms-grid">
        <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
          <label className="forms-label">{l.labels.tagInput}</label>
          <TagInput
            value={tags}
            onChange={setTags}
            maxTags={8}
            placeholder={l.placeholders.tagInput}
            tagColor="processing"
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.pinInputDigits}</label>
          <PinInput
            value={pin}
            onChange={setPin}
            onComplete={(v) => notification.success(l.toasts.pinComplete(v))}
            length={6}
            type="numeric"
          />
        </div>
        <div className="forms-cell">
          <label className="forms-label">{l.labels.pinInputMasked}</label>
          <PinInput length={4} mask type="alphanumeric" />
        </div>
        <div className="forms-cell" style={{ gridColumn: 'span 2' }}>
          <label className="forms-label">{l.labels.inlineEdit}</label>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <InlineEdit
              value={inlineVal}
              onSave={(v) => {
                setInlineVal(v)
                notification.info(l.toasts.saved(v))
              }}
            />
            <InlineEdit defaultValue={l.inlineNoButtons} showButtons={false} saveOnBlur />
            <InlineEdit disabled defaultValue={l.inlineDisabled} />
          </div>
        </div>
      </div>
    </div>
  )
}
