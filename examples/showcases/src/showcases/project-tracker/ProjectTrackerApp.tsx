import { useMemo, useState } from 'react'
import {
  Button,
  Collapse,
  ConfigProvider,
  Descriptions,
  Drawer,
  Progress,
  Segmented,
  Table,
  Tag,
  Timeline,
  Tree,
} from '@skygraph/react'
import type { TableColumn, TreeNodeData } from '@skygraph/react'
import { useShowcaseLocale } from '../_shared'

type Status = 'triage' | 'investigating' | 'contained' | 'resolved'
type Severity = 'low' | 'medium' | 'high' | 'critical'
type Filter = 'all' | 'open' | 'critical' | 'resolved'

interface Incident {
  id: string
  title: string
  system: string
  lane: 'Edge' | 'Identity' | 'Data' | 'Platform'
  analyst: string
  status: Status
  severity: Severity
  confidence: number
  sla: string
  region: string
  assetKey: string
}

const INCIDENTS: Incident[] = [
  {
    id: 'SOC-1042',
    title: 'Impossible travel sign-in',
    system: 'SSO gateway',
    lane: 'Identity',
    analyst: 'Nina Petrova',
    status: 'investigating',
    severity: 'critical',
    confidence: 88,
    sla: '18 min',
    region: 'EU',
    assetKey: 'identity',
  },
  {
    id: 'SOC-1043',
    title: 'Suspicious data export',
    system: 'Warehouse',
    lane: 'Data',
    analyst: 'Sara Vogel',
    status: 'triage',
    severity: 'high',
    confidence: 73,
    sla: '42 min',
    region: 'US',
    assetKey: 'data',
  },
  {
    id: 'SOC-1044',
    title: 'WAF anomaly burst',
    system: 'Public API',
    lane: 'Edge',
    analyst: 'Mia Rossi',
    status: 'contained',
    severity: 'medium',
    confidence: 64,
    sla: '1 h',
    region: 'APAC',
    assetKey: 'edge',
  },
  {
    id: 'SOC-1045',
    title: 'Privileged token reuse',
    system: 'Kubernetes',
    lane: 'Platform',
    analyst: 'Omar Said',
    status: 'investigating',
    severity: 'critical',
    confidence: 91,
    sla: '9 min',
    region: 'EU',
    assetKey: 'platform',
  },
  {
    id: 'SOC-1046',
    title: 'Endpoint beacon pattern',
    system: 'Fleet agents',
    lane: 'Platform',
    analyst: 'Alex Kim',
    status: 'resolved',
    severity: 'medium',
    confidence: 100,
    sla: 'closed',
    region: 'US',
    assetKey: 'platform',
  },
  {
    id: 'SOC-1047',
    title: 'DNS tunneling candidate',
    system: 'Resolver mesh',
    lane: 'Edge',
    analyst: 'Emma Tang',
    status: 'triage',
    severity: 'low',
    confidence: 31,
    sla: '2 h',
    region: 'LATAM',
    assetKey: 'edge',
  },
]

const STATUS_COLOR: Record<Status, string> = {
  triage: 'orange',
  investigating: 'blue',
  contained: 'purple',
  resolved: 'green',
}

const SEVERITY_COLOR: Record<Severity, string> = {
  low: 'default',
  medium: 'orange',
  high: 'red',
  critical: 'magenta',
}

const ASSET_TREE: TreeNodeData[] = [
  {
    key: 'all',
    title: 'Security estate',
    children: [
      { key: 'edge', title: 'Edge perimeter' },
      { key: 'identity', title: 'Identity fabric' },
      { key: 'data', title: 'Data platforms' },
      { key: 'platform', title: 'Runtime platform' },
    ],
  },
]

