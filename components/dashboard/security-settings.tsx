import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Shield, Key, AlertTriangle } from 'lucide-react'

export function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Security Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Two-Factor Authentication</Label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Single Sign-On (SSO)</Label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enable SSO for your organization
            </p>
          </div>
          <Switch />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Session Timeout</Label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automatically log out inactive users
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full">
            <Key className="w-4 h-4 mr-2" />
            Manage API Keys
          </Button>
        </div>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Security Recommendation
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Enable two-factor authentication to secure your account.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}