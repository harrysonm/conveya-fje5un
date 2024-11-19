// This file is intentionally empty as Clerk webhooks are not used
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  return new Response('Webhook endpoint', { status: 200 })
}