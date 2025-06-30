'use server'

import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { STRIPE_PLANS } from '@/lib/stripe/stripe-client'

export async function getBillingInfo() {
  const { userId, orgId } = auth()
  if (!userId || !orgId) throw new Error('Unauthorized')

  const organization = await prisma.organization.findUnique({
    where: { id: orgId },
    include: {
      users: {
        select: { id: true, role: true }
      },
      processes: {
        select: { id: true }
      },
      integrations: {
        select: { id: true }
      }
    }
  })

  if (!organization) throw new Error('Organization not found')

  // Calculate current month executions
  const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const executionsThisMonth = await prisma.execution.count({
    where: {
      process: { organizationId: orgId },
      startedAt: { gte: currentMonthStart }
    }
  })

  // Calculate usage
  const usage = {
    users: organization.users.length,
    processes: organization.processes.length,
    integrations: organization.integrations.length,
    executions: executionsThisMonth
  }

  // Get plan limits
  const planLimits = STRIPE_PLANS[organization.plan as keyof typeof STRIPE_PLANS]?.features || STRIPE_PLANS.STARTER.features

  return {
    organization,
    usage,
    planLimits,
    billingCycle: 'monthly',
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    amount: STRIPE_PLANS[organization.plan as keyof typeof STRIPE_PLANS]?.price || 99
  }
}

export async function createCheckoutSession(plan: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE') {
  // This will be handled by the stripe-actions.ts file
  const { createCheckoutSession: stripeCheckout } = await import('./stripe-actions')
  return stripeCheckout(plan)
}

export async function cancelSubscription() {
  // This will be handled by the stripe-actions.ts file
  const { cancelSubscription: stripeCancel } = await import('./stripe-actions')
  return stripeCancel()
}