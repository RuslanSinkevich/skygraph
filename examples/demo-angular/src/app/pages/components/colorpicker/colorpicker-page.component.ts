import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgColorPickerComponent, type SgColorPickerPreset } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-colorpicker-page',
  standalone: true,
  imports: [SgColorPickerComponent],
  template: `
    <h1>ColorPicker</h1>
    <p class="lead">Saturation/value square + hue strip + text input.</p>

    <section class="demo-section">
      <h3>Default</h3>
      <div class="row">
        <div sg-colorpicker [(value)]="hex" showText aria-label="Pick color"></div>
        <span class="meta">value = {{ hex }}</span>
      </div>
    </section>

    <section class="demo-section">
      <h3>Presets</h3>
      <div
        sg-colorpicker
        [presets]="presets"
        defaultValue="#1677ff"
        showText
        aria-label="Pick brand"
      ></div>
    </section>

    <section class="demo-section">
      <h3>Disabled</h3>
      <div sg-colorpicker [disabled]="true" defaultValue="#666666" aria-label="Locked"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerPageComponent {
  hex = '#52c41a'

  readonly presets: SgColorPickerPreset[] = [
    {
      label: 'Brand',
      colors: ['#1677ff', '#722ed1', '#13c2c2', '#52c41a', '#faad14', '#f5222d'],
    },
    {
      label: 'Neutral',
      colors: ['#000000', '#262626', '#595959', '#8c8c8c', '#bfbfbf', '#ffffff'],
    },
  ]
}
