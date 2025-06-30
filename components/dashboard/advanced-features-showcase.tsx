'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FeatureGate } from '@/components/subscription/feature-gate'
import { 
  Brain, 
  Zap, 
  Shield, 
  Crown, 
  Code, 
  Globe,
  Users,
  BarChart3,
  Settings,
  Workflow,
  Database,
  Lock
} from 'lucide-react'

interface AdvancedFeaturesShowcaseProps {
  currentPlan: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
}

export function AdvancedFeaturesShowcase({ currentPlan }: AdvancedFeaturesShowcaseProps) {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const professionalFeatures = [
    {
      icon: Brain,
      title: 'Advanced AI Insights',
      description: 'Deep learning algorithms analyze your processes for optimization opportunities',
      demo: 'ai-insights'
    },
    {
      icon: Code,
      title: 'API Access',
      description: 'Full REST API access for custom integrations and automation',
      demo: 'api-access'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Custom dashboards, predictive analytics, and detailed reporting',
      demo: 'analytics'
    },
    {
      icon: Shield,
      title: 'SSO Integration',
      description: 'Single Sign-On with SAML, OAuth, and enterprise identity providers',
      demo: 'sso'
    }
  ]

  const enterpriseFeatures = [
    {
      icon: Crown,
      title: 'White-Label Solution',
      description: 'Complete branding customization with your company identity',
      demo: 'white-label'
    },
    {
      icon: Database,
      title: 'Custom AI Models',
      description: 'Train AI models specifically for your industry and use cases',
      demo: 'custom-ai'
    },
    {
      icon: Globe,
      title: 'Multi-Region Deployment',
      description: 'Deploy in your preferred regions for compliance and performance',
      demo: 'multi-region'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: '24/7 dedicated support team with SLA guarantees',
      demo: 'support'
    }
  ]

  const renderDemo = (demoType: string) => {
    switch (demoType) {
      case 'ai-insights':
        return (
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-500" />
              AI Process Analysis Demo
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">94%</div>
                  <div className="text-sm text-muted-foreground">Efficiency Score</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">3.2x</div>
                  <div className="text-sm text-muted-foreground">Speed Improvement</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-purple-500">$47K</div>
                  <div className="text-sm text-muted-foreground">Monthly Savings</div>
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <h5 className="font-medium mb-2">AI Recommendations:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Automate approval workflow (saves 2.3 days)</li>
                  <li>• Implement parallel processing (40% faster)</li>
                  <li>• Add predictive alerts (prevent 89% of issues)</li>
                </ul>
              </div>
            </div>
          </div>
        )
      
      case 'api-access':
        return (
          <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center">
              <Code className="h-5 w-5 mr-2 text-green-500" />
              API Integration Example
            </h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div>curl -X POST https://api.flowmind.ai/v1/processes</div>
              <div>  -H "Authorization: Bearer YOUR_API_KEY"</div>
              <div>  -H "Content-Type: application/json"</div>
              <div>  -d '{`{`}</div>
              <div>    "name": "Custom Process",</div>
              <div>    "trigger": "webhook",</div>
              <div>    "actions": ["analyze", "optimize"]</div>
              <div>  {`}`}'</div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Full REST API with webhooks, real-time updates, and comprehensive documentation.
            </div>
          </div>
        )

      case 'white-label':
        return (
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center">
              <Crown className="h-5 w-5 mr-2 text-purple-500" />
              White-Label Customization
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-200">
                <div className="text-center mb-3">
                  <div className="w-8 h-8 bg-purple-500 rounded mx-auto mb-2 flex items-center justify-center text-white font-bold">
                    YC
                  </div>
                  <div className="font-semibold">YourCompany AI</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  • Custom domain: ai.yourcompany.com<br/>
                  • Your branding & colors<br/>
                  • Custom email templates<br/>
                  • Remove FlowMind branding
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <h5 className="font-medium mb-2">Customization Options:</h5>
                <ul className="text-sm space-y-1">
                  <li>✓ Logo & Brand Colors</li>
                  <li>✓ Custom Domain</li>
                  <li>✓ Email Templates</li>
                  <li>✓ UI Customization</li>
                  <li>✓ Custom Documentation</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
            <div className="text-muted-foreground">
              Click on a feature above to see a demo
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span>Advanced Features</span>
            <Badge variant="outline">Plan: {currentPlan}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="professional" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="professional">Professional Features</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise Features</TabsTrigger>
            </TabsList>
            
            <TabsContent value="professional" className="space-y-4">
              <FeatureGate 
                feature="aiInsights" 
                currentPlan={currentPlan}
                fallback={
                  <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Professional Features</h3>
                    <p className="text-muted-foreground mb-4">
                      Upgrade to Professional to unlock advanced AI insights, API access, and more.
                    </p>
                    <Button>Upgrade to Professional</Button>
                  </div>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {professionalFeatures.map((feature, index) => (
                    <Card 
                      key={index} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        activeDemo === feature.demo ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setActiveDemo(feature.demo)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <feature.icon className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {renderDemo(activeDemo || '')}
              </FeatureGate>
            </TabsContent>
            
            <TabsContent value="enterprise" className="space-y-4">
              <FeatureGate 
                feature="whiteLabel" 
                currentPlan={currentPlan}
                fallback={
                  <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <Crown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Enterprise Features</h3>
                    <p className="text-muted-foreground mb-4">
                      Upgrade to Enterprise for white-label solutions, custom AI models, and dedicated support.
                    </p>
                    <Button>Upgrade to Enterprise</Button>
                  </div>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {enterpriseFeatures.map((feature, index) => (
                    <Card 
                      key={index} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        activeDemo === feature.demo ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setActiveDemo(feature.demo)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <feature.icon className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {renderDemo(activeDemo || '')}
              </FeatureGate>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}