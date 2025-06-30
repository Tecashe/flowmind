"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Calculator,
  DollarSign,
  TrendingUp,
  Clock,
  Users,
  ArrowRight
} from 'lucide-react';

interface ROIData {
  employees: number;
  avgSalary: number;
  processesPerEmployee: number;
  timePerProcess: number;
  inefficiencyRate: number;
}

export function ROICalculator() {
  const [roiData, setROIData] = useState<ROIData>({
    employees: 100,
    avgSalary: 75000,
    processesPerEmployee: 5,
    timePerProcess: 2,
    inefficiencyRate: 25
  });

  const [calculatedROI, setCalculatedROI] = useState({
    currentCost: 0,
    optimizedCost: 0,
    annualSavings: 0,
    roiPercentage: 0,
    paybackMonths: 0,
    productivityGain: 0
  });

  useEffect(() => {
    // Calculate ROI based on input data
    const hourlyRate = roiData.avgSalary / 2080; // Assuming 2080 working hours per year
    const totalProcessHours = roiData.employees * roiData.processesPerEmployee * roiData.timePerProcess * 52; // Weekly
    const currentCost = totalProcessHours * hourlyRate;
    const inefficientHours = totalProcessHours * (roiData.inefficiencyRate / 100);
    const optimizedCost = currentCost - (inefficientHours * hourlyRate);
    const annualSavings = currentCost - optimizedCost;
    const flowmindCost = 999 * 12; // Enterprise plan annual cost
    const netSavings = annualSavings - flowmindCost;
    const roiPercentage = (netSavings / flowmindCost) * 100;
    const paybackMonths = flowmindCost / (annualSavings / 12);
    const productivityGain = roiData.inefficiencyRate;

    setCalculatedROI({
      currentCost,
      optimizedCost,
      annualSavings,
      roiPercentage,
      paybackMonths,
      productivityGain
    });
  }, [roiData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Calculator className="h-4 w-4 mr-2" />
            ROI Calculator
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Calculate Your <span className="gradient-text">Business Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how much FlowMind can save your organization. Adjust the parameters below 
            to get a personalized ROI calculation based on your business size and processes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Calculator Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Users className="h-6 w-6 mr-3 text-primary" />
                Company Information
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Number of Employees: <span className="text-primary font-bold">{roiData.employees}</span>
                  </label>
                  <Slider
                    value={[roiData.employees]}
                    onValueChange={(value) => setROIData({...roiData, employees: value[0]})}
                    max={1000}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>10</span>
                    <span>1000+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Average Salary: <span className="text-primary font-bold">{formatCurrency(roiData.avgSalary)}</span>
                  </label>
                  <Slider
                    value={[roiData.avgSalary]}
                    onValueChange={(value) => setROIData({...roiData, avgSalary: value[0]})}
                    max={150000}
                    min={30000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$30K</span>
                    <span>$150K+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Processes per Employee/Week: <span className="text-primary font-bold">{roiData.processesPerEmployee}</span>
                  </label>
                  <Slider
                    value={[roiData.processesPerEmployee]}
                    onValueChange={(value) => setROIData({...roiData, processesPerEmployee: value[0]})}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span>
                    <span>20+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Hours per Process: <span className="text-primary font-bold">{roiData.timePerProcess}</span>
                  </label>
                  <Slider
                    value={[roiData.timePerProcess]}
                    onValueChange={(value) => setROIData({...roiData, timePerProcess: value[0]})}
                    max={8}
                    min={0.5}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>30min</span>
                    <span>8h+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Current Inefficiency Rate: <span className="text-primary font-bold">{roiData.inefficiencyRate}%</span>
                  </label>
                  <Slider
                    value={[roiData.inefficiencyRate]}
                    onValueChange={(value) => setROIData({...roiData, inefficiencyRate: value[0]})}
                    max={50}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>10%</span>
                    <span>50%+</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - ROI Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Key Metrics */}
            <div className="glass-card p-8 glow">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-primary" />
                Your ROI Results
              </h3>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                  <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(calculatedROI.annualSavings)}
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Savings</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {calculatedROI.roiPercentage.toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">ROI</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-lg">
                  <Clock className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-accent mb-1">
                    {calculatedROI.paybackMonths.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Months Payback</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg">
                  <Users className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    {calculatedROI.productivityGain}%
                  </div>
                  <div className="text-sm text-muted-foreground">Productivity Gain</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm">Current Annual Process Cost</span>
                  <span className="font-bold text-red-400">{formatCurrency(calculatedROI.currentCost)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm">Optimized Annual Cost</span>
                  <span className="font-bold text-green-400">{formatCurrency(calculatedROI.optimizedCost)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/30">
                  <span className="text-sm font-medium">FlowMind Enterprise Cost</span>
                  <span className="font-bold text-primary">$11,988/year</span>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="glow group w-full">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  No credit card required • 30-day free trial
                </p>
              </div>
            </div>

            {/* Benefits Summary */}
            <div className="glass-card p-6">
              <h4 className="font-bold mb-4 text-accent">What This Means for Your Business:</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Save {Math.round(calculatedROI.annualSavings / calculatedROI.currentCost * 100)}% on process-related costs annually</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm">Free up {Math.round(roiData.employees * roiData.inefficiencyRate / 100 * 8)} hours per week across your team</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm">Achieve full ROI in just {calculatedROI.paybackMonths.toFixed(1)} months</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  <span className="text-sm">Boost team productivity by {calculatedROI.productivityGain}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}