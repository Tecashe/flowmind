import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export class AdvancedAIEngine {
  private static instance: AdvancedAIEngine
  
  static getInstance(): AdvancedAIEngine {
    if (!AdvancedAIEngine.instance) {
      AdvancedAIEngine.instance = new AdvancedAIEngine()
    }
    return AdvancedAIEngine.instance
  }

  async analyzeProcessEfficiency(processData: any): Promise<{
    efficiencyScore: number
    bottlenecks: string[]
    recommendations: string[]
    predictedImprovements: {
      timeReduction: number
      costSavings: number
      riskMitigation: number
    }
  }> {
    try {
      const prompt = `
        Analyze this business process data and provide efficiency insights:
        ${JSON.stringify(processData, null, 2)}
        
        Please provide:
        1. Efficiency score (0-100)
        2. Identified bottlenecks
        3. Specific optimization recommendations
        4. Predicted improvements (time, cost, risk)
        
        Return as JSON format.
      `

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert business process analyst with 20+ years of experience in process optimization and efficiency improvement."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1500
      })

      const analysis = JSON.parse(response.choices[0].message.content || '{}')
      
      return {
        efficiencyScore: analysis.efficiencyScore || 75,
        bottlenecks: analysis.bottlenecks || [],
        recommendations: analysis.recommendations || [],
        predictedImprovements: {
          timeReduction: analysis.predictedImprovements?.timeReduction || 0,
          costSavings: analysis.predictedImprovements?.costSavings || 0,
          riskMitigation: analysis.predictedImprovements?.riskMitigation || 0
        }
      }
    } catch (error) {
      console.error('AI Analysis Error:', error)
      return {
        efficiencyScore: 75,
        bottlenecks: ['Unable to analyze - AI service unavailable'],
        recommendations: ['Please try again later'],
        predictedImprovements: { timeReduction: 0, costSavings: 0, riskMitigation: 0 }
      }
    }
  }

  async predictProcessFailures(historicalData: any[]): Promise<{
    riskScore: number
    failureProbability: number
    criticalFactors: string[]
    preventionStrategies: string[]
  }> {
    try {
      const prompt = `
        Analyze this historical process execution data to predict potential failures:
        ${JSON.stringify(historicalData.slice(-50), null, 2)}
        
        Provide:
        1. Overall risk score (0-100)
        2. Failure probability percentage
        3. Critical risk factors
        4. Prevention strategies
        
        Return as JSON.
      `

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a predictive analytics expert specializing in business process risk assessment and failure prevention."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 1200
      })

      const prediction = JSON.parse(response.choices[0].message.content || '{}')
      
      return {
        riskScore: prediction.riskScore || 25,
        failureProbability: prediction.failureProbability || 15,
        criticalFactors: prediction.criticalFactors || [],
        preventionStrategies: prediction.preventionStrategies || []
      }
    } catch (error) {
      console.error('Prediction Error:', error)
      return {
        riskScore: 25,
        failureProbability: 15,
        criticalFactors: ['Analysis unavailable'],
        preventionStrategies: ['Monitor process manually']
      }
    }
  }

  async generateCustomWorkflow(requirements: string): Promise<{
    workflow: any
    estimatedEfficiency: number
    implementationSteps: string[]
  }> {
    try {
      const prompt = `
        Create a custom workflow based on these requirements:
        ${requirements}
        
        Generate:
        1. Complete workflow structure with steps
        2. Estimated efficiency improvement
        3. Implementation steps
        
        Return as JSON with workflow, estimatedEfficiency, and implementationSteps.
      `

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a workflow automation expert who creates efficient, practical business process workflows."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 2000
      })

      const result = JSON.parse(response.choices[0].message.content || '{}')
      
      return {
        workflow: result.workflow || {},
        estimatedEfficiency: result.estimatedEfficiency || 30,
        implementationSteps: result.implementationSteps || []
      }
    } catch (error) {
      console.error('Workflow Generation Error:', error)
      return {
        workflow: {},
        estimatedEfficiency: 0,
        implementationSteps: ['Manual workflow creation required']
      }
    }
  }
}