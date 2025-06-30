import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'
import { BillingOverview } from '@/components/dashboard/billing-overview'
import { PlanComparison } from '@/components/dashboard/plan-comparison'
import { UsageMeter } from '@/components/subscription/usage-meter'
import { BillingHistory } from '@/components/dashboard/billing-history'
import { getCurrentSubscription } from '@/lib/actions/stripe-actions'

async function getBillingData() {
  const { userId, orgId } = auth()
  if (!userId || !orgId) throw new Error('Unauthorized')

  const organization = await prisma.organization.findUnique({
    where: { id: orgId },
    include: {
      users: { select: { id: true, role: true } },
      processes: { select: { id: true } },
      integrations: { select: { id: true } }
    }
  })

  if (!organization) throw new Error('Organization not found')

  // Get current usage
  const usage = {
    users: organization.users.length,
    processes: organization.processes.length,
    integrations: organization.integrations.length,
    executions: await prisma.execution.count({
      where: {
        process: { organizationId: orgId },
        startedAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    })
  }

  // Get subscription details
  const subscription = await getCurrentSubscription()

  return {
    organization,
    usage,
    subscription,
    billingCycle: 'monthly',
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    amount: organization.plan === 'STARTER' ? 99 : organization.plan === 'PROFESSIONAL' ? 299 : 999
  }
}

export default async function BillingPage() {
  const billingData = await getBillingData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Billing & Subscription
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your subscription and view usage metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BillingOverview billingInfo={billingData} />
          <UsageMeter 
            currentPlan={billingData.organization.plan as any} 
            usage={billingData.usage} 
          />
          <BillingHistory />
        </div>
        <div>
          <PlanComparison currentPlan={billingData.organization.plan as any} />
        </div>
      </div>
    </div>
  )
}