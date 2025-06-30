'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  GitBranch,
  BarChart3,
  Settings,
  Users,
  Zap,
  MessageSquare,
  FileText,
  ChevronLeft,
  ChevronRight,
  Brain,
  CreditCard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { OrganizationSwitcher } from './organization-switcher'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Processes', href: '/dashboard/processes', icon: GitBranch },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Integrations', href: '/dashboard/integrations', icon: Zap },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              FlowMind
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="p-2"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {!collapsed && (
        <div className="px-4 mb-4">
          <OrganizationSwitcher />
        </div>
      )}

      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                )}
              >
                <item.icon className={cn("flex-shrink-0", collapsed ? "w-5 h-5" : "w-5 h-5 mr-3")} />
                {!collapsed && item.name}
              </Link>
            )
          })}
        </div>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            FlowMind v1.0.0
          </div>
        </div>
      )}
    </div>
  )
}