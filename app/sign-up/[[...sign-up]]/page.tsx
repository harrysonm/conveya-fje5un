// This is the server component that handles static params
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account'
}

// Generate static params for sign-up route
export async function generateStaticParams() {
  return [
    { "sign-up": [] },
    { "sign-up": ["email"] },
    { "sign-up": ["phone"] }
  ]
}

export default function SignUpPage() {
  return null; // Auth is handled by the auth provider component
}