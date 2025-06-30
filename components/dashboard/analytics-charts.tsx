'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const monthlyData = [
  { month: 'Jan', processes: 24, executions: 456, savings: 12400 },
  { month: 'Feb', processes: 28, executions: 523, savings: 15200 },
  { month: 'Mar', processes: 32, executions: 612, savings: 18900 },
  { month: 'Apr', processes: 35, executions: 687, savings: 21300 },
  { month: 'May', processes: 38, executions: 734, savings: 23800 },
  { month: 'Jun', processes: 42, executions: 821, savings: 26500 },
]

const efficiencyData = [
  { week: 'Week 1', efficiency: 87, target: 90 },
  { week: 'Week 2', efficiency: 91, target: 90 },
  { week: 'Week 3', efficiency: 89, target: 90 },
  { week: 'Week 4', efficiency: 94, target: 90 },
]

export function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Growth Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="executions" 
                stackId="1"
                stroke="#3B82F6" 
                fill="#3B82F6"
                fillOpacity={0.6}
                name="Executions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Process Efficiency vs Target</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="efficiency" fill="#10B981" name="Actual Efficiency" />
              <Bar dataKey="target" fill="#F59E0B" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}