import type { PrintOptions } from './types'

/**
 * 1:1 порт `packages/react/src/utils/print/printElement.ts`. Никаких
 * Angular-специфичных API не используется — pure-функции работают
 * против `document`/`window`, поэтому одинаково ведут себя в любом
 * фреймворке.
 */
export function buildPageRule(opts: PrintOptions = {}): string {
  const orientation = opts.orientation ?? 'portrait'
  const pageSize = opts.pageSize ?? 'A4'
  const margins = opts.margins ?? '1cm'
  return `@page { size: ${pageSize} ${orientation}; margin: ${margins}; }`
}

export function buildPrintHtml(
  fragment: string,
  opts: PrintOptions = {},
  documentRef: Document | null = typeof document !== 'undefined' ? document : null,
): string {
  const styles =
    documentRef === null
      ? ''
      : Array.from(documentRef.querySelectorAll('style, link[rel="stylesheet"]'))
          .map((el) => el.outerHTML)
          .join('\n')

  const pageRule = buildPageRule(opts)
  const scale = opts.scale && opts.scale !== 1 ? opts.scale : null
  const title = escapeHtml(opts.fileName ?? 'SkyGraph print')
  const customStyles = opts.customStyles ?? ''

  const wrapperOpen = scale
    ? `<div class="sg-print-root" style="transform: scale(${scale}); transform-origin: 0 0;">`
    : `<div class="sg-print-root">`

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${title}</title>
${styles}
<style>
  ${pageRule}
  html, body { margin: 0; padding: 0; background: #fff; }
  body { padding: 0; }
  .sg-print-root { width: 100%; }
  ${customStyles}
</style>
</head>
<body>
${wrapperOpen}
${fragment}
</div>
</body>
</html>`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Открывает popup-окно с inlined-стилями SkyGraph и `outerHTML` `node`,
 * вызывает `window.print()`. Возвращает popup или `null`.
 *
 * Используется в Angular как обычная функция (никаких `inject()` —
 * это чистая утилита):
 * ```ts
 * import { printElement } from '@skygraph/angular'
 * printElement(elementRef.nativeElement, { fileName: 'report.pdf' })
 * ```
 */
export function printElement(node: Element | null, opts: PrintOptions = {}): Window | null {
  if (!node) return null
  if (typeof window === 'undefined') return null

  const popup = window.open('', '_blank')
  if (!popup) return null

  const html = buildPrintHtml(node.outerHTML, opts)
  popup.document.open()
  popup.document.write(html)
  popup.document.close()
  popup.focus()

  if (opts.skipPrint) return popup

  const trigger = () => {
    try {
      popup.print()
    } catch {
      // печать может быть заблокирована — popup остаётся открытым
    }
    if (!opts.keepOpen) {
      try {
        popup.close()
      } catch {
        // closed by user / blocked — ignore
      }
    }
  }

  if (popup.document.readyState === 'complete') {
    setTimeout(trigger, 0)
  } else {
    popup.addEventListener('load', () => setTimeout(trigger, 0), { once: true })
    setTimeout(trigger, 300)
  }

  return popup
}
