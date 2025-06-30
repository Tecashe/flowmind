'use client'

import { UserButton } from '@clerk/nextjs'
import { Bell, Search, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search processes, executions, or integrations..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4">
                <h3 className="font-semibold mb-2">Recent Notifications</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="text-sm">Process "Customer Onboarding" completed successfully</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                  <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <p className="text-sm">Process "Order Processing" is taking longer than usual</p>
                    <p className="text-xs text-gray-500">5 minutes ago</p>
                  </div>
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <p className="text-sm">New integration with Slack activated</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}