import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { executionData, status, organizationId } = body

    // Validate organization access
    if (organizationId !== orgId) {
      return NextResponse.json({ error: 'Organization mismatch' }, { status: 403 })
    }

    // Find or create process for this execution
    let process = await prisma.process.findFirst({
      where: {
        organizationId: orgId,
        name: `Automated: ${executionData.type}`
      }
    })

    if (!process) {
      process = await prisma.process.create({
        data: {
          name: `Automated: ${executionData.type}`,
          description: `Auto-generated process for ${executionData.type} automation`,
          status: 'ACTIVE',
          category: 'AUTOMATION',
          priority: 'MEDIUM',
          ownerId: userId,
          organizationId: orgId,
          flowData: {
            automationType: executionData.type,
            platforms: executionData.platforms,
            isAutomated: true
          }
        }
      })
    }

    // Log the execution
    const execution = await prisma.execution.create({
      data: {
        processId: process.id,
        status: status === 'completed' ? 'COMPLETED' : 'RUNNING',
        startedAt: new Date(executionData.metadata.triggeredAt),
        completedAt: status === 'completed' ? new Date() : null,
        duration: status === 'completed' ? 
          Date.now() - new Date(executionData.metadata.triggeredAt).getTime() : null,
        metadata: {
          executionPlan: executionData,
          automationLevel: executionData.metadata.automationLevel,
          platforms: executionData.platforms,
          sourceFile: executionData.sourceFile
        }
      }
    })

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'PROCESS_EXECUTED',
        title: 'Cross-Platform Automation',
        description: `Automated ${executionData.type} process executed successfully`,
        userId,
        processId: process.id,
        metadata: {
          executionId: execution.id,
          platforms: executionData.platforms,
          automationType: executionData.type
        }
      }
    })

    return NextResponse.json({
      success: true,
      executionId: execution.id,
      processId: process.id
    })
  } catch (error) {
    console.error('Execution logging error:', error)
    return NextResponse.json(
      { error: 'Failed to log execution' },
      { status: 500 }
    )
  }
}