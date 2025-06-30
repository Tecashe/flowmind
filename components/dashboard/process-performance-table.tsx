import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const processData = [
  {
    name: 'Customer Onboarding',
    executions: 156,
    successRate: 94.2,
    avgDuration: '4.2m',
    trend: 'up',
    improvement: '+2.3%'
  },
  {
    name: 'Order Processing',
    executions: 234,
    successRate: 97.8,
    avgDuration: '2.1m',
    trend: 'up',
    improvement: '+5.1%'
  },
  {
    name: 'Support Ticket Resolution',
    executions: 89,
    successRate: 91.0,
    avgDuration: '12.4m',
    trend: 'down',
    improvement: '-1.2%'
  },
  {
    name: 'Invoice Generation',
    executions: 67,
    successRate: 99.1,
    avgDuration: '1.8m',
    trend: 'stable',
    improvement: '0.0%'
  },
  {
    name: 'Employee Onboarding',
    executions: 23,
    successRate: 87.5,
    avgDuration: '45.2m',
    trend: 'up',
    improvement: '+8.7%'
  }
]

export function ProcessPerformanceTable() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Process Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {processData.map((process, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {process.name}
                </h4>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <span>{process.executions} executions</span>
                  <span>{process.successRate}% success</span>
                  <span>{process.avgDuration} avg</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(process.trend)}
                <span className={`text-sm font-medium ${getTrendColor(process.trend)}`}>
                  {process.improvement}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}