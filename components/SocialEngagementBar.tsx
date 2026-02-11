import { Instagram, ArrowUpRight } from 'lucide-react'

export default function SocialEngagementBar() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-content">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Instagram size={20} className="text-gray-800" />
            <span className="font-sans font-medium text-sm tracking-wide">
              Follow along{' '}
              <a
                href="https://instagram.com/sarahkingdomdesigns"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                @sarahkingdomdesigns
              </a>
            </span>
          </div>

          <div className="flex items-center gap-6">
            {['Houzz', 'Pinterest', 'Architectural Digest'].map((name) => (
              <span
                key={name}
                className="caption flex items-center gap-1 hover:text-gray-800 transition-colors cursor-pointer"
              >
                {name}
                <ArrowUpRight size={10} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
