'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Play, Pause, Archive } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { executeProcess, updateProcess } from '@/lib/actions/process-actions'

interface Process {
  id: string
  name: string
  description: string | null
  status: string
  priority: string
  owner: {
    firstName: string | null
    lastName: string | null
    email: string
  }
  _count: {
    executions: number
    comments: number
  }
  createdAt: Date
}

interface ProcessListProps {
  processes: Process[]
}

export function ProcessList({ processes }: ProcessListProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleExecute = async (processId: string) => {
    setLoading(processId)
    try {
      await executeProcess(processId)
    } catch (error) {
      console.error('Failed to execute process:', error)
    } finally {
      setLoading(null)
    }
  }

  const handleStatusChange = async (processId: string, status: string) => {
    try {
      await updateProcess(processId, { status: status as any })
    } catch (error) {
      console.error('Failed to update process:', error)
    }
  }

  if (processes.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No processes found. Create your first process to get started.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {processes.map((process) => (
        <Card key={process.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CardTitle className="text-lg">{process.name}</CardTitle>
                <Badge variant={
                  process.status === 'ACTIVE' ? 'default' :
                  process.status === 'DRAFT' ? 'secondary' :
                  process.status === 'PAUSED' ? 'outline' : 'destructive'
                }>
                  {process.status}
                </Badge>
                <Badge variant="outline">
                  {process.priority}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleExecute(process.id)}
                  disabled={loading === process.id || process.status !== 'ACTIVE'}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="w-4 h-4 mr-1" />
                  {loading === process.id ? 'Running...' : 'Execute'}
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleStatusChange(process.id, 'PAUSED')}>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(process.id, 'ARCHIVED')}>
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {process.description || 'No description provided'}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <span>Owner: {process.owner.firstName} {process.owner.lastName}</span>
                <span>Executions: {process._count.executions}</span>
                <span>Comments: {process._count.comments}</span>
              </div>
              <span>Created: {new Date(process.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}