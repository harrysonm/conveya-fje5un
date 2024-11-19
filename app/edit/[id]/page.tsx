// This is the server component that handles static params
import { Metadata } from 'next'
import EditFormClient from './edit-form-client'

export const metadata: Metadata = {
  title: 'Edit Form',
  description: 'Edit your form'
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

export default function EditFormPage() {
  return <EditFormClient />
}