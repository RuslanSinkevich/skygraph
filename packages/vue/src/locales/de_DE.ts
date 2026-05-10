import type { SgLocale } from '../types'

/** German (de-DE) preset for {@link SgConfigProvider} `locale`. */
export const de_DE: SgLocale = {
  modal: {
    okText: 'OK',
    cancelText: 'Abbrechen',
  },
  popconfirm: {
    okText: 'Ja',
    cancelText: 'Nein',
  },
  empty: {
    description: 'Keine Daten',
  },
  pagination: {
    totalPrefix: 'Gesamt',
    itemsPerPage: ' / Seite',
    jump: 'Gehe zu',
    page: 'Seite',
  },
  inputPassword: {
    showPassword: 'Passwort anzeigen',
    hidePassword: 'Passwort verbergen',
    strengthWeak: 'Schwach',
    strengthMedium: 'Mittel',
    strengthStrong: 'Stark',
    strengthVeryStrong: 'Sehr stark',
  },
  searchInput: {
    placeholder: 'Suchen…',
    clear: 'Leeren',
    search: 'Suchen',
  },
  tagInput: {
    placeholder: 'Tag hinzufügen…',
    removeTag: 'Entfernen',
  },
  pinInput: {
    ariaLabel: 'PIN-Eingabe',
  },
  inlineEdit: {
    placeholder: 'Klicken zum Bearbeiten…',
    save: 'Speichern',
    cancel: 'Abbrechen',
  },
}
