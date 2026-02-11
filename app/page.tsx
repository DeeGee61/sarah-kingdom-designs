import Link from 'next/link'
import Image from 'next/image'

export default function SplashPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600210492-b52bd06c5efd?auto=format&fit=crop&w=1920&q=80"
          alt="Interior design"
          fill
          className="object-cover ken-burns"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="splash-fade-up text-white mb-4">
          Sarah Kingdom
        </h1>
        <p
          className="splash-fade-up font-serif italic text-lg md:text-xl text-white/80 mb-2"
          style={{ animationDelay: '0.5s' }}
        >
          Interior Design &mdash; Boulder, Colorado
        </p>
        <p
          className="splash-fade-up font-serif text-sm text-white/60 mb-10 max-w-md mx-auto"
          style={{ animationDelay: '0.7s' }}
        >
          Spaces that feel expensive but never flashy.
          <br />
          Layered texture. Considered restraint.
        </p>
        <div className="splash-fade-up" style={{ animationDelay: '0.9s' }}>
          <Link href="/home" className="btn-outline-white inline-block">
            Enter
          </Link>
        </div>
      </div>
    </div>
  )
}
