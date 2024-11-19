import { createClient } from '@/lib/supabase/client'
import { toast } from '@/hooks/use-toast'

export async function signOut() {
  const supabase = createClient()
  
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    // Clear any client-side state
    localStorage.removeItem('form-storage')
    localStorage.removeItem('theme-storage')
    localStorage.removeItem('sidebar-storage')
    
    // Redirect to login
    window.location.href = '/login'
  } catch (error) {
    console.error('Error signing out:', error)
    toast({
      title: "Error signing out",
      description: "Please try again",
      variant: "destructive"
    })
  }
}

export async function handleAuthCallback() {
  const supabase = createClient()
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('Error handling auth callback:', error)
    return null
  }
}