const COMMAND_CENTER_THEME = {
  mode: 'dark',
  token: {
    colorPrimary: '#38bdf8',
    colorSuccess: '#22c55e',
    colorWarning: '#f59e0b',
    colorError: '#f43f5e',
    colorText: '#e2e8f0',
    colorBg: '#08111f',
    colorBorder: '#1e3a5f',
    borderRadius: 14,
    fontSize: 14,
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  },
  cssVars: {
    '--sg-color-bg': '#08111f',
    '--sg-color-bg-secondary': '#0d1b2f',
    '--sg-color-bg-elevated': '#12233b',
    '--sg-color-bg-container': '#0d1b2f',
    '--sg-color-bg-hover': '#17314f',
    '--sg-color-border': '#1e3a5f',
    '--sg-color-border-secondary': '#18304d',
    '--sg-color-text-secondary': '#b6c7dd',
    '--sg-color-text-tertiary': '#7f95b2',
    '--sg-color-text-placeholder': '#64748b',
    '--sg-color-primary-hover': '#7dd3fc',
    '--sg-color-primary-active': '#0284c7',
    '--sg-color-primary-bg': 'rgba(56, 189, 248, 0.16)',
    '--sg-shadow': '0 18px 50px rgba(2, 8, 23, 0.42)',
  },
} as const

