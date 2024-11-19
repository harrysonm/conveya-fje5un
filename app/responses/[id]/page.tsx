// This is the server component that handles static params
import { Metadata } from 'next'
import ResponsesClient from './responses-client'

export const metadata: Metadata = {
  title: 'Form Responses',
  description: 'View form responses'
}

// Generate static params for all possible form IDs
export async function generateStaticParams() {
  // For static export, we'll generate a few placeholder IDs
  // In a real app, you would fetch these from your database
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '7sCOpjaoiAye0_YTNZ9yC' }
  ]
}

export default function ResponsesPage() {
  return <ResponsesClient />
}