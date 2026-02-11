import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CTABlock from '@/components/CTABlock'
import SocialEngagementBar from '@/components/SocialEngagementBar'

export const metadata = {
  title: 'About | Sarah Kingdom Designs',
  description:
    'Meet Sarah Kingdom — Boulder interior designer with a decade of experience creating spaces that balance beauty with livability.',
}

export default function AboutPage() {
  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 section-padding">
        <div className="max-content grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="img-hover aspect-[3/4] relative">
            <Image
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80"
              alt="Sarah Kingdom"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <p className="caption mb-3">About</p>
            <h1 className="text-3xl md:text-5xl mb-6">
              Designing with
              <br />
              intention since 2014
            </h1>
            <p className="leading-relaxed mb-4">
              I started Sarah Kingdom Designs with a simple conviction: your home
              should be the most beautiful room you walk into all day. Not the
              most expensive. Not the most trendy. The most <em>you</em>.
            </p>
            <p className="leading-relaxed mb-4">
              After studying architecture at CU Boulder and apprenticing with a
              residential design firm in Denver, I opened my own studio in 2014.
              Since then, I&apos;ve designed over 60 homes across the Front Range,
              each one a collaboration built on trust and obsessive attention to
              detail.
            </p>
            <p className="leading-relaxed">
              My work lives at the intersection of warmth and restraint. I
              believe in natural materials, honest construction, and the power of
              a room that makes you exhale when you walk in.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="max-content">
          <p className="caption mb-8 text-center">Design Philosophy</p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Materials First',
                text: 'We start with what you can touch. Stone, wood, linen, leather — the material palette drives every decision that follows.',
              },
              {
                title: 'Edited, Not Empty',
                text: "Minimalism isn't the goal. Intention is. Every object in a room should earn its place, and what remains should feel generous.",
              },
              {
                title: 'Built to Last',
                text: 'Trends fade. We design spaces that age like your favorite leather jacket — better with every year.',
              },
            ].map((v) => (
              <div key={v.title}>
                <h3 className="text-base mb-3">{v.title}</h3>
                <p className="text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press / Recognition */}
      <section className="section-padding">
        <div className="max-content text-center">
          <p className="caption mb-8">As Seen In</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-gray-300">
            {[
              'Architectural Digest',
              'Dwell',
              'Boulder Magazine',
              'Mountain Living',
              '5280 Home',
            ].map((pub) => (
              <span key={pub} className="font-sans font-bold text-lg md:text-xl">
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SocialEngagementBar />
      <CTABlock
        heading="Let's work together"
        subheading="I'd love to hear about your space."
      />
      <Footer />
    </>
  )
}
