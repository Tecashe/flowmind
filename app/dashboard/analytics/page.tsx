import { getDashboardStats } from '@/lib/actions/analytics-actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts'
import { ProcessPerformanceTable } from '@/components/dashboard/process-performance-table'

export default async function AnalyticsPage() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics & Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Deep dive into your process performance and optimization opportunities
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Process Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">94.2%</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Average success rate across all processes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Time Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">247h</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This month through automation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cost Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">$12,400</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Estimated monthly savings
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCharts />
        <ProcessPerformanceTable />
      </div>
    </div>
  )
}