'use server'

import { auth, clerkClient } from '@clerk/nextjs'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createOrganization(data: {
  name: string
  slug: string
  domain?: string
}) {
  const { userId } = auth()
  if (!userId) throw new Error('Unauthorized')

  // Check if slug is available
  const existingOrg = await prisma.organization.findUnique({
    where: { slug: data.slug }
  })
  
  if (existingOrg) {
    throw new Error('Organization slug already exists')
  }

  const organization = await prisma.organization.create({
    data: {
      name: data.name,
      slug: data.slug,
      domain: data.domain,
      plan: 'STARTER',
      users: {
        create: {
          clerkId: userId,
          email: '', // Will be updated by webhook
          role: 'ORG_ADMIN'
        }
      }
    }
  })

  revalidatePath('/dashboard')
  return organization
}

export async function getUserOrganizations() {
  const { userId } = auth()
  if (!userId) throw new Error('Unauthorized')

  return await prisma.user.findMany({
    where: { clerkId: userId },
    include: {
      organization: true
    }
  })
}

export async function switchOrganization(organizationId: string) {
  const { userId } = auth()
  if (!userId) throw new Error('Unauthorized')

  // Verify user has access to this organization
  const userOrg = await prisma.user.findFirst({
    where: {
      clerkId: userId,
      organizationId: organizationId
    }
  })

  if (!userOrg) {
    throw new Error('Access denied to organization')
  }

  // Update user's active organization in Clerk
  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      activeOrganization: organizationId
    }
  })

  revalidatePath('/dashboard')
  return userOrg.organization
}

export async function inviteUserToOrganization(email: string, role: 'MANAGER' | 'USER' | 'VIEWER') {
  const { userId, orgId } = auth()
  if (!userId || !orgId) throw new Error('Unauthorized')

  // Check if user has permission to invite
  const currentUser = await prisma.user.findFirst({
    where: { clerkId: userId, organizationId: orgId }
  })

  if (!currentUser || !['ORG_ADMIN', 'MANAGER'].includes(currentUser.role)) {
    throw new Error('Insufficient permissions')
  }

  // Create invitation
  const invitation = await clerkClient.invitations.createInvitation({
    emailAddress: email,
    publicMetadata: {
      organizationId: orgId,
      role: role
    }
  })

  revalidatePath('/dashboard/team')
  return invitation
}

export async function updateOrganizationPlan(organizationId: string, plan: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE') {
  const { userId } = auth()
  if (!userId) throw new Error('Unauthorized')

  const organization = await prisma.organization.update({
    where: { id: organizationId },
    data: { plan }
  })

  revalidatePath('/dashboard/billing')
  return organization
}