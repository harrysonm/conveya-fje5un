import { createClient } from './client'
import { toast } from '@/hooks/use-toast'

// Rate limiting for auth attempts
const rateLimiter = {
  attempts: 0,
  lastAttempt: 0,
  reset() {
    this.attempts = 0
    this.lastAttempt = 0
  },
  check() {
    const now = Date.now()
    if (now - this.lastAttempt > 60000) { // Reset after 1 minute
      this.reset()
    }
    if (this.attempts >= 5) {
      throw new Error('Too many attempts. Please try again later.')
    }
    this.attempts++
    this.lastAttempt = now
  }
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()
  
  try {
    rateLimiter.check()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Reset rate limiter on successful sign in
    rateLimiter.reset()
    return data
  } catch (error: any) {
    console.error('Sign in error:', error.message)
    throw new Error(error.message || 'Failed to sign in')
  }
}

export async function signUp(email: string, password: string) {
  const supabase = createClient()
  
  try {
    rateLimiter.check()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          timestamp: new Date().toISOString() // For CSRF protection
        }
      },
    })

    if (error) throw error

    rateLimiter.reset()
    return data
  } catch (error: any) {
    console.error('Sign up error:', error.message)
    throw new Error(error.message || 'Failed to sign up')
  }
}

export async function signOut() {
  const supabase = createClient()
  
  try {
    // Get current session before signing out
    const { data: { session } } = await supabase.auth.getSession()
    
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    // Only clear data if we had an active session
    if (session) {
      // Clear any sensitive data from localStorage
      const keysToPreserve = ['form-storage', 'theme-storage', 'sidebar-storage']
      const preservedData: Record<string, string> = {}
      
      // Save data we want to keep
      keysToPreserve.forEach(key => {
        const data = localStorage.getItem(key)
        if (data) preservedData[key] = data
      })
      
      // Clear localStorage
      localStorage.clear()
      
      // Restore preserved data
      Object.entries(preservedData).forEach(([key, value]) => {
        localStorage.setItem(key, value)
      })
    }

    // Redirect to login page
    window.location.href = '/login'
  } catch (error: any) {
    console.error('Sign out error:', error.message)
    toast({
      title: "Error signing out",
      description: error.message || "Please try again",
      variant: "destructive"
    })
  }
}

export async function refreshSession() {
  const supabase = createClient()
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    
    // Don't throw error for no session - this is a valid state
    if (!session) {
      return null
    }

    // Check if token needs refresh (if less than 60 mins remaining)
    const expiresAt = session.expires_at
    if (expiresAt) {
      const expiresIn = new Date(expiresAt).getTime() - Date.now()
      if (expiresIn < 60 * 60 * 1000) {
        const { data: { session: newSession }, error: refreshError } = 
          await supabase.auth.refreshSession()
        if (refreshError) throw refreshError
        return newSession
      }
    }

    return session
  } catch (error: any) {
    // Only log actual errors, not missing sessions
    if (error.message !== 'No session found') {
      console.error('Session refresh error:', error.message)
    }
    return null
  }
}