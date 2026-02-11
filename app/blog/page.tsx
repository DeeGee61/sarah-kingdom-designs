import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Blog | Sarah Kingdom Designs',
  description: 'Design insights, project stories, and inspiration from Sarah Kingdom Designs.',
}

const posts = [
  {
    title: 'The Case for Natural Materials',
    excerpt:
      'Why we always start with what you can touch — and how stone, wood, and linen create spaces that age beautifully.',
    date: 'January 2025',
    image:
      'https://images.unsplash.com/photo-1600210491-ed8bdca5804e?auto=format&fit=crop&w=600&q=80',
    slug: '#',
  },
  {
    title: '5 Signs Your Home Needs a Room Refresh',
    excerpt:
      "Sometimes you don't need a renovation — you need intention. Here are five signs it's time for a professional refresh.",
    date: 'December 2024',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    slug: '#',
  },
  {
    title: 'Behind the Design: Alpine Retreat',
    excerpt:
      'A look inside our process for the Henderson residence — from discovery to that moment when a house becomes a home.',
    date: 'November 2024',
    image:
      'https://images.unsplash.com/photo-1600210492-b52bd06c5efd?auto=format&fit=crop&w=600&q=80',
    slug: '#',
  },
]

export default function BlogPage() {
  return (
    <>
      <Navigation />

      <section className="pt-32 pb-8">
        <div className="max-content">
          <SectionHeading
            caption="Blog"
            title="Design Notes"
            subtitle="Stories, insights, and the occasional strong opinion on interior design."
          />
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="max-content">
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {posts.map((post) => (
              <Link key={post.title} href={post.slug} className="group block">
                <div className="img-hover aspect-[4/3] relative mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="caption mb-2">{post.date}</p>
                <h3 className="text-base mb-2 group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16 p-12 bg-gray-50">
            <h3 className="text-base mb-3">More posts coming soon</h3>
            <p className="text-sm text-gray-600">
              We&apos;re building out our blog with design insights, project
              deep-dives, and practical tips. Check back soon.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
