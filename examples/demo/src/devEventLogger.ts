/**
 * Dev-only delegated event logger for the demo / stream.
 *
 * Instead of wiring a `console.log` into every one of the hundreds of demo
 * files, we attach a single set of delegated listeners on `document` and infer
 * which SkyGraph component an interaction happened on from the nearest element
 * carrying an `sg-*` class. This logs clicks, value changes and key presses for
 * every component automatically.
 *
 * Logging is throttled per (component + type) to keep the console readable
 * during rapid interactions (typing, dragging, scrolling).
 */

const PREFIX_STYLE =
  'color:#fff;background:#aa3bff;padding:1px 6px;border-radius:4px;font-weight:600'
const TYPE_STYLE = 'color:#aa3bff;font-weight:600'
const META_STYLE = 'color:#64748b'

/** Friendly names for `sg-<base>` class roots whose abbreviation isn't obvious. */
const COMPONENT_LABELS: Record<string, string> = {
  tp: 'TimePicker',
  td: 'Table',
  th: 'Table',
  input: 'Input',
  btn: 'Button',
}

/**
 * Walk up from the event target and return the most specific SkyGraph
 * component name, derived from the first `sg-<name>` class found.
 */
function resolveComponent(target: EventTarget | null): { name: string; cls: string } | null {
  let el = target as Element | null
  while (el && el !== document.body) {
    if (el.classList) {
      for (const cls of el.classList) {
        const m = /^sg-([a-z0-9]+)/.exec(cls)
        if (m) {
          const base = m[1]
          const label = COMPONENT_LABELS[base] ?? base.charAt(0).toUpperCase() + base.slice(1)
          return { name: label, cls }
        }
      }
    }
    el = el.parentElement
  }
  return null
}

/** Short, readable description of the interacted element. */
function describeTarget(target: EventTarget | null): Record<string, unknown> {
  const el = target as HTMLElement | null
  if (!el) return {}
  const info: Record<string, unknown> = { tag: el.tagName.toLowerCase() }
  if (el instanceof HTMLInputElement) {
    info.value = el.type === 'checkbox' || el.type === 'radio' ? el.checked : el.value
    if (el.type) info.inputType = el.type
  } else if (el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
    info.value = el.value
  } else {
    const text = el.textContent?.trim()
    if (text) info.text = text.length > 40 ? text.slice(0, 40) + '…' : text
  }
  return info
}

const lastLogged = new Map<string, number>()
const THROTTLE_MS = 250

function log(type: string, target: EventTarget | null) {
  const component = resolveComponent(target)
  if (!component) return

  const key = `${component.name}:${type}`
  const now = Date.now()
  const prev = lastLogged.get(key)
  if (prev != null && now - prev < THROTTLE_MS) return
  lastLogged.set(key, now)

  // eslint-disable-next-line no-console
  console.log(
    `%c[SkyGraph]%c ${type} %c→ ${component.name}`,
    PREFIX_STYLE,
    TYPE_STYLE,
    META_STYLE,
    { class: component.cls, ...describeTarget(target) },
  )
}

let installed = false

/**
 * Attaches the delegated listeners once. Safe to call multiple times
 * (StrictMode double-invoke, HMR).
 */
export function installDevEventLogger(): void {
  if (installed || typeof document === 'undefined') return
  installed = true

  document.addEventListener('click', (e) => log('click', e.target), true)
  document.addEventListener('change', (e) => log('change', e.target), true)
  document.addEventListener('input', (e) => log('input', e.target), true)
  document.addEventListener(
    'keydown',
    (e) => {
      const key = (e as KeyboardEvent).key
      if (key === 'Enter' || key === 'Escape' || key.startsWith('Arrow')) {
        log(`keydown:${key}`, e.target)
      }
    },
    true,
  )

  // eslint-disable-next-line no-console
  console.log(
    '%c[SkyGraph]%c dev event logger active — interactions on sg-* components are logged here.',
    PREFIX_STYLE,
    META_STYLE,
  )
}
