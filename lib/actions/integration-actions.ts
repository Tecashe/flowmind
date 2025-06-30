'use server'

import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getIntegrations() {
  const { userId, orgId } = auth()
  if (!userId || !orgId) throw new Error('Unauthorized')
  
  return await prisma.integration.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createIntegration(data: {
  name: string
  type: 'SLACK' | 'TEAMS' | 'ASANA' | 'TRELLO' | 'SALESFORCE' | 'HUBSPOT'
  config: any
}) {
  const { userId, orgId } = auth()
  if (!userId || !orgId) throw new Error('Unauthorized')
  
  const integration = await prisma.integration.create({
    data: {
      ...data,
      organizationId: orgId,
      status: 'ACTIVE'
    }
  })
  
  revalidatePath('/dashboard/integrations')
  return integration
}

export async function toggleIntegration(id: string) {
  const { userId, orgId } = auth()
  if (!userId) throw new Error('Unauthorized')
  
  const integration = await prisma.integration.findFirst({
    where: { id, organizationId: orgId }
  })
  
  if (!integration) throw new Error('Integration not found')
  
  await prisma.integration.update({
    where: { id },
    data: {
      status: integration.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    }
  })
  
  revalidatePath('/dashboard/integrations')
}