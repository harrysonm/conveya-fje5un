import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const redirectTo = requestUrl.searchParams.get('redirectedFrom') || '/'

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient()

    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, requestUrl.origin)
      )
    }

    // Successful auth, redirect to intended page
    return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
  }

  // No code provided
  return NextResponse.redirect(
    new URL('/login?error=no_code_provided', requestUrl.origin)
  )
}