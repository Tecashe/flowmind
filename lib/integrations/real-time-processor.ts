import { prisma } from '@/lib/db'
import { AdvancedAIEngine } from './advanced-ai-engine'

export class RealTimeProcessor {
  private static instance: RealTimeProcessor
  private aiEngine: AdvancedAIEngine
  private processingQueue: Map<string, any> = new Map()

  constructor() {
    this.aiEngine = AdvancedAIEngine.getInstance()
  }

  static getInstance(): RealTimeProcessor {
    if (!RealTimeProcessor.instance) {
      RealTimeProcessor.instance = new RealTimeProcessor()
    }
    return RealTimeProcessor.instance
  }

  async processIncomingData(data: {
    source: string
    type: string
    payload: any
    organizationId: string
  }): Promise<{
    processId: string
    insights: any
    actions: string[]
    efficiency: number
  }> {
    const processId = `proc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    try {
      // Store in processing queue
      this.processingQueue.set(processId, {
        ...data,
        startTime: Date.now(),
        status: 'processing'
      })

      // AI Analysis
      const insights = await this.aiEngine.analyzeProcessEfficiency(data.payload)
      
      // Determine automated actions
      const actions = await this.determineActions(data, insights)
      
      // Calculate real-time efficiency
      const efficiency = this.calculateEfficiency(data, insights)
      
      // Store results in database
      await this.storeProcessResults(processId, data, insights, actions, efficiency)
      
      // Update queue status
      this.processingQueue.set(processId, {
        ...this.processingQueue.get(processId),
        status: 'completed',
        endTime: Date.now()
      })

      return {
        processId,
        insights,
        actions,
        efficiency
      }
    } catch (error) {
      console.error('Real-time processing error:', error)
      
      this.processingQueue.set(processId, {
        ...this.processingQueue.get(processId),
        status: 'failed',
        error: error.message
      })

      throw error
    }
  }

  private async determineActions(data: any, insights: any): Promise<string[]> {
    const actions: string[] = []

    // Based on efficiency score, determine actions
    if (insights.efficiencyScore < 70) {
      actions.push('trigger_optimization_workflow')
      actions.push('notify_process_owner')
    }

    if (insights.bottlenecks.length > 0) {
      actions.push('create_bottleneck_alert')
      actions.push('suggest_automation_opportunities')
    }

    // Source-specific actions
    switch (data.source) {
      case 'slack':
        if (data.type === 'approval_request') {
          actions.push('create_asana_task')
          actions.push('set_reminder')
        }
        break
      case 'salesforce':
        if (data.type === 'opportunity_update') {
          actions.push('update_pipeline_forecast')
          actions.push('notify_sales_team')
        }
        break
      case 'asana':
        if (data.type === 'task_completion') {
          actions.push('trigger_next_step')
          actions.push('update_project_status')
        }
        break
    }

    return actions
  }

  private calculateEfficiency(data: any, insights: any): number {
    let baseEfficiency = insights.efficiencyScore || 75
    
    // Adjust based on processing time
    const processingTime = Date.now() - (this.processingQueue.get(data.processId)?.startTime || Date.now())
    if (processingTime < 1000) baseEfficiency += 10 // Fast processing bonus
    if (processingTime > 5000) baseEfficiency -= 5  // Slow processing penalty
    
    // Adjust based on automation level
    const automationLevel = this.calculateAutomationLevel(data)
    baseEfficiency += automationLevel * 0.2
    
    return Math.min(Math.max(baseEfficiency, 0), 100)
  }

  private calculateAutomationLevel(data: any): number {
    // Calculate how much of this process can be automated
    const automationIndicators = [
      data.payload.hasStructuredData,
      data.payload.hasDefinedRules,
      data.payload.hasRepeatableSteps,
      data.payload.hasMinimalHumanInput
    ].filter(Boolean).length

    return (automationIndicators / 4) * 100
  }

  private async storeProcessResults(
    processId: string,
    data: any,
    insights: any,
    actions: string[],
    efficiency: number
  ): Promise<void> {
    try {
      await prisma.execution.create({
        data: {
          id: processId,
          processId: data.processId || 'unknown',
          status: 'COMPLETED',
          startedAt: new Date(),
          completedAt: new Date(),
          duration: Date.now() - (this.processingQueue.get(processId)?.startTime || Date.now()),
          metadata: {
            source: data.source,
            type: data.type,
            insights,
            actions,
            efficiency,
            automationLevel: this.calculateAutomationLevel(data)
          }
        }
      })
    } catch (error) {
      console.error('Failed to store process results:', error)
    }
  }

  getProcessingStatus(processId: string): any {
    return this.processingQueue.get(processId)
  }

  getActiveProcesses(): any[] {
    return Array.from(this.processingQueue.values())
      .filter(process => process.status === 'processing')
  }

  getQueueStats(): {
    total: number
    processing: number
    completed: number
    failed: number
    avgProcessingTime: number
  } {
    const processes = Array.from(this.processingQueue.values())
    
    return {
      total: processes.length,
      processing: processes.filter(p => p.status === 'processing').length,
      completed: processes.filter(p => p.status === 'completed').length,
      failed: processes.filter(p => p.status === 'failed').length,
      avgProcessingTime: processes
        .filter(p => p.endTime)
        .reduce((sum, p) => sum + (p.endTime - p.startTime), 0) / 
        processes.filter(p => p.endTime).length || 0
    }
  }
}