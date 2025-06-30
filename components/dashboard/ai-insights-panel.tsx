'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { FeatureGate } from '@/components/subscription/feature-gate'
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target,
  Zap,
  Shield,
  Clock
} from 'lucide-react'

interface AIInsightsPanelProps {
  currentPlan: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
  processData?: any
}

export function AIInsightsPanel({ currentPlan, processData }: AIInsightsPanelProps) {
  const [insights, setInsights] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const generateInsights = async () => {
    setLoading(true)
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setInsights({
        efficiencyScore: 87,
        riskScore: 23,
        recommendations: [
          'Automate approval step to reduce 40% processing time',
          'Implement parallel processing for data validation',
          'Add automated notifications to reduce manual follow-ups'
        ],
        predictedImprovements: {
          timeReduction: 35,
          costSavings: 12400,
          riskMitigation: 60
        },
        bottlenecks: [
          'Manual approval process (avg 2.3 days)',
          'Data validation queue (avg 45 minutes)',
          'Cross-department communication delays'
        ]
      })
    } catch (error) {
      console.error('Failed to generate insights:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FeatureGate 
      feature="aiInsights" 
      currentPlan={currentPlan}
      fallback={
        <Card className="border-dashed border-2 border-gray-300">
          <CardHeader className="text-center">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <CardTitle className="text-gray-600">AI Insights</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Unlock powerful AI-driven process insights and optimization recommendations.
            </p>
            <Badge variant="outline">Available in Professional & Enterprise</Badge>
          </CardContent>
        </Card>
      }
    >
      <Card className="glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span>AI Process Intelligence</span>
            <Badge variant="default" className="ml-auto">
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!insights ? (
            <div className="text-center py-8">
              <Button 
                onClick={generateInsights} 
                disabled={loading}
                className="glow"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Analyzing Process...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Generate AI Insights
                  </>
                )}
              </Button>
            </div>
          ) : (
            <>
              {/* Efficiency Score */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-500">{insights.efficiencyScore}%</div>
                  <div className="text-sm text-muted-foreground">Efficiency Score</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg">
                  <Shield className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-500">{insights.riskScore}%</div>
                  <div className="text-sm text-muted-foreground">Risk Score</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-500">{insights.predictedImprovements.timeReduction}%</div>
                  <div className="text-sm text-muted-foreground">Time Savings</div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                  AI Recommendations
                </h4>
                <div className="space-y-2">
                  {insights.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start space-x-3">
                        <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span className="text-sm">{rec}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottlenecks */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                  Identified Bottlenecks
                </h4>
                <div className="space-y-2">
                  {insights.bottlenecks.map((bottleneck: string, index: number) => (
                    <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <span className="text-sm">{bottleneck}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Predicted Impact */}
              <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <h4 className="font-semibold mb-3">Predicted Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">
                      ${insights.predictedImprovements.costSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly Savings</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-500">
                      {insights.predictedImprovements.timeReduction}%
                    </div>
                    <div className="text-sm text-muted-foreground">Time Reduction</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-500">
                      {insights.predictedImprovements.riskMitigation}%
                    </div>
                    <div className="text-sm text-muted-foreground">Risk Reduction</div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={generateInsights} 
                variant="outline" 
                className="w-full"
                disabled={loading}
              >
                <Brain className="h-4 w-4 mr-2" />
                Refresh Analysis
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </FeatureGate>
  )
}