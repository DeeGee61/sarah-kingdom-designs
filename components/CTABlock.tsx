import Link from 'next/link'

interface CTABlockProps {
  heading?: string
  subheading?: string
  buttonText?: string
  buttonHref?: string
  dark?: boolean
}

export default function CTABlock({
  heading = "Let's create something beautiful",
  subheading = 'Every project begins with a conversation.',
  buttonText = 'Start a Conversation',
  buttonHref = '/contact',
  dark = true,
}: CTABlockProps) {
  return (
    <section
      className={`section-padding ${
        dark ? 'bg-[#0A0A0A] text-white' : 'bg-gray-50'
      }`}
    >
      <div className="max-content text-center">
        <h3
          className={`mb-4 ${dark ? 'text-white' : ''}`}
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
        >
          {heading}
        </h3>
        <p
          className={`font-serif italic text-lg mb-8 ${
            dark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {subheading}
        </p>
        <Link
          href={buttonHref}
          className={dark ? 'btn-outline-white inline-block' : 'btn-primary inline-block'}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  )
}
