import Link from 'next/link'
import { Instagram, Mail, Phone } from 'lucide-react'

const footerLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      <div className="max-content section-padding">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl mb-4">Sarah Kingdom</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Boulder interior designer specializing in layered texture and
              considered restraint.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="caption mb-4">Navigate</p>
            <div className="flex flex-col gap-2">
              {footerLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="caption mb-4">Get in Touch</p>
            <div className="flex flex-col gap-3 text-gray-400 text-sm">
              <a
                href="mailto:sarah@sarahkingdomdesigns.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail size={14} />
                sarah@sarahkingdomdesigns.com
              </a>
              <a
                href="tel:+13038174984"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone size={14} />
                (303) 817-4984
              </a>
              <a
                href="https://instagram.com/sarahkingdomdesigns"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Instagram size={14} />
                @sarahkingdomdesigns
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Sarah Kingdom Designs. All rights
            reserved.
          </p>
          <p className="text-gray-600 text-xs">Boulder, Colorado</p>
        </div>
      </div>
    </footer>
  )
}
