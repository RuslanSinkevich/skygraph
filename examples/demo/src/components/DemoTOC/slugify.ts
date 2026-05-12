/**
 * Deterministic title → URL-safe slug.
 *
 * Rules (kept tiny on purpose — TOC ids are user-visible in the URL hash):
 *   • Lower-case ASCII letters, digits and dashes survive verbatim.
 *   • Whitespace and most punctuation become a single dash.
 *   • A small built-in Cyrillic transliteration table covers Russian
 *     headings so that "Базовое" → "bazovoe" instead of "".
 *   • Leading and trailing dashes are trimmed; runs of dashes collapse.
 *   • An empty result falls back to "section" so that a TOC entry can
 *     still be addressed (the caller decides whether to skip empty
 *     titles — see DemoBox.tsx).
 *
 * The function is intentionally synchronous, dependency-free and
 * deterministic — duplicates on the same page are disambiguated at the
 * Provider layer by appending `-2`, `-3`, … (see DemoTOCContext).
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
