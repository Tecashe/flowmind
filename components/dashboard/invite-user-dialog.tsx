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
import { inviteUserToOrganization } from '@/lib/actions/organization-actions'

interface InviteUserDialogProps {
  children: React.ReactNode
}

export function InviteUserDialog({ children }: InviteUserDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    try {
      const email = formData.get('email') as string
      const role = formData.get('role') as 'MANAGER' | 'USER' | 'VIEWER'
      
      await inviteUserToOrganization(email, role)
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Failed to invite user:', error)
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
          <DialogTitle>Invite Team Member</DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="colleague@company.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select name="role" defaultValue="USER">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VIEWER">Viewer - Can view processes and reports</SelectItem>
                <SelectItem value="USER">User - Can create and manage processes</SelectItem>
                <SelectItem value="MANAGER">Manager - Can manage team and settings</SelectItem>
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
              {loading ? 'Sending...' : 'Send Invitation'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}