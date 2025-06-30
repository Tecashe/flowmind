'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Building2, Users, Zap } from 'lucide-react'
import { createOrganization } from '@/lib/actions/organization-actions'

const steps = [
  { id: 1, name: 'Organization', icon: Building2 },
  { id: 2, name: 'Team Setup', icon: Users },
  { id: 3, name: 'First Process', icon: Zap },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orgData, setOrgData] = useState({
    name: '',
    slug: '',
    domain: '',
    description: ''
  })
  const router = useRouter()

  const handleCreateOrganization = async () => {
    setLoading(true)
    try {
      await createOrganization({
        name: orgData.name,
        slug: orgData.slug,
        domain: orgData.domain
      })
      setCurrentStep(2)
    } catch (error) {
      console.error('Failed to create organization:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFinishOnboarding = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {currentStep === 1 && 'Create Your Organization'}
              {currentStep === 2 && 'Set Up Your Team'}
              {currentStep === 3 && 'Create Your First Process'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    value={orgData.name}
                    onChange={(e) => setOrgData({...orgData, name: e.target.value})}
                    placeholder="Acme Corporation"
                  />
                </div>
                <div>
                  <Label htmlFor="orgSlug">Organization Slug</Label>
                  <Input
                    id="orgSlug"
                    value={orgData.slug}
                    onChange={(e) => setOrgData({...orgData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                    placeholder="acme-corp"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This will be used in your organization URL: flowmind.ai/{orgData.slug}
                  </p>
                </div>
                <div>
                  <Label htmlFor="orgDomain">Company Domain (Optional)</Label>
                  <Input
                    id="orgDomain"
                    value={orgData.domain}
                    onChange={(e) => setOrgData({...orgData, domain: e.target.value})}
                    placeholder="acme.com"
                  />
                </div>
                <div>
                  <Label htmlFor="orgDescription">Description</Label>
                  <Textarea
                    id="orgDescription"
                    value={orgData.description}
                    onChange={(e) => setOrgData({...orgData, description: e.target.value})}
                    placeholder="Tell us about your organization..."
                    rows={3}
                  />
                </div>
                <Button 
                  onClick={handleCreateOrganization} 
                  disabled={!orgData.name || !orgData.slug || loading}
                  className="w-full"
                >
                  {loading ? 'Creating...' : 'Create Organization'}
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Invite Your Team</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You can invite team members now or skip this step and do it later.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <Badge variant="outline" className="mb-2">Starter Plan</Badge>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm text-gray-500">Team Members</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <Badge variant="outline" className="mb-2">Current</Badge>
                    <p className="text-2xl font-bold">10</p>
                    <p className="text-sm text-gray-500">Processes</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <Badge variant="outline" className="mb-2">Included</Badge>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-gray-500">Integrations</p>
                  </Card>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setCurrentStep(3)} className="flex-1">
                    Skip for Now
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} className="flex-1">
                    Invite Team Members
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">You're All Set!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your organization has been created successfully. You can now start creating and managing your business processes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Quick Start Guide</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Create your first process</li>
                      <li>• Set up integrations</li>
                      <li>• Invite team members</li>
                      <li>• Configure notifications</li>
                    </ul>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Need Help?</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Check our documentation</li>
                      <li>• Watch tutorial videos</li>
                      <li>• Contact support</li>
                      <li>• Join our community</li>
                    </ul>
                  </Card>
                </div>

                <Button onClick={handleFinishOnboarding} className="w-full">
                  Go to Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}