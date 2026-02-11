import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CTABlock from '@/components/CTABlock'
import SectionHeading from '@/components/SectionHeading'
import TestimonialBlock from '@/components/TestimonialBlock'
import Link from 'next/link'

export const metadata = {
  title: 'Services | Sarah Kingdom Designs',
  description:
    'Full-service interior design, room refresh, and design consultations in Boulder, CO.',
}

const services = [
  {
    title: 'Full-Service Design',
    price: 'From $25,000',
    timeline: '4–12 months',
    description:
      'Our most comprehensive offering. We partner with you from initial concept through final styling, managing every detail — space planning, material selection, custom furniture, contractor coordination, and installation. You get a turnkey home that looks and feels exactly right.',
    includes: [
      'In-depth discovery & lifestyle assessment',
      'Full space planning & 3D renderings',
      'Material, finish & fixture selection',
      'Custom furniture design & sourcing',
      'Contractor & vendor management',
      'Installation & final styling',
    ],
    ideal: 'New builds, major renovations, or anyone ready for a complete transformation.',
  },
  {
    title: 'Room Refresh',
    price: 'From $8,000',
    timeline: '6–10 weeks',
    description:
      'A focused redesign of one or two rooms. We reimagine the space with new furniture, textiles, art, and accessories while working with your existing architecture. Perfect for rooms that have potential but need a professional eye.',
    includes: [
      'Room assessment & mood board',
      'Furniture & accessory sourcing',
      'Color & textile consultation',
      'Art curation & placement',
      'Professional styling & installation',
    ],
    ideal: 'A living room that needs life, a bedroom that needs calm, or a dining room that needs drama.',
  },
  {
    title: 'Design Consultation',
    price: '$500',
    timeline: '90 minutes + follow-up',
    description:
      "A focused session in your home where we assess your space, discuss your goals, and create a roadmap. You'll leave with a written action plan including paint colors, furniture recommendations, and layout ideas you can execute at your own pace.",
    includes: [
      '90-minute on-site consultation',
      'Written action plan within 5 business days',
      'Paint color recommendations',
      'Furniture & layout suggestions',
      'Resource list of vendors & tradespeople',
    ],
    ideal: 'DIY enthusiasts, new homeowners, or anyone who wants professional direction without the full commitment.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navigation />

      <section className="pt-32 pb-8">
        <div className="max-content">
          <SectionHeading
            caption="Services"
            title="How We Work Together"
            subtitle="Three ways to bring intention and beauty into your space. Every engagement starts with listening."
          />
        </div>
      </section>

      {/* Services */}
      <section className="section-padding pt-0">
        <div className="max-content space-y-16 md:space-y-24">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`grid md:grid-cols-2 gap-12 md:gap-20 ${
                i % 2 === 1 ? 'md:direction-rtl' : ''
              }`}
            >
              <div>
                <div className="flex items-baseline gap-4 mb-2">
                  <h3>{service.title}</h3>
                </div>
                <div className="flex gap-6 mb-6">
                  <span className="caption">{service.price}</span>
                  <span className="caption">{service.timeline}</span>
                </div>
                <p className="leading-relaxed mb-6">{service.description}</p>
                <p className="font-sans text-sm font-medium mb-2 text-gray-800">
                  Ideal for:
                </p>
                <p className="text-sm italic text-gray-600">{service.ideal}</p>
              </div>
              <div>
                <p className="font-sans text-sm font-medium mb-4 text-gray-800">
                  What&apos;s included:
                </p>
                <ul className="space-y-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="section-padding bg-gray-50">
        <div className="max-content text-center">
          <h3 className="mb-4">Not sure which service is right?</h3>
          <p className="font-serif italic text-lg text-gray-600 mb-8">
            Start with a conversation. We&apos;ll help you find the right fit.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact" className="btn-primary inline-block">
              Book a Call
            </Link>
            <Link href="/faq" className="btn-outline inline-block">
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>

      <TestimonialBlock
        quote="Sarah's process was seamless. From the first call to the final pillow placement, every step felt intentional."
        author="Lisa Nakamura — Chautauqua Cottage"
      />

      <CTABlock />
      <Footer />
    </>
  )
}
