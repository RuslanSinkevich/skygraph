import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { Form, Field, useFormContext } from '@skygraph/react'
import type { FormEngine } from '@skygraph/core'
import {
  useForm as useRhfForm,
  FormProvider as RhfFormProvider,
  useFormContext as useRhfContext,
} from 'react-hook-form'

import { useI18n } from '../../i18n/I18nContext'
import {
  benchFill,
  formatMetric,
  nextFrames,
  runVariant,
  sleep,
  type BenchResult,
  type Runner,
} from './benchUtils'

const FIELD_COUNT = 100
const CHANGE_FIELDS = 30

function fieldNames(): string[] {
  return Array.from({ length: FIELD_COUNT }, (_, i) => `field_${i}`)
}

function buildDefaults(): Record<string, string> {
  const out: Record<string, string> = {}
  for (let i = 0; i < FIELD_COUNT; i++) out[`field_${i}`] = ''
  return out
}

interface ApiHolder {
  sky: FormEngine | null
  rhfSubmit: (() => Promise<unknown>) | null
  rhfSet: ((name: string, value: string) => void) | null
}

interface FieldCopy {
  labelAt: (i: number) => string
  placeholderAt: (i: number) => string
}

function SkySubmitProbe({ holder }: { holder: { current: ApiHolder } }) {
  const ctx = useFormContext()
  if (ctx?.form && holder.current.sky !== ctx.form) {
    holder.current.sky = ctx.form
  }
  return null
}

function SkyFormBlock({ holder, copy }: { holder: { current: ApiHolder }; copy: FieldCopy }) {
  return (
    <Form layout="vertical" defaultValues={buildDefaults()} onSubmit={() => {}}>
      <SkySubmitProbe holder={holder} />
      {fieldNames().map((n, i) => (
        <Field key={n} name={n} label={copy.labelAt(i)} placeholder={copy.placeholderAt(i)} />
      ))}
    </Form>
  )
}

function RhfHandle({ holder }: { holder: { current: ApiHolder } }) {
  const ctx = useRhfContext()
  if (!holder.current.rhfSet) {
    holder.current.rhfSet = (name, value) =>
      ctx.setValue(name, value, { shouldDirty: true, shouldValidate: false })
  }
  if (!holder.current.rhfSubmit) {
    holder.current.rhfSubmit = () =>
      new Promise((resolve) => {
        ctx.handleSubmit((values) => resolve(values))()
      })
  }
  return null
}

function RhfField({ name, idx, copy }: { name: string; idx: number; copy: FieldCopy }) {
  const ctx = useRhfContext()
  return (
    <label style={{ display: 'block', marginBottom: 8 }}>
      <span style={{ display: 'block', fontSize: 12 }}>{copy.labelAt(idx)}</span>
      <input
        {...ctx.register(name)}
        placeholder={copy.placeholderAt(idx)}
        style={{ width: '100%' }}
      />
    </label>
  )
}

function RhfFormBlock({ holder, copy }: { holder: { current: ApiHolder }; copy: FieldCopy }) {
  const methods = useRhfForm({ defaultValues: buildDefaults() })
  return (
    <RhfFormProvider {...methods}>
      <RhfHandle holder={holder} />
      <form onSubmit={methods.handleSubmit(() => {})}>
        {fieldNames().map((n, i) => (
          <RhfField key={n} name={n} idx={i} copy={copy} />
        ))}
      </form>
    </RhfFormProvider>
  )
}

interface RunOutput {
  mountMs: number
  changeMs: number
  submitBytes: number
}

function buildRunner(variant: 'skygraph' | 'rhf', copy: FieldCopy): Runner {
  return async (): Promise<{ value: number; extras?: Record<string, number> }> => {
    const host = document.createElement('div')
    host.style.position = 'fixed'
    host.style.left = '-10000px'
    host.style.top = '0'
    host.style.width = '600px'
    document.body.appendChild(host)
    const root = createRoot(host)
    const holder: { current: ApiHolder } = {
      current: { sky: null, rhfSubmit: null, rhfSet: null },
    }

    const t0 = performance.now()
    flushSync(() => {
      if (variant === 'skygraph') {
        root.render(<SkyFormBlock holder={holder} copy={copy} />)
      } else {
        root.render(<RhfFormBlock holder={holder} copy={copy} />)
      }
    })
    await nextFrames(2)
    const mountMs = performance.now() - t0

    const t1 = performance.now()
    if (variant === 'skygraph') {
      const api = holder.current.sky
      for (let i = 0; i < CHANGE_FIELDS; i++) {
        if (api) api.setValue(`field_${i}`, `value_${i}_${i}`)
      }
      await nextFrames(1)
    } else {
      const set = holder.current.rhfSet
      for (let i = 0; i < CHANGE_FIELDS; i++) {
        if (set) set(`field_${i}`, `value_${i}_${i}`)
      }
      await nextFrames(1)
    }
    const changeMs = (performance.now() - t1) / CHANGE_FIELDS

    let submitBytes = 0
    if (variant === 'skygraph') {
      const values = holder.current.sky?.getFieldsValue() ?? {}
      submitBytes = new Blob([JSON.stringify(values)]).size
    } else {
      const submit = holder.current.rhfSubmit
      if (submit) {
        const v = await submit()
        submitBytes = new Blob([JSON.stringify(v)]).size
      }
    }

    flushSync(() => root.unmount())
    host.remove()
    await sleep(16)

    const out: RunOutput = { mountMs, changeMs, submitBytes }
    return {
      value: out.mountMs,
      extras: { changeMs: out.changeMs, submitBytes: out.submitBytes },
    }
  }
}

