import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Bell } from 'lucide-react'

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span>Notification Preferences</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium mb-4">Email Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Process Completions</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified when processes complete
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Process Failures</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified when processes fail
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive weekly performance summaries
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">In-App Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Team Activity</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified about team member actions
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Updates</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified about system maintenance
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}