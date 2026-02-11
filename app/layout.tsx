import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Sarah Kingdom Designs | Boulder Interior Design',
  description:
    'Boulder interior designer specializing in layered texture and considered restraint. Full-service design, room refresh, and consultations.',
  keywords: [
    'Boulder interior design',
    'interior designer Boulder CO',
    'Sarah Kingdom',
    'luxury interior design',
    'mountain modern design',
  ],
  openGraph: {
    title: 'Sarah Kingdom Designs | Boulder Interior Design',
    description:
      'Spaces that feel expensive but never flashy. Based in Boulder, CO.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=zodiak@400,500,600,400-italic&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
