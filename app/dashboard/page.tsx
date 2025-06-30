import { auth } from '@clerk/nextjs'
import { getDashboardStats } from '@/lib/actions/analytics-actions'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { ProcessHealthChart } from '@/components/dashboard/process-health-chart'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { AIInsightsPanel } from '@/components/dashboard/ai-insights-panel'
import { AdvancedFeaturesShowcase } from '@/components/dashboard/advanced-features-showcase'
import { prisma } from '@/lib/db'

async function getCurrentPlan() {
  const { orgId } = auth()
  if (!orgId) return 'STARTER'
  
  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    select: { plan: true }
  })
  
  return org?.plan || 'STARTER'
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()
  const currentPlan = await getCurrentPlan()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <QuickActions />
      </div>
      
      <StatsCards stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProcessHealthChart />
        <RecentActivity activities={stats.recentExecutions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIInsightsPanel currentPlan={currentPlan as any} />
        <AdvancedFeaturesShowcase currentPlan={currentPlan as any} />
      </div>
    </div>
  )
}