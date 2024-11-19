"use client";

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { refreshSession } from '@/lib/supabase/auth'
import { toast } from './use-toast'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  // Handle auth state changes
  useEffect(() => {
    let mounted = true
    let refreshInterval: NodeJS.Timeout

    const handleAuthChange = async () => {
      try {
        const session = await refreshSession()
        if (mounted) {
          setUser(session?.user || null)
          setIsLoading(false)
        }
      } catch (error: any) {
        console.error('Auth state change error:', error.message)
        if (mounted) {
          setUser(null)
          setIsLoading(false)
        }
      }
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        if (mounted) {
          setUser(session?.user || null)
          setIsLoading(false)
          toast({ description: "Successfully signed in" })
        }
      }
      if (event === 'SIGNED_OUT') {
        if (mounted) {
          setUser(null)
          setIsLoading(false)
          router.push('/login')
          toast({ description: "Successfully signed out" })
        }
      }
      if (event === 'TOKEN_REFRESHED') {
        await handleAuthChange()
      }
    })

    // Initial session check
    handleAuthChange()

    // Refresh session periodically
    refreshInterval = setInterval(handleAuthChange, 10 * 60 * 1000) // Every 10 minutes

    return () => {
      mounted = false
      clearInterval(refreshInterval)
      subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  const requireAuth = useCallback(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [isLoading, user, router])

  return {
    user,
    isLoading,
    requireAuth
  }
}