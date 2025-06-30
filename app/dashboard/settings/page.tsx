import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'
import { OrganizationSettings } from '@/components/dashboard/organization-settings'
import { SecuritySettings } from '@/components/dashboard/security-settings'
import { NotificationSettings } from '@/components/dashboard/notification-settings'
import { DangerZone } from '@/components/dashboard/danger-zone'

async function getOrganization(orgId: string) {
  return await prisma.organization.findUnique({
    where: { id: orgId },
    include: {
      users: {
        select: { id: true, role: true, email: true }
      }
    }
  })
}

export default async function SettingsPage() {
  const { orgId } = auth()
  if (!orgId) throw new Error('No organization found')

  const organization = await getOrganization(orgId)
  if (!organization) throw new Error('Organization not found')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Organization Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your organization's configuration and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <OrganizationSettings organization={organization} />
          <SecuritySettings />
        </div>
        <div className="space-y-6">
          <NotificationSettings />
          <DangerZone />
        </div>
      </div>
    </div>
  )
}