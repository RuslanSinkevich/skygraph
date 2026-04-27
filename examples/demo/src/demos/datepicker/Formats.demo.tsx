import { DatePicker } from '@skygraph/react'

/**
 * `format` controls both display and parsing. Tokens: `YYYY`, `MM`, `DD`,
 * `HH`, `mm`, `ss`. Anything outside the tokens is a literal separator.
 */
export function FormatsDatePicker() {
  return (
    <>
      <DatePicker placeholder="YYYY-MM-DD" allowClear />
      <DatePicker format="DD.MM.YYYY" placeholder="DD.MM.YYYY" allowClear />
      <DatePicker format="YYYY/MM/DD" placeholder="YYYY/MM/DD" allowClear />
    </>
  )
}
