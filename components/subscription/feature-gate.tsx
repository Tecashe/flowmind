'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { STRIPE_PLANS } from '@/lib/stripe/stripe-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lock, Crown, Zap } from 'lucide-react'
import { createCheckoutSession } from '@/lib/actions/stripe-actions'

interface FeatureGateProps {
  feature: keyof typeof STRIPE_PLANS.STARTER.features
  children: React.ReactNode
  fallback?: React.ReactNode
  currentPlan?: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
}

export function FeatureGate({ feature, children, fallback, currentPlan = 'STARTER' }: FeatureGateProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const { isLoaded } = useAuth()

  useEffect(() => {
    if (isLoaded) {
      const planFeatures = STRIPE_PLANS[currentPlan].features
      setHasAccess(!!planFeatures[feature])
    }
  }, [feature, currentPlan, isLoaded])

  if (!isLoaded) {
    return <div className="animate-pulse bg-gray-200 h-20 rounded" />
  }

  if (hasAccess) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
          <Lock className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-lg">Premium Feature</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">
          This feature is available in higher tier plans. Upgrade to unlock advanced capabilities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {currentPlan === 'STARTER' && (
            <>
              <Button 
                onClick={() => createCheckoutSession('PROFESSIONAL')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Zap className="h-4 w-4 mr-2" />
                Upgrade to Professional
              </Button>
              <Button 
                onClick={() => createCheckoutSession('ENTERPRISE')}
                variant="outline"
              >
                <Crown className="h-4 w-4 mr-2" />
                Go Enterprise
              </Button>
            </>
          )}
          
          {currentPlan === 'PROFESSIONAL' && (
            <Button 
              onClick={() => createCheckoutSession('ENTERPRISE')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Enterprise
            </Button>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          <Badge variant="outline">
            Current Plan: {currentPlan}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}