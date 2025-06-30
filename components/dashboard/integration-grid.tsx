'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Settings, Zap } from 'lucide-react'
import { toggleIntegration } from '@/lib/actions/integration-actions'

interface Integration {
  id: string
  name: string
  type: string
  status: string
  createdAt: Date
}

interface IntegrationGridProps {
  integrations: Integration[]
}

const integrationIcons: Record<string, string> = {
  SLACK: '💬',
  TEAMS: '👥',
  ASANA: '📋',
  TRELLO: '📌',
  SALESFORCE: '☁️',
  HUBSPOT: '🎯',
  ZENDESK: '🎧',
  GITHUB: '🐙',
  JIRA: '🎫'
}

export function IntegrationGrid({ integrations }: IntegrationGridProps) {
  const handleToggle = async (id: string) => {
    try {
      await toggleIntegration(id)
    } catch (error) {
      console.error('Failed to toggle integration:', error)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => (
        <Card key={integration.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {integrationIcons[integration.type] || '🔗'}
                </div>
                <div>
                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {integration.type}
                  </p>
                </div>
              </div>
              <Badge variant={integration.status === 'ACTIVE' ? 'default' : 'secondary'}>
                {integration.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={integration.status === 'ACTIVE'}
                  onCheckedChange={() => handleToggle(integration.id)}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {integration.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                </span>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Connected {new Date(integration.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
      
      {integrations.length === 0 && (
        <Card className="col-span-full">
          <CardContent className="p-6 text-center">
            <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No integrations configured yet. Add your first integration to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}