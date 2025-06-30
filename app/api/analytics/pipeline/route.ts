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
    const { analysisData, organizationId } = body

    // Validate organization access
    if (organizationId !== orgId) {
      return NextResponse.json({ error: 'Organization mismatch' }, { status: 403 })
    }

    // Store analytics data
    const analyticsEntries = [
      {
        organizationId: orgId,
        metric: 'conversion_rate',
        value: analysisData.analysis.conversionRate,
        timestamp: new Date(),
        metadata: {
          source: 'salesforce_pipeline',
          totalLeads: analysisData.analysis.totalLeads,
          totalOpportunities: analysisData.analysis.totalOpportunities
        }
      },
      {
        organizationId: orgId,
        metric: 'pipeline_value',
        value: analysisData.aiInsights.predictedRevenue,
        timestamp: new Date(),
        metadata: {
          source: 'salesforce_pipeline',
          stageBreakdown: analysisData.stageBreakdown
        }
      },
      {
        organizationId: orgId,
        metric: 'process_efficiency',
        value: analysisData.aiInsights.processEfficiency === 'High' ? 85 : 65,
        timestamp: new Date(),
        metadata: {
          source: 'salesforce_pipeline',
          recommendations: analysisData.aiInsights.recommendations,
          bottlenecks: analysisData.aiInsights.bottlenecks
        }
      }
    ]

    await prisma.analytics.createMany({
      data: analyticsEntries
    })

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'PROCESS_EXECUTED',
        title: 'Salesforce Pipeline Analysis',
        description: `Pipeline analysis completed. Conversion rate: ${analysisData.analysis.conversionRate.toFixed(1)}%`,
        userId,
        metadata: {
          source: 'salesforce',
          analysisType: 'pipeline',
          insights: analysisData.aiInsights
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Pipeline analysis stored successfully',
      insights: analysisData.aiInsights
    })
  } catch (error) {
    console.error('Pipeline analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to store pipeline analysis' },
      { status: 500 }
    )
  }
}