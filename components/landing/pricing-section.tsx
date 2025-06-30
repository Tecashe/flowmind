"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check,
  X,
  Star,
  Shield,
  Zap,
  Crown,
  ArrowRight,
  Users,
  Building2
} from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: { monthly: 99, annual: 990 },
    description: "Perfect for small teams getting started with process optimization",
    icon: Users,
    popular: false,
    features: {
      users: "5 users",
      processes: "10 processes",
      integrations: "10 integrations",
      storage: "10GB storage",
      support: "Email support",
      analytics: "Basic analytics",
      monitoring: "Real-time monitoring",
      automation: "Basic automation",
      ai: "AI insights",
      sla: "99% uptime SLA",
      api: "REST API access",
      reports: "Standard reports"
    },
    limitations: {
      advanced_ai: false,
      custom_integrations: false,
      dedicated_support: false,
      white_label: false,
      sso: false,
      advanced_security: false
    }
  },
  {
    name: "Professional",
    price: { monthly: 299, annual: 2990 },
    description: "Advanced features for growing teams and complex processes",
    icon: Zap,
    popular: true,
    features: {
      users: "25 users",
      processes: "50 processes",
      integrations: "50 integrations",
      storage: "100GB storage",
      support: "Priority support",
      analytics: "Advanced analytics",
      monitoring: "Real-time monitoring",
      automation: "Advanced automation",
      ai: "Advanced AI insights",
      sla: "99.5% uptime SLA",
      api: "REST + GraphQL API",
      reports: "Custom reports"
    },
    limitations: {
      advanced_ai: true,
      custom_integrations: true,
      dedicated_support: false,
      white_label: false,
      sso: true,
      advanced_security: true
    }
  },
  {
    name: "Enterprise",
    price: { monthly: 999, annual: 9990 },
    description: "Full-scale solution for large organizations with unlimited potential",
    icon: Crown,
    popular: false,
    features: {
      users: "Unlimited users",
      processes: "Unlimited processes",
      integrations: "Unlimited integrations",
      storage: "1TB+ storage",
      support: "24/7 dedicated support",
      analytics: "Enterprise analytics",
      monitoring: "Real-time monitoring",
      automation: "Enterprise automation",
      ai: "Custom AI models",
      sla: "99.9% uptime SLA",
      api: "Full API suite",
      reports: "Executive dashboards"
    },
    limitations: {
      advanced_ai: true,
      custom_integrations: true,
      dedicated_support: true,
      white_label: true,
      sso: true,
      advanced_security: true
    }
  }
];

const additionalFeatures = [
  "Single Sign-On (SSO)",
  "Advanced Security Controls",
  "Custom Integrations",
  "White-label Options",
  "Dedicated Account Manager",
  "Professional Services",
  "Custom AI Model Training",
  "Data Residency Options",
  "Compliance Reporting",
  "Advanced Audit Logs"
];

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Building2 className="h-4 w-4 mr-2" />
            Pricing Plans
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="gradient-text">Success Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Start with our free trial, then choose the plan that scales with your business. 
            All plans include our core AI-powered process intelligence features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                billingPeriod === 'annual' ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingPeriod === 'annual' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingPeriod === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {billingPeriod === 'annual' && (
              <Badge variant="secondary" className="ml-2">
                Save 17%
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group ${plan.popular ? 'scale-105' : ''}`}
            >
              <div className={`glass-card h-full relative overflow-hidden ${
                plan.popular ? 'glow border-primary/50' : ''
              } hover:glow transition-all duration-500 group-hover:scale-105`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                )}
                
                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative">
                        <plan.icon className="h-8 w-8 text-primary" />
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                      </div>
                      {plan.popular && (
                        <Badge className="ml-3 bg-primary text-primary-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">
                          {formatPrice(plan.price[billingPeriod])}
                        </span>
                        <span className="text-muted-foreground ml-2">
                          /{billingPeriod === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      {billingPeriod === 'annual' && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {formatPrice(plan.price.annual / 12)}/month billed annually
                        </div>
                      )}
                    </div>

                    <Button 
                      className={`w-full ${plan.popular ? 'glow' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {index === 0 ? 'Start Free Trial' : index === 1 ? 'Get Started' : 'Contact Sales'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                      What's Included
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(plan.features).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-3" />
                          <span className="text-sm">{value}</span>
                        </div>
                      ))}
                      
                      {/* Additional features for higher tiers */}
                      {plan.limitations.advanced_ai && (
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-3" />
                          <span className="text-sm">Advanced AI insights</span>
                        </div>
                      )}
                      {plan.limitations.custom_integrations && (
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-3" />
                          <span className="text-sm">Custom integrations</span>
                        </div>
                      )}
                      {plan.limitations.sso && (
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-3" />
                          <span className="text-sm">Single Sign-On (SSO)</span>
                        </div>
                      )}
                      {plan.limitations.dedicated_support && (
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-3" />
                          <span className="text-sm">Dedicated support manager</span>
                        </div>
                      )}
                      {plan.limitations.white_label && (
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-3" />
                          <span className="text-sm">White-label options</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8 mb-16"
        >
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security & Compliance</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All plans include bank-level security, SOC 2 Type II compliance, and enterprise-grade data protection.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center p-4 bg-secondary/30 rounded-lg">
                <Check className="h-5 w-5 text-primary mx-auto mb-2" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 text-left">
              <h4 className="font-semibold mb-3">Can I change plans anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing.
              </p>
            </div>
            <div className="glass-card p-6 text-left">
              <h4 className="font-semibold mb-3">Is there a free trial?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, all plans come with a 30-day free trial. No credit card required to start.
              </p>
            </div>
            <div className="glass-card p-6 text-left">
              <h4 className="font-semibold mb-3">What integrations are available?</h4>
              <p className="text-sm text-muted-foreground">
                We support 50+ integrations including Salesforce, Slack, Asana, GitHub, and more. Custom integrations available on Enterprise plans.
              </p>
            </div>
            <div className="glass-card p-6 text-left">
              <h4 className="font-semibold mb-3">How secure is my data?</h4>
              <p className="text-sm text-muted-foreground">
                Your data is encrypted at rest and in transit, with SOC 2 Type II compliance and regular security audits.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}