"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight,
  Star,
  Shield,
  Clock,
  Users,
  Zap,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: "Get Started in Minutes",
    description: "Our AI begins analyzing your processes immediately after setup"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with bank-grade encryption and data protection"
  },
  {
    icon: TrendingUp,
    title: "Immediate ROI",
    description: "Most customers see cost savings within the first 30 days"
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Dedicated customer success team to ensure your success"
  }
];

const guarantees = [
  "30-day free trial",
  "No credit card required",
  "Cancel anytime",
  "Money-back guarantee",
  "Free data migration",
  "24/7 support included"
];

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <Badge variant="outline" className="mb-4 animate-pulse-slow">
                <Star className="h-4 w-4 mr-2" />
                Join 500+ Enterprise Customers
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Ready to Transform Your 
                <span className="gradient-text block">Business Operations?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Start your journey to operational excellence today. Join hundreds of enterprise 
                companies already saving millions with FlowMind's AI-powered process intelligence.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="relative">
                    <benefit.icon className="h-6 w-6 text-primary mt-1" />
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Guarantees */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 text-primary mr-2" />
                Risk-Free Guarantee
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">{guarantee}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card p-8 glow">
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <Zap className="h-16 w-16 text-primary mx-auto" />
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  Start Your Free Trial Today
                </h3>
                <p className="text-muted-foreground mb-6">
                  No credit card required. Full access to all features for 30 days.
                </p>
              </div>

              {/* Trial Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm">AI Process Discovery</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm">Real-time Monitoring</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm">50+ Integrations</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm">Priority Support</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full glow group text-lg py-6">
                    Start Free Trial Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" size="lg" className="w-full py-3">
                    Schedule Demo
                  </Button>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">Customers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">4.9/5</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">99.9%</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -top-4 -right-4 glass-card p-3 animate-float"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live Demo Available</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 glass-card p-3 animate-float"
              style={{ animationDelay: '3s' }}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-muted-foreground mb-8">
            Join the companies already transforming their operations
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            {['TechGlobal', 'Manufacturing Solutions', 'ServiceFirst', 'FinanceFlow', 'HealthTech', 'RetailMax'].map((company, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center font-bold text-primary text-xs">
                  {company.slice(0, 2)}
                </div>
                <span className="text-sm font-medium">{company}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}