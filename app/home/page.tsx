import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CTABlock from '@/components/CTABlock'
import SocialEngagementBar from '@/components/SocialEngagementBar'
import TestimonialBlock from '@/components/TestimonialBlock'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import { getFeaturedProjects } from '@/lib/projects'

export default function HomePage() {
  const featured = getFeaturedProjects()

  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80"
            alt="Boulder interior design by Sarah Kingdom"
            fill
            className="object-cover ken-burns"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 max-content pb-16 md:pb-24 text-white">
          <p className="caption text-white/70 mb-4 fade-up">Boulder, Colorado</p>
          <h1 className="text-white max-w-3xl fade-up fade-up-delay-1">
            Design that feels
            <br />
            like coming home
          </h1>
          <p className="font-serif italic text-lg text-white/80 mt-4 max-w-lg fade-up fade-up-delay-2">
            Full-service interior design rooted in craft, restraint, and the
            belief that your home should be the best room you walk into all day.
          </p>
          <div className="mt-8 flex gap-4 fade-up fade-up-delay-3">
            <Link href="/portfolio" className="btn-outline-white inline-block">
              View Work
            </Link>
            <Link href="/contact" className="btn-outline-white inline-block">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding">
        <div className="max-content grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="caption mb-3">The Studio</p>
            <h3>Layered texture.<br />Considered restraint.</h3>
            <p className="mt-6 leading-relaxed">
              Sarah Kingdom Designs is a Boulder-based interior design studio
              creating spaces that balance beauty with livability. We believe
              great design should feel inevitable — as if the room was always
              meant to look this way.
            </p>
            <p className="mt-4 leading-relaxed">
              From full-home projects to single-room refreshes, we bring the
              same obsessive attention to material, proportion, and light.
            </p>
            <Link href="/about" className="btn-outline inline-block mt-8">
              About the Studio
            </Link>
          </div>
          <div className="img-hover aspect-[3/4] relative">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Sarah Kingdom design detail"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-gray-50">
        <div className="max-content">
          <SectionHeading
            caption="Selected Work"
            title="Recent Projects"
            subtitle="Each space tells a story. Here are a few of ours."
          />
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn-outline inline-block">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding">
        <div className="max-content">
          <TestimonialBlock
            quote="Sarah understood our home before we could articulate what we wanted. Every room feels like it was always meant to be this way."
            author="The Hendersons — Alpine Retreat"
          />
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-gray-50">
        <div className="max-content">
          <SectionHeading
            caption="What We Do"
            title="Design Services"
            subtitle="Three ways to work together, each tailored to where you are in your journey."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Full-Service Design',
                desc: 'End-to-end design for new builds and major renovations. We handle everything from concept to installation.',
                price: 'From $25,000',
              },
              {
                title: 'Room Refresh',
                desc: 'A focused transformation of one or two rooms. Perfect for spaces that need intention without a full overhaul.',
                price: 'From $8,000',
              },
              {
                title: 'Design Consultation',
                desc: 'A 90-minute deep-dive into your space with a follow-up action plan. The perfect starting point.',
                price: '$500',
              },
            ].map((service) => (
              <div key={service.title} className="p-8 bg-white border border-gray-100">
                <h3 className="text-base mb-3">{service.title}</h3>
                <p className="text-sm leading-relaxed mb-4">{service.desc}</p>
                <p className="caption">{service.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline inline-block">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <SocialEngagementBar />
      <CTABlock />
      <Footer />
    </>
  )
}