export function FormBenchmark() {
  const { t } = useI18n()
  const b = t.benchmarks
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState('')
  const [results, setResults] = useState<BenchResult[]>([])
  const [previewVariant, setPreviewVariant] = useState<'skygraph' | 'rhf'>('skygraph')
  const abortRef = useRef<AbortController | null>(null)

  const fieldCopy = useMemo<FieldCopy>(
    () => ({
      labelAt: (i) => benchFill(b.fieldLabel, { n: String(i + 1) }),
      placeholderAt: (i) => benchFill(b.fieldPlaceholder, { n: String(i + 1) }),
    }),
    [b],
  )

  useEffect(() => () => abortRef.current?.abort(), [])

  const run = async () => {
    if (running) return
    setRunning(true)
    setResults([])
    setProgress(b.warmingUp)
    abortRef.current = new AbortController()
    const signal = abortRef.current.signal
    try {
      const variants: Array<{ id: string; label: string; runner: Runner }> = [
        { id: 'skygraph', label: b.labelSkyForm, runner: buildRunner('skygraph', fieldCopy) },
        { id: 'rhf', label: b.labelRhfForm, runner: buildRunner('rhf', fieldCopy) },
      ]
      const out: BenchResult[] = []
      for (const v of variants) {
        if (signal.aborted) throw new Error('aborted')
        setProgress(benchFill(b.runningWithLabel, { label: v.label }))
        const r = await runVariant(
          v.id,
          v.label,
          'ms',
          v.runner,
          { iterations: 5, warmup: 1, sleepMs: 64 },
          signal,
        )
        out.push(r)
        setResults([...out])
      }
      setProgress(b.done)
    } catch (err) {
      setProgress(benchFill(b.errorWithMessage, { message: (err as Error).message }))
    } finally {
      setRunning(false)
    }
  }

  const stop = () => {
    abortRef.current?.abort()
    setRunning(false)
    setProgress(b.stopped)
  }

  const methodText = benchFill(b.formMethod, {
    fields: FIELD_COUNT,
    changes: CHANGE_FIELDS,
  })

  return (
    <div className="bench-section">
      <div className="bench-controls">
        <button
          className="bench-btn bench-btn--primary"
          type="button"
          onClick={run}
          disabled={running}
        >
          {running ? b.runningEllipsis : benchFill(b.formRunIdle, { fields: FIELD_COUNT })}
        </button>
        <button className="bench-btn" type="button" onClick={stop} disabled={!running}>
          {b.stop}
        </button>
        {progress && <span className="bench-progress">{progress}</span>}
      </div>

      <div className="bench-method">
        <strong>{b.methodStrong}</strong> {methodText}
      </div>

      <ResultsTable
        variantColumn={b.variantColumn}
        emptyLabel={b.pressRunEmpty}
        results={results}
        columns={[
          { key: 'mount', label: b.colMedianMount, extract: (r) => formatMetric(r.median, 'ms') },
          {
            key: 'change',
            label: b.colPerChange,
            extract: (r) => (r.extras?.changeMs ? formatMetric(r.extras.changeMs, 'ms') : '—'),
          },
          {
            key: 'bytes',
            label: b.colSubmitBytes,
            extract: (r) =>
              r.extras?.submitBytes ? formatMetric(r.extras.submitBytes, 'bytes') : '—',
          },
          { key: 'min', label: b.colMinMount, extract: (r) => formatMetric(r.min, 'ms') },
          { key: 'max', label: b.colMaxMount, extract: (r) => formatMetric(r.max, 'ms') },
        ]}
      />

      <div className="bench-preview">
        <div className="bench-preview-head">
          <strong>{benchFill(b.livePreviewFields, { count: FIELD_COUNT })}</strong>
          <div className="bench-preview-controls">
            <label>
              {b.library}
              <select
                value={previewVariant}
                onChange={(e) => setPreviewVariant(e.target.value as 'skygraph' | 'rhf')}
                disabled={running}
              >
                <option value="skygraph">SkyGraph</option>
                <option value="rhf">react-hook-form</option>
              </select>
            </label>
          </div>
        </div>
        <div
          className="bench-preview-frame"
          style={{ maxHeight: 360, overflowY: 'auto', padding: 12 }}
        >
          {previewVariant === 'skygraph' ? (
            <SkyPreview copy={fieldCopy} />
          ) : (
            <RhfPreview copy={fieldCopy} />
          )}
        </div>
      </div>
    </div>
  )
}

function SkyPreview({ copy }: { copy: FieldCopy }) {
  return (
    <Form layout="vertical" defaultValues={buildDefaults()} onSubmit={() => {}}>
      {fieldNames().map((n, i) => (
        <Field key={n} name={n} label={copy.labelAt(i)} placeholder={copy.placeholderAt(i)} />
      ))}
    </Form>
  )
}

function RhfPreview({ copy }: { copy: FieldCopy }) {
  const methods = useRhfForm({ defaultValues: buildDefaults() })
  return (
    <RhfFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        {fieldNames().map((n, i) => (
          <RhfField key={n} name={n} idx={i} copy={copy} />
        ))}
      </form>
    </RhfFormProvider>
  )
}

interface ColumnDef {
  key: string
  label: string
  extract: (r: BenchResult) => string
}

function ResultsTable({
  results,
  columns,
  variantColumn,
  emptyLabel,
}: {
  results: BenchResult[]
  columns: ColumnDef[]
  variantColumn: string
  emptyLabel: string
}) {
  if (results.length === 0) {
    return <div className="bench-empty">{emptyLabel}</div>
  }
  return (
    <div className="bench-results">
      <table className="bench-table">
        <thead>
          <tr>
            <th>{variantColumn}</th>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id}>
              <td className="bench-table-label">
                <strong>{r.label}</strong>
              </td>
              {columns.map((c) => (
                <td key={c.key}>{c.extract(r)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
