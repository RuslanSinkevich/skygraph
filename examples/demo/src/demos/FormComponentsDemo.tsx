import { useMemo, useState } from 'react'
import {
  Input,
  Textarea,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  AutoComplete,
  Checkbox,
  RadioGroup,
  Switch,
  Slider,
  Rate,
  Upload,
} from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

import { useFormComponentsDocStrings } from './form-components-doc/useFormComponentsDocStrings'
import type { FormComponentsDocStrings } from './form-components-doc/en'

function InputNumberDemo() {
  const [value, setValue] = useState<number | undefined>(25)
  return (
    <InputNumber
      value={value}
      onChange={(v) => setValue(v ?? undefined)}
      min={0}
      max={120}
    />
  )
}

function SliderDemo({ t }: { t: FormComponentsDocStrings }) {
  const [value, setValue] = useState(50)
  return (
    <div>
      <Slider value={value} onChange={setValue} />
      <span>{t.inSliderValue}: {value}</span>
    </div>
  )
}

function RateDemo() {
  const [value, setValue] = useState(3)
  return <Rate value={value} onChange={setValue} />
}

function UploadDemo() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const handleUpload = (newFiles: File[]) => {
    const uploaded: UploadFile[] = newFiles.map((f, i) => ({
      uid: `${Date.now()}-${i}`,
      name: f.name,
      size: f.size,
      status: 'done' as const,
    }))
    setFiles((prev) => [...prev, ...uploaded])
  }
  return (
    <Upload
      accept=".pdf,.doc,.docx"
      fileList={files}
      onUpload={handleUpload}
      onRemove={(f) => setFiles((prev) => prev.filter((x) => x.uid !== f.uid))}
    />
  )
}

function UploadMultiple() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const handleUpload = (newFiles: File[]) => {
    const uploaded: UploadFile[] = newFiles.map((f, i) => ({
      uid: `${Date.now()}-${i}`,
      name: f.name,
      size: f.size,
      status: 'done' as const,
    }))
    setFiles((prev) => [...prev, ...uploaded])
  }
  return (
    <Upload
      multiple
      accept="image/*"
      fileList={files}
      onUpload={handleUpload}
      onRemove={(f) => setFiles((prev) => prev.filter((x) => x.uid !== f.uid))}
    />
  )
}

function FullFormDemo({ t }: { t: FormComponentsDocStrings }) {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [age, setAge] = useState<number | undefined>(25)
  const [city, setCity] = useState<string | number>('')
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')
  const [skill, setSkill] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [gender, setGender] = useState<string | number>('other')
  const [dark, setDark] = useState(false)
  const [exp, setExp] = useState(50)
  const [rating, setRating] = useState(3)

  const cityOptions = useMemo(
    () => [
      { label: 'Moscow', value: 'moscow' },
      { label: 'Berlin', value: 'berlin' },
      { label: 'Tokyo', value: 'tokyo' },
      { label: 'London', value: 'london' },
    ],
    [],
  )

  const skillOptions = useMemo(
    () => [
      { label: 'React', value: 'React' },
      { label: 'TypeScript', value: 'TypeScript' },
      { label: 'Node.js', value: 'Node.js' },
      { label: 'Python', value: 'Python' },
    ],
    [],
  )

  const genderOptions = useMemo(
    () => [
      { label: t.inGenderMale, value: 'male' },
      { label: t.inGenderFemale, value: 'female' },
      { label: t.inGenderOther, value: 'other' },
    ],
    [t],
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <label className="sg-field-label">{t.inLabelName}</label>
        <Input value={name} onChange={setName} placeholder={t.inPlaceholderName} />
      </div>
      <div>
        <label className="sg-field-label">{t.inLabelBio}</label>
        <Textarea value={bio} onChange={setBio} placeholder={t.inPlaceholderBio} rows={2} showCount maxLength={200} />
      </div>
      <div>
        <label className="sg-field-label">{t.inLabelAge}</label>
        <InputNumber value={age} onChange={(v) => setAge(v ?? undefined)} min={0} max={120} />
      </div>
      <div>
        <label className="sg-field-label">{t.inLabelCity}</label>
        <Select value={city} onChange={setCity} options={cityOptions} placeholder={t.inPlaceholderCity} />
      </div>
      <div>
        <label className="sg-field-label">{t.inLabelBirthDate}</label>
        <DatePicker value={date ?? undefined} onChange={(d) => setDate(d)} />
      </div>
      <div>
        <label className="sg-field-label">{t.inLabelMeetingTime}</label>
        <TimePicker value={time} onChange={setTime} />
      </div>
      <div>
        <label className="sg-field-label">{t.inLabelSkill}</label>
        <AutoComplete value={skill} onChange={setSkill} options={skillOptions} placeholder={t.inPlaceholderSkill} />
      </div>
      <div>
        <label className="sg-field-label">{t.inLabelGender}</label>
        <RadioGroup value={gender} onChange={setGender} options={genderOptions} />
      </div>
      <Checkbox checked={newsletter} onChange={setNewsletter}>{t.inLabelNewsletter}</Checkbox>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Switch checked={dark} onChange={setDark} />
        <span>{t.inLabelDarkMode}</span>
      </div>
      <div>
        <label className="sg-field-label">{t.inLabelExperience} ({exp}%)</label>
        <Slider value={exp} onChange={setExp} />
      </div>
      <div>
        <label className="sg-field-label">{t.inLabelRating}</label>
        <Rate value={rating} onChange={setRating} />
      </div>
    </div>
  )
}

