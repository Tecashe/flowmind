// import { headers } from 'next/headers'
// import { NextRequest, NextResponse } from 'next/server'
// import { stripe } from '@/lib/stripe/stripe-client'
// import { prisma } from '@/lib/db'
// import Stripe from 'stripe'

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

// export async function POST(req: NextRequest) {
//   const body = await req.text()
//   const signature = await headers().get('stripe-signature')!

//   let event: Stripe.Event

//   try {
//     event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
//   } catch (err) {
//     console.error('Webhook signature verification failed:', err)
//     return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
//   }

//   try {
//     switch (event.type) {
//       case 'checkout.session.completed': {
//         const session = event.data.object as Stripe.Checkout.Session
//         const organizationId = session.metadata?.organizationId
//         const planType = session.metadata?.planType as 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'

//         if (organizationId && planType) {
//           await prisma.organization.update({
//             where: { id: organizationId },
//             data: {
//               plan: planType,
//               stripeCustomerId: session.customer as string,
//               stripeSubscriptionId: session.subscription as string
//             }
//           })
//         }
//         break
//       }

//       case 'customer.subscription.updated': {
//         const subscription = event.data.object as Stripe.Subscription
//         const organizationId = subscription.metadata?.organizationId

//         if (organizationId) {
//           const planType = subscription.metadata?.planType as 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
          
//           await prisma.organization.update({
//             where: { id: organizationId },
//             data: {
//               plan: planType || 'STARTER',
//               stripeSubscriptionId: subscription.id
//             }
//           })
//         }
//         break
//       }

//       case 'customer.subscription.deleted': {
//         const subscription = event.data.object as Stripe.Subscription
//         const organizationId = subscription.metadata?.organizationId

//         if (organizationId) {
//           await prisma.organization.update({
//             where: { id: organizationId },
//             data: {
//               plan: 'STARTER',
//               stripeSubscriptionId: null
//             }
//           })
//         }
//         break
//       }

//       case 'invoice.payment_failed': {
//         const invoice = event.data.object as Stripe.Invoice
//         // Handle failed payment - could pause features, send notifications, etc.
//         console.log('Payment failed for invoice:', invoice.id)
//         break
//       }
//     }

//     return NextResponse.json({ received: true })
//   } catch (error) {
//     console.error('Webhook handler error:', error)
//     return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
//   }
// }

import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/stripe-client'
import { prisma } from '@/lib/db'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headerPayload = await headers()
  const signature = headerPayload.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const organizationId = session.metadata?.organizationId
        const planType = session.metadata?.planType as 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'

        if (organizationId && planType) {
          await prisma.organization.update({
            where: { id: organizationId },
            data: {
              plan: planType,
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string
            }
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const organizationId = subscription.metadata?.organizationId

        if (organizationId) {
          const planType = subscription.metadata?.planType as 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
          
          await prisma.organization.update({
            where: { id: organizationId },
            data: {
              plan: planType || 'STARTER',
              stripeSubscriptionId: subscription.id
            }
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const organizationId = subscription.metadata?.organizationId

        if (organizationId) {
          await prisma.organization.update({
            where: { id: organizationId },
            data: {
              plan: 'STARTER',
              stripeSubscriptionId: null
            }
          })
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        // Handle failed payment - could pause features, send notifications, etc.
        console.log('Payment failed for invoice:', invoice.id)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}