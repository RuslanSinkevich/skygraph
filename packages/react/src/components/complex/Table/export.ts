export function toCSVString(data: string[][]): string {
  return data
    .map((row) =>
      row
        .map((cell) => {
          if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
            return `"${cell.replace(/"/g, '""')}"`
          }
          return cell
        })
        .join(','),
    )
    .join('\n')
}

export function toTSVString(data: string[][]): string {
  return data.map((row) => row.join('\t')).join('\n')
}

export function downloadCSV(content: string, filename = 'export.csv'): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text)
  }
}
