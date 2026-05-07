import { useRef } from 'react'
import { Table, Button } from '@skygraph/react'
import type { TableColumn, TableRef } from '@skygraph/react'
import { people } from '../table/data'

/**
 * Демонстрация печати таблицы. Кнопка `Print via toolbar` использует встроенную
 * иконку (`printable`); кнопка `Print via ref` — императивный API
 * `tableRef.current.print({ fileName })`. Откроется popup с применёнными
 * стилями SkyGraph и `@media print`-правилами; пользователь печатает или
 * сохраняет как PDF из штатного диалога браузера.
 */
export function TablePrintDemo() {
  const tableRef = useRef<TableRef>(null)

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name' },
    { key: 'city', title: 'City' },
    { key: 'role', title: 'Role' },
    { key: 'salary', title: 'Salary', align: 'right' },
  ]

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button
          onClick={() =>
            tableRef.current?.print({ fileName: 'people-report', orientation: 'landscape' })
          }
        >
          Print via ref (landscape)
        </Button>
      </div>
      <Table
        ref={tableRef}
        columns={columns}
        data={people}
        printable={{ fileName: 'people' }}
        showPagination={false}
      />
    </div>
  )
}
