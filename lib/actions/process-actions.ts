'use server'

import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getProcesses() {
  const { userId, orgId } = auth()
  if (!userId || !orgId) throw new Error('Unauthorized')
  
  return await prisma.process.findMany({
    where: { organizationId: orgId },
    include: {
      owner: { select: { firstName: true, lastName: true, email: true } },
      _count: { select: { executions: true, comments: true } },
      metrics: { take: 1, orderBy: { lastCalculated: 'desc' } }
    },
    orderBy: { updatedAt: 'desc' }
  })
}

export async function createProcess(data: {
  name: string
  description?: string
  category?: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
}) {
  const { userId, orgId } = auth()
  if (!userId || !orgId) throw new Error('Unauthorized')
  
  const process = await prisma.process.create({
    data: {
      ...data,
      ownerId: userId,
      organizationId: orgId,
    }
  })
  
  revalidatePath('/dashboard/processes')
  return process
}

export async function updateProcess(id: string, data: Partial<{
  name: string
  description: string
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ARCHIVED'
  flowData: any
}>) {
  const { userId, orgId } = auth()
  if (!userId) throw new Error('Unauthorized')
  
  const process = await prisma.process.update({
    where: { id, organizationId: orgId },
    data: { ...data, updatedAt: new Date() }
  })
  
  revalidatePath('/dashboard/processes')
  return process
}

export async function deleteProcess(id: string) {
  const { userId, orgId } = auth()
  if (!userId) throw new Error('Unauthorized')
  
  await prisma.process.delete({
    where: { id, organizationId: orgId }
  })
  
  revalidatePath('/dashboard/processes')
}

export async function executeProcess(processId: string) {
  const { userId, orgId } = auth()
  if (!userId) throw new Error('Unauthorized')
  
  const execution = await prisma.execution.create({
    data: {
      processId,
      status: 'RUNNING',
      startedAt: new Date()
    }
  })
  
  // Simulate process execution (replace with real logic)
  setTimeout(async () => {
    await prisma.execution.update({
      where: { id: execution.id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        duration: Math.floor(Math.random() * 5000) + 1000
      }
    })
    revalidatePath('/dashboard')
  }, 2000)
  
  revalidatePath('/dashboard')
  return execution
}