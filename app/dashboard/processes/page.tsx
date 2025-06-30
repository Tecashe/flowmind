import { getProcesses } from '@/lib/actions/process-actions'
import { ProcessList } from '@/components/dashboard/process-list'
import { CreateProcessDialog } from '@/components/dashboard/create-process-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function ProcessesPage() {
  const processes = await getProcesses()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Business Processes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and monitor your organization's processes
          </p>
        </div>
        
        <CreateProcessDialog>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Process
          </Button>
        </CreateProcessDialog>
      </div>
      
      <ProcessList processes={processes} />
    </div>
  )
}