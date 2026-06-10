/**
 * Global demo interaction logger.
 *
 * Instead of wiring `console.log` into every one of the hundreds of demo
 * files, we delegate at the document level and log a structured "reaction"
 * line for any interaction that lands on a SkyGraph component (`sg-*`). This
 * covers clicks, value changes and toggles across every component uniformly.
 *
 * Demo-only: it's imported from `main.ts` and never ships inside the library.
 */

const PREFIX = '%c🐰 SkyGraph'
const STYLE = 'color:#aa3bff;font-weight:600'

/** Single-segment component roots (`sg-button`, `sg-switch`, …) win over
 *  compound utility classes (`sg-button-icon`, `sg-table-td`). */
function resolveComponent(start: Element | null): { name: string; root: Element } | null {
  let node: Element | null = start
  let fallback: { name: string; root: Element } | null = null
  while (node && node !== document.body) {
    const cls = node.classList
    if (cls && cls.length) {
      for (const c of cls) {
        const exact = /^sg-([a-z0-9]+)$/.exec(c)
        if (exact) return { name: exact[1], root: node }
        if (!fallback) {
          const compound = /^sg-([a-z0-9]+)(?:-[a-z0-9-]+)?$/.exec(c)
          if (compound) fallback = { name: compound[1], root: node }
        }
      }
    }
    node = node.parentElement
  }
  return fallback
}

/** Short, human-readable label for the interacted element. */
function describeTarget(el: Element): string {
  const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ')
  if (text && text.length <= 32) return `"${text}"`
  if (text) return `"${text.slice(0, 29)}…"`
  const aria = el.getAttribute('aria-label')
  if (aria) return `[${aria}]`
  return `<${el.tagName.toLowerCase()}>`
}

/** Value/state read from a form-control-ish target, if any. */
function readValue(el: Element): string | null {
  if (el instanceof HTMLInputElement) {
    if (el.type === 'checkbox' || el.type === 'radio') return `checked=${el.checked}`
    return `value=${JSON.stringify(el.value)}`
  }
  if (el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
    return `value=${JSON.stringify(el.value)}`
  }
  const ariaChecked = el.getAttribute('aria-checked')
  if (ariaChecked != null) return `checked=${ariaChecked}`
  return null
}

function log(
  event: string,
  comp: { name: string; root: Element },
  target: Element,
  extra?: string | null,
) {
  const parts = [`${event} → ${comp.name}`, describeTarget(target)]
  if (extra) parts.push(extra)
  // eslint-disable-next-line no-console
  console.log(PREFIX, STYLE, parts.join('  '))
}

let installed = false

export function installInteractionLogger() {
  if (installed || typeof document === 'undefined') return
  installed = true

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as Element | null
      if (!target) return
      const comp = resolveComponent(target)
      if (!comp) return
      // Read the resulting state after the component has updated. Toggle
      // widgets (switch, rate, checkbox-as-button) expose `aria-checked` /
      // `aria-pressed` on their root rather than firing a native `change`.
      // A macrotask defer lets Vue flush the DOM update first.
      setTimeout(() => {
        const state =
          comp.root.getAttribute('aria-checked') ??
          comp.root.getAttribute('aria-pressed') ??
          comp.root.getAttribute('aria-expanded')
        log('click', comp, target, state != null ? `state=${state}` : null)
      })
    },
    true,
  )

  document.addEventListener(
    'change',
    (e) => {
      const target = e.target as Element | null
      if (!target) return
      const comp = resolveComponent(target)
      if (!comp) return
      log('change', comp, target, readValue(target))
    },
    true,
  )

  // eslint-disable-next-line no-console
  console.log(
    PREFIX,
    STYLE,
    'interaction logger active — reactions from sg-* components are logged here',
  )
}
