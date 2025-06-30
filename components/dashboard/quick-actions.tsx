'use client'

import { Button } from '@/components/ui/button'
import { Plus, Play, BarChart3, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function QuickActions() {
  const router = useRouter()

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push('/dashboard/analytics')}
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        View Analytics
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push('/dashboard/processes')}
      >
        <Play className="w-4 h-4 mr-2" />
        Run Process
      </Button>
      <Button
        size="sm"
        onClick={() => router.push('/dashboard/processes')}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Plus className="w-4 h-4 mr-2" />
        New Process
      </Button>
    </div>
  )
}