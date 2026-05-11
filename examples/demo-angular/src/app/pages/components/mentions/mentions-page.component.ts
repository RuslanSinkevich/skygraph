import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgMentionsComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-mentions-page',
  standalone: true,
  imports: [SgMentionsComponent],
  template: `
    <h1>Mentions</h1>
    <p class="lead">
      Textarea with mention prefixes. Wave 4.2 ships only the text field; auto-suggest dropdown is a
      Wave 4.3 item — see findings.
    </p>

    <section class="demo-section">
      <h3>Basic</h3>
      <div sg-mentions placeholder="Try @ or #" prefix="@" rows="4" style="width: 480px"></div>
    </section>

    <section class="demo-section">
      <h3>Multiple prefixes</h3>
      <div
        sg-mentions
        [prefix]="['@', '#']"
        rows="4"
        defaultValue="Hello @world #angular"
        style="width: 480px"
      ></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MentionsPageComponent {}
