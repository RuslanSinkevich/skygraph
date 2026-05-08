export interface LanguageOption {
  /** Language code (e.g. `'en'`). */
  code: string
  /** Short label shown on the button (e.g. `'EN'`). */
  label: string
  /** Tooltip / aria title (e.g. `'English'`). */
  fullName?: string
}

export interface LanguageSwitcherProps {
  /** Available languages. */
  options: readonly LanguageOption[]
  /** Currently-active language code. */
  active: string
  /** Selection handler. */
  onChange: (code: string) => void
  /** Group aria-label. */
  groupLabel?: string
}

/**
 * Inline pill group — each language gets a 4-character button. Active
 * code is filled; others are subtle. Used in the footer bottom strip.
 */
export function LanguageSwitcher({
  options,
  active,
  onChange,
  groupLabel = 'Language',
}: LanguageSwitcherProps) {
  return (
    <div role="group" aria-label={groupLabel} className="xshell-lang">
      {options.map((opt) => {
        const isActive = opt.code === active
        return (
          <button
            key={opt.code}
            type="button"
            className={
              isActive ? 'xshell-lang-btn xshell-lang-btn--active' : 'xshell-lang-btn'
            }
            onClick={() => onChange(opt.code)}
            aria-pressed={isActive}
            title={opt.fullName ?? opt.label}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
