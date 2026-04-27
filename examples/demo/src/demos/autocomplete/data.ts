import type { AutoCompleteOption } from '@skygraph/react'

export const frameworkOptions: AutoCompleteOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'angular', label: 'Angular' },
  { value: 'preact', label: 'Preact' },
  { value: 'lit', label: 'Lit' },
  { value: 'qwik', label: 'Qwik' },
]

export const emailDomains: AutoCompleteOption[] = [
  'gmail.com',
  'outlook.com',
  'icloud.com',
  'yahoo.com',
  'proton.me',
  'hey.com',
  'fastmail.com',
].map((d) => ({ value: d, label: d }))

export const cityDatabase = [
  'Amsterdam', 'Berlin', 'Copenhagen', 'Dublin', 'Edinburgh',
  'Florence', 'Geneva', 'Helsinki', 'Istanbul', 'Jerusalem',
  'Kyoto', 'Lisbon', 'Madrid', 'Nairobi', 'Oslo',
  'Paris', 'Quebec', 'Riga', 'Stockholm', 'Tokyo',
  'Uppsala', 'Vienna', 'Warsaw', 'Yokohama', 'Zurich',
]
