import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CheckCircle, Clock, TrendingUp } from 'lucide-react'

interface StatsCardsProps {
  stats: {
    totalProcesses: number
    activeProcesses: number
    totalExecutions: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Processes',
      value: stats.totalProcesses,
      icon: Activity,
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Active Processes',
      value: stats.activeProcesses,
      icon: CheckCircle,
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: 'Total Executions',
      value: stats.totalExecutions,
      icon: Clock,
      change: '+23%',
      changeType: 'positive' as const
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      icon: TrendingUp,
      change: '+2.1%',
      changeType: 'positive' as const
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {card.value}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              <span className={`${
                card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.change}
              </span>
              {' '}from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}