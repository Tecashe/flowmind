'use server'

import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'

export async function getDashboardStats() {
  const { userId, orgId } = auth()
  if (!userId || !orgId) throw new Error('Unauthorized')
  
  const [
    totalProcesses,
    activeProcesses,
    totalExecutions,
    recentExecutions
  ] = await Promise.all([
    prisma.process.count({ where: { organizationId: orgId } }),
    prisma.process.count({ 
      where: { organizationId: orgId, status: 'ACTIVE' } 
    }),
    prisma.execution.count({
      where: { process: { organizationId: orgId } }
    }),
    prisma.execution.findMany({
      where: { process: { organizationId: orgId } },
      take: 10,
      orderBy: { startedAt: 'desc' },
      include: {
        process: { select: { name: true } }
      }
    })
  ])
  
  return {
    totalProcesses,
    activeProcesses,
    totalExecutions,
    recentExecutions
  }
}

export async function getProcessMetrics(processId: string) {
  const { userId, orgId } = auth()
  if (!userId) throw new Error('Unauthorized')
  
  const executions = await prisma.execution.findMany({
    where: { 
      processId,
      process: { organizationId: orgId }
    },
    orderBy: { startedAt: 'desc' },
    take: 30
  })
  
  const successRate = executions.length > 0 
    ? (executions.filter(e => e.status === 'COMPLETED').length / executions.length) * 100
    : 0
  
  const avgDuration = executions
    .filter(e => e.duration)
    .reduce((sum, e) => sum + (e.duration || 0), 0) / executions.length || 0
  
  return {
    executions: executions.length,
    successRate: Math.round(successRate),
    avgDuration: Math.round(avgDuration),
    recentExecutions: executions.slice(0, 5)
  }
}