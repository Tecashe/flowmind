import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Receipt } from 'lucide-react'

const invoices = [
  {
    id: 'INV-2024-001',
    date: new Date('2024-01-01'),
    amount: 299,
    status: 'paid',
    plan: 'Professional'
  },
  {
    id: 'INV-2023-012',
    date: new Date('2023-12-01'),
    amount: 299,
    status: 'paid',
    plan: 'Professional'
  },
  {
    id: 'INV-2023-011',
    date: new Date('2023-11-01'),
    amount: 99,
    status: 'paid',
    plan: 'Starter'
  },
  {
    id: 'INV-2023-010',
    date: new Date('2023-10-01'),
    amount: 99,
    status: 'paid',
    plan: 'Starter'
  }
]

export function BillingHistory() {
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
          <Receipt className="w-5 h-5" />
          <span>Billing History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {invoice.date.toLocaleDateString()} • {invoice.plan} Plan
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(invoice.amount)}</p>
                  <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                    {invoice.status}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}