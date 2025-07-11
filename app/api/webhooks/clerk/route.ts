// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'
// import { prisma } from '@/lib/db'

// export async function POST(req: Request) {
//   const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

//   if (!WEBHOOK_SECRET) {
//     throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
//   }

//   // Get the headers
//   const headerPayload = headers()
//   const svix_id = headerPayload.get('svix-id')
//   const svix_timestamp = headerPayload.get('svix-timestamp')
//   const svix_signature = headerPayload.get('svix-signature')

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error occured -- no svix headers', {
//       status: 400,
//     })
//   }

//   // Get the body
//   const payload = await req.text()
//   const body = JSON.parse(payload)

//   // Create a new Svix instance with your secret.
//   const wh = new Webhook(WEBHOOK_SECRET)

//   let evt: WebhookEvent

//   // Verify the payload with the headers
//   try {
//     evt = wh.verify(payload, {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     }) as WebhookEvent
//   } catch (err) {
//     console.error('Error verifying webhook:', err)
//     return new Response('Error occured', {
//       status: 400,
//     })
//   }

//   // Handle the webhook
//   const eventType = evt.type

//   if (eventType === 'user.created') {
//     const { id, email_addresses, first_name, last_name } = evt.data
    
//     try {
//       // Create user in database
//       await prisma.user.create({
//         data: {
//           clerkId: id,
//           email: email_addresses[0]?.email_address || '',
//           firstName: first_name,
//           lastName: last_name,
//           organizationId: '', // Will be set when user joins/creates org
//         }
//       })
//     } catch (error) {
//       console.error('Error creating user:', error)
//     }
//   }

//   if (eventType === 'user.updated') {
//     const { id, email_addresses, first_name, last_name } = evt.data
    
//     try {
//       await prisma.user.updateMany({
//         where: { clerkId: id },
//         data: {
//           email: email_addresses[0]?.email_address || '',
//           firstName: first_name,
//           lastName: last_name,
//         }
//       })
//     } catch (error) {
//       console.error('Error updating user:', error)
//     }
//   }

//   if (eventType === 'user.deleted') {
//     const { id } = evt.data
    
//     try {
//       await prisma.user.deleteMany({
//         where: { clerkId: id }
//       })
//     } catch (error) {
//       console.error('Error deleting user:', error)
//     }
//   }

//   return new Response('', { status: 200 })
// }

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers - AWAIT is required in Next.js 15
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.text()
  const body = JSON.parse(payload)

  // Create a new Svix instance with your 
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data
    
    try {
      // Create user in database
      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0]?.email_address || '',
          firstName: first_name,
          lastName: last_name,
          organizationId: '', // Will be set when user joins/creates org
        }
      })
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = evt.data
    
    try {
      await prisma.user.updateMany({
        where: { clerkId: id },
        data: {
          email: email_addresses[0]?.email_address || '',
          firstName: first_name,
          lastName: last_name,
        }
      })
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data
    
    try {
      await prisma.user.deleteMany({
        where: { clerkId: id }
      })
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return new Response('', { status: 200 })
}