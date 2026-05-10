import type { SgLocale } from '../types'

/** French (fr-FR) preset for {@link SgConfigProvider} `locale`. */
export const fr_FR: SgLocale = {
  modal: {
    okText: 'OK',
    cancelText: 'Annuler',
  },
  popconfirm: {
    okText: 'Oui',
    cancelText: 'Non',
  },
  empty: {
    description: 'Aucune donnée',
  },
  pagination: {
    totalPrefix: 'Total',
    itemsPerPage: ' / page',
    jump: 'Aller à',
    page: 'page',
  },
  inputPassword: {
    showPassword: 'Afficher le mot de passe',
    hidePassword: 'Masquer le mot de passe',
    strengthWeak: 'Faible',
    strengthMedium: 'Moyen',
    strengthStrong: 'Fort',
    strengthVeryStrong: 'Très fort',
  },
  searchInput: {
    placeholder: 'Rechercher…',
    clear: 'Effacer',
    search: 'Rechercher',
  },
  tagInput: {
    placeholder: 'Ajouter un tag…',
    removeTag: 'Supprimer',
  },
  pinInput: {
    ariaLabel: 'Saisie PIN',
  },
  inlineEdit: {
    placeholder: 'Cliquer pour modifier…',
    save: 'Enregistrer',
    cancel: 'Annuler',
  },
}
