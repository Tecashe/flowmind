'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Shield, User, Eye, Crown } from 'lucide-react'

interface TeamMember {
  id: string
  clerkId: string
  email: string
  firstName: string | null
  lastName: string | null
  role: string
  createdAt: Date
}

interface TeamMembersListProps {
  members: TeamMember[]
}

const roleIcons = {
  ORG_ADMIN: Crown,
  MANAGER: Shield,
  USER: User,
  VIEWER: Eye
}

const roleColors = {
  ORG_ADMIN: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
  MANAGER: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  USER: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  VIEWER: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
}

export function TeamMembersList({ members }: TeamMembersListProps) {
  const getInitials = (firstName: string | null, lastName: string | null, email: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase()
    }
    return email.slice(0, 2).toUpperCase()
  }

  const getDisplayName = (firstName: string | null, lastName: string | null, email: string) => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    }
    return email
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members ({members.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => {
            const RoleIcon = roleIcons[member.role as keyof typeof roleIcons] || User
            
            return (
              <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(member.firstName, member.lastName, member.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {getDisplayName(member.firstName, member.lastName, member.email)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.email}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={roleColors[member.role as keyof typeof roleColors]}>
                    <RoleIcon className="w-3 h-3 mr-1" />
                    {member.role.replace('_', ' ')}
                  </Badge>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Change Role</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            )
          })}
          
          {members.length === 0 && (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No team members yet. Invite your first team member to get started.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}