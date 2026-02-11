import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CTABlock from '@/components/CTABlock'
import TestimonialBlock from '@/components/TestimonialBlock'
import { projects, getProjectBySlug } from '@/lib/projects'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: `${project.title} | Sarah Kingdom Designs`,
    description: project.tagline,
  }
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const idx = projects.findIndex((p) => p.slug === params.slug)
  const prev = idx > 0 ? projects[idx - 1] : null
  const next = idx < projects.length - 1 ? projects[idx + 1] : null

  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>
        <div className="relative z-10 max-content pb-12 md:pb-20 text-white">
          <p className="caption text-white/70 mb-3">
            {project.location} &mdash; {project.year}
          </p>
          <h1 className="text-white text-4xl md:text-6xl">{project.title}</h1>
          <p className="font-serif italic text-lg text-white/80 mt-2">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* Details */}
      <section className="section-padding">
        <div className="max-content grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <p className="text-lg leading-relaxed">{project.description}</p>
          </div>
          <div>
            <p className="caption mb-3">Scope</p>
            <ul className="space-y-2">
              {project.scope.map((s) => (
                <li key={s} className="text-sm">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding pt-0">
        <div className="max-content">
          <div className="grid md:grid-cols-2 gap-6">
            {project.images.map((src, i) => (
              <div
                key={i}
                className={`img-hover relative ${
                  i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={src}
                  alt={`${project.title} detail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes={i === 0 ? '100vw' : '50vw'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="section-padding bg-gray-50">
          <div className="max-content">
            <TestimonialBlock
              quote={project.testimonial.quote}
              author={project.testimonial.author}
            />
          </div>
        </section>
      )}

      {/* Prev/Next */}
      <section className="border-t border-gray-100">
        <div className="max-content grid grid-cols-2">
          {prev ? (
            <Link
              href={`/portfolio/${prev.slug}`}
              className="py-8 pr-4 flex items-center gap-3 group hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <div>
                <p className="caption mb-1">Previous</p>
                <p className="font-sans font-medium text-sm">{prev.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/portfolio/${next.slug}`}
              className="py-8 pl-4 flex items-center justify-end gap-3 group hover:bg-gray-50 transition-colors border-l border-gray-100"
            >
              <div className="text-right">
                <p className="caption mb-1">Next</p>
                <p className="font-sans font-medium text-sm">{next.title}</p>
              </div>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <CTABlock />
      <Footer />
    </>
  )
}
