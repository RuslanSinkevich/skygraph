import type { ShowcasesLocale } from './types'
import { hubLocaleRu } from './hub/ru'
import { chatLocaleRu } from './apps/chat/ru'
import { inboxLocaleRu } from './apps/inbox/ru'
import { helpdeskLocaleRu } from './apps/helpdesk/ru'
import { dashboardLocaleRu } from './apps/dashboard/ru'
import { fileManagerLocaleRu } from './apps/file-manager/ru'
import { formsLocaleRu } from './apps/forms/ru'
import { hrPortalLocaleRu } from './apps/hr-portal/ru'
import { adminLocaleRu } from './apps/admin/ru'
import { crmLocaleRu } from './apps/crm/ru'
import { ecommerceLocaleRu } from './apps/ecommerce/ru'
import { tableKitchenSinkLocaleRu } from './apps/table-kitchen-sink/ru'

export const showcasesLocaleRu: ShowcasesLocale = {
  ...hubLocaleRu,
  apps: {
    chat: chatLocaleRu,
    inbox: inboxLocaleRu,
    helpdesk: helpdeskLocaleRu,
    dashboard: dashboardLocaleRu,
    fileManager: fileManagerLocaleRu,
    forms: formsLocaleRu,
    hrPortal: hrPortalLocaleRu,
    admin: adminLocaleRu,
    crm: crmLocaleRu,
    ecommerce: ecommerceLocaleRu,
    tableKitchenSink: tableKitchenSinkLocaleRu,
  },
}
