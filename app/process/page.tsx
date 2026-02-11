import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CTABlock from '@/components/CTABlock'
import SectionHeading from '@/components/SectionHeading'

export const metadata = {
  title: 'Our Process | Sarah Kingdom Designs',
  description:
    'How we work: from discovery to installation. Our six-step design process.',
}

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We begin with a deep conversation about how you live, what you love, and what isn\'t working. We visit your space, study the light, and listen carefully. This is where trust is built.',
    duration: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Concept',
    description:
      'We translate your vision into a cohesive design direction — mood boards, material palettes, and preliminary layouts. This is where the story of your space begins to take shape.',
    duration: '2–3 weeks',
  },
  {
    number: '03',
    title: 'Design Development',
    description:
      'The concept becomes concrete. We produce detailed floor plans, 3D renderings, and specifications for every material, fixture, and finish. Nothing is left to chance.',
    duration: '3–6 weeks',
  },
  {
    number: '04',
    title: 'Sourcing & Procurement',
    description:
      'We source and order every item — from custom furniture to the perfect door handle. Our relationships with artisans and vendors mean access to pieces you won\'t find on your own.',
    duration: '6–12 weeks',
  },
  {
    number: '05',
    title: 'Implementation',
    description:
      'We coordinate with contractors, oversee installation, and manage every detail of the build-out. You get regular updates without the stress of managing trades yourself.',
    duration: '4–16 weeks',
  },
  {
    number: '06',
    title: 'Reveal & Styling',
    description:
      'The best part. We install furnishings, hang art, style every surface, and hand you the keys to a space that feels unmistakably yours.',
    duration: '1–2 days',
  },
]

export default function ProcessPage() {
  return (
    <>
      <Navigation />

      <section className="pt-32 pb-8">
        <div className="max-content">
          <SectionHeading
            caption="Our Process"
            title="How Great Spaces Happen"
            subtitle="Design isn't magic — it's method. Here's how we take a space from vision to reality."
          />
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="max-content max-w-3xl mx-auto">
          <div className="space-y-16">
            {steps.map((step) => (
              <div key={step.number} className="grid grid-cols-[60px_1fr] gap-6">
                <div>
                  <span className="font-sans font-bold text-3xl text-gray-200">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="mb-2">{step.title}</h3>
                  <p className="leading-relaxed mb-2">{step.description}</p>
                  <p className="caption">{step.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline overview */}
      <section className="section-padding bg-gray-50">
        <div className="max-content text-center">
          <h3 className="mb-4">Typical Timeline</h3>
          <p className="font-serif italic text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            A full-service project typically takes 4–12 months from discovery to
            reveal. Room refreshes move faster — usually 6–10 weeks.
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div>
              <p className="font-sans font-bold text-2xl">90</p>
              <p className="caption mt-1">Minute consultation</p>
            </div>
            <div>
              <p className="font-sans font-bold text-2xl">6–10</p>
              <p className="caption mt-1">Week room refresh</p>
            </div>
            <div>
              <p className="font-sans font-bold text-2xl">4–12</p>
              <p className="caption mt-1">Month full project</p>
            </div>
          </div>
        </div>
      </section>

      <CTABlock
        heading="Ready to start?"
        subheading="Every project begins with a conversation."
      />
      <Footer />
    </>
  )
}
