import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Execution {
  id: string
  status: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  process: {
    name: string
  }
}

interface RecentActivityProps {
  activities: Execution[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'FAILED':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'RUNNING':
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'FAILED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
      case 'RUNNING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No recent activity to show
            </p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(activity.status)}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.process.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.duration 
                        ? `Completed in ${Math.round(activity.duration / 1000)}s`
                        : 'In progress'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(activity.startedAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}