import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Mail, Phone, MapPin, Instagram } from 'lucide-react'

export const metadata = {
  title: 'Contact | Sarah Kingdom Designs',
  description:
    'Get in touch with Sarah Kingdom Designs. Based in Boulder, CO.',
}

export default function ContactPage() {
  return (
    <>
      <Navigation />

      <section className="pt-32 pb-8">
        <div className="max-content">
          <SectionHeading
            caption="Contact"
            title="Start a Conversation"
            subtitle="Every great space begins with a simple hello. Tell us about your project and we'll be in touch within 24 hours."
          />
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="max-content grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Form */}
          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="caption block mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="caption block mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="caption block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="caption block mb-2">Phone (optional)</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition-colors"
                />
              </div>

              <div>
                <label className="caption block mb-2">
                  Service Interest
                </label>
                <select
                  name="service"
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition-colors bg-white"
                >
                  <option value="">Select a service</option>
                  <option value="full-service">Full-Service Design</option>
                  <option value="room-refresh">Room Refresh</option>
                  <option value="consultation">Design Consultation</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div>
                <label className="caption block mb-2">
                  Tell Us About Your Project
                </label>
                <textarea
                  name="message"
                  rows={5}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition-colors resize-none"
                  placeholder="What are you dreaming about for your space?"
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div>
            <div className="space-y-8">
              <div>
                <p className="caption mb-3">Visit</p>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-1 shrink-0 text-gray-400" />
                  <div className="text-sm">
                    <p>Sarah Kingdom Designs</p>
                    <p className="text-gray-600">
                      1234 Pearl Street, Suite 200
                      <br />
                      Boulder, CO 80302
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      By appointment only
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="caption mb-3">Call or Email</p>
                <div className="space-y-3">
                  <a
                    href="tel:+13038174984"
                    className="flex items-center gap-3 text-sm hover:text-gray-800 transition-colors"
                  >
                    <Phone size={16} className="text-gray-400" />
                    (303) 817-4984
                  </a>
                  <a
                    href="mailto:sarah@sarahkingdomdesigns.net"
                    className="flex items-center gap-3 text-sm hover:text-gray-800 transition-colors"
                  >
                    <Mail size={16} className="text-gray-400" />
                    sarah@sarahkingdomdesigns.net
                  </a>
                </div>
              </div>

              <div>
                <p className="caption mb-3">Follow</p>
                <a
                  href="https://instagram.com/sarahkingdomdesigns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-gray-800 transition-colors"
                >
                  <Instagram size={16} className="text-gray-400" />
                  @sarahkingdomdesigns
                </a>
              </div>

              <div className="p-8 bg-gray-50 mt-8">
                <h3 className="text-base mb-3">What happens next?</h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="font-sans font-bold text-gray-300">1</span>
                    We&apos;ll respond to your inquiry within 24 hours.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-sans font-bold text-gray-300">2</span>
                    We&apos;ll schedule a free 15-minute intro call.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-sans font-bold text-gray-300">3</span>
                    If it&apos;s a fit, we&apos;ll schedule an on-site visit.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
