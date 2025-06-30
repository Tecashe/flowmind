'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AlertTriangle, Trash2 } from 'lucide-react'

export function DangerZone() {
  const [deleteConfirm, setDeleteConfirm] = useState('')

  const handleDeleteOrganization = () => {
    // Handle organization deletion
    console.log('Deleting organization...')
  }

  return (
    <Card className="border-red-200 dark:border-red-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          <span>Danger Zone</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
            Delete Organization
          </h4>
          <p className="text-sm text-red-700 dark:text-red-300 mb-4">
            This action cannot be undone. This will permanently delete your organization, 
            all processes, data, and remove all team members.
          </p>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Organization
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your organization
                  and remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteOrganization}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Yes, delete organization
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}