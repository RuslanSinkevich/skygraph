import { Segmented } from '@skygraph/react'

/**
 * `unstyled` drops every CSS class and renders a native radio
 * group — behaviour stays (`role="radiogroup"`, keyboard,
 * disabled), but styling is 100% yours.
 */
export function UnstyledSegmented() {
  return (
    <div>
      <style>{`
        .demo-radio-group { display: inline-flex; gap: 16px; }
        .demo-radio-group label { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; }
        .demo-radio-group input[disabled] + * { opacity: 0.4; }
      `}</style>
      <Segmented
        unstyled
        className="demo-radio-group"
        defaultValue="Map"
        options={['Map', 'Transit', 'Satellite']}
      />
    </div>
  )
}
