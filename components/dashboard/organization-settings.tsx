'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Building2 } from 'lucide-react'

interface OrganizationSettingsProps {
  organization: {
    id: string
    name: string
    slug: string
    domain: string | null
  }
}

export function OrganizationSettings({ organization }: OrganizationSettingsProps) {
  const [formData, setFormData] = useState({
    name: organization.name,
    slug: organization.slug,
    domain: organization.domain || '',
    description: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle organization update
    console.log('Updating organization:', formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="w-5 h-5" />
          <span>Organization Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization Name</Label>
            <Input
              id="orgName"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="orgSlug">Organization Slug</Label>
            <Input
              id="orgSlug"
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
            />
            <p className="text-sm text-gray-500">
              flowmind.ai/{formData.slug}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="orgDomain">Company Domain</Label>
            <Input
              id="orgDomain"
              value={formData.domain}
              onChange={(e) => setFormData({...formData, domain: e.target.value})}
              placeholder="company.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="orgDescription">Description</Label>
            <Textarea
              id="orgDescription"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Tell us about your organization..."
              rows={3}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}