import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

// Disable middleware for static export
export const config = {
  matcher: []
};