"use client"

import { useRouter } from 'next/navigation'
import Link from 'next/link'

const variants = [
  {
    href: '/admin/proposals/wizard',
    title: 'Wizard',
    subtitle: 'Step-by-Step Flow',
    description: 'Guided 7-step linear flow. Project info → 5 phases → Review. Best for walking through each phase deliberately without overwhelm.',
  },
  {
    href: '/admin/proposals/split-pane',
    title: 'Split Pane',
    subtitle: 'Editor + Live Preview',
    description: 'Left panel editor with accordion phases, right panel shows live-updating client-facing proposal. Best for seeing what the client sees while editing.',
  },
  {
    href: '/admin/proposals/dashboard',
    title: 'Dashboard',
    subtitle: 'Card Grid Overview',
    description: 'Everything visible at once. Visual budget bar chart, 2-column phase cards, toggle prompts on/off. Best for power users who want to scan and adjust quickly.',
  },
]

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAF8',
      fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
    }}>
      {/* Top Bar */}
      <div style={{
        background: '#111',
        color: '#fff',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.4 }}>
            Sarah Kingdom Designs
          </span>
          <span style={{ margin: '0 12px', opacity: 0.15 }}>|</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Admin</span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: '1px solid #333',
            color: '#888',
            padding: '6px 16px',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Sign Out
        </button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 32px' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111', marginBottom: 8, letterSpacing: '-0.02em' }}>
            Proposal Builder
          </h1>
          <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
            Three prototype layouts for generating client proposals. Each includes 5 project phases, editable hours, scope-based auto-scaling, and live cost calculations. Pick a favorite and we&apos;ll refine it.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {variants.map((v, i) => (
            <Link
              key={i}
              href={v.href}
              style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                background: '#fff',
                border: '1px solid #E8E8E4',
                padding: 28,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#111'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E8E8E4'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#BBB', marginBottom: 6 }}>
                  Variant {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 4 }}>
                  {v.title}
                </div>
                <div style={{ fontSize: 12, color: '#888' }}>
                  {v.subtitle}
                </div>
              </div>
              <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6, display: 'flex', alignItems: 'center' }}>
                {v.description}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