export function FormComponentsDemo() {
  const t = useFormComponentsDocStrings()

  const inputNumberProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.inputNumberValue, type: 'number' },
      { name: 'onChange', description: t.inputNumberOnChange, type: '(value: number) => void' },
      { name: 'min', description: t.inputNumberMin, type: 'number' },
      { name: 'max', description: t.inputNumberMax, type: 'number' },
      { name: 'step', description: t.inputNumberStep, type: 'number', default: '1' },
      { name: 'disabled', description: t.inputNumberDisabled, type: 'boolean', default: 'false' },
      { name: 'placeholder', description: t.inputNumberPlaceholder, type: 'string' },
    ],
    [t],
  )

  const sliderProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.sliderValue, type: 'number' },
      { name: 'onChange', description: t.sliderOnChange, type: '(value: number) => void' },
      { name: 'min', description: t.sliderMin, type: 'number', default: '0' },
      { name: 'max', description: t.sliderMax, type: 'number', default: '100' },
      { name: 'step', description: t.sliderStep, type: 'number', default: '1' },
      { name: 'disabled', description: t.sliderDisabled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const rateProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.rateValue, type: 'number' },
      { name: 'onChange', description: t.rateOnChange, type: '(value: number) => void' },
      { name: 'count', description: t.rateCount, type: 'number', default: '5' },
      { name: 'allowHalf', description: t.rateAllowHalf, type: 'boolean', default: 'false' },
      { name: 'disabled', description: t.rateDisabled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const uploadProps = useMemo<PropDef[]>(
    () => [
      { name: 'fileList', description: t.uploadFileList, type: 'UploadFile[]' },
      { name: 'onUpload', description: t.uploadOnUpload, type: '(files: File[]) => void' },
      { name: 'onRemove', description: t.uploadOnRemove, type: '(file: UploadFile) => void' },
      { name: 'accept', description: t.uploadAccept, type: 'string' },
      { name: 'multiple', description: t.uploadMultiple, type: 'boolean', default: 'false' },
      { name: 'disabled', description: t.uploadDisabled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2]}
    >
      <DemoBox
        title={t.demoInputNumberTitle}
        description={t.demoInputNumberDesc}
        code={`import { InputNumber } from '@skygraph/react'

const [value, setValue] = useState(25)

<InputNumber value={value} onChange={setValue} min={0} max={120} />`}
      >
        <InputNumberDemo />
      </DemoBox>

      <DemoBox
        title={t.demoSliderTitle}
        description={t.demoSliderDesc}
        code={`import { Slider } from '@skygraph/react'

const [value, setValue] = useState(50)

<Slider value={value} onChange={setValue} />`}
      >
        <div style={{ maxWidth: 400 }}>
          <SliderDemo t={t} />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoRateTitle}
        description={t.demoRateDesc}
        code={`import { Rate } from '@skygraph/react'

const [value, setValue] = useState(3)

<Rate value={value} onChange={setValue} />`}
      >
        <RateDemo />
      </DemoBox>

      <DemoBox
        title={t.demoUploadTitle}
        description={t.demoUploadDesc}
        code={`import { Upload } from '@skygraph/react'

<Upload
  accept=".pdf,.doc"
  fileList={files}
  onUpload={handleUpload}
  onRemove={(f) => setFiles(prev => prev.filter(x => x.uid !== f.uid))}
/>`}
      >
        <UploadDemo />
      </DemoBox>

      <DemoBox
        title={t.demoInputNumberStepTitle}
        description={t.demoInputNumberStepDesc}
        code={`<InputNumber defaultValue={0.5} step={0.1} min={0} max={1} />
<InputNumber defaultValue={42} disabled />`}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <InputNumber defaultValue={0.5} step={0.1} min={0} max={1} />
          <InputNumber defaultValue={42} disabled />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoSliderRangeTitle}
        description={t.demoSliderRangeDesc}
        code={`<Slider defaultValue={60} step={10} />
<Slider defaultValue={30} disabled />`}
      >
        <div style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Slider defaultValue={60} step={10} />
          <Slider defaultValue={30} disabled />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoRateHalfTitle}
        description={t.demoRateHalfDesc}
        code={`<Rate defaultValue={2.5} allowHalf />
<Rate defaultValue={7} count={10} />
<Rate defaultValue={4} disabled />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Rate defaultValue={2.5} allowHalf />
          <Rate defaultValue={7} count={10} />
          <Rate defaultValue={4} disabled />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoUploadMultipleTitle}
        description={t.demoUploadMultipleDesc}
        code={`<Upload multiple accept="image/*" fileList={files} onUpload={handleUpload} />`}
      >
        <UploadMultiple />
      </DemoBox>

      <DemoBox
        title={t.demoScopedBrandTitle}
        description={t.demoScopedBrandDesc}
        code={`<div style={{ ['--sg-color-primary' as any]: '#db2777' }}>
  <Slider defaultValue={50} />
  <Rate defaultValue={3} />
</div>`}
      >
        <div
          style={{
            ['--sg-color-primary' as never]: '#db2777',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            maxWidth: 400,
          }}
        >
          <Slider defaultValue={50} />
          <Rate defaultValue={3} />
          <Switch defaultChecked />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoFullFormTitle}
        description={t.demoFullFormDesc}
        code={`<Input value={name} onChange={setName} />
<Textarea value={bio} onChange={setBio} rows={2} />
<InputNumber value={age} onChange={setAge} />
<Select value={city} onChange={setCity} options={options} />
<DatePicker value={date} onChange={setDate} />
<TimePicker value={time} onChange={setTime} />
<AutoComplete value={skill} onChange={setSkill} options={options} />
<RadioGroup value={gender} onChange={setGender} options={options} />
<Checkbox checked={newsletter} onChange={setNewsletter}>Label</Checkbox>
<Switch checked={dark} onChange={setDark} />
<Slider value={exp} onChange={setExp} />
<Rate value={rating} onChange={setRating} />`}
      >
        <FullFormDemo t={t} />
      </DemoBox>

      <PropsTable title={t.tableInputNumberApi} data={inputNumberProps} />
      <PropsTable title={t.tableSliderApi} data={sliderProps} />
      <PropsTable title={t.tableRateApi} data={rateProps} />
      <PropsTable title={t.tableUploadApi} data={uploadProps} />
    </ComponentDoc>
  )
}
