import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Shield, Eye, Crown } from 'lucide-react'

const roles = [
  {
    name: 'Organization Admin',
    key: 'ORG_ADMIN',
    icon: Crown,
    description: 'Full access to all features and settings',
    permissions: ['Manage billing', 'Invite/remove members', 'Manage all processes', 'Organization settings'],
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
  },
  {
    name: 'Manager',
    key: 'MANAGER',
    icon: Shield,
    description: 'Can manage team members and processes',
    permissions: ['Invite members', 'Manage processes', 'View analytics', 'Team settings'],
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
  },
  {
    name: 'User',
    key: 'USER',
    icon: Users,
    description: 'Can create and manage their own processes',
    permissions: ['Create processes', 'Execute processes', 'View own analytics', 'Comment on processes'],
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
  },
  {
    name: 'Viewer',
    key: 'VIEWER',
    icon: Eye,
    description: 'Read-only access to processes and reports',
    permissions: ['View processes', 'View analytics', 'Export reports'],
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
  }
]

export function TeamSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Permissions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {roles.map((role) => (
          <div key={role.key} className="p-4 border rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <role.icon className="w-5 h-5" />
              <div>
                <h4 className="font-medium">{role.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {role.description}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Permissions:</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full">
          Customize Role Permissions
        </Button>
      </CardContent>
    </Card>
  )
}