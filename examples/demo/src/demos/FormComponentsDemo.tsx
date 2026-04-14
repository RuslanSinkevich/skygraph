import { useState } from 'react'
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

const inputNumberProps: PropDef[] = [
  { name: 'value', description: 'Current value', type: 'number' },
  { name: 'onChange', description: 'Callback when value changes', type: '(value: number) => void' },
  { name: 'min', description: 'Minimum value', type: 'number' },
  { name: 'max', description: 'Maximum value', type: 'number' },
  { name: 'step', description: 'Step increment', type: 'number', default: '1' },
  { name: 'disabled', description: 'Disable the input', type: 'boolean', default: 'false' },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
]

const sliderProps: PropDef[] = [
  { name: 'value', description: 'Current value', type: 'number' },
  { name: 'onChange', description: 'Callback when value changes', type: '(value: number) => void' },
  { name: 'min', description: 'Minimum value', type: 'number', default: '0' },
  { name: 'max', description: 'Maximum value', type: 'number', default: '100' },
  { name: 'step', description: 'Step increment', type: 'number', default: '1' },
  { name: 'disabled', description: 'Disable the slider', type: 'boolean', default: 'false' },
]

const rateProps: PropDef[] = [
  { name: 'value', description: 'Current value', type: 'number' },
  { name: 'onChange', description: 'Callback when value changes', type: '(value: number) => void' },
  { name: 'count', description: 'Total star count', type: 'number', default: '5' },
  { name: 'allowHalf', description: 'Allow half-star selection', type: 'boolean', default: 'false' },
  { name: 'disabled', description: 'Disable the rate', type: 'boolean', default: 'false' },
]

const uploadProps: PropDef[] = [
  { name: 'fileList', description: 'List of uploaded files', type: 'UploadFile[]' },
  { name: 'onUpload', description: 'Callback when files are selected', type: '(files: File[]) => void' },
  { name: 'onRemove', description: 'Callback when a file is removed', type: '(file: UploadFile) => void' },
  { name: 'accept', description: 'Accepted file types', type: 'string' },
  { name: 'multiple', description: 'Allow multiple file selection', type: 'boolean', default: 'false' },
  { name: 'disabled', description: 'Disable the uploader', type: 'boolean', default: 'false' },
]

const cityOptions = [
  { label: 'Moscow', value: 'moscow' },
  { label: 'Berlin', value: 'berlin' },
  { label: 'Tokyo', value: 'tokyo' },
  { label: 'London', value: 'london' },
]

const skillOptions = [
  { label: 'React', value: 'React' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Node.js', value: 'Node.js' },
  { label: 'Python', value: 'Python' },
]

function InputNumberDemo() {
  const [value, setValue] = useState<number | undefined>(25)
  return <InputNumber value={value} onChange={setValue} min={0} max={120} />
}

function SliderDemo() {
  const [value, setValue] = useState(50)
  return (
    <div>
      <Slider value={value} onChange={setValue} />
      <span>Value: {value}</span>
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

function FullFormDemo() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [age, setAge] = useState<number | undefined>(25)
  const [city, setCity] = useState<string | number>('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [skill, setSkill] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [gender, setGender] = useState<string | number>('other')
  const [dark, setDark] = useState(false)
  const [exp, setExp] = useState(50)
  const [rating, setRating] = useState(3)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <label className="sg-field-label">Name</label>
        <Input value={name} onChange={setName} placeholder="Your name" />
      </div>
      <div>
        <label className="sg-field-label">Bio</label>
        <Textarea value={bio} onChange={setBio} placeholder="Tell about yourself" rows={2} showCount maxLength={200} />
      </div>
      <div>
        <label className="sg-field-label">Age</label>
        <InputNumber value={age} onChange={setAge} min={0} max={120} />
      </div>
      <div>
        <label className="sg-field-label">City</label>
        <Select value={city} onChange={setCity} options={cityOptions} placeholder="Select city" />
      </div>
      <div>
        <label className="sg-field-label">Birth Date</label>
        <DatePicker value={date} onChange={setDate} />
      </div>
      <div>
        <label className="sg-field-label">Meeting Time</label>
        <TimePicker value={time} onChange={setTime} />
      </div>
      <div>
        <label className="sg-field-label">Skill</label>
        <AutoComplete value={skill} onChange={setSkill} options={skillOptions} placeholder="Type to search..." />
      </div>
      <div>
        <label className="sg-field-label">Gender</label>
        <RadioGroup value={gender} onChange={setGender} options={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Other', value: 'other' },
        ]} />
      </div>
      <Checkbox checked={newsletter} onChange={setNewsletter}>Subscribe to newsletter</Checkbox>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Switch checked={dark} onChange={setDark} />
        <span>Dark mode</span>
      </div>
      <div>
        <label className="sg-field-label">Experience ({exp}%)</label>
        <Slider value={exp} onChange={setExp} />
      </div>
      <div>
        <label className="sg-field-label">Rating</label>
        <Rate value={rating} onChange={setRating} />
      </div>
    </div>
  )
}

export function FormComponentsDemo() {
  return (
    <ComponentDoc
      title="Form Components"
      description="All form input components working together in various combinations."
      whenToUse={[
        'When you need to build complex forms with various input types.',
        'When you want to see all input components side by side.',
      ]}
    >
      <DemoBox
        title="InputNumber"
        description="Numeric input field with step controls."
        code={`import { InputNumber } from '@skygraph/react'

const [value, setValue] = useState(25)

<InputNumber value={value} onChange={setValue} min={0} max={120} />`}
      >
        <InputNumberDemo />
      </DemoBox>

      <DemoBox
        title="Slider"
        description="A slider for selecting a value from a range."
        code={`import { Slider } from '@skygraph/react'

const [value, setValue] = useState(50)

<Slider value={value} onChange={setValue} />`}
      >
        <div style={{ maxWidth: 400 }}>
          <SliderDemo />
        </div>
      </DemoBox>

      <DemoBox
        title="Rate"
        description="Star rating component."
        code={`import { Rate } from '@skygraph/react'

const [value, setValue] = useState(3)

<Rate value={value} onChange={setValue} />`}
      >
        <RateDemo />
      </DemoBox>

      <DemoBox
        title="Upload"
        description="File upload component."
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
        title="Full Form"
        description="All form input components combined in a single form layout."
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
        <FullFormDemo />
      </DemoBox>

      <PropsTable title="InputNumber API" data={inputNumberProps} />
      <PropsTable title="Slider API" data={sliderProps} />
      <PropsTable title="Rate API" data={rateProps} />
      <PropsTable title="Upload API" data={uploadProps} />
    </ComponentDoc>
  )
}
