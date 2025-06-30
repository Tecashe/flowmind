import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Users, GitBranch, Zap, Activity } from 'lucide-react'

interface UsageMetricsProps {
  usage: {
    users: number
    processes: number
    integrations: number
    executions: number
  }
  limits: {
    users: number
    processes: number
    integrations: number
    executions: number
  }
}

export function UsageMetrics({ usage, limits }: UsageMetricsProps) {
  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0 // Unlimited
    return Math.min((used / limit) * 100, 100)
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600'
    if (percentage >= 75) return 'text-yellow-600'
    return 'text-green-600'
  }

  const metrics = [
    {
      name: 'Team Members',
      icon: Users,
      used: usage.users,
      limit: limits.users,
      color: 'blue'
    },
    {
      name: 'Processes',
      icon: GitBranch,
      used: usage.processes,
      limit: limits.processes,
      color: 'green'
    },
    {
      name: 'Integrations',
      icon: Zap,
      used: usage.integrations,
      limit: limits.integrations,
      color: 'purple'
    },
    {
      name: 'Monthly Executions',
      icon: Activity,
      used: usage.executions,
      limit: limits.executions,
      color: 'orange'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, index) => {
          const percentage = getUsagePercentage(metric.used, metric.limit)
          const isUnlimited = metric.limit === -1

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <metric.icon className="w-4 h-4" />
                  <span className="font-medium">{metric.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {isUnlimited ? (
                    <Badge variant="outline">Unlimited</Badge>
                  ) : (
                    <span className={`text-sm font-medium ${getUsageColor(percentage)}`}>
                      {metric.used} / {metric.limit}
                    </span>
                  )}
                </div>
              </div>
              {!isUnlimited && (
                <Progress 
                  value={percentage} 
                  className="h-2"
                />
              )}
              {percentage >= 90 && !isUnlimited && (
                <p className="text-sm text-red-600">
                  You're approaching your {metric.name.toLowerCase()} limit. Consider upgrading your plan.
                </p>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}