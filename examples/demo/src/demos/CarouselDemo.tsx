import { Carousel } from '../../../../packages/react/src/components/ui/Carousel'

function Slide({ color, label }: { color: string; label: string }) {
  return (
    <div
      style={{
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: color,
        color: '#fff',
        fontWeight: 600,
        borderRadius: 8,
      }}
    >
      {label}
    </div>
  )
}

export function CarouselDemo() {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <h2>Carousel</h2>

      <section>
        <h3>Basic with autoplay</h3>
        <div style={{ maxWidth: 480 }}>
          <Carousel autoplay autoplaySpeed={2500} dots>
            <Slide color="#1677ff" label="Slide 1" />
            <Slide color="#52c41a" label="Slide 2" />
            <Slide color="#fa8c16" label="Slide 3" />
          </Carousel>
        </div>
      </section>

      <section>
        <h3>Dots position: top / bottom / left / right</h3>
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          <div>
            <p style={{ fontSize: 12, marginBottom: 8 }}>Top</p>
            <Carousel dotPosition="top" autoplay={false}>
              <Slide color="#722ed1" label="A" />
              <Slide color="#eb2f96" label="B" />
            </Carousel>
          </div>
          <div>
            <p style={{ fontSize: 12, marginBottom: 8 }}>Bottom</p>
            <Carousel dotPosition="bottom" autoplay={false}>
              <Slide color="#13c2c2" label="A" />
              <Slide color="#2f54eb" label="B" />
            </Carousel>
          </div>
          <div>
            <p style={{ fontSize: 12, marginBottom: 8 }}>Left</p>
            <Carousel dotPosition="left" autoplay={false}>
              <Slide color="#389e0d" label="A" />
              <Slide color="#d48806" label="B" />
            </Carousel>
          </div>
          <div>
            <p style={{ fontSize: 12, marginBottom: 8 }}>Right</p>
            <Carousel dotPosition="right" autoplay={false}>
              <Slide color="#cf1322" label="A" />
              <Slide color="#531dab" label="B" />
            </Carousel>
          </div>
        </div>
      </section>

      <section>
        <h3>Fade effect</h3>
        <div style={{ maxWidth: 480 }}>
          <Carousel effect="fade" autoplay={false} dots>
            <Slide color="#434343" label="Fade 1" />
            <Slide color="#595959" label="Fade 2" />
            <Slide color="#8c8c8c" label="Fade 3" />
          </Carousel>
        </div>
        <p style={{ marginTop: 8, fontSize: 12, opacity: 0.75, maxWidth: 480 }}>
          Fade keeps slides stacked; only the active slide is visible. Use slide (default) when you need horizontal motion.
        </p>
      </section>

      <section>
        <h3>Dots off</h3>
        <div style={{ maxWidth: 400 }}>
          <Carousel dots={false} autoplay={false}>
            <Slide color="#2f54eb" label="No indicators" />
            <Slide color="#237804" label="Swipe / programmatic only" />
          </Carousel>
        </div>
      </section>
    </section>
  )
}
