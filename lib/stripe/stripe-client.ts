import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const STRIPE_PLANS = {
  STARTER: {
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    price: 99,
    features: {
      users: 5,
      processes: 10,
      integrations: 3,
      executions: 1000,
      aiInsights: false,
      customIntegrations: false,
      prioritySupport: false,
      whiteLabel: false,
      apiAccess: false,
      advancedAnalytics: false,
      sso: false,
      customAI: false
    }
  },
  PROFESSIONAL: {
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
    price: 299,
    features: {
      users: 25,
      processes: 50,
      integrations: 10,
      executions: 10000,
      aiInsights: true,
      customIntegrations: true,
      prioritySupport: true,
      whiteLabel: false,
      apiAccess: true,
      advancedAnalytics: true,
      sso: true,
      customAI: false
    }
  },
  ENTERPRISE: {
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    price: 999,
    features: {
      users: -1, // Unlimited
      processes: -1,
      integrations: -1,
      executions: -1,
      aiInsights: true,
      customIntegrations: true,
      prioritySupport: true,
      whiteLabel: true,
      apiAccess: true,
      advancedAnalytics: true,
      sso: true,
      customAI: true
    }
  }
}