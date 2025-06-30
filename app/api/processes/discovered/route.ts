import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'
import { RealTimeProcessor } from '@/lib/integrations/real-time-processor'

export async function POST(req: NextRequest) {
  try {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { processData, source, organizationId } = body

    // Validate organization access
    if (organizationId !== orgId) {
      return NextResponse.json({ error: 'Organization mismatch' }, { status: 403 })
    }

    // Process with real-time AI engine
    const processor = RealTimeProcessor.getInstance()
    const result = await processor.processIncomingData({
      source,
      type: 'discovered_process',
      payload: processData,
      organizationId: orgId
    })

    // Create discovered process in database
    const discoveredProcess = await prisma.process.create({
      data: {
        name: processData.name || `Discovered Process ${Date.now()}`,
        description: `Auto-discovered from ${source}. Confidence: ${processData.confidence}%`,
        status: 'DRAFT',
        category: 'AI_DISCOVERED',
        priority: processData.confidence > 80 ? 'HIGH' : 'MEDIUM',
        ownerId: userId,
        organizationId: orgId,
        flowData: {
          source,
          discoveryData: processData,
          aiInsights: result.insights,
          suggestedActions: result.actions,
          efficiency: result.efficiency
        }
      }
    })

    // Log the discovery
    await prisma.activity.create({
      data: {
        type: 'PROCESS_CREATED',
        title: 'AI Process Discovery',
        description: `Discovered new process: ${discoveredProcess.name}`,
        userId,
        processId: discoveredProcess.id,
        metadata: {
          source,
          confidence: processData.confidence,
          aiGenerated: true
        }
      }
    })

    return NextResponse.json({
      success: true,
      processId: discoveredProcess.id,
      insights: result.insights,
      actions: result.actions,
      efficiency: result.efficiency
    })
  } catch (error) {
    console.error('Process discovery error:', error)
    return NextResponse.json(
      { error: 'Failed to process discovered data' },
      { status: 500 }
    )
  }
}