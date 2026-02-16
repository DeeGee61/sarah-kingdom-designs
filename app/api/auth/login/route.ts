import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const validEmail = process.env.ADMIN_EMAIL
  const validPassword = process.env.ADMIN_PASSWORD
  const sessionSecret = process.env.SESSION_SECRET || 'skd-admin-session-2026-boulder-co'

  if (email === validEmail && password === validPassword) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('skd-admin-session', sessionSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    return response
  }

  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
}
