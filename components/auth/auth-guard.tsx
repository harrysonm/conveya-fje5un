"use client";

import { useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useRouter, usePathname } from 'next/navigation'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoading) return

    // List of public routes that don't require authentication
    const publicRoutes = ['/login', '/register', '/auth/callback']
    const isPublicRoute = publicRoutes.includes(pathname)

    if (!user && !isPublicRoute) {
      // Save the attempted URL for redirecting after login
      const returnUrl = encodeURIComponent(pathname)
      router.push(`/login?returnUrl=${returnUrl}`)
    } else if (user && isPublicRoute) {
      // Get the return URL if it exists
      const params = new URLSearchParams(window.location.search)
      const returnUrl = params.get('returnUrl')
      router.push(returnUrl || '/')
    }
  }, [user, isLoading, router, pathname])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-800 rounded-full animate-spin"></div>
      </div>
    )
  }

  // Show children only if authenticated or on public route
  const publicRoutes = ['/login', '/register', '/auth/callback']
  const isPublicRoute = publicRoutes.includes(pathname)
  
  if (!user && !isPublicRoute) {
    return null
  }

  return <>{children}</>
}