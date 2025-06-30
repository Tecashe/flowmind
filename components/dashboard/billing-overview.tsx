import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CreditCard, Calendar, TrendingUp, AlertCircle } from 'lucide-react'

interface BillingOverviewProps {
  billingInfo: {
    organization: {
      name: string
      plan: string
    }
    billingCycle: string
    nextBillingDate: Date
    amount: number
  }
}

export function BillingOverview({ billingInfo }: BillingOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <span>Current Subscription</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{billingInfo.organization.plan} Plan</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {formatCurrency(billingInfo.amount)}/{billingInfo.billingCycle}
            </p>
          </div>
          <Badge variant={billingInfo.organization.plan === 'ENTERPRISE' ? 'default' : 'secondary'}>
            {billingInfo.organization.plan}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Next Billing</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {billingInfo.nextBillingDate.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm font-medium">Amount Due</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatCurrency(billingInfo.amount)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1">
            Update Payment Method
          </Button>
          <Button variant="outline" className="flex-1">
            Download Invoice
          </Button>
        </div>

        {billingInfo.organization.plan === 'STARTER' && (
          <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Upgrade to unlock more features
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                Get unlimited processes, advanced analytics, and priority support.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}