'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CTABlock from '@/components/CTABlock'
import SectionHeading from '@/components/SectionHeading'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How much does interior design cost?',
    a: 'It depends on the scope. Our design consultations start at $500, room refreshes at $8,000, and full-service projects at $25,000. We provide detailed proposals after our initial conversation so there are no surprises.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A 90-minute consultation is a single session. Room refreshes typically take 6–10 weeks. Full-service projects range from 4–12 months depending on scope and complexity.',
  },
  {
    q: 'Do you work outside of Boulder?',
    a: "We're based in Boulder but work throughout the Front Range — Denver, Longmont, Niwot, Lyons, and beyond. For the right project, we'll travel further.",
  },
  {
    q: "What's your design style?",
    a: 'We don\'t subscribe to a single style. Our work is defined by quality materials, thoughtful proportion, and restraint. Whether your taste leans modern, traditional, or somewhere in between, we design spaces that feel authentic to you.',
  },
  {
    q: 'Do I need to buy all new furniture?',
    a: "Absolutely not. We love incorporating meaningful pieces you already own. Part of our process is identifying what stays, what goes, and what's needed to complete the vision.",
  },
  {
    q: 'How do I know which service is right for me?',
    a: "Start with a conversation. We'll discuss your goals, timeline, and budget, then recommend the best path forward. There's no commitment in our initial call.",
  },
  {
    q: 'Do you work with contractors?',
    a: 'Yes. For projects requiring construction, we coordinate with trusted contractors and tradespeople. We manage the relationship so you have a single point of contact.',
  },
  {
    q: 'Can I see your work in person?',
    a: "We occasionally host open-house events for completed projects. Sign up for our newsletter to be the first to know. We're also happy to share additional project photos during our initial call.",
  },
  {
    q: 'What makes you different from other designers?',
    a: "We obsess over materials and proportion. We listen more than we talk. And we believe design should feel inevitable — like the room was always meant to look this way. We're not here to impose a style; we're here to reveal yours.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full py-6 flex items-center justify-between text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-sans font-medium text-sm md:text-base pr-4">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-gray-400 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-sm leading-relaxed text-gray-600 max-w-2xl">{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <Navigation />

      <section className="pt-32 pb-8">
        <div className="max-content">
          <SectionHeading
            caption="FAQ"
            title="Common Questions"
            subtitle="Everything you need to know before we start working together."
          />
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="max-content max-w-2xl mx-auto">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      <CTABlock
        heading="Still have questions?"
        subheading="We're happy to chat. No obligation, no pressure."
        buttonText="Get in Touch"
      />
      <Footer />
    </>
  )
}
