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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { createProcess } from '@/lib/actions/process-actions'

interface CreateProcessDialogProps {
  children: React.ReactNode
}

export function CreateProcessDialog({ children }: CreateProcessDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    try {
      const data = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        priority: formData.get('priority') as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
      }
      
      await createProcess(data)
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Failed to create process:', error)
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
          <DialogTitle>Create New Process</DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Process Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Customer Onboarding"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe what this process does..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="e.g., Sales, Support, HR"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select name="priority" defaultValue="MEDIUM">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>
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
              {loading ? 'Creating...' : 'Create Process'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}