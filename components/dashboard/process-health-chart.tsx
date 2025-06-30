'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const performanceData = [
  { name: 'Mon', executions: 45, success: 42 },
  { name: 'Tue', executions: 52, success: 50 },
  { name: 'Wed', executions: 48, success: 46 },
  { name: 'Thu', executions: 61, success: 58 },
  { name: 'Fri', executions: 55, success: 53 },
  { name: 'Sat', executions: 32, success: 31 },
  { name: 'Sun', executions: 28, success: 27 },
]

const statusData = [
  { name: 'Completed', value: 847, color: '#10B981' },
  { name: 'Failed', value: 53, color: '#EF4444' },
  { name: 'Running', value: 12, color: '#3B82F6' },
  { name: 'Pending', value: 8, color: '#F59E0B' },
]

export function ProcessHealthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Process Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Weekly Execution Trends
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="executions" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Total Executions"
                />
                <Line 
                  type="monotone" 
                  dataKey="success" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Successful"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Execution Status Distribution
            </h4>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="60%" height={150}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}