const COPY = {
  en: {
    title: 'Security command center',
    subtitle:
      'A scoped SOC workspace that combines incident Table, infrastructure Tree, Timeline, Collapse panels and Drawer details under one local theme.',
    tokenLabel: 'Token override',
    action: 'Escalate critical',
    filters: { all: 'All incidents', open: 'Open', critical: 'Critical', resolved: 'Resolved' },
    status: {
      triage: 'Triage',
      investigating: 'Investigating',
      contained: 'Contained',
      resolved: 'Resolved',
    },
    severity: { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' },
    stats: {
      total: 'Signals',
      critical: 'Critical',
      open: 'Open cases',
      confidence: 'Avg confidence',
    },
    columns: {
      incident: 'Incident',
      system: 'System',
      lane: 'Lane',
      severity: 'Severity',
      status: 'Status',
      confidence: 'Confidence',
      sla: 'SLA',
      analyst: 'Analyst',
    },
    drawer: {
      title: 'Incident details',
      system: 'System',
      lane: 'Lane',
      analyst: 'Analyst',
      region: 'Region',
      status: 'Status',
      severity: 'Severity',
      confidence: 'Detection confidence',
      markResolved: 'Mark resolved',
    },
    treeTitle: 'Infrastructure tree',
    tableTitle: 'Incident queue',
    timelineTitle: 'Response timeline',
    playbookTitle: 'Playbooks',
    playbooks: [
      {
        key: 'contain',
        label: 'Containment',
        content: 'Quarantine identity sessions, rotate tokens and isolate affected workloads.',
      },
      {
        key: 'notify',
        label: 'Notification',
        content: 'Notify owner teams, open compliance note and attach timeline evidence.',
      },
      {
        key: 'recover',
        label: 'Recovery',
        content: 'Validate clean state, restore automation and close with post-incident notes.',
      },
    ],
    timeline: [
      'Correlation rule grouped 17 events into one incident.',
      'Analyst assigned and scope reduced to two systems.',
      'Containment playbook is waiting for approval.',
    ],
  },
  ru: {
    title: 'Центр реагирования SOC',
    subtitle:
      'Локальная SOC-витрина объединяет Table инцидентов, Tree инфраструктуры, Timeline, Collapse-панели и Drawer деталей под одной темой.',
    tokenLabel: 'Token override',
    action: 'Эскалировать critical',
    filters: { all: 'Все инциденты', open: 'Открытые', critical: 'Critical', resolved: 'Закрытые' },
    status: {
      triage: 'Триаж',
      investigating: 'Расследуется',
      contained: 'Сдержан',
      resolved: 'Закрыт',
    },
    severity: { low: 'Низкий', medium: 'Средний', high: 'Высокий', critical: 'Critical' },
    stats: {
      total: 'Сигналов',
      critical: 'Critical',
      open: 'Открыто',
      confidence: 'Средняя уверенность',
    },
    columns: {
      incident: 'Инцидент',
      system: 'Система',
      lane: 'Зона',
      severity: 'Риск',
      status: 'Статус',
      confidence: 'Уверенность',
      sla: 'SLA',
      analyst: 'Аналитик',
    },
    drawer: {
      title: 'Детали инцидента',
      system: 'Система',
      lane: 'Зона',
      analyst: 'Аналитик',
      region: 'Регион',
      status: 'Статус',
      severity: 'Риск',
      confidence: 'Уверенность детекта',
      markResolved: 'Закрыть инцидент',
    },
    treeTitle: 'Дерево инфраструктуры',
    tableTitle: 'Очередь инцидентов',
    timelineTitle: 'Ход реагирования',
    playbookTitle: 'Playbooks',
    playbooks: [
      {
        key: 'contain',
        label: 'Сдерживание',
        content: 'Закрыть identity-сессии, обновить токены и изолировать затронутые workloads.',
      },
      {
        key: 'notify',
        label: 'Уведомления',
        content:
          'Уведомить владельцев, открыть compliance note и приложить timeline доказательств.',
      },
      {
        key: 'recover',
        label: 'Восстановление',
        content:
          'Проверить чистое состояние, вернуть автоматизацию и закрыть post-incident заметками.',
      },
    ],
    timeline: [
      'Correlation rule собрал 17 событий в один инцидент.',
      'Аналитик назначен, scope снижен до двух систем.',
      'Containment playbook ожидает подтверждения.',
    ],
  },
} as const

export function ProjectTrackerApp() {
  const locale = useShowcaseLocale()
  const l = locale.languageSwitcher === 'Язык' ? COPY.ru : COPY.en
  const [incidents, setIncidents] = useState<Incident[]>(INCIDENTS)
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedAsset, setSelectedAsset] = useState('all')
  const [selected, setSelected] = useState<Incident | null>(null)

  const filtered = useMemo(() => {
    return incidents.filter((incident) => {
      if (selectedAsset !== 'all' && incident.assetKey !== selectedAsset) return false
      if (filter === 'open') return incident.status !== 'resolved'
      if (filter === 'critical') return incident.severity === 'critical'
      if (filter === 'resolved') return incident.status === 'resolved'
      return true
    })
  }, [filter, incidents, selectedAsset])

  const tableRows = useMemo(
    () =>
      filtered.map((incident) => ({
        id: incident.id,
        data: incident as unknown as Record<string, unknown>,
      })),
    [filtered],
  )

  const avg = Math.round(
    incidents.reduce((sum, incident) => sum + incident.confidence, 0) / incidents.length,
  )
  const criticalCount = incidents.filter((incident) => incident.severity === 'critical').length
  const openCount = incidents.filter((incident) => incident.status !== 'resolved').length

  const columns = useMemo<TableColumn[]>(
    () => [
      { key: 'id', title: 'ID', width: 120, sortable: true, fixed: 'left' },
      { key: 'title', title: l.columns.incident, width: 230, ellipsis: true },
      { key: 'system', title: l.columns.system, width: 150, sortable: true },
      { key: 'lane', title: l.columns.lane, width: 120, sortable: true },
      {
        key: 'severity',
        title: l.columns.severity,
        width: 120,
        sortable: true,
        render: (value) => (
          <Tag color={SEVERITY_COLOR[value as Severity]}>{l.severity[value as Severity]}</Tag>
        ),
      },
      {
        key: 'status',
        title: l.columns.status,
        width: 140,
        sortable: true,
        render: (value) => (
          <Tag color={STATUS_COLOR[value as Status]}>{l.status[value as Status]}</Tag>
        ),
      },
      {
        key: 'confidence',
        title: l.columns.confidence,
        width: 160,
        sortable: true,
        render: (value) => <Progress percent={Number(value)} showInfo={false} />,
      },
      { key: 'sla', title: l.columns.sla, width: 100, sortable: true },
      { key: 'analyst', title: l.columns.analyst, width: 150, sortable: true },
    ],
    [l],
  )

  const markResolved = () => {
    if (!selected) return
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === selected.id
          ? { ...incident, status: 'resolved', confidence: 100 }
          : incident,
      ),
    )
    setSelected({ ...selected, status: 'resolved', confidence: 100 })
  }

  return (
    <ConfigProvider theme={COMMAND_CENTER_THEME}>
      <div className="sc-content pt-theme" style={{ flex: 1 }}>
        <section className="pt-hero">
          <div>
            <Tag color="purple">{l.tokenLabel}</Tag>
            <h2>{l.title}</h2>
            <p>{l.subtitle}</p>
          </div>
          <Button type="primary">{l.action}</Button>
        </section>

        <div className="pt-toolbar">
          <Segmented
            value={filter}
            onChange={(value) => setFilter(value as Filter)}
            options={Object.entries(l.filters).map(([value, label]) => ({ value, label }))}
          />
        </div>

        <section className="pt-metrics">
          {[
            { key: 'total', label: l.stats.total, value: incidents.length, color: 'purple' },
            { key: 'critical', label: l.stats.critical, value: criticalCount, color: 'magenta' },
            { key: 'open', label: l.stats.open, value: openCount, color: 'blue' },
            { key: 'confidence', label: l.stats.confidence, value: `${avg}%`, color: 'green' },
          ].map((metric) => (
            <div className="pt-metric" key={metric.key}>
              <Tag color={metric.color}>{metric.label}</Tag>
              <strong>{metric.value}</strong>
              {metric.key === 'confidence' && <Progress percent={avg} showInfo={false} />}
            </div>
          ))}
        </section>

        <section className="pt-workbench">
          <div className="pt-panel pt-tree-panel">
            <div className="pt-panel-head">
              <strong>{l.treeTitle}</strong>
              <Tag>{filtered.length}</Tag>
            </div>
            <Tree
              treeData={ASSET_TREE}
              defaultExpandAll
              selectedKeys={[selectedAsset]}
              onSelect={(keys) => {
                if (keys.length) setSelectedAsset(String(keys[0]))
              }}
            />
          </div>

          <div className="pt-panel pt-main-panel">
            <div className="pt-panel-head">
              <strong>{l.tableTitle}</strong>
              <Tag color="blue">{filter}</Tag>
            </div>
            <Table
              columns={columns}
              data={tableRows}
              pageSize={6}
              showPagination
              searchable
              striped
              bordered
              highlightOnHover
              onRowClick={(_, data) => setSelected(data as unknown as Incident)}
            />
          </div>
        </section>

        <section className="pt-side-grid">
          <div className="pt-panel">
            <div className="pt-panel-head">
              <strong>{l.timelineTitle}</strong>
            </div>
            <Timeline
              items={l.timeline.map((item, index) => ({
                children: item,
                color: index === 2 ? 'orange' : 'blue',
              }))}
              pending
            />
          </div>
          <div className="pt-panel">
            <div className="pt-panel-head">
              <strong>{l.playbookTitle}</strong>
            </div>
            <Collapse
              items={l.playbooks.map((item) => ({ ...item, children: item.content }))}
              defaultActiveKey="contain"
            />
          </div>
        </section>

        <Drawer
          open={!!selected}
          onClose={() => setSelected(null)}
          title={selected ? `${selected.id} · ${selected.title}` : l.drawer.title}
          width={460}
          className="pt-drawer"
        >
          {selected && (
            <div className="pt-drawer-body">
              <Descriptions
                column={1}
                size="small"
                items={[
                  { label: l.drawer.system, children: selected.system },
                  { label: l.drawer.lane, children: selected.lane },
                  { label: l.drawer.analyst, children: selected.analyst },
                  { label: l.drawer.region, children: selected.region },
                  {
                    label: l.drawer.status,
                    children: (
                      <Tag color={STATUS_COLOR[selected.status]}>{l.status[selected.status]}</Tag>
                    ),
                  },
                  {
                    label: l.drawer.severity,
                    children: (
                      <Tag color={SEVERITY_COLOR[selected.severity]}>
                        {l.severity[selected.severity]}
                      </Tag>
                    ),
                  },
                ]}
              />
              <div>
                <div className="pt-progress-label">{l.drawer.confidence}</div>
                <Progress percent={selected.confidence} />
              </div>
              <Button
                type="primary"
                onClick={markResolved}
                disabled={selected.status === 'resolved'}
              >
                {l.drawer.markResolved}
              </Button>
            </div>
          )}
        </Drawer>
      </div>
    </ConfigProvider>
  )
}
