import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'
import { TeamMembersList } from '@/components/dashboard/team-members-list'
import { InviteUserDialog } from '@/components/dashboard/invite-user-dialog'
import { TeamSettings } from '@/components/dashboard/team-settings'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'

async function getTeamMembers(orgId: string) {
  return await prisma.user.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function TeamPage() {
  const { orgId } = auth()
  if (!orgId) throw new Error('No organization found')

  const teamMembers = await getTeamMembers(orgId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Team Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage team members, roles, and permissions
          </p>
        </div>
        
        <InviteUserDialog>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </InviteUserDialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TeamMembersList members={teamMembers} />
        </div>
        <div>
          <TeamSettings />
        </div>
      </div>
    </div>
  )
}