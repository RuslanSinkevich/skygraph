import { Carousel } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const carouselProps: PropDef[] = [
  { name: 'autoplay', description: 'Whether to auto-scroll', type: 'boolean', default: 'false' },
  { name: 'autoplaySpeed', description: 'Delay between auto-scroll (ms)', type: 'number', default: '3000' },
  { name: 'dots', description: 'Show dot indicators', type: 'boolean', default: 'true' },
  { name: 'dotPosition', description: 'Position of the dot indicators', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'" },
  { name: 'effect', description: 'Transition effect', type: "'slide' | 'fade'", default: "'slide'" },
  { name: 'children', description: 'Slides content', type: 'ReactNode' },
]

const slideStyle: React.CSSProperties = {
  height: 160,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  fontWeight: 600,
  color: '#fff',
  borderRadius: 8,
}

const colors = ['#364d79', '#4a7c59', '#8b5e3c', '#6b3fa0']

export function CarouselDemo() {
  return (
    <ComponentDoc
      title="Carousel"
      description="A carousel component. Loops through elements."
      whenToUse={[
        'When there is a group of content on the same level to display in a rotating manner.',
        'When content in limited space needs to be displayed cyclically.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Basic carousel."
        code={`import { Carousel } from '@skygraph/react'

<Carousel>
  <div style={{ height: 160, background: '#364d79' }}>Slide 1</div>
  <div style={{ height: 160, background: '#4a7c59' }}>Slide 2</div>
  <div style={{ height: 160, background: '#8b5e3c' }}>Slide 3</div>
  <div style={{ height: 160, background: '#6b3fa0' }}>Slide 4</div>
</Carousel>`}
      >
        <Carousel>
          {colors.map((bg, i) => (
            <div key={i} style={{ ...slideStyle, background: bg }}>Slide {i + 1}</div>
          ))}
        </Carousel>
      </DemoBox>

      <DemoBox
        title="Autoplay"
        description="Slides automatically."
        code={`<Carousel autoplay>
  <div>Slide 1</div>
  <div>Slide 2</div>
</Carousel>`}
      >
        <Carousel autoplay>
          {colors.map((bg, i) => (
            <div key={i} style={{ ...slideStyle, background: bg }}>Slide {i + 1}</div>
          ))}
        </Carousel>
      </DemoBox>

      <DemoBox
        title="Fade Effect"
        description="Use fade transition effect."
        code={`<Carousel effect="fade">
  <div>Slide 1</div>
  <div>Slide 2</div>
</Carousel>`}
      >
        <Carousel effect="fade">
          {colors.map((bg, i) => (
            <div key={i} style={{ ...slideStyle, background: bg }}>Slide {i + 1}</div>
          ))}
        </Carousel>
      </DemoBox>

      <PropsTable data={carouselProps} />
    </ComponentDoc>
  )
}
