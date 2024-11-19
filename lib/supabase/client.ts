import { createBrowserClient } from '@supabase/ssr'
import { type SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export const createClient = () => {
  if (supabaseClient) return supabaseClient

  supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      },
      cookies: {
        name: 'sb-auth',
        lifetime: 60 * 60 * 24 * 7, // 1 week
        domain: window.location.hostname,
        path: '/',
        sameSite: 'lax'
      }
    }
  )

  return supabaseClient
}