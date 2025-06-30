"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Play, 
  Brain, 
  Zap, 
  Shield, 
  Users,
  TrendingUp,
  Workflow,
  GitBranch,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

const ProcessNode = ({ 
  icon: Icon, 
  label, 
  className = "",
  delay = 0 
}: { 
  icon: any, 
  label: string, 
  className?: string,
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className={`glass-card ${className} relative group cursor-pointer`}
  >
    <div className="flex flex-col items-center space-y-2 p-4">
      <div className="relative">
        <Icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <span className="text-xs font-medium text-center">{label}</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

const ConnectionLine = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: 1, scaleX: 1 }}
    transition={{ delay, duration: 0.8, ease: "easeInOut" }}
    className="flex items-center"
  >
    <div className="h-0.5 w-12 bg-gradient-to-r from-primary/50 to-accent/50 connection-line" />
    <ArrowRight className="h-4 w-4 text-primary/70 ml-1" />
  </motion.div>
);

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Discover, Optimize, and Monitor Business Processes with AI";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge variant="outline" className="animate-pulse-slow">
                <Brain className="h-4 w-4 mr-2" />
                Powered by Advanced AI
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="gradient-text">FlowMind</span>
                <br />
                <span className="text-2xl md:text-4xl text-muted-foreground">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Transform your business operations with our enterprise-grade AI platform. 
                Automatically discover hidden processes, identify bottlenecks, and optimize 
                workflows to save millions in operational costs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="glow group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$2.3M</div>
                <div className="text-sm text-muted-foreground">Avg. Annual Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Process Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="space-y-6">
              {/* Process Discovery Row */}
              <div className="flex items-center justify-center space-x-4">
                <ProcessNode icon={GitBranch} label="Process Discovery" delay={0.5} />
                <ConnectionLine delay={1} />
                <ProcessNode icon={Brain} label="AI Analysis" delay={0.7} />
              </div>

              {/* Monitoring Row */}
              <div className="flex items-center justify-center space-x-4">
                <ProcessNode icon={BarChart3} label="Real-time Monitoring" delay={0.9} />
                <ConnectionLine delay={1.2} />
                <ProcessNode icon={Zap} label="Optimization" delay={1.1} />
              </div>

              {/* Results Row */}
              <div className="flex items-center justify-center space-x-4">
                <ProcessNode icon={TrendingUp} label="Performance Boost" delay={1.3} />
                <ConnectionLine delay={1.5} />
                <ProcessNode icon={Shield} label="Risk Reduction" delay={1.5} />
              </div>
            </div>

            {/* Floating Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="absolute -top-4 -right-4 glass-card p-3 animate-float"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live Processing</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 glass-card p-3 animate-float"
              style={{ animationDelay: '3s' }}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">32% Efficiency Gain</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-sm text-muted-foreground">Discover More</span>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}