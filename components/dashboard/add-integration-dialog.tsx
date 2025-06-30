'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { createIntegration } from '@/lib/actions/integration-actions'

interface AddIntegrationDialogProps {
  children: React.ReactNode
}

const integrationTypes = [
  { value: 'SLACK', label: 'Slack' },
  { value: 'TEAMS', label: 'Microsoft Teams' },
  { value: 'ASANA', label: 'Asana' },
  { value: 'TRELLO', label: 'Trello' },
  { value: 'SALESFORCE', label: 'Salesforce' },
  { value: 'HUBSPOT', label: 'HubSpot' },
]

export function AddIntegrationDialog({ children }: AddIntegrationDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    try {
      const data = {
        name: formData.get('name') as string,
        type: formData.get('type') as any,
        config: {
          apiKey: formData.get('apiKey') as string,
          webhookUrl: formData.get('webhookUrl') as string,
        }
      }
      
      await createIntegration(data)
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Failed to create integration:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Integration</DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Integration Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Main Slack Workspace"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Integration Type</Label>
            <Select name="type" required>
              <SelectTrigger>
                <SelectValue placeholder="Select integration type" />
              </SelectTrigger>
              <SelectContent>
                {integrationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              name="apiKey"
              type="password"
              placeholder="Enter API key or token"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook URL (Optional)</Label>
            <Input
              id="webhookUrl"
              name="webhookUrl"
              placeholder="https://hooks.slack.com/..."
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Integration'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}