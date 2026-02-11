import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CTABlock from '@/components/CTABlock'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/lib/projects'

export const metadata = {
  title: 'Portfolio | Sarah Kingdom Designs',
  description: 'Browse our portfolio of Boulder interior design projects.',
}

export default function PortfolioPage() {
  return (
    <>
      <Navigation />

      <section className="pt-32 pb-8">
        <div className="max-content">
          <SectionHeading
            caption="Portfolio"
            title="Our Work"
            subtitle="Ten years of designing spaces that feel like home. Each project is a collaboration, a conversation, and a craft."
          />
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="max-content">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
      <Footer />
    </>
  )
}
