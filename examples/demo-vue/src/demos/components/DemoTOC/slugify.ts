/**
 * Deterministic title → URL-safe slug.
 *
 * Byte-equivalent port of the React `examples/demo/src/components/
 * DemoTOC/slugify.ts` — keeping both frameworks in lockstep means a
 * Russian heading like "Базовое" maps to the same `bazovoe` anchor in
 * either app, so deep links survive the framework switch.
 */

const RU_MAP: Readonly<Record<string, string>> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
}

export function slugify(input: string): string {
  if (!input) return ''

  const lowered = input.toLowerCase().trim()

  let out = ''
  for (const ch of lowered) {
    if (RU_MAP[ch] !== undefined) {
      out += RU_MAP[ch]
    } else if (/[a-z0-9]/.test(ch)) {
      out += ch
    } else {
      out += '-'
    }
  }

  return out.replace(/-+/g, '-').replace(/^-+|-+$/g, '')
}
