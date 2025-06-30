'use server'

import { auth } from '@clerk/nextjs'
import { stripe, STRIPE_PLANS } from '@/lib/stripe/stripe-client'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

export async function createCheckoutSession(planType: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE') {
  const { userId, orgId } = auth()
  if (!userId || !orgId) throw new Error('Unauthorized')

  const plan = STRIPE_PLANS[planType]
  if (!plan) throw new Error('Invalid plan')

  const organization = await prisma.organization.findUnique({
    where: { id: orgId },
    include: { users: { where: { clerkId: userId } } }
  })

  if (!organization) throw new Error('Organization not found')

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    customer_email: organization.users[0]?.email,
    line_items: [
      {
        price: plan.priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
    metadata: {
      organizationId: orgId,
      userId: userId,
      planType: planType
    },
    subscription_data: {
      metadata: {
        organizationId: orgId,
        planType: planType
      }
    }
  })

  if (!session.url) throw new Error('Failed to create checkout session')
  
  redirect(session.url)
}

export async function createPortalSession() {
  const { userId, orgId } = auth()
  if (!userId || !orgId) throw new Error('Unauthorized')

  const organization = await prisma.organization.findUnique({
    where: { id: orgId }
  })

  if (!organization?.stripeCustomerId) {
    throw new Error('No Stripe customer found')
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: organization.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  })

  redirect(session.url)
}

export async function getCurrentSubscription() {
  const { orgId } = auth()
  if (!orgId) throw new Error('Unauthorized')

  const organization = await prisma.organization.findUnique({
    where: { id: orgId }
  })

  if (!organization?.stripeSubscriptionId) {
    return null
  }

  const subscription = await stripe.subscriptions.retrieve(organization.stripeSubscriptionId)
  return subscription
}

export async function cancelSubscription() {
  const { orgId } = auth()
  if (!orgId) throw new Error('Unauthorized')

  const organization = await prisma.organization.findUnique({
    where: { id: orgId }
  })

  if (!organization?.stripeSubscriptionId) {
    throw new Error('No subscription found')
  }

  await stripe.subscriptions.update(organization.stripeSubscriptionId, {
    cancel_at_period_end: true
  })

  return { success: true }
}