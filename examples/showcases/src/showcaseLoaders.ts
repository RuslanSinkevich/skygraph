import type { ComponentType } from 'react'

export const showcaseLoaders: Record<string, () => Promise<{ default: ComponentType<object> }>> = {
  'table-kitchen-sink': () =>
    import('./showcases/table-kitchen-sink/TableKitchenSinkApp').then((m) => ({
      default: m.TableKitchenSinkApp,
    })),
  dashboard: () => import('./showcases/dashboard').then((m) => ({ default: m.DashboardApp })),
  crm: () => import('./showcases/crm/CrmApp').then((m) => ({ default: m.CrmApp })),
  helpdesk: () => import('./showcases/helpdesk').then((m) => ({ default: m.HelpDeskApp })),
  chat: () => import('./showcases/chat').then((m) => ({ default: m.ChatApp })),
  inbox: () => import('./showcases/inbox').then((m) => ({ default: m.InboxApp })),
  ecommerce: () =>
    import('./showcases/ecommerce/EcommerceApp').then((m) => ({ default: m.EcommerceApp })),
  'hr-portal': () =>
    import('./showcases/hr-portal/HrPortalApp').then((m) => ({ default: m.HrPortalApp })),
  'file-manager': () =>
    import('./showcases/file-manager/FileManagerApp').then((m) => ({ default: m.FileManagerApp })),
  admin: () => import('./showcases/admin/AdminApp').then((m) => ({ default: m.AdminApp })),
  'project-tracker': () =>
    import('./showcases/project-tracker/ProjectTrackerApp').then((m) => ({
      default: m.ProjectTrackerApp,
    })),
  forms: () => import('./showcases/forms/FormsApp').then((m) => ({ default: m.FormsApp })),
}
