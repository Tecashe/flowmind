"use client";

import { motion } from 'framer-motion';
import { 
  GitBranch,
  BarChart3,
  Zap,
  Workflow,
  Brain,
  Shield,
  Users,
  Clock,
  TrendingUp,
  Eye,
  Settings,
  Bell
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: GitBranch,
    title: "AI Process Discovery",
    description: "Automatically detect and map your business processes across all systems and departments. Our AI analyzes patterns to create comprehensive process maps without manual effort.",
    benefits: ["50+ integration connectors", "Pattern recognition AI", "Auto-generated flowcharts"],
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    icon: BarChart3,
    title: "Real-Time Monitoring",
    description: "Track process performance live with advanced analytics. Get instant insights into bottlenecks, SLA violations, and performance trends as they happen.",
    benefits: ["Live dashboards", "SLA monitoring", "Predictive alerts"],
    gradient: "from-green-500/20 to-blue-500/20"
  },
  {
    icon: Zap,
    title: "Intelligent Optimization",
    description: "Receive AI-powered recommendations to streamline workflows and eliminate inefficiencies. Our engine analyzes your processes to suggest improvements with ROI estimates.",
    benefits: ["Smart recommendations", "ROI calculations", "A/B testing framework"],
    gradient: "from-yellow-500/20 to-orange-500/20"
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Transform manual tasks into automated workflows. Build sophisticated automation rules that adapt to your business logic and handle exceptions intelligently.",
    benefits: ["Visual workflow builder", "Exception handling", "Custom triggers"],
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Brain,
    title: "Predictive Analytics",
    description: "Leverage machine learning to predict process failures, capacity needs, and optimization opportunities before they impact your business.",
    benefits: ["Failure prediction", "Capacity planning", "Trend analysis"],
    gradient: "from-indigo-500/20 to-purple-600/20"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with SOC 2 compliance, role-based access control, and audit trails. Your process data is protected with military-level encryption.",
    benefits: ["SOC 2 certified", "RBAC controls", "Complete audit trails"],
    gradient: "from-red-500/20 to-orange-500/20"
  }
];

const stats = [
  { value: "98%", label: "Process Optimization", icon: TrendingUp },
  { value: "60%", label: "Time Reduction", icon: Clock },
  { value: "500+", label: "Enterprise Clients", icon: Users },
  { value: "99.9%", label: "Uptime SLA", icon: Eye }
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10" />
      
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
            <Brain className="h-4 w-4 mr-2" />
            Enterprise Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Powerful AI-Driven</span>
            <br />
            Process Intelligence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your business operations with cutting-edge AI technology. 
            Discover hidden inefficiencies, optimize workflows, and achieve unprecedented operational excellence.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="glass-card text-center group hover:glow transition-all duration-300">
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card h-full relative overflow-hidden hover:glow transition-all duration-500 group-hover:scale-105">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <feature.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
                      <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="text-xl font-bold ml-3 group-hover:text-accent transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 group-hover:bg-accent transition-colors duration-300" />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="glass-card inline-block p-8">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Ready to Transform Your Operations?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Join hundreds of enterprise companies already using FlowMind to optimize their business processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium glow hover:bg-primary/90 transition-colors"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}