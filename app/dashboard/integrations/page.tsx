import { getIntegrations } from '@/lib/actions/integration-actions'
import { IntegrationGrid } from '@/components/dashboard/integration-grid'
import { AddIntegrationDialog } from '@/components/dashboard/add-integration-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function IntegrationsPage() {
  const integrations = await getIntegrations()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Integrations
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Connect FlowMind with your existing tools and services
          </p>
        </div>
        
        <AddIntegrationDialog>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </AddIntegrationDialog>
      </div>
      
      <IntegrationGrid integrations={integrations} />
    </div>
  )
}