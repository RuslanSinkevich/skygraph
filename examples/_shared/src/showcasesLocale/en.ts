import type { ShowcasesLocale } from './types'
import { hubLocaleEn } from './hub/en'
import { chatLocaleEn } from './apps/chat/en'
import { inboxLocaleEn } from './apps/inbox/en'
import { helpdeskLocaleEn } from './apps/helpdesk/en'
import { dashboardLocaleEn } from './apps/dashboard/en'
import { fileManagerLocaleEn } from './apps/file-manager/en'
import { formsLocaleEn } from './apps/forms/en'
import { hrPortalLocaleEn } from './apps/hr-portal/en'
import { adminLocaleEn } from './apps/admin/en'
import { crmLocaleEn } from './apps/crm/en'
import { ecommerceLocaleEn } from './apps/ecommerce/en'
import { tableKitchenSinkLocaleEn } from './apps/table-kitchen-sink/en'

export const showcasesLocaleEn: ShowcasesLocale = {
  ...hubLocaleEn,
  apps: {
    chat: chatLocaleEn,
    inbox: inboxLocaleEn,
    helpdesk: helpdeskLocaleEn,
    dashboard: dashboardLocaleEn,
    fileManager: fileManagerLocaleEn,
    forms: formsLocaleEn,
    hrPortal: hrPortalLocaleEn,
    admin: adminLocaleEn,
    crm: crmLocaleEn,
    ecommerce: ecommerceLocaleEn,
    tableKitchenSink: tableKitchenSinkLocaleEn,
  },
}
