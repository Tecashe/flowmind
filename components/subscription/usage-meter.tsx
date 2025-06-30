'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, TrendingUp } from 'lucide-react'
import { STRIPE_PLANS } from '@/lib/stripe/stripe-client'
import { createCheckoutSession } from '@/lib/actions/stripe-actions'

interface UsageMeterProps {
  currentPlan: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
  usage: {
    users: number
    processes: number
    integrations: number
    executions: number
  }
}

export function UsageMeter({ currentPlan, usage }: UsageMeterProps) {
  const [usagePercentages, setUsagePercentages] = useState({
    users: 0,
    processes: 0,
    integrations: 0,
    executions: 0
  })

  useEffect(() => {
    const limits = STRIPE_PLANS[currentPlan].features
    
    setUsagePercentages({
      users: limits.users === -1 ? 0 : Math.min((usage.users / limits.users) * 100, 100),
      processes: limits.processes === -1 ? 0 : Math.min((usage.processes / limits.processes) * 100, 100),
      integrations: limits.integrations === -1 ? 0 : Math.min((usage.integrations / limits.integrations) * 100, 100),
      executions: limits.executions === -1 ? 0 : Math.min((usage.executions / limits.executions) * 100, 100)
    })
  }, [currentPlan, usage])

  const limits = STRIPE_PLANS[currentPlan].features
  const isNearLimit = Object.values(usagePercentages).some(percentage => percentage > 80)
  const isAtLimit = Object.values(usagePercentages).some(percentage => percentage >= 100)

  return (
    <Card className={`${isAtLimit ? 'border-red-500' : isNearLimit ? 'border-yellow-500' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Usage Overview</span>
          <Badge variant={currentPlan === 'ENTERPRISE' ? 'default' : 'secondary'}>
            {currentPlan}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Users */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Team Members</span>
            <span className="font-medium">
              {usage.users} / {limits.users === -1 ? '∞' : limits.users}
            </span>
          </div>
          {limits.users !== -1 && (
            <Progress value={usagePercentages.users} className="h-2" />
          )}
        </div>

        {/* Processes */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Active Processes</span>
            <span className="font-medium">
              {usage.processes} / {limits.processes === -1 ? '∞' : limits.processes}
            </span>
          </div>
          {limits.processes !== -1 && (
            <Progress value={usagePercentages.processes} className="h-2" />
          )}
        </div>

        {/* Integrations */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Integrations</span>
            <span className="font-medium">
              {usage.integrations} / {limits.integrations === -1 ? '∞' : limits.integrations}
            </span>
          </div>
          {limits.integrations !== -1 && (
            <Progress value={usagePercentages.integrations} className="h-2" />
          )}
        </div>

        {/* Monthly Executions */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Monthly Executions</span>
            <span className="font-medium">
              {usage.executions.toLocaleString()} / {limits.executions === -1 ? '∞' : limits.executions.toLocaleString()}
            </span>
          </div>
          {limits.executions !== -1 && (
            <Progress value={usagePercentages.executions} className="h-2" />
          )}
        </div>

        {/* Upgrade Prompts */}
        {isAtLimit && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-red-800">Usage Limit Reached</h4>
                <p className="text-sm text-red-700 mt-1">
                  You've reached your plan limits. Upgrade to continue using all features.
                </p>
                <div className="mt-3 flex gap-2">
                  {currentPlan === 'STARTER' && (
                    <Button 
                      size="sm" 
                      onClick={() => createCheckoutSession('PROFESSIONAL')}
                    >
                      Upgrade to Professional
                    </Button>
                  )}
                  {currentPlan === 'PROFESSIONAL' && (
                    <Button 
                      size="sm" 
                      onClick={() => createCheckoutSession('ENTERPRISE')}
                    >
                      Upgrade to Enterprise
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {isNearLimit && !isAtLimit && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-yellow-800">Approaching Limits</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  You're using over 80% of your plan limits. Consider upgrading soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentPlan !== 'ENTERPRISE' && !isAtLimit && !isNearLimit && (
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">
              Need more capacity? Upgrade for unlimited features.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => createCheckoutSession(currentPlan === 'STARTER' ? 'PROFESSIONAL' : 'ENTERPRISE')}
            >
              View Upgrade Options
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}