import { useState } from 'react'
import {
  Form,
  Field,
  SubmitButton,
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

const cityOptions = [
  { label: 'Moscow', value: 'moscow' },
  { label: 'Berlin', value: 'berlin' },
  { label: 'Tokyo', value: 'tokyo' },
  { label: 'London', value: 'london' },
  { label: 'Paris', value: 'paris' },
]

const skillOptions = [
  { label: 'React', value: 'React' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Node.js', value: 'Node.js' },
  { label: 'Python', value: 'Python' },
  { label: 'Rust', value: 'Rust' },
  { label: 'Go', value: 'Go' },
]

export function FormComponentsDemo() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [age, setAge] = useState<number | null>(25)
  const [city, setCity] = useState<string | number>('')
  const [birthDate, setBirthDate] = useState('')
  const [meetingTime, setMeetingTime] = useState('')
  const [skill, setSkill] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [gender, setGender] = useState<string | number>('other')
  const [darkMode, setDarkMode] = useState(false)
  const [experience, setExperience] = useState(50)
  const [rating, setRating] = useState(3)
  const [files, setFiles] = useState<UploadFile[]>([])

  const handleSubmit = () => {
    alert(JSON.stringify({
      name, email, bio, age, city, birthDate, meetingTime,
      skill, newsletter, gender, darkMode, experience, rating,
      files: files.map(f => f.name),
    }, null, 2))
  }

  const handleUpload = (newFiles: File[]) => {
    const uploaded: UploadFile[] = newFiles.map((f, i) => ({
      uid: `${Date.now()}-${i}`,
      name: f.name,
      size: f.size,
      status: 'done' as const,
    }))
    setFiles([...files, ...uploaded])
  }

  return (
    <section>
      <h2>Full Form Demo</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        All form components working together
      </p>

      <div style={{ maxWidth: 500 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div>
            <label className="sg-field-label">Name</label>
            <Input value={name} onChange={setName} placeholder="Your name" />
          </div>

          <div>
            <label className="sg-field-label">Email</label>
            <Input value={email} onChange={setEmail} type="email" placeholder="your@email.com" />
          </div>

          <div>
            <label className="sg-field-label">Bio</label>
            <Textarea value={bio} onChange={setBio} placeholder="Tell about yourself" rows={3} showCount maxLength={200} />
          </div>

          <div>
            <label className="sg-field-label">Age</label>
            <InputNumber value={age ?? undefined} onChange={(v) => setAge(v)} min={0} max={120} />
          </div>

          <div>
            <label className="sg-field-label">City</label>
            <Select value={city} onChange={setCity} options={cityOptions} placeholder="Select city" />
          </div>

          <div>
            <label className="sg-field-label">Birth Date</label>
            <DatePicker value={birthDate} onChange={setBirthDate} />
          </div>

          <div>
            <label className="sg-field-label">Meeting Time</label>
            <TimePicker value={meetingTime} onChange={setMeetingTime} />
          </div>

          <div>
            <label className="sg-field-label">Primary Skill</label>
            <AutoComplete
              value={skill}
              onChange={setSkill}
              options={skillOptions}
              placeholder="Type to search..."
            />
          </div>

          <div>
            <label className="sg-field-label">Gender</label>
            <RadioGroup
              value={gender}
              onChange={setGender}
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' },
              ]}
            />
          </div>

          <div>
            <Checkbox checked={newsletter} onChange={setNewsletter}>Subscribe to newsletter</Checkbox>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Switch checked={darkMode} onChange={setDarkMode} />
            <span>Dark mode preference</span>
          </div>

          <div>
            <label className="sg-field-label">Experience level ({experience}%)</label>
            <Slider value={experience} onChange={setExperience} />
          </div>

          <div>
            <label className="sg-field-label">Rate our service</label>
            <Rate value={rating} onChange={setRating} />
          </div>

          <div>
            <label className="sg-field-label">Resume</label>
            <Upload
              accept=".pdf,.doc,.docx"
              fileList={files}
              onUpload={handleUpload}
              onRemove={(f) => setFiles(files.filter(x => x.uid !== f.uid))}
            />
          </div>

          <div style={{ marginTop: 8 }}>
            <button
              className="sg-button sg-button-primary sg-button-large"
              onClick={handleSubmit}
              style={{ width: '100%' }}
            >
              Submit Application
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
