"use client";

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        
        if (session) {
          const redirectedFrom = searchParams.get('redirectedFrom') || '/'
          router.push(redirectedFrom)
        }
      } catch (error: any) {
        console.error('Session check error:', error)
        toast({
          title: "Error checking session",
          description: error.message || "Please try signing in again",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [router, searchParams, supabase.auth])

  // Show error message if present in URL
  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      toast({
        title: "Authentication Error",
        description: decodeURIComponent(error),
        variant: "destructive"
      })
    }
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-800 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-[400px] p-6 bg-white rounded-lg shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
          <p className="text-sm text-neutral-500">Sign in to your account to continue</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#000000',
                  brandAccent: '#262626'
                }
              }
            },
            className: {
              button: 'bg-neutral-900 hover:bg-neutral-800 text-white',
              input: 'rounded-md border-neutral-200',
              label: 'text-sm text-neutral-800 font-medium',
            }
          }}
          providers={[]}
          redirectTo={`${window.location.origin}/auth/callback`}
          onlyThirdPartyProviders={false}
          magicLink={false}
          showLinks={false}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email address',
                password_label: 'Password',
                button_label: 'Sign in',
                loading_button_label: 'Signing in...',
              }
            }
          }}
        />
      </div>
    </div>
  )
}