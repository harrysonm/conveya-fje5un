// This is the server component that handles static params
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account'
}

// Generate static params for sign-in route
export async function generateStaticParams() {
  return [
    { "sign-in": [] },
    { "sign-in": ["email"] },
    { "sign-in": ["phone"] },
    { "sign-in": ["magic-link"] }
  ]
}

export default function SignInPage() {
  return null; // Auth is handled by the auth provider component
}