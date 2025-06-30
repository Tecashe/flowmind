'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useOrganizationList, useOrganization } from '@clerk/nextjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, ChevronDown, Plus, Check, Crown } from 'lucide-react'

export function OrganizationSwitcher() {
  const { organization } = useOrganization()
  const { organizationList, setActive } = useOrganizationList()
  const { isLoaded } = useAuth()
  const router = useRouter()
  const [switching, setSwitching] = useState(false)

  const handleSwitchOrganization = async (orgId: string) => {
    if (!setActive) return
    
    setSwitching(true)
    try {
      await setActive({ organization: orgId })
      router.refresh()
    } catch (error) {
      console.error('Failed to switch organization:', error)
    } finally {
      setSwitching(false)
    }
  }

  const handleCreateOrganization = () => {
    router.push('/onboarding')
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 animate-pulse">
        <div className="w-4 h-4 bg-gray-300 rounded" />
        <div className="w-24 h-4 bg-gray-300 rounded" />
      </div>
    )
  }

  if (!organization) {
    return (
      <Button onClick={handleCreateOrganization} variant="outline" size="sm">
        <Plus className="w-4 h-4 mr-2" />
        Create Organization
      </Button>
    )
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'ENTERPRISE':
        return <Crown className="w-3 h-3 text-yellow-500" />
      default:
        return null
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'ENTERPRISE':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'PROFESSIONAL':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between" disabled={switching}>
          <div className="flex items-center space-x-2 min-w-0">
            <Building2 className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{organization.name}</span>
            <Badge variant="secondary" className={`text-xs flex-shrink-0 ${getPlanColor('STARTER')}`}>
              <div className="flex items-center space-x-1">
                {getPlanIcon('STARTER')}
                <span>STARTER</span>
              </div>
            </Badge>
          </div>
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {organizationList?.map((org) => (
          <DropdownMenuItem
            key={org.organization.id}
            onClick={() => handleSwitchOrganization(org.organization.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-2 min-w-0">
              <Building2 className="w-4 h-4 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium truncate">{org.organization.name}</p>
                <p className="text-xs text-gray-500 truncate">{org.organization.slug}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Badge variant="outline" className={`text-xs ${getPlanColor('STARTER')}`}>
                STARTER
              </Badge>
              {organization.id === org.organization.id && (
                <Check className="w-4 h-4 text-green-500" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCreateOrganization}>
          <Plus className="w-4 h-4 mr-2" />
          Create Organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}