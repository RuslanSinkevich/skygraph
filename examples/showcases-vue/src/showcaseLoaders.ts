import type { Component } from 'vue'

/**
 * Lazy loaders for each Vue showcase app. Keys match `SHOWCASE_METAS[i].key`.
 */
export const showcaseLoaders: Record<string, () => Promise<{ default: Component }>> = {
  'table-kitchen-sink': () => import('./showcases/table-kitchen-sink/TableKitchenSinkApp.vue'),
  dashboard: () => import('./showcases/dashboard/DashboardApp.vue'),
  crm: () => import('./showcases/crm/CrmApp.vue'),
  helpdesk: () => import('./showcases/helpdesk/HelpDeskApp.vue'),
  chat: () => import('./showcases/chat/ChatApp.vue'),
  inbox: () => import('./showcases/inbox/InboxApp.vue'),
  ecommerce: () => import('./showcases/ecommerce/EcommerceApp.vue'),
  'hr-portal': () => import('./showcases/hr-portal/HrPortalApp.vue'),
  'file-manager': () => import('./showcases/file-manager/FileManagerApp.vue'),
  admin: () => import('./showcases/admin/AdminApp.vue'),
  'workflow-editor': () => import('./showcases/workflow-editor/WorkflowEditorApp.vue'),
  forms: () => import('./showcases/forms/FormsApp.vue'),
}
