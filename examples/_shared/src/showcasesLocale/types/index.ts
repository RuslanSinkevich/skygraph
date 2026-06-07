import type { ChatLocale } from './chat'
import type { InboxLocale } from './inbox'
import type { HelpdeskLocale } from './helpdesk'
import type { DashboardLocale } from './dashboard'
import type { FileManagerLocale } from './file-manager'
import type { FormsLocale } from './forms'
import type { HrPortalLocale } from './hr-portal'
import type { AdminLocale } from './admin'
import type { CrmLocale } from './crm'
import type { EcommerceLocale } from './ecommerce'
import type { TableKitchenSinkLocale } from './table-kitchen-sink'
import type { HubLocale } from './hub'

export type { CommonActionsLocale } from './common'
export type { ChatLocale } from './chat'
export type { InboxLocale } from './inbox'
export type { HelpdeskLocale } from './helpdesk'
export type { DashboardLocale } from './dashboard'
export type { FileManagerLocale } from './file-manager'
export type { FormsLocale } from './forms'
export type { HrPortalLocale } from './hr-portal'
export type { AdminLocale } from './admin'
export type { CrmLocale } from './crm'
export type { EcommerceLocale } from './ecommerce'
export type { TableKitchenSinkLocale } from './table-kitchen-sink'
export type { HubLocale, ShowcaseCategoryKey } from './hub'

export interface ShowcasesLocale extends HubLocale {
  apps: {
    chat: ChatLocale
    inbox: InboxLocale
    helpdesk: HelpdeskLocale
    dashboard: DashboardLocale
    fileManager: FileManagerLocale
    forms: FormsLocale
    hrPortal: HrPortalLocale
    admin: AdminLocale
    crm: CrmLocale
    ecommerce: EcommerceLocale
    tableKitchenSink: TableKitchenSinkLocale
  }
}
