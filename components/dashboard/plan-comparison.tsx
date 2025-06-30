'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Crown, Zap } from 'lucide-react'
import { createCheckoutSession } from '@/lib/actions/stripe-actions'

interface PlanComparisonProps {
  currentPlan: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
}

const plans = [
  {
    name: 'STARTER',
    price: 99,
    icon: Zap,
    features: [
      '5 team members', 
      '10 processes', 
      '3 integrations', 
      '1K executions/month', 
      'Email support',
      'Basic analytics'
    ],
    popular: false,
    color: 'gray'
  },
  {
    name: 'PROFESSIONAL',
    price: 299,
    icon: Star,
    features: [
      '25 team members', 
      '50 processes', 
      '10 integrations', 
      '10K executions/month', 
      'Priority support', 
      'Advanced analytics',
      'AI insights',
      'API access',
      'SSO integration'
    ],
    popular: true,
    color: 'blue'
  },
  {
    name: 'ENTERPRISE',
    price: 999,
    icon: Crown,
    features: [
      'Unlimited members', 
      'Unlimited processes', 
      'Unlimited integrations', 
      'Unlimited executions', 
      '24/7 dedicated support', 
      'Custom integrations', 
      'SLA guarantee',
      'White-label solution',
      'Custom AI models',
      'Multi-region deployment'
    ],
    popular: false,
    color: 'purple'
  }
]

export function PlanComparison({ currentPlan }: PlanComparisonProps) {
  const handleUpgrade = async (plan: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE') => {
    try {
      await createCheckoutSession(plan)
    } catch (error) {
      console.error('Failed to create checkout session:', error)
    }
  }

  const getColorClasses = (color: string, isCurrent: boolean) => {
    const baseClasses = isCurrent ? 'border-2' : 'border'
    
    switch (color) {
      case 'blue':
        return `${baseClasses} ${isCurrent ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200'}`
      case 'purple':
        return `${baseClasses} ${isCurrent ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200'}`
      default:
        return `${baseClasses} ${isCurrent ? 'border-gray-500 bg-gray-50 dark:bg-gray-900/20' : 'border-gray-200'}`
    }
  }

  const getButtonClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-600 hover:bg-blue-700'
      case 'purple':
        return 'bg-purple-600 hover:bg-purple-700'
      default:
        return 'bg-gray-600 hover:bg-gray-700'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Plans</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {plans.map((plan) => {
          const isCurrent = plan.name === currentPlan
          const PlanIcon = plan.icon
          
          return (
            <div
              key={plan.name}
              className={`p-4 rounded-lg transition-all duration-200 ${getColorClasses(plan.color, isCurrent)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <PlanIcon className={`h-5 w-5 ${
                    plan.color === 'blue' ? 'text-blue-500' :
                    plan.color === 'purple' ? 'text-purple-500' :
                    'text-gray-500'
                  }`} />
                  <h3 className="font-semibold">{plan.name}</h3>
                  {plan.popular && (
                    <Badge variant="default" className="bg-blue-600">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  {isCurrent && (
                    <Badge variant="outline" className="border-green-500 text-green-600">
                      Current Plan
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${plan.price}</p>
                  <p className="text-sm text-gray-500">/month</p>
                </div>
              </div>
              
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {!isCurrent && (
                <Button 
                  onClick={() => handleUpgrade(plan.name as any)}
                  className={`w-full ${getButtonClasses(plan.color)}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Upgrade to {plan.name}
                </Button>
              )}

              {isCurrent && (
                <div className="text-center py-2">
                  <span className="text-sm text-green-600 font-medium">
                    ✓ Your current plan
                  </span>
                </div>
              )}
            </div>
          )
        })}

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
          <h4 className="font-semibold mb-2">Need a custom solution?</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Contact our sales team for enterprise pricing and custom features.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Contact Sales
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}