import type { HubLocale } from '../types/hub'

export const hubLocaleEn: HubLocale = {
  languageSwitcher: 'Language',
  hubTitle: 'SkyGraph Showcases',
  hubLead:
    'Real-world mini-apps built with @skygraph/react — fake data, real components. Browse by category or search.',
  searchPlaceholder: 'Search demos by name, description or tag…',
  noMatches: 'No demos match your filters.',
  back: '← Back to hub',
  shell: {
    navDocs: '← Docs',
    navShowcases: 'Showcases',
    navComponents: 'Components',
    navGuide: 'Guide',
    navBenchmarks: 'Benchmarks',
    navRoadmap: 'Changelog',
    navAbout: 'About',
    footerCopyright: '© 2026 SkyGraph contributors',
    footerShowcases: {
      title: 'Showcases',
      allDemos: 'All demos',
      sourceOnGithub: 'Source on GitHub',
    },
    footerDocumentation: {
      title: 'Documentation',
      demoSite: 'Demo site',
      components: 'Components',
      guide: 'Guide',
    },
    footerCommunity: {
      title: 'Community',
      github: 'GitHub',
      issues: 'Issues',
    },
    footerProject: {
      title: 'Project',
      changelog: 'Changelog',
      license: 'License',
    },
  },
  categories: {
    all: 'All',
    data: 'Data & Tables',
    comms: 'Communication',
    productivity: 'Productivity & Admin',
    design: 'Design & Forms',
  },
  cards: {
    'table-kitchen-sink': {
      title: 'Table — Kitchen Sink',
      description:
        'Every table feature in one demo: sorting, filtering, grouping, tree data, virtual scroll, drag & drop, inline editing, export, print, keyboard navigation, aggregation, pinned rows, and more.',
    },
    dashboard: {
      title: 'Operations Dashboard',
      description:
        'Live KPI dashboard with widget grid + drill-down tables and a layout editor mode. Hover toolbars on charts, widget actions, right-click context.',
    },
    crm: {
      title: 'CRM Dashboard',
      description:
        'Contacts/deals tables, drag-and-drop pipeline, account hierarchy tree and a ResourceCalendar of deal deadlines with conflict overlay.',
    },
    helpdesk: {
      title: 'Help Desk Tickets',
      description:
        'Ticketing queue with status segmentation, queue view, conversation timeline, customer replies and ticket creation.',
    },
    chat: {
      title: 'Team Messenger',
      description:
        'Channel + DM list, message bubbles with reactions and attachments, @-mentions composer and member drawer.',
    },
    inbox: {
      title: 'Email Inbox',
      description:
        'Threaded email client with folders, labels, bulk actions, full-thread reading drawer and compose modal.',
    },
    ecommerce: {
      title: 'E-Commerce Admin',
      description:
        'Product gallery with grid/list views, image carousel, order management, customers, refunds.',
    },
    'hr-portal': {
      title: 'HR Portal',
      description:
        'Employee directory, org tree, leave calendar, onboarding flow, performance reviews and team assignment.',
    },
    'file-manager': {
      title: 'File Manager',
      description:
        'Tree-driven file browser with grid/list views, breadcrumb, upload, preview drawer, share and rename modals.',
    },
    admin: {
      title: 'Permissions & Roles',
      description:
        'Users, audit log, role transfer, API keys, sessions and system settings across one admin panel.',
    },
    'workflow-editor': {
      title: 'Workflow Editor',
      description:
        'Visio-like flowchart built on GraphEngine — drag nodes, switch routing, add nodes/edges, inspect topology.',
    },
    forms: {
      title: 'Forms Playground',
      description:
        'All form controls in one place: validation, wizard, dynamic field arrays, real-world layouts.',
    },
  },
}
