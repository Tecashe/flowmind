"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch,
  Users,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Zap,
  Eye,
  ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: 'completed' | 'active' | 'pending' | 'warning';
  duration: string;
  efficiency: number;
}

const processSteps: ProcessStep[] = [
  {
    id: '1',
    title: 'Data Collection',
    description: 'Gathering process data from integrated systems',
    icon: FileText,
    status: 'completed',
    duration: '2.3s',
    efficiency: 98
  },
  {
    id: '2',
    title: 'AI Analysis',
    description: 'Machine learning pattern recognition in progress',
    icon: Zap,
    status: 'active',
    duration: '4.1s',
    efficiency: 94
  },
  {
    id: '3',
    title: 'Process Mapping',
    description: 'Automated flowchart generation',
    icon: GitBranch,
    status: 'pending',
    duration: '1.8s',
    efficiency: 0
  },
  {
    id: '4',
    title: 'Optimization',
    description: 'Identifying improvement opportunities',
    icon: TrendingUp,
    status: 'pending',
    duration: '3.2s',
    efficiency: 0
  }
];

const insights = [
  { 
    title: 'Bottleneck Detected', 
    description: 'Approval process taking 40% longer than average',
    type: 'warning',
    impact: 'High',
    savings: '$12K/month'
  },
  { 
    title: 'Automation Opportunity', 
    description: 'Data entry tasks can be automated',
    type: 'success',
    impact: 'Medium',
    savings: '$8K/month'
  },
  { 
    title: 'Performance Alert', 
    description: 'SLA breach predicted in 2 hours',
    type: 'critical',
    impact: 'High',
    savings: 'Risk mitigation'
  }
];

export function ProcessVisualization() {
  const [activeStep, setActiveStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1));
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-secondary/5 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Process Flow */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <Badge variant="outline" className="mb-4">
                <Eye className="h-4 w-4 mr-2" />
                Live Process Discovery
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Watch <span className="gradient-text">AI Discover</span>
                <br />
                Your Business Processes
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                See how FlowMind automatically identifies, maps, and analyzes your business 
                processes in real-time. No manual effort required.
              </p>
            </div>

            {/* Process Steps */}
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`glass-card relative overflow-hidden transition-all duration-500 ${
                    activeStep > index ? 'glow' : ''
                  }`}
                  animate={{
                    scale: activeStep === index + 1 ? 1.02 : 1,
                    backgroundColor: activeStep === index + 1 ? 'rgba(139, 92, 246, 0.1)' : 'transparent'
                  }}
                >
                  <div className="flex items-center p-4">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        activeStep > index 
                          ? 'bg-primary text-primary-foreground' 
                          : activeStep === index + 1
                          ? 'bg-accent text-accent-foreground animate-pulse'
                          : 'bg-secondary text-muted-foreground'
                      }`}>
                        <step.icon className="h-6 w-6" />
                      </div>
                      {activeStep === index + 1 && (
                        <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
                      )}
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{step.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant={activeStep > index ? 'default' : activeStep === index + 1 ? 'secondary' : 'outline'}>
                            {activeStep > index ? 'Complete' : activeStep === index + 1 ? 'Processing' : 'Pending'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{step.duration}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      
                      {(activeStep > index || activeStep === index + 1) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span>Efficiency: {step.efficiency}%</span>
                            <div className="w-32 bg-secondary rounded-full h-1.5">
                              <motion.div
                                className="bg-primary h-1.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${step.efficiency}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  {activeStep === index + 1 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3, ease: 'linear' }}
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold gradient-text">AI Insights Dashboard</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Live</span>
                </div>
              </div>

              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 1 }}
                    className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 cursor-pointer ${
                      insight.type === 'warning' ? 'border-yellow-500/30 bg-yellow-500/5' :
                      insight.type === 'success' ? 'border-green-500/30 bg-green-500/5' :
                      'border-red-500/30 bg-red-500/5'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {insight.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                          {insight.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {insight.type === 'critical' && <Clock className="h-4 w-4 text-red-500" />}
                          <span className="font-medium text-sm">{insight.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {insight.impact} Impact
                          </Badge>
                          <span className="text-xs font-medium text-primary">{insight.savings}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">47</div>
                    <div className="text-xs text-muted-foreground">Processes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">12</div>
                    <div className="text-xs text-muted-foreground">Optimized</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">$89K</div>
                    <div className="text-xs text-muted-foreground">Monthly Savings</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Integration Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="glass-card p-6"
            >
              <h4 className="font-semibold mb-4">Connected Systems</h4>
              <div className="grid grid-cols-3 gap-3">
                {['Salesforce', 'Slack', 'Asana', 'GitHub', 'Zendesk', 'QuickBooks'].map((system, index) => (
                  <div key={index} className="p-3 bg-secondary/50 rounded-lg text-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <div className="w-4 h-4 bg-primary rounded-full" />
                    </div>
                    <span className="text-xs font-medium">{system}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}