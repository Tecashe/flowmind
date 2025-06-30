"use client";

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
  Quote,
  Star,
  Building2,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';

const testimonials = [
  {
    quote: "FlowMind transformed our operations completely. We identified $2.3M in annual savings within the first month. The AI insights are incredibly accurate and actionable.",
    author: "Sarah Chen",
    title: "Chief Operations Officer",
    company: "TechGlobal Inc.",
    industry: "Technology",
    logo: "TG",
    savings: "$2.3M",
    efficiency: "45%",
    rating: 5
  },
  {
    quote: "The process discovery feature is mind-blowing. It mapped our entire supply chain automatically and found bottlenecks we didn't even know existed. ROI was achieved in 3 months.",
    author: "Michael Rodriguez",
    title: "VP of Supply Chain",
    company: "Manufacturing Solutions",
    industry: "Manufacturing",
    logo: "MS",
    savings: "$890K",
    efficiency: "38%",
    rating: 5
  },
  {
    quote: "Finally, software that actually delivers on its promises. FlowMind's real-time monitoring prevented multiple SLA breaches and improved our customer satisfaction by 40%.",
    author: "Emily Watson",
    title: "Director of Customer Success",
    company: "ServiceFirst Corp",
    industry: "Professional Services",
    logo: "SF",
    savings: "$650K",
    efficiency: "40%",
    rating: 5
  },
  {
    quote: "The AI optimization suggestions are spot-on. We've automated 60% of our manual processes and reduced processing time by half. Our team can now focus on strategic work.",
    author: "David Kim",
    title: "Head of Operations",
    company: "FinanceFlow Ltd",
    industry: "Financial Services",
    logo: "FF",
    savings: "$1.2M",
    efficiency: "52%",
    rating: 5
  },
  {
    quote: "FlowMind pays for itself within weeks. The process intelligence dashboard gives us visibility we never had before. It's become essential to our daily operations.",
    author: "Lisa Thompson",
    title: "COO",
    company: "HealthTech Systems",
    industry: "Healthcare",
    logo: "HT",
    savings: "$780K",
    efficiency: "35%",
    rating: 5
  },
  {
    quote: "Implementation was seamless, and the results were immediate. We reduced our order-to-delivery time by 50% and improved accuracy by 90%. Customers are thrilled.",
    author: "James Anderson",
    title: "Operations Manager",
    company: "RetailMax Group",
    industry: "Retail",
    logo: "RM",
    savings: "$450K",
    efficiency: "42%",
    rating: 5
  }
];

const companyLogos = [
  { name: "TechGlobal", logo: "TG" },
  { name: "Manufacturing Solutions", logo: "MS" },
  { name: "ServiceFirst", logo: "SF" },
  { name: "FinanceFlow", logo: "FF" },
  { name: "HealthTech", logo: "HT" },
  { name: "RetailMax", logo: "RM" },
  { name: "DataCorp", logo: "DC" },
  { name: "CloudSys", logo: "CS" }
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20" />
      
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
            <Award className="h-4 w-4 mr-2" />
            Customer Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by <span className="gradient-text">500+ Enterprises</span>
            <br />
            Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how leading companies are using FlowMind to transform their operations, 
            reduce costs, and achieve unprecedented efficiency gains.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="glass-card text-center">
            <Building2 className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">500+</div>
            <div className="text-sm text-muted-foreground">Enterprise Clients</div>
          </div>
          <div className="glass-card text-center">
            <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-green-400 mb-1">$847M</div>
            <div className="text-sm text-muted-foreground">Total Savings</div>
          </div>
          <div className="glass-card text-center">
            <Users className="h-8 w-8 text-accent mx-auto mb-3" />
            <div className="text-3xl font-bold text-accent mb-1">2.1M</div>
            <div className="text-sm text-muted-foreground">Processes Optimized</div>
          </div>
          <div className="glass-card text-center">
            <Star className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-yellow-400 mb-1">4.9/5</div>
            <div className="text-sm text-muted-foreground">Customer Rating</div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card h-full relative overflow-hidden hover:glow transition-all duration-500 group-hover:scale-105">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                
                <div className="p-6">
                  {/* Quote */}
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center font-bold text-primary-foreground mr-4">
                      {testimonial.logo}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                      <div className="text-sm text-primary">{testimonial.company}</div>
                    </div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-lg font-bold text-green-400">{testimonial.savings}</div>
                      <div className="text-xs text-muted-foreground">Annual Savings</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-lg font-bold text-accent">{testimonial.efficiency}</div>
                      <div className="text-xs text-muted-foreground">Efficiency Gain</div>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Badge variant="outline">{testimonial.industry}</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8"
        >
          <h3 className="text-center text-lg font-semibold mb-8 text-muted-foreground">
            Trusted by Industry Leaders
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            {companyLogos.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center font-bold text-primary group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 mx-auto mb-2">
                  {company.logo}
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {company.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="glass-card inline-block p-8 glow">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Join 500+ Companies Already Saving Millions
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Start your transformation today with a 30-day free trial. No credit card required.
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
                Book Enterprise Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}